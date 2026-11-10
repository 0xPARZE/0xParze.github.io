# rahulnivash.github.io

Personal site for Rahul Nivash. Built with [Astro](https://astro.build) and deployed to GitHub Pages.

The page background is computed live on the visitor's GPU with WebGL2 and GLSL, with no libraries.
Tens of thousands of particles stream through the dynamics of two systems: the prey–predator plane of the
Hastings–Powell food chain (with the top predator drifting along its own chaotic orbit) and the round-trip
displacement field of the Ikeda map (with the cavity phase slowly sweeping). The page morphs between the two
every 40 seconds or so, and it never stops moving.

How it stays fast:

* Particle positions live in GPU buffers. A vertex shader advances them with midpoint (RK2) steps using
  transform feedback, so they never travel back to JavaScript.
* Trails are drawn into two small single-channel framebuffers that fade each frame (ping-pong), then
  composited once onto a transparent canvas in the theme colours.
* The JavaScript only sets a few uniforms and issues four draw calls per frame.
* It starts after the page has loaded and the browser is idle, caps at 60 fps, limits the canvas to about
  4 megapixels, halves the particle count once if the first seconds run slowly, and stops while the tab is hidden.
* Visitors can pause it from the legend in the bottom-left corner, and it shows a still frame for anyone with
  reduced motion turned on. If WebGL2 is unavailable the page simply has no background.

Section dividers are time series from the same two systems (prey, predator and top predator numbers, and the
Ikeda field's modulus, real and imaginary parts), computed when the site is built.

## Editing content

Almost everything you'd want to change is in **`src/data/profile.ts`**: the status line, bio,
research entries, talks, skills, education, and contact text. Edit it, save, and the page updates.

| To change | Edit |
|---|---|
| Any text on the page | `src/data/profile.ts` |
| Your CV | Replace `public/Rahul_Nivash_CV.pdf` (keep the file name) |
| Colours, fonts, spacing | Tokens at the top of `src/styles/global.css` |
| The live background (fields, particle count, speed, timing) | `src/components/ChaosBackground.astro` |
| How strong the background is | `--bg-hero` and `--bg-section` in `src/styles/global.css` |
| Section divider traces | `src/lib/signals.ts`, placed with `<SignalRule name="…" />` in `src/pages/index.astro` |
| Social preview image | `public/og.png` (1200 × 630) |

## Running locally

Needs Node.js 22.23 or newer.

```bash
npm install
npm run dev        # http://localhost:4321, reloads on save
npm run build      # production build into dist/
npm run preview    # serve the production build
```

## Deploying to GitHub Pages

1. Create a **public** repository on GitHub named exactly `0xParze.github.io`.
2. Push this folder to its `main` branch:
   ```bash
   git init -b main
   git add .
   git commit -m "Initial site"
   git remote add origin https://github.com/0xParze/0xParze.github.io.git
   git push -u origin main
   ```
3. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` builds and deploys on every push to `main`.
   The site goes live at `https://0xparze.github.io`.

### Using a custom domain (recommended)

1. Buy a domain such as `rahulnivash.com` or `rahulnivash.ca`.
2. Add a file `public/CNAME` containing just the domain, e.g. `rahulnivash.com`.
3. Change `site` in `astro.config.mjs` and the sitemap URL in `public/robots.txt` to the new domain.
4. Point the domain's DNS at GitHub Pages (four `A` records for the apex, or a `CNAME` for `www`),
   then enter the domain under **Settings → Pages → Custom domain** and tick **Enforce HTTPS**.
