# Mikhail Daffa Herdiansah Portfolio

Personal portfolio website for **Mikhail Daffa Herdiansah**.

Built as the first mini project on the PlugPlay VPS setup.

## Content Source

This version is synced with the public LinkedIn information currently accessible without login:

- LinkedIn public search snippet for `mikhaildhns`
- Public headline: `Full-Stack Developer Enthusiast | IT Student ...`
- Public bio snippet: `Hello! I'm Mikhail Daffa Herdiansah, an Informatics Management student at Politeknik Astra (Class of 2023). I have a strong passion for Information ...`

LinkedIn full profile page is blocked by LinkedIn auth wall during extraction, so this version avoids unsupported claims such as detailed work history, certifications, or unverified project details.

## Structure

```txt
mike-portfolio/
├── AGENTS.md
├── README.md
├── package.json
├── docs/
│   └── PROJECT_CONTEXT.md
├── public/
│   ├── assets/
│   │   └── README.md
│   ├── index.html
│   ├── styles.css
│   └── script.js
└── src/
    └── server.js
```

## Run Locally

```bash
npm install
PORT=3200 npm start
```

Open:

```txt
http://127.0.0.1:3200
```

Health check:

```txt
http://127.0.0.1:3200/health
```

## PostgreSQL Content Settings

Dynamic portfolio content is stored in PostgreSQL:

- Database: `my_portfolio`
- Table: `mst_detail_settings`
- Main editable columns:
  - `setting_key`
  - `setting_value`
  - `setting_group`
  - `description`

Schema and seed files:

```txt
database/schema.sql
database/seed.sql
```

Apply them with:

```bash
psql -d my_portfolio -f database/schema.sql
psql -d my_portfolio -f database/seed.sql
```

Example content update:

```sql
update mst_detail_settings
set setting_value = 'Turning my ideas into practical web applications.',
    updated_at = now()
where setting_key = 'hero_title';
```

Example photo path update:

```sql
update mst_detail_settings
set setting_value = 'assets/avatar.jpg',
    updated_at = now()
where setting_key = 'avatar_path';
```

The frontend loads settings from:

```txt
/api/settings
```

## Deploy on VPS

Runtime service:

```txt
plugplay-mike-portfolio.service
```

Internal port:

```txt
3200
```

Public URL:

```txt
https://portfolio.karsa-dev.my.id/
```

The historical path URL redirects to the portfolio subdomain.

## Next Improvements

- Keep the profile photo updated through the `avatar_path` portfolio setting.
- Keep contact links current for email, GitHub, and LinkedIn.
- Add new verified work, internship, freelance, part-time, education, or certification records as Mikhail Daffa Herdiansah provides them.
- Reintroduce Projects or Curriculum Vitae sections only if Mike explicitly requests them later.
