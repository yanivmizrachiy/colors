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

## ארבעת צירי קלוטקורד
1. **זיכרון דרישות אישי ומתמשך** — Claude לומד, מסווג ומפעיל דרישות מאושרות בלי כפילויות.
2. **חיסכון בטוקנים וב-context** — טעינה לפי משימה, session נקי, Skills/Rules ממוקדים ומדידה אמיתית.
3. **עבודה קצרה, נכונה וחכמה** — מסלולי Fast, Standard, High-risk ו-Research.
4. **Skills ואוטומציות מועילים** — רק לאחר צורך מוכח, review, פיילוט, מדד הצלחה ו-rollback.

מסמך הדרישות לתוכנית: `docs/SMART_WORK_SYSTEM_V2_REQUIREMENTS.md`.

## היקף המחקר
- בבעלות יניב מופו 42 ריפוזיטוריז: metadata, פעילות, commits, PRs, קובצי כניסה ודפוסי עבודה.
- המחקר העמוק מתמקד כעת בריפוים הגדולים, הפעילים והמשמעותיים ובמשפחות שבהן קיימת חפיפה או סיכון גבוה.
- פרויקטים משלימים משמשים לראיות על PowerShell, מכשירים, PDF/A4, scheduled automation, Lovable/AI Studio ו-state drift.

## ריפו ליבה למחקר עומק
1. `ma-assistant2`.
2. `server-core`.
3. `mathmath`.
4. `misparim`.
5. `parabula-next`.
6. `maagar`.
7. `www`.
8. `TALMID`.
9. `targilim`.
10. `microsoft-forms`.

## יעד מרכזי: זיכרון דרישות
- המערכת תפריד בין כלל, העדפה, חוזה מוצר, החלטה, state, משימה, ראיה, היסטוריה ומידע רגיש.
- דרישה חדשה לא תיכתב אוטומטית: Claude יזהה מועמד, יחפש כפילות או סתירה, יציע ניסוח ומיקום, ויעדכן רק לאחר אישור.
- הוראה חדשה שמבטלת קודמת תבצע supersede אמיתי ולא תישמר לצידה כגרסה פעילה נוספת.
- מסמך המחקר: `research/MEMORY_SYSTEM_REQUIREMENTS.md`.

## דפוסי העבודה שנחקרו
- commits ו-PRs של Claude בפרויקטי הליבה.
- merge מהיר מול PRs גדולים ורבי-commits.
- עבודה ישירות על `main` מול branch/PR.
- תיקון על תיקון ו-root-cause review.
- source-of-truth, STATE, rules, agents, commands ו-launch configurations.
- CI מקומי מול browser/live/PWA/device verification.
- עבודה בין Claude Code, GitHub, Lovable, AI Studio, hosting, Windows ו-Termux.
- scheduled workflows, push אוטומטי ו-generated artifacts.
- permissions רחבות מדי ופעולות merge/deploy.
- מסמך המחקר: `research/CLAUDE_CODE_WORK_PATTERNS.md`.

## ביקורת דפי הכללים הגדולים
נבנתה ביקורת אחידה לריפו הליבה:
- מקור סמכות מוצהר מול מקור סמכות בפועל.
- גודל ועלות טעינה.
- state/history/runtime בתוך rules.
- מידע אישי או עובדות זמניות.
- סתירות בתוך ריפו ובין ריפוים.
- validators, tests ו-CI שמאכפים את הכללים.
- permissions ושערי merge/deploy.

מסמך הביקורת: `research/LARGE_REPOSITORY_RULES_AUDIT.md`.

## ממצאי רוחב ראשוניים
- “דף כללים יחיד” הוא תנאי חשוב אך אינו מספיק; הוא עלול להפוך למסמך ענק שמכיל את כל הפרויקט.
- ריבוי מקורות הוראה יוצר סתירות ישירות גם בפרויקטים עם discipline גבוה.
- validator מבני יכול להוכיח שקיים מקור אחד, אך לא בהכרח freshness, consistency או correctness.
- הדגם החזק ביותר משלב: מקור סמכות קצר, pointers דקים, domain loading, guards דטרמיניסטיים ו-state שנגזר מחדש.
- ברוב ריפו הליבה אין עדיין Skills/Hooks native; העבודה נשענת בעיקר על Markdown, scripts ו-CI.
- נמצאו אוטומציות שכותבות rules/state או עושות push ישיר; הן ייבחנו מחדש לפי risk lane.
- אין להתקין Skill packs או Plugins לפני inventory, baseline ופיילוט צר.

## מצב `misparim`
- `misparim/main` נשאר בסיס baseline ב-SHA `ce020c8fcf026f0ba1909f5844a49ab7ac0aafe3`.
- מועמד שינוי: `pilot/claude-memory-v1` ב-SHA `4c03a1cc02ebe72856a320ec7d71092e62d38bec`.
- PR: `yanivmizrachiy/misparim#1`.
- ה-PR פתוח ולא מוזג.
- לא מתחילים את הפיילוט לפני השלמת מחקר הליבה והגדרת מדדים.

## מה עדיין חסר לפני התוכנית הסופית
- השלמת ההשוואה המלאה של עשרת ריפו הליבה.
- הכרעה על היחס בין מערכות שמכריזות במקביל שהן canonical.
- מיפוי CI, permissions, merge gates ואוטומציות כתיבה.
- inventory מקומי של Claude Code: גרסה, user settings, Plugins, Skills, Hooks, MCP ו-auto memory.
- מדידת context/tokens וזמן במשימות אמיתיות.
- בחירת Skill ראשון לפי חיכוך מדיד.
- ביקורת פרטיות מסוננת בריפוים הציבוריים.

## הצעד הבא
1. להשלים את מטריצת דפי הכללים של ריפו הליבה.
2. להכריע canonical/legacy/workspace/child במשפחות החופפות.
3. לבצע inventory מקומי בטוח של Claude Code.
4. לקבע baseline של זמן, context ותיקונים.
5. לאחר מכן לבנות את תוכנית העבודה הסופית ולקדם פיילוט Skill/Plugin אחד.
