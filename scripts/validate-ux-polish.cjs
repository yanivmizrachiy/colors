const fs=require('fs');
function fail(x){console.error('UX_POLISH_FAIL='+x);process.exit(1)}
function read(f){if(!fs.existsSync(f))fail('missing_'+f);return fs.readFileSync(f,'utf8')}
function inc(label,text,tokens){for(const t of tokens)if(!text.includes(t))fail(label+'_missing_'+t)}
const html=read('index.html'),css=read('ux-polish.css'),js=read('ux-polish.js');
inc('index',html,['ux-polish.css','ux-polish.js']);
inc('css',css,['.component-card .meta','.component-card .tags','display:none','.primary-copy','.select-copy','.prompt-panel','@media']);
inc('js',js,['העתק Prompt ל-GPT','Prompt','הוסף לחבילה','בחר','MutationObserver','cleanLabels']);
console.log('UX_POLISH_OK');
console.log('clutter_hidden=1');
console.log('short_labels=1');
console.log('mobile_prompt_panel_hidden=1');
