# מצב נוכחי — קלוטקורד

עודכן: 2026-07-15

## זהות ותשתית
- שם המיזם: **קלוטקורד**.
- כתובת הריפו הנוכחית: `yanivmizrachiy/colors`.
- ענף ראשי: `main`.
- התוכן המקורי של `colors` שמור בענף `archive/colors-original-2026-07-14`.
- הריפו ציבורי; נשמר בו רק מידע כללי ולא־רגיש.

## מבנה מקור האמת
- `CLAUDE.md` — דף הכללים המחייב היחיד.
- `CURRENT_STATE.md` — המצב החי בלבד.
- `docs/PERSONAL_WORK_SYSTEM_PLAN.md` — תוכנית העבודה המלאה גרסה 2.
- `docs/ROADMAP.md` — שלבי היישום.
- `docs/YANIV_DAILY_GUIDE.md` — מדריך שימוש קצר.
- `DECISIONS.md` — היסטוריית החלטות בלבד.
- `docs/` ו־`research/` — מחקר, ראיות ותכנון.

## מה הושלם
- מחקר העבודה בפועל בריפו הליבה הגדולים.
- מחקר רשמי של Memory, Rules, Skills, Hooks, Plugins, MCP, Subagents, Agent Teams, permissions, sandbox, sessions, checkpoints ועלויות.
- ניקוי מקורות הוראות כפולים וישנים.
- תוכנית עבודה אישית **קלוטקורד גרסה 2**.
- מערכת דרישות לזיכרון אישי ומתמשך.
- מסמך דפוסי העבודה של יניב עם Claude Code.
- דירוג Skills ו־Plugins לפי ערך, סיכון, context ו־rollback.
- מדריך יומי ו־Roadmap מעודכנים.
- `research/IMPLEMENTATION_PRIORITY.md` הכפול נמחק; סדר היישום נמצא כעת רק ב־Roadmap ובתוכנית גרסה 2.

## ההחלטות המרכזיות
- זיכרון דרישות הוא היעד הראשון.
- ה־Skill הראשון יהיה `capture-requirement`, לאחר inventory ו־baseline.
- דרישה חדשה אינה נשמרת אוטומטית: מסווגים, מחפשים סתירה, מציעים ניסוח ומקבלים אישור.
- Sonnet הוא ברירת המחדל; Opus שמור לתכנון מורכב, אבטחה ו־root cause.
- משימה משמעותית אחת בכל session.
- Permissions קודמות ל־Hooks כאשר הן מספיקות.
- לא מתקינים Skill pack או Plugin לפי סרטון בלבד.
- אין Agent Teams כברירת מחדל.
- build/PASS אינם שווים live verified או release ready.
- merge, deploy, DB, auth ופעולות מכשיר דורשים שער מפורש.

## מצב פיילוט `misparim`
- baseline נשמר ב־`misparim/main` ב־SHA `ce020c8fcf026f0ba1909f5844a49ab7ac0aafe3`.
- מועמד שינוי נמצא בענף `pilot/claude-memory-v1` וב־PR #1.
- ה־PR פתוח ולא ממוזג.
- אין merge לפני inventory, שלוש מדידות baseline, review ודיווח.

## השלב הפעיל הבא
### 1. Inventory מקומי מסונן
נבדוק רק:
- גרסת Claude Code.
- user settings שאינם רגישים.
- auto memory וקבצים שנטענים.
- שמות Skills, Plugins, Hooks ו־MCP.
- permissions מסוג allow / ask / deny.
- Windows מול WSL2 לצורך sandbox.

לא נקרא secrets, transcripts, cookies או ערכי env.

### 2. Baseline
שלוש משימות אמיתיות:
- שינוי UI קטן.
- שינוי קוד בינוני.
- audit read-only.

נמדוד `/usage`, `/context`, זמן, קבצים, תיקונים ורגרסיות.

### 3. פיילוטים
1. פיילוט הזיכרון ב־`misparim`.
2. `capture-requirement`.
3. `safe-change` או Permission profile.
4. TypeScript LSP רשמי בפרויקט אחד.
5. `ui-verify` בפרויקט אחד.

## מה עדיין לא בוצע
- לא הותקן Skill, Plugin, Hook או MCP חדש.
- לא שונו הגדרות Claude Code המקומיות.
- לא בוצעו מדידות baseline.
- לא מוזג `misparim#1`.
- לא שונה שם הריפו בפועל ל־`klotkord`.
- לא התקבלה החלטה אם להפוך את קלוטקורד ל־Private.
