const https = require("https");

const OWNER = process.env.COLORS_OWNER || "yanivmizrachiy";
const REPO = process.env.COLORS_REPO || "colors";
const baseUrl = `https://${OWNER}.github.io/${REPO}/`;

function get(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => data += chunk);
      res.on("end", () => resolve({ url, status: res.statusCode, body: data.slice(0, 2000) }));
    }).on("error", (err) => resolve({ url, status: 0, error: err.message, body: "" }));
  });
}

(async () => {
  const checks = [
    baseUrl,
    baseUrl + "index.html",
    baseUrl + "site.config.json",
    baseUrl + "styles.css",
    baseUrl + "script.js"
  ];

  const results = [];
  for (const url of checks) {
    results.push(await get(url));
  }

  let ok = true;
  for (const r of results) {
    if (r.status < 200 || r.status >= 300) ok = false;
  }

  const configResult = results.find(r => r.url.endsWith("site.config.json"));
  if (configResult && configResult.status === 200) {
    try {
      const cfg = JSON.parse(configResult.body);
      if (!cfg.components || cfg.components.length < 100) ok = false;
    } catch {
      ok = false;
    }
  } else {
    ok = false;
  }

  console.log(ok ? "COLORS_PAGES_AUDIT_OK" : "COLORS_PAGES_AUDIT_FAIL");
  console.log("PAGES_URL=" + baseUrl);
  for (const r of results) {
    console.log(`${r.status} ${r.url}`);
  }

  if (!ok) process.exit(1);
})();
