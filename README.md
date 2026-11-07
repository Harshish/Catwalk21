# Catwalk 21 website

Prerendered SvelteKit marketing site for Hostinger Single Web Hosting. The existing logo artwork is unchanged. `main` is the source branch; Hostinger deploys `master`, which must contain only generated files.

## Local preview

Requires Node.js 26 (latest LTS; pinned in `.nvmrc`, so `nvm use` or `fnm use` picks it up) and pnpm 11.26.0.

```sh
pnpm install --frozen-lockfile
pnpm check
pnpm build
pnpm test
pnpm preview
```

Open the URL printed by `pnpm preview`. `pnpm dev` starts the development server. The build output is in `build/`; it is intentionally ignored on `main`. The output contains static HTML and assets, not a PHP or Node server.

## Deployment workflow

Test locally → push `main` → **Run workflow** → checks + build → update `master` → Hostinger

- **Test locally:** Review the site with `pnpm dev` on `main`, then commit and push. Pushes run CI checks but do not publish.
- **Trigger deployment:** Open **GitHub → Actions → Build site → Run workflow**, select `main`, and click **Run workflow**. No text entry or preview download is needed.
- **Automatic update:** Actions builds the pushed `main` source, runs checks and tests, then replaces `master` with the generated site. Only manual runs on `main` can publish. If a `production` approval gate is configured, approve the deployment when prompted.
- **Go live:** Hostinger deploys `master` to `public_html`; it does not build the app. Trigger deployment in Hostinger if automatic deployment is not configured, then verify the live site.

The workflow transfers the build between jobs internally; you do not need to download its artifact.

### One-time setup

- Set GitHub’s default branch to `main` so the manual workflow is available. Keep Hostinger pointed at `master`.
- Allow GitHub Actions to write repository contents. A required reviewer on the `production` environment is optional; configure one only if you want an extra approval step.
- Back up the current `master` revision and live `public_html` before the first publish. Never push SvelteKit source to `master`.

### Launch checks and rollback

- Approve copy, photography, Service names, addresses, Branch phone numbers, and directions. Confirm whether the old blog URL needs a redirect; do not assume mobile numbers support WhatsApp.
- Preview on mobile and desktop; check keyboard navigation and reduced-motion behavior. External tracking and map embeds are not included by default and need privacy approval before adding them.
- Inspect `public_html` for stale files, especially `contact.php` and `blog.html`. Hostinger may not delete files removed from Git; remove obsolete files only after confirming a backup.
- **Rollback:** Restore the previous generated release on `master` and redeploy through Hostinger. Restore or clean `public_html` from the backup if stale files remain.

## SEO

Search setup and post-launch steps (Search Console, Google Business Profile, redirects) are in [`docs/seo.md`](docs/seo.md).

## Fonts

All fonts are self-hosted; nothing loads from Google Fonts at runtime.

| Use | Font | Source | Licence |
|---|---|---|---|
| Logo wordmark | Didact Gothic | `@fontsource/didact-gothic` | SIL OFL |
| Headlines | Cormorant Garamond | `@fontsource/cormorant-garamond` | SIL OFL |
| Body, buttons | Manrope | `@fontsource-variable/manrope` | SIL OFL |
| Small gold labels | Cinzel | `@fontsource-variable/cinzel` | SIL OFL |
| Sanskrit and Devanagari numerals | Tiro Devanagari Sanskrit | `@fontsource/tiro-devanagari-sanskrit` | SIL OFL |

The salon sign board uses Champagne & Limousines Bold (`fonts/`), which is free for personal use only, so the site uses Didact Gothic, a free near-match with the same Century Gothic-style letterforms. To use the sign-board font instead, get commercial permission from its designer (nymphont@yahoo.com) first.

## Photography

`bg*.jpg` photos come from the original site. The other photos in `static/img/` are Unsplash placeholders (Unsplash License, no attribution required). Replace them with real salon photos, for example from [@catwalk21salon](https://www.instagram.com/catwalk21salon/), before launch:

| File | Source |
|---|---|
| `hero-bride.jpg` | https://unsplash.com/photos/ohENjR9w0bk |
| `bridal-portrait.jpg` | https://unsplash.com/photos/VPwSJhu5uhs |
| `bridal-makeup.jpg` | https://unsplash.com/photos/N9hRh86R4T0 |
| `kundan-look.jpg` | https://unsplash.com/photos/KxHcyNOIO_M |
| `mehendi.jpg` | https://unsplash.com/photos/wbLCos9rVLQ |
| `mehendi-detail.jpg` | https://unsplash.com/photos/W1gGN71UOzI |
| `salon-interior.jpg` | https://unsplash.com/photos/_Fy7Kq0w6OI |
| `grooming.jpg` | https://unsplash.com/photos/Z2WfmQC-sVk |
