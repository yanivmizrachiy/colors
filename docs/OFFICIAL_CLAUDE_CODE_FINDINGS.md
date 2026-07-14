# ממצאים רשמיים ועדכניים על Claude Code

עודכן: 2026-07-15

> מסמך מחקר בלבד. הוא אינו דף כללים ואינו אישור להתקין הרחבה. מקור הכללים היחיד בקלוטקורד הוא `CLAUDE.md`.

## מקורות רשמיים
- Best practices: `https://code.claude.com/docs/en/best-practices`
- Memory and rules: `https://code.claude.com/docs/en/memory`
- Skills: `https://code.claude.com/docs/en/skills`
- Hooks: `https://code.claude.com/docs/en/hooks`
- Subagents: `https://code.claude.com/docs/en/sub-agents`
- Agent teams: `https://code.claude.com/docs/en/agent-teams`
- MCP: `https://code.claude.com/docs/en/mcp`
- Plugins: `https://code.claude.com/docs/en/plugins`
- Permissions: `https://code.claude.com/docs/en/permissions`
- Settings and sandbox: `https://code.claude.com/docs/en/settings`
- Costs: `https://code.claude.com/docs/en/costs`
- Checkpointing: `https://code.claude.com/docs/en/checkpointing`
- Scheduled tasks: `https://code.claude.com/docs/en/scheduled-tasks`
- Official marketplace: `https://github.com/anthropics/claude-plugins-official`
- Community marketplace: `https://github.com/anthropics/claude-plugins-community`

## 1. העיקרון המרכזי: Context הוא המשאב הקריטי
### עובדות רשמיות
- כל הודעה, קובץ שנקרא, פלט פקודה, CLAUDE, skill listing ו־MCP schema צורכים context.
- ביצועי המודל עלולים להידרדר כאשר ה־context מתמלא.
- `/clear` מומלץ בין משימות לא קשורות.
- `/compact <instructions>` מאפשר לשלוט במה שנשמר בסיכום.
- `/btw` מתאים לשאלה קצרה שאינה צריכה להיכנס להיסטוריית השיחה.
- sessions ארוכים שלא נוקו ו־Opus כברירת מחדל הם גורמים מרכזיים לשימוש גבוה.

### המשמעות עבור יניב
- משימה אחת משמעותית לכל session.
- session חדש עדיף לאחר שני ניסיונות תיקון כושלים באותו כיוון.
- פלטי logs, repository research ו־CI ארוכים עוברים ל־Subagent או לקובץ artifact מסונן.
- אין להפעיל צוותים או skill packs רבים “ליתר ביטחון”.

## 2. `CLAUDE.md`, Rules ו־Auto Memory
### עובדות רשמיות
- `CLAUDE.md` ו־auto memory נטענים בתחילת שיחה.
- `CLAUDE.md` הוא context מנחה ולא אכיפה קשיחה.
- יעד מומלץ: פחות מ־200 שורות; ארוך יותר צורך context ועלול להפחית adherence.
- imports עם `@` עוזרים לארגון אך עדיין נטענים ואינם חוסכים context.
- `.claude/rules/` יכול לטעון הוראות לפי path רק כאשר Claude ניגש לקבצים תואמים.
- Rules ללא `paths` נטענים בכל session ולכן עלולים להפוך לעוד CLAUDE מפוצל.
- Auto memory טוען בתחילת session רק את 200 השורות הראשונות או 25KB של `MEMORY.md`; קבצי נושא נקראים לפי צורך.
- `/memory` מציג מה נטען ומאפשר ביקורת של auto memory.

### המשמעות עבור יניב
- קלוטקורד משתמש ב־`CLAUDE.md` אחד כמקור כללים.
- בפרויקטים גדולים ניתן להשתמש ב־path rules רק לחוזים תחומיים אמיתיים, לא לשכפול workflow.
- Auto memory מתאים ל־gotchas וללמידות מקומיות, אך דורש audit תקופתי.

## 3. דרך עבודה מומלצת
### עובדות רשמיות
- Anthropic ממליצה לתת ל־Claude דרך לאמת עבודה: tests, build, screenshot או signal אחר.
- workflow מומלץ למשימה לא־ברורה: Explore → Plan → Implement → Commit.
- לתיקון קטן וברור ניתן לדלג על Plan mode כדי לא להוסיף overhead.
- prompt מדויק עם scope, קבצים, symptom, דוגמה וקריטריון הצלחה מפחית תיקונים.
- Claude יכול “לראיין” את המשתמש לפני feature גדול וליצור spec; לאחר מכן מומלץ session נקי לביצוע.
- course correction מוקדם יעיל יותר משיחה ארוכה עם ניסיונות כושלים.

### המשמעות עבור יניב
- תבנית המשימה הקצרה מתאימה יותר מ־super-prompt.
- שינוי UI/RTL/A4/PDF חייב screenshot או preview שניתן להשוות.
- שינוי מורכב מתחיל בחקירה ותוכנית; שינוי נקודתי מתחיל ישירות.

## 4. Skills
### עובדות רשמיות
- Skill הוא תיקייה עם `SKILL.md`, frontmatter ותוכן שנטען לפי invocation או relevance.
- `description` קובע מתי Claude יפעיל Skill אוטומטית.
- `disable-model-invocation: true` מונע הפעלה אוטומטית ומתאים ל־deploy, commit ופעולות צד.
- ניתן להגביל `allowed-tools`, להסיר `disallowed-tools`, לבחור model/effort ולהפעיל ב־forked context.
- גוף Skill שניטען נשאר ב־context לאורך התור והשיחה הרלוונטית; כל שורה היא עלות חוזרת.
- רשימת שמות ותיאורי Skills עצמה צורכת context; כאשר יש רבים, תיאורים נחתכים לפי budget.
- `/doctor` ו־`/context` מסייעים לזהות עלות skill listing.

### המשמעות עבור יניב
- Skill מתאים ל־workflow חוזר ורב־שלבי, לא לכל כלל קטן.
- מתחילים ב־Skill אחד בלבד לאחר מדידה: `safe-change`, `ui-verify`, `repo-audit` או `handoff`.
- Skills בעלי side effects יהיו ידניים ועם tools מצומצמים.

## 5. Hooks
### עובדות רשמיות
- Hooks רצים בנקודות קבועות במחזור החיים ואינם תלויים בכך שהמודל “יזכור”.
- `PreToolUse` יכול allow, deny, ask, defer או לשנות input לפני כלי.
- Hooks יכולים להיות גלובליים, פרויקטליים או תחומים ל־Skill/Subagent.
- Hook אינו עוקף deny/ask של permissions.
- חסימה ב־Hook יכולה לעצור פעולה גם אם קיימת allow permission.

### המשמעות עבור יניב
- Hook מתאים לחסימה דטרמיניסטית שחייבת לעבוד תמיד.
- לפני Hook בודקים אם permission deny או sandbox נותנים פתרון פשוט יותר.
- אין Hook שמריץ build מלא לאחר כל edit; הוא יקר ומאט את העבודה.

## 6. Permissions ו־Sandbox
### עובדות רשמיות
- סדר ההכרעה הוא deny → ask → allow; deny גובר על כל allow.
- ניתן להגדיר כללים ל־Bash, PowerShell, Read, Edit, WebFetch, MCP ו־Agents.
- Read/Edit deny מכסים כלי קבצים מובנים וחלק מפקודות shell מזוהות, אך לא כל subprocess אפשרי.
- sandbox מספק גבול OS לתהליכי shell ולגישה לקבצים/רשת.
- sandbox מלא נתמך ב־macOS, Linux ו־WSL2; יש לבדוק התאמה לסביבת Windows של יניב.
- symlinks נבדקים גם לפי הנתיב וגם לפי היעד, אך עדיין נדרשת זהירות עם קוד חיצוני.

### המשמעות עבור יניב
- permissions מצומצמות הן שכבה ראשונה להפחתת אישורים בלי allow-all.
- deny ל־`.env`, credentials, SSH ופקודות הרסניות הוא מועמד חזק.
- push/deploy/DB נשארים ask או manual.

## 7. Subagents ו־Agent Teams
### עובדות רשמיות
- Subagent עובד ב־context נפרד ומחזיר summary לשיחה הראשית.
- השיחה הראשית עדיפה כאשר יש הלוך־חזור, שינוי קטן או שלבים שחולקים context משמעותי.
- Subagent עדיף למחקר, logs, audit או verification מבודדים.
- Agent Teams הם experimental ומושבתים כברירת מחדל.
- כל teammate הוא instance ו־context נפרד; העלות גדלה בקירוב עם מספר הסוכנים.
- Teams מתאימים לעבודות עצמאיות מקביליות: השערות debug מתחרות, שכבות נפרדות או מחקר רב־זוויתי.
- הם פחות מתאימים לעריכות באותו קובץ, עבודה סדרתית או משימות עם תלויות הדוקות.

### המשמעות עבור יניב
- לא להפעיל Agent Teams כברירת מחדל.
- Subagent אחד read-only הוא מועמד טוב ל־repo audit, CI או security review.
- צוות נשקל רק במשימה גדולה שבה שלושה תחומים יכולים לעבוד באמת במקביל.

## 8. MCP ו־CLI
### עובדות רשמיות
- MCP מחבר Claude לכלים ומקורות חיצוניים; project-scoped servers דורשים approval.
- MCP חיצוני עלול לחשוף את המערכת ל־prompt injection או לכלים עם side effects.
- Anthropic מציינת שכלי CLI כגון `gh` הם לעיתים הדרך היעילה ביותר ב־context לעבודה עם שירותים.

### המשמעות עבור יניב
- `gh` CLI מועדף ל־GitHub כאשר הוא מספק את הפעולה הנדרשת.
- MCP נשקל רק כאשר הוא מחליף עבודה ידנית חוזרת או נותן מידע שלא ניתן לקבל ביעילות דרך CLI/API.
- מתחילים ב־read-only וב־project scope.

## 9. Plugins ו־Marketplaces
### עובדות רשמיות
- Plugin יכול לארוז Skills, Hooks, Agents, MCP, LSP ו־settings.
- Anthropic מפעילה marketplace רשמי ו־community marketplace שעובר review וסריקה אוטומטית.
- Plugins בקהילה pinned ל־commit SHA בקטלוג.
- גם repository הרשמי מזהיר שעל המשתמש לסמוך על ה־Plugin ולבדוק מה הוא כולל; Anthropic אינה מבטיחה שלא ישתנה או שיעבוד כמצופה.
- לשפות typed כגון TypeScript מומלץ להשתמש ב־LSP plugins מוכנים מה־marketplace הרשמי.

### המשמעות עבור יניב
- TypeScript LSP רשמי הוא מועמד בעדיפות גבוהה לפיילוט.
- “עבר review במרקטפלייס” אינו מחליף code review, בדיקת permissions ו־rollback.
- אין התקנת bundles גדולים של agents/skills לפני מדידת צורך.

## 10. Checkpoints, Rewind ו־Git
### עובדות רשמיות
- כל prompt יוצר checkpoint וניתן להשתמש ב־`/rewind` או Escape כפול.
- checkpoints יכולים לשחזר שיחה, קוד או שניהם.
- הם עוקבים אחרי שינויים שבוצעו בכלי העריכה של Claude, לא בהכרח אחרי Bash או תהליכים חיצוניים.
- Checkpoints אינם תחליף ל־Git.

### המשמעות עבור יניב
- checkpoint מתאים לניסוי מקומי קצר.
- branch/commit/PR נשארים מנגנון האמת וה־rollback לשינוי משמעותי.

## 11. Scheduled Tasks ואוטומציה
### עובדות רשמיות
- Claude Code יכול להריץ prompts לפי schedule.
- Skill ידני עם `disable-model-invocation: true` אינו מופעל אוטומטית דרך scheduled task כברירת מחדל בגרסאות עדכניות.
- אוטומציה רציפה יכולה לצרוך context, tokens והרשאות גם ללא מעקב צמוד.

### המשמעות עבור יניב
- Scheduled task מתאים בעתיד לביקורת חודשית read-only, לא לשינוי קוד או deploy אוטומטי.
- נדרש תנאי עצירה, output מצומצם ו־notification רק כשיש ממצא משמעותי.

## 12. ארכיטקטורת היעד לקלוטקורד
1. `CLAUDE.md` אחד וקצר כמקור כללים.
2. `CURRENT_STATE.md` קצר למצב פעיל בלבד.
3. Rules לפי path רק בפרויקט שבו יש domains אמיתיים.
4. Skill אחד בכל פיילוט, לתהליך חוזר.
5. Permission deny/ask לפני Hook.
6. Hook רק לחובה דטרמיניסטית.
7. Subagent לקריאה/חקירה רועשת.
8. Agent Teams רק לעבודה מקבילית עצמאית ונדירה.
9. MCP רק לחיבור שנמצא בשימוש; CLI כאשר הוא יעיל יותר.
10. Plugin רשמי לפני קהילתי; LSP TypeScript כמועמד ראשון.
11. Session נקי לכל משימה משמעותית.
12. בדיקות וראיות לפני טענת הצלחה.
13. מדידה עם `/usage`, `/context`, זמן, תיקונים ורגרסיות.
