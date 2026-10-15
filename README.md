# boisemoldexperts.com

Static site, no build step. Each page is a folder containing an index.html.

## Go live on GitHub Pages
1. Create a new GitHub repo and upload EVERYTHING in this folder to the repo root (index.html must be at the top level, not inside a subfolder).
2. Repo > Settings > Pages > Source: "Deploy from a branch". Branch: main, folder: / (root). Save.
3. Custom domain: boisemoldexperts.com (already set by the CNAME file). Tick "Enforce HTTPS" once it's available.
4. At your domain registrar, set these DNS records:
   - A records for @ pointing to 185.199.108.153, 185.199.109.153, 185.199.110.153 and 185.199.111.153
   - CNAME for www pointing to <your-github-username>.github.io
5. Submit https://boisemoldexperts.com/sitemap.xml in Google Search Console.

## Changing the phone number
Find and replace across all files:
- (321) 985-3339
- +13219853339

## Draft pages (noindex, not in sitemap.xml)
- /sewage-backup-cleanup/
- /service-areas/meridian-id/sewage-backup/
- /service-areas/kuna-id/sewage-backup/
To publish one, remove its <meta name="robots" content="noindex, nofollow"> line and add its URL to sitemap.xml.
