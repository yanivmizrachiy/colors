const fs=require('fs');
function fail(x){console.error('COLORS_GALLERY_FAIL='+x);process.exit(1)}
function read(f){if(!fs.existsSync(f))fail('missing_'+f);return fs.readFileSync(f,'utf8')}
function inc(label,text,tokens){for(const t of tokens)if(!text.includes(t))fail(label+'_missing_'+t)}

const html=read('colors-gallery.html');
const css=read('colors-gallery.css');
const js=read('colors-gallery.js');
const index=read('index.html');

inc('index',index,['colors-gallery.html']);
inc('html',html,['colors-gallery.css','colors-gallery.js','familyStrip','shadeStrip','colorGrid','copyVisibleColors','zero-demo-guard.js']);
inc('css',css,['family-strip','shade-strip','color-grid','swatch-button','quick-actions','@media']);
inc('js',js,['design-tokens.json','families','shades','familyOf','shadeOf','colorPrompt','data-copy-prompt','copyVisibleColors','padStart']);

const data=JSON.parse(read('design-tokens.json'));
const colors=(data.tokens||[]).filter(t=>t.type==='color'&&/^#[0-9A-Fa-f]{6}$/.test(t.value||''));

if(colors.length<50)fail('too_few_real_colors_'+colors.length);

for(const c of colors){
  if(!c.copy||!c.copy.prompt)fail('missing_prompt_'+c.id);
  if(!c.hsl)fail('missing_hsl_'+c.id);
}

console.log('COLORS_GALLERY_OK');
console.log('real_colors='+colors.length);
console.log('family_filters=present');
console.log('shade_filters=present');
console.log('visual_grid=present');
console.log('copy_prompt_buttons=present');
