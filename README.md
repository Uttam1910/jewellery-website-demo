# AURELIA Fine Jewellery — website template (V1)

A frontend-only demo website for a luxury Indian jewellery brand. AURELIA is fictional. Products, prices, testimonials and contact details are placeholders.

**Stack:** React 19 · Vite · TypeScript · Tailwind CSS v4 · React Router · lucide-react

```bash
npm install
npm run dev        # local development
npm run build      # type-check + production build to dist/
npm run lint
npm run preview    # serve the production build
```

## Customising for a client

| What | Where |
| --- | --- |
| Brand name, tagline, phone, email, WhatsApp, socials, address, hours, appointment slots, demo labels | `src/config/jewellery.ts` |
| Products (33 demo pieces) | `src/data/products.ts` |
| Collections | `src/data/collections.ts` |
| Photography registry + alt text | `src/data/images.ts` |
| Testimonials, Instagram tiles, appointment types | `src/data/testimonials.ts`, `instagram.ts`, `appointments.ts` |
| Policy pages + FAQs | `src/data/pages.ts` |
| Colours and fonts | `@theme` block in `src/index.css` |

Set `showDemoLabels: false` in the config to hide every demo badge. Social links then point to the real profiles instead of showing a "demo profile" notice.

## Behaviour

- The bag, wishlist, checkout, appointment and newsletter features are all simulated in the browser. Nothing is sent anywhere.
- The bag and wishlist are saved in `localStorage`.
- Filters, sort and search are stored in the Shop URL (`/shop?category=rings&sort=price-asc`), so a filtered view can be shared as a link.

## Deploying

This is a single-page app. The host has to rewrite unknown paths to `index.html`. On Netlify, use `/* /index.html 200`. On Vercel, add a rewrite to `/index.html`.

## Images

All photos are from Unsplash under the Unsplash License. They are stored locally as WebP with responsive variants. See `public/images/CREDITS.md` for per-file attribution.
