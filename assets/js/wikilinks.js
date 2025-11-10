// Wikilinks ([[...]])) transformer for rendered content
// Converts [[path/to/page|Label]] to anchor tags at runtime (client-side only)
(function () {
  const SELECTOR_ROOT = '.wikicontent';
  const BLOCKERS = new Set(['A', 'CODE', 'PRE', 'SCRIPT', 'STYLE']);
  // Accept [[target|Label]] or [[target Label]] (whitespace alias)
  const WIKI_RE = /\[\[([^\]|]+?)(?:\s*\|\s*([^\]]+)|\s+([^\]]+))?\]\]/g;

  function slugifyPath(raw) {
    // keep slashes for nested paths; normalize spaces to underscores
    return raw.trim().split('/').map(seg => seg.trim().toLowerCase().replace(/\s+/g, '_')).join('/');
  }

  function ensureTrailingSlash(path) {
    if (!path.endsWith('/')) return path + '/';
    return path;
  }

  function resolveHref(target) {
    const base = (window.SITE && window.SITE.baseurl) ? window.SITE.baseurl : '';
    const p = slugifyPath(target);
    const href = ensureTrailingSlash('/' + p);
    return base + href;
  }

  function processNode(node) {
    const text = node.nodeValue;
    if (!WIKI_RE.test(text)) return; // quick check
    WIKI_RE.lastIndex = 0;
    const frag = document.createDocumentFragment();
    let lastIndex = 0; let m;
    while ((m = WIKI_RE.exec(text)) !== null) {
      const [full, targetRaw, labelPipe, labelSpace] = m;
      const labelRaw = labelPipe || labelSpace;
      const idx = m.index;
      if (idx > lastIndex) frag.appendChild(document.createTextNode(text.slice(lastIndex, idx)));
      const a = document.createElement('a');
      const href = resolveHref(targetRaw);
      a.setAttribute('href', href);
      a.textContent = (labelRaw && labelRaw.trim()) || targetRaw.trim();
      frag.appendChild(a);
      lastIndex = idx + full.length;
    }
    if (lastIndex < text.length) frag.appendChild(document.createTextNode(text.slice(lastIndex)));
    node.parentNode.replaceChild(frag, node);
  }

  function walk(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(n) {
        const p = n.parentElement;
        if (!p) return NodeFilter.FILTER_REJECT;
        if (BLOCKERS.has(p.tagName)) return NodeFilter.FILTER_REJECT;
        if (!WIKI_RE.test(n.nodeValue)) return NodeFilter.FILTER_SKIP;
        WIKI_RE.lastIndex = 0;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const texts = [];
    while (walker.nextNode()) texts.push(walker.currentNode);
    texts.forEach(processNode);
  }

  window.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll(SELECTOR_ROOT).forEach(walk);
  });
})();
