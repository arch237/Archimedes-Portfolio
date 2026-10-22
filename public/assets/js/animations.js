
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Scroll-reveal animations
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.08
      }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => {
      item.classList.add("is-visible");
    });
  }

  // Hero slideshow
  const hero = document.querySelector(".hero");
  const slides = [...document.querySelectorAll(".hero-slide")];
  const indicators = [...document.querySelectorAll(".hero-indicator")];

  if (!hero || slides.length === 0) return;

  let activeSlide = 0;
  let slideshowTimer = null;

  function showSlide(index) {
    activeSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeSlide);
    });

    indicators.forEach((button, buttonIndex) => {
      const selected = buttonIndex === activeSlide;

      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  }

  function stopSlideshow() {
    if (slideshowTimer !== null) {
      window.clearInterval(slideshowTimer);
      slideshowTimer = null;
    }
  }

  function startSlideshow() {
    stopSlideshow();

    if (reducedMotion || slides.length < 2) return;

    slideshowTimer = window.setInterval(() => {
      showSlide(activeSlide + 1);
    }, 5000);
  }

  indicators.forEach((button) => {
    button.addEventListener("click", () => {
      const requestedSlide = Number(button.dataset.slide);

      if (!Number.isInteger(requestedSlide)) return;

      showSlide(requestedSlide);
      startSlideshow();
    });
  });

  hero.addEventListener("mouseenter", stopSlideshow);
  hero.addEventListener("mouseleave", startSlideshow);

  // Avoid continuing automatic movement when the browser tab is hidden
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopSlideshow();
    } else {
      startSlideshow();
    }
  });

  showSlide(0);
  startSlideshow();
});
