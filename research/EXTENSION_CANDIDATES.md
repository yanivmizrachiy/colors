# מועמדי הרחבות לקלוטקורד

עודכן: 2026-07-15

> מסמך מחקר בלבד. הוא אינו מאשר התקנה או שינוי הגדרות. מקור הכללים היחיד הוא `CLAUDE.md`.

## מטרת המסמך
לדרג Skills, Plugins, Hooks, MCP, Subagents ואוטומציות לפי העבודה האמיתית של יניב: זיכרון דרישות, Next.js/TypeScript, RTL, חומרי הוראה, A4/PDF, GitHub, Vercel, DB, Moodle, Forms, מכשירים וקבצים אמיתיים.

## מקורות רשמיים
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
3. חלופה פשוטה יותר.
4. מקור, בעלים ו־commit/tag מדויק.
5. קוד ותלויות שמופעלים.
6. כלים והרשאות.
7. auto-invocation או הפעלה ידנית.
8. עלות context וטוקנים.
9. נתונים שעוזבים את המחשב.
10. מדד הצלחה.
11. דרך השבתה, הסרה ו־rollback.

## Priority A — פיילוטים ראשונים

### A1. Skill ידני `capture-requirement`
**הבעיה המרכזית של יניב:** דרישות חדשות נאמרות לאורך העבודה, ולעיתים נשמרות בכמה מסמכים, נשכחות או סותרות דרישה קודמת.

**תהליך:**
1. קבלת הדרישה החדשה.
2. סיווג: preference / rule / product contract / decision / state / task / sensitive.
3. חיפוש כפילות וסתירה.
4. הצעת ניסוח קנוני, scope ומיקום.
5. הצגת מה יוחלף או יעודכן.
6. כתיבה רק לאחר אישור יניב.
7. הצעה ל־test/guard/Rule/Skill כאשר טקסט בלבד אינו מספיק.

**מבנה בטיחות:**
- `disable-model-invocation: true`.
- הפעלה ידנית בלבד.
- אין שינוי קוד מוצר.
- אין שמירת מידע רגיש.
- אין יצירת דף כללים נוסף.

**מדד הצלחה:** פחות הסברים חוזרים, אפס כפילויות חדשות ואפס דרישות קריטיות שנשכחו.

### A2. Skill ידני `safe-change`
**בעיה:** צורך חוזר לאמת repo, branch, scope, עבודה מקומית, בדיקות, diff ו־PR.

**מבנה:**
- הפעלה ידנית.
- ללא deploy או merge.
- כלים מוגבלים ל־Read/Grep/Git ופקודות בדיקה מאושרות.
- output קצר: preflight, risk lane, tests ו־PR report.

### A3. Permission profile בטוח
**בעיה:** click fatigue מצד אחד והרשאות רחבות מדי מצד שני.

**Deny:**
- `.env`, credentials, browser profiles ו־SSH keys.
- force push, `reset --hard`, `git clean` ומחיקה רחבה.

**Allow:**
- `git status`, `git diff`, `git log`.
- tests/typecheck/build ידועים.
- קריאה לא־רגישה.

**Ask:**
- push, merge, deploy, DB, auth, system/device actions.

**ממצא מחקרי:** נמצאה הרשאת project-local רחבה ל־`gh pr merge:*`; היא מועמדת לצמצום.

### A4. Skill `ui-verify`
**בעיה:** build שעבר אינו מוכיח RTL, mobile, A4, PDF, מצגת או דיוק חזותי.

**תהליך:**
1. זיהוי האזור שהשתנה.
2. הפעלת preview קיים.
3. בדיקת viewports.
4. screenshots.
5. console/network.
6. clipping/overflow.
7. השוואה למקור או דרישה.
8. דיווח evidence ומה לא אומת.

### A5. Subagent/Skill `repo-audit` לקריאה בלבד
**בעיה:** audit של repository, PRs ו־CI ממלא את ה־context הראשי.

**כלים:** Read/Grep/Glob/Git read-only.

**תוצר:** זהות קנונית, stale docs, open PRs, duplicate sources, permissions, CI noise, סיכונים ושאלות פתוחות. ללא edits או push.

### A6. Skill `handoff`
**בעיה:** מעבר בין ימים, מחשבים ו־sessions.

**תוצר:** מטרה, מצב, files changed, tests, branch/PR, החלטות, חסימות והצעד הבא. ללא transcript גולמי.

## Priority B — לאחר פיילוט ראשון

### B1. Plugin רשמי ל־TypeScript LSP
**ערך צפוי:** references, types ושגיאות קרובות לזמן העריכה; פחות קריאת קבצים ותיקוני המשך.

**פיילוט:** פרויקט TypeScript אחד, שלוש משימות, השוואת זמן, קבצים שנקראו ושגיאות typecheck.

**תנאי:** אימות שם ה־Plugin הרשמי, source, dependencies ויכולת הסרה.

### B2. Skill `ingest-real-files`
עבור `maagar` ופרויקטי קבצים:
- inventory.
- metadata.
- hashes.
- duplicate detection.
- dry-run.
- apply.
- validate.
- browser QA.

### B3. Skill `math-rtl-verify`
- סימן לפני מספר.
- בידוד LTR בתוך RTL.
- שוויון וסדר ביטוי.
- שמירת טקסט ומספרים.
- SVG/גרפים.
- A4, מצגות ודפי עבודה.
- התאמה למקור מאושר.

נבנה רק לאחר צורך חוזר בכמה ריפו ליבה.

### B4. Hook לחסימת פעולות הרסניות
רק אם permissions אינן מספיקות:
- force push.
- `reset --hard` / `git clean`.
- מחיקה רחבה.
- כתיבה ל־secrets.
- push ישיר ל־`main` בפרויקט מוגן.

Hook יהיה קטן, testable וללא build כבד.

### B5. Hook לבחירת בדיקות לפי קבצים
לאחר מיפוי אמין:
- TypeScript → typecheck/tests ממוקדים.
- UI → preview/browser.
- docs בלבד → diff/link check.
- DB → schema/client/integration.

נדרש fallback לבדיקה רחבה כאשר הסיווג אינו ודאי.

### B6. MCP מצומצם
- GitHub רק אם `gh` CLI אינו מספיק.
- hosting לצפייה ב־deployments/logs.
- DB לקריאה בלבד בעת חקירה.
- browser/design כאשר הוא מחליף עבודה ידנית חוזרת.

מתחילים ב־read-only וב־project scope.

### B7. Scheduled task לביקורת חודשית
- גרסת Claude Code.
- Skills/Plugins/MCP פעילים.
- רכיבים שלא היו בשימוש.
- גודל `CLAUDE.md` ו־skill listing.
- stale auto memory.
- הצעת הסרה או עדכון בלבד—not שינוי אוטומטי.

## Priority C — מחקר בלבד
- accessibility review.
- PDF accessibility.
- adversarial review בין מודלים למשימות מסוכנות.
- code review אוטומטי ל־PRs גדולים.
- audit של workflows מתוזמנים בעלי `contents: write`.

## לא להתקין כרגע

### חבילות עשרות Skills/Agents
סיבה: skill listing, triggers לא מדויקים, context כפול ותחזוקה גבוהה.

### Agent Teams כברירת מחדל
סיבה: לכל teammate context נפרד; מתאים רק לעבודה מקבילית עצמאית אמיתית.

### לולאות אוטונומיות אינסופיות
סיבה: עלות לא צפויה, context drift ופעולות צד.

### Plugins עם write access לחשבונות חיים
לא מוצדקים לפני צורך מדיד ו־permission review.

### Memory Agent שמשנה לבד את כללי הפרויקט
כל שינוי דרישה חייב להיות reviewable ב־Git ומאושר על ידי יניב.

### Scheduled workflow שמשכתב `RULES.md`
המחקר מצא דגם כזה. הוא יוצר state/quality מדומים ומוחק זיכרון קנוני; אסור להשתמש בו כמודל.

## סדר הפיילוט
1. inventory מקומי מסונן.
2. baseline של שלוש משימות.
3. `capture-requirement` ידני.
4. השוואת דרישות חוזרות וכפילויות.
5. `safe-change` או permission profile.
6. TypeScript LSP בפרויקט אחד.
7. `ui-verify` בפרויקט אחד.
8. הרחבה לריפו נוסף רק לאחר keep/remove decision.

## מדדי הצלחה
- פחות דרישות שמוסברות מחדש.
- אפס כפילויות חדשות בזיכרון.
- פחות קבצים שנקראו לפני root cause.
- פחות שאלות ואישורים ידניים.
- זמן קצר יותר לתוצאה מאומתת.
- פחות תיקוני המשך ורגרסיות.
- context/usage נמוכים יותר או איכות גבוהה יותר באותה צריכה.
- הסרה פשוטה ללא פגיעה בפרויקט.
