# Agent Notes — Mike Portfolio

Always read `docs/PROJECT_CONTEXT.md` before making portfolio changes.

This repo is the public personal portfolio for Mikhail Daffa Herdiansah / Mike. Keep this context separate from KVS, Karsa Home, and Hermes Dashboard.

## Source of Truth

- Public LinkedIn profile: `https://id.linkedin.com/in/mikhaildhns`
- GitHub profile: `https://github.com/mikhaildh20`
- Public email: `mikhaildaffa7@gmail.com`
- LinkedIn may be behind an auth wall; do not invent experience, certifications, organizations, or projects that are not in local project context, DB settings, CV/export text, or explicit user input.
- Main profile photo is configured through the `avatar_path` setting.

## Content Rules

- Main language: English.
- Copy style: first-person, practical, confident, grounded, not exaggerated.
- Primary name: `Mikhail Daffa Herdiansah`; `Mike` can appear only as a secondary nickname.
- Positioning: IT student, Full-Stack Developer Enthusiast, builder.
- Do not claim senior/expert status or unsupported professional experience.
- Do not show Tugas Akhir / Kanban / KVS content unless Mike explicitly asks.
- Do not show academic/final-project entries in Experience.
- Experience is only for work, internship, freelance, or part-time roles.
- Do not show Machine Learning content unless explicitly requested.
- Current live site intentionally has no Projects section and no Curriculum Vitae section.
- Portfolio/work history should refer to the IT Developer internship company as `PT Indonesia Koito`; do not change it to KVS/NLA branding unless Mike explicitly asks for portfolio content.

## Runtime / Deployment

- App: Node.js + Express serving static files and DB-backed settings.
- Content DB: PostgreSQL `my_portfolio`, table `mst_detail_settings`.
- Service: `plugplay-mike-portfolio.service`.
- Internal port: `3200`.
- Public URL: `https://portfolio.karsa-dev.my.id/`.
- Historical path URL redirects to the portfolio subdomain.
- Deployment pattern: systemd + Nginx, not PM2.

## Design Direction

- Clean developer portfolio inspired by Vercel.
- White background, near-black text, Geist font.
- Thin shadow/border cards.
- Responsive layout.
- Minimal, professional, readable, and not overdesigned.

## Editing Rules

- Prefer DB/settings edits for dynamic content such as hero, focus areas, experience, education, certifications, and contact.
- Use code edits only for rendering behavior, layout, styling, or structural site changes.
- Do not hardcode dynamic content into JS/HTML if the DB setting already owns it.
- Keep portfolio changes isolated to `/opt/projects/mike-portfolio` and `my_portfolio` unless Mike explicitly asks for another project.

## Quality Checklist

Before reporting portfolio work as done:

1. Run project tests/checks if code changed.
2. Confirm `plugplay-mike-portfolio.service` is active.
3. Check `/health` if relevant.
4. Verify `https://portfolio.karsa-dev.my.id/` returns HTTP 200.
5. Verify DB-backed content still loads.
6. Confirm no credentials/secrets are committed, printed, or exposed.
