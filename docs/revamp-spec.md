# Catwalk 21 website revamp specification

## Problem Statement

Catwalk 21’s current website looks and behaves like an older template. It includes a placeholder blog, unused scripts, and a disconnected PHP contact endpoint. Updating it by copying files into Hostinger’s `public_html` is error-prone, while Hostinger’s current Git integration deploys files from `master` without building SvelteKit.

Visitors need a clear, modern way to understand the salon’s Services, find the right Branch, and contact it. The logo artwork must remain unchanged.

## Solution

Rebuild the site as a responsive SvelteKit marketing site, prerendered to static files for the current Hostinger plan. Present approved Services, photography, and details for the Thakur Complex and Thakur Village Branches. Make calling a Branch the primary contact action; add WhatsApp only when its numbers are confirmed.

Keep SvelteKit source on `main`. Build and check it in CI, preview it before launch, then publish **only the generated site** to `master`, which Hostinger already deploys. Retain a rollback copy and verify that obsolete files are removed from the live host.

## User Stories

1. As a first-time visitor, I want to understand what Catwalk 21 offers immediately, so that I can decide whether to explore further.
2. As a visitor, I want to recognize the existing Catwalk 21 logo, so that I know I have reached the right business.
3. As a mobile visitor, I want readable content and usable controls without zooming, so that I can browse comfortably.
4. As a visitor, I want clear navigation, so that I can move between Services and Branch information.
5. As a visitor, I want to understand each Service category, so that I can identify treatments relevant to me.
6. As a visitor, I want accurate salon imagery, so that the site reflects the real business.
7. As a visitor, I want to distinguish Thakur Complex from Thakur Village, so that I contact the intended Branch.
8. As a visitor, I want each Branch’s address beside its contact action, so that I do not confuse their details.
9. As a mobile visitor, I want to tap a Branch’s phone number to call it, so that I do not have to copy the number.
10. As a visitor, I want a usable way to open directions to a Branch, so that I can find it.
11. As a visitor whose browser blocks a map embed, I want the address and directions link to remain usable, so that I can still find the Branch.
12. As a keyboard user, I want to reach navigation, links, and call actions in a logical order, so that I can use the site without a mouse.
13. As a screen-reader user, I want meaningful headings, link names, and image descriptions, so that I can understand the content and actions.
14. As a visitor who prefers reduced motion, I want the site to remain comfortable and usable, so that animation does not obstruct it.
15. As a visitor on a slow connection, I want useful content before optional effects and external resources load, so that I can act without waiting.
16. As a visitor, I want links to lead somewhere meaningful rather than to template placeholders, so that I can trust the site.
17. As a visitor, I want contact details and Services to be current, so that I do not act on outdated information.
18. As a business owner, I want to review copy, imagery, and Branch details before launch, so that unapproved information does not go live.
19. As a business owner, I want the logo artwork reused without alteration, so that the brand remains recognizable.
20. As a site maintainer, I want to preview a built version before publishing, so that I can catch visual and content errors.
21. As a site maintainer, I want the build checked automatically, so that missing pages or assets do not reach visitors.
22. As a site maintainer, I want deployment to use the existing Hostinger Git connection, so that I no longer copy build files manually.
23. As a site maintainer, I want `master` to contain only deployable site output, so that Hostinger never serves SvelteKit source in place of a built site.
24. As a site maintainer, I want the previous release available, so that I can restore it if a launch fails.
25. As a site maintainer, I want obsolete template and PHP files absent from the live host, so that visitors cannot reach abandoned content or the unsafe mail endpoint.

## Implementation Decisions

- Use SvelteKit with static prerendering and its static adapter. The deployed site will not require a Node.js server, database, or PHP.
- Build a focused marketing experience around Services and the two Branches. Do not reproduce the placeholder blog.
- Preserve the existing logo artwork. Existing light or dark variants may be selected for contrast; the artwork itself will not be redesigned.
- Treat current copy and imagery as prototype material, not approved launch content. Do not invent prices, opening hours, treatments, or contact details.
- Use Branch-specific telephone links after verifying the numbers. Do not infer that a listed mobile number supports WhatsApp.
- Keep addresses and directions links usable without relying solely on embedded maps.
- Prefer semantic HTML and restrained interaction over recreating the old template’s effects. Support keyboard use and reduced-motion preferences.
- Do not carry the legacy PHP contact endpoint into the new site. Do not add a replacement form without a separate requirement and delivery owner.
- Do not include the existing Meta Pixel in the new release unless its use and privacy treatment are approved. Maps remain subject to the same review; external requests should not be necessary to read Branch details.
- Keep SvelteKit source on `main` and generated output on `master`. CI runs from `main`, builds and checks the site, and publishes the generated files at the root of `master` **only after the preview is approved**.
- Preserve the current release before the first artifact publish. Check whether Hostinger prunes deleted files; explicitly clean obsolete live files if it does not.
- Check whether the old blog URL has traffic or inbound links before removal. Redirect it if needed rather than silently breaking a used URL.

## Testing Decisions

- **Primary test seam:** the prerendered site as a visitor receives it. Tests should check visible content, navigation, links, accessibility-relevant behavior, and generated assets—not component internals.
- Check that the generated homepage renders Services and both Branches, and that each Branch’s call and directions actions point to its own verified details.
- Check keyboard navigation, accessible names, responsive layouts, and reduced-motion behavior in a browser preview.
- Check that required local pages and assets resolve from the generated output.
- Check that the publication artifact contains neither the legacy PHP endpoint nor unrelated template content.
- Run a post-deployment smoke check against the live site, including a check for stale files that Hostinger may have left in `public_html`.
- The repository has no existing test suite or CI pattern to reuse. Keep the new checks small and centered on the generated site.

## Out of Scope

Online booking, payments, a CMS, a new blog, a database, server-side rendering, a replacement contact form, new logo artwork, and unverified WhatsApp links are outside this revamp. Creating or changing hosting credentials and publishing to production are separate launch actions.

## Further Notes

The repository currently has only `master`; `main`, CI, and the SvelteKit app have not been created. Hostinger’s branch deployment behavior was described by the owner, but file-pruning behavior has not been verified. The first publish to `master` is therefore a cutover, not a routine build: preview it, retain the old release, and inspect `public_html` for leftover files afterward.

This specification records the agreed plan. No site code, branches, or hosting settings were changed.
