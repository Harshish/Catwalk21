# Catwalk 21 website

Prerendered SvelteKit marketing site for Hostinger Single Web Hosting. The existing logo artwork is unchanged. `main` is the source branch; Hostinger deploys `master`, which must contain only generated files.

## Local preview

Requires Node.js 22.12 or later and pnpm 11.26.0.

```sh
pnpm install --frozen-lockfile
pnpm check
pnpm build
pnpm test
pnpm preview
```

Open the URL printed by `pnpm preview`. `pnpm dev` starts the development server. The build output is in `build/`; it is intentionally ignored on `main`. The output contains static HTML and assets, not a PHP or Node server.

## Launch checklist

1. Review and approve the prototype copy, photography, Service names, addresses, Branch phone numbers, and directions links. Confirm whether the old blog URL needs a redirect. Do not assume the listed mobile numbers support WhatsApp.
2. Preview the built site on mobile and desktop; check keyboard navigation and reduced-motion behavior. Decide whether external tracking or map embeds have privacy approval; neither is included by default.
3. Push `main` to trigger CI checks and download the `site-preview` artifact for review. Set the repository's **default branch to `main`** so GitHub exposes the manual workflow; Hostinger must remain pointed at `master`. Before publishing, back up the existing `master` revision and the live `public_html` contents. Configure GitHub's `production` environment with a required reviewer if your GitHub plan supports it, and allow Actions to write repository contents.
4. After approval, manually run **Build site** on `main` with `PUBLISH`. The workflow builds and checks the site, then replaces the contents of `master` with the generated files. Hostinger continues pulling `master` into `public_html`; it does not build the app.
5. Verify the live page and links. Check `public_html` directly for stale files, especially `contact.php` and `blog.html`: Hostinger may not prune files removed from Git. Remove obsolete files through the host after confirming a backup. Keep the old release available for rollback.

To roll back, restore the previous `master` commit and redeploy it through Hostinger; if Hostinger leaves stale files, restore or clean `public_html` from the saved backup as needed. Do not push SvelteKit source to `master`.
