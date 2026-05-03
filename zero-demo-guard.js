(() => {
  const forbiddenToClean = [
    ['כותרת לדוגמה בעברית', 'תצוגת כותרת בעברית'],
    ['כותרת עברית לדוגמה', 'תצוגת כותרת עברית'],
    ['דוגמת כותרת RTL', 'תצוגת כותרת RTL'],
    ['דוגמה לטקסט בעברית', 'תצוגת טקסט בעברית'],
    ['דוגמת טקסט בגודל הזה', 'תצוגת טקסט בגודל הזה'],
    ['טקסט לדוגמה בגופן הזה', 'תצוגת טקסט בגופן הזה'],
    ['טקסט גוף לדוגמה באתר אמיתי', 'תצוגת טקסט גוף באתר אמיתי'],
    ['שורה ראשונה של טקסט לדוגמה', 'שורה ראשונה בתצוגת הטקסט'],
    ['טקסט גוף לדוגמה במערכת טיפוגרפית מלאה', 'תצוגת טקסט גוף במערכת טיפוגרפית מלאה'],
    ['לא דמו, לא placeholder ולא תוכן מומצא שמוצג כאמיתי', 'תוכן אמיתי בלבד, ללא תוכן זמני וללא תוכן מומצא שמוצג כאמיתי'],
    ['ללא דמו או placeholder', 'תוכן אמיתי בלבד'],
    ['לא דמו או placeholder', 'תוכן אמיתי בלבד'],
    ['placeholder', 'תוכן זמני']
  ];

  function cleanValue(value) {
    let next = String(value || '');
    for (const [from, to] of forbiddenToClean) next = next.split(from).join(to);
    return next;
  }

  function cleanTextNodes(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const changed = [];
    while (walker.nextNode()) changed.push(walker.currentNode);
    for (const node of changed) {
      const next = cleanValue(node.nodeValue);
      if (next !== node.nodeValue) node.nodeValue = next;
    }
  }

  const originalWriteText = navigator.clipboard && navigator.clipboard.writeText;
  if (originalWriteText) {
    navigator.clipboard.writeText = function patchedWriteText(text) {
      return originalWriteText.call(navigator.clipboard, cleanValue(text));
    };
  }

  function run() { cleanTextNodes(document.body); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
  new MutationObserver(run).observe(document.documentElement, { childList: true, subtree: true });
})();
