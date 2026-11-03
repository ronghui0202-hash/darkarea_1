/* 暗夜计划 · 全站脚本 */
(function () {
  'use strict';

  /* --- 滚动后页头收紧 --- */
  var header = document.getElementById('siteHeader');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* --- 移动端菜单 --- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('siteNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? '收起导航' : '展开导航');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var EASE = 'cubic-bezier(.22,.61,.36,1)';

  /* --- 封面文字入场 --- */
  var reveal = document.querySelectorAll('.hero-title, .hero-lede, .hero-actions');
  if (reveal.length && !reduce) {
    Array.prototype.forEach.call(reveal, function (el, i) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity .85s ' + EASE + ', transform .85s ' + EASE;
      setTimeout(function () {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 120 + i * 110);
    });
  }

  /* --- 滚动淡入 --- */
  var faders = document.querySelectorAll('.pillar, .intro-text');
  if ('IntersectionObserver' in window && faders.length && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.style.opacity = '1';
          en.target.style.transform = 'translateY(0)';
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    Array.prototype.forEach.call(faders, function (el, i) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      var d = (i % 3) * 85 + 'ms';
      el.style.transition = 'opacity .75s ' + EASE + ' ' + d + ', transform .75s ' + EASE + ' ' + d;
      io.observe(el);
    });
  }
})();
