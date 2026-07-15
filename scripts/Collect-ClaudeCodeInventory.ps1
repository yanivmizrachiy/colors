[CmdletBinding()]
param(
    [Parameter()]
    [string]$ProjectPath = (Get-Location).Path,

    [Parameter()]
    [string]$OutputDirectory = (Join-Path $env:USERPROFILE 'Documents\KlotKord-Inventory')
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Get-CommandSummary {
    param(
        [Parameter(Mandatory)]
        [string]$Name,

        [Parameter()]
        [string[]]$VersionArguments = @('--version')
    )

    $command = Get-Command $Name -ErrorAction SilentlyContinue | Select-Object -First 1
    if (-not $command) {
        return [ordered]@{
            installed = $false
            version   = $null
        }
    }

    $version = $null
    try {
        $version = (& $command.Source @VersionArguments 2>&1 | Out-String).Trim()
    }
    catch {
        $version = 'installed; version command failed'
    }

    return [ordered]@{
        installed = $true
        version   = $version
    }
}

function Get-ChildNames {
    param(
        [Parameter(Mandatory)]
        [string]$Path,

        [Parameter(Mandatory)]
        [ValidateSet('Directory', 'File')]
        [string]$Kind,

        [Parameter()]
        [string]$Filter = '*'
    )

    if (-not (Test-Path -LiteralPath $Path)) {
        return @()
    }

    if ($Kind -eq 'Directory') {
        return @(Get-ChildItem -LiteralPath $Path -Directory -ErrorAction SilentlyContinue |
            Sort-Object Name |
            ForEach-Object { $_.Name })
    }

    return @(Get-ChildItem -LiteralPath $Path -File -Filter $Filter -ErrorAction SilentlyContinue |
        Sort-Object Name |
        ForEach-Object { $_.BaseName })
}

function Get-ObjectPropertyNames {
    param([object]$Object)

    if ($null -eq $Object) {
        return @()
    }

    return @($Object.PSObject.Properties.Name | Sort-Object)
}

function Get-ArrayCount {
    param([object]$Value)

    if ($null -eq $Value) {
        return 0
    }

    return @($Value).Count
}

function Get-SettingsSummary {
    param(
        [Parameter(Mandatory)]
        [string]$Label,

        [Parameter(Mandatory)]
        [string]$Path
    )

    $summary = [ordered]@{
        label                 = $Label
        exists                = (Test-Path -LiteralPath $Path)
        valid_json            = $null
        top_level_keys        = @()
        permission_allow_count = 0
        permission_ask_count   = 0
        permission_deny_count  = 0
        hook_events           = @()
        enabled_plugin_names  = @()
        plugin_config_names   = @()
        env_key_count         = 0
    }

    if (-not $summary.exists) {
        return $summary
    }

    try {
        $data = Get-Content -LiteralPath $Path -Raw -Encoding UTF8 | ConvertFrom-Json
        $summary.valid_json = $true
        $summary.top_level_keys = Get-ObjectPropertyNames $data

        if ($data.PSObject.Properties.Name -contains 'permissions') {
            $permissions = $data.permissions
            if ($null -ne $permissions) {
                if ($permissions.PSObject.Properties.Name -contains 'allow') {
                    $summary.permission_allow_count = Get-ArrayCount $permissions.allow
                }
                if ($permissions.PSObject.Properties.Name -contains 'ask') {
                    $summary.permission_ask_count = Get-ArrayCount $permissions.ask
                }
                if ($permissions.PSObject.Properties.Name -contains 'deny') {
                    $summary.permission_deny_count = Get-ArrayCount $permissions.deny
                }
            }
        }

        if ($data.PSObject.Properties.Name -contains 'hooks') {
            $summary.hook_events = Get-ObjectPropertyNames $data.hooks
        }

        if ($data.PSObject.Properties.Name -contains 'enabledPlugins') {
            $summary.enabled_plugin_names = Get-ObjectPropertyNames $data.enabledPlugins
        }

        if ($data.PSObject.Properties.Name -contains 'pluginConfigs') {
            $summary.plugin_config_names = Get-ObjectPropertyNames $data.pluginConfigs
        }

        if ($data.PSObject.Properties.Name -contains 'env') {
            $summary.env_key_count = (Get-ObjectPropertyNames $data.env).Count
        }
    }
    catch {
        $summary.valid_json = $false
    }

    return $summary
}

function Get-McpSummary {
    param(
        [Parameter(Mandatory)]
        [string]$Label,

        [Parameter(Mandatory)]
        [string]$Path
    )

    $summary = [ordered]@{
        label        = $Label
        exists       = (Test-Path -LiteralPath $Path)
        valid_json   = $null
        server_names = @()
    }

    if (-not $summary.exists) {
        return $summary
    }

    try {
        $data = Get-Content -LiteralPath $Path -Raw -Encoding UTF8 | ConvertFrom-Json
        $summary.valid_json = $true
        if ($data.PSObject.Properties.Name -contains 'mcpServers') {
            $summary.server_names = Get-ObjectPropertyNames $data.mcpServers
        }
    }
    catch {
        $summary.valid_json = $false
    }

    return $summary
}

$projectFullPath = [System.IO.Path]::GetFullPath($ProjectPath)
$userClaudePath = Join-Path $env:USERPROFILE '.claude'
$projectClaudePath = Join-Path $projectFullPath '.claude'
$managedClaudePath = Join-Path $env:ProgramFiles 'ClaudeCode'

$timestamp = Get-Date -Format 'yyyyMMdd-HHmmss'
New-Item -ItemType Directory -Path $OutputDirectory -Force | Out-Null

$inventory = [ordered]@{
    schema_version = 1
    generated_at   = (Get-Date).ToString('o')
    safety         = [ordered]@{
        read_only                    = $true
        read_claude_json             = $false
        read_environment_values      = $false
        read_permission_rule_values  = $false
        read_mcp_urls_or_headers      = $false
        read_transcripts             = $false
        read_secrets                 = $false
        network_commands_executed    = $false
    }
    platform       = [ordered]@{
        os_description       = [System.Runtime.InteropServices.RuntimeInformation]::OSDescription
        os_architecture      = [System.Runtime.InteropServices.RuntimeInformation]::OSArchitecture.ToString()
        process_architecture = [System.Runtime.InteropServices.RuntimeInformation]::ProcessArchitecture.ToString()
        powershell_version   = $PSVersionTable.PSVersion.ToString()
        powershell_edition   = $PSVersionTable.PSEdition
        wsl_command_present  = [bool](Get-Command 'wsl.exe' -ErrorAction SilentlyContinue)
    }
    commands       = [ordered]@{
        claude = Get-CommandSummary -Name 'claude'
        git    = Get-CommandSummary -Name 'git'
        gh     = Get-CommandSummary -Name 'gh'
        node   = Get-CommandSummary -Name 'node'
        npm    = Get-CommandSummary -Name 'npm'
    }
    settings       = @(
        Get-SettingsSummary -Label 'user' -Path (Join-Path $userClaudePath 'settings.json')
        Get-SettingsSummary -Label 'project' -Path (Join-Path $projectClaudePath 'settings.json')
        Get-SettingsSummary -Label 'project-local' -Path (Join-Path $projectClaudePath 'settings.local.json')
        Get-SettingsSummary -Label 'managed' -Path (Join-Path $managedClaudePath 'managed-settings.json')
    )
    customizations = [ordered]@{
        personal_skills  = Get-ChildNames -Path (Join-Path $userClaudePath 'skills') -Kind Directory
        project_skills   = Get-ChildNames -Path (Join-Path $projectClaudePath 'skills') -Kind Directory
        personal_agents  = Get-ChildNames -Path (Join-Path $userClaudePath 'agents') -Kind File -Filter '*.md'
        project_agents   = Get-ChildNames -Path (Join-Path $projectClaudePath 'agents') -Kind File -Filter '*.md'
        personal_commands = Get-ChildNames -Path (Join-Path $userClaudePath 'commands') -Kind File -Filter '*.md'
        project_commands  = Get-ChildNames -Path (Join-Path $projectClaudePath 'commands') -Kind File -Filter '*.md'
    }
    mcp            = @(
        Get-McpSummary -Label 'project' -Path (Join-Path $projectFullPath '.mcp.json')
    )
    memory         = [ordered]@{
        user_claude_md_exists       = Test-Path -LiteralPath (Join-Path $userClaudePath 'CLAUDE.md')
        project_root_claude_md_exists = Test-Path -LiteralPath (Join-Path $projectFullPath 'CLAUDE.md')
        project_dot_claude_md_exists  = Test-Path -LiteralPath (Join-Path $projectClaudePath 'CLAUDE.md')
        project_local_claude_md_exists = Test-Path -LiteralPath (Join-Path $projectFullPath 'CLAUDE.local.md')
        auto_memory_directory_exists  = Test-Path -LiteralPath (Join-Path $userClaudePath 'projects')
    }
    manual_checks  = @(
        '/status - verify active setting sources',
        '/context - record loaded memory, agents, skills, and context usage',
        '/memory - review auto memory without copying private contents',
        '/plugin - review enabled plugins and marketplaces',
        '/mcp - review MCP status',
        '/doctor - inspect installation and configuration problems',
        '/usage - record usage for baseline tasks'
    )
}

$jsonPath = Join-Path $OutputDirectory "claude-inventory-$timestamp.json"
$markdownPath = Join-Path $OutputDirectory "claude-inventory-$timestamp.md"

$inventory | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $jsonPath -Encoding UTF8

$claudeVersion = if ($inventory.commands.claude.version) { $inventory.commands.claude.version } else { 'not installed' }
$settingsFound = @($inventory.settings | Where-Object { $_.exists }).Count
$skillCount = @($inventory.customizations.personal_skills).Count + @($inventory.customizations.project_skills).Count
$agentCount = @($inventory.customizations.personal_agents).Count + @($inventory.customizations.project_agents).Count
$projectMcpNames = @($inventory.mcp | ForEach-Object { $_.server_names }).Count

$markdown = @"
# Claude Code Inventory

Generated: $($inventory.generated_at)

## Safety
- Read only: yes
- Read ~/.claude.json: no
- Read environment values: no
- Read permission rule values: no
- Read MCP URLs or headers: no
- Read transcripts: no
- Network commands executed: no

## Summary
- Claude Code: $claudeVersion
- PowerShell: $($inventory.platform.powershell_version) ($($inventory.platform.powershell_edition))
- Settings files found: $settingsFound
- Skills found by directory name: $skillCount
- Agents found by file name: $agentCount
- Project MCP server names found: $projectMcpNames
- WSL command present: $($inventory.platform.wsl_command_present)

## Next manual checks inside Claude Code
$($inventory.manual_checks | ForEach-Object { "- $_" } | Out-String)

The JSON file contains names and counts only. Review it before sharing.
"@

$markdown | Set-Content -LiteralPath $markdownPath -Encoding UTF8

Write-Host "Inventory completed."
Write-Host "JSON: $jsonPath"
Write-Host "Summary: $markdownPath"
Write-Host "Review both files before sharing them."
