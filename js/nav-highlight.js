// Highlight the current section's tab in the site navigation.
// - Section pages (e.g. /life/) are matched exactly (also done server-side in
//   _includes/header.html), and
// - posts / tag pages (e.g. /life/2022/07/21/life1.html) are matched by prefix.
(function () {
  function highlightNav() {
    var path = window.location.pathname;
    var links = document.querySelectorAll('.site-nav .page-link');
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      var href = link.getAttribute('href') || '';
      var hrefPath = href;
      try {
        hrefPath = new URL(href, window.location.origin).pathname;
      } catch (e) {
        // fall back to the raw href
      }
      // never highlight the home link
      if (hrefPath === '/' || hrefPath === '') {
        continue;
      }
      var trimmed = hrefPath.replace(/\/+$/, '');
      if (path === hrefPath || path.indexOf(trimmed + '/') === 0) {
        link.classList.add('active');
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', highlightNav);
  } else {
    highlightNav();
  }
})();
