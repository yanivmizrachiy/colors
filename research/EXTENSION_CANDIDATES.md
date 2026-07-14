# מועמדי הרחבות לקלוטקורד

עודכן: 2026-07-15

> מסמך מחקר בלבד. הוא אינו מאשר התקנה או שינוי הגדרות. מקור הכללים היחיד הוא `CLAUDE.md`.

## מטרת המסמך
לדרג Skills, Plugins, Hooks, MCP, Subagents ואוטומציות לפי העבודה האמיתית של יניב: אתרי Next.js/TypeScript, ממשקי RTL, חומרי הוראה, מצגות, PDFs, GitHub, Vercel, DB, Forms ואיסוף תוכן אמיתי.

## מקורות ראשוניים
- Best practices: `https://code.claude.com/docs/en/best-practices`
- Memory and rules: `https://code.claude.com/docs/en/memory`
- Skills: `https://code.claude.com/docs/en/skills`
- Hooks: `https://code.claude.com/docs/en/hooks`
- Subagents: `https://code.claude.com/docs/en/sub-agents`
- Agent teams: `https://code.claude.com/docs/en/agent-teams`
- Plugins: `https://code.claude.com/docs/en/plugins`
- Permissions: `https://code.claude.com/docs/en/permissions`
- Settings and sandbox: `https://code.claude.com/docs/en/settings`
- Costs: `https://code.claude.com/docs/en/costs`
- Official marketplace: `https://github.com/anthropics/claude-plugins-official`
- Community marketplace: `https://github.com/anthropics/claude-plugins-community`

## שער בדיקה לכל הרחבה
לפני התקנה או יצירה מתעדים:
1. בעיה אמיתית שהיא פותרת.
2. תדירות וחומרה.
3. חלופה פשוטה יותר: prompt, CLI, test, permission או script קטן.
4. מקור ובעלים.
5. commit/tag מדויק ופעילות תחזוקה.
6. קוד ותלויות שמופעלים.
7. כלים והרשאות: read, write, shell, network, MCP, secrets.
8. auto-invocation או הפעלה ידנית.
9. עלות context וטוקנים.
10. נתונים שעוזבים את המחשב.
11. מדד הצלחה.
12. דרך השבתה, הסרה ו־rollback.

## Priority A — מועמדים לפיילוט ראשון

### A1. Plugin רשמי ל־TypeScript LSP
**בעיה:** רוב הפרויקטים המרכזיים משתמשים ב־TypeScript/Next.js; חיפוש טקסטואלי בלבד עלול לפספס references, types ושגיאות מיד לאחר עריכה.

**עובדה רשמית:** Anthropic ממליצה לפרויקטים בשפות typed להתקין Plugin LSP מוכן מה־marketplace הרשמי.

**ערך צפוי:**
- ניווט מדויק לסמלים ול־references.
- שגיאות TypeScript קרובות יותר לזמן העריכה.
- פחות קריאת קבצים מיותרת ופחות תיקוני המשך.

**סיכון:** נמוך־בינוני; יש לבדוק את שם ה־Plugin המדויק, התלויות וה־context לפני התקנה.

**פיילוט:** פרויקט TypeScript אחד, שלוש משימות, השוואת קבצים שנקראו, זמן ושגיאות typecheck.

### A2. Permission profile בטוח ל־Windows/PowerShell
**בעיה:** ריבוי אישורים יוצר click fatigue, אבל allow-all מסוכן.

**פתרון מועמד:**
- deny לקריאת `.env`, credentials, browser profiles ו־SSH.
- deny לפקודות הרסניות ו־force operations.
- allow מצומצם ל־`git status`, `git diff`, tests, typecheck ו־build ידועים.
- ask ל־push, deploy, DB ופקודות מחיקה.

**עדיפות:** לפני Hook. Permissions הן שכבת אכיפה מובנית ופשוטה יותר.

**הערת סביבה:** sandbox מלא נתמך ב־macOS/Linux/WSL2; יש לבדוק אם העבודה במחשב Windows נעשית דרך WSL2 לפני המלצה עליו.

### A3. Skill ידני `safe-change`
**בעיה:** חוזר צורך קבוע: לאמת ריפו, branch, scope, עבודה מקומית, בדיקות, diff ו־PR.

**מבנה:**
- `disable-model-invocation: true`.
- ללא deploy או merge.
- כלים מוגבלים ל־Read/Grep/Git ופקודות הבדיקה של הפרויקט.
- הפעלה ידנית בלבד: `/safe-change ...`.

**תנאי בנייה:** רק לאחר שלוש משימות שבהן תבנית ה־task brief חזרה והוכיחה יציבות.

### A4. Skill `ui-verify`
**בעיה:** בפרויקטים של יניב build שעבר אינו מוכיח RTL, mobile, A4, PDF, מצגת או דיוק חזותי.

**תהליך מועמד:**
1. לזהות את המסלול או הרכיב שהשתנה.
2. להפעיל preview קיים.
3. לבדוק viewports שנקבעו מראש.
4. לצלם screenshots.
5. לבדוק console/network.
6. להשוות מול מקור או דרישה.
7. להחזיר evidence ולא רק PASS.

**סיכון:** בינוני; browser tooling עלול להוסיף dependencies והרשאות. מתחילים ב־Skill ידני שמשתמש בכלים שכבר קיימים.

### A5. Subagent/Skill `repo-audit` לקריאה בלבד
**בעיה:** audit של repository קורא הרבה קבצים, commits ו־PRs וממלא את ה־context הראשי.

**פתרון:** context fork או Subagent עם Read/Grep/Glob ו־Git read-only בלבד.

**תוצר:** עובדות, קבצים, מקורות, סיכונים ושאלות פתוחות. ללא edits, commit או push.

### A6. Skill `handoff`
**בעיה:** משימות ארוכות עוברות בין ימים, מחשבים או sessions ומצריכות הסבר מחדש.

**תוצר קצר:** מטרה, מצב, files changed, tests, branch/PR, חסימות, החלטות והצעד הבא.

**גבול:** אין לשמור transcript; רק סיכום מסונן.

## Priority B — מועמדים לאחר הפיילוט

### B1. Skill `math-rtl-verify`
מותאם לחומרי ההוראה של יניב:
- סימן לפני מספר.
- בידוד LTR בתוך RTL.
- שמירת טקסט ומספרים בדיוק.
- בדיקת SVG/גרפיקה מתמטית.
- A4, מצגות ודפי עבודה.

נבנה רק לאחר זיהוי חוזר של אותן בדיקות בשלושה פרויקטים לפחות.

### B2. Hook לחסימת פעולות הרסניות
רק אם permissions אינן מספיקות או אם נמצא כשל חוזר:
- force push.
- `reset --hard` / `git clean`.
- מחיקה רחבה.
- כתיבה ל־`.env` או credentials.
- push ל־`main`.

Hook יהיה קטן, testable ועם הודעת חסימה ברורה. אין Hook שמריץ build מלא אחרי כל edit.

### B3. Hook לבחירת בדיקות לפי קבצים
לאחר שיש מיפוי אמין:
- TypeScript → typecheck/tests ממוקדים.
- UI → preview/browser.
- docs בלבד → diff/link check.
- DB → schema/client/integration checks.

נדרש fallback לבדיקה רחבה כאשר המיפוי אינו ודאי.

### B4. MCP מצומצם לשירות חיצוני
מועמדים אפשריים:
- GitHub רק אם `gh` CLI אינו מספיק.
- Vercel/hosting לצפייה ב־deployments ולוגים.
- DB לקריאה בלבד בעת חקירה.
- browser/design רק כאשר הוא מחליף עבודה ידנית חוזרת.

מתחילים ב־read-only וב־project scope. לא מחברים MCP רבים “ליתר ביטחון”.

### B5. Scheduled task לביקורת חודשית
לאחר שהמבנה יציב:
- בדיקת גרסת Claude Code.
- רשימת Skills/Plugins/MCP פעילים.
- זיהוי רכיבים שלא היו בשימוש.
- בדיקת גודל `CLAUDE.md`, auto memory ו־skill listing.
- הצעת הסרה או עדכון — ללא התקנה אוטומטית.

## Priority C — מחקר בלבד כרגע
- Plugin קהילתי לביקורת accessibility.
- Plugin/Skill ל־PDF accessibility או בדיקת מסמכים.
- adversarial review בין מודלים למשימות מסוכנות במיוחד.
- מערכת code review אוטומטית ל־PRs גדולים.
- אוטומציית ingestion עם dry-run, hashes ו־duplicate detection.

כל מועמד קהילתי דורש review של repository וה־commit ה־pinned, גם אם עבר סריקה במרקטפלייס.

## לא להתקין כרגע

### חבילות “צוות מלא” או עשרות agents
סיבה: הקשר כפול, תיאום כבד, תהליכים קשיחים ועלות טוקנים גבוהה. Agent Teams ניסיוניים ומתאימים רק לעבודה עצמאית מקבילית אמיתית.

### לולאות אוטונומיות אינסופיות
סיבה: עלות לא צפויה, context drift, סיכון לפעולות צד וקושי להבין מה בוצע.

### Plugins עם write access לחשבונות חיים
לדוגמה פרסום, קמפיינים, כספים או DB production — אינם קשורים כרגע ליעדי קלוטקורד ודורשים סיכון והרשאות שאינם מוצדקים.

### Skill packs גנריים או מחוללים בכמות גדולה
סיבה: כפילויות, descriptions שממלאים את skill listing, triggers לא מדויקים ותחזוקה לא ברורה.

### Memory/Agent שמעדכן לבד את כללי הפרויקט
סיבה: עלול ליצור מקור כללים נוסף ו־state drift. כל שינוי ב־`CLAUDE.md` חייב להיות reviewable ב־Git.

## סדר הפיילוט המומלץ
1. inventory מקומי מסונן: גרסה, Plugins, Skills, Hooks, MCP ו־settings — שמות בלבד.
2. baseline בשלוש משימות TypeScript/UI/repository audit.
3. פיילוט TypeScript LSP רשמי בפרויקט אחד.
4. בניית Skill אחד בלבד: `safe-change` או `ui-verify`, לפי החיכוך שנמדד.
5. השוואה והחלטת keep/remove.
6. רק לאחר הצלחה: permission profile או Hook קטן.
7. הרחבה לפרויקט נוסף.

## מדדי הצלחה
- פחות קבצים שנקראו לפני root cause.
- פחות שאלות ואישורים ידניים.
- ירידה בזמן עד תוצאה מאומתת.
- פחות תיקוני המשך ורגרסיות.
- context/usage נמוכים יותר או איכות גבוהה יותר באותה צריכה.
- הסרה פשוטה ללא פגיעה בפרויקט.
