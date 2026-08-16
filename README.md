# Work Buddy site and releases

Public repo for the [Work Buddy](https://github.com/newyork-anthonyng/work-buddy) marketing site and Mac download assets.

- **Site:** https://work-buddy.anthonyng.me
- **Download:** GitHub Releases (`.dmg` files). Do not commit binaries to git.

## Local site

```bash
npm install
npm run dev
```

Edit `src/config.js` for the download URL and support email.

## GitHub Pages

This repo deploys with GitHub Actions (`.github/workflows/pages.yml`). The workflow tries to enable Pages automatically. If deploy still 404s, set **Settings → Pages → Source** to **GitHub Actions** once, then re-run the workflow.

After the first successful deploy, **Settings → Pages → Custom domain** should already be `work-buddy.anthonyng.me` (from `public/CNAME`). Turn on **Enforce HTTPS** once DNS has verified.

## Namecheap DNS

On `anthonyng.me`, **Advanced DNS**:

| Type | Host | Value |
| --- | --- | --- |
| CNAME | `work-buddy` | `newyork-anthonyng.github.io.` |

Wait for DNS, then enable HTTPS in Pages.
