# תוכנית עבודה

## מצב
שלב המחקר, התכנון והכנת הפיילוט לגרסה 1 הושלם. הפיילוט נמצא כעת בשלב **baseline מול מועמד שינוי מוכן**. אין merge ב־`misparim` לפני השלמת המדידות והדיווח.

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

## שלב 3.5 — מוכנות לפיילוט
- [x] מסמך פיילוט מפורט.
- [x] שלוש קטגוריות משימה להשוואה.
- [x] תבנית רישום baseline/post-change.
- [x] תנאי הצלחה כמותיים.
- [x] תנאי עצירה ו־rollback.
- [x] task brief קצר ואחיד.
- [x] סדר עדיפויות ליישום.
- [x] קביעה שהפיילוט הראשון אינו כולל Skill/Hook/Agent/MCP חדש.
- [x] יצירת ענף ו־PR מבודד ב־`misparim` ללא שינוי קוד מוצר.
- [x] אימות שה־PR פתוח, mergeable ו־Vercel success.

## שלב 4 — פיילוט פעיל
### A — Baseline על המצב הישן
- [ ] לבצע שלוש משימות מייצגות על `misparim/main` ב־SHA `ce020c8fcf026f0ba1909f5844a49ab7ac0aafe3`.
- [ ] להתחיל כל משימה ב־session חדש.
- [ ] להשתמש באותו מודל וב־effort דומה למשימות ההשוואה.
- [ ] לתעד זמן, `/usage`/context, קבצים שנקראו, תיקונים ובדיקות.
- [ ] לוודא שהמשימות תקינות להשוואה.

### B — מועמד שינוי מוכן, לא ממוזג
- [x] לעבוד בענף `pilot/claude-memory-v1` וב־PR #1 בלבד.
- [x] לקצר state חי.
- [x] להסיר כפילויות בין מסמכי הכניסה.
- [x] להוסיף שני path rules בלבד.
- [x] לא לשנות קוד מוצר.
- [x] להגדיר rollback באמצעות revert של ה־PR.
- [ ] לבצע review אחרון לאחר השלמת baseline.
- [ ] להחליט אם למזג; אין merge אוטומטי.

### C — Post-change והשוואה
- [ ] לאחר merge מאושר: לבצע שלוש משימות דומות בגודל ובסיכון.
- [ ] להשוות tokens/context, זמן, תיקונים, רגרסיות ומעורבות יניב.
- [ ] להחליט: keep, adjust או revert.
- [ ] רק לאחר הוכחה: להחליט אם דרוש Skill או Hook אחד.

## שלב 5 — הרחבה עתידית
- [ ] להתאים Tier לכל פרויקט.
- [ ] להרחיב רק רכיבים שהוכחו בפיילוט.
- [ ] להגדיר ביקורת memory/tools חודשית.
- [ ] להפיק דוח שיפור לאחר חודש שימוש.

## מסמכי שליטה
- מצב חי: `CURRENT_STATE.md`.
- ביקורת עדכנית: `docs/REPOSITORY_AUDIT_2026-07-15.md`.
- checklist תפעולי: Issue #12.
- מועמד שינוי: `yanivmizrachiy/misparim#1`.
