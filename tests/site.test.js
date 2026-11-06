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
  for (const image of ['catwalk21_cat_logo_black.svg', 'catwalk21_cat_logo_white.svg', 'bg3.jpg', 'bg8.jpg', 'bg11.jpg', 'bg12.jpg']) {
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

test('contact actions use local SVG icons with visible text labels', () => {
  for (const label of ['Email us', 'Facebook', 'Back to top', 'Call 8452032889', 'Get directions']) {
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

test('published site excludes template contact and tracking code', () => {
  assert.ok(!existsSync(new URL('../build/contact.php', import.meta.url)));
  assert.ok(!existsSync(new URL('../build/blog.html', import.meta.url)));
  assert.ok(!existsSync(new URL('../build/vendor/', import.meta.url)));
  assert.doesNotMatch(html, /fbevents|wowthemes|contact\.php|#!|wa\.me|fonts\.googleapis/);
  const css = readdirSync(new URL('../build/_app/immutable/assets/', import.meta.url)).filter((file) => file.endsWith('.css')).map((file) => readFileSync(new URL(`../build/_app/immutable/assets/${file}`, import.meta.url), 'utf8')).join('');
  assert.match(css, /prefers-reduced-motion:reduce/);
});
