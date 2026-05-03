const fs = require("fs");

function fail(msg) {
  console.error("SMART_BUILDER_FAIL=" + msg);
  process.exit(1);
}

for (const f of ["design-tokens.json","smart-builder.html","smart-builder.css","smart-builder.js"]) {
  if (!fs.existsSync(f)) fail("missing_" + f);
}

const data = JSON.parse(fs.readFileSync("design-tokens.json","utf8"));
if (!Array.isArray(data.tokens) || data.tokens.length < 100) fail("too_few_tokens");
if (!Array.isArray(data.categories) || data.categories.length < 8) fail("too_few_categories");

const ids = new Set();
for (const t of data.tokens) {
  if (!t.id || ids.has(t.id)) fail("bad_duplicate_id_" + t.id);
  ids.add(t.id);
  if (!t.category || !t.type || !t.name) fail("missing_metadata_" + t.id);
  if (!t.prompt || !t.prompt.includes("RTL") || !t.prompt.includes("לא דמו")) fail("bad_prompt_" + t.id);
  if (!t.copy || !t.copy.prompt || !t.copy.css === undefined) fail("bad_copy_" + t.id);
  if (t.type === "color" && !/^#[0-9A-Fa-f]{6}$/.test(t.value)) fail("bad_color_" + t.id);
}

const html = fs.readFileSync("smart-builder.html","utf8");
for (const token of ["design-tokens.json","grid","cats","uses","Smart Builder"]) {
  if (!html.includes(token)) fail("smart_html_missing_" + token);
}

const js = fs.readFileSync("smart-builder.js","utf8");
for (const token of ["navigator.clipboard","design-tokens.json","data-copy","copy","render"]) {
  if (!js.includes(token)) fail("smart_js_missing_" + token);
}

const index = fs.readFileSync("index.html","utf8");
if (!index.includes("smart-builder.html")) fail("homepage_missing_smart_builder_link");

console.log("SMART_BUILDER_OK");
console.log("tokens=" + data.tokens.length);
console.log("categories=" + data.categories.length);
console.log("uses=" + data.uses.length);
