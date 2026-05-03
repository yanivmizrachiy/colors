const state = { data: null, category: 'הכול', use: 'הכול', query: '', selected: [] };
const $ = (selector) => document.querySelector(selector);

function toast(message, ok = true) {
  const t = $('#toast');
  t.textContent = message;
  t.style.background = ok ? '#052E16' : '#7F1D1D';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 1800);
}

async function copyText(text, message) {
  try {
    await navigator.clipboard.writeText(text || '');
    toast(message || 'הועתק בהצלחה');
  } catch (error) {
    toast('ההעתקה נכשלה — אפשר לסמן ולהעתיק ידנית', false);
  }
}

function getToken(id) {
  return state.data.tokens.find((token) => token.id === id);
}

function escapeHtml(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function matches(token) {
  const query = state.query.trim().toLowerCase();
  const haystack = [
    token.id,
    token.name,
    token.category,
    token.type,
    token.value,
    token.hsl,
    ...(token.use || [])
  ].filter(Boolean).join(' ').toLowerCase();

  return (state.category === 'הכול' || token.category === state.category)
    && (state.use === 'הכול' || (token.use || []).includes(state.use))
    && (!query || haystack.includes(query));
}

function preview(token) {
  if (token.type === 'color') {
    return `<div class="preview color-preview" style="background:${token.value};color:${token.contrast || '#fff'}"><b>${token.value}</b><small>${token.hsl || ''}</small></div>`;
  }

  if (token.type === 'font') {
    return `<div class="preview" style="font-family:'${token.value}',Arial,sans-serif"><b>כותרת בעברית</b><span>טקסט לדוגמה בגופן הזה.</span></div>`;
  }

  if (token.type === 'font-size') {
    return `<div class="preview" style="font-size:${token.value}">דוגמת טקסט בגודל הזה</div>`;
  }

  return `<div class="preview"><b>${escapeHtml(token.name)}</b><span>${escapeHtml((token.use || []).slice(0, 4).join(' · '))}</span></div>`;
}

function card(token) {
  const isSelected = state.selected.includes(token.id);
  return `<article class="card" id="${escapeHtml(token.id)}">
    <div class="card-head">
      <span class="badge">${escapeHtml(token.category)}</span>
      <button class="select ${isSelected ? 'active' : ''}" data-select="${escapeHtml(token.id)}" type="button">${isSelected ? 'נבחר ✓' : 'בחר'}</button>
    </div>
    <h3>${escapeHtml(token.name)}</h3>
    ${preview(token)}
    <div class="meta">${escapeHtml((token.use || []).join(' · '))}</div>
    <pre class="code">${escapeHtml(token.css || token.value || '')}</pre>
    <div class="actions">
      <button class="main" data-copy="prompt" data-id="${escapeHtml(token.id)}" type="button">העתק Prompt ל-GPT</button>
      <button data-copy="css" data-id="${escapeHtml(token.id)}" type="button">העתק CSS</button>
      <button data-copy="value" data-id="${escapeHtml(token.id)}" type="button">העתק ערך</button>
      <button data-copy="id" data-id="${escapeHtml(token.id)}" type="button">העתק מזהה</button>
    </div>
  </article>`;
}

function renderChips(elementSelector, items, key) {
  const values = ['הכול', ...items];
  $(elementSelector).innerHTML = values.map((value) => {
    const active = state[key] === value ? 'active' : '';
    return `<button class="chip ${active}" data-filter-key="${key}" data-filter-value="${escapeHtml(value)}" type="button">${escapeHtml(value)}</button>`;
  }).join('');
}

function renderSelected() {
  const list = state.selected.map(getToken).filter(Boolean);
  $('#selectedList').innerHTML = list.length
    ? list.map((token) => `<span class="selected-pill">${escapeHtml(token.name)}</span>`).join('')
    : 'עדיין לא נבחרו רכיבים.';
}

function buildSelectedPrompt() {
  const list = state.selected.map(getToken).filter(Boolean);
  if (!list.length) {
    return 'לא נבחרו רכיבי עיצוב. בחר צבעים, גופנים, גדלים, כפתורים או טבלאות מתוך Smart Builder לפני יצירת Prompt משולב.';
  }

  return [
    'בנה אתר חדש לפי בחירות העיצוב הבאות מתוך colors Smart Builder.',
    '',
    'הבחירות:',
    ...list.map((token) => `- ${token.category} / ${token.name} / ${token.value || token.id}: ${token.copy?.prompt || token.prompt}`),
    '',
    'דרישות מחייבות:',
    '- עברית RTL מלאה.',
    '- התאמה לנייד ולמחשב.',
    '- ללא גלילה אופקית.',
    '- לא דמו, לא placeholder, ולא תוכן מומצא שמוצג כאמיתי.',
    '- הפרדה בין HTML, CSS ו-JavaScript.',
    '- השתמש בבחירות האלה כסט עיצוב אחד עקבי ולא כאוסף מקרי.'
  ].join('\n');
}

function render() {
  const list = state.data.tokens.filter(matches);
  $('#stats').innerHTML = `
    <div class="stat">סה״כ tokens: ${state.data.tokens.length}</div>
    <div class="stat">מוצגים: ${list.length}</div>
    <div class="stat">נבחרו: ${state.selected.length}</div>
    <div class="stat">קטגוריות: ${state.data.categories.length}</div>`;
  $('#grid').innerHTML = list.map(card).join('');
  renderSelected();
}

async function init() {
  state.data = await fetch('design-tokens.json', { cache: 'no-store' }).then((response) => response.json());
  renderChips('#categoryChips', state.data.categories || [], 'category');
  renderChips('#useChips', (state.data.uses || []).slice(0, 42), 'use');
  render();

  $('#searchInput').addEventListener('input', (event) => {
    state.query = event.target.value;
    render();
  });

  $('#copySelectedPrompt').addEventListener('click', () => copyText(buildSelectedPrompt(), 'הועתק Prompt מכל הבחירות'));
  $('#clearSelected').addEventListener('click', () => {
    state.selected = [];
    render();
    toast('הבחירות נוקו');
  });

  document.body.addEventListener('click', (event) => {
    const chip = event.target.closest('[data-filter-key]');
    if (chip) {
      state[chip.dataset.filterKey] = chip.dataset.filterValue;
      renderChips('#categoryChips', state.data.categories || [], 'category');
      renderChips('#useChips', (state.data.uses || []).slice(0, 42), 'use');
      render();
      return;
    }

    const select = event.target.closest('[data-select]');
    if (select) {
      const id = select.dataset.select;
      state.selected = state.selected.includes(id)
        ? state.selected.filter((value) => value !== id)
        : [id, ...state.selected].slice(0, 30);
      render();
      return;
    }

    const copy = event.target.closest('[data-copy]');
    if (copy) {
      const token = getToken(copy.dataset.id);
      if (!token) return;
      const key = copy.dataset.copy;
      const payload = key === 'id' ? token.id : (token.copy?.[key] || token[key] || token.value || '');
      copyText(payload, key === 'prompt' ? 'הועתק Prompt ל-GPT' : 'הועתק');
    }
  });
}

init().catch((error) => {
  console.error(error);
  toast('שגיאה בטעינת Smart Builder', false);
});
