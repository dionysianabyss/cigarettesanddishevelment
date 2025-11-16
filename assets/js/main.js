// Cigarettes & Dishevelment — main interactions
(function () {
  function internalLink(href) {
    try {
      const u = new URL(href, window.location.origin);
      return u.origin === window.location.origin;
    } catch (_) { return false; }
  }

  // Fade-in on load
  window.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('is-loaded');

    // Mobile nav toggle
    const nav = document.getElementById('site-nav');
    const btn = nav ? nav.querySelector('.menu-toggle') : null;
    const menu = nav ? nav.querySelector('#site-menu') : null;
    if (btn && nav && menu) {
      btn.addEventListener('click', function () {
        const open = nav.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      // Close on link click (mobile UX nicety)
      menu.addEventListener('click', function (e) {
        const a = e.target.closest('a');
        if (a && nav.classList.contains('is-open')) {
          nav.classList.remove('is-open');
          btn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Rotate taglines on home/any page
    let el = document.getElementById('rotating-tagline');
    if (!el) el = document.getElementById('hero-tagline');
    if (el) {
      let taglines = [];
      if (Array.isArray(window.CANON_TAGLINES) && window.CANON_TAGLINES.length) {
        taglines = window.CANON_TAGLINES;
      } else {
        try { taglines = JSON.parse(el.getAttribute('data-taglines') || '[]'); } catch (_) {}
      }
      if (taglines.length > 0) {
        let i = Math.floor(Math.random() * taglines.length);
        el.textContent = taglines[i];
        if (taglines.length === 1) return;
        setInterval(() => {
          i = (i + 1) % taglines.length;
          el.style.opacity = '0';
          setTimeout(() => { el.textContent = taglines[i]; el.style.opacity = '1'; }, 150);
        }, 3600);
      }
    }

    // Search overlay
    const overlay = document.getElementById('search-overlay');
    const openBtn = document.querySelector('.open-search');
    const closeBtn = document.getElementById('close-search');
    const input = document.getElementById('omni-search-input');
    const results = document.getElementById('omni-search-results');
    let searchData = null;
    function openOverlay() {
      if (!overlay) return;
      overlay.hidden = false;
      overlay.style.display = 'grid';
      overlay.setAttribute('aria-hidden', 'false');
      setTimeout(() => input && input.focus(), 0);
      if (!searchData) {
        const base = (window.SITE && window.SITE.baseurl) ? window.SITE.baseurl : '';
        fetch(base + '/search.json').then(r => r.json()).then(d => { searchData = d.items || []; }).catch(() => { searchData = []; });
      }
      document.addEventListener('keydown', escClose, { once: true });
    }
    function closeOverlay() {
      if (!overlay) return;
      overlay.hidden = true;
      overlay.style.display = 'none';
      overlay.setAttribute('aria-hidden', 'true');
    }
    function escClose(e) { if (e.key === 'Escape') { closeOverlay(); } else { document.addEventListener('keydown', escClose, { once: true }); } }
    if (openBtn) openBtn.addEventListener('click', openOverlay);
    if (closeBtn) closeBtn.addEventListener('click', closeOverlay);
    if (overlay) overlay.addEventListener('click', function (e) { if (e.target === overlay) closeOverlay(); });
    if (input && results) {
      function sanitize(s) { return (s || '').toString().toLowerCase(); }
      function tokenize(q) { return sanitize(q).split(/\s+/).filter(Boolean); }
      function matches(item, tokens) {
        if (!tokens.length) return false;
        const hay = sanitize((item.title||'')+' '+(item.excerpt||'')+' '+(item.content||'')+' '+(item.meta||''));
        return tokens.every(t => hay.indexOf(t) !== -1);
      }
      function render(items) {
        results.innerHTML = '';
        if (!items.length) { results.innerHTML = '<p class="muted">No results.</p>'; return; }
        const frag = document.createDocumentFragment();
        items.forEach(it => {
          const el = document.createElement('article');
          el.style.cssText = 'margin-bottom:1.0rem;padding-bottom:0.9rem;border-bottom:1px solid rgba(255,255,255,0.06)';
          el.innerHTML = '<h3 style="margin:0;font-size:1.05rem"><a href="' + it.url + '">' + it.title + '</a></h3>' + (it.excerpt ? '<div class="muted">' + it.excerpt + '</div>' : '');
          frag.appendChild(el);
        });
        results.appendChild(frag);
      }
      input.addEventListener('input', function () {
        const q = input.value || '';
        const tokens = tokenize(q);
        const out = (searchData && tokens.length) ? searchData.filter(it => matches(it, tokens)).slice(0, 50) : [];
        render(out);
      });
    }

    // Simple list filters for listing pages
    const filter = document.querySelector('[data-filter-target]');
    if (filter) {
      const list = document.querySelector(filter.getAttribute('data-filter-target'));
      if (list) {
        filter.addEventListener('input', function () {
          const q = (filter.value || '').toLowerCase();
          Array.from(list.querySelectorAll('[data-filter-item]')).forEach(item => {
            const text = (item.textContent || '').toLowerCase();
            item.style.display = text.indexOf(q) !== -1 ? '' : 'none';
          });
        });
      }
    }

    // Optional: melancholic reading mode (toggle with M)
    document.addEventListener('keydown', function (e) {
      if (e.key && (e.key.toLowerCase() === 'm')) {
        document.body.classList.toggle('is-melancholic');
      }
      // Keyboard shortcut: '/' opens search and focuses input unless typing in a field
      if (e.key === '/' && !(e.target && (/^(input|textarea)$/i).test(e.target.tagName))) {
        e.preventDefault();
        openOverlay();
      }
    });

    // Lazy-load images by default if not specified
    document.querySelectorAll('img').forEach(img => {
      try { if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy'); } catch (_) {}
    });
  });

  // Soft fade-out for internal navigation
  document.addEventListener('click', function (e) {
    const a = e.target.closest('a');
    if (!a) return;
    if (a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    if (internalLink(href)) {
      e.preventDefault();
      document.body.classList.add('fade-out');
      setTimeout(() => { window.location.href = a.href; }, 140);
    }
  }, { capture: true });
})();
