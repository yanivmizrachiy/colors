(() => {
  const fonts = [
    { id: 'font-heebo-premium', name: 'Heebo', cssName: 'Heebo', importName: 'Heebo', use: 'ממשקים, כותרות, אתרי מורים, מערכות ניהול', tone: 'מודרני, חד, נקי ומקצועי' },
    { id: 'font-assistant-clean', name: 'Assistant', cssName: 'Assistant', importName: 'Assistant', use: 'טקסטים ארוכים, דפי מידע, חומרי למידה', tone: 'קריא, ישראלי, נעים ומאוזן' },
    { id: 'font-rubik-modern', name: 'Rubik', cssName: 'Rubik', importName: 'Rubik', use: 'כפתורים, כרטיסיות, אפליקציות, אתרים צעירים', tone: 'עגול, טכנולוגי, ידידותי ומודרני' },
    { id: 'font-noto-hebrew-stable', name: 'Noto Sans Hebrew', cssName: 'Noto Sans Hebrew', importName: 'Noto Sans Hebrew', use: 'אתרים יציבים, טבלאות, ממשקים רב־לשוניים', tone: 'מדויק, יציב, קריא ורשמי' },
    { id: 'font-alef-friendly', name: 'Alef', cssName: 'Alef', importName: 'Alef', use: 'אתרים עבריים חמים, הסברים, אזורי תוכן', tone: 'עברית טבעית, ידידותית וקריאה' },
    { id: 'font-open-sans-hebrew', name: 'Open Sans Hebrew / Open Sans', cssName: 'Open Sans', importName: 'Open Sans', use: 'ממשקים כלליים, טקסטים, מערכות מידע', tone: 'פשוט, מוכר, נקי ובטוח' },
    { id: 'font-secular-one-title', name: 'Secular One', cssName: 'Secular One', importName: 'Secular One', use: 'כותרות גדולות, Hero, פתיחים קצרים', tone: 'חזק, ישראלי, בולט וכותרתי' },
    { id: 'font-varela-round-soft', name: 'Varela Round', cssName: 'Varela Round', importName: 'Varela Round', use: 'אתרי ילדים, כפתורים רכים, אפליקציות קלילות', tone: 'עגול, רך, ידידותי ונעים' },
    { id: 'font-frank-ruhl-libre-editorial', name: 'Frank Ruhl Libre', cssName: 'Frank Ruhl Libre', importName: 'Frank Ruhl Libre', use: 'כותרות יוקרתיות, טקסטים רשמיים, דפי תוכן', tone: 'אלגנטי, ספרותי, רציני ויוקרתי' },
    { id: 'font-david-libre-classic', name: 'David Libre', cssName: 'David Libre', importName: 'David Libre', use: 'תוכן רשמי, מסמכים, עיצוב עברי קלאסי', tone: 'קלאסי, עברי, מסודר ורשמי' },
    { id: 'font-arimo-ui', name: 'Arimo', cssName: 'Arimo', importName: 'Arimo', use: 'טבלאות, דוחות, ממשקים צפופים', tone: 'יעיל, קריא, קומפקטי ומקצועי' },
    { id: 'font-system-safe', name: 'System UI / Arial fallback', cssName: 'Arial', importName: null, use: 'גיבוי בטוח לכל אתר ולכל דפדפן', tone: 'מהיר, יציב, אוניברסלי ובטוח' }
  ];

  const sizes = [
    { id: 'size-xs', name: 'טקסט קטן מאוד', value: '0.75rem', px: '12px', use: 'תגיות, תוויות, טקסט עזר קטן' },
    { id: 'size-sm', name: 'טקסט קטן', value: '0.875rem', px: '14px', use: 'הערות, טקסט משני, כפתורים קטנים' },
    { id: 'size-base', name: 'טקסט רגיל', value: '1rem', px: '16px', use: 'טקסט גוף רגיל באתר' },
    { id: 'size-lg', name: 'טקסט גדול', value: '1.125rem', px: '18px', use: 'פתיחים, פסקאות חשובות, מובייל' },
    { id: 'size-xl', name: 'כותרת קטנה', value: '1.25rem', px: '20px', use: 'כותרות כרטיסים ואזורים קטנים' },
    { id: 'size-2xl', name: 'כותרת אזור', value: '1.5rem', px: '24px', use: 'כותרות אזורים ברורות' },
    { id: 'size-3xl', name: 'כותרת עמוד', value: '1.875rem', px: '30px', use: 'כותרת עמוד רגילה' },
    { id: 'size-4xl', name: 'כותרת גדולה', value: '2.25rem', px: '36px', use: 'Hero קטן / כותרת פתיחה' },
    { id: 'size-5xl', name: 'Hero גדול', value: '3rem', px: '48px', use: 'כותרת Hero במחשב ובטאבלט' },
    { id: 'size-fluid-hero', name: 'Hero רספונסיבי', value: 'clamp(2rem, 6vw, 4.5rem)', px: '32px–72px', use: 'כותרת ראשית שמותאמת אוטומטית לנייד ולמחשב' },
    { id: 'size-fluid-section', name: 'כותרת רספונסיבית לאזור', value: 'clamp(1.5rem, 3.5vw, 2.75rem)', px: '24px–44px', use: 'כותרת אזור שמתאימה למסכים שונים' },
    { id: 'size-button-mobile', name: 'גודל כפתור נייד', value: '1rem', px: '16px', use: 'כפתורים נוחים לאצבע בטלפון' }
  ];

  const pairings = [
    { id: 'type-pair-edu-premium', name: 'חינוך פרימיום', font: 'Heebo', heading: 'clamp(2rem, 6vw, 4.5rem)', body: '1rem', use: 'אתרי מתמטיקה, מורים ומערכות לימוד' },
    { id: 'type-pair-clean-content', name: 'תוכן נקי וקריא', font: 'Assistant', heading: 'clamp(1.8rem, 4vw, 3rem)', body: '1.0625rem', use: 'דפי מידע, מאמרים, הסברים' },
    { id: 'type-pair-mobile-tool', name: 'אפליקציית כלי לטלפון', font: 'Rubik', heading: 'clamp(1.75rem, 5vw, 3rem)', body: '1rem', use: 'אפליקציות Web, כפתורים, כרטיסיות' },
    { id: 'type-pair-luxury-editorial', name: 'יוקרתי/תוכן רשמי', font: 'Frank Ruhl Libre', heading: 'clamp(2rem, 5vw, 4rem)', body: '1.0625rem', use: 'אתרים אלגנטיים, מסמכים, עמודי תוכן' },
    { id: 'type-pair-table-dashboard', name: 'טבלאות ודשבורד', font: 'Arimo', heading: '1.75rem', body: '0.95rem', use: 'טבלאות, נתונים, מערכות ניהול' }
  ];

  const googleImport = (font) => font.importName ? `@import url('https://fonts.googleapis.com/css2?family=${font.importName.replaceAll(' ', '+')}:wght@400;600;800&display=swap');` : '';
  const fontCss = (font) => `${googleImport(font)}\nbody { font-family: '${font.cssName}', Arial, sans-serif; }`;
  const promptFont = (font) => `השתמש בגופן '${font.name}' באתר החדש. שימוש מומלץ: ${font.use}. התחושה העיצובית: ${font.tone}. שמור על עברית RTL מלאה, התאמה לנייד ולמחשב, קריאות גבוהה, ריווח שורות נוח, ניגודיות טובה, וללא דמו או placeholder. הפרד בין HTML, CSS ו-JavaScript. אם אתה משתמש ב-Google Fonts, טען את הגופן בצורה תקינה והוסף fallback של Arial/sans-serif.`;
  const promptSize = (size) => `השתמש בגודל הטקסט '${size.name}' באתר החדש. הערך המדויק הוא ${size.value} (${size.px}). שימוש מומלץ: ${size.use}. שמור על טיפוגרפיה עברית RTL מלאה, התאמה לנייד ולמחשב, קריאות גבוהה, היררכיית כותרות ברורה, וללא דמו או placeholder. הפרד בין HTML, CSS ו-JavaScript.`;
  const promptPair = (pair) => `השתמש במערכת הטיפוגרפיה '${pair.name}' באתר החדש. גופן ראשי: ${pair.font}. גודל כותרת: ${pair.heading}. גודל גוף: ${pair.body}. שימוש מומלץ: ${pair.use}. בנה היררכיית טקסט מלאה: Hero, כותרות אזור, כרטיסיות, טבלאות, כפתורים וטקסט גוף. שמור על RTL מלא, התאמה לנייד, קריאות גבוהה, ללא גלילה אופקית, ללא דמו או placeholder, והפרדה בין HTML, CSS ו-JavaScript.`;

  function copy(text, message = 'הועתק בהצלחה') {
    navigator.clipboard.writeText(text).then(() => showToast(message)).catch(() => showToast('ההעתקה נכשלה — אפשר לסמן ולהעתיק ידנית', false));
  }

  function showToast(message, ok = true) {
    let toast = document.querySelector('#toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.background = ok ? '#052E16' : '#7F1D1D';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2200);
  }

  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .typography-lab{background:linear-gradient(135deg,#fff,#eff6ff);border:1px solid #bfdbfe;box-shadow:var(--shadow);border-radius:var(--radius);padding:1rem;margin:1rem 0;scroll-margin-top:100px}
      .typography-lab h2{margin:.15rem 0;color:var(--primary);font-size:clamp(1.6rem,4vw,2.6rem)}
      .typography-lab p{color:var(--muted);line-height:1.6}
      .type-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem;margin-top:1rem}
      .type-card{background:white;border:1px solid var(--border);border-radius:22px;padding:1rem;box-shadow:0 14px 30px rgba(15,23,42,.07);display:grid;gap:.7rem}
      .type-card h3{margin:0;font-size:1.1rem}.type-meta{color:var(--muted);font-size:.92rem;line-height:1.5}.type-sample{border:1px solid var(--border);border-radius:18px;background:#f8fafc;padding:.9rem}.type-actions{display:grid;grid-template-columns:1fr 1fr;gap:.45rem}.type-actions button{border:1px solid var(--border);border-radius:14px;background:#fff;padding:.65rem .5rem;font-weight:900}.type-actions .copy-main{grid-column:1/-1;background:var(--primary);color:#fff;border-color:var(--primary)}.type-badge{display:inline-flex;width:max-content;background:#eff6ff;color:var(--primary);border-radius:999px;padding:.22rem .55rem;font-weight:900;font-size:.78rem}.type-value{direction:ltr;text-align:left;background:#020617;color:#a7f3d0;border-radius:14px;padding:.55rem;font-size:.85rem;overflow:auto}
      @media(max-width:1100px){.type-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:760px){.type-grid{grid-template-columns:1fr}.type-actions{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
  }

  function cardFont(font) {
    return `<article class="type-card" id="${font.id}"><span class="type-badge">גופן</span><h3>${font.name}</h3><div class="type-sample" style="font-family:'${font.cssName}',Arial,sans-serif"><strong>כותרת לדוגמה בעברית</strong><br>טקסט אתר קריא, נקי ומותאם לנייד.</div><div class="type-meta">${font.use}<br>${font.tone}</div><div class="type-value">font-family: '${font.cssName}', Arial, sans-serif;</div><div class="type-actions"><button class="copy-main" data-copy-font-prompt="${font.id}">העתק Prompt לגופן</button><button data-copy-font-css="${font.id}">העתק CSS</button><button data-copy-font-name="${font.id}">העתק שם גופן</button></div></article>`;
  }

  function cardSize(size) {
    return `<article class="type-card" id="${size.id}"><span class="type-badge">גודל</span><h3>${size.name}</h3><div class="type-sample" style="font-size:${size.value}">דוגמת טקסט בגודל הזה</div><div class="type-meta">${size.use}</div><div class="type-value">font-size: ${size.value}; /* ${size.px} */</div><div class="type-actions"><button class="copy-main" data-copy-size-prompt="${size.id}">העתק Prompt לגודל</button><button data-copy-size-css="${size.id}">העתק CSS</button><button data-copy-size-value="${size.id}">העתק ערך</button></div></article>`;
  }

  function cardPair(pair) {
    return `<article class="type-card" id="${pair.id}"><span class="type-badge">שילוב</span><h3>${pair.name}</h3><div class="type-sample" style="font-family:'${pair.font}',Arial,sans-serif"><strong style="font-size:${pair.heading}">כותרת</strong><br><span style="font-size:${pair.body}">טקסט גוף לדוגמה באתר אמיתי.</span></div><div class="type-meta">${pair.use}</div><div class="type-value">font: ${pair.font}; heading: ${pair.heading}; body: ${pair.body};</div><div class="type-actions"><button class="copy-main" data-copy-pair-prompt="${pair.id}">העתק Prompt לשילוב</button><button data-copy-pair-css="${pair.id}">העתק CSS</button></div></article>`;
  }

  function render() {
    if (document.querySelector('#typographyLab')) return;
    injectStyles();
    const section = document.createElement('section');
    section.id = 'typographyLab';
    section.className = 'typography-lab';
    section.innerHTML = `
      <p class="eyebrow">טיפוגרפיה אמיתית</p>
      <h2>גופנים וגדלי טקסט מוכנים להעתקה ל־GPT</h2>
      <p>בחר גופן, גודל או שילוב טיפוגרפי. כל כפתור מעתיק Prompt מדויק ל־GPT או CSS אמיתי לשימוש באתר.</p>
      <h3>גופנים עבריים ושימושיים</h3>
      <div class="type-grid">${fonts.map(cardFont).join('')}</div>
      <h3>גדלי טקסט אמיתיים ושימושיים לאתרי אינטרנט</h3>
      <div class="type-grid">${sizes.map(cardSize).join('')}</div>
      <h3>שילובי טיפוגרפיה מוכנים לאתר שלם</h3>
      <div class="type-grid">${pairings.map(cardPair).join('')}</div>
    `;
    const styleCart = document.querySelector('#styleCart');
    if (styleCart) styleCart.insertAdjacentElement('afterend', section);
    else document.querySelector('main')?.appendChild(section);
  }

  document.addEventListener('click', (event) => {
    const fontPrompt = event.target.closest('[data-copy-font-prompt]');
    if (fontPrompt) return copy(promptFont(fonts.find(f => f.id === fontPrompt.dataset.copyFontPrompt)), 'הועתק Prompt לגופן');
    const fontCssBtn = event.target.closest('[data-copy-font-css]');
    if (fontCssBtn) return copy(fontCss(fonts.find(f => f.id === fontCssBtn.dataset.copyFontCss)), 'הועתק CSS לגופן');
    const fontName = event.target.closest('[data-copy-font-name]');
    if (fontName) return copy(fonts.find(f => f.id === fontName.dataset.copyFontName).name, 'הועתק שם גופן');

    const sizePrompt = event.target.closest('[data-copy-size-prompt]');
    if (sizePrompt) return copy(promptSize(sizes.find(s => s.id === sizePrompt.dataset.copySizePrompt)), 'הועתק Prompt לגודל');
    const sizeCss = event.target.closest('[data-copy-size-css]');
    if (sizeCss) { const s = sizes.find(x => x.id === sizeCss.dataset.copySizeCss); return copy(`font-size: ${s.value}; /* ${s.name}, ${s.px} */`, 'הועתק CSS לגודל'); }
    const sizeValue = event.target.closest('[data-copy-size-value]');
    if (sizeValue) return copy(sizes.find(s => s.id === sizeValue.dataset.copySizeValue).value, 'הועתק ערך גודל');

    const pairPrompt = event.target.closest('[data-copy-pair-prompt]');
    if (pairPrompt) return copy(promptPair(pairings.find(p => p.id === pairPrompt.dataset.copyPairPrompt)), 'הועתק Prompt לשילוב');
    const pairCss = event.target.closest('[data-copy-pair-css]');
    if (pairCss) { const p = pairings.find(x => x.id === pairCss.dataset.copyPairCss); return copy(`body { font-family: '${p.font}', Arial, sans-serif; font-size: ${p.body}; }\nh1, .hero-title { font-size: ${p.heading}; }`, 'הועתק CSS לשילוב'); }
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
  else render();
})();
