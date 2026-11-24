import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { URL } from 'node:url';
import { test } from 'node:test';
import pl from '../src/shared/i18n/locales/pl.json' with { type: 'json' };
import en from '../src/shared/i18n/locales/en.json' with { type: 'json' };

test('Polish and English messages have matching keys and interpolation variables', () => {
  assert.deepEqual(Object.keys(en).sort(), Object.keys(pl).sort());

  for (const [group, messages] of Object.entries(pl)) {
    assert.deepEqual(Object.keys(en[group]).sort(), Object.keys(messages).sort(), group);

    for (const [key, polish] of Object.entries(messages)) {
      const english = en[group][key];
      assert.ok(polish.trim() && english.trim(), group + '.' + key);
      assert.deepEqual(
        (english.match(/{{\w+}}/g) ?? []).sort(),
        (polish.match(/{{\w+}}/g) ?? []).sort(),
        group + '.' + key,
      );
    }
  }
});

test('static page metadata matches the Polish default before React mounts', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /<html lang="pl">/);

  for (const value of Object.values(pl.meta)) assert.ok(html.includes(value), value);
});
