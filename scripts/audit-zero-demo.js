const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const REQUIRED_GUARD_PAGES = ['index.html', 'smart-builder.html', 'qa-mobile.html'];
const REQUIRED_FILES = [
  'zero-demo-guard.js',
  'scripts/validate.js',
  'scripts/doctor.js',
  'scripts/generate-design-tokens-safe.cjs',
  'site.config.json',
  'design-tokens.json',
  'smart-builder.js',
  'typography-extension.js',
  'advanced-typography-extension.js'
];

const FORBIDDEN_UI_PATTERNS = [
  /כותרת לדוגמה/g,
  /כותרת עברית לדוגמה/g,
  /דוגמת טקסט/g,
  /דוגמה לטקסט/g,
  /טקסט לדוגמה/g,
  /placeholder/gi,
  /mock/gi,
  /fake/gi,
  /lorem/gi
];

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), 'utf8');
}

function fail(message) {
  console.error('ZERO_DEMO_AUDIT_FAIL=' + message);
  process.exit(1);
}

for (const file of [...REQUIRED_GUARD_PAGES, ...REQUIRED_FILES]) {
  if (!fs.existsSync(path.join(ROOT, file))) fail('missing_' + file);
}

for (const page of REQUIRED_GUARD_PAGES) {
  if (!read(page).includes('zero-demo-guard.js')) fail(page + '_missing_zero_demo_guard');
}

const guard = read('zero-demo-guard.js');
for (const token of ['navigator.clipboard.writeText', 'MutationObserver', 'תוכן אמיתי בלבד', 'תצוגת']) {
  if (!guard.includes(token)) fail('zero_demo_guard_missing_' + token);
}

const safeGenerator = read('scripts/generate-design-tokens-safe.cjs');
for (const token of ['CONTENT_ONLY_REAL', 'ui_files_overwritten=false', 'תוכן אמיתי בלבד']) {
  if (!safeGenerator.includes(token)) fail('safe_generator_missing_' + token);
}
for (const forbidden of ['smart-builder.html', 'smart-builder.css', 'smart-builder.js', 'placeholder']) {
  if (forbidden === 'placeholder') {
    if (safeGenerator.toLowerCase().includes(forbidden)) fail('safe_generator_contains_placeholder');
  } else if (safeGenerator.includes(`writeFileSync('${forbidden}'`) || safeGenerator.includes(`writeFileSync("${forbidden}"`)) {
    fail('safe_generator_overwrites_ui_file_' + forbidden);
  }
}

const filesToAudit = [
  'index.html',
  'smart-builder.html',
  'qa-mobile.html',
  'script.js',
  'smart-builder.js',
  'typography-extension.js',
  'advanced-typography-extension.js'
];

for (const file of filesToAudit) {
  const text = read(file);
  for (const pattern of FORBIDDEN_UI_PATTERNS) {
    pattern.lastIndex = 0;
    if (pattern.test(text)) fail(file + '_contains_forbidden_ui_word_' + pattern.source);
  }
}

console.log('ZERO_DEMO_AUDIT_OK');
console.log('guarded_pages=' + REQUIRED_GUARD_PAGES.length);
console.log('audited_files=' + filesToAudit.length);
console.log('safe_generator=present');
