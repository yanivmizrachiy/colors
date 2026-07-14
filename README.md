# קלוט-קוד

מרכז השליטה של יניב למחקר, תכנון ושיפור העבודה עם Claude Code.

## מצב נוכחי
מחקר ותוכנית עבודה אישית **גרסה 1 הושלמו**. עדיין לא מיושמים Skills, Hooks, Rules או שינויים בריפוים אחרים לפני אישור יניב ופיילוט מדיד.

## המסמכים החשובים ביותר
- `docs/YANIV_DAILY_GUIDE.md` — המדריך הקצר לעבודה יומיומית.
- `docs/PERSONAL_WORK_SYSTEM_PLAN.md` — התוכנית האישית המלאה.
- `docs/OFFICIAL_CLAUDE_CODE_FINDINGS.md` — ממצאים מהתיעוד הרשמי.
- `CURRENT_STATE.md` — מצב נוכחי והצעד הבא.
- `docs/ROADMAP.md` — מה הושלם ומה נשאר.

## דוחות הריפוים
- `docs/projects/mathmath.md`
- `docs/projects/parabula-next.md`
- `docs/projects/misparim.md`
- `docs/projects/maagar.md`
- `docs/projects/microsoft-forms.md`
- `docs/projects/www.md`
- `docs/projects/bbb.md`

## מרכזי המחקר
- `research/REPOSITORY_INDEX.md` — תמונת מצב של כל הריפוים.
- `research/CROSS_PROJECT_MATRIX.md` — הדפוסים שנמצאו.
- `research/OPPORTUNITY_REGISTER.md` — סדר העדיפויות לשיפורים עתידיים.
- `RESEARCH_LOG.md` — יומן המחקר.

## מתודולוגיה ובטיחות
- `CLAUDE.md` — שער הכניסה של הריפו.
- `docs/RESEARCH_PROGRAM.md` — תוכנית המחקר.
- `docs/EVIDENCE_MODEL.md` — עובדות, הסקות, השערות ורמות ודאות.
- `docs/SECURITY_AND_PRIVACY.md` — פרטיות ואיסוף בטוח.
- `docs/USER_INPUT_PLAN.md` — מידע מקומי שמותר לאסוף בעתיד.

## ההחלטה התכנונית
המערכת המומלצת אינה “Claude ענק שעושה הכול” ואינה “המון קובצי הוראות”. היא בנויה כך:
1. זיכרון גלובלי קצר.
2. `CLAUDE.md` קצר לכל פרויקט.
3. state קצר ונפרד.
4. rules לפי path.
5. בדיקות/guards לכללים דטרמיניסטיים.
6. Skill רק לתהליך שחזר.
7. Subagent רק למחקר מבודד.
8. Sonnet כברירת מחדל; Opus רק למשימות מורכבות/מסוכנות.
9. מדידה לפני הרחבה.

## גבול מחייב
- ריפוים אחרים משמשים לקריאה ומחקר בלבד במסגרת המיזם.
- אין לשמור secrets, תמלילים גולמיים או נתוני תלמידים.
- אין יישום לפני אישור ופיילוט עם rollback.

## גיבוי
התוכן המקורי של `colors` נשמר בענף `archive/colors-original-2026-07-14`.