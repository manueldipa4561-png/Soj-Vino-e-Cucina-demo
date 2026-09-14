(() => {
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Load the premium layer only as progressive enhancement.
  if (!document.querySelector('link[href="premium.css"]')) {
    const premiumStyles = document.createElement('link');
    premiumStyles.rel = 'stylesheet';
    premiumStyles.href = 'premium.css';
    document.head.appendChild(premiumStyles);
  }

  try {
    const header = document.querySelector('[data-header]');
    const toggle = document.querySelector('[data-menu-toggle]');
    const nav = document.querySelector('[data-nav]');
    const reveals = [...document.querySelectorAll('.reveal')];
    const hero = document.querySelector('.hero');
    const room = document.querySelector('.room-orbit');
    const seatCounter = document.querySelector('.seat-counter');
    const wine = document.querySelector('.wine');
    const bucket = document.querySelector('.bucket');
    const closing = document.querySelector('.closing');

    const closeMenu = () => {
      if (!toggle || !nav) return;
      toggle.classList.remove('is-open');
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        const isOpen = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!isOpen));
        toggle.classList.toggle('is-open', !isOpen);
        nav.classList.toggle('is-open', !isOpen);
      });

      nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
      });
    }

    // Thin page-progress line inside the existing header.
    let progress = header?.querySelector('.scroll-progress');
    if (header && !progress) {
      progress = document.createElement('div');
      progress.className = 'scroll-progress';
      progress.setAttribute('aria-hidden', 'true');
      header.appendChild(progress);
    }

    // Reveal system: content stays visible if JS fails.
    if (!reducedMotion && 'IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -4% 0px' });

      reveals.forEach((el) => revealObserver.observe(el));
      root.classList.add('motion-ready');

      // Avoid hiding above-the-fold content while waiting for the observer callback.
      requestAnimationFrame(() => {
        reveals.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.94 && rect.bottom > 0) el.classList.add('is-visible');
        });
      });
    } else {
      reveals.forEach((el) => el.classList.add('is-visible'));
    }

    if (room) room.classList.add('premium-room');
    if (seatCounter) seatCounter.classList.add('premium-seats');

    // Section activity / 16-seat reveal / closing depth.
    if ('IntersectionObserver' in window) {
      if (seatCounter) {
        const seatObserver = new IntersectionObserver((entries, observer) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            seatCounter.classList.add('is-active');
            observer.disconnect();
          }
        }, { threshold: 0.35 });
        seatObserver.observe(seatCounter);
      }

      if (closing) {
        const closingObserver = new IntersectionObserver((entries) => {
          closing.classList.toggle('in-view', entries.some((entry) => entry.isIntersecting));
        }, { threshold: 0.22 });
        closingObserver.observe(closing);
      }

      // Active section indicator in the existing navigation.
      const sectionIds = ['stanza', 'due', 'cucina', 'vino', 'contatti'];
      const navLinks = nav ? [...nav.querySelectorAll('a[href^="#"]')] : [];
      const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
      if (sections.length && navLinks.length) {
        const sectionObserver = new IntersectionObserver((entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (!visible) return;
          navLinks.forEach((link) => {
            const active = link.getAttribute('href') === `#${visible.target.id}`;
            if (active) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
          });
        }, { rootMargin: '-28% 0px -55% 0px', threshold: [0.05, 0.2, 0.5] });
        sections.forEach((section) => sectionObserver.observe(section));
      }
    } else if (seatCounter) {
      seatCounter.classList.add('is-active');
    }

    // Pointer-based room depth. Native cursor remains untouched.
    if (room && finePointer && !reducedMotion) {
      let roomFrame = 0;
      const resetRoom = () => {
        cancelAnimationFrame(roomFrame);
        room.style.setProperty('--room-rx', '0deg');
        room.style.setProperty('--room-ry', '0deg');
        room.style.setProperty('--light-x', '52%');
        room.style.setProperty('--light-y', '28%');
      };

      room.addEventListener('pointermove', (event) => {
        const rect = room.getBoundingClientRect();
        const x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
        const y = clamp((event.clientY - rect.top) / rect.height, 0, 1);
        cancelAnimationFrame(roomFrame);
        roomFrame = requestAnimationFrame(() => {
          room.style.setProperty('--room-ry', `${((x - 0.5) * 8).toFixed(2)}deg`);
          room.style.setProperty('--room-rx', `${((0.5 - y) * 6).toFixed(2)}deg`);
          room.style.setProperty('--light-x', `${(x * 100).toFixed(1)}%`);
          room.style.setProperty('--light-y', `${(y * 100).toFixed(1)}%`);
        });
      }, { passive: true });
      room.addEventListener('pointerleave', resetRoom, { passive: true });
    }

    // Magnetic actions — deliberately limited to a few pixels.
    if (finePointer && !reducedMotion) {
      document.querySelectorAll('.button,.nav-cta,.line-link').forEach((element) => {
        element.classList.add('premium-magnetic');
        element.addEventListener('pointermove', (event) => {
          const rect = element.getBoundingClientRect();
          const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
          const y = ((event.clientY - rect.top) / rect.height - 0.5) * 6;
          element.style.setProperty('--mag-x', `${x.toFixed(1)}px`);
          element.style.setProperty('--mag-y', `${y.toFixed(1)}px`);
        }, { passive: true });
        element.addEventListener('pointerleave', () => {
          element.style.setProperty('--mag-x', '0px');
          element.style.setProperty('--mag-y', '0px');
        }, { passive: true });
      });
    }

    // Quiet material response for the wine object.
    if (wine && bucket && finePointer && !reducedMotion) {
      wine.addEventListener('pointermove', (event) => {
        const rect = wine.getBoundingClientRect();
        const x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
        const y = clamp((event.clientY - rect.top) / rect.height, 0, 1);
        bucket.style.setProperty('--bucket-ry', `${((x - 0.5) * 5).toFixed(2)}deg`);
        bucket.style.setProperty('--bucket-rx', `${((0.5 - y) * 4).toFixed(2)}deg`);
      }, { passive: true });
      wine.addEventListener('pointerleave', () => {
        bucket.style.setProperty('--bucket-rx', '0deg');
        bucket.style.setProperty('--bucket-ry', '0deg');
      }, { passive: true });
    }

    // One throttled scroll loop drives header, progress and very small spatial shifts.
    let scrollFrame = 0;
    const updateScrollState = () => {
      scrollFrame = 0;
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const pageProgress = clamp(scrollY / maxScroll, 0, 1);

      if (header) {
        header.classList.toggle('is-scrolled', scrollY > 18);
        header.style.setProperty('--page-progress', pageProgress.toFixed(4));
      }

      if (hero && room && !reducedMotion && window.innerWidth > 880) {
        const heroHeight = Math.max(1, hero.offsetHeight);
        const heroProgress = clamp(scrollY / heroHeight, 0, 1);
        room.style.setProperty('--room-lift', `${(-18 * heroProgress).toFixed(1)}px`);
        room.style.setProperty('--room-scale', (1 - 0.024 * heroProgress).toFixed(4));
      }

      if (wine && !reducedMotion) {
        const rect = wine.getBoundingClientRect();
        const travel = clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height), 0, 1);
        wine.style.setProperty('--wine-shift', `${((travel - 0.5) * 34).toFixed(1)}px`);
      }
    };

    const requestScrollUpdate = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(updateScrollState);
    };
    updateScrollState();
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    window.addEventListener('resize', requestScrollUpdate, { passive: true });

    // Stop all future animation work while the page is hidden.
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && scrollFrame) {
        cancelAnimationFrame(scrollFrame);
        scrollFrame = 0;
      } else if (!document.hidden) {
        requestScrollUpdate();
      }
    });
  } catch (error) {
    // Progressive-enhancement fail-safe: never leave content hidden.
    root.classList.remove('motion-ready');
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
    console.error('Sój interaction enhancement disabled:', error);
  }
})();
