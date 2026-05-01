$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$Owner = "yanivmizrachiy"
$Repo = "colors"
$Work = "C:\Users\yaniv\colors"
Write-Host "=== COLORS SMART PUBLISH START ===" -ForegroundColor Cyan
if (!(Test-Path $Work)) { throw "התיקייה $Work לא קיימת. חלץ לשם את קובצי ה-ZIP קודם." }
Set-Location $Work
git --version | Out-Host
node --version | Out-Host
gh --version | Select-Object -First 1 | Out-Host
node scripts\validate.js
node scripts\doctor.js
git init
git branch -M main
$RepoExists = $false
try { gh repo view "$Owner/$Repo" | Out-Null; $RepoExists = $true } catch { $RepoExists = $false }
if ($RepoExists) { Write-Host "REPO_EXISTS=$Owner/$Repo" -ForegroundColor Green } else { gh repo create "$Owner/$Repo" --public --description "colors — Hebrew RTL design library for GPT website generation" --source=. --remote=origin }
try { git remote set-url origin "https://github.com/$Owner/$Repo.git" } catch { git remote add origin "https://github.com/$Owner/$Repo.git" }
git add .
$Diff = git diff --cached --name-only
if ($Diff) { git commit -m "Initial colors V4 design system app" } else { Write-Host "NO_CHANGES_TO_COMMIT" }
git push -u origin main
try { gh api -X POST "repos/$Owner/$Repo/pages" -f build_type=workflow | Out-Null } catch { Write-Host "Pages may already be configured or will be configured by workflow." -ForegroundColor Yellow }
Write-Host "COLORS_PUBLISH_OK" -ForegroundColor Green
Write-Host "REPO_URL=https://github.com/$Owner/$Repo"
Write-Host "PAGES_EXPECTED=https://$Owner.github.io/$Repo/"
Write-Host "ACTIONS=https://github.com/$Owner/$Repo/actions"
