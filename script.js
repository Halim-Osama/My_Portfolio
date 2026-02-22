/* ── PORTFOLIO SCRIPT ─────────────────── */

(function () {
  'use strict';

  /* ── CUSTOM CURSOR ─────────────────── */
  var dot = document.getElementById('cur-dot');
  var ring = document.getElementById('cur-ring');

  if (dot && ring) {
    var mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
    });

    (function loop() {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      requestAnimationFrame(loop);
    })();

    document.querySelectorAll('a, button, .stat, .skill-group, .clink, .proj, .exp-card').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        dot.style.width = '14px';
        dot.style.height = '14px';
        ring.style.width = '46px';
        ring.style.height = '46px';
      });
      el.addEventListener('mouseleave', function () {
        dot.style.width = '8px';
        dot.style.height = '8px';
        ring.style.width = '32px';
        ring.style.height = '32px';
      });
    });
  }

  /* ── SCROLL REVEAL ─────────────────── */
  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var delay = parseInt(entry.target.getAttribute('data-d') || '0');
        setTimeout(function () {
          entry.target.classList.add('on');
        }, delay);
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(function (el, i) {
    el.setAttribute('data-d', String((i % 5) * 65));
    revealObs.observe(el);
  });

  /* ── PROJECT FILTER ────────────────── */
  var fbtns = document.querySelectorAll('.fbtn');
  var projs = document.querySelectorAll('.proj');

  fbtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Update active button
      fbtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var filter = btn.getAttribute('data-f');

      projs.forEach(function (proj) {
        if (filter === 'all') {
          proj.classList.remove('hidden');
        } else {
          var cat = proj.getAttribute('data-cat');
          if (cat === filter) {
            proj.classList.remove('hidden');
          } else {
            proj.classList.add('hidden');
          }
        }
      });
    });
  });

  /* ── MOBILE HAMBURGER MENU ─────────── */
  var hamburger = document.querySelector('.nav-hamburger');
  var mobileMenu = document.querySelector('.nav-mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  /* ── NAV ACTIVE STATE ON SCROLL ────── */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-links a, .nav-mobile-menu a');

  function updateActiveNav() {
    var scrollPos = window.scrollY + 100;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var bottom = top + section.offsetHeight;
      var id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(function (link) {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + id) {
            link.style.color = 'var(--text)';
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  /* ── SMOOTH SCROLL FOR ANCHOR LINKS ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── NAV SCROLL SHADOW ─────────────── */
  var nav = document.querySelector('nav');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
      nav.style.boxShadow = '0 4px 40px rgba(0,0,0,.4)';
    } else {
      nav.style.boxShadow = 'none';
    }
  }, { passive: true });

})();
