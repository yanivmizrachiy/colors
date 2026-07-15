# Inventory מקומי בטוח של Claude Code

עודכן: 2026-07-15

> שלב זה אינו מתקין דבר, אינו משנה הגדרות ואינו קורא secrets או transcripts.

## המטרה
ליצור baseline של סביבת Claude Code המקומית לפני יצירת Skill, התקנת Plugin או שינוי permissions.

## מה הכלי אוסף
- גרסאות זמינות של Claude Code, Git, GitHub CLI, Node ו־npm.
- גרסת PowerShell ומידע מערכת כללי.
- קיום קובצי settings ברמת user, project, local ו־managed.
- שמות המפתחות העליונים בלבד בקובצי settings.
- מספר כללי allow / ask / deny—ללא תוכן הכללים.
- שמות אירועי Hooks—ללא פקודות ה־Hooks.
- שמות Plugins שמופיעים ב־settings—ללא config values.
- שמות תיקיות Skills ושמות קובצי Agents/Commands.
- שמות MCP שמוגדרים ב־`.mcp.json` של הפרויקט—ללא URLs, headers או tokens.
- קיום קובצי CLAUDE ומיקום כללי של auto memory.

## מה הכלי אינו קורא
- `~/.claude.json`.
- ערכי environment.
- תוכן permission rules.
- URLs, headers או commands של MCP.
- transcripts והיסטוריית prompts.
- `.env`, tokens, cookies או credentials.
- תוכן קובצי Skills, Agents או Commands.

## הפעלה מתוך Clone של קלוטקורד
ב־PowerShell 7:

```powershell
cd "$env:USERPROFILE\Documents\ClaudeCodeResearch"
git pull --ff-only
pwsh -NoProfile -File .\scripts\Collect-ClaudeCodeInventory.ps1 -ProjectPath .
```

אפשר לבדוק פרויקט אחר בלי לשנות אותו:

```powershell
pwsh -NoProfile -File .\scripts\Collect-ClaudeCodeInventory.ps1 -ProjectPath "$env:USERPROFILE\Documents\PROJECT_NAME"
```

## הפעלה ישירה מה־Raw URL
הסקריפט עצמו מכיל ASCII בלבד כדי לעבוד בצורה יציבה גם כאשר PowerShell או download handling אינם מזהים UTF-8 נכון.

```powershell
$u='https://raw.githubusercontent.com/yanivmizrachiy/colors/main/scripts/Collect-ClaudeCodeInventory.ps1'; $p="$env:TEMP\Collect-ClaudeCodeInventory.ps1"; Invoke-WebRequest -UseBasicParsing $u -OutFile $p; pwsh -NoProfile -File $p
```

## התוצאה
הכלי יוצר שני קבצים תחת:

```text
%USERPROFILE%\Documents\KlotKord-Inventory\
```

- `claude-inventory-<timestamp>.json`
- `claude-inventory-<timestamp>.md`

יש לפתוח ולבדוק את שני הקבצים לפני שיתוף.

## בדיקות ידניות בתוך Claude Code
הכלי אינו מפעיל פקודות אינטראקטיביות. לאחריו מריצים ידנית:

- `/status` — אילו שכבות settings נטענו.
- `/context` — memory, agents, skills וצריכת context.
- `/memory` — auto memory, בלי להעתיק תוכן רגיש.
- `/plugin` — Plugins ו־marketplaces פעילים.
- `/mcp` — סטטוס MCP.
- `/doctor` — בעיות installation/configuration.
- `/usage` — baseline של שימוש.

## קריטריון השלמה
Inventory הושלם כאשר:
1. קובצי JSON ו־Markdown נוצרו ונבדקו.
2. הפקודות הידניות נרשמו כסיכום בלבד.
3. לא נשמרו ערכים רגישים.
4. זוהו הגדרות רחבות, רכיבים לא־בשימוש או מקורות context מיותרים.
5. לא בוצע שינוי בהגדרות לפני review והחלטה נפרדת.
