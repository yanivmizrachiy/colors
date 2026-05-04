(() => {
  const items = [
    ['adv-system-math-premium','מערכת מתמטיקה פרימיום','מערכות','body{font-family:Heebo,Arial,sans-serif}.hero-title{font-size:clamp(2rem,6vw,4.5rem);font-weight:800}','השתמש במערכת מתמטיקה פרימיום עם RTL מלא, התאמה לנייד ולמחשב, טיפוגרפיה קריאה ותוכן אמיתי בלבד.'],
    ['adv-font-heebo','Heebo','גופנים','body{font-family:Heebo,Arial,sans-serif}','השתמש בגופן Heebo לאתר עברי מודרני, ברור ונוח לקריאה, עם תוכן אמיתי בלבד.'],
    ['adv-size-hero-fluid','Hero רספונסיבי','גדלים','.hero-title{font-size:clamp(2rem,6vw,4.5rem)}','השתמש בגודל Hero רספונסיבי לכותרת ראשית חזקה וברורה באתר RTL.'],
    ['adv-weight-bold','Bold 700','משקלים','.strong-title{font-weight:700}','השתמש ב-font-weight:700 לכותרות והדגשות תוך שמירה על היררכיה ברורה.'],
    ['adv-leading-readable','קריאות גבוהה','גובה שורה','.readable-text{line-height:1.65}','השתמש ב-line-height:1.65 לטקסט עברי קריא ונוח בנייד ובמחשב.']
  ];
  function toast(m){const e=document.querySelector('#toast')||document.body.appendChild(Object.assign(document.createElement('div'),{id:'toast',className:'toast'}));e.textContent=m;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),1500)}
  function render(){
    if(document.querySelector('#advancedTypography'))return;
    const s=document.createElement('section');s.id='advancedTypography';s.className='advanced-type';
    s.innerHTML='<p class="eyebrow">טיפוגרפיה חכמה</p><h2>גופנים, גדלים, משקלים ומערכות טיפוגרפיה</h2><p>בחר רכיב טיפוגרפי והעתק Prompt או CSS לשימוש אמיתי באתר.</p><div class="adv-grid">'+items.map(x=>`<article class="adv-card"><span class="adv-badge">${x[2]}</span><h3>${x[1]}</h3><div class="adv-sample"><b>תצוגת כותרת עברית</b><br>תצוגת טקסט אמיתי וברור.</div><pre class="adv-code">${x[3]}</pre><button data-adv-copy="${x[0]}" data-kind="prompt">העתק Prompt</button><button data-adv-copy="${x[0]}" data-kind="css">העתק CSS</button></article>`).join('')+'</div>';
    (document.querySelector('#typographyLab')||document.querySelector('main')).insertAdjacentElement('afterend',s);
  }
  document.addEventListener('click',e=>{const b=e.target.closest('[data-adv-copy]');if(!b)return;const x=items.find(i=>i[0]===b.dataset.advCopy);navigator.clipboard.writeText(b.dataset.kind==='css'?x[3]:x[4]).then(()=>toast('הועתק'))});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render);else render();
})();
