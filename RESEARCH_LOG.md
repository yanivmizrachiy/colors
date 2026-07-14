# יומן מחקר

## 2026-07-14 — הקמת הריפו המרכזי
- הוגדרו מטרות המיזם וגבולות קריאה בלבד לריפוים אחרים.
- נבחר `colors` כריפו המרכזי.
- נוצר גיבוי מלא של התוכן הקודם בענף `archive/colors-original-2026-07-14`.
- הריפו הוסב למרכז **קלוטקורד** דרך PR #2.

## 2026-07-14 — ארגון תוכנית המחקר
- נבנו תוכנית מחקר עמוקה, מודל ראיות ורמות ודאות.
- נוצרו מודל דירוג ריפוים, תבנית דוח, אינדקס מחקר, מטריצת דפוסים ורשם הזדמנויות.
- נכתבו תוכנית קבלת מידע מסונן ושלד לתוכנית העבודה האישית.
- המערכת מוזגה דרך PR #4.

## 2026-07-14 — `mathmath`
- נבדקו CLAUDE, README, package scripts, PRs, commits ו־Vercel previews.
- נמצא תהליך Git/PR ובדיקות מקומיות חזק.
- נמצא רצף תיקוני המשך לאחר פיצ'ר המורים הפרטיים: form persistence, password/autofill, rate-limit ו־storage ב־Vercel.
- נמצאו פערים בין local build לבין browser, providers ו־serverless runtime.

## 2026-07-14 — `parabula-next`
- נבדקו CLAUDE מלא, package, agents/commands, launch, workflows, PRs ו־workflow run.
- נמצא מעבר משכבת commands/agents רחבה למקור כללים יחיד עם pointers דקים.
- נמצא validator שאוכף מקור הוראות יחיד ומונע state/paths/command lists מיושנים.
- נמצא כיסוי mobile/A4/PWA חזק מאוד לצד context ו־CI כבדים, עשרה builds ב־PR ו־PRs גדולים.
- audit גדול הוחלף בגישת artifact-only.

## 2026-07-14 — `misparim`
- נבדקו CLAUDE וכל שכבות `.ai-memory`: INDEX, CURRENT_STATE, USER_RULES, CHANGE_PROTOCOL, TASKS, REQUIREMENTS, DECISIONS ו־PROMPTS.
- נמצא מבנה מדורג טוב עקרונית, אך סדר הקריאה הקבוע טוען כמה קבצים עם הוראות חופפות.
- `CURRENT_STATE` ו־`REQUIREMENTS` מערבבים state, ארכיטקטורה, domains והיסטוריה.
- `TASKS` כולל היסטוריית ביצוע ו־`PROMPTS` חוזר על מידע שכבר נטען.
- הוגדר כפרויקט הפיילוט המומלץ, בכפוף לאישור יניב ול־baseline.

## 2026-07-14 — `maagar`
- נבדקו AGENTS, RULES, ingestion scripts, validators, browser QA ו־PRs.
- dry-run, hashes, duplicate detection ו־browser QA נמצאו כדגם האכיפה הטוב ביותר.
- נמצא שגם validators, STATE reports ו־audit outputs יכולים להתיישן ולדרוש ניקוי.
- נרשם כלל: דרישה דטרמיניסטית עוברת לבדיקה או guard, לא לעוד טקסט בזיכרון.

## 2026-07-14 — `microsoft-forms`
- נבדקה חבילת bootstrap שכללה facts, requirements, execution plan, acceptance tests ו־privacy guardrails.
- research-first נמצא יעיל לפרויקטי אינטגרציה חדשים.
- הסיכון המרכזי: overplanning או עצמאות ארוכה לפני feasibility/live checkpoint.

## 2026-07-14 — `www`
- נבדקו CLAUDE, PROJECT_RULES והיסטוריית PRs רחבה.
- נמצא מודל truth discipline חזק: implemented, tested, live verified, blocked ו־Teacher Release.
- נמצא עומס משמעותי של STATE, evidence, audits ו־PR fragmentation.
- נקבע ש־PASS של audit אינו שווה product readiness.

## 2026-07-14 — `bbb`
- נבדקו הוראות ברמת root וברמת `web/`.
- נמצא דגם מתאים לריפו רב־שכבתי: הוראות מקומיות קרובות לתת־הפרויקט.
- נרשם סיכון של הצטברות או סתירה בין root instructions להוראות מקומיות.

## 2026-07-14 — תיעוד Claude Code הרשמי
- נחקרו Memory, CLAUDE.md, auto memory, path-scoped rules, Hooks, Subagents, MCP, Tool Search ועלויות.
- נקבע יעד של CLAUDE קצר, rules לפי path, Hook רק לכלל דטרמיניסטי ו־Subagent רק למחקר מבודד.
- נקבעו Sonnet כברירת מחדל ו־Opus רק לארכיטקטורה, שורש, אבטחה או סיכון גבוה.
- נקבעו `/usage`, `/clear` ו־`/compact` ככלי ניהול context מרכזיים.

## 2026-07-14 — תוכנית אישית גרסה 1
- הוחלף שלד התוכנית בתוכנית עבודה מלאה ומעשית.
- נוספו מבנה זיכרון, סיווג משימות, workflow, מודלים, context, Git/PR, בדיקות מדורגות, MCP, Subagents ומועמדים עתידיים ל־Hooks/Skills.
- נוסף מדריך יומי קצר ליניב.
- עודכנו README, CURRENT_STATE, ROADMAP, אינדקס הריפוים, המטריצה ורשם ההזדמנויות.
- המחקר והתכנון הושלמו לגרסה 1.

## 2026-07-14 — חבילת מוכנות לפיילוט
- נוספו מסמך מוכנות ל־`misparim`, תבנית task brief, תבנית baseline וסדר עדיפויות ליישום.
- הוגדרו שלוש קטגוריות משימה, תנאי הצלחה, תנאי עצירה ו־rollback.
- נפתח Issue #12 כמסלול ביצוע.

## 2026-07-14 — מועמד שינוי ב־`misparim`
- נוצר הענף `pilot/claude-memory-v1` ונפתח PR #1.
- השינוי כולל 11 קובצי Markdown/זיכרון בלבד ואינו משנה קוד מוצר.
- `misparim/main` נשאר ב־SHA `ce020c8fcf026f0ba1909f5844a49ab7ac0aafe3` ומשמש baseline.
- מועמד השינוי נמצא ב־SHA `4c03a1cc02ebe72856a320ec7d71092e62d38bec`.
- Vercel עבר בהצלחה; ה־PR פתוח וניתן למיזוג אך לא מוזג.

## 2026-07-15 — ביקורת מצב וסנכרון מרכז השליטה
- נמצא state drift: הריפו המרכזי עדיין תיאר את שלב B כחסום אף שמועמד השינוי כבר הוכן.
- נקבע שהניסוי עדיין תקף משום ש־`misparim/main` לא השתנה.
- נוסף `docs/REPOSITORY_AUDIT_2026-07-15.md`.
- עודכנו README, CLAUDE, CURRENT_STATE, ROADMAP ו־DECISIONS למצב הפעיל.
- הצעד הבא נקבע: שלוש משימות baseline על ה־SHA הישן; אין merge של PR #1 לפני המדידה והדיווח.

## 2026-07-15 — קלוטקורד: מקור כללים יחיד וניקוי
- שם המיזם נקבע כ־**קלוטקורד** בכל המסמכים הפעילים.
- `CLAUDE.md` נבנה מחדש כדף הכללים המחייב היחיד.
- כללי אבטחה, Git, context, Skills, Hooks, Plugins, MCP ואימות רוכזו בו.
- הוסר פרומפט ההפעלה הישן של מחשב הסלון.
- הוסר מסמך אבטחה כפול לאחר העברת החובות לדף הכללים היחיד.
- נפתח מחקר עדכני על הרחבות Claude Code לפני התקנה או בניית תוכנית העבודה הסופית.
