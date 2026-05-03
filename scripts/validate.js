const fs = require('fs');

function mustFile(file) {
  if (!fs.existsSync(file)) throw new Error('Missing ' + file);
}

function mustInclude(label, text, tokens) {
  for (const token of tokens) {
    if (!text.includes(token)) throw new Error(label + ' missing token ' + token);
  }
}

for (const file of [
  'index.html',
  'styles.css',
  'script.js',
  'site.config.json',
  'design-tokens.json',
  'smart-builder.html',
  'smart-builder.css',
  'smart-builder.js',
  'zero-demo-guard.js',
  'RULES.md',
  'README.md',
  'qa-mobile.html',
  'qa-mobile.css',
  'qa-mobile.js',
  'typography-extension.js',
  'advanced-typography-extension.js'
]) {
  mustFile(file);
}

const cfg = JSON.parse(fs.readFileSync('site.config.json', 'utf8'));
if (!Array.isArray(cfg.components) || cfg.components.length < 100) throw new Error('Too few components');

const componentIds = new Set();
for (const c of cfg.components) {
  if (!c.id || componentIds.has(c.id)) throw new Error('bad/duplicate component id ' + c.id);
  componentIds.add(c.id);
  if (!c.name || !c.type || !c.category) throw new Error('missing component metadata ' + c.id);
  if (!c.copy || !c.copy.prompt || !c.copy.link) throw new Error('missing component copy ' + c.id);
  const p = c.copy.prompt;
  for (const word of ['RTL', 'נייד', 'לא דמו', 'HTML', 'CSS', 'JavaScript']) {
    if (!p.includes(word)) throw new Error('weak component prompt ' + c.id + ' missing ' + word);
  }
  if (p.length < 230) throw new Error('component prompt too short ' + c.id);
  if (c.hex && !/^#[0-9A-Fa-f]{6}$/.test(c.hex)) throw new Error('bad component hex ' + c.id);
  if (c.hsl && !/^hsl\(\d+ \d+% \d+%\)$/.test(c.hsl)) throw new Error('bad component hsl ' + c.id);
}

const tokensData = JSON.parse(fs.readFileSync('design-tokens.json', 'utf8'));
if (!Array.isArray(tokensData.tokens) || tokensData.tokens.length < 100) throw new Error('Too few design tokens');
if (!Array.isArray(tokensData.categories) || tokensData.categories.length < 5) throw new Error('Too few token categories');
if (!Array.isArray(tokensData.uses) || tokensData.uses.length < 20) throw new Error('Too few token uses');

const tokenIds = new Set();
for (const token of tokensData.tokens) {
  if (!token.id || tokenIds.has(token.id)) throw new Error('bad/duplicate token id ' + token.id);
  tokenIds.add(token.id);
  if (!token.category || !token.type || !token.name) throw new Error('missing token metadata ' + token.id);
  if (!Array.isArray(token.use) || token.use.length < 1) throw new Error('missing token use list ' + token.id);
  if (!token.copy || !token.copy.prompt || token.copy.css === undefined || token.copy.value === undefined || !token.copy.id) {
    throw new Error('missing token copy payload ' + token.id);
  }
  const prompt = token.copy.prompt || token.prompt || '';
  for (const word of ['RTL', 'נייד', 'לא דמו']) {
    if (!prompt.includes(word)) throw new Error('weak token prompt ' + token.id + ' missing ' + word);
  }
  if (token.type === 'color' && token.value && !/^#[0-9A-Fa-f]{6}$/.test(token.value)) {
    throw new Error('bad token color value ' + token.id);
  }
}

const html = fs.readFileSync('index.html', 'utf8');
mustInclude('index.html', html, [
  'viewModal',
  'styleCart',
  'qa-mobile.html',
  'smart-builder.html',
  'typography-extension.js',
  'advanced-typography-extension.js',
  'zero-demo-guard.js',
  '#advancedTypography'
]);

const js = fs.readFileSync('script.js', 'utf8');
if (!js.includes('data-view')) throw new Error('missing dynamic view buttons');
mustInclude('script.js', js, [
  'navigator.clipboard',
  'openModal',
  'data-copy',
  'data-view',
  'localStorage',
  'bundlePrompt',
  'data-select'
]);

const smartHtml = fs.readFileSync('smart-builder.html', 'utf8');
mustInclude('smart-builder.html', smartHtml, [
  'searchInput',
  'categoryChips',
  'useChips',
  'selectedList',
  'copySelectedPrompt',
  'clearSelected',
  'smart-builder.js',
  'zero-demo-guard.js'
]);

const smartJs = fs.readFileSync('smart-builder.js', 'utf8');
mustInclude('smart-builder.js', smartJs, [
  'design-tokens.json',
  'buildSelectedPrompt',
  'copySelectedPrompt',
  'categoryChips',
  'useChips',
  'selectedList',
  'data-select',
  'data-copy'
]);

const smartCss = fs.readFileSync('smart-builder.css', 'utf8');
mustInclude('smart-builder.css', smartCss, [
  '@media',
  'topbar',
  'selected-panel',
  'selected-pill',
  'grid',
  'actions',
  'toast'
]);

const zeroGuard = fs.readFileSync('zero-demo-guard.js', 'utf8');
mustInclude('zero-demo-guard.js', zeroGuard, [
  'navigator.clipboard.writeText',
  'MutationObserver',
  'תוכן אמיתי בלבד',
  'תצוגת'
]);

const typo = fs.readFileSync('typography-extension.js', 'utf8');
mustInclude('typography-extension.js', typo, [
  'font-heebo-premium',
  'size-fluid-hero',
  'data-copy-font-prompt',
  'data-copy-size-prompt',
  'data-copy-pair-prompt',
  'תצוגת'
]);

const advTypo = fs.readFileSync('advanced-typography-extension.js', 'utf8');
mustInclude('advanced-typography-extension.js', advTypo, [
  'advancedTypography',
  'adv-font-heebo',
  'adv-size-hero-fluid',
  'adv-weight-bold',
  'adv-leading-readable',
  'adv-system-math-premium',
  'data-adv-copy'
]);

const qaHtml = fs.readFileSync('qa-mobile.html', 'utf8');
mustInclude('qa-mobile.html', qaHtml, [
  'runAll',
  'copyTest',
  'copyReport',
  'reportBox',
  'site.config.json',
  'בדיקות ידניות',
  'zero-demo-guard.js'
]);

const qaJs = fs.readFileSync('qa-mobile.js', 'utf8');
mustInclude('qa-mobile.js', qaJs, [
  'runAllChecks',
  'navigator.clipboard',
  'localStorage',
  'site.config.json',
  'design-tokens.json',
  'smart-builder.html',
  'smart-builder.js',
  'smart-builder.css',
  'typography-extension.js',
  'advanced-typography-extension.js',
  'scrollWidth',
  'copyReport',
  'buildReport'
]);

const qaCss = fs.readFileSync('qa-mobile.css', 'utf8');
mustInclude('qa-mobile.css', qaCss, [
  '@media',
  'qa-shell',
  'btn primary',
  'checklist',
  'toast'
]);

console.log('VALIDATION_OK');
console.log('components=' + cfg.components.length);
console.log('categories=' + cfg.categories.length);
console.log('design_tokens=' + tokensData.tokens.length);
console.log('token_categories=' + tokensData.categories.length);
console.log('token_uses=' + tokensData.uses.length);
console.log('mobile_qa=present');
console.log('smart_builder=present');
console.log('zero_demo_guard=present');
console.log('typography=advanced');
