const BASE='https://yanivmizrachiy.github.io/colors/';
const checks={
  'index.html':['colors-gallery.html','smart-builder.html','qa-mobile.html','ux-polish.css','ux-polish.js','zero-demo-guard.js'],
  'ux-polish.css':['component-card .meta','display:none','primary-copy','prompt-panel','@media'],
  'ux-polish.js':['cleanLabels','MutationObserver','העתק Prompt ל-GPT','הוסף לחבילה'],
  'colors-gallery.html':['colors-gallery.css','colors-gallery.js','familyStrip','shadeStrip','colorGrid','copyVisibleColors','zero-demo-guard.js'],
  'colors-gallery.css':['family-strip','shade-strip','color-grid','swatch-button','quick-actions'],
  'colors-gallery.js':['design-tokens.json','families','shades','familyOf','shadeOf','colorPrompt','data-copy-prompt','copyVisibleColors'],
  'smart-builder.html':['searchInput','categoryChips','useChips','copySelectedPrompt','zero-demo-guard.js'],
  'qa-mobile.html':['qa-mobile.js','zero-demo-guard.js','הרץ בדיקות'],
  'qa-mobile.js':['runAllChecks','design-tokens.json','zero-demo-guard.js'],
  'zero-demo-guard.js':['navigator.clipboard.writeText','MutationObserver','תוכן אמיתי בלבד'],
  'smart-builder.js':['design-tokens.json','buildSelectedPrompt','data-select'],
  'typography-extension.js':['font-heebo-premium','size-fluid-hero','data-copy-font-prompt','תצוגת'],
  'advanced-typography-extension.js':['advancedTypography','adv-font-heebo','adv-size-hero-fluid','data-adv-copy'],
  'design-tokens.json':['tokens','categories','uses']
};
const forbidden=['כותרת לדוגמה','כותרת עברית לדוגמה','דוגמת טקסט','דוגמה לטקסט','טקסט לדוגמה','mock','fake','lorem'];
const cleanerFiles=new Set(['zero-demo-guard.js']);
function stripHtmlInputPlaceholders(file,text){return file.endsWith('.html')?text.replace(/\splaceholder\s*=\s*(['"])[\s\S]*?\1/gi,' data-real-input-hint="ok"'):text}
let ok=0,fail=0;
for(const [file,tokens] of Object.entries(checks)){
  try{
    const res=await fetch(BASE+file,{cache:'no-store'});
    let text=await res.text();
    if(!res.ok) throw new Error('HTTP '+res.status);
    for(const t of tokens) if(!text.includes(t)) throw new Error('missing '+t);
    if(!cleanerFiles.has(file)){
      text=stripHtmlInputPlaceholders(file,text);
      for(const bad of forbidden) if(text.toLowerCase().includes(bad.toLowerCase())) throw new Error('forbidden '+bad);
      if(!file.endsWith('.html')&&text.toLowerCase().includes('placeholder')) throw new Error('forbidden placeholder');
    }
    console.log('OK '+file); ok++;
  }catch(e){console.error('FAIL '+file+' '+e.message); fail++;}
}
console.log(`LIVE_VERIFY passed=${ok} failed=${fail}`);
if(fail){process.exit(1)}
console.log('LIVE_VERIFY_OK');
