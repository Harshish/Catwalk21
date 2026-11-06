import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

const script = readFileSync(new URL('../static/theme.js', import.meta.url), 'utf8');

function setup({ saved = null, dark = false, blocked = false } = {}) {
  const window = new EventTarget();
  const media = new EventTarget();
  media.matches = dark;
  window.matchMedia = () => media;
  const root = { dataset: {} };
  let themeColor;
  runInNewContext(script, {
    window, Event,
    document: {
      documentElement: root,
      querySelector: () => ({ setAttribute: (_, value) => { themeColor = value; } })
    },
    localStorage: {
      getItem: () => { if (blocked) throw new Error('Blocked'); return saved; },
      setItem: (_, value) => { if (blocked) throw new Error('Blocked'); saved = value; }
    }
  });
  return {
    theme: () => root.dataset.theme,
    saved: () => saved,
    color: () => themeColor,
    toggle: () => window.dispatchEvent(new Event('toggle-theme')),
    system: (dark) => { media.matches = dark; media.dispatchEvent(new Event('change')); }
  };
}

test('theme follows the system until the visitor chooses, then persists', () => {
  const page = setup();
  assert.equal(page.theme(), 'light');
  page.system(true);
  assert.equal(page.theme(), 'dark');
  page.toggle();
  assert.equal(page.theme(), 'light');
  assert.equal(page.saved(), 'light');
  assert.equal(page.color(), '#fbf3ec');
  page.system(true);
  assert.equal(page.theme(), 'light');
  assert.equal(setup({ saved: page.saved(), dark: true }).theme(), 'light');
});

test('saved dark theme overrides the system and invalid values fall back', () => {
  assert.equal(setup({ saved: 'dark' }).theme(), 'dark');
  assert.equal(setup({ saved: 'invalid', dark: true }).theme(), 'dark');
});

test('blocked storage does not prevent switching themes', () => {
  const page = setup({ blocked: true, dark: true });
  assert.equal(page.theme(), 'dark');
  page.toggle();
  assert.equal(page.theme(), 'light');
  page.toggle();
  assert.equal(page.theme(), 'dark');
  assert.equal(page.color(), '#1c1117');
});
