# J.B. Foods Website

Responsive marketing/lead-generation website for J.B. Foods (Jai Balaji Food Products), a premium spices, seeds & pulses exporter based in Jaipur, Rajasthan, established 1997. Built as a static multi-page site using Bootstrap 5 — no build step, no backend required.

## Structure

```
index.html          Home
about.html           About Us & Company Profile
products.html        Product catalogue with search & category filter
services.html        Services / export process
faq.html              FAQ
contact.html          Enquiry form + contact details
assets/css/style.css  Site styling (green/nature theme)
assets/js/main.js     Nav highlighting, form validation, footer year
assets/js/products.js Product rendering, search, filter, detail modal
assets/data/products.json  Product catalogue data (edit this to add/update products)
robots.txt, sitemap.xml    Basic SEO files
```

## Running locally

No build tools needed — just serve the folder (the product catalogue is loaded via `fetch`, which requires `http://` rather than opening the file directly):

```
python3 -m http.server 8000
```

Then open http://localhost:8000

## Before going live — replace these placeholders

- **Enquiry form**: `contact.html` uses [Web3Forms](https://web3forms.com) (free) — sign up and replace `YOUR_WEB3FORMS_ACCESS_KEY` with your real access key. Without this, the enquiry form won't actually deliver submissions anywhere.
- **Google Analytics**: uncomment and add the Measurement ID in the `<head>` of `index.html` (and copy to other pages once confirmed).
- **Product images**: `assets/data/products.json` currently uses Unsplash stock photos as placeholders — swap `image` URLs for real product photography.
- **Social media links**: Facebook/Instagram/LinkedIn icons in the footer currently point to `#` — add real profile URLs once available.
- **Certifications**: if J.B. Foods holds any export certifications (FSSAI is already referenced in the About copy), add a certifications/badges section with the actual certificate images — don't add badges for certifications not actually held.

Contact details (WhatsApp +91 99285 99867, jbfoodsjaipur@gmail.com, Jaipur address) and the product catalogue (coriander, sesame, turmeric, groundnut, chickpeas, cumin, cardamom) are already filled in from the client's own draft content — double check these are current before launch.

## Deployment

Any static host works free of cost, e.g. **Netlify**, **Vercel**, or **GitHub Pages** — just point it at this folder, no build command needed.
