# Lourde Matha Church, Thalayanadu — Parish Website

Premium parish website built with **React + TypeScript + Tailwind CSS v3 + Framer Motion + React Router**.

## Run it

```bash
cd ~/workspace/lourde-matha-website
npm install
npm run dev        # dev server
npm run build      # production build (tsc + vite)
```

## Pages

| Route | Page |
|---|---|
| `/` | Home — cinematic hero, welcome, mass timings, parish life, story, events, gallery preview, community, prayer intention, location, blessing |
| `/about` | About — story timeline, mission, values, leadership, community |
| `/mass-timings` | Full schedule with **today's Mass highlighted automatically** |
| `/events` | Filterable event listing (Feast / Mass / Community / Prayer / Special) with detail modal |
| `/gallery` | Filterable masonry gallery with fullscreen lightbox |
| `/contact` | Info + contact form (opens the visitor's email app addressed to the parish) + map |
| `/privacy` | Privacy policy |

## Content & photos

- All text content lives in **`src/data/site.ts`** — parish facts, Mass timings, events, gallery, story milestones.
- All photography lives in **`src/assets/images/`** and is wired through **`src/data/images.ts`**. The current photos are AI-generated placeholders. **To use real parish photos: drop the real photo into `src/assets/images/` with the same filename** and the whole site updates — no code changes needed.

## ⚠️ Confirm with the parish office before publishing

- **Parish office hours** (`PARISH.officeHours` in `src/data/site.ts`) — placeholder.
- **Saturday novena time** (5:30 PM, in `MASS_SCHEDULE`) — assumed; verify.
- **Event dates/times** (`EVENTS`) — the two patronal feasts are real annual events; other entries are samples.
- **Story timeline** (`MILESTONES`) — 1935 founding is real; later entries are editorial placeholders — expand with parish records.
- **Social media links** (footer icons) — currently `#`; wire real URLs.
- **Leadership** — only the vicar is listed; add assistant priests / trustees as needed.

## Design tokens

Deep Maroon `#4A0715` · Burgundy `#650D1B` · Royal Gold `#C9A227` · Champagne Gold `#E7C66A` ·
Ivory `#FFF8E7` · Warm Cream `#F5EBD5` · Charcoal `#222222`

Type: **Cormorant Garamond** (display serif) + **Jost** (sans) — self-hosted in `src/assets/fonts/`.
