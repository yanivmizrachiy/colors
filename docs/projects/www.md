# דוח מחקר: `yanivmizrachiy/www`

עודכן: 2026-07-14

## סטטוס
דוח מבוסס ראשוני. נבדקו שערי הזיכרון, `PROJECT_RULES.md` והיסטוריית PRs עדכנית.

## המודל שנמצא
- `CLAUDE.md` קצר יחסית ומשמש שער.
- `PROJECT_RULES.md` הוא מסמך אמת מוצר גדול.
- קיימים מסמכי STATE, evidence, audit, release gates ו-progress רבים.
- PRs משתמשים באופן עקבי בשפה: proven / blocked / not verified / Teacher Release NO.
- checks רבים מגנים על Moodle, LTI, NRPS, Supabase, פרטיות ונתונים אמיתיים.

## חוזקות
1. רמת honesty גבוהה: אין הצגה של capability כחיה ללא ראיה.
2. הפרדה בין code exists לבין live verified.
3. חסימות שחרור מפורשות ושמירה על Teacher Release NO.
4. PRs מציינים מה לא שונה ומה נשאר חסום.
5. הגנה גבוהה על PII, secrets ונתוני תלמידים.
6. audits תחומיים נותנים contracts ברורים לאינטגרציות מסוכנות.
7. ניסוח סטטוסים אחיד מונע המצאת נתונים או פרשנות יתר.

## חולשות וסיכונים
### עומס state ותיעוד
ריבוי `STATE/progress`, evidence logs, audits ומפות אמת מקשה לדעת איזה מסמך עדכני. מסמך אמת יכול להפוך להיסטוריה מצטברת במקום current truth קצר.

### PR fragmentation
רצף PRs קטנים מאוד יוצר בטיחות נקודתית, אך יכול להגדיל overhead, backlog וקושי להבין איזה workflow סופי קובע.

### בדיקות שעוברות עם blocker
חלק מה-audits “עוברים” משום שהם מאמתים שה-blocker עדיין מתועד. לכן PASS אינו בהכרח capability מוכנה. צריך להפריד בין validator health לבין product readiness.

### branch/release complexity
קיים פער בין `main`, ענפי production/rebuild ו-PRs פתוחים. זה מחייב מקור אמת קצר וברור לגבי מה נפרס בפועל.

### תיעוד ישן פתוח
PRs draft וישנים עשויים להכיל רעיונות או קוד שכבר הוחלפו. הם מוסיפים רעש לחקירה של Claude.

## ממצא מרכזי
`www` הוא המודל הטוב ביותר ל-truth discipline ולבטיחות, אך הוא גם הדוגמה החזקה ביותר לכך שיותר audit ותיעוד אינם בהכרח יותר בהירות. יש צורך ב-current truth קצר שמפנה לראיות ולא מעתיק אותן.

## לקחים למערכת האישית
- לכל capability: `verified`, `implemented-not-live`, `blocked`, `unknown`.
- PASS של audit אינו שווה READY; ה-readiness verdict חייב להיות נפרד.
- current state צריך לכלול רק 5–10 חסימות פעילות, לא את כל ההיסטוריה.
- evidence מפורט נשמר בארכיון/לוג לפי תאריך.
- PR גדול ומסוכן מתחיל כ-draft; שינוי UI קטן לא צריך מערכת audit מלאה.
- יש לכתוב במפורש מה לא השתנה כאשר עובדים באזור רגיש.

## מועמדים עתידיים — ללא יישום
1. תבנית `CAPABILITY_STATUS.md` אחידה.
2. מחולל current truth מתוך evidence במקום כתיבה כפולה.
3. triage של PRs ישנים ו-drafts.
4. Skill לביקורת PR מסוכן שמחזיר verdict קצר.
5. הפרדה פורמלית בין `checks_passed` לבין `release_ready`.

## מדדי הצלחה
- זמן קצר יותר להבין מה חי ומה חסום.
- פחות סתירות בין STATE, PRs ו-production.
- פחות מסמכי progress פעילים.
- אפס claims חיים ללא ראיה.
- פחות זמן context על היסטוריה שאינה רלוונטית.