const fs = require("fs");

function fail(msg) {
  console.error("COLORS_DOCTOR_FAIL=" + msg);
  process.exit(1);
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function mustFile(file) {
  if (!fs.existsSync(file)) fail("missing_" + file);
}

function mustInclude(label, text, tokens) {
  for (const token of tokens) {
    if (!text.includes(token)) fail(label + "_missing_" + token);
  }
}

const required = [
  "index.html",
  "styles.css",
  "script.js",
  "site.config.json",
  "design-tokens.json",
  "smart-builder.html",
  "smart-builder.css",
  "smart-builder.js",
  "qa-mobile.html",
  "qa-mobile.css",
  "qa-mobile.js",
  "typography-extension.js",
  "advanced-typography-extension.js",
  "RULES.md",
  "README.md",
  "manifest.webmanifest",
  "sw.js",
  ".nojekyll",
  ".github/workflows/validate.yml",
  ".github/workflows/pages.yml"
];

for (const file of required) mustFile(file);

const cfg = JSON.parse(read("site.config.json"));
if (!cfg.project || cfg.project.name !== "colors") fail("bad_project_name");
if (!Array.isArray(cfg.components) || cfg.components.length < 100) fail("too_few_components");

const ids = new Set();
const categories = new Set();
let strongPrompts = 0;
let copyPayloads = 0;
let realColors = 0;
let viewable = 0;

for (const c of cfg.components) {
  if (!c.id || ids.has(c.id)) fail("duplicate_or_missing_id_" + c.id);
  ids.add(c.id);
  categories.add(c.category);

  if (!c.name || !c.type || !c.category) fail("missing_metadata_" + c.id);
  if (!c.copy || !c.copy.prompt || c.copy.css === undefined || !c.copy.link || !c.copy.styleId) {
    fail("missing_copy_payload_" + c.id);
  }
  copyPayloads++;

  const p = c.copy.prompt;
  for (const must of ["RTL", "נייד", "לא דמו", "HTML", "CSS", "JavaScript"]) {
    if (!p.includes(must)) fail("weak_prompt_" + c.id + "_missing_" + must);
  }
  if (p.length < 230) fail("prompt_too_short_" + c.id);
  strongPrompts++;

  if (c.hex) {
    if (!/^#[0-9A-Fa-f]{6}$/.test(c.hex)) fail("bad_hex_" + c.id);
    if (!/^hsl\(\d+ \d+% \d+%\)$/.test(c.hsl || "")) fail("bad_hsl_" + c.id);
    realColors++;
  }
}

const tokensData = JSON.parse(read("design-tokens.json"));
if (!Array.isArray(tokensData.tokens) || tokensData.tokens.length < 100) fail("too_few_design_tokens");
if (!Array.isArray(tokensData.categories) || tokensData.categories.length < 5) fail("too_few_token_categories");
if (!Array.isArray(tokensData.uses) || tokensData.uses.length < 20) fail("too_few_token_uses");

const tokenIds = new Set();
let tokenCopyPayloads = 0;
let tokenPrompts = 0;
let tokenColors = 0;

for (const token of tokensData.tokens) {
  if (!token.id || tokenIds.has(token.id)) fail("duplicate_or_missing_token_id_" + token.id);
  tokenIds.add(token.id);
  if (!token.name || !token.type || !token.category) fail("missing_token_metadata_" + token.id);
  if (!Array.isArray(token.use) || token.use.length < 1) fail("missing_token_use_" + token.id);
  if (!token.copy || !token.copy.prompt || token.copy.css === undefined || token.copy.value === undefined || !token.copy.id) {
    fail("missing_token_copy_payload_" + token.id);
  }
  tokenCopyPayloads++;

  const prompt = token.copy.prompt || token.prompt || "";
  for (const must of ["RTL", "נייד", "לא דמו"]) {
    if (!prompt.includes(must)) fail("weak_token_prompt_" + token.id + "_missing_" + must);
  }
  tokenPrompts++;

  if (token.type === "color") {
    if (!/^#[0-9A-Fa-f]{6}$/.test(token.value || "")) fail("bad_token_color_" + token.id);
    tokenColors++;
  }
}

const html = read("index.html");
const js = read("script.js");
const css = read("styles.css");
const smartHtml = read("smart-builder.html");
const smartJs = read("smart-builder.js");
const smartCss = read("smart-builder.css");
const qaHtml = read("qa-mobile.html");
const qaJs = read("qa-mobile.js");
const qaCss = read("qa-mobile.css");
const typography = read("typography-extension.js");
const advancedTypography = read("advanced-typography-extension.js");

mustInclude("index_html", html, [
  "viewModal",
  "promptPreview",
  "componentGrid",
  "bottom-nav",
  "styleCart",
  "qa-mobile.html",
  "smart-builder.html",
  "typography-extension.js",
  "advanced-typography-extension.js"
]);

mustInclude("script_js", js, [
  "navigator.clipboard",
  "openModal",
  "data-copy",
  "data-view",
  "localStorage",
  "bundlePrompt",
  "data-select"
]);
if (js.includes("data-view")) viewable = cfg.components.length;

mustInclude("styles_css", css, ["@media", "bottom-nav", "component-grid", "modal-card"]);

mustInclude("smart_builder_html", smartHtml, [
  "searchInput",
  "categoryChips",
  "useChips",
  "selectedList",
  "copySelectedPrompt",
  "clearSelected",
  "smart-builder.js"
]);

mustInclude("smart_builder_js", smartJs, [
  "design-tokens.json",
  "buildSelectedPrompt",
  "copySelectedPrompt",
  "categoryChips",
  "useChips",
  "selectedList",
  "data-select",
  "data-copy"
]);

mustInclude("smart_builder_css", smartCss, [
  "@media",
  "topbar",
  "selected-panel",
  "selected-pill",
  "grid",
  "actions",
  "toast"
]);

mustInclude("qa_mobile_html", qaHtml, [
  "runAll",
  "copyTest",
  "copyReport",
  "reportBox",
  "site.config.json",
  "בדיקות ידניות"
]);

mustInclude("qa_mobile_js", qaJs, [
  "runAllChecks",
  "navigator.clipboard",
  "localStorage",
  "site.config.json",
  "design-tokens.json",
  "smart-builder.html",
  "smart-builder.js",
  "smart-builder.css",
  "typography-extension.js",
  "advanced-typography-extension.js",
  "scrollWidth",
  "copyReport",
  "buildReport"
]);

mustInclude("qa_mobile_css", qaCss, ["@media", "qa-shell", "btn primary", "checklist", "toast"]);

mustInclude("typography_extension", typography, [
  "font-heebo-premium",
  "size-fluid-hero",
  "data-copy-font-prompt",
  "data-copy-size-prompt",
  "data-copy-pair-prompt"
]);

mustInclude("advanced_typography_extension", advancedTypography, [
  "advancedTypography",
  "adv-font-heebo",
  "adv-size-hero-fluid",
  "adv-weight-bold",
  "adv-leading-readable",
  "adv-system-math-premium",
  "data-adv-copy"
]);

console.log("COLORS_DOCTOR_OK");
console.log("components=" + cfg.components.length);
console.log("categories=" + categories.size);
console.log("copy_payloads=" + copyPayloads);
console.log("strong_prompts=" + strongPrompts);
console.log("real_colors=" + realColors);
console.log("dynamic_view_buttons=" + viewable);
console.log("design_tokens=" + tokensData.tokens.length);
console.log("token_categories=" + tokensData.categories.length);
console.log("token_uses=" + tokensData.uses.length);
console.log("token_copy_payloads=" + tokenCopyPayloads);
console.log("token_prompts=" + tokenPrompts);
console.log("token_colors=" + tokenColors);
console.log("smart_builder=present");
console.log("mobile_qa=present");
console.log("typography=advanced");
