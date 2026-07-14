# תוכנית עבודה

## מצב
שלב המחקר והתכנון לגרסה 1 הושלם. אין יישום בפרויקטים אחרים לפני אישור יניב ופיילוט מבוקר.

## שלב 0 — תשתית
- [x] בחירת ריפו מרכזי.
- [x] גיבוי מלא לתוכן `colors` הישן.
- [x] הגדרת גבולות, פרטיות ומודל ראיות.
- [x] בניית אינדקס, מטריצה ורשם הזדמנויות.
- [ ] שינוי שם הריפו לשם מוסכם.
- [ ] שינוי Visibility ל־Private.

## שלב 1 — מחקר ריפוים
- [x] `mathmath` — זיכרון קצר, PRs ובדיקות מול פערי runtime/Vercel.
- [x] `parabula-next` — מקור כללים יחיד, thin pointers ו־CI רחב.
- [x] `misparim` — זיכרון מדורג, כפילויות ועלות טעינה.
- [x] `maagar` — guards, dry-run, hashes ו־browser QA.
- [x] `microsoft-forms` — research-first, acceptance tests ואוטונומיה.
- [x] `www` — truth gates, release readiness ועומס STATE.
- [x] `bbb` — הוראות מקומיות לפי תת־פרויקט.
- [x] הפקת דפוסים חוצי־פרויקטים.
- [x] זיהוי מקורות בזבוז: context קבוע, מסמכי state, agent teams, PRs גדולים ו־CI כפול.

## שלב 2 — מחקר רשמי של Claude Code
- [x] Memory, CLAUDE.md, auto memory ו־rules לפי path.
- [x] Hooks ו־PreToolUse.
- [x] Subagents ו־agent teams.
- [x] MCP ו־Tool Search.
- [x] `/usage`, `/clear`, `/compact`, מודלים וצריכת טוקנים.
- [ ] inventory מקומי מצומצם של הכלים המותקנים בפועל.
- [ ] baseline `/usage` על שלוש משימות דומות.

## שלב 3 — תוכנית אישית
- [x] ארכיטקטורת זיכרון גלובלית ופרויקטלית.
- [x] מבנה `CLAUDE.md`, `CURRENT_STATE` ו־path rules.
- [x] סיווג משימות קטנות/בינוניות/גדולות.
- [x] מדיניות Sonnet/Opus/effort.
- [x] כללי context, clear, compact ו־handoff.
- [x] מדיניות Subagents ו־MCP.
- [x] מועמדים מדורגים ל־Hooks ול־Skills.
- [x] Git/PR/deploy workflow.
- [x] מודל אימות מדורג: static → build → interaction → environment → live.
- [x] בחירת `misparim` כמועמד פיילוט.
- [ ] אישור יניב לתוכנית ולפיילוט.

## שלב 4 — פיילוט עתידי, רק לאחר אישור
- [ ] למדוד baseline ב־`misparim` ללא שינוי.
- [ ] לקצר state ולהעביר שני domains ל־path rules.
- [ ] לבצע שלוש משימות השוואה.
- [ ] להשוות tokens, זמן, תיקונים ורגרסיות.
- [ ] להחליט אם לבנות Skill או Hook אחד.
- [ ] rollback אם אין שיפור מדיד.

## שלב 5 — הרחבה עתידית
- [ ] להתאים Tier לכל פרויקט.
- [ ] להרחיב רק רכיבים שהוכחו בפיילוט.
- [ ] להגדיר ביקורת memory/tools חודשית.
- [ ] להפיק דוח שיפור לאחר חודש שימוש.