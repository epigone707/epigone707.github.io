// Custom scroll-spy to highlight the current section in the TOC (#toc).
//
// Why not Bootstrap's scrollspy? When a heading id contains non-ASCII
// characters (e.g. Chinese), the TOC link href is URL-encoded while the
// heading id is not (e.g. href="#21-%E6%B3%95%E5%B8%88..." vs id="21-法师的故事").
// Bootstrap's scrollspy matches hrefs as CSS selectors, so it can never find
// those targets and highlighting silently fails.
//
// This implementation decodes the href back to the raw id, tracks the scroll
// position, and toggles the `active` class on the matching TOC items.
(function () {
  var OFFSET = 80; // px below the top of the viewport considered "current"

  function decodeId(href) {
    try {
      return decodeURIComponent(href);
    } catch (e) {
      return href;
    }
  }

  window.initScrollSpy = function () {
    var toc = document.getElementById('toc');
    if (!toc) return;

    var items = [];
    var links = toc.querySelectorAll('a[href^="#"]');
    links.forEach(function (link) {
      var el = document.getElementById(decodeId(link.getAttribute('href').slice(1)));
      if (el) items.push({ link: link, target: el });
    });
    if (!items.length) return;

    function setActive(item) {
      links.forEach(function (l) {
        l.parentElement.classList.remove('active');
      });
      if (item) item.link.parentElement.classList.add('active');
    }

    function update() {
      var pos = window.scrollY + OFFSET;
      var current = null;
      items.forEach(function (item) {
        var top = item.target.getBoundingClientRect().top + window.scrollY;
        if (top <= pos) current = item;
      });
      setActive(current);
    }

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        update();
        ticking = false;
      });
    }, { passive: true });

    window.addEventListener('resize', update);
    update();
  };
})();
