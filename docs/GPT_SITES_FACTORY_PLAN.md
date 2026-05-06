# GPT Sites Factory — תכנון מפעל אתרים ל־GPT

## סטטוס

מסמך זה נוצר בתוך `yanivmizrachiy/colors` כתכנון והגדרת דרישות בלבד.

הוא לא אומר שמפעל האתרים כבר נבנה בפועל.

נכון לעכשיו:

- ריפו `colors` קיים ומשמש כספריית עיצוב.
- אין בריפו הזה מפעל אתרים מלא ומאומת.
- אין עדיין ריפו נפרד מאומת בשם `gpt-sites`.
- הדרישות כאן מיועדות לבנייה עתידית אמיתית ומסודרת.

## מטרה

לבנות עוזר GPT קבוע שיודע ליצור ולערוך אתרים ציבוריים דרך GitHub Pages בצורה אחידה, קלה, מהירה ואמינה.

כל בקשה חדשה של המשתמש תיצור אתר חדש עם קישור חיצוני קבוע, או תעדכן אתר קיים בלי לשבור את הקישור שלו.

## עקרונות יסוד

- אין דמו.
- אין קישורים מזויפים.
- אין ערבוב בין אתרים.
- אין נתונים מומצאים.
- אין סימון 100% בלי אימות.
- כל אתר חייב להיות מותאם לנייד.
- כל אתר חייב להיות גרפי, איכותי ונוח לשימוש.
- כל אתר חייב להיות ניתן לעריכה חוזרת באמצעות GPT.

## מבנה מומלץ לריפו מפעל האתרים

שם ריפו מומלץ:

```text
yanivmizrachiy/gpt-sites
```

מבנה מומלץ:

```text
README.md
RULES.md
sites-index.json
index.html
styles.css
script.js
scripts/
  create-site.js
  update-site.js
  validate-sites.js
  build-index.js
templates/
  mobile-premium-site/
    index.html
    styles.css
    script.js
    site.config.json
sites/
  {siteId}/
    index.html
    styles.css
    script.js
    site.config.json
    README.md
    STATE/
STATE/
  actions-log.jsonl
  validations/
.github/
  workflows/
    validate.yml
    pages.yml
```

## מבנה חובה לכל אתר

כל אתר חייב להיות מופרד לחלוטין:

```text
sites/{siteId}/
  index.html        # מבנה HTML בלבד
  styles.css        # עיצוב CSS בלבד
  script.js         # התנהגות JavaScript בלבד
  site.config.json  # זהות ומטא־דאטה
  README.md         # תיעוד ייחודי לאתר
  STATE/            # לוגים/בדיקות של האתר
```

## שדות חובה ב־site.config.json

```json
{
  "siteId": "example-site",
  "title": "שם האתר",
  "description": "תיאור קצר",
  "language": "he",
  "direction": "rtl",
  "publicUrl": "https://yanivmizrachiy.github.io/gpt-sites/sites/example-site/",
  "status": "active",
  "createdAt": "YYYY-MM-DD",
  "lastUpdated": "YYYY-MM-DD",
  "mobileReady": false,
  "verified": false,
  "allowedFiles": [
    "index.html",
    "styles.css",
    "script.js",
    "site.config.json",
    "README.md"
  ]
}
```

## מניעת בלבול בין אתרים

לפני כל פעולה, GPT חייב לזהות:

- `siteId`.
- שם האתר.
- תיקיית האתר.
- קישור ציבורי.
- קבצים שמותר לערוך.
- קבצים שאסור לערוך.

אסור לבצע שינוי אם אתר היעד לא זוהה בצורה חד־משמעית.

## הפרדת HTML / CSS / JS

ברירת המחדל המחייבת:

- `index.html` מכיל מבנה בלבד.
- `styles.css` מכיל עיצוב בלבד.
- `script.js` מכיל התנהגות בלבד.
- `site.config.json` מכיל זהות, קישור, סטטוס ותצורה.
- `README.md` מכיל תיעוד.

אין CSS גדול בתוך HTML.
אין JavaScript גדול בתוך HTML.

## סטנדרט נייד ועיצוב

כל אתר חדש חייב לכלול:

- `viewport` תקין.
- RTL מלא כשמדובר בעברית.
- כפתורים גדולים ונוחים למגע.
- ללא גלילה אופקית.
- טיפוגרפיה ברורה.
- ריווח נוח.
- עיצוב מודרני.
- צבעים חזקים אך קריאים.
- מבנה כרטיסים או אזורים ברורים.
- טעינה מהירה.

## פעולות GPT נדרשות

העוזר העתידי צריך לתמוך בפקודות:

- יצירת אתר חדש.
- עדכון אתר קיים.
- שיפור עיצוב אתר קיים.
- שיפור התאמה לנייד.
- הוספת אזור חדש.
- שינוי טקסט.
- שינוי צבעים.
- החלפת תבנית.
- ארכוב אתר.
- הצגת רשימת כל האתרים.
- בדיקת תקינות כל האתרים.

## פעולת עדכון תקינה

כל פעולה צריכה להירשם בפורמט ברור:

```json
{
  "operation": "update_site",
  "siteId": "example-site",
  "targetPath": "sites/example-site/",
  "changedFiles": [
    "sites/example-site/index.html",
    "sites/example-site/styles.css"
  ],
  "publicUrl": "https://yanivmizrachiy.github.io/gpt-sites/sites/example-site/",
  "verified": false
}
```

## שימוש ב־colors

`colors` ישמש כמקור השראה/ספריית עיצוב:

- צבעים.
- כפתורים.
- כותרות.
- טבלאות.
- מסגרות.
- גופנים.
- promptים ל־GPT.

אבל הוא לא אמור להכיל את כל האתרים עצמם, כדי לא ליצור בלבול.

## תנאי 100%

מפעל האתרים ייחשב 100% רק אחרי:

- ריפו יעודי קיים.
- GitHub Pages פעיל.
- יצירת אתר אמיתי ראשון.
- קישור ציבורי נפתח בפועל.
- בדיקת נייד עברה.
- הפרדת HTML/CSS/JS מאומתת.
- אינדקס אתרים מתעדכן.
- לוג פעולה נוצר.
- README/RULES/STATE מסונכרנים.
