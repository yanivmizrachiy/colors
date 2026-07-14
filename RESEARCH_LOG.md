# יומן מחקר

## 2026-07-14 — הקמת הריפו המרכזי
- הוגדרו מטרות המיזם וגבולות קריאה בלבד לריפוים אחרים.
- נבחר `colors` כריפו המרכזי.
- נוצר גיבוי מלא של התוכן הקודם בענף `archive/colors-original-2026-07-14`.
- הריפו הוסב למרכז קלוט-קוד דרך PR #2.

## 2026-07-14 — ארגון תוכנית המחקר
- נבנו תוכנית מחקר עמוקה, מודל ראיות ורמות ודאות.
- נוצרו מודל דירוג ריפוים, תבנית דוח, אינדקס מחקר, מטריצת דפוסים ורשם הזדמנויות.
- נכתבו תוכנית קבלת מידע מסונן ושלד לתוכנית העבודה האישית.
- כל המערכת מוזגה דרך PR #4.

## 2026-07-14 — דוח `mathmath`
- נבדקו `CLAUDE.md`, README, package scripts, PRs, commits ו־Vercel previews.
- נמצא תהליך Git/PR ובדיקות מקומיות חזק.
- נמצא רצף תיקוני המשך לאחר פיצ'ר המורים הפרטיים: form persistence, password/autofill, rate-limit ו־storage ב־Vercel.
- נמצאו פערים בין local build לבין serverless/runtime אמיתי.
- המסקנה נשארה מחקרית; לא הוחלט על יישום.

## 2026-07-14 — דוח `parabula-next`
- נבדקו CLAUDE מלא, package, agents/commands, launch, workflows, 30 PRs ו־workflow run של PR #37.
- נמצא מעבר היסטורי משכבת commands/agents רחבה למקור כללים יחיד עם pointers דקים.
- נמצא validator שאוכף מקור הוראות יחיד ומונע state/paths/command lists מיושנים.
- workflow PR כולל build, browser, interactions ושמונה all-pages shards; עשרה jobs מבצעים install/build.
- נמצא כיסוי mobile/A4/PWA חזק מאוד לצד עלות CI גבוהה ו־PRs של 63–82 commits.
- PR audit שניפח 103 קבצים נסגר והוחלף בגישת artifact-only.
- נפתחו שאלות מחקר על context, path-aware CI, artifact reuse, PR slicing ו־stale PRs.

## מצב כולל
נחקרו בסריקה ראשונית גם `misparim`, `maagar`, `microsoft-forms`, `www` ו־`bbb`. אין לבחור ארכיטקטורה סופית לפני השלמת הדוחות והאיסוף המקומי.