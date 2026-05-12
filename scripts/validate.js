const fs=require('fs');
function mustFile(f){if(!fs.existsSync(f))throw new Error('Missing '+f)}
function mustInclude(label,text,tokens){for(const t of tokens)if(!text.includes(t))throw new Error(label+' missing token '+t)}
function promptHasTruthRule(text){return text.includes('תוכן אמיתי בלבד')||text.includes('לא דמו')}
const required=['index.html','styles.css','script.js','site.config.json','design-tokens.json','smart-builder.html','smart-builder.css','smart-builder.js','colors-gallery.html','colors-gallery.css','colors-gallery.js','zero-demo-guard.js','RULES.md','README.md','qa-mobile.html','qa-mobile.css','qa-mobile.js','typography-extension.js','advanced-typography-extension.js'];
required.forEach(mustFile);
const cfg=JSON.parse(fs.readFileSync('site.config.json','utf8'));
if(!Array.isArray(cfg.components)||cfg.components.length<100)throw new Error('Too few components');
const componentIds=new Set();
for(const c of cfg.components){
 if(!c.id||componentIds.has(c.id))throw new Error('bad/duplicate component id '+c.id);componentIds.add(c.id);
 if(!c.name||!c.type||!c.category)throw new Error('missing component metadata '+c.id);
 if(!c.copy||!c.copy.prompt||!c.copy.link)throw new Error('missing component copy '+c.id);
 const p=c.copy.prompt;for(const w of ['RTL','נייד','HTML','CSS','JavaScript'])if(!p.includes(w))throw new Error('weak component prompt '+c.id+' missing '+w);
 if(!promptHasTruthRule(p))throw new Error('weak component prompt '+c.id+' missing truth rule');
 if(p.length<230)throw new Error('component prompt too short '+c.id);
 if(c.hex&&!/^#[0-9A-Fa-f]{6}$/.test(c.hex))throw new Error('bad component hex '+c.id);
 if(c.hsl&&!/^hsl\(\d+ \d+% \d+%\)$/.test(c.hsl))throw new Error('bad component hsl '+c.id);
}
const tokensData=JSON.parse(fs.readFileSync('design-tokens.json','utf8'));
if(!Array.isArray(tokensData.tokens)||tokensData.tokens.length<100)throw new Error('Too few design tokens');
if(!Array.isArray(tokensData.categories)||tokensData.categories.length<5)throw new Error('Too few token categories');
if(!Array.isArray(tokensData.uses)||tokensData.uses.length<20)throw new Error('Too few token uses');
const colorTokenCount=tokensData.tokens.filter(t=>t.type==='color'&&/^#[0-9A-Fa-f]{6}$/.test(t.value||'')).length;
if(colorTokenCount<50)throw new Error('Too few real color tokens');
const tokenIds=new Set();
for(const token of tokensData.tokens){
 if(!token.id||tokenIds.has(token.id))throw new Error('bad/duplicate token id '+token.id);tokenIds.add(token.id);
 if(!token.category||!token.type||!token.name)throw new Error('missing token metadata '+token.id);
 if(!Array.isArray(token.use)||token.use.length<1)throw new Error('missing token use list '+token.id);
 if(!token.copy||!token.copy.prompt||token.copy.css===undefined||token.copy.value===undefined||!token.copy.id)throw new Error('missing token copy payload '+token.id);
 const prompt=token.copy.prompt||token.prompt||'';for(const word of ['RTL','נייד'])if(!prompt.includes(word))throw new Error('weak token prompt '+token.id+' missing '+word);
 if(!promptHasTruthRule(prompt))throw new Error('weak token prompt '+token.id+' missing truth rule');
 if(token.type==='color'&&token.value&&!/^#[0-9A-Fa-f]{6}$/.test(token.value))throw new Error('bad token color value '+token.id);
}
const html=fs.readFileSync('index.html','utf8');
mustInclude('index.html',html,['viewModal','styleCart','colors-gallery.html','qa-mobile.html','smart-builder.html','typography-extension.js','advanced-typography-extension.js','zero-demo-guard.js','#advancedTypography']);
const js=fs.readFileSync('script.js','utf8');if(!js.includes('data-view'))throw new Error('missing dynamic view buttons');
mustInclude('script.js',js,['navigator.clipboard','openModal','data-copy','data-view','localStorage','bundlePrompt','data-select']);
const galleryHtml=fs.readFileSync('colors-gallery.html','utf8');
mustInclude('colors-gallery.html',galleryHtml,['colors-gallery.css','colors-gallery.js','colorGrid','copyVisibleColors','zero-demo-guard.js']);
const galleryCss=fs.readFileSync('colors-gallery.css','utf8');
mustInclude('colors-gallery.css',galleryCss,['family-strip','shade-strip','color-grid','swatch-button','quick-actions','@media']);
const galleryJs=fs.readFileSync('colors-gallery.js','utf8');
mustInclude('colors-gallery.js',galleryJs,['design-tokens.json','families','shades','familyOf','shadeOf','colorPrompt','data-copy-prompt','copyVisibleColors','padStart']);
const smartHtml=fs.readFileSync('smart-builder.html','utf8');
mustInclude('smart-builder.html',smartHtml,['searchInput','categoryChips','useChips','selectedList','copySelectedPrompt','clearSelected','smart-builder.js','zero-demo-guard.js']);
const smartJs=fs.readFileSync('smart-builder.js','utf8');
mustInclude('smart-builder.js',smartJs,['design-tokens.json','buildSelectedPrompt','copySelectedPrompt','categoryChips','useChips','selectedList','data-select','data-copy']);
const smartCss=fs.readFileSync('smart-builder.css','utf8');
mustInclude('smart-builder.css',smartCss,['@media','topbar','selected-panel','selected-pill','grid','actions','toast']);
const zeroGuard=fs.readFileSync('zero-demo-guard.js','utf8');
mustInclude('zero-demo-guard.js',zeroGuard,['navigator.clipboard.writeText','MutationObserver','תוכן אמיתי בלבד','תצוגת']);
const typo=fs.readFileSync('typography-extension.js','utf8');
mustInclude('typography-extension.js',typo,['font-heebo-premium','size-fluid-hero','data-copy-font-prompt','data-copy-size-prompt','data-copy-pair-prompt','תצוגת']);
const advTypo=fs.readFileSync('advanced-typography-extension.js','utf8');
mustInclude('advanced-typography-extension.js',advTypo,['advancedTypography','adv-font-heebo','adv-size-hero-fluid','adv-weight-bold','adv-leading-readable','adv-system-math-premium','data-adv-copy']);
const qaHtml=fs.readFileSync('qa-mobile.html','utf8');
mustInclude('qa-mobile.html',qaHtml,['runAll','copyTest','copyReport','reportBox','site.config.json','בדיקות ידניות','zero-demo-guard.js']);
const qaJs=fs.readFileSync('qa-mobile.js','utf8');
mustInclude('qa-mobile.js',qaJs,['runAllChecks','navigator.clipboard','localStorage','site.config.json','design-tokens.json','smart-builder.html','smart-builder.js','smart-builder.css','typography-extension.js','advanced-typography-extension.js','scrollWidth','copyReport','buildReport']);
const qaCss=fs.readFileSync('qa-mobile.css','utf8');
mustInclude('qa-mobile.css',qaCss,['@media','qa-shell','.btn.primary','checklist','toast']);
console.log('VALIDATION_OK');
console.log('components='+cfg.components.length);console.log('categories='+cfg.categories.length);console.log('design_tokens='+tokensData.tokens.length);console.log('token_categories='+tokensData.categories.length);console.log('token_uses='+tokensData.uses.length);console.log('real_color_tokens='+colorTokenCount);console.log('mobile_qa=present');console.log('smart_builder=present');console.log('colors_gallery=present');console.log('zero_demo_guard=present');console.log('truth_rule=content_only_real_or_legacy_no_demo');console.log('typography=advanced');
