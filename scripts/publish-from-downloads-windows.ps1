$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$Owner = "yanivmizrachiy"
$Repo = "colors"
$Work = "C:\Users\yaniv\colors"
$Downloads = Join-Path $env:USERPROFILE "Downloads"

Write-Host "=== COLORS V5 SMART PUBLISH START ===" -ForegroundColor Cyan

$Zip = Get-ChildItem $Downloads -Filter "colors*_repo_ready.zip" -File | Sort-Object LastWriteTime -Descending | Select-Object -First 1
if (!$Zip) { throw "לא נמצא ZIP של colors בתיקיית Downloads" }

Write-Host ("ZIP_FOUND=" + $Zip.FullName) -ForegroundColor Green

if (Test-Path $Work) { Remove-Item $Work -Recurse -Force }
New-Item -ItemType Directory -Force -Path $Work | Out-Null

$Tmp = Join-Path $env:TEMP ("colors_publish_" + [guid]::NewGuid().ToString("N"))
New-Item -ItemType Directory -Force -Path $Tmp | Out-Null
Expand-Archive -LiteralPath $Zip.FullName -DestinationPath $Tmp -Force

$Index = Get-ChildItem $Tmp -Recurse -Filter index.html | Select-Object -First 1
if (!$Index) { throw "מבנה ZIP לא תקין: index.html חסר" }
$Src = $Index.Directory.FullName
if (!(Test-Path (Join-Path $Src "site.config.json"))) { throw "מבנה ZIP לא תקין: site.config.json חסר" }

Copy-Item (Join-Path $Src "*") $Work -Recurse -Force
Set-Location $Work

node scripts\validate.js
node scripts\doctor.js

git init
git branch -M main
git config user.name "Yaniv GPT Colors Publisher" | Out-Null
git config user.email "yanivmizrachiy@users.noreply.github.com" | Out-Null

$RepoExists = $false
try {
  gh repo view "$Owner/$Repo" | Out-Null
  $RepoExists = $true
} catch {
  $RepoExists = $false
}

if ($RepoExists) {
  Write-Host "REPO_EXISTS=$Owner/$Repo" -ForegroundColor Green
} else {
  Write-Host "CREATING_REPO=$Owner/$Repo" -ForegroundColor Yellow
  gh repo create "$Owner/$Repo" --public --description "colors — Hebrew RTL design library for GPT website generation" --source=. --remote=origin
}

try { git remote set-url origin "https://github.com/$Owner/$Repo.git" } catch { git remote add origin "https://github.com/$Owner/$Repo.git" }

git add .
$Staged = git diff --cached --name-only
if ($Staged) { git commit -m "Initial colors V5 design system app" } else { Write-Host "NO_CHANGES_TO_COMMIT" }

git push -u origin main

try {
  gh api -X POST "repos/$Owner/$Repo/pages" -f build_type=workflow | Out-Null
} catch {
  Write-Host "Pages may already be configured or will be configured by workflow." -ForegroundColor Yellow
}

Write-Host "COLORS_V5_PUBLISH_OK" -ForegroundColor Green
Write-Host "REPO_URL=https://github.com/$Owner/$Repo"
Write-Host "ACTIONS_URL=https://github.com/$Owner/$Repo/actions"
Write-Host "PAGES_EXPECTED=https://$Owner.github.io/$Repo/"
