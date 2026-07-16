# Panduan Aktivasi SEO

Source website sudah disiapkan untuk GitHub Pages dengan halaman HTML terpisah, metadata unik, canonical URL, Open Graph, structured data, internal link, `robots.txt`, dan `sitemap.xml`.

## 1. Publikasikan ke GitHub Pages

Salin seluruh isi folder ini ke root repository `robbirodhiyan.github.io`, lalu jalankan:

```bash
git add .
git commit -m "Upgrade portfolio SEO and case studies"
git push origin main
```

Gunakan `master` apabila branch GitHub Pages aktif Anda bernama `master`.

## 2. Verifikasi hasil deployment

Buka URL berikut dan pastikan semuanya dapat diakses:

- `https://robbirodhiyan.github.io/`
- `https://robbirodhiyan.github.io/projects/`
- `https://robbirodhiyan.github.io/projects/sap-production-reporting/`
- `https://robbirodhiyan.github.io/projects/sap-data-cloning/`
- `https://robbirodhiyan.github.io/projects/integrated-hris/`
- `https://robbirodhiyan.github.io/projects/whatsapp-gateway/`
- `https://robbirodhiyan.github.io/projects/purchase-finance-reporting/`
- `https://robbirodhiyan.github.io/demo/`
- `https://robbirodhiyan.github.io/robots.txt`
- `https://robbirodhiyan.github.io/sitemap.xml`

## 3. Google Search Console

1. Tambahkan properti **URL prefix**: `https://robbirodhiyan.github.io/`.
2. Pilih verifikasi **HTML tag**.
3. Salin meta tag verifikasi dari Google.
4. Tempel ke `index.html` tepat di bawah komentar Google Search Console pada bagian `<head>`.
5. Commit dan push kembali, lalu klik **Verify**.
6. Buka menu **Sitemaps** dan kirim `sitemap.xml`.
7. Gunakan **URL Inspection** untuk homepage, halaman `/projects/`, setiap case study, dan `/demo/`, kemudian pilih **Request indexing**.

## 4. Bing Webmaster Tools

Tambahkan website ke Bing Webmaster Tools atau impor properti dari Google Search Console, lalu kirim URL sitemap yang sama:

`https://robbirodhiyan.github.io/sitemap.xml`

## 5. Perkuat sinyal publik

Gunakan URL portofolio yang sama pada:

- LinkedIn Contact Info dan Featured
- GitHub profile README
- CV PDF dan platform rekrutmen
- Signature email
- Postingan LinkedIn yang mengarah ke halaman case study tertentu

Gunakan nama konsisten: **Ahmad Robbi Rodhiyan Rifanto**.

## Catatan

Kode SEO membantu crawler menemukan dan memahami website, tetapi hasil pencarian tidak muncul seketika. Deployment, verifikasi Search Console, pengiriman sitemap, dan tautan dari profil profesional tetap perlu dilakukan setelah file dipublikasikan.
