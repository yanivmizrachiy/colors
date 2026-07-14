# רשם הזדמנויות עתידיות

## עיקרון
זהו רשם מחקרי בלבד. הופעת רעיון כאן אינה אישור ליישום.

## שדות
- ID
- הבעיה שנצפתה
- הראיות
- תדירות משוערת
- חומרה
- פתרון עתידי אפשרי
- חלופה פשוטה יותר
- סיכון
- עלות תחזוקה
- מידע חסר
- מדד הצלחה
- סטטוס

## הזדמנויות מחקריות
| ID | בעיה | ראיות | מועמד עתידי | מידע חסר | סטטוס |
|---|---|---|---|---|---|
| O-001 | תיקוני המשך לאחר פיצ'רים גדולים | רצפי PRs ב־`mathmath`; mobile hardening ב־`parabula-next` | slicing/checkpoints או checklist קבלה | האם הדרישה השתנתה, session length ודרך merge | מחקר |
| O-002 | בדיקות מקומיות עוברות אך סביבת פריסה נכשלת | Vercel failures ב־`mathmath` | preflight/runtime contract עתידי | רשימת failures ותדירות | מחקר |
| O-003 | מסמך זיכרון גדול שנטען תמיד | `parabula-next` כ־260 שורות; `www`/`microsoft-forms` דורשים מחקר | path-scoped rules או progressive disclosure | נתוני context וטעויות לפי domain | מחקר |
| O-004 | כללים חוזרים נשמרים רק בטקסט | כמה ריפוים | guard/test/Hook עתידי | אילו כללים דטרמיניסטיים | מחקר |
| O-005 | חקירות רחבות מייצרות פלטים גדולים | דורש מידע מקומי | Subagent או תהליך סיכום עתידי | נתוני context ו־usage | פתוח |
| O-006 | יניב נדרש לחזור על העדפות עבודה | שיחות ודרישות חוזרות | זיכרון גלובלי מינימלי | אילו העדפות קבועות ואילו תלויות פרויקט | מחקר |
| O-007 | אין תמונה אחת של מצב כל הפרויקטים | ריבוי ריפוים ותבניות שונות | אינדקס/דוח תקופתי עתידי | תדירות עדכון רצויה | מחקר |
| O-008 | CI בונה אותו artifact שוב ושוב | `parabula-next`: 10 jobs עם install/build בכל PR | build-once/test-many או artifact reuse | זמני jobs, failures ודרישות isolation | מחקר |
| O-009 | deep mobile רץ גם לשינוי לא רלוונטי | workflow ראשי של `parabula-next` ללא path filters | path-aware selection עם fallback מלא | dependency map ושיעור missed-risk | מחקר |
| O-010 | PRs גדולים מאוד | PRs #36–#37 עם 82/63 commits | תוכנית slicing, stacked PRs או checkpoints | אופן העבודה וה־sessions | מחקר |
| O-011 | validator תלוי phrases מדויקים | `single-rules-source-check.mjs` | contract IDs/schema-based enforcement | תדירות שינוי ניסוחים ו־false failures | מחקר |
| O-012 | PRs פתוחים מיושנים מבלבלים תמונת מצב | `parabula-next` #18/#24/#27 | מדיניות triage/expiry עתידית | האם העבודה עדיין נדרשת | מחקר |
| O-013 | audit outputs מנפחים repo | `parabula-next` PR #22 מול #24 | artifact-only audit policy | האם דפוס חוזר בריפוים אחרים | מחקר |
| O-014 | test list ידני | `mathmath` package.json | auto discovery או guard | האם טסטים נשמטו בפועל | מחקר |
| O-015 | documentation עשוי לפגר אחרי code | `mathmath` README מול storage DB; דורש אימות | docs freshness check עתידי | extent ותדירות drift | מחקר |

## סולם עדיפות עתידי
- **קריטי:** נזק פרודקשן, אבטחה או אובדן מידע.
- **גבוה:** חיכוך תכוף או תיקונים חוזרים משמעותיים.
- **בינוני:** חיסכון מורגש אך לא תכוף.
- **נמוך:** שיפור נוחות בלבד.

## כללי זהירות
1. שיפור CI אינו בהכרח הפחתת בדיקות; ייתכן שמדובר רק בשיתוף artifact או ניתוב לפי scope.
2. קיצור CLAUDE אינו מטרה בפני עצמה; המדד הוא פחות context ללא יותר טעויות.
3. סגירת PR ישן אינה אוטומציה; נדרש triage אנושי.
4. רכיב חדש אינו פתרון אם הוא מוסיף מקור אמת נוסף או תחזוקה כפולה.

## מעבר לתוכנית
הזדמנות תעבור לתוכנית רק אם:
1. קיימות לפחות שתי ראיות או אירוע חמור אחד.
2. הבעיה נוסחה במדויק.
3. נבדקה חלופה פשוטה יותר.
4. הוגדר מדד הצלחה.
5. הוגדר rollback.
6. יניב אישר את המעבר ממחקר ליישום.