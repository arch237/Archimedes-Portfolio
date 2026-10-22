
# Archimedes~Designs Portfolio

Personal portfolio of Nfor Precious, known creatively as Archimedes.

## Project structure

```text
api/
  contact.js          Vercel Function for contact-form email
public/
  index.html          Static site entry point
  404.html            Not-found page
  robots.txt
  sitemap.xml
  assets/
    css/
    images/
    js/
    videos/
designs/              Design documentation
docs/                 Additional documentation
projects/             Project documentation
vercel.json           Vercel output and response-header configuration
```

The project is plain HTML, CSS and JavaScript. There is no build step or
framework. Static files live in `public/`; Vercel Functions stay in the root
`api/` directory.

## Deploy to Vercel

Import the repository into Vercel and use these project settings:

- Root directory: repository root
- Framework preset: Other
- Build command: leave empty
- Output directory: `public`
- Install command: leave empty

`vercel.json` also sets `public` as the output directory. For local Vercel
development, use `vercel dev` from the repository root.

## Contact form

The contact form sends email through Resend using `api/contact.js`. Configure
these environment variables in Vercel (and in a local `.env` file when testing):

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

Use a verified sender address for `CONTACT_FROM_EMAIL`. Never expose
`RESEND_API_KEY` in frontend code.

## Before publishing

- Add accurate project descriptions and approved portfolio images.
- Replace any placeholder social links.
- Update `public/robots.txt` and `public/sitemap.xml` with the final domain.
- Test mobile layouts, navigation and contact-form delivery after deployment.
