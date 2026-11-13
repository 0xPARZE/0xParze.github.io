# 0xParze.github.io

This is the source for my personal website, live at **[0xparze.github.io](https://0xparze.github.io)**.
I built it with [Astro](https://astro.build) and host it on GitHub Pages.

My research is in nonlinear dynamics, so I wanted the site itself to show some. The background is
computed live in your browser on the GPU with WebGL2 and GLSL, with no libraries. Tens of thousands of
particles stream through two systems I've worked on: the prey–predator plane of the Hastings–Powell food
chain (with the top predator drifting along its own chaotic orbit), and the round-trip displacement field of
the Ikeda map (with the cavity phase slowly sweeping). The page morphs from one to the other every 40 seconds
or so and never stops moving.

If you open the legend in the bottom-left corner, you can pin either system and change its parameters with
sliders: the prey saturation and mortality of the food chain, or the input amplitude, mirror reflectivity and
phases of the Ikeda cavity. The flow responds as you drag.

## How I kept it fast

* Particle positions live in GPU buffers. A vertex shader advances them with midpoint (RK2) steps using
  transform feedback, so they never travel back to JavaScript.
* Trails are drawn into two small single-channel framebuffers that fade each frame (ping-pong), then
  composited once onto a transparent canvas in the theme colours.
* JavaScript only sets a few uniforms and issues four draw calls per frame.
* It starts once the page has loaded and the browser is idle, caps at 60 fps, limits the canvas size, halves
  the particle count if the first few seconds run slowly, and stops while the tab is hidden.
* It can be paused from the legend, and it shows a still frame if you have reduced motion turned on. Without
  WebGL2, the page simply has no background.

The section dividers are time series from the same two systems (prey, predator and top predator numbers,
and the Ikeda field's modulus, real and imaginary parts), computed when the site is built.

## Where things live

Most of the content is in **`src/data/profile.ts`**: the status line, bio, research, talks, skills,
education and contact details.

| What | Where |
|---|---|
| Page text | `src/data/profile.ts` |
| CV | `public/Rahul_Nivash_CV.pdf` |
| Slides, reports and posters | `public/docs/` |
| Colours, fonts, spacing | Tokens at the top of `src/styles/global.css` |
| The live background and its controls | `src/components/ChaosBackground.astro` |
| How strong the background is | `--bg-hero` and `--bg-section` in `src/styles/global.css` |
| Section divider traces | `src/lib/signals.ts`, placed with `<SignalRule name="…" />` in `src/pages/index.astro` |
| Social preview image | `public/og.png` (1200 × 630) |

## Running it locally

You need Node.js 22.23 or newer.

```bash
npm install
npm run dev        # http://localhost:4321, reloads on save
npm run build      # production build into dist/
npm run preview    # serve the production build
```

Every push to `main` is built and deployed to GitHub Pages by `.github/workflows/deploy.yml`.
