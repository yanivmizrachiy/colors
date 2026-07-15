# הצעת שינוי דרישה

> תבנית פלט ל־`capture-requirement`. מילוי התבנית אינו משנה זיכרון או קוד.

## הדרישה המקורית
`[המשפט המדויק של יניב, ללא מידע רגיש]`

## סיווג
- סוג: `[global-preference / project-rule / product-contract / architecture-decision / current-state / open-task / evidence / sensitive / not-memory]`
- Scope: `[global / repository / path / feature]`
- רגישות: `[public-safe / private / prohibited]`
- ודאות: `[high / medium / low]`

## נוסח קנוני מוצע
> `[משפט אחד עד שלושה, קצר וניתן לבדיקה]`

## מה נמצא כבר
| מקור | סעיף/נתיב | יחס לדרישה | סטטוס |
|---|---|---|---|
| `[path]` | `[section]` | `[identical / overlap / update / conflict]` | `[active / stale / unknown]` |

## הפעולה המוצעת
- פעולה: `[no-op / update / replace / supersede / save-as-state / create-task / do-not-store]`
- יעד: `[path או מערכת פרטית]`
- מה יוחלף: `[אין / סעיף קיים]`
- מה לא ישתנה: `[scope מוגן]`

## אכיפה מומלצת
- מנגנון: `[none / test / verifier / schema / Rule / Permission / Hook / Skill]`
- סיבה: `[מדוע טקסט בלבד מספיק או אינו מספיק]`

## בדיקות לאחר אישור
- `[בדיקת כפילות]`
- `[בדיקת סתירה]`
- `[test/verifier רלוונטי]`
- `[git diff מלא]`

## אישור נדרש
`[הפעולה המדויקת שתבוצע רק לאחר אישור יניב]`
