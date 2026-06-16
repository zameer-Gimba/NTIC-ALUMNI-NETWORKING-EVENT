# NTIC Alumni Business Networking Event 2026 — Landing Page

A professional event landing page for the **NTIC Alumni Business Networking Event 2026**.

---

## 📁 File Structure

```
/
├── index.html        # Main landing page
├── style.css         # All styles
├── script.js         # Countdown, FAQ accordion, scroll effects
├── README.md         # This file
└── images/           # ← ADD YOUR IMAGES HERE
    ├── logo.png           # NTIC Alumni logo (navbar)
    ├── hero-bg.jpg        # Hero section background
    ├── city-bg.jpg        # "One Event" dark banner background
    ├── building.jpg       # CTA section background (venue)
    ├── speaker1.jpg       # Adewale Yusuf
    ├── speaker2.jpg       # Ijeoma Nwosu
    ├── speaker3.jpg       # Tunde Adeyemi
    ├── speaker4.jpg       # Chidinma Okafor
    ├── speaker5.jpg       # Emeka Obi
    ├── speaker6.jpg       # Maryam Bello
    ├── sponsor-galaxy.png # Galaxy Uniprep Centre logo
    └── sponsor-ntic.png   # NTIC logo (sponsor)
```

---

## 🖼️ Adding Images

1. Create an `images/` folder in the root of this repo.
2. Add your images using the exact filenames above.
3. All images fall back gracefully if missing — speaker photos use auto-generated avatars, backgrounds use the navy color.

---

## ✏️ Editable Sections

### Testimonials
The **"What Alumni Are Saying"** quotes are **directly editable in the browser** — just click on any quote text to edit it. To make changes permanent, update the text in `index.html` inside the `.testimonial-text` elements.

### Speakers
Replace the placeholder speaker cards in `index.html` — update the name, role, company, LinkedIn URL, and image filename. Add or remove `.speaker-card` blocks as needed.

### Sponsors
Replace or add sponsor logos in the `images/` folder and update the `<img>` tags in the Sponsors section. Four placeholder slots are ready for new logos.

### Registration Link
Search for `https://example.com/register` in `index.html` and replace with your actual registration URL. There are **4 instances** (hero, CTA banner, sticky button, and nav).

### WhatsApp Link
The WhatsApp link points to `https://wa.me/2348130715161`. Update if the number changes.

---

## 🚀 Deployment

This is a **pure static site** — no build step needed.

- **GitHub Pages:** Push to `main`, enable Pages from `Settings > Pages > Deploy from branch`.
- **Netlify / Vercel:** Drag and drop the folder or connect your repo for instant deployment.

---

## 🎨 Brand Colors

| Name   | Hex       |
|--------|-----------|
| Navy   | `#0D2C54` |
| Orange | `#E8692A` |
| White  | `#FFFFFF` |

---

## 📞 Contact Info (update in index.html if needed)
- **Phone:** +234 800 123 4567
- **Email:** info@nticalumni.org
- **Website:** www.nticalumni.org
- **Address:** NTIC Abuja Co-Ed, Wuse 2, Abuja, Nigeria
- **WhatsApp:** +2348130715161
- **Instagram:** @ntichub
