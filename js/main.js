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

    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }
  /**
   * Easy event listener function
   */
=======
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
   * Navbar link state on scroll
   ----------------------------*/
  const navbarlinks = select('#navbar .scrollto', true);
  const updateNavbarLinks = () => {
    const scrollY = window.scrollY + 200;
    navbarlinks.forEach(link => {
      const section = select(link.hash);
      if (!section) return;
      if (
        scrollY >= section.offsetTop &&
        scrollY <= (section.offsetTop + section.offsetHeight)
      ) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  window.addEventListener('load', updateNavbarLinks);
  onscroll(document, updateNavbarLinks);

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
   * Portfolio filtering with Isotope
   ----------------------------*/
  window.addEventListener('load', () => {
    const container = select('.portfolio-container');
    if (container) {
      const isotope = new Isotope(container, {
        itemSelector: '.portfolio-item'
      });

      const filters = select('#portfolio-flters li', true);
      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        filters.forEach(f => f.classList.remove('filter-active'));
        this.classList.add('filter-active');

        isotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        isotope.on('arrangeComplete', () => AOS.refresh());
      }, true);
    }
  });

  /*---------------------------
   * GLightbox (image viewer)
   ----------------------------*/
  GLightbox({ selector: '.portfolio-lightbox' });

  /*---------------------------
   * Portfolio details slider
   ----------------------------*/
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    }
  });

  /*---------------------------
   * Testimonials slider
   ----------------------------*/
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 20 },
      1200: { slidesPerView: 3, spaceBetween: 20 }
    }
  });

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
