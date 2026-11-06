import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { test } from 'node:test';

const html = readFileSync(new URL('../build/index.html', import.meta.url), 'utf8');

test('visitor can find each Branch and call the correct number', () => {
  const cards = [...html.matchAll(/<article class="branch-card[^\"]*"[^>]*>([\s\S]*?)<\/article>/g)].map((match) => match[1]);
  assert.equal(cards.length, 2);
  assert.match(cards[0], /Thakur Complex[\s\S]*href="tel:\+918452032889"[\s\S]*Directions/);
  assert.match(cards[1], /Thakur Village[\s\S]*href="tel:\+919004960045"[\s\S]*Directions/);
  assert.match(html, /href="https:\/\/www\.google\.com\/maps\/search/);
});

test('visitor can explore Services with the original logo and local assets', () => {
  for (const service of ['Salon', 'Spa', 'Skin care', 'Bridal']) assert.match(html, new RegExp(service));
  assert.match(html, /img\/full_logo\.png/);
  for (const image of ['full_logo.png', 'bg3.jpg', 'bg8.jpg', 'bg11.jpg', 'bg12.jpg']) {
    assert.ok(existsSync(new URL(`../build/img/${image}`, import.meta.url)), `${image} is published`);
  }
});

test('published site excludes template contact and tracking code', () => {
  assert.ok(!existsSync(new URL('../build/contact.php', import.meta.url)));
  assert.ok(!existsSync(new URL('../build/blog.html', import.meta.url)));
  assert.ok(!existsSync(new URL('../build/vendor/', import.meta.url)));
  assert.doesNotMatch(html, /fbevents|wowthemes|contact\.php|#!|wa\.me/);
});
