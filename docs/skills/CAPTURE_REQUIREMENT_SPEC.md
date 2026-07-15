# מפרט Skill — `capture-requirement`

עודכן: 2026-07-15

> מפרט בלבד. ה־Skill אינו מותקן ואינו פעיל. התקנה תתבצע רק לאחר Inventory ו־Baseline.

## 1. הבעיה
יניב נותן לאורך העבודה דרישות, תיקונים והעדפות. ללא תהליך מובנה הן עלולות להישכח, להיכתב בכמה מקומות, לסתור דרישה קודמת, להתערבב עם state זמני או להגדיל את ה־context.

## 2. ההחלטה הארכיטקטונית
ה־workflow מחולק לשני שלבים:

### A. `capture-requirement`
Skill ידני וקריאה בלבד. הוא מנתח דרישה ומחזיר הצעה קנונית. הוא אינו משנה קבצים.

### B. `safe-change`
לאחר אישור מפורש של יניב, השינוי מיושם כ־Git change רגיל: branch, diff, בדיקה ו־PR לפי הצורך.

ההפרדה מונעת מצב שבו Skill שמזהה דרישה גם מחליט לבדו לשמור אותה.

## 3. מיקום עתידי
לאחר פיילוט מוצלח:

```text
~/.claude/skills/capture-requirement/SKILL.md
```

תבנית לא־פעילה נשמרת בקלוטקורד תחת:

```text
templates/skills/capture-requirement/SKILL.md
```

## 4. Frontmatter עתידי
- `disable-model-invocation: true` — הפעלה ידנית בלבד.
- `argument-hint` — טקסט הדרישה.
- `allowed-tools` — אישור מראש לכלי חיפוש וקריאה בלבד.
- `disallowed-tools` — חסימת כלי כתיבה, shell, agents וגלישה בזמן ה־Skill.
- model ו־effort חסכוניים כברירת מחדל.

### הערת בטיחות
`allowed-tools` אינו מגביל את יתר הכלים; הוא רק מאשר מראש את הרשומים. ההגבלה בפועל תסתמך על `disallowed-tools` ועל permissions. שמות הכלים המדויקים ייקבעו לאחר ה־Inventory המקומי.

## 5. קלט

```text
/capture-requirement [הדרישה החדשה]
```

ה־Skill מקבל דרישה אחת או קבוצה קטנה של דרישות קשורות. אין להעביר transcript, dump של שיחה או קובץ גדול.

## 6. תהליך העבודה

### 6.1 בדיקת רגישות
בדוק האם הדרישה כוללת secrets, מידע תלמידים, פרטי קשר, מידע פיננסי, runtime אישי או transcript גולמי.

אם כן:
- עצור.
- אל תחפש ואל תשמור.
- החזר `SENSITIVE_DO_NOT_STORE`.
- הצע ניסוח כללי ומסונן בלבד.

### 6.2 סיווג
בחר אחד:
- `GLOBAL_PREFERENCE`
- `PROJECT_RULE`
- `PRODUCT_CONTRACT`
- `ARCHITECTURE_DECISION`
- `CURRENT_STATE`
- `OPEN_TASK`
- `EVIDENCE`
- `HISTORY`
- `SENSITIVE_DO_NOT_STORE`
- `NOT_PERSISTENT`

### 6.3 Scope
בחר:
- גלובלי.
- ריפו מסוים.
- path/feature מסוים.
- session בלבד.
- לא לשמירה.

אין להרחיב דרישה מפרויקט אחד לכל הפרויקטים ללא הוראה מפורשת.

### 6.4 חיפוש ממוקד
חפש לפי הסדר:
1. `CLAUDE.md`.
2. `CURRENT_STATE.md` כאשר הסיווג זמני.
3. מסמך דרישות קנוני שאליו `CLAUDE.md` מפנה.
4. Rules לפי path.
5. tests, verifiers או schema שמיישמים את החוזה.
6. `DECISIONS.md` לצורך היסטוריה בלבד.

אין לקרוא את כל הריפו או את כל המחקר כברירת מחדל.

### 6.5 זיהוי מצב
בחר אחד:
- `NEW`
- `EXACT_DUPLICATE`
- `SEMANTIC_DUPLICATE`
- `REFINEMENT`
- `CONFLICT`
- `SUPERSEDES`
- `WRONG_SCOPE`
- `ALREADY_ENFORCED`
- `CANONICAL_SOURCE_AMBIGUOUS`

### 6.6 ניסוח קנוני
הניסוח צריך להיות קצר, חד־משמעי, ניתן לבדיקה, ללא היסטוריה, ללא מידע רגיש ומתאים ל־scope.

### 6.7 בחירת יעד אחד
- זיכרון גלובלי פרטי.
- `CLAUDE.md`.
- Rule לפי path.
- מסמך דרישות קנוני.
- `CURRENT_STATE.md`.
- `DECISIONS.md`.
- test/verifier/schema.
- Issue.
- לא לשמירה.

### 6.8 החלטת אכיפה
בדוק האם טקסט מספיק. חוזה דטרמיניסטי או בעל סיכון גבוה עשוי לדרוש test, verifier, schema, permission או Hook קטן.

## 7. פורמט הפלט

```text
REQUIREMENT REVIEW

Status: [NEW | DUPLICATE | REFINEMENT | CONFLICT | SUPERSEDES | ...]
Classification: [type]
Scope: [global | repository | path | session | do-not-store]
Sensitivity: [public-safe | private | do-not-store]

Proposed canonical wording:
[ניסוח קצר]

Existing source:
[path + heading, or none]

Proposed destination:
[path + heading, or do-not-store]

Replacement:
[מה יוחלף, or none]

Enforcement:
[text only | test | verifier | schema | permission | hook | issue]

Evidence checked:
[רשימה קצרה של הקבצים או הבדיקות שנקראו]

Not verified:
[מה לא נבדק]

Next action:
Approve, revise, or reject. No file has been changed.
```

## 8. התנהגות לפי מצב
- `EXACT_DUPLICATE` — אין להציע כתיבה; מצביעים למקור הקיים.
- `SEMANTIC_DUPLICATE` — מציעים איחוד לניסוח אחד.
- `REFINEMENT` — מציגים diff מילולי בין הישן לחדש.
- `CONFLICT` — לא בוחרים צד; מציגים את שתי הדרישות ודורשים החלטה.
- `SUPERSEDES` — מציעים החלפה מלאה ומסמנים references שדורשים עדכון.
- `WRONG_SCOPE` — מציעים העברה, לא שכפול.
- `ALREADY_ENFORCED` — מצביעים ל־test/guard ומציעים לכל היותר pointer קצר.
- `CANONICAL_SOURCE_AMBIGUOUS` — עוצרים עד הכרעה על מקור האמת.

## 9. פעולות אסורות
ה־Skill אינו רשאי:
- לערוך, ליצור או למחוק קובץ.
- להריץ shell, Git write, commit, push או PR.
- לקרוא `.env`, credentials, cookies או transcripts.
- לחפש ברשת.
- להפעיל Agent או Skill אחר.
- לשמור דרישה בלי אישור.
- להרחיב scope בעצמו.
- להציג state או inference כעובדה.

## 10. תקציב Context
- מתחילים ב־`CLAUDE.md` ובחיפוש מונחים מדויקים.
- קוראים רק טווחים רלוונטיים.
- יעד רגיל: עד 5 קבצים ועד 250 שורות תוכן מצטבר.
- חריגה דורשת דיווח קצר מדוע המקור הקנוני לא נמצא.
- הפלט הסופי קצר ואינו כולל reasoning פנימי.

## 11. מדדי הצלחה
- אפס כתיבות ללא אישור.
- אפס מידע רגיש בפלט או בזיכרון.
- אפס כפילויות חדשות במבחני הפיילוט.
- זיהוי נכון של conflict/supersede בלפחות 90% מתרחישי הקבלה.
- פחות הסברים חוזרים של דרישות.
- context נמוך יותר לעומת קריאת כל מסמכי הדרישות.

## 12. Rollback
לפני התקנה: מחיקת התבנית אינה משפיעה על Claude Code.

לאחר התקנה אישית: הסרת התיקייה `~/.claude/skills/capture-requirement/` משביתה את ה־Skill. כל שינוי זיכרון שבוצע לאחר אישור נשאר שינוי Git רגיל וניתן ל־revert.

## 13. תנאי מעבר להתקנה
1. Inventory מקומי הושלם ונבדק.
2. Baseline של שלוש משימות הושלם.
3. שמות הכלים וה־permissions בגרסה המקומית אומתו.
4. תרחישי הקבלה עברו בבדיקה ידנית.
5. יניב אישר את פורמט הפלט ואת ההפרדה מ־`safe-change`.
6. הותקנה גרסה אחת בלבד, ללא Plugin או Skill pack נוסף באותו פיילוט.
