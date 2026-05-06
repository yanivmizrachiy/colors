const fs=require('fs');const path=require('path');
const ROOT=process.cwd();
const pages=['index.html','smart-builder.html','qa-mobile.html'];
const req=['zero-demo-guard.js','scripts/validate.js','scripts/doctor.js','scripts/generate-design-tokens-safe.cjs','scripts/clean-data-truth.cjs','site.config.json','design-tokens.json','smart-builder.js','typography-extension.js','advanced-typography-extension.js'];
const uiForbidden=[/כותרת לדוגמה/g,/כותרת עברית לדוגמה/g,/דוגמת טקסט/g,/דוגמה לטקסט/g,/טקסט לדוגמה/g,/mock/gi,/fake/gi,/lorem/gi];
const dataForbidden=['placeholder','לא דמו','כותרת לדוגמה','כותרת עברית לדוגמה','דוגמת טקסט','דוגמה לטקסט','טקסט לדוגמה','mock','fake','lorem'];
function read(f){return fs.readFileSync(path.join(ROOT,f),'utf8')}function fail(x){console.error('ZERO_DEMO_AUDIT_FAIL='+x);process.exit(1)}
function stripHtmlInputPlaceholders(file,text){return file.endsWith('.html')?text.replace(/\splaceholder\s*=\s*(['"])[\s\S]*?\1/gi,' data-real-input-hint="ok"'):text}
for(const f of [...pages,...req])if(!fs.existsSync(path.join(ROOT,f)))fail('missing_'+f);
for(const p of pages)if(!read(p).includes('zero-demo-guard.js'))fail(p+'_missing_zero_demo_guard');
const guard=read('zero-demo-guard.js');for(const t of ['navigator.clipboard.writeText','MutationObserver','תוכן אמיתי בלבד','תצוגת'])if(!guard.includes(t))fail('zero_demo_guard_missing_'+t);
const safe=read('scripts/generate-design-tokens-safe.cjs');for(const t of ['CONTENT_ONLY_REAL','ui_files_overwritten=false','תוכן אמיתי בלבד'])if(!safe.includes(t))fail('safe_generator_missing_'+t);
for(const f of ['smart-builder.html','smart-builder.css','smart-builder.js'])if(safe.includes(`writeFileSync('${f}'`)||safe.includes(`writeFileSync("${f}"`))fail('safe_generator_overwrites_ui_file_'+f);
if(safe.toLowerCase().includes('placeholder'))fail('safe_generator_contains_placeholder');
const uiFiles=['index.html','smart-builder.html','qa-mobile.html','script.js','smart-builder.js','typography-extension.js','advanced-typography-extension.js'];
for(const f of uiFiles){const text=stripHtmlInputPlaceholders(f,read(f));for(const p of uiForbidden){p.lastIndex=0;if(p.test(text))fail(f+'_contains_forbidden_ui_word_'+p.source)}if(!f.endsWith('.html')&&text.toLowerCase().includes('placeholder'))fail(f+'_contains_forbidden_ui_word_placeholder')}
for(const f of ['site.config.json','design-tokens.json']){const text=read(f).toLowerCase();for(const bad of dataForbidden){if(text.includes(bad.toLowerCase()))fail(f+'_contains_forbidden_data_word_'+bad)}}
console.log('ZERO_DEMO_AUDIT_OK');console.log('guarded_pages='+pages.length);console.log('audited_ui_files='+uiFiles.length);console.log('audited_data_files=2');console.log('html_placeholder_attributes=allowed_as_real_input_hints');console.log('safe_generator=present');
