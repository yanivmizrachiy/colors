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
- `research/IMPLEMENTATION_PRIORITY.md` הכפול נמחק.

## החלטות פעילות
- זיכרון דרישות הוא היעד הראשון.
- ה־Skill הראשון יהיה `capture-requirement`, לאחר inventory ו־baseline.
- דרישה חדשה נשמרת רק לאחר סיווג, חיפוש סתירה, הצעת ניסוח ואישור יניב.
- Sonnet הוא ברירת המחדל; Opus שמור לתכנון מורכב, אבטחה ו־root cause.
- משימה משמעותית אחת בכל session.
- Permissions קודמות ל־Hooks כאשר הן מספיקות.
- אין Skill pack, Agent Teams או Plugin לפי סרטון בלבד.
- merge, deploy, DB, auth ופעולות מכשיר דורשים שער מפורש.

## מצב `misparim`
- baseline נשמר ב־`main` ב־SHA `ce020c8fcf026f0ba1909f5844a49ab7ac0aafe3`.
- מועמד השינוי נמצא ב־PR #1 ובענף `pilot/claude-memory-v1`.
- ה־PR פתוח ולא ממוזג.
- אין merge לפני inventory, שלוש מדידות baseline, review ודיווח.

## השלב הפעיל הבא
1. Inventory מקומי מסונן: גרסה, settings לא־רגישים, auto memory, Skills, Plugins, Hooks, MCP, permissions ו־Windows/WSL2.
2. Baseline: שינוי UI קטן, שינוי קוד בינוני ו־audit read-only.
3. פיילוט הזיכרון ב־`misparim`.
4. פיילוט `capture-requirement`.
5. `safe-change` או Permission profile, אחריהם TypeScript LSP ו־`ui-verify`.

## עדיין לא בוצע
- לא הותקן Skill, Plugin, Hook או MCP חדש.
- לא שונו הגדרות Claude Code המקומיות.
- לא בוצעו מדידות baseline ולא מוזג `misparim#1`.
- ה־slug עדיין `colors`; לא התקבלה החלטה אם להפוך את הריפו ל־Private.
