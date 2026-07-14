# אבטחה ופרטיות

## מצב חשוב
הריפו `colors` ציבורי בעת ההקמה. עד שיהפוך ל־Private, מותר לשמור בו רק מידע כללי ולא־רגיש.

## אסור להכניס
- `.env` וקובצי environment אמיתיים.
- API keys, tokens, cookies, passwords ו־credentials.
- תמלילי Claude Code מלאים ולא מסוננים.
- raw student data, ציונים, שמות תלמידים או מזהים.
- OAuth data, browser profiles או קישורי עריכה פרטיים.
- פלטים שעלולים להכיל סודות.

## איסוף מקומי עתידי
1. Inventory בלבד: גרסאות, שמות רכיבים, נתיבים וסטטיסטיקות.
2. Prompts מסוננים לאחר redaction ובדיקה מקומית.
3. Selected sessions בלבד, בבחירה מפורשת.

כל סקריפט איסוף חייב לתמוך ב־Preview לפני יצירת ZIP.

## rollback
- הגיבוי הקנוני: `archive/colors-original-2026-07-14`.
- אין למחוק את ענף הגיבוי.
- אין force-push ללא הוראה מפורשת.
