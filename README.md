
# Archimedes~Designs Portfolio

Personal portfolio of Nfor Precious, known creatively as Archimedes.

## Project structure

```text
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
framework. Static files live in `public/`.

## Deploy to Vercel

Import the repository into Vercel and use these project settings:

- Root directory: repository root
- Framework preset: Other
- Build command: leave empty
- Output directory: `public`
- Install command: leave empty

`vercel.json` also sets `public` as the output directory. For local Vercel
development, use `vercel dev` from the repository root.

### Automatic deployments from GitHub

Use Vercel's built-in Git integration for automatic deployments. In the Vercel
dashboard, open this project and go to **Settings → Git**. Connect the
`arch237/Archimedes-Portfolio` GitHub repository and set `main` as the
production branch. In **Settings → Build and Deployment**, use the repository
root, the **Other** framework preset, no build or install command, and
`public` as the output directory. The `vercel.json` file already sets
`public` as the output directory.

Once connected, Vercel deploys each push to `main` to production and
automatically serves it on the domain assigned to this project. Pushes to
other branches create Preview deployments. No Vercel token or GitHub Actions
secrets are needed. If the project is already connected, verify that its Git
repository is this repository and its production branch is `main`.

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

The contact form opens the visitor's configured email app with a prefilled
message addressed to `lamngwapreciousnfor@gmail.com`. The visitor must review
and send the email themselves. This approach requires no Resend API key,
Vercel Function, or email-service configuration. If they do not have an email
app configured, they can use the direct email link in the contact section.

## Before publishing

- Add accurate project descriptions and approved portfolio images.
- Replace any placeholder social links.
- Update `public/robots.txt` and `public/sitemap.xml` with the final domain.
- Test mobile layouts, navigation and contact-form delivery after deployment.
