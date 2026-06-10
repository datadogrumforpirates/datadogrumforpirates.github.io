/**
 * Custom Portfolio Template Script
 * Based on: iPortfolio by BootstrapMade (v3.7.0)
 */

console.log("🦜 Ahoy! Script is running!");

(() => {
  "use strict";

  /*---------------------------
   * Helper Functions
   ----------------------------*/
  const select = (el, all = false) => {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  const on = (type, el, listener, all = false) => {
    const elements = select(el, all);
    if (elements) {
      (all ? elements : [elements]).forEach(e => e.addEventListener(type, listener));
    }
  };

  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
  };

  const scrollto = (el) => {
    const target = select(el);
    if (!target) return;
    window.scrollTo({
      top: target.offsetTop,
      behavior: 'smooth'
    });
  };

  /*---------------------------
   * Back to top button
   ----------------------------*/
  const backToTop = select('.back-to-top');
  const toggleBackToTop = () => {
    if (backToTop) {
      backToTop.classList.toggle('active', window.scrollY > 100);
    }
  };

  window.addEventListener('load', toggleBackToTop);
  onscroll(document, toggleBackToTop);

  /*---------------------------
   * Mobile nav toggle
   ----------------------------*/
  on('click', '.mobile-nav-toggle', function () {
    const body = select('body');
    body.classList.toggle('mobile-nav-active');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  /*---------------------------
   * Smooth scroll for .scrollto links
   ----------------------------*/
  on('click', '.scrollto', function (e) {
    const target = select(this.hash);
    if (target) {
      e.preventDefault();
      const body = select('body');
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active');
        const toggle = select('.mobile-nav-toggle');
        toggle.classList.toggle('bi-list');
        toggle.classList.toggle('bi-x');
      }
      scrollto(this.hash);
    }
  }, true);

  /*---------------------------
   * Smooth scroll on load (hash link)
   ----------------------------*/
  window.addEventListener('load', () => {
    if (window.location.hash && select(window.location.hash)) {
      scrollto(window.location.hash);
    }
  });

  /*---------------------------
   * Typed text effect
   ----------------------------*/
  const typed = select('.typed');
  if (typed) {
    const typedStrings = typed.getAttribute('data-typed-items').split(',');
    new Typed('.typed', {
      strings: typedStrings,
      loop: false,
      typeSpeed: 50,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /*---------------------------
   * AOS init (on scroll animation)
   ----------------------------*/
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  });
})();
