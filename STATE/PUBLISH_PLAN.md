# PUBLISH_PLAN — colors V5

## מצב אמת

הריפו `yanivmizrachiy/colors` עדיין לא קיים לפי בדיקת GitHub שהחזירה 404.

## מסלול פרסום חכם

בטלפון / Termux:
1. להוריד את `colors_v5_repo_ready.zip` לתיקיית Downloads.
2. להריץ את `scripts/publish-from-downloads-termux.sh` או את הקובץ החיצוני `colors_publish_from_downloads_termux.sh`.
3. הסקריפט:
   - מוצא את ה-ZIP ב-Downloads.
   - מחלץ ל-~/colors.
   - מריץ validate ו-doctor.
   - יוצר ריפו colors אם חסר.
   - דוחף ל-main.
   - מנסה להפעיל GitHub Pages דרך Actions.

ב-Windows:
1. להוריד את ה-ZIP ל-Downloads.
2. להריץ `scripts/publish-from-downloads-windows.ps1`.

## לא לטעון 100%

100% רק אחרי:
- GitHub repo קיים.
- Actions עברו.
- Pages URL נפתח.
- האתר נבדק בטלפון.
- כפתורי צפייה והעתקה נבדקו בפועל.
