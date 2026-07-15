# מועמדי הרחבות לקלוטקורד

עודכן: 2026-07-15

> מסמך מחקר בלבד. הוא אינו מאשר התקנה. מקור הכללים היחיד הוא `CLAUDE.md`.

## שער בדיקה לכל הרחבה
לפני התקנה או יצירה מתעדים:
1. בעיה אמיתית שהיא פותרת.
2. תדירות וחומרה.
3. חלופה פשוטה יותר.
4. מקור ו־commit/tag מדויק.
5. קוד ותלויות.
6. כלים והרשאות.
7. auto-invocation או הפעלה ידנית.
8. עלות context וטוקנים.
9. נתונים שעוזבים את המחשב.
10. מדד הצלחה.
11. השבתה, הסרה ו־rollback.

## Priority A — פיילוטים ראשונים

### A1. Skill ידני `capture-requirement`
**הבעיה:** דרישות חדשות נאמרות לאורך העבודה ולעיתים נשמרות בכמה מסמכים, נשכחות או סותרות דרישה קודמת.

**התהליך:**
1. סיווג הדרישה: preference / rule / product contract / decision / state / task / sensitive.
2. חיפוש כפילות, ניסוח דומה, סתירה ו־test/guard קיים.
3. הצעת ניסוח קנוני, scope ומיקום.
4. הצגת מה יוחלף או יעודכן.
5. כתיבה רק לאחר אישור יניב.
6. הצעה ל־test, verifier, Rule, Permission, Skill או Hook כאשר טקסט אינו מספיק.

**בטיחות:**
- `disable-model-invocation: true`.
- הפעלה ידנית בלבד.
- אין שינוי קוד מוצר.
- אין שמירת מידע רגיש.
- אין יצירת דף כללים נוסף.

**מדד הצלחה:** פחות הסברים חוזרים, אפס כפילויות חדשות ואפס דרישות קריטיות שנשכחו.

### A2. Skill ידני `safe-change`
**הבעיה:** צורך חוזר לאמת repo, branch, scope, עבודה מקומית, בדיקות, diff ו־PR.

**מבנה:**
- הפעלה ידנית.
- ללא deploy או merge.
- כלים מוגבלים ל־Read/Grep/Glob/Git ולפקודות בדיקה מאושרות.
- output קצר: preflight, risk lane, tests ו־PR report.

### A3. Permission profile בטוח
**Deny:** `.env`, credentials, browser profiles, SSH keys, force push, `reset --hard`, `git clean` ומחיקה רחבה.

**Allow:** `git status`, `git diff`, `git log`, tests/typecheck/build ידועים וקריאה לא־רגישה.

**Ask:** push, merge, deploy, DB, auth ופעולות system/device.

Permissions קודמות ל־Hook כאשר הן מספיקות.

### A4. Skill `ui-verify`
**הבעיה:** build שעבר אינו מוכיח RTL, mobile, A4, PDF, מצגת או דיוק חזותי.

**התהליך:** preview → viewports → screenshots → console/network → clipping/overflow → השוואה למקור → evidence ומה לא אומת.

### A5. `repo-audit` לקריאה בלבד
Subagent או Skill עם Read/Grep/Glob/Git read-only.

**תוצר:** זהות קנונית, stale docs, open PRs, duplicate sources, permissions, CI noise, סיכונים ושאלות פתוחות. ללא edits או push.

### A6. Skill `handoff`
סיכום קצר בין sessions ומחשבים: מטרה, מצב, files changed, tests, branch/PR, החלטות, חסימות והצעד הבא. ללא transcript גולמי.

## Priority B — לאחר הפיילוט הראשון

### B1. Plugin רשמי ל־TypeScript LSP
פיילוט בפרויקט TypeScript אחד למדידת references, שגיאות, זמן וקבצים שנקראו. נדרש אימות source, dependencies ויכולת הסרה.

### B2. Skill `ingest-real-files`
Inventory, metadata, hashes, duplicate detection, dry-run, apply, validate ו־browser QA.

### B3. Skill `math-rtl-verify`
סימן לפני מספר, LTR בתוך RTL, סדר ביטוי, גרפים/SVG, מקור תוכן ו־A4/print. רק לאחר צורך חוזר בכמה פרויקטי ליבה.

### B4. Hook קטן לחסימת פעולות הרסניות
רק אם permissions אינן מספיקות: force push, reset/clean, מחיקה רחבה, כתיבה ל־secrets או push ישיר ל־`main` בפרויקט מוגן.

### B5. Hook לבחירת בדיקות לפי קבצים
TypeScript → typecheck/tests; UI → preview/browser; docs → diff/link check; DB → schema/integration. נדרש fallback כאשר הסיווג אינו ודאי.

### B6. MCP מצומצם
רק לחיבור שמחליף עבודה ידנית חוזרת. מתחילים ב־read-only וב־project scope; CLI מועדף כאשר הוא מספיק.

### B7. ביקורת חודשית מתוזמנת
Read-only בלבד: גרסת Claude Code, Skills/Plugins/MCP פעילים, רכיבים שלא היו בשימוש, גודל `CLAUDE.md`, skill listing ו־auto memory. רק הצעת הסרה או עדכון.

## Priority C — מחקר בלבד
- accessibility review.
- PDF accessibility.
- adversarial review למשימות מסוכנות.
- code review אוטומטי ל־PRs גדולים.
- audit של workflows מתוזמנים בעלי `contents: write`.

## לא להתקין כרגע
- חבילות עשרות Skills או Agents.
- Agent Teams כברירת מחדל.
- לולאות אוטונומיות ללא גבול.
- Plugins עם write access לחשבונות חיים ללא צורך מוכח.
- Memory Agent שמשנה לבד את כללי הפרויקט.
- scheduled workflow שמשכתב `RULES.md` או מציג quality/state מחושבים כעובדה.

## סדר הפיילוט
1. inventory מקומי מסונן.
2. baseline של שלוש משימות.
3. `capture-requirement` ידני.
4. מדידת כפילויות ודרישות חוזרות.
5. `safe-change` או Permission profile.
6. TypeScript LSP בפרויקט אחד.
7. `ui-verify` בפרויקט אחד.
8. הרחבה לריפו נוסף רק לאחר החלטת keep/remove.

## מדדי הצלחה
- פחות דרישות שמוסברות מחדש.
- אפס כפילויות חדשות בזיכרון.
- פחות קבצים לפני root cause.
- פחות שאלות ואישורים ידניים.
- זמן קצר יותר לתוצאה מאומתת.
- פחות תיקוני המשך ורגרסיות.
- context/usage נמוכים יותר או איכות גבוהה יותר באותה צריכה.
- הסרה פשוטה ללא פגיעה בפרויקט.
