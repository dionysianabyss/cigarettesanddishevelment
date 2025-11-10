// Lightweight client-side search pulling from /search.json
(function () {
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.from((root || document).querySelectorAll(sel)); }

  function sanitize(s) { return (s || '').toString().toLowerCase(); }
  function tokenize(q) { return sanitize(q).split(/\s+/).filter(Boolean); }

  function matches(item, tokens) {
    if (!tokens.length) return false;
    const hay = sanitize(
      (item.title || '') + ' ' + (item.excerpt || '') + ' ' + (item.content || '') + ' ' + (item.meta || '')
    );
    return tokens.every(t => hay.indexOf(t) !== -1);
  }

  function render(items, root) {
    root.innerHTML = '';
    if (!items.length) { root.innerHTML = '<p class="muted">No results.</p>'; return; }
    const frag = document.createDocumentFragment();
    items.forEach(it => {
      const el = document.createElement('article');
      el.style.cssText = 'margin-bottom:1.25rem;padding-bottom:1rem;border-bottom:1px solid rgba(255,255,255,0.06)';
      el.innerHTML = '<h3 style="margin:0"><a href="' + it.url + '">' + it.title + '</a></h3>' +
                     (it.excerpt ? '<div class="muted">' + it.excerpt + '</div>' : '');
      frag.appendChild(el);
    });
    root.appendChild(frag);
  }

  window.addEventListener('DOMContentLoaded', function () {
    const input = $('#search-input');
    const results = $('#search-results');
    if (!input || !results) return;
    const base = (window.SITE && window.SITE.baseurl) ? window.SITE.baseurl : '';
    fetch(base + '/search.json')
      .then(r => r.json())
      .then(data => {
        const items = data.items || [];
        function run() {
          const q = input.value || '';
          const tokens = tokenize(q);
          const out = tokens.length ? items.filter(it => matches(it, tokens)).slice(0, 50) : [];
          render(out, results);
        }
        input.addEventListener('input', run);
        run();
      })
      .catch(() => { results.innerHTML = '<p class="muted">Search unavailable.</p>'; });
  });
})();
