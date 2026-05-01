$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$Owner = "yanivmizrachiy"
$Repo = "colors"
$Url = "https://$Owner.github.io/$Repo/"
$Work = "C:\Users\yaniv\colors"

Write-Host "=== COLORS PAGES CHECK START ===" -ForegroundColor Cyan
Write-Host "URL=$Url"

if (Test-Path $Work) {
  Set-Location $Work
  if (Test-Path "scripts\post-publish-audit.js") {
    node scripts\post-publish-audit.js
  } else {
    Write-Host "LOCAL_AUDIT_SCRIPT_MISSING" -ForegroundColor Yellow
  }
} else {
  Write-Host "LOCAL_REPO_NOT_FOUND=$Work" -ForegroundColor Yellow
}

Start-Process $Url
Write-Host "OPENED=$Url" -ForegroundColor Green
Write-Host "=== COLORS PAGES CHECK END ===" -ForegroundColor Cyan
