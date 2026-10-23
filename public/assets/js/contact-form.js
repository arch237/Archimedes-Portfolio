
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("contact-status");

  if (!form || !status) return;

  function showStatus(message, type) {
    status.textContent = message;
    status.className = "form-status";

    if (type) {
      status.classList.add(type);
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    const subject = `Portfolio enquiry: ${data.service}`;
    const body = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Service: ${data.service}`,
      `Budget: ${data.budget || "Not provided"}`,
      "",
      "Project details:",
      data.message
    ].join("\n");
    const params = new URLSearchParams({ subject, body });

    showStatus(
      "Your email app should open with the enquiry ready. Review it and press Send to deliver.",
      "is-info"
    );
    window.location.href =
      `mailto:lamngwapreciousnfor@gmail.com?${params.toString()}`;
  });
});
