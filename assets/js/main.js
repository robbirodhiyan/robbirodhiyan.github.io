(() => {
  'use strict';

  const root = document.documentElement;
  const header = document.getElementById('siteHeader');
  const themeToggle = document.getElementById('themeToggle');
  const navCollapseEl = document.getElementById('mainNav');
  const navLinks = [...document.querySelectorAll('.nav-link[href^="#"]')];
  const filterButtons = [...document.querySelectorAll('.filter-btn')];
  const projectCards = [...document.querySelectorAll('.project-card')];

  const preferredTheme = localStorage.getItem('portfolio-theme') ||
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  root.setAttribute('data-theme', preferredTheme);

  themeToggle?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
  });

  const onScroll = () => {
    header?.classList.toggle('scrolled', window.scrollY > 16);
    const y = window.scrollY + 150;
    let activeId = '#home';
    document.querySelectorAll('main section[id]').forEach((section) => {
      if (y >= section.offsetTop) activeId = `#${section.id}`;
    });
    navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === activeId));
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 1200 && navCollapseEl?.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(navCollapseEl).hide();
      }
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const delay = Number(entry.target.dataset.delay || 0);
      window.setTimeout(() => entry.target.classList.add('is-visible'), delay);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px' });
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      const selected = button.dataset.filter;
      projectCards.forEach((card) => {
        const categories = card.dataset.category?.split(' ') || [];
        const show = selected === 'all' || categories.includes(selected);
        card.hidden = !show;
      });
    });
  });

  const year = document.getElementById('currentYear');
  if (year) year.textContent = new Date().getFullYear();
})();
