# דרישות תוכנית העבודה החכמה — קלוטקורד גרסה 2

עודכן: 2026-07-15

> מסמך דרישות לתוכנית העתידית. הוא אינו דף כללים ואינו אישור להתקין או לשנות דבר. מקור הכללים היחיד הוא `CLAUDE.md`.

## מטרת־העל
לבנות ליניב שיטת עבודה אחת, אמינה וגמישה עם Claude Code, שמכירה את דרישותיו לאורך זמן, חוסכת context וטוקנים, מקצרת משימות, משפרת איכות, ומשתמשת ב-Skills, Hooks, Agents, Plugins, MCP ואוטומציות רק במקום שבו הם מוכחים כמועילים.

## ארבעת צירי התוכנית

### 1. זיכרון דרישות אישי ומתמשך
המערכת חייבת:
- ללמוד דרישות והעדפות חוזרות של יניב.
- להבדיל בין כלל, העדפה, חוזה מוצר, החלטה, state, משימה, ראיה והיסטוריה.
- להציע דרישה חדשה לאישור לפני שמירתה.
- לעדכן או להחליף כלל קיים במקום לצבור גרסאות סותרות.
- לשמור מקור, תאריך, scope, רגישות וסטטוס לכל דרישה חשובה.
- לטעון בכל משימה רק את הזיכרון הרלוונטי.
- לעבוד בין sessions, מחשבים ופרויקטים.
- לא לשמור secrets, נתוני תלמידים, מידע פיננסי, פרטי קשר או transcripts גולמיים ב-Git ציבורי.
- לאפשר audit, supersede, revoke, rollback ומחיקת מידע מיושן.

### 2. חיסכון בטוקנים וב-context
התוכנית חייבת:
- למדוד context ו-usage לפני טענת חיסכון.
- לשמור `CLAUDE.md` קצר וממוקד.
- להעביר חוזים תחומיים ל-path rules או Skills לפי צורך.
- לא לטעון state, changelog, architecture מלאה ומפות UI בכל session.
- להשתמש בחיפוש וטווחי שורות לפני קריאת קבצים מלאים.
- להשתמש ב-Subagent למחקר רועש ומבודד.
- להימנע מ-Agent Teams כאשר העבודה אינה מקבילית באמת.
- להגדיר מתי משתמשים ב-Sonnet, Opus ו-effort גבוה.
- להגדיר כללי `/clear`, `/compact`, `/context`, `/usage` ו-handoff.
- לזהות Skills/Plugins/MCP שאינם בשימוש ולהסירם.

### 3. עבודה קצרה, נכונה וחכמה
התוכנית חייבת ליצור מסלולים שונים:

#### Fast lane
לשינוי קטן, ברור והפיך:
- scope קצר.
- שינוי מינימלי.
- בדיקה ממוקדת.
- diff review.
- PR קטן או commit בטוח לפי מדיניות הפרויקט.

#### Standard lane
ל-feature או bug שחוצה כמה קבצים:
- explore.
- plan קצר.
- implementation.
- tests/build/browser.
- PR עם root cause, scope וראיות.

#### High-risk lane
ל-DB, auth, PII, device control, admin, deploy או שינוי רוחבי:
- evidence ואימות environment.
- backup/rollback.
- branch/worktree מבודד.
- permissions מצומצמות.
- review נפרד.
- live verification.
- merge מפורש.

#### Research lane
ל-audit, forensic review, OCR, artifacts וחקירת repository:
- read-only ככל האפשר.
- artifact מחוץ ל-main.
- ללא merge.
- תאריך תפוגה ו-cleanup.

### 4. Skills, Hooks, Plugins, Agents, MCP ואוטומציות
התוכנית חייבת להגדיר מתי כל רכיב מתאים:

#### Skill
רק ל-workflow חוזר ורב־שלבי.
- input/output ברורים.
- כלים מוגבלים.
- פעולות צד בהפעלה ידנית בלבד.
- מדד הצלחה ודרך הסרה.

#### Hook
רק לחובה דטרמיניסטית שאסור לשכוח.
- חסימת force push, כתיבה ל-secrets או פעולה הרסנית.
- לא להריץ build כבד לאחר כל edit.
- permission או test פשוט קודמים ל-Hook.

#### Subagent
למחקר מבודד, logs, audit או verification read-only.
- context נפרד.
- summary קצר לשיחה הראשית.
- אין edits אלא אם המשימה וההרשאות מוגדרות.

#### Agent Team
רק כאשר יש כמה תתי־בעיות עצמאיות באמת.
- לא כברירת מחדל.
- תקציב context וטוקנים מוגדר מראש.
- בעל תפקיד ו-output נפרדים לכל agent.

#### Plugin
- רשמי לפני קהילתי.
- review של source, SHA, dependencies, permissions ו-network.
- התקנה בפרויקט אחד תחילה.
- rollback והסרה מתועדים.

#### MCP
- רק כאשר הוא מחליף עבודה ידנית חוזרת או נותן מידע שלא זמין ביעילות דרך CLI/API.
- read-only ו-project scope כברירת מחדל.
- מינימום שרתים פעילים.

#### Scheduled automation
- audit read-only, reports או checks מוגדרים.
- לא שינוי קוד אוטונומי ולא שכתוב rules.
- output רק כאשר יש שינוי משמעותי.
- אין commits רק בגלל timestamp.

## Skills מועמדים לתוכנית
הסדר ייקבע רק לאחר מדידה:

### `capture-requirement`
- מזהה דרישה שעשויה להיות עמידה.
- מחפש כפילות או סתירה.
- מציע סוג, scope, ניסוח ומיקום.
- אינו כותב ללא אישור.
- מעדכן requirement קיים במקום ליצור שכפול.

### `safe-change`
- מאמת repo, branch, status ו-scope.
- בוחר lane לפי סיכון.
- מפעיל בדיקות מתאימות.
- קורא diff ומכין PR.
- אינו ממזג או פורס ללא שער מתאים.

### `ui-verify`
- preview.
- viewports.
- screenshots.
- RTL/A4/mobile/PDF.
- console/network.
- evidence במקום PASS כללי.

### `repo-audit`
- read-only.
- source of truth, rules, state, CI, secrets, PRs ו-legacy.
- מחזיר עובדות, סיכונים ושאלות פתוחות.

### `handoff`
- מטרה.
- מצב.
- קבצים.
- tests.
- branch/PR.
- blockers.
- next step.
- ללא transcript.

### `math-rtl-verify`
- סימן לפני מספר.
- LTR isolation בתוך RTL.
- שמירת מספרים וטקסט.
- SVG, גרפים וגאומטריה.
- A4 ו-PDF.
- רק לאחר הוכחת שימוש חוזר בכמה פרויקטים.

## רכיבי מערכת הזיכרון

### זיכרון גלובלי
רק העדפות שחוצות פרויקטים:
- אמת בלבד.
- דיוק.
- עברית/RTL.
- לא להמציא תוכן.
- source-bound content.
- Git ובטיחות בסיסיים.

### זיכרון פרויקטלי
- זהות וקישור למוצר הקנוני.
- boundaries.
- source-of-truth map.
- contracts קריטיים.
- פקודות בדיקה.
- הגדרת done.

### זיכרון תחומי
- UI/mobile.
- DB/auth.
- curriculum/content.
- A4/PDF.
- device/runtime.

נטען רק כאשר path או המשימה דורשים אותו.

### state חי
- קצר ומתוארך.
- נבדק מול Git/runtime.
- אינו כלל.
- אינו נטען תמיד.

### evidence/history
- commits, PRs, screenshots, audits ו-reports.
- נקראים רק בחקירה.
- אינם גוברים על requirement מאושר או code/runtime עדכני.

## Governance לדפי כללים
התוכנית חייבת לכלול validator שבודק:
- מקור כללים מחייב אחד.
- pointers דקים מכלי AI אחרים.
- אין מסמך נוסף שמכריז על סמכות.
- אין state, changelog, counts, versions, profiles או PII בתוך rules.
- אין כפילויות או סתירות ידועות.
- אין קישור לקובץ שנמחק או לריפו legacy כמקור פעיל.
- כל command/permission מסוכן מסווג לפי risk lane.
- מסמכי domain אינם נטענים ללא צורך.

ה-validator המבני אינו מספיק. נדרש audit נוסף ל:
- freshness מול commits/runtime.
- contradictions.
- sensitive data.
- semantic duplicates.
- canonical/legacy relations בין ריפוים.

## מדיניות permissions
- deny: secrets, credentials, private keys, destructive Git ונתיבים רגישים.
- allow: read-only Git, search, tests ו-builds מוכרים לפי פרויקט.
- ask: push, merge, deploy, DB, auth, permissions, device control ומחיקה.
- actions עם PII או production נשארות explicit.
- אין wildcard רחב ל-merge או deploy.

## מדיניות Git ו-PR
- PR קטן וממוקד ככל האפשר.
- שינוי מוצר, שינוי rules ושינוי CI אינם נארזים יחד ללא צורך מוכח.
- אין PR מחקרי פתוח ללא label, owner ותאריך תפוגה.
- אין commit אוטומטי רק בגלל timestamp או snapshot ללא שינוי משמעותי.
- generated artifacts נפרדים מ-source כאשר אפשר.
- merge מהיר מותר רק ב-fast lane לאחר diff ובדיקות.
- high-risk lane דורש review נפרד וזמן בדיקה.

## מדיניות CI ובדיקות
- static checks מוכיחים מבנה וקוד בסיסי.
- browser checks מוכיחים interaction ו-layout.
- environment checks מוכיחים provider/runtime.
- live checks מוכיחים production.
- release readiness דורש את כל השכבות הרלוונטיות.
- בדיקת קיום מחרוזת או קובץ אינה הוכחה שהיכולת עובדת.
- workflow חייב להיות ממופה ל-risk ולתוצר; כפילות אמיתית בלבד מאוחדת.

## מדיניות אוטומציה
אסור לאוטומציה:
- לשכתב `CLAUDE.md` או rules ללא review.
- להציג אחוז מוכנות לפי grep בלבד.
- לעשות `git add .` כ-fallback לא מבוקר.
- לסמן הצלחה כאשר push/deploy נכשלו.
- לכתוב state חי ל-Git ללא צורך.
- לבצע merge, deploy, migration או device action ללא gate מתאים.

מותר לאוטומציה:
- לבצע audit read-only.
- לעדכן inventory רק כאשר יש שינוי משמעותי.
- להפיק artifact שניתן לבדיקה.
- להציע requirement או cleanup, לא לבצע אותו ללא אישור.
- להריץ tests, validators ו-security checks.

## מדדי הצלחה של התוכנית
- פחות דרישות שיניב צריך להסביר מחדש.
- פחות context פתיחה.
- פחות קבצים שנקראים אוטומטית.
- פחות commits/PRs למשימה אחת.
- פחות תיקוני המשך.
- פחות merge מהיר בשינויים מסוכנים.
- פחות state ישן ומקורות אמת כפולים.
- אפס מידע רגיש חדש ב-Git ציבורי.
- פחות פעולות אישור מיותרות, בלי הרחבת הרשאות מסוכנת.
- פחות workflows ו-commits חסרי משמעות.
- יותר הצלחות בפעם הראשונה עם ראיה אמיתית.

## שערי המחקר לפני תוכנית סופית
לא מפרסמים תוכנית גרסה 2 לפני:
1. השלמת audit דפי הכללים בריפוים הגדולים.
2. סיווג canonical/legacy/workspace/child בכל משפחת ריפוים.
3. audit של PRs פתוחים ואוטומציות כתיבה.
4. inventory מקומי של Claude Code.
5. baseline של context, זמן ותיקונים במשימות אמיתיות.
6. דירוג Skills/Plugins/MCP לפי חיכוך אמיתי.
7. ביקורת פרטיות בריפוים הציבוריים.

## התוצר הסופי הצפוי
תוכנית עבודה אחת שתכלול:
- ארכיטקטורת זיכרון.
- דפי כללים ותבניות לפי Tier.
- Skills והרחבות מאושרים.
- permission profiles.
- lanes לפי סיכון.
- Git/PR/CI/deploy workflow.
- audit חודשי.
- מדדי שימוש ואיכות.
- סדר מעבר הדרגתי לכל ריפו.
- rollback לכל רכיב.
