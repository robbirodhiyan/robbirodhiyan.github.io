# Ahmad Robbi — SEO-Ready Enterprise Portfolio

A static GitHub Pages portfolio for Enterprise Application Lead, Technical Lead, SAP Integration, Senior Laravel / Full-Stack Development, IT Business Analysis, and Business Process Analysis opportunities.

## Included

- Search-engine-friendly homepage metadata and structured data
- Dedicated HTML case-study pages with unique titles, descriptions, canonical URLs, Open Graph cards, breadcrumbs, and internal links
- Interactive application demo center
- `robots.txt`, `sitemap.xml`, `site.webmanifest`, and custom `404.html`
- Redirect pages for obsolete portfolio URLs
- Sanitized, fictional demo data with no production connection

## Publish

Copy the package contents into the root of `robbirodhiyan.github.io`, then commit and push:

```bash
git add .
git commit -m "Upgrade portfolio SEO and add case study pages"
git push origin main
```

Use `master` when that is the active GitHub Pages branch.

## Google Search Console

After deployment:

1. Add `https://robbirodhiyan.github.io/` as a URL-prefix property.
2. Use the HTML-tag verification method and paste the verification tag in `index.html` inside `<head>`.
3. Submit `sitemap.xml`.
4. Inspect and request indexing for the homepage, `/projects/`, each case study, and `/demo/`.

## Important URLs

- `/` — Portfolio homepage
- `/projects/` — Case-study index
- `/projects/sap-production-reporting/`
- `/projects/sap-data-cloning/`
- `/projects/integrated-hris/`
- `/projects/whatsapp-gateway/`
- `/projects/purchase-finance-reporting/`
- `/demo/` — Interactive demos
