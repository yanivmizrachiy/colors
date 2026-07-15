# מצב נוכחי — קלוטקורד

עודכן: 2026-07-15

## זהות ותשתית
- שם המיזם: **קלוטקורד**.
- כתובת הריפו הנוכחית: `yanivmizrachiy/colors`.
- ענף הפעילות הראשי: `main`.
- ענף המחקר הפעיל: `research/all-repos-memory-architecture`.
- התוכן המקורי של `colors` נשמר בענף `archive/colors-original-2026-07-14`.
- הריפו ציבורי; אין לשמור בו מידע אישי, secrets, נתוני תלמידים או פרטים רגישים מתוך ריפוים פרטיים.
- Rename של ה־slug ל־`klotkord` ושינוי Visibility דורשים פעולה דרך הגדרות GitHub או כלי מתאים.

## מבנה הכללים והידע
- `CLAUDE.md` הוא דף הכללים המחייב היחיד.
- `CURRENT_STATE.md` הוא מקור המצב החי.
- `DECISIONS.md` הוא היסטוריית החלטות בלבד.
- `docs/` ו־`research/` הם מחקר, ראיות ותוכניות בלבד.

## שלב המחקר הנוכחי
- בבעלות יניב מופו 42 ריפוזיטוריז: 28 ציבוריים ו־14 פרטיים.
- שבעה ריפוים עברו דוחות עומק בגרסה הראשונה.
- כל 42 הריפוים עברו מיפוי כניסה ראשוני לפי metadata, קובצי כניסה זמינים, פעילות, PRs ו־commits.
- המחקר העמוק ממשיך לפי קבוצות: הוראה ומחוללים, שליטה ומכשירים, מערכות נתונים רגישות, אינטגרציות, כלי מסמכים, יומנים, תשתיות ו־legacy.
- אין מעבר לפיילוט Skills/Plugins או לתוכנית עבודה סופית לפני השלמת המחקר העמוק וקביעת canonical/legacy לכל משפחת פרויקטים.

## יעד מרכזי: זיכרון דרישות אישי ומתמשך
- Claude ילמד דרישות, העדפות, החלטות וחוזי מוצר של יניב לאורך זמן.
- המערכת תפריד בין כלל, העדפה, חוזה מוצר, החלטה, state, משימה, ראיה, היסטוריה ומידע רגיש.
- דרישה חדשה לא תיכתב אוטומטית: Claude יזהה מועמד, יחפש כפילות/סתירה, יציע ניסוח ומיקום, ויעדכן רק לאחר אישור.
- מסמך הדרישות המחקרי: `research/MEMORY_SYSTEM_REQUIREMENTS.md`.

## מה נחקר על דרך העבודה עם Claude Code
- commits ו־PRs של Claude בפרויקטים מרכזיים.
- מהירות יצירת PR עד merge.
- PRs קטנים מול PRs של עשרות commits.
- עבודה ישירה על `main` לעומת branch/PR.
- זמני audit, artifacts ו־workflows חד־פעמיים.
- source-of-truth, STATE, rules, agents, commands ו־launch configurations.
- CI מקומי מול live/browser/PWA/device verification.
- עבודה בין Claude Code, GitHub, Lovable, AI Studio, hosting, Windows ו־Termux.
- הרשאות project-local שנמצאו ב־`.claude/settings.json`.
- מסמך דפוסים מסונן: `research/CLAUDE_CODE_WORK_PATTERNS.md`.

## ממצאי רוחב ראשוניים
- יניב משתמש ב־Claude Code כמפתח, חוקר, בודק, מעצב ומפעיל מערכות—not רק כעורך קוד.
- חוזקות: no-demo, תיאורי PR עשירים, בדיקות עמוקות, source-bound content, browser/live verification ופתרונות שורש.
- חיכוך: merge מהיר מדי בחלק מהפרויקטים, commits ישירות ל־main, PRs גדולים, תיקון על תיקון, state ישן, rules כבדים ו־PRs מחקריים שנותרו פתוחים.
- ברוב הריפוים אין עדיין Skills/Hooks native; העבודה נשענת על Markdown, scripts ו־CI.
- נמצא דגם טוב של Agents/Commands דקים שמפנים למקור כללים יחיד ולא משכפלים אותו.
- launch configurations קיימות רק במספר קטן של פרויקטים.
- אין כרגע evidence ל־PreToolUse Hooks פעילים בריפוים המרכזיים.
- נמצאה הרשאת project-local רחבה מדי למיזוג PR באחד הפרויקטים; היא תיכלל בביקורת הרשאות עתידית.

## מצב `misparim`
- `misparim/main` נשאר בסיס baseline ב־SHA `ce020c8fcf026f0ba1909f5844a49ab7ac0aafe3`.
- מועמד שינוי: `pilot/claude-memory-v1` ב־SHA `4c03a1cc02ebe72856a320ec7d71092e62d38bec`.
- PR: `yanivmizrachiy/misparim#1`.
- ה־PR פתוח ולא מוזג.
- לא מתחילים את הפיילוט לפני השלמת שלב המחקר הנוכחי.

## מה עדיין חסר
- דוח עומק לכל משפחת פרויקטים והכרעה על canonical/legacy/workspace/child.
- audit מסונן של ה־PRs הפתוחים והענפים הישנים.
- מיפוי workflows: trigger, סיכון, זמן, artifact וחפיפה.
- inventory מקומי של Claude Code: גרסה, user settings, Plugins, Skills, Hooks, MCP ו־auto memory.
- מדידת context/tokens ממשימות אמיתיות.
- השלמת מחקר פרטיות בריפוים ציבוריים.
- רק לאחר מכן: baseline, פיילוט הרחבה ותוכנית עבודה אישית גרסה 2.

## הצעד הבא
1. להשלים מחקר עומק של קבוצות הפרויקטים שנותרו.
2. לסווג כל ריפו ומשפחת ריפוים לפי תפקיד קנוני.
3. למפות PRs פתוחים ו־CI noise.
4. לבצע inventory מקומי בטוח של סביבת Claude Code.
5. להפיק תוכנית עבודה רק לאחר שכל הראיות נאספו.
