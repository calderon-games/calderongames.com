// Calderon Games — site behavior
// 1) Theme toggle (system default already applied pre-paint by the inline head script)
// 2) Mobile nav
// 3) Footer year

(function () {
  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');
  var meta = document.querySelector('meta[name="theme-color"]');
  var mq = window.matchMedia('(prefers-color-scheme: dark)');

  function currentTheme() {
    var attr = root.getAttribute('data-theme');
    return (attr === 'light' || attr === 'dark') ? attr : (mq.matches ? 'dark' : 'light');
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (toggle) {
      toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    }
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0B0A0D' : '#FBF7F0');
  }

  // Sync the toggle's label with whatever the pre-paint script already applied.
  applyTheme(currentTheme());

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem('cg-theme', next); } catch (e) {}
    });
  }

  // Follow the OS live, but only while the person hasn't chosen a theme manually.
  mq.addEventListener('change', function (e) {
    var stored = null;
    try { stored = localStorage.getItem('cg-theme'); } catch (err) {}
    if (stored !== 'light' && stored !== 'dark') {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
})();

(function () {
  var btn = document.getElementById('nav-toggle');
  var nav = document.getElementById('mobile-nav');
  if (!btn || !nav) return;

  btn.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();

var yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
