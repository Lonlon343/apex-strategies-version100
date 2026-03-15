/**
 * APEX Strategies UG
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle Logic
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      let currentTheme = document.documentElement.getAttribute('data-theme');
      let targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', targetTheme);
      localStorage.setItem('apex_theme', targetTheme);
    });
  });

  // Mobile Navigation Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const closeMenuBtn = document.querySelector('.close-menu-btn');

  if (mobileMenuBtn && mobileNav && closeMenuBtn) {
    const toggleMenu = () => {
      mobileNav.classList.toggle('is-open');
      const isOpen = mobileNav.classList.contains('is-open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);

    // Close mobile nav when clicking a link
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('is-open');
        mobileMenuBtn.setAttribute('aria-expanded', false);
      });
    });
  }

  // Header Scroll Effect
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Intersection Observer for Micro-Animations (Fade-in-up)
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Trigger when 15% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Stop observing once animated if we only want it to happen once
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => observer.observe(el));

  // Horizontal Scroll Banner Logic
  const bannerTrack = document.querySelector('.hero-banner-track');
  if (bannerTrack) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const speed = 1.5; // Adjust scroll speed here
      bannerTrack.style.transform = `translateX(-${scrollY * speed}px)`;
    });
  }

  // Preloader Logic
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      // Small delay for a smoother experience
      setTimeout(() => {
        preloader.classList.add('fade-out');
        document.body.classList.add('loaded');
        // Enable scrolling once preloader is hidden
        document.body.style.overflow = 'auto';
      }, 500);
    });
  }
});
