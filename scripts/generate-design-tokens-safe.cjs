const fs = require('fs');

// CONTENT_ONLY_REAL
// Safe generator for colors Smart Builder.
// This file only refreshes design-tokens.json.
// It never overwrites smart-builder.html, smart-builder.css, smart-builder.js, index.html, or QA files.

const now = new Date().toISOString();

function hslFromHex(hex) {
  const raw = hex.replace('#', '');
  const r = parseInt(raw.slice(0, 2), 16) / 255;
  const g = parseInt(raw.slice(2, 4), 16) / 255;
  const b = parseInt(raw.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6;
  }
  return `hsl(${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%)`;
}

function contrast(hex) {
  const raw = hex.replace('#', '');
  const r = parseInt(raw.slice(0, 2), 16);
  const g = parseInt(raw.slice(2, 4), 16);
  const b = parseInt(raw.slice(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 145 ? '#0F172A' : '#FFFFFF';
}

function slug(value) {
  return String(value).trim().replaceAll(' ', '-').replace(/[^\u0590-\u05FFa-zA-Z0-9-]/g, '').replace(/-+/g, '-');
}

function realPrompt(text) {
  return `${text} שמור על עברית RTL מלאה, התאמה לנייד ולמחשב, ניגודיות טובה, ללא גלילה אופקית, תוכן אמיתי בלבד, והפרדה בין HTML, CSS ו-JavaScript.`;
}

const tokens = [];
function add(token) {
  token.copy = { prompt: token.prompt, css: token.css || '', value: token.value || '', id: token.id };
  tokens.push(token);
}

const palettes = [
  ['כחול פרימיום חינוכי', ['כחול', 'חינוכי', 'מתמטיקה', 'פרימיום'], ['#0F172A', '#1E3A8A', '#2563EB', '#38BDF8', '#F8FAFC']],
  ['שמנת וזהב יוקרתי', ['זהב', 'שמנת', 'יוקרתי', 'פרימיום'], ['#111827', '#3B2F2F', '#D4AF37', '#EADBC8', '#FFF7ED']],
  ['ירוק למידה רגוע', ['ירוק', 'למידה', 'הצלחה'], ['#052E16', '#14532D', '#22C55E', '#86EFAC', '#F0FDF4']],
  ['סגול AI טכנולוגי', ['סגול', 'AI', 'טכנולוגי'], ['#1F1147', '#4C1D95', '#7C3AED', '#A78BFA', '#F5F3FF']],
  ['כהה שליטה ובקרה', ['כהה', 'דשבורד', 'ניהול'], ['#020617', '#0F172A', '#334155', '#22D3EE', '#F8FAFC']],
  ['ילדים צבעוני נקי', ['ילדים', 'צבעוני', 'למידה'], ['#2563EB', '#22C55E', '#FACC15', '#FB7185', '#F8FAFC']],
  ['אפור רשמי נקי', ['רשמי', 'טבלאות', 'דוחות'], ['#0F172A', '#334155', '#64748B', '#CBD5E1', '#F8FAFC']],
  ['כתום פעולה אנרגטי', ['כתום', 'CTA', 'פעולה'], ['#7C2D12', '#EA580C', '#FB923C', '#FED7AA', '#FFF7ED']],
  ['שחור וזהב פרימיום', ['שחור', 'זהב', 'יוקרתי'], ['#050505', '#171717', '#D4AF37', '#F5E7A1', '#FFFFFF']],
  ['תכלת מודרני', ['תכלת', 'מודרני', 'מובייל'], ['#164E63', '#0E7490', '#06B6D4', '#A5F3FC', '#ECFEFF']],
  ['אדום התראה', ['אדום', 'התראה', 'שגיאה'], ['#450A0A', '#991B1B', '#DC2626', '#FECACA', '#FEF2F2']],
  ['טורקיז פוקוס', ['טורקיז', 'פוקוס', 'עבודה'], ['#042F2E', '#0F766E', '#14B8A6', '#99F6E4', '#F0FDFA']]
];

for (const [paletteName, tags, colors] of palettes) {
  colors.forEach((hex, index) => add({
    id: `color-${slug(paletteName)}-${index + 1}`,
    category: 'צבעים',
    type: 'color',
    name: `${paletteName} — ${hex}`,
    value: hex,
    hsl: hslFromHex(hex),
    contrast: contrast(hex),
    use: ['רקע אתר', 'כותרת ראשית', 'כפתור ראשי', 'מסגרת', 'טבלה', ...tags],
    css: `:root{--color-${slug(paletteName)}-${index + 1}:${hex};}`,
    prompt: realPrompt(`השתמש בצבע ${hex} (${hslFromHex(hex)}) באתר החדש. מתאים לשימושים: ${tags.join(', ')}. בחר אותו כרקע, כפתור, כותרת, מסגרת או הדגשה לפי ההקשר.`)
  }));
}

const fonts = ['Heebo', 'Assistant', 'Rubik', 'Noto Sans Hebrew', 'Alef', 'Arimo', 'Varela Round', 'Secular One', 'Frank Ruhl Libre', 'David Libre', 'Open Sans', 'Arial'];
for (const name of fonts) add({
  id: `font-${slug(name.toLowerCase())}`,
  category: 'גופנים',
  type: 'font',
  name,
  value: name,
  use: ['גופן גוף', 'גופן כותרת', 'טיפוגרפיה'],
  css: `${name === 'Arial' ? '' : `@import url('https://fonts.googleapis.com/css2?family=${name.replaceAll(' ', '+')}:wght@400;500;600;700;800&display=swap');\n`}body{font-family:'${name}',Arial,sans-serif;}`,
  prompt: realPrompt(`השתמש בגופן ${name} באתר החדש. טען אותו נכון אם הוא Google Font והוסף fallback של Arial/sans-serif.`)
});

const sizes = [['Caption', '0.75rem', '12px'], ['Small', '0.875rem', '14px'], ['Body', '1rem', '16px'], ['Body Large', '1.125rem', '18px'], ['Card Title', '1.25rem', '20px'], ['Section', '1.5rem', '24px'], ['Page Title', '1.875rem', '30px'], ['Hero Small', '2.25rem', '36px'], ['Hero', '3rem', '48px'], ['Fluid Hero', 'clamp(2rem, 6vw, 4.5rem)', '32px–72px'], ['Fluid Section', 'clamp(1.5rem, 3.5vw, 2.75rem)', '24px–44px'], ['Button Mobile', '1rem', '16px'], ['Table Text', '0.95rem', '15.2px'], ['Form Input', '1rem', '16px']];
for (const [name, value, px] of sizes) add({ id: `size-${slug(name.toLowerCase())}`, category: 'גדלים', type: 'font-size', name, value, px, use: ['גודל טקסט', 'טיפוגרפיה'], css: `font-size:${value};`, prompt: realPrompt(`השתמש בגודל הטקסט ${name}. הערך המדויק: ${value} (${px}).`) });

for (const [name, value] of [['Regular', '400'], ['Medium', '500'], ['SemiBold', '600'], ['Bold', '700'], ['ExtraBold', '800']]) add({ id: `weight-${slug(name.toLowerCase())}`, category: 'משקלי גופן', type: 'font-weight', name, value, use: ['טיפוגרפיה', 'כותרת', 'טקסט'], css: `font-weight:${value};`, prompt: realPrompt(`השתמש במשקל גופן ${name}, ערך CSS מדויק: font-weight:${value}.`) });
for (const [name, value] of [['Tight', '1.05'], ['Normal', '1.45'], ['Readable', '1.65'], ['Table', '1.35'], ['Mobile Comfortable', '1.55']]) add({ id: `line-height-${slug(name.toLowerCase())}`, category: 'גובה שורה', type: 'line-height', name, value, use: ['טיפוגרפיה', 'קריאות'], css: `line-height:${value};`, prompt: realPrompt(`השתמש בגובה שורה ${name}, ערך CSS מדויק: line-height:${value}.`) });

for (const [name, bg, text, border] of [['טבלת RTL נקייה', '#EFF6FF', '#1E3A8A', '#CBD5E1'], ['טבלת תלמידים כחולה', '#DBEAFE', '#1E40AF', '#93C5FD'], ['טבלת פרימיום זהב', '#FFF7ED', '#3B2F2F', '#D4AF37'], ['טבלת דשבורד כהה', '#0F172A', '#F8FAFC', '#334155'], ['טבלת הצלחה ירוקה', '#F0FDF4', '#14532D', '#86EFAC']]) add({ id: `table-${slug(name)}`, category: 'טבלאות', type: 'table', name, value: name, use: ['טבלה', 'דוחות'], css: `.smart-table{width:100%;border-collapse:collapse;direction:rtl}.smart-table th{background:${bg};color:${text}}.smart-table th,.smart-table td{padding:.75rem;border-bottom:1px solid ${border};text-align:right;}`, prompt: realPrompt(`צור ${name}. רקע כותרת ${bg}, צבע טקסט ${text}, גבול ${border}.`) });
for (const [name, bg, text] of [['כפתור העתקה כחול', '#2563EB', '#FFFFFF'], ['כפתור צפייה לבן', '#FFFFFF', '#1E3A8A'], ['כפתור זהב פרימיום', '#D4AF37', '#111827'], ['כפתור כהה', '#111827', '#FFFFFF'], ['כפתור הצלחה', '#059669', '#FFFFFF'], ['כפתור אזהרה', '#F59E0B', '#111827']]) add({ id: `button-${slug(name)}`, category: 'כפתורים', type: 'button', name, value: name, use: ['כפתור', 'העתקה'], css: `.smart-button{background:${bg};color:${text};border:0;border-radius:999px;padding:.85rem 1.1rem;font-weight:800;min-height:46px;}`, prompt: realPrompt(`צור ${name}. רקע ${bg}, טקסט ${text}, radius מלא, padding נוח, min-height 46px.`) });
for (const [name, border, bg, text] of [['מסגרת נקייה', '#CBD5E1', '#FFFFFF', '#0F172A'], ['מסגרת מידע כחולה', '#3B82F6', '#EFF6FF', '#0F172A'], ['מסגרת זהב', '#D4AF37', '#FFF7ED', '#3B2F2F'], ['מסגרת הצלחה', '#22C55E', '#F0FDF4', '#052E16'], ['מסגרת התראה', '#DC2626', '#FEF2F2', '#450A0A']]) add({ id: `frame-${slug(name)}`, category: 'מסגרות', type: 'frame', name, value: name, use: ['מסגרת', 'כרטיס'], css: `.smart-frame{background:${bg};color:${text};border:2px solid ${border};border-radius:22px;padding:1rem;}`, prompt: realPrompt(`צור ${name}. רקע ${bg}, טקסט ${text}, גבול ${border}.`) });

if (tokens.length < 100) throw new Error(`Expected at least 100 design tokens, got ${tokens.length}`);

const data = { generatedAt: now, project: { name: 'colors Smart Builder', version: '3.0.0', language: 'he', dir: 'rtl', truthRule: 'כל token אמיתי, ניתן להעתקה, עם CSS ו-Prompt שימושי.' }, categories: [...new Set(tokens.map((token) => token.category))], uses: [...new Set(tokens.flatMap((token) => token.use))].sort(), tokens };
fs.writeFileSync('design-tokens.json', JSON.stringify(data, null, 2), 'utf8');
console.log('SAFE_DESIGN_TOKENS_GENERATED');
console.log('tokens=' + tokens.length);
console.log('ui_files_overwritten=false');
