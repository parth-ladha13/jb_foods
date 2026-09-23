# J.B. Foods Website

Responsive marketing/lead-generation website for J.B. Foods (Jai Balaji Food Products), a premium spices, seeds & pulses exporter based in Jaipur, Rajasthan, established 1997. Built as a static multi-page site using Bootstrap 5 — no build step, no backend required.

## Structure

```
index.html          Home (rotating hero, products, company/warehousing/farming, certifications)
about.html           About Us & Company Profile
products.html        Product catalogue with search & category filter
contact.html          Enquiry form + contact details
catalogue-print.html  Source template for the downloadable PDF catalogue (not linked in nav)
assets/css/style.css  Site styling (forest green / terracotta theme)
assets/js/main.js     Nav highlighting, form validation, footer year, hero slideshow
assets/js/products.js Product rendering, search, filter, detail modal
assets/data/products.json  Product catalogue data (edit this to add/update products)
assets/img/products/  Real client-provided product photos
assets/downloads/JB-Foods-Product-Catalogue.pdf  Downloadable PDF catalogue (linked from nav "Catalogue")
robots.txt, sitemap.xml    Basic SEO files
```

### Regenerating the PDF catalogue

If products or company info change, regenerate the PDF from `catalogue-print.html` (which pulls live from `products.json`):

```
python3 -m http.server 8123 &
google-chrome --headless --disable-gpu --no-sandbox \
  --print-to-pdf="assets/downloads/JB-Foods-Product-Catalogue.pdf" \
  --no-pdf-header-footer --virtual-time-budget=4000 \
  http://localhost:8123/catalogue-print.html
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
