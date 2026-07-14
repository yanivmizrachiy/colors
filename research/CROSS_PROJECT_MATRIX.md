# מטריצת דפוסים חוצי־פרויקטים — גרסה 1

עודכן: 2026-07-14

## השוואת המודלים
| נושא | mathmath | parabula-next | misparim | maagar | microsoft-forms | www | bbb |
|---|---|---|---|---|---|---|---|
| זיכרון פתיחה | קצר | ארוך | קצר + כמה קבצים חובה | שער קצר + RULES | עשיר | שער קצר + אמת כבדה | מקומי לפי subproject |
| אכיפה | בינונית | גבוהה מאוד | בעיקר טקסט | גבוהה | בעיקר acceptance plan | audits/gates רבים | לא נבדק מספיק |
| CI/בדיקות | מקומי + preview | מטריצה רחבה | tsc/build/visual | validators + browser QA | acceptance מתוכנן | checks/audits רבים | לא נבדק |
| state/history | קל | נגזר בזמן אמת | state והיסטוריה מעורבים | נוקה לאחר הצטברות | מסמכי מחקר | STATE רב | לא ידוע |
| אוטונומיה | גבוהה | גבוהה | בינונית | בינונית | גבוהה מאוד | מבוקרת/רגישה | לא ידוע |
| סיכון מרכזי | runtime gaps | context/CI cost | כפילות טעינה | stale tooling | overplanning | documentation overload | conflict בין שכבות |

## דפוסים מבוססים
### P-001 — זיכרון קצר לבדו אינו מספיק
`mathmath` מראה context יעיל אך פערי runtime; `parabula-next` מראה אכיפה חזקה במחיר context/CI. הפתרון אינו “קצר” או “ארוך”, אלא זיכרון קצר + contracts לפי domain + בדיקות מדורגות.

### P-002 — כללים דטרמיניסטיים עוברים לקוד
`maagar` ו־`parabula-next` מוכיחים ש-hash checks, duplicate guards, forbidden states ו-browser contracts אמינים יותר מטקסט חוזר.

### P-003 — state נוכחי, דרישות והיסטוריה חייבים להיות נפרדים
`misparim`, `www` וגרסאות מוקדמות של `maagar` מערבבים שכבות. התוצאה היא context מיותר וקושי לדעת מה עדיין נכון.

### P-004 — PASS אינו READY
`www` מפריד היטב implemented/tests/live/release. זה נדרש גם ב־`mathmath` ובפרויקטי אינטגרציה אחרים.

### P-005 — שכבת AI רחבה היא חוב עד שיוכח אחרת
`parabula-next` התרחב ל־commands/agents ואז צמצם ל־pointers. Skills, Hooks ו־Agents נבנים רק עבור workflow חוזר ומדיד.

### P-006 — מחקר ואוטונומיה דורשים checkpoints
`microsoft-forms` מראה ערך רב למחקר/acceptance מראש, אך אינטגרציה חיצונית חייבת feasibility test קטן לפני implementation רחב.

### P-007 — audits ותיעוד יכולים להפוך לעומס
`www`, `maagar` ו־`parabula-next` נאלצו לנקות reports או state ישנים. audit output זמני צריך להיות artifact או archive.

### P-008 — PR גדול מגדיל סיכון תיקוני המשך
`mathmath` ו־`parabula-next` מציגים פיצ'רים/PRs רחבים ואחריהם hardening. שינוי גדול צריך slicing ו־checkpoint, לא רק יותר tests בסוף.

### P-009 — הוראות מקומיות מתאימות לריפו רב־שכבתי
`bbb` ו־`misparim/zaviyot` מחזקים root קצר + rules/CLAUDE מקומיים לפי subproject.

### P-010 — dry-run הוא ברירת מחדל לפעולה רחבה
`maagar` הוא המודל המוביל: preview, hashes, duplicate detection, apply מפורש ו־validation.

## החלטות תכנוניות
1. Sonnet כברירת מחדל; Opus רק לסיכון/ארכיטקטורה/שורש.
2. `CLAUDE.md` מתחת ל־200 שורות, יעד מעשי 80–150.
3. `CURRENT_STATE.md` עד 30–60 שורות.
4. path rules לחוזי domain.
5. אין super-prompt לפתיחת session רגיל.
6. Subagent רק לפלט רועש ומבודד.
7. Agent teams אינם ברירת מחדל.
8. MCP מותקן רק אם מחליף עבודה ידנית אמיתית.
9. Hook רק לחסימה דטרמיניסטית קריטית.
10. Skill רק לאחר שלוש חזרות של אותו workflow.

## שאלות שדורשות מדידה בפיילוט
- כמה context נחסך ב־`misparim` לאחר מעבר ל-path rules?
- האם מספר הרגרסיות נשאר קבוע או יורד?
- כמה שימוש מיוחס ל-MCP/Skills/Subagents ב־`/usage`?
- האם PR workflow בכל פרויקט משמעותי מוסיף זמן סביר ביחס לבטיחות?

## מקור התוכנית
ההמלצות המלאות: `docs/PERSONAL_WORK_SYSTEM_PLAN.md`.