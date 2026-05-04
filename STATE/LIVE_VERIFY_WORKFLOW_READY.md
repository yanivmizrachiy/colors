# LIVE_VERIFY_WORKFLOW_READY — colors

תאריך: 2026-05-03

## סטטוס אמת

נוסף ואומת workflow ידני לבדיקת האתר החי של colors ב־GitHub Pages.

## קבצים קשורים

- `.github/workflows/live-verify.yml`
- `scripts/verify-live-colors.mjs`

## מה ה־workflow עושה

ה־workflow הידני מריץ:

```bash
node scripts/verify-live-colors.mjs
```

הסקריפט בודק את האתר החי:

`https://yanivmizrachiy.github.io/colors/`

ובודק קבצים מרכזיים:

- `index.html`
- `smart-builder.html`
- `qa-mobile.html`
- `qa-mobile.js`
- `zero-demo-guard.js`
- `smart-builder.js`
- `design-tokens.json`

## למה זה ידני ולא על כל push

בדיקת האתר החי תלויה ב־GitHub Pages וב־cache. לכן נכון להריץ אותה ידנית אחרי שה־Pages מתעדכן, ולא להפיל כל push בגלל השהיית פריסה.

## עדיין לא 100%

- צריך להפעיל את ה־workflow ידנית או להריץ את הסקריפט ב־Termux.
- עדיין צריך בדיקת טלפון אמיתית.

## קישורים

- אתר ראשי: https://yanivmizrachiy.github.io/colors/
- Smart Builder: https://yanivmizrachiy.github.io/colors/smart-builder.html
- בדיקת נייד: https://yanivmizrachiy.github.io/colors/qa-mobile.html
