(() => {
  const families = [
    { id:'adv-font-heebo', name:'Heebo', css:'Heebo', group:'ממשק מודרני', use:'אתרי מורים, מתמטיקה, מערכות ניהול, כפתורים וכותרות', tone:'מודרני, נקי, ברור, מקצועי' },
    { id:'adv-font-assistant', name:'Assistant', css:'Assistant', group:'קריאות גבוהה', use:'טקסטים ארוכים, דפי מידע, חומרי למידה, מאמרים', tone:'ישראלי, מאוזן, קריא ונעים' },
    { id:'adv-font-rubik', name:'Rubik', css:'Rubik', group:'אפליקציות', use:'אפליקציות Web, כפתורים, כרטיסיות, ממשקים צעירים', tone:'עגול, טכנולוגי, ידידותי' },
    { id:'adv-font-noto', name:'Noto Sans Hebrew', css:'Noto Sans Hebrew', group:'יציבות', use:'אתרים גדולים, טבלאות, ממשקים רב־לשוניים', tone:'יציב, מדויק, מקצועי' },
    { id:'adv-font-alef', name:'Alef', css:'Alef', group:'עברית טבעית', use:'טקסט עברי, הסברים, אתרי תוכן חמים', tone:'ידידותי, עברי, טבעי' },
    { id:'adv-font-arimo', name:'Arimo', css:'Arimo', group:'דוחות וטבלאות', use:'טבלאות, דשבורדים, נתונים, ממשק צפוף', tone:'יעיל, קומפקטי, קריא' },
    { id:'adv-font-varela', name:'Varela Round', css:'Varela Round', group:'רך ונגיש', use:'ילדים, כפתורים, ממשק רך, אתרי למידה קלילים', tone:'רך, עגול, נעים' },
    { id:'adv-font-secular', name:'Secular One', css:'Secular One', group:'כותרות חזקות', use:'Hero, פתיחים, כותרות גדולות וקצרות', tone:'בולט, ישראלי, חזק' },
    { id:'adv-font-frank', name:'Frank Ruhl Libre', css:'Frank Ruhl Libre', group:'יוקרתי', use:'דפי תוכן יוקרתיים, כותרות רשמיות, אתרי פרימיום', tone:'אלגנטי, רציני, ספרותי' },
    { id:'adv-font-david', name:'David Libre', css:'David Libre', group:'קלאסי', use:'מסמכים, תוכן רשמי, עיצוב עברי מסורתי', tone:'קלאסי, רשמי, עברי' },
    { id:'adv-font-open-sans', name:'Open Sans', css:'Open Sans', group:'כללי בטוח', use:'אתרים כלליים, ממשקים פשוטים, גיבוי נוח', tone:'פשוט, מוכר, בטוח' },
    { id:'adv-font-system', name:'System UI / Arial', css:'Arial', group:'גיבוי מהיר', use:'גיבוי לכל אתר, טעינה מהירה, תאימות מלאה', tone:'יציב, אוניברסלי, מהיר' }
  ];

  const scale = [
    { id:'adv-size-caption', name:'Caption / תווית', value:'0.75rem', px:'12px', use:'תוויות קטנות, metadata, תגיות' },
    { id:'adv-size-small', name:'Small / טקסט קטן', value:'0.875rem', px:'14px', use:'הערות, תיאור קצר, כפתור קטן' },
    { id:'adv-size-body', name:'Body / גוף רגיל', value:'1rem', px:'16px', use:'טקסט גוף רגיל ונוח ברוב האתרים' },
    { id:'adv-size-body-lg', name:'Body Large / גוף גדול', value:'1.125rem', px:'18px', use:'פסקאות פתיחה, מובייל, קריאות מוגברת' },
    { id:'adv-size-card-title', name:'Card Title / כותרת כרטיס', value:'1.25rem', px:'20px', use:'כותרות בתוך כרטיסים ורכיבים' },
    { id:'adv-size-section', name:'Section / כותרת אזור', value:'1.5rem', px:'24px', use:'כותרות אזורים בתוך דף' },
    { id:'adv-size-page-title', name:'Page Title / כותרת עמוד', value:'1.875rem', px:'30px', use:'כותרת עמוד רגילה' },
    { id:'adv-size-hero-sm', name:'Hero Small / הירו קטן', value:'2.25rem', px:'36px', use:'כותרת פתיחה בדף קצר' },
    { id:'adv-size-hero', name:'Hero / הירו רגיל', value:'3rem', px:'48px', use:'כותרת ראשית במחשב/טאבלט' },
    { id:'adv-size-hero-fluid', name:'Fluid Hero / הירו רספונסיבי', value:'clamp(2rem, 6vw, 4.5rem)', px:'32px–72px', use:'כותרת ראשית שמתאימה אוטומטית לטלפון ולמחשב' },
    { id:'adv-size-section-fluid', name:'Fluid Section / אזור רספונסיבי', value:'clamp(1.5rem, 3.5vw, 2.75rem)', px:'24px–44px', use:'כותרת אזור דינמית לכל מסך' },
    { id:'adv-size-button', name:'Button / כפתור', value:'1rem', px:'16px', use:'כפתור ברור ונוח לאצבע' },
    { id:'adv-size-table', name:'Table / טבלה', value:'0.95rem', px:'15.2px', use:'טבלאות קריאות וצפופות' },
    { id:'adv-size-form', name:'Form / שדות טופס', value:'1rem', px:'16px', use:'קלטים, חיפוש ושדות טופס' }
  ];

  const weights = [
    { id:'adv-weight-regular', name:'Regular', value:'400', use:'טקסט גוף רגיל' },
    { id:'adv-weight-medium', name:'Medium', value:'500', use:'תוויות, כפתורים עדינים' },
    { id:'adv-weight-semibold', name:'SemiBold', value:'600', use:'כותרות משנה, כפתורים' },
    { id:'adv-weight-bold', name:'Bold', value:'700', use:'כותרות, הדגשות' },
    { id:'adv-weight-black', name:'ExtraBold / Black', value:'800', use:'Hero וכותרות חזקות' }
  ];

  const leading = [
    { id:'adv-leading-tight', name:'צפוף לכותרות', value:'1.05', use:'כותרות גדולות ו־Hero' },
    { id:'adv-leading-normal', name:'רגיל', value:'1.45', use:'טקסט רגיל וכרטיסיות' },
    { id:'adv-leading-readable', name:'קריא במיוחד', value:'1.65', use:'טקסטים ארוכים והסברים' },
    { id:'adv-leading-table', name:'טבלאות', value:'1.35', use:'תאים, דוחות וטבלאות' }
  ];

  const systems = [
    { id:'adv-system-math-premium', name:'מערכת מתמטיקה פרימיום', font:'Heebo', hero:'clamp(2rem, 6vw, 4.5rem)', heading:'1.875rem', body:'1rem', weight:'800', line:'1.55', use:'אתרי מתמטיקה, דפי עבודה, מערכות מורים' },
    { id:'adv-system-clean-reading', name:'מערכת קריאה נקייה', font:'Assistant', hero:'clamp(1.8rem, 4vw, 3rem)', heading:'1.5rem', body:'1.0625rem', weight:'700', line:'1.7', use:'דפי מידע, מאמרים, הסברים' },
    { id:'adv-system-mobile-app', name:'מערכת אפליקציה לנייד', font:'Rubik', hero:'clamp(1.75rem, 5vw, 3rem)', heading:'1.4rem', body:'1rem', weight:'700', line:'1.5', use:'אפליקציות Web, כרטיסיות, כפתורים גדולים' },
    { id:'adv-system-dashboard', name:'מערכת דשבורד וטבלאות', font:'Arimo', hero:'2rem', heading:'1.35rem', body:'0.95rem', weight:'700', line:'1.35', use:'דוחות, טבלאות, מערכות ניהול' },
    { id:'adv-system-luxury', name:'מערכת יוקרתית', font:'Frank Ruhl Libre', hero:'clamp(2rem, 5vw, 4rem)', heading:'1.7rem', body:'1.0625rem', weight:'700', line:'1.65', use:'אתרי פרימיום, תוכן רשמי, כותרות אלגנטיות' },
    { id:'adv-system-kids-soft', name:'מערכת ילדים רכה', font:'Varela Round', hero:'clamp(1.8rem, 5vw, 3.5rem)', heading:'1.45rem', body:'1.05rem', weight:'700', line:'1.55', use:'אתרי ילדים, למידה קלילה, משימות צבעוניות' }
  ];

  const importCss = (font) => font.name.includes('System') || font.css === 'Arial' ? '' : `@import url('https://fonts.googleapis.com/css2?family=${font.css.replaceAll(' ', '+')}:wght@400;500;600;700;800&display=swap');`;
  const fontPrompt = (f) => `השתמש בגופן ${f.name} באתר החדש. שימוש מומלץ: ${f.use}. תחושה עיצובית: ${f.tone}. טען את הגופן אם הוא מ-Google Fonts, והוסף fallback: Arial, sans-serif. שמור על עברית RTL מלאה, קריאות גבוהה, התאמה לנייד ולמחשב, ללא גלילה אופקית, וללא דמו או placeholder. הפרד בין HTML, CSS ו-JavaScript.`;
  const sizePrompt = (s) => `השתמש בגודל טקסט ${s.name}. הערך המדויק: ${s.value} (${s.px}). שימוש מומלץ: ${s.use}. שמור על היררכיית טקסט ברורה, RTL מלא, נייד ומחשב, קריאות גבוהה, ללא דמו או placeholder, והפרדה בין HTML, CSS ו-JavaScript.`;
  const weightPrompt = (w) => `השתמש במשקל גופן ${w.name} בערך font-weight: ${w.value}. שימוש מומלץ: ${w.use}. שמור על RTL, ניגודיות, היררכיית טקסט, וללא דמו או placeholder.`;
  const leadingPrompt = (l) => `השתמש בגובה שורה ${l.name} בערך line-height: ${l.value}. שימוש מומלץ: ${l.use}. שמור על קריאות עברית RTL, במיוחד בנייד, וללא דמו או placeholder.`;
  const systemPrompt = (s) => `השתמש במערכת הטיפוגרפיה ${s.name} באתר החדש. גופן: ${s.font}. Hero: ${s.hero}. כותרות: ${s.heading}. טקסט גוף: ${s.body}. משקל כותרות: ${s.weight}. גובה שורה: ${s.line}. שימוש מומלץ: ${s.use}. יישם היררכיית טקסט מלאה עבור Hero, כותרות, כרטיסיות, טבלאות, כפתורים וטקסט גוף. האתר חייב להיות בעברית RTL מלא, מותאם לנייד ולמחשב, ללא גלילה אופקית, עם קריאות גבוהה, ללא דמו או placeholder, ועם הפרדה בין HTML, CSS ו-JavaScript.`;

  function toast(message, ok = true) {
    const el = document.querySelector('#toast') || document.body.appendChild(Object.assign(document.createElement('div'), { id:'toast', className:'toast' }));
    el.textContent = message;
    el.style.background = ok ? '#052E16' : '#7F1D1D';
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 1800);
  }

  function copy(text, msg) {
    navigator.clipboard.writeText(text).then(() => toast(msg)).catch(() => toast('ההעתקה נכשלה', false));
  }

  function addStyle() {
    if (document.querySelector('#advancedTypographyStyle')) return;
    const style = document.createElement('style');
    style.id = 'advancedTypographyStyle';
    style.textContent = `
      .advanced-type{background:linear-gradient(135deg,#fff,#f8fafc);border:1px solid #cbd5e1;box-shadow:var(--shadow);border-radius:var(--radius);padding:1rem;margin:1rem 0;scroll-margin-top:100px}
      .advanced-type h2{margin:.1rem 0;color:var(--primary);font-size:clamp(1.7rem,4vw,2.8rem)}.advanced-type p{color:var(--muted);line-height:1.6}
      .adv-toolbar{display:flex;gap:.5rem;flex-wrap:wrap;margin:.8rem 0}.adv-toolbar button{border:1px solid var(--border);background:#fff;border-radius:999px;padding:.55rem .8rem;font-weight:900}.adv-toolbar button.active{background:var(--primary);color:#fff;border-color:var(--primary)}
      .adv-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}.adv-card{background:#fff;border:1px solid var(--border);border-radius:22px;padding:1rem;display:grid;gap:.7rem;box-shadow:0 14px 30px rgba(15,23,42,.07)}.adv-card h3{margin:0;font-size:1.08rem}.adv-badge{width:max-content;background:#eff6ff;color:var(--primary);border-radius:999px;padding:.2rem .55rem;font-size:.78rem;font-weight:900}.adv-sample{background:#f8fafc;border:1px solid var(--border);border-radius:18px;padding:.8rem}.adv-code{direction:ltr;text-align:left;background:#020617;color:#a7f3d0;border-radius:14px;padding:.55rem;overflow:auto;font-size:.82rem}.adv-actions{display:grid;grid-template-columns:1fr 1fr;gap:.45rem}.adv-actions button{border:1px solid var(--border);background:#fff;border-radius:14px;padding:.65rem .5rem;font-weight:900}.adv-actions .main{grid-column:1/-1;background:var(--primary);color:#fff;border-color:var(--primary)}
      @media(max-width:1100px){.adv-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:760px){.adv-grid{grid-template-columns:1fr}.adv-actions{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
  }

  function card(type, item) {
    if (type === 'fonts') {
      const css = `${importCss(item)}\nbody { font-family: '${item.css}', Arial, sans-serif; }`;
      return `<article class="adv-card"><span class="adv-badge">גופן</span><h3>${item.name}</h3><div class="adv-sample" style="font-family:'${item.css}',Arial,sans-serif"><strong>כותרת עברית לדוגמה</strong><br>טקסט אתר אמיתי, ברור ונוח לקריאה.</div><p>${item.use}<br>${item.tone}</p><div class="adv-code">font-family: '${item.css}', Arial, sans-serif;</div><div class="adv-actions"><button class="main" data-adv-copy="${item.id}" data-adv-type="fontPrompt">העתק Prompt לגופן</button><button data-adv-copy="${item.id}" data-adv-type="fontCss">העתק CSS</button><button data-adv-copy="${item.id}" data-adv-type="fontName">העתק שם</button></div></article>`;
    }
    if (type === 'sizes') return `<article class="adv-card"><span class="adv-badge">גודל</span><h3>${item.name}</h3><div class="adv-sample" style="font-size:${item.value}">דוגמת טקסט בגודל הזה</div><p>${item.use}</p><div class="adv-code">font-size: ${item.value}; /* ${item.px} */</div><div class="adv-actions"><button class="main" data-adv-copy="${item.id}" data-adv-type="sizePrompt">העתק Prompt לגודל</button><button data-adv-copy="${item.id}" data-adv-type="sizeCss">העתק CSS</button><button data-adv-copy="${item.id}" data-adv-type="sizeValue">העתק ערך</button></div></article>`;
    if (type === 'weights') return `<article class="adv-card"><span class="adv-badge">משקל</span><h3>${item.name}</h3><div class="adv-sample" style="font-weight:${item.value}">טקסט במשקל ${item.value}</div><p>${item.use}</p><div class="adv-code">font-weight: ${item.value};</div><div class="adv-actions"><button class="main" data-adv-copy="${item.id}" data-adv-type="weightPrompt">העתק Prompt למשקל</button><button data-adv-copy="${item.id}" data-adv-type="weightCss">העתק CSS</button></div></article>`;
    if (type === 'leading') return `<article class="adv-card"><span class="adv-badge">גובה שורה</span><h3>${item.name}</h3><div class="adv-sample" style="line-height:${item.value}">שורה ראשונה של טקסט לדוגמה.<br>שורה שנייה שמראה את הריווח.</div><p>${item.use}</p><div class="adv-code">line-height: ${item.value};</div><div class="adv-actions"><button class="main" data-adv-copy="${item.id}" data-adv-type="leadingPrompt">העתק Prompt לריווח</button><button data-adv-copy="${item.id}" data-adv-type="leadingCss">העתק CSS</button></div></article>`;
    return `<article class="adv-card"><span class="adv-badge">מערכת</span><h3>${item.name}</h3><div class="adv-sample" style="font-family:'${item.font}',Arial,sans-serif"><strong style="font-size:${item.hero};line-height:1.05">Hero</strong><br><b style="font-size:${item.heading}">כותרת אזור</b><br><span style="font-size:${item.body};line-height:${item.line}">טקסט גוף לדוגמה במערכת טיפוגרפית מלאה.</span></div><p>${item.use}</p><div class="adv-code">font:${item.font}; hero:${item.hero}; body:${item.body}; line-height:${item.line};</div><div class="adv-actions"><button class="main" data-adv-copy="${item.id}" data-adv-type="systemPrompt">העתק Prompt מערכת</button><button data-adv-copy="${item.id}" data-adv-type="systemCss">העתק CSS</button></div></article>`;
  }

  function dataset(name) {
    return { fonts:families, sizes:scale, weights, leading, systems }[name] || systems;
  }

  function renderGrid(kind='systems') {
    const grid = document.querySelector('#advancedTypeGrid');
    if (!grid) return;
    grid.innerHTML = dataset(kind).map(x => card(kind, x)).join('');
    document.querySelectorAll('[data-adv-tab]').forEach(b => b.classList.toggle('active', b.dataset.advTab === kind));
  }

  function render() {
    if (document.querySelector('#advancedTypography')) return;
    addStyle();
    const section = document.createElement('section');
    section.id = 'advancedTypography';
    section.className = 'advanced-type';
    section.innerHTML = `<p class="eyebrow">טיפוגרפיה חכמה</p><h2>גופנים, גדלים, משקלים ומערכות טיפוגרפיה</h2><p>שכבה מתקדמת לבחירה והעתקה: Prompt לגופן, Prompt לגודל, CSS, שם גופן, משקל, line-height ומערכת טיפוגרפית מלאה.</p><div class="adv-toolbar"><button data-adv-tab="systems" class="active">מערכות</button><button data-adv-tab="fonts">גופנים</button><button data-adv-tab="sizes">גדלים</button><button data-adv-tab="weights">משקלים</button><button data-adv-tab="leading">גובה שורה</button></div><div id="advancedTypeGrid" class="adv-grid"></div>`;
    const old = document.querySelector('#typographyLab');
    if (old) old.insertAdjacentElement('afterend', section); else document.querySelector('main')?.appendChild(section);
    renderGrid('systems');
  }

  document.addEventListener('click', (e) => {
    const tab = e.target.closest('[data-adv-tab]');
    if (tab) return renderGrid(tab.dataset.advTab);
    const btn = e.target.closest('[data-adv-copy]');
    if (!btn) return;
    const id = btn.dataset.advCopy, t = btn.dataset.advType;
    const all = [...families, ...scale, ...weights, ...leading, ...systems];
    const x = all.find(i => i.id === id);
    if (!x) return;
    const map = {
      fontPrompt: () => fontPrompt(x), fontCss: () => `${importCss(x)}\nbody { font-family: '${x.css}', Arial, sans-serif; }`, fontName: () => x.name,
      sizePrompt: () => sizePrompt(x), sizeCss: () => `font-size: ${x.value}; /* ${x.name}, ${x.px} */`, sizeValue: () => x.value,
      weightPrompt: () => weightPrompt(x), weightCss: () => `font-weight: ${x.value};`,
      leadingPrompt: () => leadingPrompt(x), leadingCss: () => `line-height: ${x.value};`,
      systemPrompt: () => systemPrompt(x), systemCss: () => `body { font-family: '${x.font}', Arial, sans-serif; font-size: ${x.body}; line-height: ${x.line}; }\nh1,.hero-title{font-size:${x.hero};font-weight:${x.weight};line-height:1.05;}\nh2,.section-title{font-size:${x.heading};font-weight:${x.weight};}`
    };
    copy(map[t](), 'הועתק');
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render); else render();
})();
