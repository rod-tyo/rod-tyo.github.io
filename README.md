# Portfolio — Eleventy Starter

Struktur portfolio dengan 3 jenis konten: **case studies**, **design system
process**, dan **motion UI**.

## Cara jalanin

```bash
npm install
npm start
```

Buka `http://localhost:8080`.

Build untuk production:

```bash
npm run build
```

## Struktur

```
src/
├── case-studies/       → tiap file .md = 1 case study (collection "caseStudies")
├── design-system/      → tiap file .md = 1 tulisan proses (collection "designSystem")
├── motion/              → tiap file .md = 1 motion piece (collection "motion")
├── _includes/
│   ├── layouts/
│   │   ├── base.njk           → layout utama (head, nav, footer)
│   │   ├── case-study.njk     → layout untuk halaman detail case study
│   │   └── motion-item.njk    → layout untuk halaman detail motion
│   └── partials/
│       └── site-head.njk      → navigasi
├── _data/
│   └── meta.js          → data global situs (nama, deskripsi)
├── css/
│   ├── tokens.css        → EDIT DI SINI dulu: warna, tipografi, spacing, motion timing
│   ├── base.css           → reset + style elemen dasar
│   ├── utilities.css      → class kecil reusable (.wrapper, .flow, .frame, .grid)
│   └── blocks.css         → styling komponen (nav, card, hero)
├── images/               → taruh gambar di sini
├── videos/               → taruh video motion UI di sini
├── index.njk             → homepage
├── work.njk               → listing case studies
├── process.njk            → listing design system
├── motion.njk              → listing motion UI
└── about.njk
```

## Nambah konten baru

**Case study baru** → copy `src/case-studies/contoh-project.md`, ganti front
matter dan isi. File otomatis muncul di `/work/` karena masuk collection
`caseStudies`.

**Tulisan design system baru** → copy `src/design-system/typography.md`.

**Motion baru** → copy `src/motion/contoh-motion.md`. Untuk video, taruh file
`.mp4` di `src/videos/` lalu isi `media.src` di front matter. Untuk gif,
`media.type: gif`.

## Yang perlu kamu ganti sebelum publish

1. `src/_data/meta.js` — nama & deskripsi kamu
2. `src/css/tokens.css` — warna & font sesuai identitas kamu (font saat ini
   asumsi "Inter", ganti / tambah `@font-face` kalau pakai font lain)
3. Ganti semua `contoh-*.md` dengan konten asli, hapus yang placeholder
4. Ganti `/images/case-studies/placeholder.jpg` dan `/videos/placeholder.mp4`
   dengan asset asli kamu

## Kenapa vanilla CSS (bukan Tailwind/Gorko)?

Karena salah satu fokus portfolio ini adalah *proses membangun design
system* — jadi `tokens.css` sengaja ditulis manual dan diberi komentar,
supaya file itu sendiri bisa jadi bagian dari cerita di halaman
"Design System" kamu. Kontrol penuh atas CSS custom properties juga
memudahkan fine-tuning animasi untuk showcase motion UI.

## Deploy

Push ke GitHub, lalu connect ke Netlify atau Vercel:
- Build command: `npm run build`
- Output directory: `dist`
