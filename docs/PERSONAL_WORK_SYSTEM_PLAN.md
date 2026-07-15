# תוכנית העבודה האישית של יניב עם Claude Code — קלוטקורד גרסה 2

עודכן: 2026-07-15

> מסמך הביצוע המרכזי של קלוטקורד. הוא אינו דף כללים; מקור הכללים המחייב היחיד הוא `CLAUDE.md`.

## 1. מטרת התוכנית
לאפשר ליניב לתת הוראות קצרות ולקבל עבודה אמיתית, מדויקת, בדוקה ובטוחה—תוך שמירת הדרישות שלו לאורך זמן, הפחתת הסברים חוזרים, צמצום context וטוקנים, ושימוש חכם ב־Skills, Hooks, Plugins, Subagents, Git, CI ו־preview.

היעד אינו “מקסימום אוטומציה”. היעד הוא:
- מינימום מאמץ ידני מצד יניב.
- מינימום context שאינו נחוץ.
- מקסימום שמירה על דרישות וחוזי מוצר.
- מקסימום יכולת לבדוק, להבין ולהחזיר לאחור כל שינוי.

## 2. על מה התוכנית מבוססת
התוכנית מבוססת על מחקר עומק של ריפו הליבה:
- `ma-assistant2` ו־`server-core` — שליטה במכשירים, הרשאות, runtime ואבטחה.
- `mathmath` — פיתוח מהיר, PRs, Vercel ותיקוני runtime.
- `misparim` — זיכרון מדורג ושני מוצרים באותו ריפו.
- `parabula-next` — A4, mobile, PWA, CI ו־Agents.
- `maagar` — ingestion, PDF/DOCX, hashes, dry-run ו־browser QA.
- `www` — Moodle, DB, LTI, תלמידים ו־truth gates.
- `TALMID` — פרטיות, roles, DB ודרישות שמשתנות בזמן אמת.
- `targilim` — מקורות אמת, verifiers ו־CI עמוק.
- `microsoft-forms` — מחקר, facts, acceptance tests ואוטונומיה.

פרויקטים נוספים שימשו רק כראיות נקודתיות ל־PowerShell, מכשירים, PDF, scheduled automation, state drift ו־AI Studio/Lovable.

## 3. המסקנה המרכזית
אין פתרון אחד שמתאים לכל הפרויקטים, אבל יש ליבה משותפת אחת:

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

## 4. ארכיטקטורת הזיכרון האישית

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

יעד: 20–40 שורות בלבד.

הזיכרון הגלובלי המלא צריך להיות פרטי. קלוטקורד הציבורי ישמור רק schema, תהליך וכללים כלליים—not פרטים אישיים או דרישות רגישות.

### 4.2 `CLAUDE.md` בפרויקט
יעד מומלץ: 80–150 שורות, ובכל מקרה פחות מ־200 ככל האפשר.

יכיל רק:
1. זהות המוצר והריפו הקנוני.
2. גבולות שינוי.
3. מקורות אמת.
4. פקודות build/test/preview.
5. חוזי בטיחות קריטיים.
6. הגדרת done.
7. הפניות למסמכים או Rules לפי צורך.

לא יכיל:
- changelog.
- רשימת “בוצע”.
- state זמני.
- snapshots של חשבון, חומרה או אחוזי מוכנות.
- כל מפת המוצר.
- tutorial מלא.
- אותה דרישה בכמה ניסוחים.

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
מסמך קנוני אחד לכל concern או data/schema קנוני.

דוגמאות:
- תוכן לימודי ומפת שאלות.
- חוזי RTL ומתמטיקה.
- DB/schema.
- הרשאות ו־roles.
- integration contracts.
- A4/PDF/print.

מידע דטרמיניסטי עובר ל־test, verifier, schema או guard במקום להישאר רק בטקסט.

### 4.5 Rules לפי path
רק כאשר יש domains אמיתיים:
- UI/CSS.
- math/RTL.
- print/A4/PDF.
- DB/auth/security.
- Moodle/LTI.
- subproject עצמאי.

Rule אינו משכפל workflow גלובלי ואינו מחזיק state.

### 4.6 Auto Memory
מותר:
- פקודת debug שהתגלתה.
- gotcha טכנית שקשה לגלות.
- preference חוזרת שאושרה.
- נתיב או כלי מקומי שאינו רגיש.

אסור:
- state זמני.
- secrets.
- רשימת משימות.
- logs גדולים.
- מידע תלמידים.
- החלטה שסותרת את Git.

ביקורת `/memory` אחת לשבועיים בפרויקט פעיל.

## 5. כיצד Claude לומד דרישה חדשה

### שלב 1 — זיהוי
Claude מזהה שהמשפט של יניב עשוי להיות דרישה עמידה, למשל:
- “תמיד הסימן לפני המספר”.
- “אין merge בלי preview”.
- “כפתור זה לא יופיע”.
- “המקור הזה בלבד מאושר”.

### שלב 2 — סיווג
הדרישה מסווגת כאחת מאלה:
- העדפה גלובלית.
- כלל פרויקט.
- חוזה מוצר.
- החלטה ארכיטקטונית.
- state זמני.
- משימה פתוחה.
- מידע רגיש שאסור לשמור.

### שלב 3 — חיפוש כפילות וסתירה
לפני כתיבה Claude מחפש:
- ניסוח זהה.
- ניסוח דומה.
- כלל קודם שסותר.
- test/guard שכבר מיישם את הדרישה.
- פרויקט אחר שאינו אמור לקבל את הדרישה.

### שלב 4 — הצעה ליניב
Claude מציג בקצרה:
- הניסוח הקנוני המוצע.
- הסיווג.
- ה־scope.
- מה הוא מחליף.
- היכן יישמר.
- האם נדרש test/Skill/Hook.

### שלב 5 — אישור
רק לאחר אישור יניב הדרישה נכתבת.

### שלב 6 — עדכון, לא הצטברות
דרישה חדשה מחליפה או מעדכנת את הישנה. Git שומר היסטוריה; אין צורך לשמור שתי גרסאות פעילות.

### שלב 7 — קישור לאכיפה
כאשר אפשר, הדרישה מקושרת ל:
- test.
- verifier.
- schema.
- permission.
- Rule.
- Skill.
- Hook קטן.

## 6. מזהה דרישה ו־provenance
לכל דרישה חשובה יישמרו, לפי הצורך:
- `id` יציב.
- סוג.
- ניסוח קנוני.
- scope.
- מקור: יניב / מסמך / commit / API / test / runtime.
- תאריך יצירה ועדכון.
- סטטוס: proposed / approved / verified / superseded / revoked.
- רמת רגישות.
- references לקוד, tests ו־docs.
- מועד review כאשר היא עלולה להתיישן.

אין צורך להפוך כל העדפה קטנה ל־database. מתחילים ב־Markdown מובנה ומוסיפים schema רק אם הנפח והסתירות מצדיקים זאת.

## 7. ארבעה מסלולי עבודה

### Fast Lane — שינוי קטן
מתאים ל:
- ניסוח.
- CSS נקודתי.
- label.
- bug מקומי וברור.

תהליך:
1. אמת repo ו־scope.
2. חיפוש ממוקד.
3. שינוי מינימלי.
4. בדיקה ממוקדת.
5. diff.
6. PR קטן או commit לפי מדיניות הפרויקט.

מודל: Sonnet, effort רגיל.

### Standard Lane — שינוי בינוני
מתאים ל:
- רכיב חדש.
- flow.
- כמה קבצים.
- integration מוגבל.

תהליך:
1. Explore.
2. תוכנית קצרה.
3. implementation.
4. tests + preview.
5. PR עם root cause, scope ו־rollback.

מודל: Sonnet, effort גבוה.

### High-Risk Lane — שינוי מסוכן
מתאים ל:
- DB/migrations.
- auth/permissions.
- מידע תלמידים.
- Moodle/LTI.
- מכשיר, shell, autostart או admin.
- production/deploy.
- שינוי רוחבי.

תהליך:
1. evidence.
2. threat/risk analysis.
3. plan ו־rollback.
4. branch/worktree מבודד.
5. draft PR.
6. review עצמאי.
7. environment/live validation.
8. merge מפורש בלבד.

מודל: Opus לתכנון/שורש/ביקורת; Sonnet לביצוע שלבים ברורים.

### Research Lane — חקירה בלבד
מתאים ל:
- repo audit.
- CI/logs.
- OCR/render/artifact.
- בדיקת קובץ או PR.

ברירת מחדל: read-only. אין PR מוצר רק כדי להפיק artifact אם יש חלופה מקומית.

## 8. תבנית המשימה הקצרה
```text
משימה: [מה בדיוק צריך].
היקף: [מה מותר לשנות].
לא לשנות: [אזורים מוגנים].
הצלחה: [תוצאה מדידה או נראית].
בדיקות: [test / build / preview / live].
Git: עבוד בענף ופתח PR; אל תמזג לפני דיווח.
```

אין להדביק super-prompt ארוך. Claude קורא את הוראות הפרויקט אוטומטית.

## 9. חיסכון ב־context ובטוקנים

### כללי session
- משימה אחת משמעותית לכל session.
- `/rename` לפני מעבר.
- `/clear` בין משימות לא קשורות.
- `/compact Focus on verified decisions, changed files, open risks, and next steps` כאשר אותה משימה נמשכת.
- לאחר שני ניסיונות תיקון כושלים: לעצור, לסכם ולפתוח session נקי.
- להשתמש ב־`/btw` לשאלה קצרה שאינה צריכה להישמר בשיחה.

### קריאת קבצים
- Grep/search לפני פתיחת קובץ גדול.
- טווח שורות רלוונטי במקום קובץ מלא.
- אין קריאת כל הריפו או כל requirements כברירת מחדל.
- logs ו־CI ארוכים עוברים ל־Subagent או artifact מסונן.

### בחירת מודל
- Sonnet כברירת מחדל.
- effort רגיל ל־Fast Lane.
- effort גבוה ל־Standard/debugging.
- Opus רק לארכיטקטורה, root cause, אבטחה, migration או review מסוכן.
- Agent קל למשימות מיון/סיכום ללא החלטה מורכבת.

### מדידה
לכל פיילוט:
- `/usage`.
- `/context`.
- זמן עד root cause.
- זמן עד תוצאה מאומתת.
- קבצים שנקראו.
- מספר תיקונים.
- רגרסיות.

## 10. Skills — סדר הבנייה
לא מתקינים Skill pack. נבנה או מתקין Skill אחד בכל פעם.

### S1 — `capture-requirement`
מטרה: ללמוד דרישה חדשה בלי ליצור כפילות.

ה־Skill:
1. מסווג את הדרישה.
2. מחפש כפילות/סתירה.
3. מציע ניסוח קנוני ומיקום.
4. מציג מה יוחלף.
5. אינו כותב בלי אישור.

הפעלה ידנית בלבד: `disable-model-invocation: true`.

זהו ה־Skill החשוב ביותר עבור יניב.

### S2 — `safe-change`
מטרה: preflight, scope, tests, diff ו־PR report.

כלים מותרים:
- Read/Grep/Glob.
- Git read/status/diff.
- פקודות בדיקה מאושרות.

אסור:
- merge.
- deploy.
- DB write.
- force operations.

### S3 — `ui-verify`
מטרה: preview אמיתי ל־RTL, mobile, A4, PDF, מצגות וגרפיקה.

תוצר:
- viewports שנבדקו.
- screenshots.
- console/network.
- clipping/overflow.
- התאמה למקור.
- מה לא אומת.

### S4 — `repo-audit`
Subagent/Skill read-only:
- זהות ריפו.
- stale docs.
- open PRs.
- duplicate sources.
- permissions.
- CI noise.
- risk register.

### S5 — `handoff`
סיכום מסונן בין sessions/מחשבים:
- מטרה.
- מצב.
- files changed.
- tests.
- branch/PR.
- חסימות.
- הצעד הבא.

אין transcript גולמי.

### S6 — `ingest-real-files`
עבור `maagar` ופרויקטי קבצים:
- inventory.
- metadata.
- hashes.
- dry-run.
- apply.
- validate.
- browser QA.

### S7 — `math-rtl-verify`
רק לאחר שהצורך הוכח בכמה פרויקטים:
- סימן לפני מספר.
- LTR בתוך RTL.
- שוויון וסדר ביטוי.
- SVG/גרפים.
- מקור תוכן.
- A4/print.

## 11. תנאי יצירת Skill
Skill נוצר רק כאשר מתקיים לפחות אחד:
- workflow חזר שלוש פעמים.
- עלות הטעות גבוהה במיוחד.
- התהליך רב־שלבי וקשה לזכור.
- הוא חוסך context קבוע משמעותי.

לפני יצירה מתעדים:
- הבעיה.
- התדירות.
- חלופה פשוטה יותר.
- tools והרשאות.
- context cost.
- מדד הצלחה.
- rollback.

## 12. Permissions, Hooks ו־Sandbox

### Permissions ראשונות
**Deny:**
- `.env`, credentials, tokens, cookies, SSH/private keys.
- force push.
- `reset --hard`.
- `git clean`.
- מחיקה רחבה.
- כתיבה מחוץ ל־root.

**Allow:**
- `git status`, `git diff`, `git log`.
- tests/typecheck/build ידועים.
- קריאת קוד ומסמכים לא־רגישים.

**Ask:**
- push.
- merge.
- deploy.
- DB migration/write.
- auth/permissions.
- system/admin/device actions.

יש להסיר הרשאות project-local רחבות כמו `gh pr merge:*` כאשר הן אינן מוצדקות.

### Hooks
Hook נבנה רק אם permission או test אינם מספיקים.

מועמדים:
1. חסימת force/destructive commands.
2. חסימת secrets ונתוני תלמידים.
3. בדיקת branch לפני push.

אין Hook שמריץ build כבד אחרי כל edit.

### Sandbox
נבדק רק לאחר inventory מקומי. ב־Windows יש לבחון עבודה דרך WSL2 כאשר נדרש גבול OS אמיתי.

## 13. Subagents ו־Agent Teams

### Subagent
מתאים ל:
- audit read-only.
- CI/logs.
- security review.
- חיפוש רחב.
- בדיקה עצמאית של PR.

ברירת מחדל: סוכן אחד, תוצר קצר, בלי edits.

### Agent Teams
לא ברירת מחדל.

ישמשו רק כאשר:
- שלוש משימות באמת עצמאיות.
- אין עריכה באותו קובץ.
- לכל teammate תוצר ברור.
- עלות context מוצדקת.

## 14. Git, PR ו־Merge Gates

### שינויים קטנים
PR קטן, commit אחד או שניים, review של diff ובדיקות ממוקדות.

### שינויים בינוניים
PR עם:
- root cause.
- מה השתנה.
- מה לא השתנה.
- tests/preview.
- rollback.

### שינויים מסוכנים
- draft PR.
- reviewer/agent עצמאי.
- זמן קירור לפני merge.
- evidence חי.
- merge מפורש.

### איסורים
- רצף commits ניסיוניים ישירות ל־`main`.
- PR של עשרות נושאים לא קשורים.
- PR מחקרי שנשאר פתוח ללא תאריך תפוגה.
- merge אוטומטי רק משום שה־build ירוק.

### סטטוסים נפרדים
- implemented.
- tests passed.
- preview/environment verified.
- live verified.
- release ready.

## 15. התאמה לריפו הליבה

### `ma-assistant2` — Tier C
מועמד קנוני למשפחת השליטה.

נדרש:
- High-Risk Lane לפעולות מכשיר, shell והרשאות.
- permission profile קשיח.
- audit ו־evidence מחוץ ל־Git.
- `CLAUDE.md` קצר יותר עם Rules/Skills לפי תחום.
- review של כל capability מול manifest, executor ו־test.

### `server-core` — מועמד legacy/adapter
נמצאה סתירה בין הצהרת “מוצר יחיד” לבין כלי תחזוקה שמגן גם על `ma-assistant2`.

נדרש לפני החלטה:
- להכריע אם יש runtime ייחודי שאינו קיים ב־`ma-assistant2`.
- לבדוק writer ואימות end-to-end לתור הפקודות.
- לא להציג allowlist כמאומת כאשר `action` מועבר ישירות ל־SSH.
- לאחר ההכרעה: merge, adapter קצר או legacy pointer.

### `mathmath` — Tier B/C
- remove broad merge permission.
- PR מהיר רק לשינוי קטן.
- environment/Vercel checks לשינויים תלויי runtime.
- Skill `ui-verify` מועמד חזק.

### `misparim` — Tier B ופיילוט זיכרון
- להשלים baseline לפני merge של PR #1.
- למדוד Rules לפי path מול זיכרון כבד.
- אין Skill בפיילוט הראשון.

### `parabula-next` — Tier C
- לשמור Agents דקים.
- להעביר mobile/A4/PWA לחוקים תחומיים לפי path.
- למפות CI כדי לצמצם חפיפה בלבד—not להסיר בדיקות ייחודיות.
- Skill `math-rtl-verify` או `ui-verify` לאחר מדידה.

### `maagar` — Tier C
- לשמר dry-run, hashes ו־validators.
- להפריד artifact/research workflow מ־PR מוצר.
- Skill `ingest-real-files` מועמד טבעי.

### `www` — Tier C רגיש
- truth gates ו־release readiness נשמרים.
- state/audits מקבלים lifecycle וסגירה.
- DB/Moodle/LTI תמיד High-Risk Lane.
- מידע תלמידים לא נכנס לזיכרון או evidence ציבורי.

### `TALMID` — Tier C רגיש
- supersede אמיתי לדרישות משתנות.
- privacy audit דחוף לכל מידע אמיתי ב־Git.
- DB migrations ו־roles דורשים draft PR ו־live evidence.

### `targilim` — Tier C איכותי
- לשמר source-of-truth map ו־verifiers.
- להוציא changelog ו־state מ־RULES.
- לשמור CI מקומי וחי כאשר כל אחד מגן על סיכון אחר.

### `microsoft-forms` — Tier C אינטגרציה
- facts מקבלים `verified_at` ו־expiry/recheck policy.
- אין אוטונומיה ארוכה על בסיס snapshot ישן.
- acceptance tests נשמרים.
- feasibility/live checkpoint לפני implementation רחב.

## 16. סדר היישום

### שלב 0 — inventory מקומי
- גרסת Claude Code.
- user settings.
- auto memory.
- Plugins.
- Skills.
- Hooks.
- MCP.
- permissions.

שמות והגדרות מסוננות בלבד; אין secrets או transcripts.

### שלב 1 — baseline
שלוש משימות אמיתיות:
1. שינוי UI קטן.
2. שינוי קוד בינוני.
3. audit read-only.

למדוד tokens/context, זמן, קבצים ותיקונים.

### שלב 2 — פיילוט זיכרון `misparim`
- baseline ישן.
- review PR #1.
- merge רק לאחר החלטה.
- שלוש משימות post-change.

### שלב 3 — Skill ראשון
`capture-requirement` או `safe-change`, לפי החיכוך שנמדד.

### שלב 4 — Plugin TypeScript LSP
פרויקט אחד בלבד, source רשמי, מדידה ויכולת הסרה.

### שלב 5 — Skill UI
`ui-verify` בפרויקט אחד עם RTL/A4/PDF.

### שלב 6 — permissions
Deny/Ask/Allow מדורג; לאחר מכן Hook קטן רק אם נשאר פער.

### שלב 7 — הרחבה
להחיל רק רכיבים שהוכחו על ריפו נוסף אחד בכל פעם.

## 17. מדדי הצלחה לאחר חודש
- פחות הסברים חוזרים של דרישות.
- אפס דרישה קריטית שנשכחה בפיילוטים.
- ירידה של 20% בזמן פתיחה/הבנה או בשימוש, או שיפור איכות ברור באותה עלות.
- פחות commits/PRs למשימה אחת.
- פחות תיקון על תיקון.
- פחות state מיושן.
- פחות merges ללא evidence.
- אפס מידע רגיש חדש ב־Git ציבורי.
- Skill שניתן להסיר בלי לפגוע בפרויקט.

## 18. מה לא עושים
- לא מתקינים חבילות Skills גדולות.
- לא מפעילים Agent Teams למחקר רגיל.
- לא נותנים merge/deploy/DB write אוטומטי.
- לא מעדכנים `CLAUDE.md` אוטומטית מכל הערת משתמש.
- לא שומרים transcript כזיכרון.
- לא טוענים שכל 42 הריפוים צריכים אותה ארכיטקטורה.
- לא מוסיפים מסמך כללים נוסף לקלוטקורד.

## 19. הגדרת הצלמה של קלוטקורד
קלוטקורד מוכן ליישום כאשר:
1. תוכנית זו נמצאת ב־`main`.
2. inventory מקומי מסונן הושלם.
3. baseline נמדד.
4. Skill ראשון נבחר לפי ראיה—not לפי סרטון.
5. כל פיילוט כולל success metric ו־rollback.
6. כללי הפרויקט נשארים בדף מחייב אחד בלבד.
