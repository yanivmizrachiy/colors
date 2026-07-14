# אינדקס מחקר הריפוים — גרסה 1

עודכן: 2026-07-14

## מצב הדוחות
| ריפו | עדיפות | סטטוס | הממצא המרכזי | מידע נוסף רצוי |
|---|---|---|---|---|
| `mathmath` | קריטית | דוח מבוסס ראשוני | שער קצר ו־PR workflow טובים; פערי browser/provider/Vercel בפיצ'רים רחבים | branch protection, session/context ו־failure history |
| `parabula-next` | גבוהה מאוד | דוח מבוסס ראשוני | canonical rules ו־CI חזקים; context קבוע ו־10 builds ל־PR עלולים להיות כבדים | זמני CI, failure rate ונתוני context |
| `misparim` | גבוהה | דוח מבוסס ראשוני | זיכרון מדורג אך סדר קריאה קבוע טוען כפילויות; requirements מערבב domains | baseline `/usage` לפני/אחרי פיילוט |
| `maagar` | גבוהה | דוח מבוסס ראשוני | dry-run, hashes, validators ו־browser QA הם המודל הטוב ביותר לאכיפה | מיפוי checks פעילים ו-triage PRs ישנים |
| `microsoft-forms` | גבוהה | דוח מבוסס ראשוני | research-first ו־acceptance tests מאפשרים אוטונומיה, אך יש סיכון ל-overplanning | feasibility/live checkpoints בעת implementation |
| `www` | גבוהה | דוח מבוסס ראשוני | truth gates ובטיחות מצוינים; ריבוי STATE/audits יוצר עומס | מיפוי production branch וארכוב state ישן |
| `bbb` | בינונית | סריקה מבוססת | הוראות מקומיות לפי subproject מתאימות לריפו רב־שכבתי | activity, tests וזרימת Git בפועל |

## דפוסי־על שנקבעו
1. CLAUDE קצר עדיף, אך רק כאשר contracts קריטיים נאכפים בבדיקות.
2. מידע תחומי צריך להיטען לפי path ולא בכל session.
3. state נוכחי והיסטוריה אינם אותו דבר.
4. דרישה דטרמיניסטית צריכה לעבור ל-test/guard.
5. PASS של בדיקה אינו שווה live verified או release ready.
6. agent/subagent הוא כלי לבידוד context, לא ברירת מחדל.
7. CI רחב צריך להיות מדורג ומותאם scope, לא תמיד “הכול בכל PR”.
8. dry-run ו־rollback הם תנאי לפעולה רחבה.
9. נתון לא ידוע נשאר unknown; לא ממציאים.
10. מערכת זיכרון עצמה דורשת תחזוקה וארכוב.

## ההחלטה התכנונית
אין “תבנית אחת” לכל הריפוים. כל פרויקט יקבל Tier:
- A: קטן ופשוט.
- B: מוצר פעיל עם UI/DB.
- C: מערכת רגישה או אינטגרציה חיצונית.

התוכנית המלאה נמצאת ב־`docs/PERSONAL_WORK_SYSTEM_PLAN.md`.

## מה חסר לפני יישום
- inventory מקומי קטן של הגדרות וכלים מותקנים.
- baseline `/usage` במשימות דומות.
- אישור יניב לפיילוט ב־`misparim`.

## כלל מחייב
הריפוים שנחקרו נשארים לקריאה בלבד במסגרת מיזם זה. כל יישום עתידי ייעשה רק לאחר אישור נפרד.