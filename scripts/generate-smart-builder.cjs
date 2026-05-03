const fs = require("fs");

const now = new Date().toISOString();

function hslFromHex(hex) {
  const raw = hex.replace("#", "");
  const r = parseInt(raw.slice(0,2),16)/255;
  const g = parseInt(raw.slice(2,4),16)/255;
  const b = parseInt(raw.slice(4,6),16)/255;
  const max = Math.max(r,g,b), min = Math.min(r,g,b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > .5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6;
  }
  return `hsl(${Math.round(h*360)} ${Math.round(s*100)}% ${Math.round(l*100)}%)`;
}

function contrast(hex) {
  const raw = hex.replace("#", "");
  const r = parseInt(raw.slice(0,2),16);
  const g = parseInt(raw.slice(2,4),16);
  const b = parseInt(raw.slice(4,6),16);
  const yiq = (r*299 + g*587 + b*114) / 1000;
  return yiq >= 145 ? "#0F172A" : "#FFFFFF";
}

function promptBase(text) {
  return `${text} שמור על עברית RTL מלאה, התאמה לנייד ולמחשב, ניגודיות טובה, ללא גלילה אופקית, ללא דמו או placeholder, והפרדה בין HTML, CSS ו-JavaScript.`;
}

const palettes = [
  {name:"כחול פרימיום חינוכי", tags:["כחול","חינוכי","מתמטיקה","פרימיום"], colors:["#0F172A","#1E3A8A","#2563EB","#38BDF8","#F8FAFC"]},
  {name:"שמנת וזהב יוקרתי", tags:["זהב","שמנת","יוקרתי","פרימיום"], colors:["#111827","#3B2F2F","#D4AF37","#EADBC8","#FFF7ED"]},
  {name:"ירוק למידה רגוע", tags:["ירוק","למידה","הצלחה"], colors:["#052E16","#14532D","#22C55E","#86EFAC","#F0FDF4"]},
  {name:"סגול AI טכנולוגי", tags:["סגול","AI","טכנולוגי"], colors:["#1F1147","#4C1D95","#7C3AED","#A78BFA","#F5F3FF"]},
  {name:"כהה שליטה ובקרה", tags:["כהה","דשבורד","ניהול"], colors:["#020617","#0F172A","#334155","#22D3EE","#F8FAFC"]},
  {name:"ילדים צבעוני נקי", tags:["ילדים","צבעוני","למידה"], colors:["#2563EB","#22C55E","#FACC15","#FB7185","#F8FAFC"]},
  {name:"אפור רשמי נקי", tags:["רשמי","טבלאות","דוחות"], colors:["#0F172A","#334155","#64748B","#CBD5E1","#F8FAFC"]},
  {name:"כתום פעולה אנרגטי", tags:["כתום","CTA","פעולה"], colors:["#7C2D12","#EA580C","#FB923C","#FED7AA","#FFF7ED"]},
  {name:"שחור וזהב פרימיום", tags:["שחור","זהב","יוקרתי"], colors:["#050505","#171717","#D4AF37","#F5E7A1","#FFFFFF"]},
  {name:"תכלת מודרני", tags:["תכלת","מודרני","מובייל"], colors:["#164E63","#0E7490","#06B6D4","#A5F3FC","#ECFEFF"]},
  {name:"אדום התראה", tags:["אדום","התראה","שגיאה"], colors:["#450A0A","#991B1B","#DC2626","#FECACA","#FEF2F2"]},
  {name:"טורקיז פוקוס", tags:["טורקיז","פוקוס","עבודה"], colors:["#042F2E","#0F766E","#14B8A6","#99F6E4","#F0FDFA"]}
];

const fonts = [
  ["Heebo","ממשקים, אתרי מורים, מתמטיקה, כפתורים וכותרות","מודרני, חד, מקצועי"],
  ["Assistant","טקסטים ארוכים, דפי מידע, חומרי למידה","קריא, ישראלי, נעים"],
  ["Rubik","אפליקציות Web, כפתורים, כרטיסיות","עגול, טכנולוגי, ידידותי"],
  ["Noto Sans Hebrew","אתרים יציבים, טבלאות, רב־לשוני","יציב, מדויק, מקצועי"],
  ["Alef","אתרים עבריים חמים, הסברים, אזורי תוכן","עברית טבעית, ידידותית"],
  ["Arimo","טבלאות, דשבורדים, ממשקים צפופים","יעיל, קומפקטי, קריא"],
  ["Varela Round","ילדים, כפתורים רכים, למידה קלילה","רך, עגול, נעים"],
  ["Secular One","Hero, פתיחים, כותרות גדולות","חזק, ישראלי, בולט"],
  ["Frank Ruhl Libre","כותרות יוקרתיות, תוכן רשמי","אלגנטי, רציני"],
  ["David Libre","מסמכים, תוכן רשמי, עברית קלאסית","קלאסי, רשמי"],
  ["Open Sans","אתרים כלליים וממשקים פשוטים","נקי ובטוח"],
  ["Arial","גיבוי מהיר לכל אתר","יציב ומהיר"]
];

const sizes = [
  ["Caption","0.75rem","12px","תוויות קטנות, metadata, תגיות"],
  ["Small","0.875rem","14px","הערות, תיאור קצר, כפתורים קטנים"],
  ["Body","1rem","16px","טקסט גוף רגיל"],
  ["Body Large","1.125rem","18px","פסקאות פתיחה וקריאות מוגברת"],
  ["Card Title","1.25rem","20px","כותרות כרטיסים"],
  ["Section","1.5rem","24px","כותרות אזור"],
  ["Page Title","1.875rem","30px","כותרת עמוד"],
  ["Hero Small","2.25rem","36px","כותרת פתיחה קטנה"],
  ["Hero","3rem","48px","כותרת ראשית במחשב"],
  ["Fluid Hero","clamp(2rem, 6vw, 4.5rem)","32px–72px","כותרת ראשית רספונסיבית"],
  ["Fluid Section","clamp(1.5rem, 3.5vw, 2.75rem)","24px–44px","כותרת אזור רספונסיבית"],
  ["Button Mobile","1rem","16px","כפתור נוח לאצבע"],
  ["Table Text","0.95rem","15.2px","טבלאות קריאות"],
  ["Form Input","1rem","16px","שדות טופס וחיפוש"]
];

const weights = [
  ["Regular","400","טקסט גוף"],
  ["Medium","500","תוויות וכפתורים עדינים"],
  ["SemiBold","600","כותרות משנה"],
  ["Bold","700","כותרות והדגשות"],
  ["ExtraBold","800","Hero וכותרות חזקות"]
];

const lineHeights = [
  ["Tight","1.05","כותרות גדולות ו-Hero"],
  ["Normal","1.45","טקסט רגיל וכרטיסיות"],
  ["Readable","1.65","טקסטים ארוכים והסברים"],
  ["Table","1.35","תאים, דוחות וטבלאות"],
  ["Mobile Comfortable","1.55","קריאה נוחה בטלפון"]
];

const tableStyles = [
  ["טבלת RTL נקייה","#EFF6FF","#1E3A8A","#CBD5E1","דפי מידע ודוחות"],
  ["טבלת תלמידים כחולה","#DBEAFE","#1E40AF","#93C5FD","תלמידים, ציונים והערות"],
  ["טבלת פרימיום זהב","#FFF7ED","#3B2F2F","#D4AF37","אתר יוקרתי"],
  ["טבלת דשבורד כהה","#0F172A","#F8FAFC","#334155","ניהול וסטטוסים"],
  ["טבלת הצלחה ירוקה","#F0FDF4","#14532D","#86EFAC","משימות והתקדמות"]
];

const buttonStyles = [
  ["כפתור העתקה כחול","#2563EB","#FFFFFF","העתקת Prompt"],
  ["כפתור צפייה לבן","#FFFFFF","#1E3A8A","צפייה מוגדלת"],
  ["כפתור זהב פרימיום","#D4AF37","#111827","אתרי פרימיום"],
  ["כפתור כהה","#111827","#FFFFFF","דשבורד"],
  ["כפתור הצלחה","#059669","#FFFFFF","שמירה ואישור"],
  ["כפתור אזהרה","#F59E0B","#111827","התראות"]
];

const frameStyles = [
  ["מסגרת נקייה","#CBD5E1","#FFFFFF","#0F172A","כרטיס רגיל"],
  ["מסגרת מידע כחולה","#3B82F6","#EFF6FF","#0F172A","טיפ והסבר"],
  ["מסגרת זהב","#D4AF37","#FFF7ED","#3B2F2F","הדגשה יוקרתית"],
  ["מסגרת הצלחה","#22C55E","#F0FDF4","#052E16","סטטוס חיובי"],
  ["מסגרת התראה","#DC2626","#FEF2F2","#450A0A","שגיאה או אזהרה"]
];

const tokens = [];

function add(token) {
  token.copy = {
    prompt: token.prompt,
    css: token.css || "",
    value: token.value || "",
    id: token.id
  };
  tokens.push(token);
}

for (const pal of palettes) {
  pal.colors.forEach((hex, i) => {
    const id = `color-${pal.name.replaceAll(" ","-").replace(/[^\u0590-\u05FFa-zA-Z0-9-]/g,"")}-${i+1}`;
    add({
      id,
      category:"צבעים",
      type:"color",
      name:`${pal.name} — ${hex}`,
      value:hex,
      hsl:hslFromHex(hex),
      contrast:contrast(hex),
      use:["רקע אתר","כותרת ראשית","כפתור ראשי","מסגרת","טבלה",...pal.tags],
      css:`:root{--${id}:${hex};}`,
      prompt:promptBase(`השתמש בצבע ${hex} (${hslFromHex(hex)}) באתר החדש. מתאים לשימושים: ${pal.tags.join(", ")}. בחר אותו כרקע, כפתור, כותרת, מסגרת או הדגשה לפי ההקשר.`)
    });
  });
}

for (const [name,use,tone] of fonts) {
  const id = `font-${name.toLowerCase().replaceAll(" ","-").replaceAll("/","-")}`;
  const importCss = name === "Arial" ? "" : `@import url('https://fonts.googleapis.com/css2?family=${name.replaceAll(" ","+")}:wght@400;500;600;700;800&display=swap');\n`;
  add({
    id,
    category:"גופנים",
    type:"font",
    name,
    value:name,
    use:["גופן גוף","גופן כותרת","טיפוגרפיה",use],
    css:`${importCss}body{font-family:'${name}',Arial,sans-serif;}`,
    prompt:promptBase(`השתמש בגופן ${name} באתר החדש. שימוש מומלץ: ${use}. תחושה עיצובית: ${tone}. טען אותו נכון אם הוא Google Font והוסף fallback של Arial/sans-serif.`)
  });
}

for (const [name,value,px,use] of sizes) {
  const id = `size-${name.toLowerCase().replaceAll(" ","-")}`;
  add({
    id,
    category:"גדלים",
    type:"font-size",
    name,
    value,
    px,
    use:["גודל טקסט","טיפוגרפיה",use],
    css:`font-size:${value};`,
    prompt:promptBase(`השתמש בגודל הטקסט ${name}. הערך המדויק: ${value} (${px}). שימוש מומלץ: ${use}.`)
  });
}

for (const [name,value,use] of weights) {
  const id = `weight-${name.toLowerCase()}`;
  add({
    id,
    category:"משקלי גופן",
    type:"font-weight",
    name,
    value,
    use:["טיפוגרפיה","כותרת","טקסט",use],
    css:`font-weight:${value};`,
    prompt:promptBase(`השתמש במשקל גופן ${name}, ערך CSS מדויק: font-weight:${value}. שימוש מומלץ: ${use}.`)
  });
}

for (const [name,value,use] of lineHeights) {
  const id = `line-height-${name.toLowerCase().replaceAll(" ","-")}`;
  add({
    id,
    category:"גובה שורה",
    type:"line-height",
    name,
    value,
    use:["טיפוגרפיה","קריאות",use],
    css:`line-height:${value};`,
    prompt:promptBase(`השתמש בגובה שורה ${name}, ערך CSS מדויק: line-height:${value}. שימוש מומלץ: ${use}.`)
  });
}

for (const [name,bg,text,border,use] of tableStyles) {
  const id = `table-${name.replaceAll(" ","-")}`;
  add({
    id,
    category:"טבלאות",
    type:"table",
    name,
    value:name,
    use:["טבלה",use],
    css:`.smart-table{width:100%;border-collapse:collapse;direction:rtl}.smart-table th{background:${bg};color:${text}}.smart-table th,.smart-table td{padding:.75rem;border-bottom:1px solid ${border};text-align:right;}`,
    prompt:promptBase(`צור ${name}. רקע כותרת ${bg}, צבע טקסט ${text}, גבול ${border}. שימוש מומלץ: ${use}.`)
  });
}

for (const [name,bg,text,use] of buttonStyles) {
  const id = `button-${name.replaceAll(" ","-")}`;
  add({
    id,
    category:"כפתורים",
    type:"button",
    name,
    value:name,
    use:["כפתור",use],
    css:`.smart-button{background:${bg};color:${text};border:0;border-radius:999px;padding:.85rem 1.1rem;font-weight:800;min-height:46px;}`,
    prompt:promptBase(`צור ${name}. רקע ${bg}, טקסט ${text}, radius מלא, padding נוח, min-height 46px. שימוש מומלץ: ${use}.`)
  });
}

for (const [name,border,bg,text,use] of frameStyles) {
  const id = `frame-${name.replaceAll(" ","-")}`;
  add({
    id,
    category:"מסגרות",
    type:"frame",
    name,
    value:name,
    use:["מסגרת","כרטיס",use],
    css:`.smart-frame{background:${bg};color:${text};border:2px solid ${border};border-radius:22px;padding:1rem;}`,
    prompt:promptBase(`צור ${name}. רקע ${bg}, טקסט ${text}, גבול ${border}. שימוש מומלץ: ${use}.`)
  });
}

const systems = [
  ["מערכת אתר מתמטיקה פרימיום","Heebo","clamp(2rem,6vw,4.5rem)","1rem","#1E3A8A","#2563EB","אתרי מתמטיקה ומורים"],
  ["מערכת דף מידע יוקרתי","Frank Ruhl Libre","clamp(2rem,5vw,4rem)","1.0625rem","#3B2F2F","#D4AF37","אתרי פרימיום"],
  ["מערכת אפליקציה לנייד","Rubik","clamp(1.75rem,5vw,3rem)","1rem","#0E7490","#06B6D4","כלי עבודה בטלפון"],
  ["מערכת דשבורד כהה","Arimo","2rem","0.95rem","#020617","#22D3EE","ניהול וסטטוסים"],
  ["מערכת ילדים רכה","Varela Round","clamp(1.8rem,5vw,3.5rem)","1.05rem","#2563EB","#FACC15","אתרי ילדים ולמידה"]
];

for (const [name,font,hero,body,bg,accent,use] of systems) {
  const id = `system-${name.replaceAll(" ","-")}`;
  add({
    id,
    category:"מערכות עיצוב",
    type:"design-system",
    name,
    value:name,
    use:["חבילת סגנון","אתר שלם",use],
    css:`body{font-family:'${font}',Arial,sans-serif;font-size:${body};line-height:1.6}.hero-title{font-size:${hero};font-weight:800;line-height:1.05}.primary{background:${accent};color:#fff}`,
    prompt:promptBase(`השתמש ב-${name} כמערכת עיצוב שלמה. גופן: ${font}. Hero: ${hero}. גוף: ${body}. צבע בסיס: ${bg}. צבע פעולה: ${accent}. שימוש מומלץ: ${use}. יישם את זה באתר שלם: Hero, כותרות, כפתורים, טבלאות, מסגרות וטקסט.`)
  });
}

const data = {
  generatedAt: now,
  project: {
    name:"colors Smart Builder",
    version:"2.0.0",
    language:"he",
    dir:"rtl",
    truthRule:"כל token אמיתי, ניתן להעתקה, עם CSS ו-Prompt שימושי."
  },
  categories:[...new Set(tokens.map(t => t.category))],
  uses:[...new Set(tokens.flatMap(t => t.use))].sort(),
  tokens
};

fs.writeFileSync("design-tokens.json", JSON.stringify(data,null,2), "utf8");

fs.writeFileSync("smart-builder.html", `<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Smart Builder — colors</title>
<link rel="stylesheet" href="smart-builder.css">
</head>
<body>
<header class="sb-header">
  <div><h1>Smart Builder</h1><p>בחר עיצוב → העתק Prompt → GPT בונה</p></div>
  <nav><a href="index.html">colors</a><a href="qa-mobile.html">בדיקה</a></nav>
</header>
<main>
<section class="hero"><h2>Design Prompt Builder אמיתי</h2><p>צבעים, גופנים, גדלים, טבלאות, כפתורים, מסגרות ומערכות עיצוב — עם העתקה מהירה ל-GPT.</p></section>
<section class="controls"><input id="q" placeholder="חיפוש: רקע, גופן, כפתור, טבלה, מתמטיקה..."><div id="cats"></div><div id="uses"></div></section>
<section id="stats" class="stats"></section>
<section id="grid" class="grid"></section>
</main>
<div id="toast" class="toast"></div>
<script src="smart-builder.js"></script>
</body>
</html>`, "utf8");

fs.writeFileSync("smart-builder.css", `@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@400;600;800;900&display=swap');
:root{--bg:#f8fafc;--surface:#fff;--text:#0f172a;--muted:#64748b;--primary:#1e3a8a;--border:#cbd5e1;--shadow:0 18px 45px rgba(15,23,42,.1)}
*{box-sizing:border-box}body{margin:0;font-family:Heebo,Arial,sans-serif;background:radial-gradient(circle at top right,rgba(37,99,235,.12),transparent 24rem),var(--bg);color:var(--text);direction:rtl}
.sb-header{position:sticky;top:0;z-index:10;background:rgba(2,6,23,.94);color:#fff;padding:1rem;display:flex;justify-content:space-between;gap:1rem;align-items:center;backdrop-filter:blur(12px)}.sb-header h1{margin:0}.sb-header p{margin:.2rem 0;color:#cbd5e1}.sb-header nav{display:flex;gap:.5rem}.sb-header a{color:#fff;text-decoration:none;background:rgba(255,255,255,.1);padding:.55rem .8rem;border-radius:999px}
main{width:min(1450px,100%);margin:auto;padding:1rem}.hero,.controls,.stats,.card{background:var(--surface);border:1px solid var(--border);border-radius:24px;box-shadow:var(--shadow);padding:1rem;margin-bottom:1rem}.hero h2{font-size:clamp(2rem,6vw,4rem);line-height:1;margin:.2rem 0}.hero p,.meta{color:var(--muted);line-height:1.6}
.controls{display:grid;gap:.75rem}#q{width:100%;border:1px solid var(--border);border-radius:999px;padding:1rem;font:inherit}.chips{display:flex;gap:.45rem;flex-wrap:wrap}.chip{border:1px solid var(--border);background:#fff;border-radius:999px;padding:.45rem .7rem;font-weight:800}.chip.active{background:var(--primary);color:#fff;border-color:var(--primary)}
.stats{display:flex;gap:.6rem;flex-wrap:wrap}.stat{background:#eff6ff;color:var(--primary);padding:.55rem .75rem;border-radius:16px;font-weight:900}
.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}.card{display:grid;gap:.75rem}.badge{width:max-content;background:#eff6ff;color:var(--primary);border-radius:999px;padding:.2rem .55rem;font-weight:900;font-size:.78rem}.card h3{margin:0}.preview{border:1px solid var(--border);background:#f8fafc;border-radius:18px;padding:.85rem;min-height:84px}.code{direction:ltr;text-align:left;background:#020617;color:#a7f3d0;border-radius:14px;padding:.6rem;overflow:auto;font-size:.82rem}.actions{display:grid;grid-template-columns:1fr 1fr;gap:.45rem}.actions button{border:1px solid var(--border);border-radius:14px;background:#fff;padding:.7rem;font-weight:900}.actions .main{grid-column:1/-1;background:var(--primary);color:#fff;border-color:var(--primary)}
.toast{position:fixed;left:1rem;bottom:1rem;background:#052e16;color:#fff;border-radius:16px;padding:.85rem 1rem;box-shadow:var(--shadow);opacity:0;transform:translateY(8px);transition:.2s}.toast.show{opacity:1;transform:translateY(0)}
@media(max-width:1100px){.grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:760px){.sb-header{display:grid}.grid{grid-template-columns:1fr}.actions{grid-template-columns:1fr}}
`, "utf8");

fs.writeFileSync("smart-builder.js", `const state={data:null,cat:'הכול',use:'הכול',q:''};
const $=s=>document.querySelector(s);
function toast(m,ok=true){const t=$('#toast');t.textContent=m;t.style.background=ok?'#052E16':'#7F1D1D';t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800)}
async function copy(txt,msg){try{await navigator.clipboard.writeText(txt||'');toast(msg)}catch(e){toast('ההעתקה נכשלה',false)}}
function match(t){const q=state.q.trim().toLowerCase();const hay=[t.id,t.name,t.category,t.type,t.value,...(t.use||[])].join(' ').toLowerCase();return (state.cat==='הכול'||t.category===state.cat)&&(state.use==='הכול'||(t.use||[]).includes(state.use))&&(!q||hay.includes(q))}
function preview(t){if(t.type==='color')return '<div class="preview" style="background:'+t.value+';color:'+t.contrast+'"><b>'+t.value+'</b><br>'+t.hsl+'</div>';if(t.type==='font')return '<div class="preview" style="font-family:'+t.value+',Arial,sans-serif"><b>כותרת בעברית</b><br>טקסט לדוגמה בגופן הזה.</div>';if(t.type==='font-size')return '<div class="preview" style="font-size:'+t.value+'">דוגמת טקסט בגודל הזה</div>';return '<div class="preview">'+t.name+'<br><span class="meta">'+(t.use||[]).slice(0,4).join(' · ')+'</span></div>'}
function card(t){return '<article class="card"><span class="badge">'+t.category+'</span><h3>'+t.name+'</h3>'+preview(t)+'<div class="meta">'+(t.use||[]).join(' · ')+'</div><div class="code">'+(t.css||t.value||'')+'</div><div class="actions"><button class="main" data-copy="prompt" data-id="'+t.id+'">העתק Prompt ל-GPT</button><button data-copy="css" data-id="'+t.id+'">העתק CSS</button><button data-copy="value" data-id="'+t.id+'">העתק ערך</button></div></article>'}
function render(){const list=state.data.tokens.filter(match);$('#stats').innerHTML='<div class="stat">tokens: '+state.data.tokens.length+'</div><div class="stat">מוצגים: '+list.length+'</div><div class="stat">קטגוריות: '+state.data.categories.length+'</div>';$('#grid').innerHTML=list.map(card).join('')}
function chips(el,items,key){$(el).innerHTML=['הכול',...items].map(x=>'<button class="chip '+(state[key]===x?'active':'')+'" data-'+key+'="'+x+'">'+x+'</button>').join('')}
async function init(){state.data=await fetch('design-tokens.json',{cache:'no-store'}).then(r=>r.json());chips('#cats',state.data.categories,'cat');chips('#uses',state.data.uses.slice(0,28),'use');render();document.body.addEventListener('click',e=>{const c=e.target.closest('[data-cat]');if(c){state.cat=c.dataset.cat;chips('#cats',state.data.categories,'cat');render()}const u=e.target.closest('[data-use]');if(u){state.use=u.dataset.use;chips('#uses',state.data.uses.slice(0,28),'use');render()}const b=e.target.closest('[data-copy]');if(b){const t=state.data.tokens.find(x=>x.id===b.dataset.id);copy(t.copy[b.dataset.copy]||'',b.dataset.copy==='prompt'?'הועתק Prompt':'הועתק')}});$('#q').addEventListener('input',e=>{state.q=e.target.value;render()})}
init().catch(e=>toast('שגיאה בטעינת Smart Builder',false));
`, "utf8");

fs.writeFileSync("docs/SMART_BUILDER_SPEC.md", `# SMART_BUILDER_SPEC

נוצר אוטומטית: ${now}

Smart Builder הוא שכבת בחירה חכמה מעל colors.

הוא כולל:
- design-tokens.json כמקור נתונים מרכזי.
- smart-builder.html להצגה נוחה.
- smart-builder.css לעיצוב RTL ונייד.
- smart-builder.js לחיפוש, סינון והעתקה.

הוא אינו מחליף את האתר הראשי. הוא מוסיף מסלול נוח יותר:
בחר שימוש → בחר token → העתק Prompt/CSS/ערך → הדבק ל-GPT.
`, "utf8");

console.log("SMART_BUILDER_GENERATED");
console.log("tokens="+tokens.length);
console.log("categories="+data.categories.length);
console.log("uses="+data.uses.length);
