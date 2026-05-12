(() => {
  const labels = new Map([
    ['העתק Prompt ל-GPT','Prompt'],
    ['העתק Prompt','Prompt'],
    ['הוסף לחבילה','בחר'],
    ['נבחר ✓','נבחר'],
    ['צפה','פתח'],
    ['העתק CSS','CSS'],
    ['העתק צבע/ערך','HEX'],
    ['העתק קישור','קישור']
  ]);
  function cleanLabels(){
    document.querySelectorAll('button,a').forEach(el=>{
      const t=(el.textContent||'').trim();
      if(labels.has(t)) el.textContent=labels.get(t);
    });
    document.querySelectorAll('.component-card .badge').forEach(b=>{
      const t=b.textContent.trim();
      if(t==='קומבינציות') b.textContent='סט';
      if(t==='חבילות סגנון') b.textContent='חבילה';
    });
  }
  const mo=new MutationObserver(cleanLabels);
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>{cleanLabels();mo.observe(document.body,{childList:true,subtree:true})});
  else {cleanLabels();mo.observe(document.body,{childList:true,subtree:true});}
})();
