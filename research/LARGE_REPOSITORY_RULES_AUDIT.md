# ביקורת דפי הכללים בריפוים הגדולים

עודכן: 2026-07-15

> מסמך מחקר מסונן בלבד. הוא אינו דף כללים ואינו אישור לשנות ריפו יעד. מקור הכללים היחיד בקלוטקורד הוא `CLAUDE.md`.

## מטרת הביקורת
לבדוק לעומק כיצד הריפוים הגדולים של יניב מלמדים את Claude את הדרישות, מה נטען בכל session, היכן נוצרים כפילויות או סתירות, מה באמת נאכף בקוד, ואיזה דגם מתאים למערכת הזיכרון האישית העתידית.

## שיטת הבדיקה
לכל ריפו נבדקו:
- דף הכניסה של Claude/Agents.
- מקור הסמכות המוצהר.
- מספר מקורות הוראה בפועל.
- ערבוב בין כללים, state, architecture, history ו-runtime.
- מידע אישי או עובדות שעשויות להתיישן.
- Git/merge/deploy permissions.
- validators, tests ו-CI שאוכפים את הכללים.
- עלות context משוערת לפי מספר וגודל המסמכים שחובה לקרוא.
- סתירות בתוך הריפו ובין ריפוים קרובים.

הדירוגים הם ממצאי ביניים מחקריים, לא ציון סופי ולא הרשאה ליישום.

## תמונת מצב השוואתית

| ריפו | מקור סמכות מוצהר | מצב בפועל | אכיפה | הסיכון המרכזי |
|---|---|---|---|---|
| `mathmath` | `CLAUDE.md` | מקור יחיד קצר וממוקד יחסית | בדיקות מוצר חזקות | הרשאת merge רחבה והנחות מקומיות |
| `ma-assistant2` | `CLAUDE.md` | מקור יחיד נאכף בקשיחות | audit חזק על docs/state/secrets/duplicates/length | קובץ אחד גדול; חפיפה קנונית עם מערכת שליטה אחרת |
| `server-core` | `CLAUDE.md` | קיימים גם מסמכי rules ישנים וסותרים | validation חלקי | שתי ארכיטקטורות ומעמד canonical לא פתור |
| `desktop` | `RULES.md` | מקור יחיד מוצהר אך עמוס מאוד | לא נמצא audit סמנטי מספק | מידע אישי/runtime ועובדות זמניות בתוך הכללים |
| `parabula-next` | `CLAUDE.md` | מקור יחיד עם Agents/Commands דקים | validator חזק מאוד נגד מקורות כפולים | context גדול גם למשימות שאינן mobile/A4 |
| `maagar` | `RULES.md` | מקור יחיד ומבנה ידע ברור | validators רבים; single-rules check מבני בלבד | state מספרי, UI ו-schema בתוך דף ארוך |
| `TALMID` | `RULES.md` | pointers דקים מ-CLAUDE/AGENTS | CI רחב | מידע רגיש/זמני וכללי auto-merge במערכת נתונים רגישה |
| `www` | כמה מסמכים | שלושה מקורות הוראה עם סדרי עדיפות סותרים | audits רבים | סמכות כפולה/משולשת ו-state כבד |
| `misparim` | `CLAUDE.md` + `.ai-memory` | שער קצר שמחייב קריאת 4–5 מסמכים | בדיקות מוצר, אך אין audit מלא של memory | עלות פתיחה קבועה ו-preview לפני ידיעת סוג המשימה |
| `microsoft-forms` | `CLAUDE.md` + תוכנית ביצוע | חבילת תכנון ומחקר רחבה | acceptance thinking חזק | אוטונומיה רחבה המבוססת על snapshot שירותים/חשבון |
| `targilim` | `RULES.md` + pointer | מפת מקורות אמת מפורטת | verifiers ו-CI עמוקים | rules משלבים חוזים, state, changelog ופרטי מוצר רבים |

## ממצאים מפורטים

### 1. `mathmath` — קצר, ברור, אך permissions מסוכנות
חוזקות:
- דף כניסה קצר יחסית.
- פקודות בדיקה ברורות.
- הבחנה בין local build, browser ו-Vercel runtime.
- תהליך Git/PR מפותח.

חיכוך:
- חלק מהנחות הסביבה והנתיבים מקומיות.
- נמצאה הרשאת project-local רחבה למיזוג PRs.
- המיזוג יכול להתרחש מהר מדי ביחס לסיכון השינוי.

לקח:
דף קצר הוא טוב, אך permissions חייבות להיות נפרדות ומדורגות לפי סיכון.

### 2. `ma-assistant2` — אכיפה חזקה של מקור יחיד
חוזקות:
- audit אוסר Markdown מתחרה, state tracked, docs כפולים, secrets וקבצים generated.
- README חייב להישאר pointer קצר.
- קיימת תקרת גודל ל-`CLAUDE.md`.
- נבדקים duplicates, שמות קבצים, paths ו-secret patterns.

חיכוך:
- כל הארכיטקטורה, היכולות, ההפעלה והחוזים נדחסים לקובץ יחיד.
- תקרת גודל אינה פותרת טעינה לא רלוונטית.
- קיימת חפיפה במעמד המוצר מול ריפו שליטה אחר.

לקח:
צריך לשמר את audit המבני והאבטחתי, אך לא להכריח כל מידע להיכנס לקובץ אחד.

### 3. `server-core` — כללים טובים, אבל מקור יחיד שאינו יחיד
חוזקות:
- הבחנה חזקה בין code, proof ו-runtime verification.
- איסור על הצלחה מזויפת ו-silent failure.
- allowlist, replay protection ואישור לפעולות רגישות.
- state runtime אמור להישאר מחוץ ל-Git.

חיכוך:
- קיימים מסמכי rules ישנים tracked שמכריזים בעצמם על מקור אמת.
- המסמך הישן מחייב ארכיטקטורה אחרת מהמסמך החדש.
- גם ריפו סמוך מכריז שהוא המוצר הפעיל והבלעדי לאותו תחום.

לקח:
אין משמעות להצהרת “single source” בלי validator שסורק את כל הריפו ובלי הכרעת canonical בין ריפוים.

### 4. `desktop` — זיכרון עשיר מדי ומידע שצריך להיות config
חוזקות:
- מתעד היטב את מטרת המוצר, real actions והפרדת זהויות.
- מגדיר במפורש פעולות חסומות ואיסור על fake buttons.
- מסביר מגבלות אמיתיות של Chrome, Electron ו-WhatsApp.

חיכוך:
- מאות שורות של חשבונות, פרופילים, URLs, מכשירים, גרסאות ותפריטי UI.
- מידע אישי וזמני נמצא בדף הכללים במקום ב-config מקומי.
- קיימת מתיחות בין “ללא framework כבד” לבין שימוש מועדף ב-Electron כאשר מותקן.

לקח:
הכלל הקבוע צריך להיות “הפרדה בין אישי לעבודה”; הפרטים המדויקים צריכים להגיע מ-config מקומי מאומת ולא מזיכרון Git.

### 5. `parabula-next` — הדגם הטוב ביותר לאכיפת מקור יחיד
חוזקות:
- validator אוסר מסמכי הוראות ישנים, state, page counts, local paths ורשימות פקודות כפולות.
- Agents ו-Commands חייבים להיות pointers דקים.
- קבצי תיעוד נסרקים לאיתור ניסוח מחייב מתחרה.
- validators קבועים מגינים על mobile, A4, interactions ו-versioning.

חיכוך:
- `CLAUDE.md` עדיין גדול מאוד.
- חוזי mobile/A4 נטענים גם למשימה שאינה נוגעת בהם.
- כל Agent נדרש לקרוא את אותו מסמך מלא.

לקח:
זהו בסיס טוב ל-governance, אך הוא צריך path-scoped rules או Skills תחומיים כדי לחסוך context.

### 6. `maagar` — מקור יחיד עם guards דטרמיניסטיים
חוזקות:
- מפת תפקידים ברורה: metadata, state, docs, scripts.
- guards אמיתיים נגד fake buttons, קישורים לא אמיתיים וזרימת ניווט ישנה.
- metadata הוא מקור אמת, עם `unknown` במקום ניחוש.
- מניעת duplicates באמצעות hashes.

חיכוך:
- `RULES.md` כולל snapshot מספרי, UI, taxonomy, paths ו-schema מלא.
- בדיקת “single rules page” מאמתת בעיקר קיום והפניות, לא סתירות סמנטיות או state ישן.

לקח:
להעביר schema ו-taxonomy למקור נתונים מאומת; להשאיר בדף הכללים רק חוזים שאי אפשר להסיק או לבדוק מהקוד.

### 7. `TALMID` — מקור יחיד מסודר במוצר רגיש
חוזקות:
- CLAUDE/AGENTS הם pointers קצרים.
- הפרדת תפקידי מורה ותלמיד מתועדת היטב.
- DB, auth, privacy, Zod ו-checks מוגדרים בבירור.
- ההוראה האחרונה של יניב מחליפה קודמת.

חיכוך:
- דף הכללים כולל מידע אישי, שמות ו-snapshots מספריים.
- הריפו ציבורי למרות מידע רגיש היסטורי.
- מסלול העבודה מעניק merge אוטומטי כמעט מלא גם לשינויי DB/auth/PII.

לקח:
במערכת רגישה דרוש מקור כללים קצר, data פרטי מחוץ ל-Git ושערי merge נפרדים לפי סוג סיכון.

### 8. `www` — האזהרה המרכזית נגד ריבוי מקורות אמת
נמצאו לפחות שלושה מקורות הוראה:
- `RULES.md` טוען שהוא כלל הגבול העליון.
- `PROJECT_RULES.md` טוען שהוא אמת המוצר העדכנית.
- מסמך תפעולי נוסף טוען ש-`PROJECT_RULES.md` הוא העליון.

חוזקות:
- truth discipline מצוין.
- הפרדה בין implemented, proven, blocked ו-Teacher Release.
- פרטיות, DB, LTI, Moodle ו-live verification מתועדים לעומק.

חיכוך:
- סדרי עדיפות סותרים.
- runtime counts, APIs, schema, UI, CI ו-history בתוך מסמכי הוראה ארוכים.
- state/evidence עשויים להתיישן ולהמשיך להיטען.

לקח:
ריבוי “אמת” מסוכן יותר מחוסר תיעוד. נדרש מקור סמכות אחד, map לתתי-תחומים ו-state שנגזר מחדש.

### 9. `misparim` — זיכרון מדורג טוב עקרונית, יקר בפועל
חוזקות:
- `CLAUDE.md` קצר.
- קיים INDEX שמנתב למסמכים אחרים.
- דרישות, state, decisions ו-prompts מופרדים.
- קיימים חוזי RTL, fallback ומתמטיקה חשובים.

חיכוך:
- INDEX מחייב בכל session קריאה של ארבעה קבצים נוספים.
- preview מופעל לפני שידוע אם המשימה בכלל דורשת UI.
- state מכיל מפת רכיבים והיסטוריה ארוכה.
- Git workflow הישן מאפשר push ישיר ל-main.

לקח:
זהו מועמד מצוין לפיילוט path rules וטעינה לפי משימה, אך יש למדוד לפני merge.

### 10. `microsoft-forms` — תוכנית אוטונומית במקום דף כניסה
חוזקות:
- research-first.
- acceptance tests ותוכנית שלבים.
- הבחנה בין חסמים אמיתיים לבין עבודה ש-Claude יכול לבצע לבד.
- מחשבה על preference learning וביטול העדפה.

חיכוך:
- כל פתיחה דורשת קריאת חבילת מסמכים גדולה.
- facts על שירותים וחשבון עלולים להתיישן.
- האוטונומיה רחבה לפני feasibility/live checkpoint עדכני.

לקח:
תוכנית ביצוע גדולה צריכה להיות artifact של phase, לא memory קבוע לכל session.

### 11. `targilim` — דרישות חזקות ובדיקות חזקות, אך rules כבדים
חוזקות:
- מפת מקורות אמת לפי concern.
- validators, browser tests, A4, live checks ו-GitHub Pages verification.
- דרישות דטרמיניסטיות רבות עברו לקוד.

חיכוך:
- מסמך rules כולל גם היסטוריה, snapshots ופרטי מוצר רבים.
- CI רחב מאוד ומפוצל לכמה workflows.
- יש צורך להבחין בין guard ייחודי לבין CI noise.

לקח:
לשמר את מפת מקורות האמת וה-verifiers; להוציא changelog/state מה-context הקבוע.

## דגמים שכדאי לשלב במערכת העתידית

### לקחת מ-`parabula-next`
- validator שמאתר מקורות הוראה מתחרים.
- pointers דקים ל-Agents/Commands.
- איסור state, paths ו-command lists בתוך AI entry files.

### לקחת מ-`ma-assistant2`
- secret scanning.
- איסור state/runtime ו-generated files ב-Git.
- duplicate detection.
- תקרת גודל והפניה קצרה מה-README.

### לקחת מ-`maagar` ו-`targilim`
- guards דטרמיניסטיים.
- `unknown` במקום ניחוש.
- hashes, metadata ו-dry-run.
- בדיקות browser/live נפרדות מבדיקות סטטיות.

### לקחת מ-`www`
- truth states: implemented / tested / live verified / blocked / release ready.
- אין להמיר missing ל-0 או ל-success.

### לקחת מ-`misparim`
- הפרדה בין requirements, state, decisions ו-history.
- טעינה לפי domain, לאחר תיקון העלות הקבועה.

### לקחת מ-`TALMID`
- supersede: הוראה חדשה מעדכנת את הישנה ולא מצטברת לצידה.
- pointers דקים מכלי AI שונים למקור אחד.

## עקרונות התכנון שנגזרים מהביקורת
1. מקור כללים מחייב אחד, אך לא קובץ ענק שמכיל את כל הידע.
2. `CLAUDE.md` קצר: זהות, גבולות, מקור אמת, תהליך ובדיקות בסיס.
3. חוזים תחומיים נטענים לפי path או Skill.
4. state, counts, versions, URLs, profiles ו-runtime אינם כללים.
5. מידע אישי ורגיש אינו נשמר בזיכרון Git ציבורי.
6. כל “single source” חייב validator שסורק מסמכים מתחרים.
7. validator מבני אינו מספיק; נדרשת בדיקת freshness, contradictions ו-references.
8. כלל דטרמיניסטי חשוב עובר ל-test, permission, guard או Hook.
9. Skills אינם עותק נוסף של rules; הם workflow חוזר עם input/output וכלים מוגבלים.
10. merge/deploy/DB/auth/PII מקבלים שערי סיכון נפרדים.
11. PR descriptions ו-commits הם היסטוריה וראיה, לא memory קבוע.
12. מערכת הזיכרון חייבת לתמוך ב-proposed, approved, verified, superseded ו-revoked.

## שאלות שעדיין פתוחות
- איזה ריפו הוא canonical במשפחות שבהן שני מוצרים מכריזים על בלעדיות.
- כיצד לחלק `CLAUDE.md` גדול ל-path rules בלי לאבד חוזים קריטיים.
- האם הזיכרון הגלובלי של יניב יהיה repository פרטי, auto memory מקומי או שילוב ביניהם.
- כיצד לבצע conflict detection סמנטי בלי לתת ל-AI לשנות כללים לבד.
- מהו ה-Skill הראשון שכדאי לבנות לאחר המדידה: capture-requirement, safe-change, ui-verify או repo-audit.
