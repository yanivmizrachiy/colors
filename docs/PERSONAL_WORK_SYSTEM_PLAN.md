# תוכנית העבודה האישית של יניב עם Claude Code — קלוטקורד גרסה 2

עודכן: 2026-07-15

> מסמך הביצוע המרכזי של קלוטקורד. הוא אינו דף כללים; מקור הכללים המחייב היחיד הוא `CLAUDE.md`.

## 1. מטרת התוכנית
לאפשר ליניב לתת הוראות קצרות ולקבל עבודה אמיתית, מדויקת, בדוקה ובטוחה—תוך שמירת הדרישות שלו לאורך זמן, הפחתת הסברים חוזרים, צמצום context וטוקנים ושימוש חכם ב־Skills, Hooks, Plugins, Subagents, Git, CI ו־preview.

היעד אינו מקסימום אוטומציה, אלא:
- מינימום מאמץ ידני מצד יניב.
- מינימום context שאינו נחוץ.
- מקסימום שמירה על דרישות וחוזי מוצר.
- יכולת להבין, לבדוק ולהחזיר לאחור כל שינוי.

## 2. בסיס המחקר
התוכנית מבוססת על פרויקטי הליבה הגדולים של יניב ועל דפוסים שחזרו בעבודה אמיתית:
- מערכות Web גדולות ב־TypeScript/Next.js.
- מערכות חינוך עם RTL, מתמטיקה, A4, PDF ומצגות.
- מערכות רגישות עם תלמידים, DB, הרשאות ואינטגרציות.
- מערכות שליטה מקומיות עם מכשירים, PowerShell ו־runtime אמיתי.
- ingestion של PDF/DOCX וקבצים אמיתיים.
- עבודה עם GitHub, Vercel, Actions, Lovable, AI Studio וכלי AI נוספים.

## 3. המודל שנבחר
1. דף כללים קצר וברור.
2. מצב חי קצר ונפרד.
3. דרישות מוצר קנוניות לפי תחום.
4. ראיות ובדיקות במקום טענות טקסטואליות.
5. זיכרון חדש נכנס רק לאחר סיווג ואישור.
6. משימה אחת משמעותית בכל session.
7. Skill אחד בכל פיילוט—not חבילת Skills.
8. Permissions לפני Hooks כאשר אפשר.
9. PR, preview ו־rollback לפי רמת הסיכון.
10. מדידה לפני טענה לחיסכון.

## 4. ארכיטקטורת הזיכרון

### 4.1 זיכרון גלובלי של יניב
יכיל רק העדפות שחוצות פרויקטים:
- תקשורת בעברית.
- עבודה אמיתית בלבד.
- אין המצאת תוכן, נתונים או הצלחה.
- GitHub הוא מקור האמת לקוד.
- שינוי ממוקד בלבד.
- דרישה אחרונה מאושרת מחליפה דרישה קודמת.
- אין secrets או נתוני תלמידים בזיכרון ציבורי.
- בדיקה חזותית נדרשת למתמטיקה, RTL, A4, PDF ו־UI.

יעד: 20–40 שורות בלבד. הזיכרון האישי המלא צריך להיות פרטי.

### 4.2 `CLAUDE.md` בפרויקט
יעד: 80–150 שורות, ובכל מקרה פחות מ־200 ככל האפשר.

יכיל רק:
1. זהות המוצר והריפו הקנוני.
2. גבולות שינוי.
3. מקורות אמת.
4. פקודות build/test/preview.
5. חוזי בטיחות קריטיים.
6. הגדרת done.
7. הפניות למסמכים או Rules לפי צורך.

לא יכיל changelog, רשימת “בוצע”, state זמני, snapshots, מפת מוצר מלאה או אותה דרישה בכמה ניסוחים.

### 4.3 `CURRENT_STATE.md`
יכיל רק:
- branch/PR פעיל.
- מה עובד ומה חסום.
- סיכונים פתוחים.
- מה אומת חי ומה לא.
- 3–7 צעדים הבאים.
- תאריך ומקור ראיה.

יעד: 30–60 שורות.

### 4.4 דרישות מוצר
מקור קנוני אחד לכל concern או data/schema קנוני:
- תוכן לימודי.
- חוזי RTL ומתמטיקה.
- DB/schema.
- הרשאות ו־roles.
- integration contracts.
- A4/PDF/print.

מידע דטרמיניסטי עובר ל־test, verifier, schema או guard במקום להישאר רק בטקסט.

### 4.5 Rules לפי path
רק כאשר יש domains אמיתיים: UI, math/RTL, print/A4/PDF, DB/auth/security, Moodle/LTI או subproject עצמאי.

Rule אינו משכפל workflow גלובלי ואינו מחזיק state.

### 4.6 Auto Memory
מותר: פקודת debug, gotcha טכנית, preference חוזרת שאושרה ונתיב מקומי לא־רגיש.

אסור: state זמני, secrets, רשימת משימות, logs גדולים, מידע תלמידים או החלטה שסותרת Git.

ביקורת `/memory` אחת לשבועיים בפרויקט פעיל.

## 5. כיצד Claude לומד דרישה חדשה
1. מזהה שהמשפט עשוי להיות דרישה עמידה.
2. מסווג: העדפה גלובלית, כלל פרויקט, חוזה מוצר, החלטה, state, משימה או מידע רגיש.
3. מחפש כפילות, ניסוח דומה, סתירה או test קיים.
4. מציג ליניב ניסוח קנוני, scope, מיקום ומה יוחלף.
5. כותב רק לאחר אישור.
6. מעדכן את הדרישה הקיימת במקום לצבור גרסאות.
7. מקשר ל־test, verifier, schema, permission, Rule, Skill או Hook כאשר צריך.

לדרישה חשובה ניתן לשמור:
- `id` יציב.
- סוג ו־scope.
- ניסוח קנוני.
- מקור ותאריך.
- סטטוס: proposed / approved / verified / superseded / revoked.
- רגישות.
- references לקוד ולבדיקות.

## 6. ארבעה מסלולי עבודה

### Fast Lane
לניסוח, CSS נקודתי, label או bug מקומי.

תהליך: אמת repo → חיפוש ממוקד → שינוי מינימלי → בדיקה → diff → PR קטן.

מודל: Sonnet, effort רגיל.

### Standard Lane
לרכיב, flow, כמה קבצים או integration מוגבל.

תהליך: Explore → תוכנית קצרה → implementation → tests + preview → PR עם root cause ו־rollback.

מודל: Sonnet, effort גבוה.

### High-Risk Lane
ל־DB, auth, permissions, תלמידים, Moodle/LTI, shell, מכשיר, production או שינוי רוחבי.

תהליך: evidence → risk analysis → plan ו־rollback → branch/worktree מבודד → draft PR → review עצמאי → environment/live validation → merge מפורש בלבד.

מודל: Opus לתכנון, root cause וביקורת; Sonnet לביצוע שלבים ברורים.

### Research Lane
ל־repo audit, CI/logs, OCR/render/artifact או בדיקת PR.

ברירת מחדל: read-only. אין PR מוצר רק כדי להפיק artifact כאשר יש חלופה מקומית.

## 7. תבנית המשימה הקצרה
```text
משימה: [מה בדיוק צריך].
היקף: [מה מותר לשנות].
לא לשנות: [אזורים מוגנים].
הצלחה: [תוצאה מדידה או נראית].
בדיקות: [test / build / preview / live].
Git: עבוד בענף ופתח PR; אל תמזג לפני דיווח.
```

אין להדביק super-prompt ארוך. Claude קורא את הוראות הפרויקט אוטומטית.

## 8. חיסכון ב־context ובטוקנים

### Sessions
- משימה אחת משמעותית לכל session.
- `/rename` לפני מעבר.
- `/clear` בין משימות לא קשורות.
- `/compact Focus on verified decisions, changed files, open risks, and next steps` כאשר אותה משימה נמשכת.
- לאחר שני ניסיונות תיקון כושלים: לעצור, לסכם ולפתוח session נקי.
- `/btw` לשאלה קצרה שאינה צריכה להיכנס להיסטוריה.

### קריאת מידע
- Grep/search לפני פתיחת קובץ גדול.
- טווח שורות רלוונטי במקום קובץ מלא.
- אין קריאת כל הריפו או כל requirements כברירת מחדל.
- logs ו־CI ארוכים עוברים ל־Subagent או artifact מסונן.

### מודלים
- Sonnet כברירת מחדל.
- effort רגיל ל־Fast Lane.
- effort גבוה ל־Standard/debugging.
- Opus רק לארכיטקטורה, root cause, אבטחה, migration או review מסוכן.
- Agent קל למשימות מיון או סיכום ללא החלטה מורכבת.

### מדידה
בכל פיילוט מודדים:
- `/usage` ו־`/context`.
- זמן עד root cause.
- זמן עד תוצאה מאומתת.
- קבצים שנקראו.
- מספר תיקונים.
- רגרסיות.

## 9. Skills — סדר הבנייה
לא מתקינים Skill pack. בונים או מתקינים Skill אחד בכל פעם.

### S1 — `capture-requirement`
ה־Skill החשוב ביותר עבור יניב.

תהליך:
1. סיווג הדרישה.
2. חיפוש כפילות וסתירה.
3. הצעת ניסוח קנוני ומיקום.
4. הצגת מה יוחלף.
5. כתיבה רק לאחר אישור.
6. הצעת test/guard/Rule/Skill כאשר טקסט אינו מספיק.

בטיחות:
- `disable-model-invocation: true`.
- הפעלה ידנית בלבד.
- אין שינוי קוד מוצר.
- אין מידע רגיש.
- אין יצירת דף כללים נוסף.

### S2 — `safe-change`
Preflight, scope, tests, diff ו־PR report.

מותר: Read/Grep/Glob, Git read/status/diff ופקודות בדיקה מאושרות.

אסור: merge, deploy, DB write ו־force operations.

### S3 — `ui-verify`
Preview אמיתי ל־RTL, mobile, A4, PDF, מצגות וגרפיקה.

תוצר: viewports, screenshots, console/network, clipping/overflow, התאמה למקור ומה לא אומת.

### S4 — `repo-audit`
Subagent/Skill read-only: זהות קנונית, stale docs, open PRs, duplicate sources, permissions, CI noise וסיכונים.

### S5 — `handoff`
סיכום מסונן בין sessions ומחשבים: מטרה, מצב, files changed, tests, branch/PR, החלטות, חסימות והצעד הבא. ללא transcript גולמי.

### S6 — `ingest-real-files`
Inventory, metadata, hashes, duplicate detection, dry-run, apply, validate ו־browser QA.

### S7 — `math-rtl-verify`
רק לאחר צורך מוכח בכמה פרויקטים: סימן לפני מספר, LTR בתוך RTL, גרפים/SVG, מקור תוכן ו־A4/print.

## 10. תנאי יצירת Skill
Skill נוצר רק כאשר מתקיים לפחות אחד:
- workflow חזר שלוש פעמים.
- עלות הטעות גבוהה במיוחד.
- התהליך רב־שלבי וקשה לזכור.
- הוא חוסך context קבוע משמעותי.

לפני יצירה מתעדים בעיה, תדירות, חלופה פשוטה, כלים והרשאות, עלות context, מדד הצלחה ו־rollback.

## 11. Permissions, Hooks ו־Sandbox

### Deny
- `.env`, credentials, tokens, cookies ו־private keys.
- force push, `reset --hard`, `git clean` ומחיקה רחבה.
- כתיבה מחוץ ל־root.

### Allow
- `git status`, `git diff`, `git log`.
- tests/typecheck/build ידועים.
- קריאה לא־רגישה.

### Ask
- push, merge, deploy, DB, auth ופעולות system/device.

יש להסיר הרשאות project-local רחבות למיזוג כאשר אינן מוצדקות.

Hook נבנה רק אם permission או test אינם מספיקים. מועמדים: חסימת פעולות הרסניות, secrets ו־push ישיר ל־`main`. אין Hook שמריץ build כבד אחרי כל edit.

Sandbox נבחן רק לאחר inventory מקומי; ב־Windows יש לבדוק WSL2 כאשר נדרש גבול OS אמיתי.

## 12. Subagents ו־Agent Teams
Subagent מתאים ל־audit read-only, CI/logs, security review וחיפוש רחב. ברירת מחדל: סוכן אחד, תוצר קצר וללא edits.

Agent Teams אינם ברירת מחדל. הם מותרים רק כאשר המשימות עצמאיות באמת, אין עריכה באותו קובץ, ולכל teammate תוצר ברור שמצדיק context נפרד.

## 13. Git, PR ו־Merge Gates

### שינוי קטן
PR קטן, commit אחד או שניים, diff review ובדיקות ממוקדות.

### שינוי בינוני
PR עם root cause, מה השתנה, מה לא השתנה, tests/preview ו־rollback.

### שינוי מסוכן
Draft PR, review עצמאי, זמן קירור, evidence חי ו־merge מפורש.

### איסורים
- commits ניסיוניים ישירות ל־`main`.
- PR של נושאים רבים שאינם קשורים.
- PR מחקרי ללא תאריך תפוגה.
- merge אוטומטי רק משום שה־build ירוק.

סטטוסים נפרדים:
- implemented.
- tests passed.
- preview/environment verified.
- live verified.
- release ready.

## 14. רמות פרויקט

### Tier A — פרויקט קטן
`CLAUDE.md` קצר, פקודות בדיקה בסיסיות וללא Skills/Hooks מיוחדים.

### Tier B — מוצר פעיל
`CLAUDE.md` קצר, state חי, Rules תחומיים, preview/CI ו־Skill אחד או שניים לאחר פיילוט.

### Tier C — מערכת רגישה או תשתית
Truth gates, draft PRs, permissions חזקים, environment/live tests, evidence נפרד ו־High-Risk Lane לכל פעולה בעלת השפעה.

## 15. סדר היישום

### שלב 0 — Inventory מקומי
גרסת Claude Code, user settings, auto memory, Plugins, Skills, Hooks, MCP ו־permissions—שמות והגדרות מסוננות בלבד.

### שלב 1 — Baseline
שלוש משימות אמיתיות: שינוי UI קטן, שינוי קוד בינוני ו־audit read-only. למדוד context/tokens, זמן, קבצים ותיקונים.

### שלב 2 — פיילוט זיכרון
להשוות מבנה זיכרון קיים מול מבנה מדורג, בלי Skill בשלב הראשון.

### שלב 3 — Skill ראשון
`capture-requirement`, משום ששמירת דרישות היא הצורך המרכזי של יניב.

### שלב 4 — `safe-change` או Permission Profile
לפי החיכוך שנמדד.

### שלב 5 — TypeScript LSP רשמי
פרויקט אחד בלבד, source רשמי, מדידה ויכולת הסרה.

### שלב 6 — `ui-verify`
פרויקט אחד עם RTL/A4/PDF.

### שלב 7 — הרחבה
רכיב שהוכח עובר לריפו נוסף אחד בכל פעם.

## 16. מדדי הצלחה לאחר חודש
- פחות הסברים חוזרים של דרישות.
- אפס דרישה קריטית שנשכחה בפיילוטים.
- ירידה של 20% בזמן פתיחה/הבנה או בשימוש, או שיפור איכות ברור באותה עלות.
- פחות commits ו־PRs למשימה.
- פחות תיקון על תיקון.
- פחות state מיושן.
- פחות merges ללא evidence.
- אפס מידע רגיש חדש ב־Git ציבורי.
- Skill שניתן להסיר בלי לפגוע בפרויקט.

## 17. מה לא עושים
- לא מתקינים חבילות Skills גדולות.
- לא מפעילים Agent Teams למחקר רגיל.
- לא נותנים merge/deploy/DB write אוטומטי.
- לא מעדכנים `CLAUDE.md` אוטומטית מכל הערת משתמש.
- לא שומרים transcript כזיכרון.
- לא מחילים ארכיטקטורה זהה על כל ריפו.
- לא מוסיפים מסמך כללים נוסף לקלוטקורד.

## 18. הגדרת מוכנות
קלוטקורד מוכן ליישום כאשר:
1. תוכנית זו נמצאת ב־`main`.
2. inventory מקומי מסונן הושלם.
3. baseline נמדד.
4. Skill ראשון נבחר לפי ראיה—not לפי סרטון.
5. כל פיילוט כולל success metric ו־rollback.
6. כללי הפרויקט נשארים בדף מחייב אחד בלבד.
