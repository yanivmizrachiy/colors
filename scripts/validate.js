const fs=require('fs');

function mustFile(file){
  if(!fs.existsSync(file)) throw new Error('Missing '+file);
}

for(const f of [
  'index.html','styles.css','script.js','site.config.json','RULES.md','README.md',
  'qa-mobile.html','qa-mobile.css','qa-mobile.js'
]) mustFile(f);

const cfg=JSON.parse(fs.readFileSync('site.config.json','utf8'));
if(!Array.isArray(cfg.components)||cfg.components.length<100) throw new Error('Too few components');

const ids=new Set();
for(const c of cfg.components){
  if(!c.id||ids.has(c.id)) throw new Error('bad/duplicate id '+c.id);
  ids.add(c.id);
  if(!c.name||!c.type||!c.category) throw new Error('missing metadata '+c.id);
  if(!c.copy||!c.copy.prompt||!c.copy.link) throw new Error('missing copy '+c.id);
  const p=c.copy.prompt;
  for(const word of ['RTL','נייד','לא דמו','HTML','CSS','JavaScript']){
    if(!p.includes(word)) throw new Error('weak prompt '+c.id+' missing '+word);
  }
  if(p.length<230) throw new Error('prompt too short '+c.id);
  if(c.hex&&!/^#[0-9A-Fa-f]{6}$/.test(c.hex)) throw new Error('bad hex '+c.id);
  if(c.hsl&&!/^hsl\(\d+ \d+% \d+%\)$/.test(c.hsl)) throw new Error('bad hsl '+c.id);
}

const html=fs.readFileSync('index.html','utf8');
if(!html.includes('viewModal')) throw new Error('missing modal');
if(!html.includes('styleCart')) throw new Error('missing style cart');
if(!html.includes('qa-mobile.html')) throw new Error('missing mobile QA link from homepage');

const js=fs.readFileSync('script.js','utf8');
if(!js.includes('data-view')) throw new Error('missing dynamic view buttons');
for(const token of ['navigator.clipboard','openModal','data-copy','data-view','localStorage','bundlePrompt','data-select']){
  if(!js.includes(token)) throw new Error('missing js '+token);
}

const qaHtml=fs.readFileSync('qa-mobile.html','utf8');
for(const token of ['runAll','copyTest','site.config.json','בדיקות ידניות']){
  if(!qaHtml.includes(token)) throw new Error('missing mobile QA html token '+token);
}

const qaJs=fs.readFileSync('qa-mobile.js','utf8');
for(const token of ['runAllChecks','navigator.clipboard','localStorage','site.config.json','script.js','scrollWidth']){
  if(!qaJs.includes(token)) throw new Error('missing mobile QA js token '+token);
}

const qaCss=fs.readFileSync('qa-mobile.css','utf8');
for(const token of ['@media','qa-shell','btn primary','checklist','toast']){
  if(!qaCss.includes(token)) throw new Error('missing mobile QA css token '+token);
}

console.log('VALIDATION_OK');
console.log('components='+cfg.components.length);
console.log('categories='+cfg.categories.length);
console.log('mobile_qa=present');
