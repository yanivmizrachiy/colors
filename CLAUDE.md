# CLAUDE.md — קלוט-קוד

> שער כניסה קצר. אין להעמיס כאן היסטוריה או מחקר מפורט.

## משימת־העל
לנהל את המחקר, המדידה והשיפור של שיטת העבודה של יניב עם Claude Code: מהירות, איכות, אמינות, בטיחות, context, Git, בדיקות, פריסה והמשכיות.

## מצב מחייב
המחקר והתוכנית לגרסה 1 הושלמו. השלב הפעיל הוא **פיילוט מדיד**:
- `misparim/main` נשאר baseline ללא שינוי.
- מועמד שינוי קיים ב־`misparim#1` אך אינו ממוזג.
- אין לטעון לשיפור לפני שלוש מדידות baseline ושלוש מדידות post-change.

## כללי חובה
1. בריפו המרכזי מותר לחקור, לתעד, לסנכרן מצב ולנהל את הפיילוט.
2. שינוי בריפו יעד מותר רק בהיקף מאושר, בענף וב־PR, עם rollback וללא merge אוטומטי.
3. אין לשנות קוד מוצר, לפרוס, למזג או למחוק בריפו יעד בלי אישור מתאים לשלב.
4. אין לשמור secrets, credentials, `.env`, cookies, נתוני תלמידים או תמלילים לא מסוננים.
5. הפרד בין עובדה, הסקה, השערה, החלטה, מועמד שינוי ומצב פעיל.
6. לכל עובדה מחקרית יש מקור, תאריך ורמת ודאות לפי `docs/EVIDENCE_MODEL.md`.
7. `CURRENT_STATE.md` הוא מקור המצב החי; אין לשכפל state זמני במסמכי מחקר.
8. בסיום כל עבודה עדכן את המצב, Issue הביצוע והצעד הבא.

## מצב הפיילוט
- baseline: `misparim/main` ב־SHA `ce020c8fcf026f0ba1909f5844a49ab7ac0aafe3`.
- מועמד שינוי: `pilot/claude-memory-v1` ב־SHA `4c03a1cc02ebe72856a320ec7d71092e62d38bec`.
- PR: `yanivmizrachiy/misparim#1` — פתוח, mergeable, Vercel success, לא ממוזג.
- הצעד הבא: שלוש משימות baseline ב־sessions חדשים ובאותו מודל/effort להשוואה.

## סדר קריאה
- תמיד: `CURRENT_STATE.md`, `PROJECT_GOALS.md`.
- ביקורת עדכנית: `docs/REPOSITORY_AUDIT_2026-07-15.md`.
- פיילוט: `docs/PILOT_MISPARIM_READINESS.md`, `templates/BASELINE_SESSION_RECORD.md`, Issue #12.
- תוכנית אישית: `docs/PERSONAL_WORK_SYSTEM_PLAN.md`.
- החלטות: `DECISIONS.md`.
- Roadmap: `docs/ROADMAP.md`.
- מחקר ריפו או דפוס: המסמך המתאים תחת `docs/projects/` או `research/` בלבד לפי צורך.

## הגדרת השלמה
עבודת פיילוט שלמה רק כאשר:
- מצב הריפו המרכזי תואם לריפו היעד.
- המדדים נשמרו ללא מידע רגיש.
- לא בוצע merge לפני השער שנקבע.
- הופרדו local pass, preview/environment, live verification ו־release readiness.
- הצעד הבא וה־rollback ברורים.
