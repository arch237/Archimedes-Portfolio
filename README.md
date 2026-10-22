
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

## Auto-commit

From PowerShell in the repository root, run
`powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\auto-commit.ps1` to
stage all non-ignored changes and create a commit with a timestamped message.
To provide a message, add `-Message "Describe your changes"`. To also push the
current branch to its upstream, add `-Push`. Pushes require GitHub
authentication to be configured in Git.

The script runs only when you invoke it; it does not watch for file changes or
commit automatically in the background. Add `-WhatIf` to preview the action.

## Contact form

The contact form sends email through Resend using `api/contact.js`. Configure
these environment variables in Vercel (and in a local `.env` file when testing):

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

### Add your Resend API key to Vercel

1. In [Resend](https://resend.com/api-keys), create an API key with permission
   to send email. Copy it once; it is a secret and should not be pasted into
   source files or chat.
2. Open your portfolio project in the [Vercel dashboard](https://vercel.com/dashboard).
   Go to **Settings → Environment Variables**.
3. Add `RESEND_API_KEY` and paste the key as its value. Select the environments
   you use (at least **Production**; also select **Preview** or **Development**
   if you want the form to work in those environments), then save.
4. Add `CONTACT_TO_EMAIL` with the inbox that should receive enquiries.
5. Add `CONTACT_FROM_EMAIL` with a sender address on a domain you have verified
   in Resend. Complete Resend's domain/DNS verification before testing delivery.
6. Redeploy the project so the deployment uses the saved environment variables.
   Vercel applies changed environment variables to new deployments, not existing
   ones.
7. Submit a test enquiry on the deployed site and confirm that it arrives at
   `CONTACT_TO_EMAIL`. Reply-to is set to the visitor's submitted email.

For local testing, put the three values in a root `.env` file, which is ignored
by Git. Do not put a real key in `.env.example`, frontend JavaScript, or any
committed file. Never expose `RESEND_API_KEY` in frontend code.

## Before publishing

- Add accurate project descriptions and approved portfolio images.
- Replace any placeholder social links.
- Update `public/robots.txt` and `public/sitemap.xml` with the final domain.
- Test mobile layouts, navigation and contact-form delivery after deployment.
