/* ============================================================
   NTIC ALUMNI BUSINESS NETWORKING EVENT 2026 — SCRIPTS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ======== COUNTDOWN ========
  const eventDate = new Date('2026-07-25T09:00:00');

  function updateCountdown() {
    const now = new Date();
    const diff = eventDate - now;

    if (diff <= 0) {
      document.getElementById('cd-days').textContent = '00';
      document.getElementById('cd-hours').textContent = '00';
      document.getElementById('cd-mins').textContent = '00';
      document.getElementById('cd-secs').textContent = '00';
      return;
    }

    const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs  = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('cd-days').textContent  = String(days).padStart(2, '0');
    document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('cd-mins').textContent  = String(mins).padStart(2, '0');
    document.getElementById('cd-secs').textContent  = String(secs).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);


  // ======== FAQ ACCORDION ========
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn    = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // Close all
      faqItems.forEach(i => {
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        i.querySelector('.faq-answer').classList.remove('open');
      });

      // Toggle current
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        answer.classList.add('open');
      }
    });
  });


  // ======== NAVBAR SCROLL ========
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });


  // ======== ACTIVE NAV LINK ========
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));


  // ======== HAMBURGER MENU ========
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });


  // ======== STICKY CTA ========
const hero      = document.getElementById('home');
const contact   = document.getElementById('contact');
const stickyCta = document.querySelector('.sticky-cta');

if (stickyCta && hero && contact) {
  function updateCta() {
    const heroBottom = hero.getBoundingClientRect().bottom;
    const contactTop = contact.getBoundingClientRect().top;

    // Show only when:
    // 1. Hero has fully scrolled above viewport (heroBottom < 0)
    // 2. Contact section hasn't entered viewport yet (contactTop > window height)
    // This works perfectly in both scroll directions automatically.
    stickyCta.style.display =
      (heroBottom < 0 && contactTop > window.innerHeight) ? 'block' : 'none';
  }

  window.addEventListener('scroll', updateCta, { passive: true });
  updateCta(); // run once on load in case page is already scrolled
}
  // ======== SMOOTH SCROLL ========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 68; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  // ======== SCROLL REVEAL ========
  const revealEls = document.querySelectorAll(
    '.why-card, .speaker-card, .testimonial-card, .sponsor-card, .faq-item, .pillar, .contact-item'
  );

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 60);
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    revealObs.observe(el);
  });
// ======== SPEAKER SLIDER ========

// ======== SPEAKER SLIDER ========
  (function () {
    const slides  = document.querySelectorAll('.s-slide');
    const dots    = document.querySelectorAll('.s-dot');
    const prevBtn = document.getElementById('sPrev');
    const nextBtn = document.getElementById('sNext');
    const wrapper = document.getElementById('speakerSlider');
    const bar     = document.getElementById('sProgressBar');

    if (!slides.length || !prevBtn || !nextBtn) return;

    const DELAY    = 5000;
    const ANIM_DUR = 500;

    let current   = 0;
    let timer     = null;
    let animating = false;

    // ── Force clean initial state on every load ──────────────────────
    slides.forEach((s, i) => {
      s.classList.remove('active', 'anim-right', 'anim-left');
      s.style.display = 'none';
    });
    slides[0].style.display = '';
    slides[0].classList.add('active');
    if (dots.length) {
      dots.forEach(d => d.classList.remove('active'));
      dots[0].classList.add('active');
    }

    function goTo(index, direction) {
      if (animating) return;
      animating = true;

      const dir = direction !== undefined
        ? direction
        : (index > current ? 1 : -1);

      // Hide current
      slides[current].classList.remove('active', 'anim-right', 'anim-left');
      slides[current].style.display = 'none';
      if (dots[current]) dots[current].classList.remove('active');

      // Update index
      current = ((index % slides.length) + slides.length) % slides.length;

      // Show new slide
      slides[current].style.display = '';
      slides[current].classList.add('active', dir >= 0 ? 'anim-right' : 'anim-left');
      if (dots[current]) dots[current].classList.add('active');

      setTimeout(() => {
        slides[current].classList.remove('anim-right', 'anim-left');
        animating = false;
      }, ANIM_DUR);

      resetBar();
    }

    function resetBar() {
      if (!bar) return;
      bar.style.transition = 'none';
      bar.style.width = '0%';
      void bar.offsetWidth;
      bar.style.transition = `width ${DELAY}ms linear`;
      bar.style.width = '100%';
    }

    function pauseBar() {
      if (!bar) return;
      bar.style.transition = 'none';
      bar.style.width = getComputedStyle(bar).width;
    }

    function resumeBar(ms) {
      if (!bar) return;
      void bar.offsetWidth;
      bar.style.transition = `width ${ms}ms linear`;
      bar.style.width = '100%';
    }

    let slideStartTime = Date.now();

    function startAuto() {
      stopAuto();
      slideStartTime = Date.now();
      resetBar();
      timer = setInterval(() => goTo(current + 1, 1), DELAY);
    }

    function stopAuto() {
      if (timer) { clearInterval(timer); timer = null; }
      pauseBar();
    }

    prevBtn.addEventListener('click', () => {
      goTo(current - 1, -1);
      slideStartTime = Date.now();
      startAuto();
    });

    nextBtn.addEventListener('click', () => {
      goTo(current + 1, 1);
      slideStartTime = Date.now();
      startAuto();
    });

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.dataset.slide, 10);
        if (idx === current) return;
        goTo(idx, idx > current ? 1 : -1);
        slideStartTime = Date.now();
        startAuto();
      });
    });

    wrapper.addEventListener('mouseenter', () => {
      stopAuto();
      wrapper.classList.add('paused');
    });
    wrapper.addEventListener('mouseleave', () => {
      wrapper.classList.remove('paused');
      slideStartTime = Date.now();
      startAuto();
    });

    let touchX = 0;
    wrapper.addEventListener('touchstart', e => {
      touchX = e.touches[0].clientX;
      stopAuto();
    }, { passive: true });
    wrapper.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 45) dx < 0 ? goTo(current + 1, 1) : goTo(current - 1, -1);
      slideStartTime = Date.now();
      startAuto();
    }, { passive: true });

    document.addEventListener('keydown', e => {
      if (!isVisible(wrapper)) return;
      if (e.key === 'ArrowRight') { goTo(current + 1,  1); slideStartTime = Date.now(); startAuto(); }
      if (e.key === 'ArrowLeft')  { goTo(current - 1, -1); slideStartTime = Date.now(); startAuto(); }
    });

    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.isIntersecting ? startAuto() : stopAuto();
      });
    }, { threshold: 0.25 });

    const speakersSection = document.getElementById('speakers');
    if (speakersSection) sectionObserver.observe(speakersSection);

    function isVisible(el) {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    }

  })();
  // ======== END SPEAKER SLIDER ========
});
// ======== BACK TO TOP ========
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });

});
