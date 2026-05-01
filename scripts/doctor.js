const fs = require("fs");

function fail(msg) {
  console.error("COLORS_DOCTOR_FAIL=" + msg);
  process.exit(1);
}

const required = [
  "index.html",
  "styles.css",
  "script.js",
  "site.config.json",
  "RULES.md",
  "README.md",
  "manifest.webmanifest",
  "sw.js",
  ".nojekyll",
  ".github/workflows/validate.yml",
  ".github/workflows/pages.yml"
];

for (const file of required) {
  if (!fs.existsSync(file)) fail("missing_" + file);
}

const cfg = JSON.parse(fs.readFileSync("site.config.json", "utf8"));
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
  if (!c.copy || !c.copy.prompt || !c.copy.css === undefined || !c.copy.link || !c.copy.styleId) {
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

const html = fs.readFileSync("index.html", "utf8");
const js = fs.readFileSync("script.js", "utf8");
const css = fs.readFileSync("styles.css", "utf8");

for (const token of ["viewModal", "promptPreview", "componentGrid", "bottom-nav", "styleCart"]) {
  if (!html.includes(token)) fail("html_missing_" + token);
}

for (const token of ["navigator.clipboard", "openModal", "data-copy", "data-view", "localStorage", "bundlePrompt", "data-select"]) {
  if (!js.includes(token)) fail("js_missing_" + token);
}
if (js.includes("data-view")) viewable = cfg.components.length;

for (const token of ["@media", "bottom-nav", "component-grid", "modal-card"]) {
  if (!css.includes(token)) fail("css_missing_" + token);
}

console.log("COLORS_DOCTOR_OK");
console.log("components=" + cfg.components.length);
console.log("categories=" + categories.size);
console.log("copy_payloads=" + copyPayloads);
console.log("strong_prompts=" + strongPrompts);
console.log("real_colors=" + realColors);
console.log("dynamic_view_buttons=" + viewable);
