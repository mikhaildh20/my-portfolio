# Project Context — Mike Portfolio

## Purpose

Public personal portfolio for Mikhail Daffa Herdiansah. Keep this context separate from Karsa Home, KVS, and Hermes Dashboard.

## Identity / Brand

- Formal name: Mikhail Daffa Herdiansah
- Nickname: Mike, secondary only
- LinkedIn: `https://www.linkedin.com/in/mikhaildhns`
- GitHub: `https://github.com/mikhaildh20`
- Email: `mikhaildaffa7@gmail.com`
- Positioning: Full-Stack Developer Enthusiast | IT Student
- Student: Informatics Management, Politeknik Astra, class of 2023

Portfolio tone should feel ambitious, grounded, technical, readable, student-friendly, clean, practical, and future-facing.

Avoid overclaiming, fake work experience, unsupported certifications, unsupported project claims, buzzword spam, and overly corporate copy.

## Repo / Path

- Repo: `mikhaildh20/my-portfolio`
- Path: `/opt/projects/mike-portfolio`
- Branch: `main`

## Runtime

- App: Node.js + Express/static portfolio
- Service: `plugplay-mike-portfolio.service`
- Internal port: `3200`
- Public URL: `https://portfolio.karsa-dev.my.id/`
- Historical path URL: `https://karsa-dev.my.id/portfolio/` redirects to subdomain
- Deployment pattern: systemd + Nginx, not PM2

## Database

- DBMS: PostgreSQL
- Database: `my_portfolio`
- Main table: `mst_detail_settings`
- Content is dynamic through settings and collection-style keys.

## Content Rules

- Site copy should be English.
- Use first-person perspective.
- Use formal name primarily; use “Mike” sparingly as secondary nickname.
- Do not include Tugas Akhir / Kanban / KVS content unless explicitly requested.
- Do not include academic/final-project entries in the Experience section; Experience is reserved for work, internship, freelance, or part-time roles.
- Portfolio/work history should refer to the IT Developer internship company as `PT Indonesia Koito`.
- Do not change portfolio work-history company names when the user asks for KVS/NLA branding text.
- Do not include Machine Learning content unless explicitly requested.
- Current live page intentionally does not show Projects or Curriculum Vitae sections; add them back only if Mike explicitly requests.
- Do not credit Hermes agent in footer.
- Keep claims aligned with verified LinkedIn/CV facts.

## Dynamic Sections

Known dynamic areas include:

- Hero
- About
- Focus Areas
- Tech Direction
- Experience
- Education
- Licenses & Certifications
- Contact

Collection keys use DB-driven patterns, so prefer editing DB/settings over hardcoding when content changes.

## Assets

- Portfolio asset folder: `/opt/projects/mike-portfolio/public/assets/`
- Karsa Home card image for this project lives in Karsa Home, not here:
  - `/opt/projects/karsa-home/public/assets/portfolio-preview.svg`
  - Public path: `/home-assets/portfolio-preview.svg`

## Verification Checklist

Before reporting Portfolio work as done:

1. Run project tests/checks if code changed.
2. `systemctl is-active plugplay-mike-portfolio.service`.
3. Check health endpoint if available.
4. Verify public URL returns HTTP 200.
5. Verify DB-backed content still loads.
6. Confirm no real credentials/secrets are committed or printed.

## Context Boundary

When the user says Portfolio context, focus only on:

- `/opt/projects/mike-portfolio`
- PostgreSQL database `my_portfolio`
- `https://portfolio.karsa-dev.my.id/`

Do not modify Karsa Home except when the user asks to update the portfolio card shown on the homepage.
Do not modify KVS or Hermes Dashboard unless explicitly requested.
