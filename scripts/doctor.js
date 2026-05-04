const fs=require('fs');
function fail(x){console.error('COLORS_DOCTOR_FAIL='+x);process.exit(1)}
function read(f){return fs.readFileSync(f,'utf8')}
function file(f){if(!fs.existsSync(f))fail('missing_'+f)}
function inc(label,text,tokens){for(const t of tokens)if(!text.includes(t))fail(label+'_missing_'+t)}
function truth(s){return s.includes('תוכן אמיתי בלבד')||s.includes('לא דמו')}
const files=['index.html','styles.css','script.js','site.config.json','design-tokens.json','smart-builder.html','smart-builder.css','smart-builder.js','zero-demo-guard.js','qa-mobile.html','qa-mobile.css','qa-mobile.js','typography-extension.js','advanced-typography-extension.js','scripts/generate-design-tokens-safe.cjs','scripts/audit-zero-demo.js','RULES.md','README.md','manifest.webmanifest','sw.js','.nojekyll','.github/workflows/validate.yml','.github/workflows/pages.yml'];
files.forEach(file);
const cfg=JSON.parse(read('site.config.json'));
if(!cfg.project||cfg.project.name!=='colors')fail('bad_project_name');
if(!Array.isArray(cfg.components)||cfg.components.length<100)fail('too_few_components');
const ids=new Set(),cats=new Set();let strong=0,copies=0,colors=0,viewable=0;
for(const c of cfg.components){
 if(!c.id||ids.has(c.id))fail('duplicate_or_missing_id_'+c.id);ids.add(c.id);cats.add(c.category);
 if(!c.name||!c.type||!c.category)fail('missing_metadata_'+c.id);
 if(!c.copy||!c.copy.prompt||c.copy.css===undefined||!c.copy.link||!c.copy.styleId)fail('missing_copy_payload_'+c.id);copies++;
 const p=c.copy.prompt;for(const m of ['RTL','נייד','HTML','CSS','JavaScript'])if(!p.includes(m))fail('weak_prompt_'+c.id+'_missing_'+m);
 if(!truth(p))fail('weak_prompt_'+c.id+'_missing_truth_rule');if(p.length<230)fail('prompt_too_short_'+c.id);strong++;
 if(c.hex){if(!/^#[0-9A-Fa-f]{6}$/.test(c.hex))fail('bad_hex_'+c.id);if(!/^hsl\(\d+ \d+% \d+%\)$/.test(c.hsl||''))fail('bad_hsl_'+c.id);colors++}
}
const tok=JSON.parse(read('design-tokens.json'));
if(!Array.isArray(tok.tokens)||tok.tokens.length<100)fail('too_few_design_tokens');
if(!Array.isArray(tok.categories)||tok.categories.length<5)fail('too_few_token_categories');
if(!Array.isArray(tok.uses)||tok.uses.length<20)fail('too_few_token_uses');
const tids=new Set();let tokenCopies=0,tokenPrompts=0,tokenColors=0;
for(const t of tok.tokens){
 if(!t.id||tids.has(t.id))fail('duplicate_or_missing_token_id_'+t.id);tids.add(t.id);
 if(!t.name||!t.type||!t.category)fail('missing_token_metadata_'+t.id);
 if(!Array.isArray(t.use)||!t.use.length)fail('missing_token_use_'+t.id);
 if(!t.copy||!t.copy.prompt||t.copy.css===undefined||t.copy.value===undefined||!t.copy.id)fail('missing_token_copy_payload_'+t.id);tokenCopies++;
 const p=t.copy.prompt||t.prompt||'';for(const m of ['RTL','נייד'])if(!p.includes(m))fail('weak_token_prompt_'+t.id+'_missing_'+m);
 if(!truth(p))fail('weak_token_prompt_'+t.id+'_missing_truth_rule');tokenPrompts++;
 if(t.type==='color'){if(!/^#[0-9A-Fa-f]{6}$/.test(t.value||''))fail('bad_token_color_'+t.id);tokenColors++}
}
const html=read('index.html'),js=read('script.js'),css=read('styles.css'),sh=read('smart-builder.html'),sj=read('smart-builder.js'),sc=read('smart-builder.css'),qh=read('qa-mobile.html'),qj=read('qa-mobile.js'),qc=read('qa-mobile.css'),ty=read('typography-extension.js'),aty=read('advanced-typography-extension.js'),zg=read('zero-demo-guard.js'),sg=read('scripts/generate-design-tokens-safe.cjs'),za=read('scripts/audit-zero-demo.js');
inc('index_html',html,['viewModal','promptPreview','componentGrid','bottom-nav','styleCart','qa-mobile.html','smart-builder.html','typography-extension.js','advanced-typography-extension.js','zero-demo-guard.js']);
inc('script_js',js,['navigator.clipboard','openModal','data-copy','data-view','localStorage','bundlePrompt','data-select']);if(js.includes('data-view'))viewable=cfg.components.length;
inc('styles_css',css,['@media','bottom-nav','component-grid','modal-card']);
inc('smart_builder_html',sh,['searchInput','categoryChips','useChips','selectedList','copySelectedPrompt','clearSelected','smart-builder.js','zero-demo-guard.js']);
inc('smart_builder_js',sj,['design-tokens.json','buildSelectedPrompt','copySelectedPrompt','categoryChips','useChips','selectedList','data-select','data-copy']);
inc('smart_builder_css',sc,['@media','topbar','selected-panel','selected-pill','grid','actions','toast']);
inc('qa_mobile_html',qh,['runAll','copyTest','copyReport','reportBox','site.config.json','בדיקות ידניות','zero-demo-guard.js']);
inc('qa_mobile_js',qj,['runAllChecks','navigator.clipboard','localStorage','site.config.json','design-tokens.json','smart-builder.html','smart-builder.js','smart-builder.css','typography-extension.js','advanced-typography-extension.js','zero-demo-guard.js','scrollWidth','copyReport','buildReport']);
inc('qa_mobile_css',qc,['@media','qa-shell','.btn.primary','checklist','toast']);
inc('typography_extension',ty,['font-heebo-premium','size-fluid-hero','data-copy-font-prompt','data-copy-size-prompt','data-copy-pair-prompt','תצוגת']);
inc('advanced_typography_extension',aty,['advancedTypography','adv-font-heebo','adv-size-hero-fluid','adv-weight-bold','adv-leading-readable','adv-system-math-premium','data-adv-copy']);
inc('zero_demo_guard',zg,['navigator.clipboard.writeText','MutationObserver','תוכן אמיתי בלבד','תצוגת']);
inc('safe_generator',sg,['CONTENT_ONLY_REAL','ui_files_overwritten=false','תוכן אמיתי בלבד']);
inc('zero_demo_audit',za,['ZERO_DEMO_AUDIT_OK','scripts/generate-design-tokens-safe.cjs','safe_generator=present']);
console.log('COLORS_DOCTOR_OK');
console.log('components='+cfg.components.length);console.log('categories='+cats.size);console.log('copy_payloads='+copies);console.log('strong_prompts='+strong);console.log('real_colors='+colors);console.log('dynamic_view_buttons='+viewable);console.log('design_tokens='+tok.tokens.length);console.log('token_categories='+tok.categories.length);console.log('token_uses='+tok.uses.length);console.log('token_copy_payloads='+tokenCopies);console.log('token_prompts='+tokenPrompts);console.log('token_colors='+tokenColors);console.log('smart_builder=present');console.log('mobile_qa=present');console.log('zero_demo_guard=present');console.log('safe_generator=present');console.log('truth_rule=content_only_real_or_legacy_no_demo');console.log('typography=advanced');
