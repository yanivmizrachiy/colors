const BASE='https://yanivmizrachiy.github.io/colors/';
const checks={
  'index.html':['smart-builder.html','qa-mobile.html','zero-demo-guard.js'],
  'smart-builder.html':['searchInput','categoryChips','useChips','copySelectedPrompt','zero-demo-guard.js'],
  'qa-mobile.html':['qa-mobile.js','zero-demo-guard.js','הרץ בדיקות'],
  'qa-mobile.js':['runAllChecks','design-tokens.json','zero-demo-guard.js'],
  'zero-demo-guard.js':['navigator.clipboard.writeText','MutationObserver','תוכן אמיתי בלבד'],
  'smart-builder.js':['design-tokens.json','buildSelectedPrompt','data-select'],
  'design-tokens.json':['tokens','categories','uses']
};
const forbidden=['כותרת לדוגמה','כותרת עברית לדוגמה','דוגמת טקסט','דוגמה לטקסט','טקסט לדוגמה','placeholder','mock','fake','lorem'];
let ok=0,fail=0;
for(const [file,tokens] of Object.entries(checks)){
  try{
    const res=await fetch(BASE+file,{cache:'no-store'});
    const text=await res.text();
    if(!res.ok) throw new Error('HTTP '+res.status);
    for(const t of tokens) if(!text.includes(t)) throw new Error('missing '+t);
    for(const bad of forbidden) if(text.toLowerCase().includes(bad.toLowerCase())) throw new Error('forbidden '+bad);
    console.log('OK '+file); ok++;
  }catch(e){console.error('FAIL '+file+' '+e.message); fail++;}
}
console.log(`LIVE_VERIFY passed=${ok} failed=${fail}`);
if(fail){process.exit(1)}
console.log('LIVE_VERIFY_OK');
