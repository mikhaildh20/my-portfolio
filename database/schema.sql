create table if not exists mst_detail_settings (
  setting_key text primary key,
  setting_value text not null,
  setting_group text not null default 'content',
  description text,
  updated_at timestamptz not null default now()
);

create index if not exists idx_mst_detail_settings_group on mst_detail_settings(setting_group);
