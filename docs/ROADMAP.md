# תוכנית העבודה של קלוטקורד

> מפת שלבים בלבד. מקור הכללים המחייב היחיד הוא `CLAUDE.md`; המצב החי נמצא ב־`CURRENT_STATE.md`; התוכנית המלאה נמצאת ב־`docs/PERSONAL_WORK_SYSTEM_PLAN.md`.

## מצב
המחקר המרכזי ותוכנית העבודה האישית גרסה 2 הושלמו. קלוטקורד נמצא בשלב היישום המדורג: כלי Inventory מוכן ומאומת, מפרט `capture-requirement` מוכן, אך שום Skill או הגדרה מקומית עדיין לא הותקנו.

## שלב 0 — תשתית וניקוי
- [x] בחירת ריפו מרכזי.
- [x] גיבוי מלא לתוכן `colors` הישן.
- [x] קביעת שם המיזם: **קלוטקורד**.
- [x] יצירת `CLAUDE.md` כדף כללים יחיד.
- [x] הפרדת כללים, מצב, החלטות, מחקר ותוכנית.
- [x] הסרת מסמכים כפולים וישנים.
- [x] יצירת תוכנית עבודה אישית גרסה 2.
- [x] יצירת דרישות מערכת הזיכרון ומסמך דפוסי העבודה.
- [x] עדכון המדריך היומי.
- [ ] Rename של ה־slug מ־`colors` ל־`klotkord`.
- [ ] החלטה אם להפוך את הריפו ל־Private כדי לאפשר זיכרון אישי מלא.

## שלב 1 — מחקר העבודה האמיתית
- [x] מחקר ריפו הליבה הגדולים והפעילים.
- [x] ניתוח commits, PRs, CI, state, rules, agents והרשאות.
- [x] זיהוי חוזקות וחיכוך.
- [x] מחקר רשמי של Memory, Skills, Hooks, Plugins, MCP, Subagents, Agent Teams, permissions, sandbox, sessions ועלויות.
- [x] דירוג מועמדי ההרחבות.
- [x] הגדרת זיכרון דרישות אישי כיעד המרכזי.

## שלב 2 — Inventory מקומי בטוח
### כלי
- [x] נוצר `scripts/Collect-ClaudeCodeInventory.ps1`.
- [x] נוספו הוראות ב־`docs/LOCAL_INVENTORY.md`.
- [x] parser והרצה אמיתית עברו ב־Windows GitHub Actions.
- [x] הכלי אינו קורא `~/.claude.json`, ערכי env, permission values, MCP URLs, transcripts או secrets.

### הרצה על מחשב יניב
- [ ] להריץ את הכלי ולבדוק את קובצי JSON/Markdown.
- [ ] לתעד גרסת Claude Code.
- [ ] לתעד user settings מסוננים.
- [ ] לתעד auto memory וקבצים שנטענים.
- [ ] לתעד שמות Skills, Plugins, Hooks ו־MCP פעילים.
- [ ] לתעד permissions מסוג allow / ask / deny.
- [ ] לבדוק Windows מול WSL2 לצורך sandbox.
- [ ] לבדוק גודל `CLAUDE.md`, skill listing ו־context פתיחה.
- [ ] לבצע ידנית `/status`, `/context`, `/memory`, `/plugin`, `/mcp`, `/doctor` ו־`/usage` כסיכום מסונן.

## שלב 3 — Baseline
שלוש משימות אמיתיות לפני שינוי סביבת העבודה:
- [ ] P1 — שינוי UI קטן עם preview.
- [ ] P2 — שינוי קוד בינוני עם typecheck/build/preview.
- [ ] P3 — audit read-only.
- [ ] session חדש לכל משימה.
- [ ] אותו model ו־effort במשימות ההשוואה.
- [ ] מדידת `/usage`, `/context`, זמן, קבצים שנקראו, תיקונים ורגרסיות.
- [ ] שמירת תוצאות מסוכמות בלבד, ללא transcript.

## שלב 4 — פיילוט הזיכרון ב־`misparim`
### A — Baseline ישן
- [ ] לבצע את שלוש משימות ה־baseline על `misparim/main` ב־SHA הקבוע.
- [ ] לא להשתמש בענף מועמד השינוי במהלך המדידה.

### B — מועמד שינוי מוכן
- [x] ענף `pilot/claude-memory-v1` ו־PR #1.
- [x] `CURRENT_STATE` קצר.
- [x] צמצום כפילויות.
- [x] שני path rules בלבד.
- [x] אין שינוי קוד מוצר.
- [x] rollback באמצעות revert.
- [ ] review אחרון לאחר baseline.
- [ ] החלטת merge מפורשת.

### C — Post-change
- [ ] שלוש משימות מקבילות לאחר merge מאושר.
- [ ] השוואת context/tokens, זמן, תיקונים, רגרסיות ומעורבות יניב.
- [ ] החלטה: keep, adjust או revert.

## שלב 5 — Skill ראשון: `capture-requirement`
### תכנון
- [x] נכתב מפרט מלא: `docs/skills/CAPTURE_REQUIREMENT_SPEC.md`.
- [x] הוגדר workflow דו־שלבי: ניתוח read-only ואז כתיבה נפרדת דרך `safe-change`.
- [x] הוגדרו 20 תרחישי קבלה.
- [x] נוצר `DRAFT.md` לא־פעיל שאינו יכול להיטען כ־Skill.
- [x] הוגדר ש־`allowed-tools` אינו גבול בטיחות יחיד.

### לפני התקנה
- [ ] להשלים Inventory ו־Baseline.
- [ ] לאמת שמות כלים ו־permissions בגרסה המקומית.
- [ ] להפוך את הטיוטה ל־`SKILL.md` עם `disable-model-invocation: true` ו־`disallowed-tools` מתאימים.
- [ ] לקבל אישור יניב לפורמט הפלט.

### פיילוט
- [ ] להריץ 20 תרחישי קבלה.
- [ ] בטיחות: A05, A10, A12 ו־A15 עוברים ב־100%.
- [ ] לפחות 18 מתוך 20 תרחישים עוברים ללא תיקון.
- [ ] אפס כתיבות, shell או חשיפת מידע רגיש.
- [ ] ממוצע עד 5 קבצים לחיפוש.
- [ ] החלטה: keep / adjust / remove.

## שלב 6 — בטיחות ושינוי נכון
לפי החיכוך שנמדד:
- [ ] פיילוט `safe-change` ידני; או
- [ ] Permission profile מצומצם.

### Permission profile
- [ ] Deny ל־secrets, credentials, force push, reset/clean ומחיקה רחבה.
- [ ] Allow ל־Git read, tests/typecheck/build ידועים וקריאה לא־רגישה.
- [ ] Ask ל־push, merge, deploy, DB, auth ופעולות system/device.
- [ ] הסרת הרשאות merge רחבות שאינן מוצדקות.

### Hook
- [ ] נשקל רק אם permissions או tests אינם מספיקים.
- [ ] Hook קטן, testable וללא build כבד.

## שלב 7 — פיילוטי יעילות וכלים
### TypeScript LSP
- [ ] אימות Plugin רשמי, source, dependencies ויכולת הסרה.
- [ ] התקנה בפרויקט TypeScript אחד בלבד.
- [ ] השוואת references, שגיאות, זמן וקבצים שנקראו.

### `ui-verify`
- [ ] פיילוט בפרויקט אחד עם RTL/A4/PDF.
- [ ] preview, viewports, screenshots, console/network ו־clipping.
- [ ] דיווח evidence ומה לא אומת.

### `repo-audit`
- [ ] Subagent/Skill read-only למחקר רועש.
- [ ] ללא edits או push.

## שלב 8 — Skills נוספים לפי צורך מוכח
- [ ] `handoff` למעבר בין sessions ומחשבים.
- [ ] `ingest-real-files` ל־PDF/DOCX עם dry-run ו־hashes.
- [ ] `math-rtl-verify` רק לאחר צורך חוזר בכמה פרויקטים.
- [ ] MCP מצומצם רק לחיבור שמחליף עבודה ידנית חוזרת.

## שלב 9 — הרחבה לפי Tier
- [ ] Tier A — פרויקט קטן: `CLAUDE.md` קצר ובדיקות בסיסיות.
- [ ] Tier B — מוצר פעיל: state חי, Rules תחומיים, preview ו־Skill מצומצם.
- [ ] Tier C — מערכת רגישה: truth gates, draft PR, permissions, evidence חי ו־High-Risk Lane.
- [ ] כל רכיב שהוכח עובר לריפו נוסף אחד בלבד בכל פעם.

## שלב 10 — ביקורת חודשית
- [ ] גרסת Claude Code.
- [ ] Skills, Plugins, Hooks ו־MCP פעילים.
- [ ] רכיבים שלא היו בשימוש.
- [ ] גודל `CLAUDE.md`, auto memory ו־skill listing.
- [ ] דרישות כפולות או סותרות.
- [ ] state מיושן ומידע רגיש.
- [ ] הצעת הסרה או עדכון בלבד—not שינוי אוטומטי.

## שערים שאסור לדלג עליהם
- אין התקנת bundle גדול לפני פיילוט צר.
- אין Agent Teams כברירת מחדל.
- אין Plugin קהילתי בלי source review ו־SHA.
- אין Skill עם side effects בהפעלה אוטומטית.
- אין טענת חיסכון בלי baseline.
- אין merge ל־`misparim#1` לפני baseline, review ודיווח.
- אין workflow מתוזמן שמשכתב כללים או דוחף קוד ל־`main`.
- אין מידע רגיש בזיכרון ציבורי.

## מדדי הצלחה לאחר חודש
- פחות דרישות שיניב מסביר מחדש.
- אפס דרישה קריטית שנשכחה בפיילוט.
- אפס כפילות חדשה בזיכרון.
- ירידה של 20% בזמן פתיחה/הבנה או בשימוש, או שיפור איכות ברור באותה עלות.
- פחות commits, PRs ותיקוני המשך למשימה.
- פחות state מיושן ומיזוגים ללא evidence.
- אפס מידע רגיש חדש ב־Git ציבורי.
- כל Skill ניתן להסרה ללא פגיעה בפרויקט.

## מסמכי שליטה
- כללים: `CLAUDE.md`.
- מצב חי: `CURRENT_STATE.md`.
- תוכנית מלאה: `docs/PERSONAL_WORK_SYSTEM_PLAN.md`.
- מדריך יומי: `docs/YANIV_DAILY_GUIDE.md`.
- Inventory: `docs/LOCAL_INVENTORY.md`.
- מחקר רשמי: `docs/OFFICIAL_CLAUDE_CODE_FINDINGS.md`.
- מערכת זיכרון: `research/MEMORY_SYSTEM_REQUIREMENTS.md`.
- דפוסי עבודה: `research/CLAUDE_CODE_WORK_PATTERNS.md`.
- מועמדי הרחבות: `research/EXTENSION_CANDIDATES.md`.
- מפרט Skill ראשון: `docs/skills/CAPTURE_REQUIREMENT_SPEC.md`.
- מבחני קבלה: `docs/skills/CAPTURE_REQUIREMENT_ACCEPTANCE.md`.
- פיילוט `misparim`: `docs/PILOT_MISPARIM_READINESS.md` ו־Issue #12.
