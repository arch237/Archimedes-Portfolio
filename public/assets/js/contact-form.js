
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("contact-status");

  if (!form || !status) return;

  const submitButton = form.querySelector(".submit-button");
  const submitLabel = form.querySelector(".submit-label");

  if (!submitButton || !submitLabel) return;

  const defaultButtonLabel = "Send Project Enquiry";

  function showStatus(message, type) {
    status.textContent = message;
    status.className = "form-status";

    if (type) {
      status.classList.add(type);
    }
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Honeypot: ignore submissions that fill the hidden field
    const honeypot = form.querySelector('[name="website"]');

    if (honeypot && honeypot.value.trim() !== "") {
      showStatus(
        "Thank you. If your enquiry is valid, it will be reviewed.",
        "is-success"
      );
      form.reset();
      return;
    }

    showStatus("", "");

    submitButton.disabled = true;
    submitLabel.textContent = "Sending...";

    try {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });

      let result = {};

      try {
        result = await response.json();
      } catch {
        // The endpoint may return an empty or non-JSON response.
      }

      if (!response.ok) {
        throw new Error(
          result.message ||
          "Your enquiry could not be sent. Please try again."
        );
      }

      showStatus(
        result.message ||
        "Your enquiry was submitted successfully.",
        "is-success"
      );

      form.reset();
    } catch (error) {
      console.error("Contact form submission failed:", error);

      showStatus(
        error.message ||
        "Unable to send your enquiry. Please email lamngwapreciousnfor@gmail.com directly.",
        "is-error"
      );
    } finally {
      submitButton.disabled = false;
      submitLabel.textContent = defaultButtonLabel;
    }
  });
});
