import test from 'node:test';
import assert from 'node:assert/strict';

import { buildCollection, rowsToSettings } from '../src/settings.js';

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

test('buildCollection turns numbered settings into ordered records', () => {
  const settings = {
    experience_2_role: 'Intern',
    experience_2_company: 'PT Beta',
    experience_1_role: 'Developer',
    experience_1_company: 'PT Alpha',
    experience_title: 'Experience',
  };

  assert.deepEqual(buildCollection(settings, 'experience', ['role', 'company']), [
    { role: 'Developer', company: 'PT Alpha' },
    { role: 'Intern', company: 'PT Beta' },
  ]);
});

test('buildCollection skips incomplete records', () => {
  const settings = {
    project_1_name: 'Portfolio',
    project_1_description: 'Personal site',
    project_2_description: 'Missing name',
  };

  assert.deepEqual(buildCollection(settings, 'project', ['name', 'description'], 'name'), [
    { name: 'Portfolio', description: 'Personal site' },
  ]);
});
