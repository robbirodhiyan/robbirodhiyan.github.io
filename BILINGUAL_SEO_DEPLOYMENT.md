# Bilingual SEO Portfolio — Deployment Guide

## Main language structure

- Indonesian homepage: `https://robbirodhiyan.github.io/`
- English homepage: `https://robbirodhiyan.github.io/en/`
- Indonesian services: `https://robbirodhiyan.github.io/layanan/`
- English services: `https://robbirodhiyan.github.io/en/services/`
- Indonesian case studies: `https://robbirodhiyan.github.io/proyek/`
- English case studies: `https://robbirodhiyan.github.io/projects/`
- Interactive demos: `https://robbirodhiyan.github.io/demo/`

## Implemented SEO

- Self-referencing canonical URLs.
- Reciprocal `hreflang` links for Indonesian and English equivalents.
- Unique title and meta description for each service and case study.
- JSON-LD: `Person`, `WebSite`, `ProfilePage`, `Service`, `BreadcrumbList`, `FAQPage`, `Article`, and `SoftwareApplication`.
- Updated `sitemap.xml` and `robots.txt`.
- Internal links between services, case studies, demos, and consultation.
- Mobile-responsive consultation forms that open a structured WhatsApp message.
- Correct LinkedIn URL: `https://www.linkedin.com/in/ahmadrobbi`.

## Publish

1. Back up the current repository.
2. Copy all files from this package to the repository root.
3. Commit and push:

```bash
git add .
git commit -m "Add bilingual service pages and SEO structure"
git push origin main
```

Use `master` if that is the active GitHub Pages branch.

## Search Console

After deployment:

1. Confirm these URLs load:
   - `https://robbirodhiyan.github.io/`
   - `https://robbirodhiyan.github.io/en/`
   - `https://robbirodhiyan.github.io/layanan/`
   - `https://robbirodhiyan.github.io/en/services/`
   - `https://robbirodhiyan.github.io/sitemap.xml`
2. Submit `sitemap.xml`.
3. Request indexing for the homepage and priority service pages.
4. Monitor **Performance → Queries** for service keywords.

## Priority pages to index first

- `/layanan/integrasi-sap/`
- `/layanan/aplikasi-manufaktur/`
- `/layanan/otomasi-proses-bisnis/`
- `/layanan/pembuatan-aplikasi-web-mobile/`
- `/en/services/sap-integration/`
- `/en/services/web-mobile-app-development/`

## Contact form behavior

The consultation form does not send or store data on a server. JavaScript formats the fields and opens WhatsApp to `+62 822-3290-0440`.
