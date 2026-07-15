# מצב נוכחי — קלוטקורד

עודכן: 2026-07-15

## זהות ומקורות אמת
- שם המיזם: **קלוטקורד**; כתובת נוכחית: `yanivmizrachiy/colors`.
- `main` הוא הענף הראשי; גיבוי `colors` הישן שמור ב־`archive/colors-original-2026-07-14`.
- הריפו ציבורי ונשמר בו רק מידע כללי ולא־רגיש.
- כללים: `CLAUDE.md`.
- תוכנית: `docs/PERSONAL_WORK_SYSTEM_PLAN.md`.
- שלבים: `docs/ROADMAP.md`.
- מדריך יומי: `docs/YANIV_DAILY_GUIDE.md`.
- החלטות: `DECISIONS.md`; מחקר וראיות: `docs/` ו־`research/`.

## מה הושלם
- מחקר ריפו הליבה ודפוסי העבודה בפועל.
- מחקר רשמי של Memory, Skills, Hooks, Plugins, MCP, agents, permissions, sandbox, sessions ועלויות.
- ניקוי מקורות הוראות כפולים וישנים.
- תוכנית עבודה אישית **קלוטקורד גרסה 2**.
- דרישות מערכת זיכרון אישי ומתמשך.
- דירוג Skills ו־Plugins ותוכנית פיילוט מדורגת.
- כלי Inventory מקומי בטוח מוזג ב־PR #19 ונבדק בהצלחה על Windows.
- מפרט קריאה בלבד ל־`capture-requirement` הוכן.
- 20 תרחישי קבלה ל־`capture-requirement` הוגדרו.
- טיוטת ה־Skill נשמרה בשם `DRAFT.md` ולכן אינה פעילה ואינה ניתנת להפעלה בטעות.

## החלטות פעילות
- זיכרון דרישות הוא היעד הראשון.
- `capture-requirement` ינתח ויציע בלבד; הוא לא יכתוב קבצים.
- שמירה מאושרת תבוצע בשלב נפרד דרך `safe-change` ו־Git review.
- דרישה חדשה נשמרת רק לאחר סיווג, חיפוש סתירה, הצעת ניסוח ואישור יניב.
- `allowed-tools` אינו משמש כגבול בטיחות יחיד; ההגבלה תסתמך על `disallowed-tools` ו־permissions לאחר Inventory.
- Sonnet הוא ברירת המחדל; Opus שמור לתכנון מורכב, אבטחה ו־root cause.
- משימה משמעותית אחת בכל session.
- Permissions קודמות ל־Hooks כאשר הן מספיקות.
- אין Skill pack, Agent Teams או Plugin לפי סרטון בלבד.
- merge, deploy, DB, auth ופעולות מכשיר דורשים שער מפורש.

## מצב `misparim`
- baseline נשמר ב־`main` ב־SHA `ce020c8fcf026f0ba1909f5844a49ab7ac0aafe3`.
- מועמד השינוי נמצא ב־PR #1 ובענף `pilot/claude-memory-v1`.
- ה־PR פתוח ולא ממוזג.
- אין merge לפני Inventory, שלוש מדידות baseline, review ודיווח.

## השלב הפעיל הבא
1. להריץ את כלי ה־Inventory על המחשב של יניב ולבדוק את קובצי הפלט.
2. להשלים ידנית `/status`, `/context`, `/memory`, `/plugin`, `/mcp`, `/doctor` ו־`/usage` כסיכום מסונן.
3. לבצע Baseline: שינוי UI קטן, שינוי קוד בינוני ו־audit read-only.
4. לבצע את פיילוט הזיכרון ב־`misparim`.
5. להפוך את טיוטת `capture-requirement` ל־`SKILL.md` רק לאחר אימות שמות הכלים וה־permissions המקומיים.
6. להריץ את 20 תרחישי הקבלה ולהחליט keep / adjust / remove.
7. לאחר מכן: `safe-change` או Permission profile, TypeScript LSP ו־`ui-verify`.

## עדיין לא בוצע
- ה־Inventory טרם הורץ על המחשב של יניב.
- לא הותקן Skill, Plugin, Hook או MCP חדש.
- לא שונו הגדרות Claude Code המקומיות.
- לא בוצעו מדידות baseline ולא מוזג `misparim#1`.
- ה־slug עדיין `colors`; לא התקבלה החלטה אם להפוך את הריפו ל־Private.
