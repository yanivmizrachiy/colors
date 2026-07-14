[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

$RepoUrl = 'https://github.com/yanivmizrachiy/colors.git'
$RepoPath = Join-Path $env:USERPROFILE 'Documents\ClaudeCodeResearch'
$WorktreesRoot = Join-Path $env:USERPROFILE 'Documents\ClaudeCodeResearch-Worktrees'
$Stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$Branch = "research/salon-$Stamp"
$WorktreePath = Join-Path $WorktreesRoot "salon-$Stamp"
$SessionName = "קלוט-קוד-סלון-$Stamp"
$LogPath = Join-Path $env:TEMP "klot-code-salon-$Stamp.log"

function Write-Step {
    param([Parameter(Mandatory)][string]$Text)
    Write-Host "`n=== $Text ===" -ForegroundColor Cyan
}

function Require-Command {
    param([Parameter(Mandatory)][string]$Name)
    if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
        throw "הפקודה '$Name' אינה מותקנת או אינה נמצאת ב-PATH."
    }
}

Start-Transcript -Path $LogPath -Force | Out-Null
try {
    Write-Step 'בדיקת כלים'
    Require-Command git
    Require-Command claude

    & git --version
    & claude --version

    Write-Step 'עדכון ואבחון Claude Code'
    try { & claude update } catch { Write-Warning 'העדכון לא הושלם; ממשיכים עם הגרסה הקיימת.' }
    try { & claude doctor } catch { Write-Warning 'האבחון החזיר הערה; Claude יתעד זאת במחקר.' }

    Write-Step 'סנכרון הריפו המרכזי'
    if (-not (Test-Path (Join-Path $RepoPath '.git'))) {
        New-Item -ItemType Directory -Force -Path (Split-Path $RepoPath) | Out-Null
        & git clone $RepoUrl $RepoPath
        if ($LASTEXITCODE -ne 0) { throw 'שכפול הריפו נכשל.' }
    }
    else {
        $Origin = (& git -C $RepoPath remote get-url origin 2>$null | Out-String).Trim()
        if ($Origin -notmatch 'yanivmizrachiy/colors') {
            throw "התיקייה $RepoPath מחוברת לריפו אחר: $Origin"
        }
    }

    & git -C $RepoPath fetch origin --prune
    if ($LASTEXITCODE -ne 0) { throw 'git fetch נכשל.' }

    New-Item -ItemType Directory -Force -Path $WorktreesRoot | Out-Null

    Write-Step 'יצירת סביבת עבודה מבודדת'
    & git -C $RepoPath worktree add -b $Branch $WorktreePath origin/main
    if ($LASTEXITCODE -ne 0) { throw 'יצירת Git worktree נכשלה.' }

    $Prompt = @(
        'אתה עובד במיזם "קלוט-קוד" של יניב.',
        '',
        'מטרת-העל: לקדם בעומק ובאיכות מקסימליים את המחקר והתכנון של מערכת העבודה האישית של יניב עם Claude Code.',
        '',
        'קרא תחילה לפי הסדר:',
        '1. CLAUDE.md',
        '2. CURRENT_STATE.md',
        '3. PROJECT_GOALS.md',
        '4. docs/RESEARCH_PROGRAM.md',
        '5. docs/EVIDENCE_MODEL.md',
        '6. docs/ROADMAP.md',
        '7. research/REPOSITORY_INDEX.md',
        '8. research/CROSS_PROJECT_MATRIX.md',
        '9. research/OPPORTUNITY_REGISTER.md',
        '10. docs/USER_INPUT_PLAN.md',
        '',
        'גבולות מחייבים:',
        '- עבוד וכתוב רק בריפו המרכזי ובענף הנוכחי.',
        '- ריפוים אחרים הם מקורות מחקר בקריאה בלבד.',
        '- אין לבצע שינוי, commit, push, PR, merge, Issue, פריסה או הגדרה בריפו אחר.',
        '- שלב זה הוא מחקר ותכנון בלבד. אין ליישם Skills, Hooks, Agents, Rules, MCP, CI או אוטומציות בפרויקטים.',
        '- אין למחוק קבצים, לבצע force-push, reset --hard, git clean או לשכתב היסטוריה.',
        '- אין לקרוא או לשמור credentials, tokens, cookies, passwords, API keys, ערכי .env או תמלילי JSONL גולמיים.',
        '- אין להכניס לריפו מידע אישי, נתוני תלמידים או מידע רגיש.',
        '- אל תשכפל מידע שכבר קיים; עדכן את מקור האמת המתאים.',
        '',
        'תוכנית העבודה:',
        '1. בצע audit של הריפו המרכזי: חוסרים, כפילויות, סתירות, מסמכים מיושנים וקישורים שבורים.',
        '2. השלם מחקר עומק של misparim:',
        '   - מפה את CLAUDE.md ואת כל .ai-memory.',
        '   - מדוד סדר קריאה, אורכי קבצים, כפילויות, מידע מיושן ועלות context משוערת.',
        '   - נתח CURRENT_STATE, USER_RULES, CHANGE_PROTOCOL, TASKS, REQUIREMENTS, DECISIONS ו-PROMPTS.',
        '   - הפרד מידע קבוע, מצב זמני, היסטוריה, דרישות מוצר והוראות תהליך.',
        '   - בדוק commits ודפוסי תיקון ככל שהגישה מאפשרת.',
        '3. לאחר מכן המשך בדוחות עומק של maagar, microsoft-forms, www ו-bbb.',
        '4. השלם חוסרי ראיות בדוחות mathmath ו-parabula-next.',
        '5. חקור ממקורות רשמיים ועדכניים את Claude Code: memory, rules, skills, hooks, subagents, agent teams, MCP, plugins, permissions, worktrees, context, compact, clear, handoff, resume, models, effort, Git, review, testing, preview, deployment ו-security.',
        '6. מותר להפעיל subagents למחקרים עצמאיים; כל אחד חייב להיות read-only כלפי ריפוים אחרים ולהחזיר ראיות, מקורות, תאריכים ורמות ודאות.',
        '7. בצע inventory מקומי בטוח בלבד: גרסאות, שמות רכיבים, נתיבים, גדלים ו-hashes. אין לקרוא secrets או transcripts.',
        '',
        'לכל ממצא תעד:',
        '- עובדה / הסקה / השערה.',
        '- רמת ודאות A/B/C/D.',
        '- מקור ותאריך.',
        '- השפעה על איכות, זמן, בטיחות, context וטוקנים.',
        '',
        'לכל הזדמנות עתידית תעד:',
        '- הבעיה, תדירות וחומרה.',
        '- חלופות ופתרון פשוט יותר.',
        '- סיכון ועלות תחזוקה.',
        '- rollback ומדד הצלחה.',
        '- אין ליישם אותה.',
        '',
        'עדכן לפי הצורך:',
        '- docs/projects/<repository>.md',
        '- research/REPOSITORY_INDEX.md',
        '- research/CROSS_PROJECT_MATRIX.md',
        '- research/OPPORTUNITY_REGISTER.md',
        '- RESEARCH_LOG.md',
        '- CURRENT_STATE.md',
        '- docs/ROADMAP.md',
        '- docs/PERSONAL_WORK_SYSTEM_PLAN.md',
        '',
        'בקרת איכות:',
        '- חפש לפני יצירת קובץ.',
        '- אמת נתיבים וקישורים.',
        '- קרא את git diff במלואו.',
        '- ודא שכל שינוי שייך למחקר ולתכנון בלבד.',
        '- אל תסמן משימה כהושלמה בלי ראיות.',
        '- אל תעצור לאחר דוח אחד כל עוד קיימת עבודת מחקר בטוחה ורלוונטית.',
        '',
        'בסיום:',
        '1. כתוב סיכום מנהלים בתוך הריפו.',
        '2. עדכן מה הושלם ומה עדיין חסר.',
        '3. הרץ git status ו-git diff ובדוק את כל השינויים.',
        '4. בצע commit ממוקד לענף הנוכחי בלבד.',
        '5. דחוף את הענף ל-GitHub אם ההתחברות מאפשרת.',
        '6. אם GitHub CLI מחובר, פתח Pull Request אל main אך אל תמזג אותו.',
        '7. דווח את שם הענף, ה-commit, ה-PR, הממצאים והצעד הבא.'
    ) -join [Environment]::NewLine

    Write-Step 'הכנת הפעלת Claude Code'
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
        $ClaudeArgs.Add('max')
    }
    if ($HelpText -match '--permission-mode\b') {
        $ClaudeArgs.Add('--permission-mode')
        $ClaudeArgs.Add('acceptEdits')
    }

    Write-Host "Worktree: $WorktreePath" -ForegroundColor Green
    Write-Host "Branch:   $Branch" -ForegroundColor Green
    Write-Host "Log:      $LogPath" -ForegroundColor Green
    Write-Host '`nClaude Code מתחיל כעת. ייתכן שתתבקש לאשר פקודות Git או פקודות קריאה בטוחות.' -ForegroundColor Yellow

    & claude @ClaudeArgs $Prompt
    $ClaudeExit = $LASTEXITCODE

    Write-Step 'סיום'
    Write-Host "Claude exit code: $ClaudeExit"
    Write-Host "Branch: $Branch"
    Write-Host "Worktree: $WorktreePath"
    Write-Host "Log: $LogPath"

    if ($ClaudeExit -ne 0) {
        Write-Warning 'Claude הסתיים עם שגיאה או הופסק. כל עבודה שכבר נשמרה נשארה ב-worktree.'
    }
}
finally {
    try { Stop-Transcript | Out-Null } catch {}
}
