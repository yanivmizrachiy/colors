# מדריך יומי קצר ליניב — עבודה נכונה עם Claude Code

> דף שימוש מהיר בלבד. התוכנית המלאה נמצאת ב־`docs/PERSONAL_WORK_SYSTEM_PLAN.md`.

## לפני שמתחילים
1. פתח את Claude מתוך הריפו הנכון.
2. אמת repo, remote, branch ו־working tree.
3. תן משימה משמעותית אחת בלבד בכל session.
4. אל תפעיל Opus, Agent Teams או הרחבות כבדות כברירת מחדל.

## כך כותבים משימה
```text
משימה: [מה צריך לקרות].
היקף: [מה מותר לשנות].
לא לשנות: [מה מוגן].
הצלחה: [איך נדע שזה עובד].
בדיקות: [test / build / preview / live].
Git: עבוד בענף ופתח PR; אל תמזג לפני דיווח.
```

## בחר מסלול
- **Fast Lane:** שינוי קטן וברור — שינוי מינימלי ובדיקה ממוקדת.
- **Standard Lane:** כמה קבצים — Explore, תוכנית קצרה, tests ו־preview.
- **High-Risk Lane:** DB, auth, תלמידים, מכשיר או production — Draft PR, rollback ו־merge מפורש.
- **Research Lane:** audit וחקירה — read-only כברירת מחדל.

## בחירת מודל
- שינוי קטן או קוד שוטף: Sonnet, effort רגיל.
- שינוי בינוני או debugging: Sonnet, effort גבוה.
- ארכיטקטורה, אבטחה או root cause מורכב: Opus לזמן מוגבל.

## במהלך העבודה
- חפש לפני פתיחת קבצים רבים.
- שנה את המינימום הדרוש.
- אל תמציא תוכן, נתונים או הצלחה.
- לאחר ניסיון תיקון כושל אחד: חקור שורש לפני תיקון נוסף.
- לאחר שני ניסיונות כושלים: סכם, `/clear` ופתח session חדש.
- UI/RTL/A4/PDF: preview, screenshots, console/network ו־clipping.
- integration: בדוק environment/live, לא רק build.

## דרישה חדשה שאני רוצה שיישמרו
הפעל בעתיד את `capture-requirement` או פעל ידנית כך:
1. סווג את הדרישה.
2. חפש כפילות או סתירה.
3. הצג ניסוח קנוני, scope ומיקום.
4. הראה מה יוחלף.
5. שמור רק לאחר אישורי.

## Git
- פרויקט משמעותי: branch + PR.
- אין push ישיר ל־`main`.
- אין merge לפני checks, preview ו־evidence המתאימים.
- PR מסביר root cause, שינוי, בדיקות, מה לא אומת ו־rollback.

## טוקנים ו־context
- מעבר לנושא אחר: `/rename` ואז `/clear`.
- המשך אותה משימה: `/compact Focus on verified decisions, changed files, open risks, and next steps`.
- בדיקה: `/usage` ו־`/context`.
- Subagent רק למחקר מבודד ורועש.

## פעולות שתמיד דורשות שער מפורש
- merge.
- deploy.
- DB write או migration.
- auth והרשאות.
- פעולת מכשיר או shell מנהלי.
- מחיקה.
- התקנת Skill, Plugin או MCP.

## דיווח סיום
```text
דווח:
1. מה בוצע.
2. מה נבדק.
3. מה אומת חי.
4. מה לא אומת.
5. branch, commit ו-PR.
6. סיכונים פתוחים.
7. הצעד הבא.
```

## ארבעה כללי ברזל
1. PASS אינו בהכרח READY.
2. unknown עדיף על ניחוש.
3. דרישה חדשה מעדכנת מקור אחד—not מוסיפה כפילות.
4. פחות context וכלים, כל עוד האמינות נשמרת.
