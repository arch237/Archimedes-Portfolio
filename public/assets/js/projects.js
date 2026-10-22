
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Gallery filters
  document.querySelectorAll(".gallery-section").forEach((section) => {
    const toolbar = section.querySelector(".gallery-toolbar");
    const cards = [...section.querySelectorAll(".gallery-card")];

    if (!toolbar) return;

    toolbar.querySelectorAll(".filter-button").forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter || "all";

        toolbar.querySelectorAll(".filter-button").forEach((item) => {
          const selected = item === button;

          item.classList.toggle("is-active", selected);
          item.setAttribute("aria-pressed", String(selected));
        });

        cards.forEach((card) => {
          const category = card.dataset.category || "";
          card.hidden = filter !== "all" && category !== filter;
        });
      });
    });
  });

  // Shared image lightbox
  const lightbox = document.getElementById("image-lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeButton = lightbox?.querySelector(".lightbox-close");

  if (!lightbox || !lightboxImage || !lightboxCaption || !closeButton) {
    return;
  }

  let lastFocusedElement = null;

  function openLightbox(image, caption = "") {
    if (!image || !image.src) return;

    lastFocusedElement = document.activeElement;

    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt || caption || "Portfolio image";
    lightboxCaption.textContent =
      caption || image.alt || "Portfolio image";

    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";

    closeButton.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";

    lightboxImage.removeAttribute("src");
    lightboxImage.alt = "";
    lightboxCaption.textContent = "";

    if (lastFocusedElement?.focus) {
      lastFocusedElement.focus();
    }
  }

  // Graphic design and photo-editing images
  document.querySelectorAll(".gallery-card .gallery-image-button").forEach(
    (button) => {
      button.addEventListener("click", () => {
        const image = button.querySelector("img");
        const card = button.closest(".gallery-card");
        const title = card?.querySelector(".gallery-caption h3");

        if (image) {
          openLightbox(image, title?.textContent || image.alt);
        }
      });
    }
  );

  // Featured project images: open the actual image in the lightbox
  document.querySelectorAll(
    "#featured-work .gallery-image-button"
  ).forEach((button) => {
    button.addEventListener("click", (event) => {
      const image = button.querySelector("img");

      if (!image) return;

      event.preventDefault();

      const title =
        button.closest(".project-card")?.querySelector("h3");

      openLightbox(image, title?.textContent || image.alt);
    });
  });

  // Testimonial screenshot evidence
  document.querySelectorAll(".testimonial-proof").forEach((image) => {
    image.style.cursor = "zoom-in";

    image.addEventListener("click", () => {
      openLightbox(image, image.alt);
    });
  });

  closeButton.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      lightbox.classList.contains("is-open")
    ) {
      closeLightbox();
    }
  });

  // Log missing local images to help diagnose incorrect file paths
  document.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", () => {
      console.warn(
        "Image could not be loaded. Check the file path:",
        image.getAttribute("src")
      );
    });
  });
});
