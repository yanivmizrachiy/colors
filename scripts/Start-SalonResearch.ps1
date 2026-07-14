[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

# This file is intentionally ASCII-only so Windows PowerShell 5.1 can parse it.
# If it starts under Windows PowerShell, it immediately relaunches itself in pwsh 7.
if ($PSVersionTable.PSVersion.Major -lt 7) {
    $PwshCommand = Get-Command pwsh -ErrorAction SilentlyContinue
    if (-not $PwshCommand) {
        throw 'PowerShell 7 (pwsh) is required. Install it and run this command again.'
    }

    & $PwshCommand.Source -NoProfile -ExecutionPolicy Bypass -File $PSCommandPath
    exit $LASTEXITCODE
}

$Utf8 = [System.Text.UTF8Encoding]::new($false)
[Console]::InputEncoding = $Utf8
[Console]::OutputEncoding = $Utf8
$OutputEncoding = $Utf8

$RepoUrl = 'https://github.com/yanivmizrachiy/colors.git'
$RepoPath = Join-Path $env:USERPROFILE 'Documents\ClaudeCodeResearch'
$WorktreesRoot = Join-Path $env:USERPROFILE 'Documents\ClaudeCodeResearch-Worktrees'
$Stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$Branch = "research/salon-$Stamp"
$WorktreePath = Join-Path $WorktreesRoot "salon-$Stamp"
$SessionName = "klot-code-salon-$Stamp"
$LogPath = Join-Path $env:TEMP "klot-code-salon-$Stamp.log"

function Write-Step {
    param([Parameter(Mandatory)][string]$Text)
    Write-Host "`n=== $Text ===" -ForegroundColor Cyan
}

function Require-Command {
    param([Parameter(Mandatory)][string]$Name)
    if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
        throw "Required command '$Name' is not installed or not available in PATH."
    }
}

Start-Transcript -Path $LogPath -Force | Out-Null
try {
    Write-Step 'Checking required tools'
    Require-Command git
    Require-Command claude

    & git --version
    & claude --version

    Write-Step 'Updating and diagnosing Claude Code'
    & claude update
    if ($LASTEXITCODE -ne 0) {
        Write-Warning 'Claude Code update did not complete. Continuing with the installed version.'
    }

    & claude doctor
    if ($LASTEXITCODE -ne 0) {
        Write-Warning 'Claude doctor reported an issue. The research session will record it.'
    }

    Write-Step 'Synchronizing the central repository'
    if (-not (Test-Path (Join-Path $RepoPath '.git'))) {
        New-Item -ItemType Directory -Force -Path (Split-Path $RepoPath) | Out-Null
        & git clone $RepoUrl $RepoPath
        if ($LASTEXITCODE -ne 0) {
            throw 'Repository clone failed.'
        }
    }
    else {
        $Origin = (& git -C $RepoPath remote get-url origin 2>$null | Out-String).Trim()
        if ($Origin -notmatch 'yanivmizrachiy/colors') {
            throw "The folder '$RepoPath' is connected to a different repository: $Origin"
        }
    }

    & git -C $RepoPath fetch origin --prune
    if ($LASTEXITCODE -ne 0) {
        throw 'git fetch failed.'
    }

    New-Item -ItemType Directory -Force -Path $WorktreesRoot | Out-Null

    Write-Step 'Creating an isolated Git worktree'
    & git -C $RepoPath worktree add -b $Branch $WorktreePath origin/main
    if ($LASTEXITCODE -ne 0) {
        throw 'Git worktree creation failed.'
    }

    $PromptPath = Join-Path $WorktreePath 'prompts\salon-research-master-prompt.he.txt'
    if (-not (Test-Path $PromptPath)) {
        throw "Research prompt file was not found: $PromptPath"
    }

    $Prompt = [System.IO.File]::ReadAllText($PromptPath, $Utf8)
    if ([string]::IsNullOrWhiteSpace($Prompt)) {
        throw 'Research prompt file is empty.'
    }

    Write-Step 'Preparing the Claude Code session'
    Set-Location $WorktreePath

    $HelpText = (& claude --help 2>&1 | Out-String)
    $ClaudeArgs = [System.Collections.Generic.List[string]]::new()

    if ($HelpText -match '--name\b') {
        $ClaudeArgs.Add('--name')
        $ClaudeArgs.Add($SessionName)
    }

    if ($HelpText -match '--model\b') {
        $ClaudeArgs.Add('--model')
        $ClaudeArgs.Add('opus')
    }

    if ($HelpText -match '--fallback-model\b') {
        $ClaudeArgs.Add('--fallback-model')
        $ClaudeArgs.Add('sonnet')
    }

    if ($HelpText -match '--effort\b') {
        $ClaudeArgs.Add('--effort')
        if ($HelpText -match '--effort[^\r\n]*\bmax\b') {
            $ClaudeArgs.Add('max')
        }
        else {
            $ClaudeArgs.Add('high')
        }
    }

    if ($HelpText -match '--permission-mode\b') {
        $ClaudeArgs.Add('--permission-mode')
        $ClaudeArgs.Add('acceptEdits')
    }

    Write-Host "PowerShell: $($PSVersionTable.PSVersion)" -ForegroundColor Green
    Write-Host "Worktree:  $WorktreePath" -ForegroundColor Green
    Write-Host "Branch:    $Branch" -ForegroundColor Green
    Write-Host "Session:   $SessionName" -ForegroundColor Green
    Write-Host "Log:       $LogPath" -ForegroundColor Green
    Write-Host "`nClaude Code is starting now. Approve only safe read, edit, Git commit, and branch push actions inside this worktree." -ForegroundColor Yellow

    & claude @ClaudeArgs $Prompt
    $ClaudeExit = $LASTEXITCODE

    Write-Step 'Session finished'
    Write-Host "Claude exit code: $ClaudeExit"
    Write-Host "Branch:           $Branch"
    Write-Host "Worktree:         $WorktreePath"
    Write-Host "Log:              $LogPath"

    if ($ClaudeExit -ne 0) {
        Write-Warning 'Claude Code ended with an error or was stopped. Any saved work remains in the isolated worktree.'
    }
}
finally {
    try { Stop-Transcript | Out-Null } catch {}
}
