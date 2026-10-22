"use strict";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sendJson(response, statusCode, payload) {
  response.setHeader("Cache-Control", "no-store");
  return response.status(statusCode).json(payload);
}

module.exports = async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return sendJson(response, 405, { message: "Method not allowed." });
  }

  const data = request.body;
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return sendJson(response, 400, { message: "Invalid request body." });
  }

  if (typeof data.website === "string" && data.website.trim()) {
    return sendJson(response, 200, {
      message: "Your enquiry was submitted successfully."
    });
  }

  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const service = typeof data.service === "string" ? data.service.trim() : "";
  const budget = typeof data.budget === "string" ? data.budget.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";

  if (
    !name ||
    name.length > 100 ||
    !emailPattern.test(email) ||
    email.length > 254 ||
    !service ||
    service.length > 100 ||
    budget.length > 100 ||
    message.length < 10 ||
    message.length > 5000 ||
    data.consent !== "yes"
  ) {
    return sendJson(response, 400, {
      message: "Please check the form fields and try again."
    });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.error("Contact form email configuration is incomplete.");
    return sendJson(response, 500, {
      message: "Email delivery is not configured. Please email directly."
    });
  }

  let resendResponse;
  try {
    resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio enquiry: ${service}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Service: ${service}`,
          `Budget: ${budget || "Not provided"}`,
          "",
          "Project details:",
          message
        ].join("\n")
      })
    });
  } catch (error) {
    console.error("Resend request failed:", error);
    return sendJson(response, 502, {
      message: "Email delivery failed. Please try again later."
    });
  }

  if (!resendResponse.ok) {
    console.error(
      "Resend rejected the contact email with status:",
      resendResponse.status
    );
    return sendJson(response, 502, {
      message: "Email delivery failed. Please try again later."
    });
  }

  return sendJson(response, 200, {
    message: "Your enquiry was submitted successfully."
  });
};