# AGENTS.md — Mike Portfolio

Project ini adalah web portfolio personal untuk Mikhail Daffa Herdiansah / Mike.

## Sumber Konten

Konten utama harus sinkron dengan data LinkedIn publik yang berhasil dibaca:

- Profil LinkedIn publik: `https://id.linkedin.com/in/mikhaildhns`
- Headline publik: `Mikhail Daffa - Full-Stack Developer Enthusiast | IT Student ...`
- Bio snippet publik: `Hello! I'm Mikhail Daffa Herdiansah, an Informatics Management student at Politeknik Astra (Class of 2023). I have a strong passion for Information ...`

Catatan penting:

- LinkedIn full page terkena auth wall, jadi jangan klaim detail pengalaman, sertifikasi, organisasi, atau project yang belum ada di sumber lokal.
- Jangan tampilkan project Tugas Akhir di portfolio ini sampai Mike secara eksplisit meminta untuk menambahkannya lagi.
- Jangan tampilkan Machine Learning sebagai skill/focus area di versi ini.
- Kalau Mike memberi CV atau export teks LinkedIn, update konten berdasarkan data itu.

## Goal Website

Website harus berfungsi sebagai portfolio awal yang:

- terlihat profesional untuk mahasiswa IT yang sedang membangun karier;
- menonjolkan positioning Mike sebagai Full-Stack Developer Enthusiast dan IT Student;
- bisa dipakai sebagai landing page portofolio pribadi;
- siap dikembangkan untuk project, CV, blog, atau case study baru;
- bisa dideploy di VPS via endpoint PlugPlay Server.

## Tone & Copywriting

- Bahasa utama: English untuk kesan profesional/internasional.
- Gaya: confident, practical, ambitious, tidak lebay.
- Jangan membuat klaim palsu seperti “expert”, “senior”, atau pengalaman kerja yang belum disebutkan.
- Gunakan positioning: IT student, builder, full-stack developer enthusiast.

## Design Direction

Gunakan gaya clean developer portfolio terinspirasi Vercel:

- white background;
- near-black text `#171717`;
- Geist font;
- thin shadow-as-border cards;
- responsive layout;
- minimal tapi tetap punya karakter;
- aksen biru/pink/merah hanya untuk bidang fokus atau workflow.

## Tech Stack

- Node.js + Express untuk serving static files.
- HTML, CSS, vanilla JS.
- No build step dulu agar mini project simpel dan gampang deploy.

## Folder Structure

```txt
mike-portfolio/
├── AGENTS.md
├── README.md
├── package.json
├── docs/
│   └── PROJECT_CONTEXT.md
├── public/
│   ├── index.html
│   ├── styles.css
│   └── script.js
└── src/
    └── server.js
```

## Deployment Rules

- App listen di `127.0.0.1`, port dari env `PORT` default `3200`.
- Systemd service name: `plugplay-mike-portfolio.service`.
- Primary endpoint: `http://43.159.62.171/portfolio/`.
- Add route with:

```bash
plugplay-add-path portfolio 3200 mike-portfolio
```

## Quality Checklist

- Page bisa dibuka lokal via `http://127.0.0.1:3200`.
- Page bisa dibuka publik via `http://43.159.62.171/portfolio/`.
- Health check tersedia di `/health` dan `/portfolio/health`.
- Responsive di mobile.
- Link LinkedIn valid.
- README punya cara run/deploy.
- Tidak ada placeholder yang terlalu mentah seperti `Lorem ipsum`.
- Tidak ada konten TA atau Machine Learning pada versi ini.
