
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const yearElement = document.getElementById("current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Mobile navigation
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("primary-nav");
  const navIcon = navToggle?.querySelector("i");

  if (navToggle && nav && navIcon) {
    function closeNav() {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation menu");
      navIcon.className = "fa-solid fa-bars";
    }

    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");

      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );

      navIcon.className = isOpen
        ? "fa-solid fa-xmark"
        : "fa-solid fa-bars";
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeNav);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) {
        closeNav();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeNav();
      }
    });
  }

  // Highlight the navigation link for the current section
  const navLinks = [
    ...document.querySelectorAll(".primary-nav a[href^='#']")
  ];

  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navLinks.forEach((link) => {
            const isCurrent =
              link.getAttribute("href") === `#${entry.target.id}`;

            link.classList.toggle("active", isCurrent);
          });
        });
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // Back-to-top button
  const backToTop = document.querySelector(".back-to-top");

  if (backToTop) {
    const updateBackToTop = () => {
      backToTop.classList.toggle("is-visible", window.scrollY > 450);
    };

    window.addEventListener("scroll", updateBackToTop, {
      passive: true
    });

    updateBackToTop();
  }
});
