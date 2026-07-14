# קלוטקורד

מרכז השליטה של יניב למחקר, תכנון, מדידה ושיפור העבודה האמיתית עם Claude Code.

> **מקור הכללים המחייב היחיד הוא `CLAUDE.md`.** כל שאר הקבצים בריפו הם מצב, מחקר, ראיות, תבניות או תוכניות.

## מטרת־העל
לבנות מערכת עבודה אישית שמקצרת זמן, מצמצמת טעויות ושימוש מיותר, ומשפרת איכות, Git, בדיקות, פריסה, פרטיות והמשכיות בין מחשבים ופרויקטים.

## זהות הריפו
- שם המיזם: **קלוטקורד**.
- כתובת הריפו הנוכחית: `yanivmizrachiy/colors`.
- שינוי ה־slug ל־`klotkord` דורש פעולת Rename בהגדרות GitHub; עד אז השם המקצועי במסמכים הוא קלוטקורד.
- התוכן המקורי של פרויקט `colors` נשמר בענף `archive/colors-original-2026-07-14`.

## מצב נוכחי
- מחקר ותוכנית עבודה אישית — הושלמו בגרסה 1.
- חבילת פיילוט מדידה — הושלמה.
- ב־`misparim` קיים מועמד שינוי מבודד ב־PR #1 בלבד.
- `misparim/main` נשאר baseline אמיתי ללא שינוי.
- PR #1 אינו ממוזג; השלב הפעיל הוא מדידות baseline לפני החלטת merge.
- במקביל מתבצע מחקר עדכני על Skills, Hooks, Plugins, MCP, Subagents, Agent Teams, permissions, sandboxing, context ואוטומציות.

## נקודת הכניסה
1. `CLAUDE.md` — דף הכללים היחיד.
2. `CURRENT_STATE.md` — המצב החי והצעד הבא.
3. `docs/ROADMAP.md` — מפת השלבים.
4. `docs/PERSONAL_WORK_SYSTEM_PLAN.md` — תוכנית העבודה האישית.
5. `docs/OFFICIAL_CLAUDE_CODE_FINDINGS.md` — מחקר רשמי ועדכני.
6. `docs/projects/` — מחקר העבודה בפועל בריפוים של יניב.
7. `research/OPPORTUNITY_REGISTER.md` — מועמדים עתידיים, לא הרשאות לביצוע.
8. `templates/CLAUDE_TASK_BRIEF.md` — תבנית משימה קצרה.
9. `templates/BASELINE_SESSION_RECORD.md` — תבנית מדידה.

## מבנה הידע
### מצב וניהול
- `CURRENT_STATE.md`
- `DECISIONS.md` — היסטוריית החלטות, לא דף כללים.
- `RESEARCH_LOG.md`
- `docs/ROADMAP.md`

### מחקר
- `docs/OFFICIAL_CLAUDE_CODE_FINDINGS.md`
- `docs/projects/`
- `research/REPOSITORY_INDEX.md`
- `research/CROSS_PROJECT_MATRIX.md`
- `research/OPPORTUNITY_REGISTER.md`
- `research/IMPLEMENTATION_PRIORITY.md`

### תוכנית וכלי עבודה
- `docs/PERSONAL_WORK_SYSTEM_PLAN.md`
- `docs/YANIV_DAILY_GUIDE.md`
- `docs/PILOT_MISPARIM_READINESS.md`
- `templates/CLAUDE_TASK_BRIEF.md`
- `templates/BASELINE_SESSION_RECORD.md`

## מצב הניסוי ב־`misparim`
- baseline: `main` ב־SHA `ce020c8fcf026f0ba1909f5844a49ab7ac0aafe3`.
- מועמד שינוי: `pilot/claude-memory-v1` ב־SHA `4c03a1cc02ebe72856a320ec7d71092e62d38bec`.
- PR: `yanivmizrachiy/misparim#1`.
- Vercel: success.
- אין merge לפני שלוש מדידות baseline, review ודיווח.
