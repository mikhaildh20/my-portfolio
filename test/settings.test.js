import test from 'node:test';
import assert from 'node:assert/strict';

import { rowsToSettings } from '../src/settings.js';

test('rowsToSettings converts mst_detail_settings rows into key-value settings', () => {
  const rows = [
    { setting_key: 'hero_title', setting_value: 'Custom hero' },
    { setting_key: 'avatar_path', setting_value: 'assets/custom-avatar.jpg' },
  ];

  assert.deepEqual(rowsToSettings(rows), {
    hero_title: 'Custom hero',
    avatar_path: 'assets/custom-avatar.jpg',
  });
});

test('rowsToSettings ignores malformed rows', () => {
  const rows = [
    { setting_key: 'valid_key', setting_value: 'Valid value' },
    { setting_key: '', setting_value: 'No key' },
    { setting_value: 'Missing key' },
    null,
  ];

  assert.deepEqual(rowsToSettings(rows), {
    valid_key: 'Valid value',
  });
});
