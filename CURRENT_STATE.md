# מצב נוכחי — קלוטקורד

עודכן: 2026-07-15

## זהות ותשתית
- שם המיזם: **קלוטקורד**.
- כתובת הריפו הנוכחית: `yanivmizrachiy/colors`.
- ענף הפעילות הראשי: `main`.
- ענף המחקר הפעיל: `research/all-repos-memory-architecture`.
- התוכן המקורי של `colors` נשמר בענף `archive/colors-original-2026-07-14`.
- הריפו ציבורי; אין לשמור בו מידע אישי, secrets, נתוני תלמידים או פרטים רגישים מתוך ריפוים פרטיים.

## מבנה הכללים והידע
- `CLAUDE.md` הוא דף הכללים המחייב היחיד.
- `CURRENT_STATE.md` הוא מקור המצב החי.
- `DECISIONS.md` הוא היסטוריית החלטות בלבד.
- `docs/` ו־`research/` הם מחקר, ראיות ותוכניות בלבד.

## היקף המחקר המעודכן
לא ממשיכים לחקור לעומק את כל 42 הריפוזיטוריז. המחקר מתמקד רק בפרויקטי הליבה הגדולים, הפעילים והמשמעותיים ביותר, ובמשפחות שבהן קיימת חפיפה ארכיטקטונית או סיכון גבוה.

### ריפו ליבה למחקר עומק
1. `ma-assistant2` — מערכת שליטה מקומית, דפדפן, טלפון ומחשב.
2. `server-core` — נבדק כחלק ממשפחת השליטה ובגלל חפיפה עם `ma-assistant2`.
3. `mathmath` — מוצר הוראה מרכזי, PRs, Vercel ו־runtime.
4. `misparim` — פיילוט הזיכרון והפרדת שני מוצרים באותו ריפו.
5. `parabula-next` — מוצר גדול עם A4, mobile, PWA, CI ו־Agents.
6. `maagar` — ingestion, PDF/DOCX, metadata, validators ו־browser QA.
7. `www` — Moodle, DB, LTI, תלמידים ו־release readiness.
8. `TALMID` — מערכת תלמיד/מורה עם פרטיות, DB והרשאות.
9. `targilim` — דגם בשל של source of truth, verifiers ו־CI.
10. `microsoft-forms` — אינטגרציה חיצונית, browser automation ואוטונומיה.

### פרויקטים משלימים בלבד
`summer-workbook-h`, `word`, `termux`, `desktop`, `mobile-phone` ו־`github-journal` ישמשו רק כדוגמאות נקודתיות לדפוסים שאינם מופיעים בליבה: A4/PDF, PowerShell, מכשירים, scheduled automation או state drift. הם לא יקבלו דוח עומק מלא בשלב זה.

## יעד מרכזי: זיכרון דרישות אישי ומתמשך
- Claude ילמד דרישות, העדפות, החלטות וחוזי מוצר של יניב לאורך זמן.
- המערכת תפריד בין כלל, העדפה, חוזה מוצר, החלטה, state, משימה, ראיה, היסטוריה ומידע רגיש.
- דרישה חדשה לא תיכתב אוטומטית: Claude יזהה מועמד, יחפש כפילות או סתירה, יציע ניסוח ומיקום, ויעדכן רק לאחר אישור.
- מסמך הדרישות המחקרי: `research/MEMORY_SYSTEM_REQUIREMENTS.md`.

## מה נחקר על דרך העבודה עם Claude Code
- commits ו־PRs של Claude בפרויקטי הליבה.
- מהירות יצירת PR עד merge.
- PRs קטנים מול PRs רחבים.
- עבודה ישירות על `main` לעומת branch/PR.
- source-of-truth, STATE, rules, agents, commands ו־launch configurations.
- CI מקומי מול live/browser/PWA/device verification.
- עבודה בין Claude Code, GitHub, Lovable, AI Studio, hosting, Windows ו־Termux.
- מסמך דפוסים מסונן: `research/CLAUDE_CODE_WORK_PATTERNS.md`.

## ממצאי רוחב ראשוניים
- יניב משתמש ב־Claude Code כמפתח, חוקר, בודק, מעצב ומפעיל מערכות.
- חוזקות: עבודה אמיתית, תיאורי PR עשירים, בדיקות עמוקות, מקור תוכן מאושר, browser/live verification ופתרונות שורש.
- חיכוך: merge מהיר מדי בחלק מהפרויקטים, commits ישירות ל־main, PRs גדולים, תיקון על תיקון, state ישן, rules כבדים ו־PRs מחקריים שנותרו פתוחים.
- ברוב ריפו הליבה אין עדיין Skills/Hooks native; העבודה נשענת בעיקר על Markdown, scripts ו־CI.
- נמצא דגם טוב של Agents/Commands דקים שמפנים למקור כללים יחיד.
- נמצאה הרשאת project-local רחבה מדי למיזוג PR באחד הפרויקטים; היא תיכלל בביקורת הרשאות.

## מצב `misparim`
- `misparim/main` נשאר בסיס baseline ב־SHA `ce020c8fcf026f0ba1909f5844a49ab7ac0aafe3`.
- מועמד שינוי: `pilot/claude-memory-v1` ב־SHA `4c03a1cc02ebe72856a320ec7d71092e62d38bec`.
- PR: `yanivmizrachiy/misparim#1`.
- ה־PR פתוח ולא מוזג.
- לא מתחילים את הפיילוט לפני השלמת מחקר הליבה.

## מה עדיין חסר
- השלמת דוחות עומק לריפו הליבה בלבד.
- הכרעה על היחס בין `ma-assistant2` ל־`server-core`.
- השוואת מודלי הזיכרון של `misparim`, `targilim`, `parabula-next`, `TALMID` ו־`microsoft-forms`.
- מיפוי CI, permissions ו־merge gates בפרויקטי הליבה.
- inventory מקומי של Claude Code: גרסה, user settings, Plugins, Skills, Hooks, MCP ו־auto memory.
- מדידת context/tokens ממשימות אמיתיות.
- רק לאחר מכן: baseline, פיילוט הרחבה ותוכנית עבודה אישית גרסה 2.

## הצעד הבא
1. להשלים מחקר עומק רק בעשרת ריפו הליבה.
2. להפיק מטריצת השוואה אחת: זיכרון, Git, CI, preview, הרשאות, אוטומציה ו־privacy.
3. להכריע אילו דפוסים הופכים לתוכנית העבודה האישית של יניב.
4. לאחר מכן בלבד לעבור לפיילוט Skills/Plugins ולתוכנית הסופית.
