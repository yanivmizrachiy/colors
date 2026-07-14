# מצב נוכחי — קלוטקורד

עודכן: 2026-07-15

## זהות ותשתית
- שם המיזם: **קלוטקורד**.
- כתובת הריפו הנוכחית: `yanivmizrachiy/colors`.
- ענף הפעילות הראשי: `main`.
- התוכן המקורי של `colors` נשמר בענף `archive/colors-original-2026-07-14`.
- הריפו ציבורי; אין לשמור בו מידע אישי, secrets או נתוני תלמידים.
- Rename של ה־slug ל־`klotkord` ושינוי Visibility דורשים פעולה דרך הגדרות GitHub או כלי מתאים.

## מבנה הכללים והידע
- `CLAUDE.md` הוא דף הכללים המחייב היחיד.
- `CURRENT_STATE.md` הוא מקור המצב החי.
- `DECISIONS.md` הוא היסטוריית החלטות בלבד.
- `docs/` ו־`research/` הם מחקר, ראיות ותוכניות בלבד.
- פרומפט ההפעלה הישן של מחשב הסלון הוסר.
- מסמך כללי אבטחה כפול הוסר לאחר ריכוז החובות ב־`CLAUDE.md`.

## מה הושלם בקלוטקורד
- דוחות מחקר על שבעה ריפוים.
- תוכנית עבודה אישית גרסה 1 ומדריך יומי.
- חבילת פיילוט מדידה ל־`misparim`.
- תבנית task brief ותבנית session measurement.
- מחקר רשמי מעודכן על Memory, Rules, Skills, Hooks, Subagents, Agent Teams, MCP, Plugins, permissions, sandbox, checkpoints, scheduled tasks, context ועלויות.
- רשם מועמדי הרחבות מותאם לעבודה של יניב: `research/EXTENSION_CANDIDATES.md`.
- דף כללים יחיד ומקצועי בשם קלוטקורד.

## מצב `misparim`
- `misparim/main` נשאר בסיס baseline ב־SHA `ce020c8fcf026f0ba1909f5844a49ab7ac0aafe3`.
- מועמד שינוי: `pilot/claude-memory-v1` ב־SHA `4c03a1cc02ebe72856a320ec7d71092e62d38bec`.
- PR: `yanivmizrachiy/misparim#1`.
- ה־PR פתוח, mergeable ו־Vercel success.
- 11 קובצי זיכרון/Markdown בלבד השתנו; אין שינוי קוד מוצר.
- ה־PR לא מוזג.

## מסקנות ביניים על הרחבות
- TypeScript LSP רשמי הוא מועמד בעדיפות גבוהה לפיילוט.
- Permissions מצומצמות קודמות ל־Hook כאשר הן מספיקות.
- Skills ראשונים אפשריים: `safe-change`, `ui-verify`, `repo-audit`, `handoff`.
- Subagent מתאים למחקר read-only ורועש.
- Agent Teams אינם ברירת מחדל בגלל עלות ותיאום.
- MCP נשמר רק לחיבור שמחליף עבודה ידנית חוזרת; `gh` CLI מועדף כאשר הוא מספיק.
- אין התקנת Skill pack או Plugin קהילתי לפני review של source, SHA, הרשאות, context ו־rollback.

## מה עדיין חסר
- שלוש מדידות baseline אמיתיות ב־`misparim`.
- inventory מקומי מסונן: גרסת Claude Code ושמות Skills, Plugins, Hooks, MCP ו־settings פעילים.
- אימות שם ה־Plugin הרשמי המדויק ל־TypeScript LSP ופיילוט בפרויקט אחד.
- בחירת Skill ראשון לפי חיכוך שנמדד בפועל.
- שלוש מדידות post-change לאחר החלטת merge.
- תוכנית עבודה סופית גרסה 2 לאחר השלמת המחקר והמדידות.
- Rename של הריפו ל־`klotkord` דרך GitHub.

## הצעד הבא
1. להשלים ביקורת diff של ניקוי קלוטקורד ולמזג אותה.
2. לבצע inventory מקומי בטוח וקצר.
3. לבחור שלוש משימות baseline אמיתיות.
4. רק לאחר המדידות לבחור פיילוט הרחבה אחד.
