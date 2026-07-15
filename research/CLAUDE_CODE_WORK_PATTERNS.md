# דפוסי העבודה של יניב עם Claude Code

עודכן: 2026-07-15

> מסמך מחקר מסונן בלבד. הוא אינו דף כללים ואינו כולל secrets, מידע אישי או פרטי runtime מריפוים פרטיים.

## חוזקות שכדאי לשמר
- עבודה אמיתית ולא דמו.
- דרישות מדויקות על RTL, מתמטיקה, A4, PDF, mobile ו־UI.
- שימוש ב־tests, build, browser, preview ו־live checks.
- תיאורי commit/PR עשירים עם root cause ובדיקות.
- מעבר מכלל טקסטואלי ל־test, verifier או guard כאשר אפשר.
- העדפה לפתרון שורש ולא רק תיקון סימפטום.

## דפוסי חיכוך שנמצאו
- מיזוג מהיר מדי של PR בחלק מהפרויקטים.
- commits ניסיוניים ישירות ל־`main`.
- PRs גדולים שמערבבים כמה נושאים.
- תיקון על תיקון במקום root-cause review.
- `CLAUDE.md` או `RULES.md` שגדלים לזיכרון כבד.
- state, audits ו־runtime outputs שנשמרים ב־Git ומתיישנים.
- PRs מחקריים ו־workflows זמניים שנשארים פתוחים.
- מעבר בין Claude Code, Lovable, AI Studio ו־GitHub בלי מסמך handoff קנוני.
- הרשאות רחבות מדי ל־merge או פעולות צד.
- scheduled automation שמשנה קוד או כללים בלי review.

## סוגי העבודה העיקריים
### פיתוח מוצר
אתרים, dashboards, טפסים, DB, authentication ואינטגרציות.

### תוכן והוראה
שאלות, תוכנית לימודים, גרפים, SVG, MathJax, RTL, A4, PDF ו־PNG.

### חקירה וביקורת
Repo audit, CI/logs, source of truth, duplicates, legacy ו־PR review.

### תפעול
PowerShell, Windows, מכשירים, hosting, launchers וסביבות מקומיות.

### תחזוקה
ניקוי docs/state, consolidation, guards, CI, versioning ו־rollback.

## ארבעת המסלולים שנבחרו
- Fast Lane — שינוי קטן וברור.
- Standard Lane — שינוי בכמה קבצים עם plan קצר.
- High-Risk Lane — DB, auth, תלמידים, מכשיר או production.
- Research Lane — read-only ואיסוף ראיות.

## שיפורים מרכזיים לתוכנית
- משימה אחת בכל session.
- עצירה אחרי שני ניסיונות כושלים.
- Skill ידני ללכידת דרישה חדשה.
- Permission profile לפני Hook.
- PR קטן לפי יחידת יכולת.
- review עצמאי לשינוי מסוכן.
- הפרדה בין implemented, tests passed, live verified ו־release ready.
- lifecycle ל־PR מחקרי: active / blocked / superseded / expired.
- handoff קצר בין כלים ומחשבים.

## מדדים שייאספו
- זמן עד root cause.
- זמן עד תוצאה מאומתת.
- context/tokens.
- קבצים שנקראו.
- מספר commits ו־PRs למשימה.
- מספר תיקונים.
- זמן PR עד merge.
- רגרסיות.
- דרישות שנשכחו.
- פעולות ידניות שנחסכו ליניב.
