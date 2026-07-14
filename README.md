# קלוט-קוד

מרכז השליטה של יניב למחקר, תכנון, מדידה ושיפור העבודה עם Claude Code.

## מטרת־העל
לבנות מערכת עבודה אישית שמקצרת זמן, מצמצמת טעויות ושימוש מיותר, ושומרת על איכות, Git, בדיקות, פריסה, פרטיות והמשכיות בין מחשבים.

## מצב נוכחי
- מחקר ותוכנית עבודה אישית — הושלמו בגרסה 1.
- חבילת פיילוט מדידה — הושלמה.
- ב־`misparim` נוצר מועמד שינוי מבודד בענף וב־PR #1 בלבד.
- `misparim/main` לא השתנה ולכן עדיין משמש baseline אמיתי.
- PR #1 לא מוזג; השלב הפעיל הוא שלוש מדידות baseline לפני החלטת merge.

## גבול מחייב
- התקדמות אוטומטית בריפו המרכזי מותרת לצורך מחקר, תיעוד, תכנון וסנכרון מצב.
- שינוי בריפו יעד נעשה רק במסגרת היקף מאושר, בענף וב־PR, עם rollback וללא merge אוטומטי.
- אין לשנות קוד מוצר, לפרוס או למזג בריפו אחר ללא אישור מתאים לשלב הפעולה.

## נקודת הכניסה המומלצת
1. `CURRENT_STATE.md` — המצב החי והצעד הבא.
2. `docs/REPOSITORY_AUDIT_2026-07-15.md` — מה נבנה ומה נמצא בביקורת.
3. `docs/YANIV_DAILY_GUIDE.md` — מדריך קצר לעבודה יומיומית.
4. `docs/PERSONAL_WORK_SYSTEM_PLAN.md` — התוכנית האישית המלאה.
5. `docs/PILOT_MISPARIM_READINESS.md` — תכנון הפיילוט והמדדים.
6. `templates/CLAUDE_TASK_BRIEF.md` — נוסח משימה קצר ונכון.
7. `templates/BASELINE_SESSION_RECORD.md` — תיעוד baseline והשוואה.
8. `research/IMPLEMENTATION_PRIORITY.md` — סדר העדיפויות ליישום.

## מפת ניווט
### כניסה וניהול
- `CLAUDE.md` — שער כניסה קצר ומחייב.
- `PROJECT_GOALS.md` — מטרות ומדדי הצלחה.
- `CURRENT_STATE.md` — מצב נוכחי קצר.
- `DECISIONS.md` — החלטות מחייבות.
- `RESEARCH_LOG.md` — יומן המחקר והפיילוט.
- `docs/ROADMAP.md` — שלבים שהושלמו והשלבים הבאים.

### מחקר
- `docs/OFFICIAL_CLAUDE_CODE_FINDINGS.md` — ממצאים מהתיעוד הרשמי.
- `docs/projects/` — דוחות עומק על הריפוים.
- `research/REPOSITORY_INDEX.md` — מצב כל ריפו.
- `research/CROSS_PROJECT_MATRIX.md` — דפוסים חוצי־פרויקטים.
- `research/OPPORTUNITY_REGISTER.md` — הזדמנויות עתידיות.

### מתודולוגיה ובטיחות
- `docs/RESEARCH_PROGRAM.md` — תוכנית המחקר.
- `docs/EVIDENCE_MODEL.md` — עובדות, הסקות ורמות ודאות.
- `docs/USER_INPUT_PLAN.md` — איסוף מידע בטוח ומסונן.
- `docs/SECURITY_AND_PRIVACY.md` — כללי פרטיות.

## המודל שנבחר
- זיכרון גלובלי קצר מאוד.
- `CLAUDE.md` קצר לכל פרויקט.
- `CURRENT_STATE.md` חי וקצר.
- Rules לפי path ותחום.
- מסמכי מוצר כבדים נקראים לפי צורך בלבד.
- Sonnet כברירת מחדל; Opus רק לתכנון/שורש/סיכון גבוה.
- Skill או Hook רק לאחר צורך שחזר ומדידה.
- בדיקות מדורגות: static → build → interaction → environment → live.

## מצב הניסוי ב־`misparim`
- baseline קבוע: `main` ב־SHA `ce020c8fcf026f0ba1909f5844a49ab7ac0aafe3`.
- מועמד שינוי: `pilot/claude-memory-v1` ב־SHA `4c03a1cc02ebe72856a320ec7d71092e62d38bec`.
- PR פתוח: `yanivmizrachiy/misparim#1`.
- Vercel: success.
- אין merge לפני שלוש מדידות baseline, review ודיווח.

## כללי איכות
1. מקור אמת אחד לכל סוג מידע.
2. לא טוענים לשיפור בלי baseline והשוואה.
3. לא בונים אוטומציה רק משום שהיא אפשרית.
4. כלל דטרמיניסטי עובר ל־test/guard לאחר שהצורך הוכח.
5. PASS טכני אינו שווה READY לפרסום.
6. אין מידע רגיש בריפו הציבורי.
7. שינוי בריפו יעד נשאר מבודד והפיך עד לאישור merge.

## גיבוי
התוכן המקורי של `colors` נשמר בענף `archive/colors-original-2026-07-14` ואין למחוק אותו.
