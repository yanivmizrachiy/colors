# דוח מחקר עומק: `yanivmizrachiy/parabula-next`

## 1. זיהוי
- שם מלא: `yanivmizrachiy/parabula-next`
- Visibility: Public
- ענף ברירת מחדל: `main`
- גודל GitHub מדווח: כ־44,661 KB
- סטטוס: פעיל מאוד ופרודקשן ב־GitHub Pages
- עדיפות מחקר: גבוהה מאוד
- תאריך המחקר: 2026-07-14
- מצב הדוח: טיוטה מבוססת; נדרש מידע מקומי ומדידת זמני CI/context

## 2. מטרת המוצר
מערכת ליצירה, ניהול, קריאה, הדפסה והצגת דפי עבודה במתמטיקה בעברית RTL. דפי העבודה הם HTML/CSS קנוניים בגודל A4, עם קורא מחשב, אפליקציית נייד, PWA, MathJax, פעולות הדפסה/PDF ופריסה ב־GitHub Pages.

## 3. סטאק וארכיטקטורה
- Vite 8 לבנייה.
- HTML/CSS/JavaScript ללא framework UI כבד.
- MathJax 4 self-hosted.
- Playwright לבדיקות browser, mobile, WebKit, offline ו־A4.
- GitHub Actions ל־CI ולפריסת GitHub Pages.
- `meta/topics.json` כמקור אמת יחיד לניווט ומטא־דאטה.
- דפי `עמוד-N.html` בשורש כמקור קנוני.
- `catalog.*` לקורא מחשב ו־`mobile-app.*` לקורא נייד.

## 4. מודל העבודה עם Claude Code
### מקור כללים יחיד
`CLAUDE.md` מוגדר כמקור ההוראות, הדרישות והזיכרון המחייב היחיד. כל AI, agent, prompt או command חייב לקרוא אותו במלואו לפני פעולה.

### שכבת agents/commands
המצב הנוכחי רזה:
- agent לדוגמה מכיל שם תפקיד, תחום והפניה ל־`CLAUDE.md` בלבד.
- command לדוגמה מפנה ל־`CLAUDE.md` ול־`package.json` ואינו משכפל רשימות פקודות.
- validator אוטומטי חוסם agents/commands שמכילים כללים עצמאיים, נתיבי מחשב, ספירות היסטוריות או פקודות Git.

### משקל הקשר
`CLAUDE.md` הוא כ־260 שורות וחובה לקרוא אותו במלואו לכל פעולה. הוא כולל:
- ארכיטקטורה ומקורות אמת.
- חוזי A4 והדפסה.
- תוכן מתמטי ועיצוב.
- פרק מובייל מפורט מאוד.
- PWA, performance, accessibility ו־CI.
- Git וממשל תיעוד.

היתרון הוא סמכות ברורה. הסיכון הוא עלות context קבועה גם במשימות קטנות שאינן נוגעות למובייל או למשוואות.

## 5. התפתחות שכבת Claude
### שלב מוקדם — הרחבה
ב־PRs #7–#18 נוספו commands ו־agents רבים, לעיתים PR אחד לכל קובץ. PR #18 הציע 14 commands, 7 agents, מדריך `.claude/README.md`, מסמכי חזון וארגון.

### שלב ביניים — איחוד
PR #29 איחד את הכללים ל־`CLAUDE.md` יחיד והוסיף `single-rules-source-check.mjs` כדי לחסום מקורות הוראה כפולים.

### שלב נוכחי — צמצום ואכיפה
PR #37 הפך agents, commands ו־prompts להפניות דקות בלבד, הסיר מסמכים מיושנים ומקורות state ידניים, והרחיב את החוזים וה־CI למובייל.

### משמעות מחקרית
הריפו עבר בפועל ממערכת עזר עשירה ורבת קבצים למודל canonical יחיד עם pointers דקים. זהו ניסוי אמיתי שמראה כי שכבת AI רחבה עלולה ליצור תחזוקה וכפילות, גם כאשר כל רכיב נראה שימושי בנפרד.

## 6. זרימת עבודה שנצפתה
1. הגדרת אזור מוגן: דפי A4, תוכן מתמטי, מטא־דאטה או מעטפת.
2. עבודה בענף ייעודי.
3. PR מפורט עם הצהרה מה השתנה ומה לא השתנה.
4. בדיקות חוזה, metadata, access, mobile, build ו־CI.
5. במקרה של mobile/layout: Playwright ב־Android, WebKit, portrait, landscape, offline וכל הדפים.
6. artifacts של reports/screenshots בכשל.
7. merge רק לאחר שערים ירוקים.
8. כל רגרסיה משמעותית הופכת לבדיקה קבועה.

## 7. ראיות מרכזיות
### PARA-001
- סוג: עובדה
- ודאות: A
- מקור: `CLAUDE.md`
- ממצא: קיים מקור כללים יחיד, וכל נקודת AI חייבת לקרוא אותו במלואו.
- משמעות: סמכות גבוהה ומניעת סתירות, לצד עלות context קבועה.

### PARA-002
- סוג: עובדה
- ודאות: A
- מקור: `.claude/agents/mobile-preview-auditor.md`, `.claude/commands/verify.md`
- ממצא: agents ו־commands נוכחיים הם pointers קצרים, ללא שכפול כללים או command lists.
- משמעות: מנגנון progressive disclosure טוב יותר מהגרסאות המוקדמות.

### PARA-003
- סוג: עובדה
- ודאות: A
- מקור: `scripts/single-rules-source-check.mjs`
- ממצא: ה־CI סורק agents, commands, prompts, README ו־docs, חוסם מקורות כללים כפולים ומזהה ספירות/paths/פקודות שהתיישנו.
- משמעות: ממשל זיכרון הפך מאמנה טקסטואלית לאכיפה אוטומטית.

### PARA-004
- סוג: עובדה
- ודאות: A
- מקור: `package.json`
- ממצא: קיימים scripts נפרדים לחוזים, metadata, schema, access, mobile architecture, browser, interactions, all-pages, equations, HTML, vendor, health, build ו־A4 visual audit.
- משמעות: הגדרת השלמה טכנית עשירה וממוקדת תחום.

### PARA-005
- סוג: עובדה
- ודאות: A
- מקור: `.github/workflows/deploy-pages.yml`
- ממצא: כל PR ל־main מפעיל build job, mobile browser, mobile interactions ושמונה mobile deep shards.
- משמעות: כיסוי רגרסיות גבוה מאוד; גם שינוי documentation בלבד עשוי להפעיל את כל המטריצה כי אין path filter ל־workflow הראשי.

### PARA-006
- סוג: עובדה
- ודאות: A
- מקור: workflow run של PR #37
- ממצא: workflow הראשי כלל 11 jobs, מהם 10 jobs שביצעו `npm ci` ו־`npm run build`; בנוסף רץ `Equations Guard` נפרד.
- משמעות: אמינות גבוהה אך duplication משמעותי של install/build וצריכת CI.

### PARA-007
- סוג: עובדה
- ודאות: A
- מקור: PR #37
- ממצא: 267 דפים נבדקו בשלושה viewports, ב־app-reader וב־open-full, מחולקים לשמונה shards. נוספו journeys ל־Android, iPhone WebKit ו־offline.
- משמעות: כיסוי mobile/geometry יוצא דופן ומבוסס production build.

### PARA-008
- סוג: עובדה
- ודאות: A
- מקור: PRs #30–#37
- ממצא: מעטפת המובייל עברה רצף PRs גדול: הסרת שכבות כפולות, hardening, הסרת zoom, browser gate, open-full audit, all-pages validation ולבסוף rebuild רחב.
- משמעות: המערכת למדה מרגרסיות והפכה אותן ל־CI, אך הדרך כללה הרבה סבבים ו־PRs גדולים.

### PARA-009
- סוג: עובדה
- ודאות: A
- מקור: PR #36 ו־PR #37
- ממצא: PR #36 כלל 82 commits ו־PR #37 כלל 63 commits.
- משמעות: review, bisect, rollback והבנת scope הופכים קשים יותר ככל שה־PR גדל.

### PARA-010
- סוג: עובדה
- ודאות: A
- מקור: PR #22 ו־PR #24
- ממצא: audit מוקדם תפח ל־103 קבצים ודוחות committed; הוא נסגר והוחלף ב־audit מינימלי שמעלה artifacts בלבד.
- משמעות: דוחות transient אינם צריכים להיכנס להיסטוריית הקוד כברירת מחדל.

### PARA-011
- סוג: עובדה
- ודאות: A
- מקור: PR #29, PR #37
- ממצא: מסמכי rules/state/architecture מיושנים וכלים כפולים הוסרו; state וספירות נגזרים בזמן אמת.
- משמעות: המערכת צמצמה stale memory והפחיתה סכנת הנחיות שגויות.

### PARA-012
- סוג: עובדה
- ודאות: A
- מקור: `scripts/single-rules-source-check.mjs`
- ממצא: ה־validator עצמו מחזיק רשימת phrases מחייבות וקבצים/דפוסים אסורים.
- משמעות: מקור הכללים הלוגי הוא `CLAUDE.md`, אך שינוי חוזה מחייב לעיתים גם עדכון validator — duplication מכוון לצורך אכיפה.

### PARA-013
- סוג: עובדה
- ודאות: A
- מקור: `.claude/launch.json`
- ממצא: preview מקומי מוגדר עם `autoPort` ושרת קנוני.
- משמעות: פתיחת סביבת UI יכולה להיות עקבית ופחות ידנית.

### PARA-014
- סוג: עובדה
- ודאות: A
- מקור: רשימת PRs פתוחים
- ממצא: קיימים PRs פתוחים ישנים (#18, #24, #27) שחלקם מתארים ארכיטקטורה או שכבת Claude שכבר השתנתה משמעותית.
- משמעות: PRs פתוחים מיושנים עלולים לבלבל תמונת מצב, review או מחקר עתידי.

## 8. דפוסים מוצלחים
1. מקור כללים יחיד עם אכיפה אוטומטית.
2. agents/commands כ־pointers דקים.
3. מצב, ספירות והיסטוריה נגזרים בזמן אמת ולא נשמרים בזיכרון קבוע.
4. כל רגרסיה הופכת לבדיקה קבועה.
5. הפרדה בין geometry, interactions, PWA ו־build.
6. שימוש ב־production artifact לבדיקות browser.
7. shards לכיסוי רחב של מאות דפים.
8. artifacts של diagnostics במקום הכנסת דוחות transient לריפו.
9. הגדרת protected surfaces ואיסור שינוי תוכן במסגרת infra/mobile.
10. preview local עם autoPort.
11. self-hosting של MathJax ו־version stamping למניעת stale cache.
12. PR descriptions מציינים במפורש מה לא השתנה.

## 9. חיכוכים וסיכונים
### 9.1 עלות context קבועה
קריאה מלאה של 260 שורות בכל פעולה מבטיחה עקביות, אך מטילה עלות גם על משימות קטנות. חלק גדול מהקובץ הוא חוזה mobile מפורט שאינו נדרש לכל שינוי.

### 9.2 CI כבד וכפול
בכל PR:
- install/build ב־build job.
- install/build ב־browser gate.
- install/build ב־interaction gate.
- install/build בכל אחד משמונה shards.
- Equations Guard מוסיף install וסוויטה נפרדת כאשר paths מתאימים.

זה עשוי להיות מוצדק להגנה על מאות דפים, אך נדרש למדוד זמן, עלות ושיעור כשל אמיתי לכל gate.

### 9.3 כל PR מפעיל deep mobile
ה־workflow הראשי אינו מוגבל לפי paths. לכן שינוי README, CLAUDE או script שאינו משפיע על runtime עדיין מפעיל את המטריצה המלאה.

### 9.4 PRs גדולים מאוד
63–82 commits מקשים על review, isolation ו־rollback. ריבוי commits עשוי לשקף עבודה ארוכה/מקבילית, אך דורש ניתוח sessions ודרך merge.

### 9.5 חוזה יחיד גדול
הגישה מונעת סתירות, אך מרכזת כל domain rules בקובץ אחד. הסיכון הוא שהקובץ יהפוך ל־monolith שדורש קריאה מלאה ומעודכן בתדירות גבוהה.

### 9.6 required phrases ב־validator
ה־validator מגן מפני מחיקה מקרית של חוזים, אך coupling ל־phrases ספציפיים עלול להפוך שינוי ניסוח לגורם כשל גם אם המשמעות נשמרה.

### 9.7 PRs פתוחים מיושנים
PR #18 מתאר שכבת commands/agents רחבה שכבר צומצמה; PR #24 ו־#27 עשויים גם הם לייצג עבודה ישנה או חלקית. זהו backlog שדורש triage, לא בהכרח merge.

## 10. ניתוח התפתחות המובייל
### שלב 1 — שכבות כפולות
PR #30 הסיר runtime נייד כפול, metadata mirror ו־zoom כפול.

### שלב 2 — hardening
PRs #31–#33 חיזקו viewport, A4, PWA, browser gate והסירו legacy zoom.

### שלב 3 — coverage מלא
PRs #34–#36 עברו מבדיקה זמנית של open-full לבדיקה של כל הדפים בשלושה viewports.

### שלב 4 — rebuild וממשל
PR #37 הרחיב interactions, virtualization, accessibility, PWA ו־CI, ובמקביל צמצם מקורות הוראה מיושנים.

### הסקה זמנית
הפרויקט הצליח להפוך רצף רגרסיות לחוזה CI חזק. עם זאת, ייתכן שהמערכת הגיבה לכל תקלה בהוספת שכבה נוספת לפני שאיחדה execution/artifacts וניתבה בדיקות לפי scope.

## 11. עלות הקשר והתחזוקה
### חיובי
- אין state היסטורי קבוע.
- אין ספירות קשיחות.
- agents/commands רזים.
- README קצר.
- package scripts הם מקור הפקודות.

### עלויות
- `CLAUDE.md` ארוך וחובה לקרוא במלואו.
- `single-rules-source-check` מכיל רשימות enforce מפורטות.
- הרבה validators/workflows דורשים תחזוקה סינכרונית.
- PRs גדולים יוצרים context רחב בזמן review ו־handoff.

## 12. מועמדים עתידיים — ללא יישום
| בעיה | מועמד עתידי | למה | סיכון | מידע נוסף דרוש | מדד הצלחה |
|---|---|---|---|---|---|
| CLAUDE גדול | rules path-scoped או פרקים לפי domain | לצמצם טעינה במשימה לא קשורה | החזרת כפילות/סתירה | נתוני context ושימוש לפי משימה | פחות startup context ללא יותר טעויות |
| 10 builds ב־PR | reuse של artifact או build once/test many | לצמצם CI זמן ועלות | artifact mismatch/isolation | זמני jobs ו־failure history | ירידה בזמן CI ללא ירידה בכיסוי |
| deep mobile לכל שינוי | path-aware test selection עם fallback מלא | להימנע מהרצות לא רלוונטיות | missed regression | מיפוי dependencies ושיעור failures | פחות compute עם אותה אמינות |
| PRs 60–80 commits | slicing/checkpoints/stacked plan | review ו־rollback קלים | overhead ניהולי | אופן העבודה בפועל וסשנים | PRs קטנים יותר ופחות תיקוני המשך |
| required phrases brittle | contract IDs/schema-based validation | אכיפה יציבה מול שינוי ניסוח | מורכבות validator | תדירות שינוי CLAUDE | פחות false failures |
| PRs פתוחים מיושנים | triage policy | תמונת מצב נקייה | סגירת עבודה שעדיין נדרשת | החלטת יניב לגבי #18/#24/#27 | פחות backlog מטעה |
| validators רבים | validation map/dependency graph | להבין מה רץ ולמה | מסמך נוסף שעלול להתיישן | זמני והרכב suites | פחות duplication ותחזוקה |

## 13. שאלות פתוחות ליניב
1. האם PRs #36–#37 בוצעו בסשן אחד ארוך, בכמה sessions או באמצעות agent teams?
2. כמה זמן לוקח ה־CI המלא בפועל, וכמה הוא מפריע למהירות העבודה?
3. האם יניב ממתין לכל gates לפני merge בכל פעם?
4. אילו חלקים ב־CLAUDE.md יניב צריך כמעט בכל משימה, ואילו רק במובייל/A4?
5. האם PRs #18, #24 ו־#27 עדיין רלוונטיים או צריכים להיסגר?
6. האם commands/agents הישנים באמת שימשו בפועל לפני שצומצמו?
7. האם `tech:max` מופעל ידנית ובאיזו תדירות?
8. האם failures של deep mobile מגלים תקלות ייחודיות או חוזרים על אותן בדיקות?

## 14. מסקנות זמניות
### עובדות
- זהו הריפו בעל ממשל AI ו־CI המתקדם ביותר שנבדק עד כה.
- canonical source + thin pointers נאכפים בקוד.
- mobile/A4 coverage רחב מאוד.
- תהליך העבודה עבר כבר סבב של over-expansion ואז consolidation.

### הסקות
- החוזקה המרכזית היא מעבר מכללים טקסטואליים לאכיפה אוטומטית.
- הסיכון המרכזי הוא over-correction: context קבוע גדול ו־CI שמריץ מטריצה מלאה לכל שינוי.
- המודל מתאים כבסיס להשוואה, אך לא כדאי להעתיק אותו לכל פרויקט ללא מדידה.

### השערות
- ניתן לצמצם זמן CI באופן משמעותי באמצעות reuse או path-aware selection בלי לפגוע בכיסוי.
- חלק מה־CLAUDE יכול להפוך ל־path-scoped rules, אך רק אם מערכת הטעינה והאכיפה נשארת ברורה.
- PRs גדולים קשורים לסשנים ארוכים או scope רחב מדי, אך נדרש מידע מקומי.

## 15. הצעד הבא במחקר
1. לאסוף זמני jobs ו־failure rates של מספר workflow runs.
2. לנתח patches של PRs #29, #30 ו־#37.
3. למפות את כל agents/commands הפעילים ואת תדירות השימוש המקומית.
4. להשוות את canonical-source model ל־`misparim` ול־`maagar`.
5. לעדכן את מטריצת הדפוסים והרשם.
6. לא ליישם שום שינוי עד השלמת ההשוואה ואישור יניב.