## Contact endpoint

`contact.js` handles `POST /api/contact` and sends validated enquiries through
the Resend API. Configure `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and
`CONTACT_FROM_EMAIL` in the Vercel project environment before enabling email
delivery. The sender address must be verified with Resend.