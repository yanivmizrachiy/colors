# תוכנית העבודה של קלוטקורד

> מפת שלבים בלבד. מקור הכללים המחייב היחיד הוא `CLAUDE.md`; המצב החי נמצא ב־`CURRENT_STATE.md`.

## מצב
המחקר והתוכנית האישית לגרסה 1 הושלמו. קלוטקורד נמצא כעת בשלושה מסלולים מסודרים:
1. ניקוי והקשחת הריפו המרכזי.
2. baseline מול מועמד שינוי מוכן ב־`misparim`.
3. מחקר ודירוג הרחבות לפני פיילוט של Plugin או Skill אחד.

## שלב 0 — תשתית קלוטקורד
- [x] בחירת ריפו מרכזי.
- [x] גיבוי מלא לתוכן `colors` הישן.
- [x] הגדרת פרטיות ומודל ראיות.
- [x] בניית אינדקס, מטריצה ורשם הזדמנויות.
- [x] קביעת שם המיזם: **קלוטקורד**.
- [x] יצירת `CLAUDE.md` כדף כללים מחייב יחיד.
- [x] סימון `DECISIONS.md` כהיסטוריית החלטות בלבד.
- [x] הסרת פרומפט ההפעלה הישן של מחשב הסלון.
- [x] הסרת מסמך כללי אבטחה כפול.
- [ ] Rename של ה־slug מ־`colors` ל־`klotkord` דרך GitHub.
- [ ] החלטה אם להפוך את הריפו ל־Private.

## שלב 1 — מחקר העבודה האמיתית
- [x] `mathmath` — זיכרון קצר, PRs ובדיקות מול פערי runtime/Vercel.
- [x] `parabula-next` — מקור כללים יחיד, thin pointers ו־CI רחב.
- [x] `misparim` — זיכרון מדורג, כפילויות ועלות טעינה.
- [x] `maagar` — guards, dry-run, hashes ו־browser QA.
- [x] `microsoft-forms` — research-first, acceptance tests ואוטונומיה.
- [x] `www` — truth gates, release readiness ועומס STATE.
- [x] `bbb` — הוראות מקומיות לפי תת־פרויקט.
- [x] הפקת דפוסים חוצי־פרויקטים.
- [x] זיהוי מקורות בזבוז: context קבוע, state כפול, agent teams, PRs גדולים ו־CI כפול.

## שלב 2 — מחקר Claude Code עדכני
- [x] Memory, CLAUDE.md, auto memory ו־path rules.
- [x] Skills ו־skill listing cost.
- [x] Hooks ו־PreToolUse.
- [x] Permissions ו־PowerShell rules.
- [x] Sandbox והבדלי Windows/WSL2.
- [x] Subagents ו־Agent Teams.
- [x] MCP, Tool Search ו־CLI.
- [x] Plugins, official/community marketplaces ו־LSP.
- [x] Checkpoints, rewind ו־sessions.
- [x] Scheduled tasks ואוטומציה.
- [x] `/usage`, `/context`, `/clear`, `/compact`, מודלים ו־effort.
- [x] רשם מועמדי הרחבות: `research/EXTENSION_CANDIDATES.md`.
- [ ] inventory מקומי מסונן של גרסה ורכיבים מותקנים בפועל.
- [ ] אימות שם ודרישות ה־Plugin הרשמי ל־TypeScript LSP.

## שלב 3 — תוכנית אישית גרסה 1
- [x] ארכיטקטורת זיכרון גלובלית ופרויקטלית.
- [x] סיווג משימות קטנות/בינוניות/גדולות.
- [x] מדיניות Sonnet/Opus/effort.
- [x] כללי context, clear, compact ו־handoff.
- [x] מדיניות Subagents ו־MCP.
- [x] Git/PR/deploy workflow.
- [x] מודל אימות: static → build → interaction → environment → live.
- [x] בחירת `misparim` כמועמד פיילוט.
- [ ] עדכון לתוכנית סופית גרסה 2 לאחר inventory, baseline ופיילוט הרחבה.

## שלב 4 — פיילוט הזיכרון ב־`misparim`
### A — Baseline על המצב הישן
- [ ] לבצע P1: משימה קטנה עם preview.
- [ ] לבצע P2: משימה בינונית עם typecheck/build/preview.
- [ ] לבצע P3: חקירת bug/repository, read-only תחילה.
- [ ] להתחיל כל משימה ב־session חדש.
- [ ] להשתמש באותו model/effort במשימת ההשוואה המקבילה.
- [ ] לתעד זמן, `/usage`/context, קבצים, תיקונים ובדיקות.

### B — מועמד שינוי מוכן, לא ממוזג
- [x] ענף `pilot/claude-memory-v1` ו־PR #1.
- [x] `CURRENT_STATE` קצר.
- [x] צמצום כפילויות.
- [x] שני path rules בלבד.
- [x] אין שינוי קוד מוצר.
- [x] rollback באמצעות revert.
- [ ] review אחרון לאחר baseline.
- [ ] החלטת merge מפורשת.

### C — Post-change והשוואה
- [ ] שלוש משימות מקבילות לאחר merge מאושר.
- [ ] השוואת context/tokens, זמן, תיקונים, רגרסיות ומעורבות יניב.
- [ ] החלטה: keep, adjust או revert.

## שלב 5 — פיילוט הרחבה אחד
השלב מתחיל רק לאחר inventory ובחירת בעיה מדידה.

### סדר מועמדים
1. [ ] TypeScript LSP Plugin רשמי בפרויקט אחד.
2. [ ] Permission profile בטוח ומצומצם.
3. [ ] Skill ידני אחד: `safe-change` או `ui-verify`.
4. [ ] Subagent/Skill `repo-audit` read-only.
5. [ ] Skill `handoff`.

### תנאי פיילוט
- [ ] baseline לפני התקנה.
- [ ] מקור ו־commit מאומתים.
- [ ] review של permissions, code ו־dependencies.
- [ ] מדד הצלחה ו־rollback.
- [ ] התקנה בפרויקט אחד בלבד.
- [ ] החלטת keep/remove לפני הרחבה.

## שלב 6 — הרחבה עתידית
- [ ] להתאים Tier לכל פרויקט.
- [ ] לבנות `math-rtl-verify` רק לאחר ראיות חוזרות.
- [ ] לשקול Hook קטן רק לאחר ש־permissions אינן מספיקות.
- [ ] לחבר MCP רק לחיבור שחוסך עבודה ידנית חוזרת.
- [ ] להגדיר audit חודשי read-only לרכיבים שלא היו בשימוש.
- [ ] להפיק דוח שיפור לאחר חודש שימוש.

## שערים שאסור לדלג עליהם
- אין התקנת bundle גדול לפני פיילוט צר.
- אין Agent Teams כברירת מחדל.
- אין Plugin קהילתי בלי source review ו־SHA.
- אין Skill עם side effects בהפעלה אוטומטית.
- אין טענת חיסכון בלי מדידה.
- אין merge ל־`misparim#1` לפני baseline, review ודיווח.

## מסמכי שליטה
- כללים: `CLAUDE.md`.
- מצב חי: `CURRENT_STATE.md`.
- מחקר רשמי: `docs/OFFICIAL_CLAUDE_CODE_FINDINGS.md`.
- מועמדי הרחבות: `research/EXTENSION_CANDIDATES.md`.
- פיילוט: `docs/PILOT_MISPARIM_READINESS.md` ו־Issue #12.
