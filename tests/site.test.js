import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { test } from 'node:test';

const html = readFileSync(new URL('../build/index.html', import.meta.url), 'utf8');

test('visitor can find each Branch and call the correct number', () => {
  const cards = [...html.matchAll(/<article class="branch-card[^\"]*"[^>]*>([\s\S]*?)<\/article>/g)].map((match) => match[1]);
  assert.equal(cards.length, 2);
  assert.match(cards[0], /Thakur Complex[\s\S]*href="tel:\+918452032889"[\s\S]*Directions/);
  assert.match(cards[1], /Thakur Village[\s\S]*href="tel:\+919004960045"[\s\S]*Directions/);
  assert.match(html, /href="https:\/\/www\.google\.com\/maps\/search/);
});

test('visitor can explore women-forward, unisex Services with the original logo and local assets', () => {
  for (const service of ['Hair', 'Spa', 'Skin care', 'Bridal']) assert.match(html, new RegExp(service));
  assert.match(html, /women-forward beauty and wellness space, warmly welcoming everyone/i);
  assert.match(html, /img\/catwalk21_cat_logo_black\.svg/);
  assert.match(html, /img\/catwalk21_cat_logo_white\.svg/);
  assert.match(html, /aria-label="Dark theme"/);
  assert.match(html, /href="#main-content"/);
  assert.doesNotMatch(html, /full_logo\.png/);
  for (const image of ['catwalk21_cat_logo_black.svg', 'catwalk21_cat_logo_white.svg', 'hero-bride.jpg', 'bg3.jpg', 'bg8.jpg', 'bg10.jpg', 'bg11.jpg', 'bg12.jpg', 'bridal-portrait.jpg', 'mehendi.jpg', 'salon-interior.jpg']) {
    assert.ok(existsSync(new URL(`../build/img/${image}`, import.meta.url)), `${image} is published`);
  }
});

test('each service has its own photo and keyboard-accessible enquiry link', () => {
  const cards = [...html.matchAll(/<article class="service-card[^\"]*"[^>]*>([\s\S]*?)<\/article>/g)].map((match) => match[1]);
  assert.equal(cards.length, 4);
  for (const [index, service] of ['Hair', 'Skin care', 'Spa', 'Bridal'].entries()) {
    assert.match(cards[index], /<img[^>]+alt="[^"]+"/);
    assert.ok(cards[index].includes(`aria-label="Enquire about ${service}"`));
    assert.match(html, new RegExp(`id="service-${index}"`));
  }
  assert.doesNotMatch(html, /textPath|service-stage|onmouseenter/);
});

test('original copy and a pausable decorative service marquee are published', () => {
  assert.match(html, /Made for your/);
  assert.match(html, /main character/);
  assert.match(html, /Leave feeling like yourself/);
  assert.match(html, /aria-label="Pause service marquee"/);
  assert.match(html, /class="marquee-window[^"]*" aria-hidden="true"/);
  assert.equal([...html.matchAll(/class="marquee-group\b/g)].length, 2);
  assert.doesNotMatch(html, /service-navigation|Good hair\./);
});

test('mandala ornaments are rendered locally and excluded from assistive navigation', () => {
  const ornaments = [...html.matchAll(/<div class="mandala [^"]*"[^>]*>[\s\S]*?<\/svg>\s*<\/div>/g)].map(([markup]) => markup);
  assert.equal(ornaments.length, 7);
  for (const ornament of ornaments) {
    assert.match(ornament, /^<div[^>]*aria-hidden="true"/);
    assert.equal(ornament.match(/<svg\b/g)?.length, 4);
    assert.match(ornament, /<path/);
    assert.doesNotMatch(ornament, /<a\b|tabindex/);
  }
});

test('each service carries a Sanskrit word marked as Sanskrit and a Devanagari index', () => {
  const cards = [...html.matchAll(/<article class="service-card[^"]*"[^>]*>([\s\S]*?)<\/article>/g)].map((match) => match[1]);
  for (const [index, word] of ['केशः', 'कान्तिः', 'विश्रान्तिः', 'मङ्गलम्'].entries()) {
    assert.match(cards[index], new RegExp(`<span lang="sa"[^>]*>${word}</span>`));
    assert.match(cards[index], new RegExp(`aria-hidden="true"[^>]*>०${'१२३४'[index]}</span>`));
  }
});

test('temple ornaments are decorative and the photo arch has one shared shape', () => {
  const ornaments = [...html.matchAll(/<svg class="(arch-frame|service-divider)[^"]*"[^>]*>/g)].map(([markup]) => markup);
  assert.equal(ornaments.length, 7);
  for (const ornament of ornaments) assert.match(ornament, /aria-hidden="true"/);
  const frame = html.match(/<svg class="arch-frame[\s\S]*?<path[^>]*d="([^"]+)"/)[1];
  assert.ok(decodeURIComponent(html.match(/--arch-mask: url\(&quot;data:image\/svg\+xml,([^&]+)&quot;\)/)[1]).includes(frame));
});

test('logo wordmark uses a self-hosted, openly licensed font', () => {
  const assets = new URL('../build/_app/immutable/assets/', import.meta.url);
  const css = readdirSync(assets).filter((file) => file.endsWith('.css')).map((file) => readFileSync(new URL(file, assets), 'utf8')).join('');
  assert.match(css, /font-family:\s*["']?Didact Gothic/);
  assert.ok(readdirSync(assets).some((file) => /didact-gothic-latin-400.*\.woff2$/.test(file)));
  assert.doesNotMatch(html + css, /champagne|fonts\.googleapis/i);
});

test('contact actions use local SVG icons with visible text labels', () => {
  for (const label of ['Email us', 'Instagram', 'Facebook', 'Back to top', 'Call 8452032889', 'Get directions']) {
    const link = [...html.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/g)].find(([markup]) => markup.includes(label));
    assert.ok(link, `${label} link exists`);
    assert.match(link[0], /<svg[^>]*aria-hidden="true"/);
  }
});

test('reviews link to the original branch listings without fabricated ratings', () => {
  assert.match(html, /id="reviews"/);
  assert.match(html, /class="review-feature/);
  assert.doesNotMatch(html, /class="review-card|class="review-grid/);
  for (const cid of ['1772599461488886969', '8788651649671816183']) {
    assert.ok(html.includes(`href="https://www.google.com/maps?cid=${cid}"`));
  }
  assert.doesNotMatch(html, /aggregateRating|ratingValue|<blockquote/);
  assert.match(html, /Read Google reviews for Thakur Complex \(opens in a new tab\)/);
  assert.match(html, /Read Google reviews for Thakur Village \(opens in a new tab\)/);
});

test('bridal, gallery and Instagram sections use local photos and link the real account', () => {
  assert.match(html, /id="bridal"/);
  assert.match(html, /id="gallery"/);
  const tiles = [...html.matchAll(/<figure class="tile[^"]*"[^>]*><img[^>]+alt="[^"]+"/g)];
  assert.equal(tiles.length, 6);
  assert.ok(html.includes('href="https://www.instagram.com/catwalk21salon/"'));
  assert.doesNotMatch(html, /instagram\.com\/embed|cdninstagram|images\.unsplash/);
});

test('mobile quick-call bar dials each Branch', () => {
  const bar = html.match(/<nav class="call-bar[^"]*" aria-label="Quick call">([\s\S]*?)<\/nav>/)?.[1];
  assert.ok(bar, 'quick-call bar exists');
  assert.match(bar, /href="tel:\+918452032889"[^>]*aria-label="Call Thakur Complex"/);
  assert.match(bar, /href="tel:\+919004960045"[^>]*aria-label="Call Thakur Village"/);
});

test('search engines get canonical metadata, local business data and crawl files', () => {
  assert.match(html, /<html lang="en-IN"/);
  assert.match(html, /<link rel="canonical" href="https:\/\/catwalk21salon\.com\/"/);
  assert.match(html, /<meta property="og:image" content="https:\/\/catwalk21salon\.com\/img\/og-image\.jpg"/);
  assert.ok(existsSync(new URL('../build/img/og-image.jpg', import.meta.url)));
  const json = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  assert.ok(json, 'structured data exists');
  const salons = JSON.parse(json)['@graph'].filter((node) => node['@type'] === 'BeautySalon');
  assert.deepEqual(salons.map((salon) => salon.telephone), ['+918452032889', '+919004960045']);
  for (const salon of salons) assert.equal(salon.address.postalCode, '400101');
  const robots = readFileSync(new URL('../build/robots.txt', import.meta.url), 'utf8');
  assert.match(robots, /Sitemap: https:\/\/catwalk21salon\.com\/sitemap\.xml/);
  assert.match(readFileSync(new URL('../build/sitemap.xml', import.meta.url), 'utf8'), /<loc>https:\/\/catwalk21salon\.com\/<\/loc>/);
  assert.match(readFileSync(new URL('../build/.htaccess', import.meta.url), 'utf8'), /RewriteRule \^blog\\\.html\$ \/ \[L,R=301\]/);
});

test('published site excludes template contact and tracking code', () => {
  assert.ok(!existsSync(new URL('../build/contact.php', import.meta.url)));
  assert.ok(!existsSync(new URL('../build/blog.html', import.meta.url)));
  assert.ok(!existsSync(new URL('../build/vendor/', import.meta.url)));
  assert.doesNotMatch(html, /fbevents|wowthemes|contact\.php|#!|wa\.me|fonts\.googleapis/);
  const css = readdirSync(new URL('../build/_app/immutable/assets/', import.meta.url)).filter((file) => file.endsWith('.css')).map((file) => readFileSync(new URL(`../build/_app/immutable/assets/${file}`, import.meta.url), 'utf8')).join('');
  assert.match(css, /prefers-reduced-motion:reduce/);
});
