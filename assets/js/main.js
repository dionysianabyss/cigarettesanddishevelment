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

    // Rotate taglines on home
    const el = document.getElementById('rotating-tagline');
    if (el) {
      let taglines = [];
      try { taglines = JSON.parse(el.getAttribute('data-taglines') || '[]'); } catch (_) {}
      if (taglines.length > 1) {
        let i = 0;
        setInterval(() => {
          i = (i + 1) % taglines.length;
          el.style.opacity = '0';
          setTimeout(() => { el.textContent = taglines[i]; el.style.opacity = '1'; }, 150);
        }, 3600);
      }
    }
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
