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

This repo deploys with GitHub Actions (`.github/workflows/pages.yml`).

1. Repo **Settings → Pages → Source** → **GitHub Actions**
2. Push to `main` (or run the workflow manually)
3. After the first successful deploy, **Settings → Pages → Custom domain** should already be `work-buddy.anthonyng.me` (from `public/CNAME`). Turn on **Enforce HTTPS** once DNS has verified.

## Namecheap DNS

On `anthonyng.me`, **Advanced DNS**:

| Type | Host | Value |
| --- | --- | --- |
| CNAME | `work-buddy` | `newyork-anthonyng.github.io.` |

Wait for DNS, then enable HTTPS in Pages.
