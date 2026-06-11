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

## Deploy on PlugPlay Server

Create service:

```bash
plugplay-service-node mike-portfolio 3200 "npm start"
```

Map endpoint:

```bash
plugplay-add-path portfolio 3200 mike-portfolio
```

Public URL:

```txt
http://43.159.62.171/portfolio/
```

## Next Improvements

- Replace placeholder contact text with a real email if Mikhail Daffa Herdiansah wants it public.
- Add GitHub profile link.
- Add project screenshots.
- Add downloadable CV.
- Add verified project cards from real repositories.
- Add real certification/experience content from LinkedIn export or CV.
