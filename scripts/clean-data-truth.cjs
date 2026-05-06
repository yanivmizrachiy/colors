const fs=require('fs');
const files=['design-tokens.json','site.config.json'];
const reps=[
['לא דמו, לא placeholder ולא תוכן מומצא שמוצג כאמיתי','תוכן אמיתי בלבד, ללא תוכן זמני וללא תוכן מומצא שמוצג כאמיתי'],
['ללא דמו או placeholder','תוכן אמיתי בלבד'],
['לא דמו או placeholder','תוכן אמיתי בלבד'],
['לא דמו, לא placeholder','תוכן אמיתי בלבד'],
['placeholder','תוכן זמני'],
['כותרת לדוגמה בעברית','תצוגת כותרת בעברית'],
['כותרת עברית לדוגמה','תצוגת כותרת עברית'],
['דוגמת כותרת RTL','תצוגת כותרת RTL'],
['דוגמה לטקסט בעברית','תצוגת טקסט בעברית'],
['דוגמת טקסט בגודל הזה','תצוגת טקסט בגודל הזה'],
['טקסט לדוגמה בגופן הזה','תצוגת טקסט בגופן הזה'],
['טקסט גוף לדוגמה באתר אמיתי','תצוגת טקסט גוף באתר אמיתי'],
['שורה ראשונה של טקסט לדוגמה','שורה ראשונה בתצוגת הטקסט'],
['טקסט גוף לדוגמה במערכת טיפוגרפית מלאה','תצוגת טקסט גוף במערכת טיפוגרפית מלאה']
];
function clean(x){if(typeof x==='string'){for(const [a,b] of reps)x=x.split(a).join(b);return x}if(Array.isArray(x))return x.map(clean);if(x&&typeof x==='object'){for(const k of Object.keys(x))x[k]=clean(x[k]);return x}return x}
let changed=0;
for(const f of files){if(!fs.existsSync(f))continue;const before=fs.readFileSync(f,'utf8');const data=clean(JSON.parse(before));const after=JSON.stringify(data,null,2)+'\n';if(after!==before){fs.writeFileSync(f,after);changed++;console.log('CLEANED '+f)}else console.log('UNCHANGED '+f)}
console.log('DATA_TRUTH_CLEAN_DONE changed='+changed);
