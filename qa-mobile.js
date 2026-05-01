const $ = (selector) => document.querySelector(selector);
const results = $('#results');
const summary = $('#summary');
const toast = $('#toast');
const reportBox = $('#reportBox');

let lastReport = 'עדיין לא הורצה בדיקה.';

function showToast(message, ok = true) {
  toast.textContent = message;
  toast.style.background = ok ? '#052E16' : '#7F1D1D';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
}

function addResult(name, status, details) {
  const div = document.createElement('div');
  div.className = `result ${status}`;
  const icon = status === 'ok' ? '✅' : status === 'warn' ? '⚠️' : '❌';
  div.innerHTML = `<strong>${icon} ${name}</strong><small>${details}</small>`;
  results.appendChild(div);
}

async function fetchText(url) {
  const response = await fetch(url, { cache: 'no-store' });
  const text = await response.text();
  return { response, text };
}

function buildReport(rows, ok, warn, bad) {
  const lines = [];
  lines.push('colors QA mobile report');
  lines.push(`url=${location.href}`);
  lines.push(`userAgent=${navigator.userAgent}`);
  lines.push(`viewport=${window.innerWidth}x${window.innerHeight}`);
  lines.push(`result=${ok} ok, ${warn} warn, ${bad} bad`);
  lines.push('checks:');
  for (const row of rows) {
    lines.push(`- ${row.status.toUpperCase()} | ${row.name} | ${row.details}`);
  }
  lines.push('manual still required: צפה, העתק Prompt ל-GPT, הוסף לחבילה, העתק Prompt חבילה, הדבקה בצ׳אט.');
  return lines.join('\n');
}

async function runAllChecks() {
  results.innerHTML = '';
  summary.textContent = 'מריץ בדיקות...';
  let ok = 0;
  let warn = 0;
  let bad = 0;
  const rows = [];

  const record = (name, status, details) => {
    addResult(name, status, details);
    rows.push({ name, status, details });
    if (status === 'ok') ok += 1;
    if (status === 'warn') warn += 1;
    if (status === 'bad') bad += 1;
  };

  try {
    const width = document.documentElement.scrollWidth;
    const viewport = window.innerWidth;
    if (width <= viewport + 2) record('רוחב מסך', 'ok', `אין גלילה אופקית מזוהה. scrollWidth=${width}, viewport=${viewport}`);
    else record('רוחב מסך', 'bad', `יש חשד לגלילה אופקית. scrollWidth=${width}, viewport=${viewport}`);
  } catch (error) {
    record('רוחב מסך', 'warn', error.message);
  }

  try {
    const { response, text } = await fetchText('site.config.json');
    const cfg = JSON.parse(text);
    const count = Array.isArray(cfg.components) ? cfg.components.length : 0;
    if (response.ok && count >= 100) record('טעינת רכיבים', 'ok', `site.config.json נטען. רכיבים=${count}`);
    else record('טעינת רכיבים', 'bad', `מספר רכיבים לא תקין: ${count}`);
  } catch (error) {
    record('טעינת רכיבים', 'bad', error.message);
  }

  try {
    const { response, text } = await fetchText('script.js');
    const required = ['navigator.clipboard', 'openModal', 'data-copy', 'data-view', 'bundlePrompt'];
    const missing = required.filter((token) => !text.includes(token));
    if (response.ok && missing.length === 0) record('קוד האפליקציה', 'ok', 'script.js כולל צפייה, העתקה וחבילת Prompt.');
    else record('קוד האפליקציה', 'bad', `חסרים: ${missing.join(', ')}`);
  } catch (error) {
    record('קוד האפליקציה', 'bad', error.message);
  }

  try {
    localStorage.setItem('colors:qa-test', 'ok');
    const value = localStorage.getItem('colors:qa-test');
    if (value === 'ok') record('LocalStorage', 'ok', 'שמירת מועדפים/בחירות אפשרית בדפדפן הזה.');
    else record('LocalStorage', 'bad', 'שמירה מקומית לא חזרה נכון.');
  } catch (error) {
    record('LocalStorage', 'bad', error.message);
  }

  try {
    if (navigator.clipboard && window.isSecureContext) record('Clipboard API', 'ok', 'הדפדפן תומך בהעתקה מאובטחת.');
    else if (navigator.clipboard) record('Clipboard API', 'warn', 'Clipboard קיים, אבל ההקשר אינו מאובטח לגמרי.');
    else record('Clipboard API', 'bad', 'הדפדפן לא מדווח על Clipboard API.');
  } catch (error) {
    record('Clipboard API', 'bad', error.message);
  }

  try {
    const links = ['index.html', 'site.config.json', 'styles.css', 'script.js'];
    for (const link of links) {
      const response = await fetch(link, { cache: 'no-store' });
      if (!response.ok) throw new Error(`${link} returned ${response.status}`);
    }
    record('קבצים חיוניים', 'ok', 'index, config, CSS ו-JS נטענים מהאתר החי.');
  } catch (error) {
    record('קבצים חיוניים', 'bad', error.message);
  }

  summary.textContent = `תוצאה: ${ok} תקין, ${warn} אזהרות, ${bad} נכשלו.`;
  summary.style.background = bad ? '#FEF2F2' : warn ? '#FFFBEB' : '#ECFDF5';
  summary.style.color = bad ? '#7F1D1D' : warn ? '#92400E' : '#065F46';
  lastReport = buildReport(rows, ok, warn, bad);
  reportBox.textContent = lastReport;
}

async function copyText(text, successMessage) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(successMessage);
  } catch (error) {
    showToast('ההעתקה נכשלה בדפדפן הזה', false);
  }
}

async function copyTest() {
  const text = $('#copyValue').textContent.trim();
  await copyText(text, 'הועתק בהצלחה');
}

async function copyReport() {
  await copyText(lastReport, 'סיכום הבדיקה הועתק');
}

$('#runAll').addEventListener('click', runAllChecks);
$('#copyTest').addEventListener('click', copyTest);
$('#copyReport').addEventListener('click', copyReport);
runAllChecks();
