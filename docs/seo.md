# SEO

## What the site provides

- **Canonical address:** `https://catwalk21salon.com/` (HTTPS, no `www`). Set as `site` in `src/routes/+page.svelte` and in `static/.htaccess`; change both together.
- **Page metadata:** title, description, canonical link, Open Graph and Twitter tags, `lang="en-IN"`. Share image: `static/img/og-image.jpg` (1200×630).
- **Structured data:** JSON-LD `Organization` plus one `BeautySalon` per Branch with address, phone, map link, Instagram and Facebook. Ratings, prices and opening hours are omitted until verified.
- **Crawl files:** `static/robots.txt` and `static/sitemap.xml`.
- **Hostinger rules (`static/.htaccess`):** HTTP and `www` redirect to the canonical address; `/blog.html` redirects to `/`; `/contact.php` returns 410 Gone; hashed build assets are cached for a year. The build workflow uploads hidden files so `.htaccess` is published.

## Next steps

1. **Approve the canonical address.** To use `www` instead, update `site` in `src/routes/+page.svelte` and `static/.htaccess`.
2. **Deploy, then verify the rules on the live host.**
   ```sh
   curl -sI https://www.catwalk21salon.com | grep -i location   # expect https://catwalk21salon.com/
   curl -sI https://catwalk21salon.com/blog.html | head -1      # expect 301
   curl -s https://catwalk21salon.com/robots.txt
   ```
   If a check fails, confirm `.htaccess` is present in `public_html`.
3. **Remove stale files from `public_html`.** Hostinger may not delete files removed from `master` (`contact.php`, `blog.html`, `css/`, `js/`, `vendor/`). Back up first.
4. **Google Search Console.** Add a Domain property (verify with a DNS TXT record in Hostinger), submit `https://catwalk21salon.com/sitemap.xml`, and request indexing of the homepage.
5. **Google Business Profile, for both Branches.** This is the largest local-search lever.
   - Claim or verify each listing.
   - Match the name, address and phone on the website exactly.
   - Set the website to `https://catwalk21salon.com/` and choose a primary category (Beauty salon or Hair salon).
   - Add opening hours and real photos, and ask happy guests for reviews.
6. **Provide opening hours and a price range.** Once verified, add them to the structured data in `src/routes/+page.svelte`.
7. **Validate.** Run the page through Google's Rich Results Test, and share the link on WhatsApp to check the preview card.
8. **Instagram.** Put the site link in the @catwalk21salon bio.
9. **Old URLs.** After a few weeks, check Search Console for old URLs that still get traffic and add redirects for them in `static/.htaccess`.
10. **Keep the sitemap current.** Update `lastmod` in `static/sitemap.xml` after significant content changes.
11. **Replace stock photos.** Real salon photography helps in Google Images and on the Business Profile. See the photo list in `README.md`.
