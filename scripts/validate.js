const fs=require('fs');
for(const f of ['index.html','styles.css','script.js','site.config.json','RULES.md','README.md']){if(!fs.existsSync(f))throw new Error('Missing '+f)}
const cfg=JSON.parse(fs.readFileSync('site.config.json','utf8'));
if(!Array.isArray(cfg.components)||cfg.components.length<100)throw new Error('Too few components');
const ids=new Set();
for(const c of cfg.components){
 if(!c.id||ids.has(c.id))throw new Error('bad/duplicate id '+c.id); ids.add(c.id);
 if(!c.name||!c.type||!c.category)throw new Error('missing metadata '+c.id);
 if(!c.copy||!c.copy.prompt||!c.copy.link)throw new Error('missing copy '+c.id);
 const p=c.copy.prompt;
 for(const word of ['RTL','נייד','לא דמו','HTML','CSS','JavaScript']){if(!p.includes(word))throw new Error('weak prompt '+c.id+' missing '+word)}
 if(p.length<230)throw new Error('prompt too short '+c.id);
 if(c.hex&&!/^#[0-9A-Fa-f]{6}$/.test(c.hex))throw new Error('bad hex '+c.id);
 if(c.hsl&&!/^hsl\(\d+ \d+% \d+%\)$/.test(c.hsl))throw new Error('bad hsl '+c.id);
}
const html=fs.readFileSync('index.html','utf8');
if(!html.includes('viewModal'))throw new Error('missing modal');
if(!html.includes('styleCart'))throw new Error('missing style cart');
const js=fs.readFileSync('script.js','utf8');
if(!js.includes('data-view'))throw new Error('missing dynamic view buttons');
for(const token of ['navigator.clipboard','openModal','data-copy','data-view','localStorage','bundlePrompt','data-select']){if(!js.includes(token))throw new Error('missing js '+token)}
console.log('VALIDATION_OK');
console.log('components='+cfg.components.length);
console.log('categories='+cfg.categories.length);
