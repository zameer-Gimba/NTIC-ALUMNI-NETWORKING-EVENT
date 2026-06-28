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


  // ======== STICKY CTA (show after hero) ========
  const hero = document.getElementById('home');
  const stickyCta = document.querySelector('.sticky-cta');

  if (stickyCta && hero) {
    const heroObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        stickyCta.style.display = 'block';
      } else {
        stickyCta.style.display = 'none';
      }
    }, { threshold: 0.1 });

    heroObserver.observe(hero);
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

  (function () {
    const slides   = document.querySelectorAll('.s-slide');
    const dots     = document.querySelectorAll('.s-dot');
    const prevBtn  = document.getElementById('sPrev');
    const nextBtn  = document.getElementById('sNext');
    const wrapper  = document.getElementById('speakerSlider');
    const bar      = document.getElementById('sProgressBar');

    if (!slides.length || !prevBtn || !nextBtn) return;

    const DELAY     = 5000;   // ms between slides
    const ANIM_DUR  = 500;    // ms — matches CSS animation duration

    let current   = 0;
    let timer     = null;
    let animating = false;

    /* ── Go to a specific slide ─────────────────────────────────── */
    function goTo(index, direction) {
      if (animating) return;
      animating = true;

      // Determine direction: +1 = right→left entry, -1 = left→right entry
      const dir = direction !== undefined
        ? direction
        : (index > current ? 1 : -1);

      // Hide current slide
      slides[current].classList.remove('active', 'anim-right', 'anim-left');
      dots[current].classList.remove('active');

      // Wrap new index
      current = ((index % slides.length) + slides.length) % slides.length;

      // Show new slide with correct entrance animation
      slides[current].classList.add('active', dir >= 0 ? 'anim-right' : 'anim-left');
      dots[current].classList.add('active');

      // Unlock after animation completes
      setTimeout(() => {
        slides[current].classList.remove('anim-right', 'anim-left');
        animating = false;
      }, ANIM_DUR);

      // Restart progress bar
      resetBar();
    }

    /* ── Progress bar ───────────────────────────────────────────── */
    function resetBar() {
      if (!bar) return;
      bar.style.transition = 'none';
      bar.style.width = '0%';
      // Force reflow so the browser registers the reset
      void bar.offsetWidth;
      bar.style.transition = `width ${DELAY}ms linear`;
      bar.style.width = '100%';
    }

    function pauseBar() {
      if (!bar) return;
      const computed = getComputedStyle(bar).width;
      bar.style.transition = 'none';
      bar.style.width = computed;   // freeze at current position
    }

    function resumeBar(remainingMs) {
      if (!bar) return;
      void bar.offsetWidth;
      bar.style.transition = `width ${remainingMs}ms linear`;
      bar.style.width = '100%';
    }

    /* ── Auto-play ──────────────────────────────────────────────── */
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

    function resumeAuto() {
      stopAuto();
      // Calculate how much of the current slide's time has elapsed
      const elapsed  = Date.now() - slideStartTime;
      const remaining = Math.max(0, DELAY - elapsed);
      resumeBar(remaining);
      timer = setTimeout(() => {
        goTo(current + 1, 1);
        startAuto();          // start regular interval from next slide
      }, remaining);
    }

    /* ── Arrow buttons ──────────────────────────────────────────── */
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

    /* ── Dot buttons ────────────────────────────────────────────── */
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.dataset.slide, 10);
        if (idx === current) return;
        const dir = idx > current ? 1 : -1;
        goTo(idx, dir);
        slideStartTime = Date.now();
        startAuto();
      });
    });

    /* ── Pause on hover ─────────────────────────────────────────── */
    wrapper.addEventListener('mouseenter', () => {
      stopAuto();
      wrapper.classList.add('paused');
    });

    wrapper.addEventListener('mouseleave', () => {
      wrapper.classList.remove('paused');
      slideStartTime = Date.now();
      startAuto();
    });

    /* ── Touch / swipe support ──────────────────────────────────── */
    let touchX = 0;

    wrapper.addEventListener('touchstart', e => {
      touchX = e.touches[0].clientX;
      stopAuto();
    }, { passive: true });

    wrapper.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 45) {
        dx < 0 ? goTo(current + 1, 1) : goTo(current - 1, -1);
      }
      slideStartTime = Date.now();
      startAuto();
    }, { passive: true });

    /* ── Keyboard navigation (only when slider is in viewport) ──── */
    document.addEventListener('keydown', e => {
      if (!isVisible(wrapper)) return;
      if (e.key === 'ArrowRight') { goTo(current + 1,  1); slideStartTime = Date.now(); startAuto(); }
      if (e.key === 'ArrowLeft')  { goTo(current - 1, -1); slideStartTime = Date.now(); startAuto(); }
    });

    /* ── Start auto-play only when section enters the viewport ──── */
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startAuto();
        } else {
          stopAuto();
        }
      });
    }, { threshold: 0.25 });

    observer.observe(document.getElementById('speakers'));

    /* ── Helpers ────────────────────────────────────────────────── */
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
