# מטריצת איכות דפי הכללים — ריפו הליבה

עודכן: 2026-07-15

> מסמך מחקר מסונן. הציונים הם כלי השוואה זמני בלבד, אינם הרשאה לשנות ריפו יעד ואינם מחליפים review של הקוד וה-runtime.

## סולם
- 5 — חזק מאוד, עקבי ומגובה באכיפה.
- 4 — טוב, עם חיכוך נקודתי.
- 3 — שימושי אך דורש שיפור מהותי.
- 2 — סיכון ממשי לכפילויות, staleness או הרשאות.
- 1 — מקור סמכות לא ברור או התנהגות מסוכנת.

## תחומי ההערכה
1. **סמכות** — האם ברור מהו מקור הכללים המחייב היחיד.
2. **חיסכון ב-context** — האם נטען רק מידע רלוונטי למשימה.
3. **Freshness** — האם state, versions, counts ו-runtime נגזרים מחדש ולא נשמרים ככללים.
4. **פרטיות** — האם מידע אישי, credentials ו-runtime רגיש נשמר מחוץ ל-Git ולהוראות.
5. **אכיפה** — validators, tests, permissions, CI או guards שמוודאים שהכללים מתקיימים.
6. **שערי סיכון** — האם merge/deploy/DB/auth/device actions מקבלים אישור ובדיקה מתאימים.

## טבלת ציונים

| ריפו | סמכות | Context | Freshness | פרטיות | אכיפה | שערי סיכון | מצב מחקרי |
|---|---:|---:|---:|---:|---:|---:|---|
| `parabula-next` | 5 | 2 | 5 | 4 | 5 | 4 | governance החזק ביותר; `CLAUDE.md` עדיין גדול |
| `ma-assistant2` | 5 | 2 | 4 | 5 | 5 | 4 | audit קשיח; קובץ יחיד עמוס וחפיפה קנונית חיצונית |
| `mathmath` | 5 | 5 | 4 | 4 | 4 | 2 | דף קצר; הרשאת merge רחבה וקצב merge מהיר |
| `maagar` | 5 | 3 | 3 | 4 | 5 | 4 | guards מצוינים; rules כוללים snapshot/schema/UI |
| `targilim` | 4 | 2 | 3 | 4 | 5 | 4 | מפת אמת ו-verifiers חזקים; rules כבדים והיסטוריים |
| `TALMID` | 5 | 3 | 2 | 1 | 4 | 2 | pointers טובים; מידע רגיש ו-auto-merge במערכת רגישה |
| `misparim` | 4 | 2 | 2 | 2 | 4 | 2 | זיכרון מדורג; 4–5 קריאות חובה ו-push ישיר ל-main |
| `microsoft-forms` | 4 | 1 | 2 | 3 | 4 | 3 | research/acceptance חזקים; facts ותוכנית נטענים בכבדות |
| `server-core` | 2 | 3 | 2 | 4 | 4 | 4 | rules ישנים סותרים וחפיפה עם מערכת שליטה אחרת |
| `www` | 1 | 1 | 1 | 3 | 5 | 4 | שלושה מקורות הוראה וסדרי עדיפות סותרים |
| `desktop` | 4 | 1 | 1 | 1 | 2 | 3 | מקור יחיד אך מכיל runtime אישי ופרטים זמניים רבים |

## פירוש הציונים

### `parabula-next`
**לשמר:**
- validator שמאתר מקורות הוראה מתחרים.
- Agents ו-Commands דקים.
- איסור state, local paths ו-command lists ב-AI entry files.
- mobile/A4/PWA validators.

**לשפר:**
- להוציא חוזי mobile, A4 ו-PWA ל-path rules או Skills תחומיים.
- למדוד את עלות טעינת `CLAUDE.md` בכל Agent.

### `ma-assistant2`
**לשמר:**
- secret scanning.
- איסור docs/state/Markdown מתחרה.
- duplicate detection.
- README pointer קצר.
- תקרת גודל.

**לשפר:**
- לא לדחוס architecture, capabilities, UI, runtime והפעלה למסמך אחד.
- להכריע יחס canonical מול `server-core` לפני שינוי.
- להפריד device/runtime discovery מהזיכרון הקבוע.

### `mathmath`
**לשמר:**
- דף קצר.
- פקודות בדיקה ברורות.
- הבחנה בין local, browser ו-Vercel.

**לשפר:**
- להסיר allow רחב ל-`gh pr merge:*`.
- להגדיר Fast/Standard/High-risk merge gates.
- להוציא נתיבים מקומיים והנחות סביבה מהכללים הקבועים.

### `maagar`
**לשמר:**
- metadata קנוני.
- `unknown` במקום ניחוש.
- hashes, dry-run, duplicate detection ו-browser QA.
- guards נגד fake buttons וקישורים לא אמיתיים.

**לשפר:**
- להעביר schema, taxonomy וספירות למקורות נתונים שנבדקים בזמן אמת.
- להרחיב validator מעבר לביטוי “דף הכללים היחיד”.

### `targilim`
**לשמר:**
- source-of-truth map לפי concern.
- validators ו-CI מקומי/חי.
- הגנה על A4, RTL, גרפים ו-generator contracts.

**לשפר:**
- להוציא changelog, snapshots ורשימת “בוצע” מה-rules.
- למפות workflows לפי סיכון ולצמצם רק חפיפה אמיתית.

### `TALMID`
**לשמר:**
- pointers דקים מ-CLAUDE/AGENTS.
- supersede אמיתי לדרישה אחרונה.
- הפרדת teacher/student ו-validation של DB/API.

**לשפר בדחיפות:**
- להוציא מידע אישי ונתוני תלמידים מ-Git ציבורי.
- להפסיק merge אוטומטי לשינויי DB/auth/PII.
- להעביר snapshots מספריים ל-state פרטי ומתוארך.

### `misparim`
**לשמר:**
- הפרדה בין requirements, state, decisions ו-history.
- חוזי RTL, math ו-fallback.

**לשפר:**
- לבטל קריאת 4–5 קבצים בכל session.
- להפעיל preview רק למשימת UI.
- לעבור branch/PR במקום push ישיר ל-main.
- למדוד את פיילוט path rules לפני merge.

### `microsoft-forms`
**לשמר:**
- research-first.
- acceptance tests.
- preference learning עם ביטול העדפה.
- עצירה רק בחסם אמיתי.

**לשפר:**
- facts עם `verified_at`, expiry ו-recheck policy.
- plan גדול כ-artifact phase, לא memory קבוע.
- feasibility/live checkpoint לפני אוטונומיה ארוכה.

### `server-core`
**לשמר:**
- code אינו proof.
- אין silent failure.
- replay protection, allowlist ואישור לפעולות רגישות.

**לשפר בדחיפות:**
- להסיר או להפוך pointer למסמכי rules ישנים.
- להכריע canonical מול `ma-assistant2`.
- לא לטעון שתי ארכיטקטורות פעילות במקביל.

### `www`
**לשמר:**
- truth states ו-Teacher Release.
- live verification ו-evidence.
- gates ל-Moodle, DB, LTI ונתוני תלמידים.

**לשפר בדחיפות:**
- לבחור מקור הוראה אחד.
- להפוך כל מסמך אחר ל-pointer או domain doc שאינו מכריז על סמכות.
- להוציא runtime counts, API inventory, schema ו-state מה-context הקבוע.
- לסגור audits ו-PRs expired כדי שלא יוצגו כעבודה פעילה.

### `desktop`
**לשמר:**
- no-fake actions.
- הפרדת personal/work.
- תיעוד מגבלות אמיתיות של Chrome, WhatsApp ו-Electron.

**לשפר בדחיפות:**
- להוציא חשבונות, פרופילים, מספרים, URLs וגרסאות ל-config מקומי.
- להשאיר ב-rules רק contracts, boundaries ו-discovery process.
- להוסיף audit ל-stale runtime ולמידע רגיש.

## מסקנת השוואה
אין דגם יחיד מנצח. ארכיטקטורת היעד צריכה לשלב:
1. `CLAUDE.md` קצר כמו `mathmath`.
2. governance validator כמו `parabula-next`.
3. secret/state/duplicate audit כמו `ma-assistant2`.
4. metadata, dry-run ו-guards כמו `maagar`.
5. source-of-truth map ו-verifiers כמו `targilim`.
6. truth states ו-release gates כמו `www`.
7. supersede של דרישות כמו `TALMID`.
8. path/domain loading כמו פיילוט `misparim`.

## סדר עדיפות לטיפול עתידי
### קריטי
1. `www` — סמכות סותרת.
2. `server-core` / `ma-assistant2` — canonical conflict.
3. `TALMID` — פרטיות ושערי merge.
4. `desktop` — מידע אישי/runtime בתוך rules.

### גבוה
5. `misparim` — context ו-Git workflow.
6. `microsoft-forms` — freshness ואוטונומיה.
7. `mathmath` — permission ו-merge gates.

### אופטימיזציה
8. `parabula-next` — domain loading.
9. `maagar` — semantic/freshness validation.
10. `targilim` — צמצום rules ו-CI mapping.

## תנאי מעבר מהמחקר ליישום
- review של הציונים מול code/runtime עדכני.
- inventory מקומי של Claude Code.
- baseline של context, זמן ותיקונים.
- החלטת canonical למשפחות חופפות.
- פיילוט אחד בלבד עם rollback.
