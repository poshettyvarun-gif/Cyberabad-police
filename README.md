# Hyderabad City Police — Citizen Services Portal

A rebuild of https://hyderabad-blue-pulse.lovable.app — the single-page portal for the
Hyderabad City Police Commissionerate.

## Stack

React 19 · TypeScript · Vite 6 · Tailwind CSS 4 · lucide-react · sonner

## Getting started

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:5173.

```bash
npm run build
```

Outputs a static site to `dist/`, deployable to any static host.

## Layout

| Path | Contents |
| --- | --- |
| `src/index.css` | Design tokens (`@theme`), keyframes, `surface-navy` / `tile-gradient` utilities, reveal transition |
| `src/data/site.ts` | All copy and content — nav, alerts, contacts, services, wings, gallery, news |
| `src/components/Header.tsx` | Sticky nav with hover dropdowns and a mobile drawer |
| `src/components/Hero.tsx` | Hero, rotating city-alert card, floating emblem, marquee ticker |
| `src/components/Sections.tsx` | Emergency contacts, services, wings, CP's note, gallery, news, highlights |
| `src/components/Reveal.tsx` | IntersectionObserver scroll-reveal + shared section heading |
| `src/components/Footer.tsx` | Footer columns and contact block |

Editing content means editing `src/data/site.ts` — the components read from it.

## Design system

Colours are OKLCH, defined once in `src/index.css`:

- `navy-deep` / `navy` / `azure` / `sky` / `gold` — brand ramp
- `background` / `foreground` / `card` / `muted-foreground` / `accent` / `border` — semantic roles
- `surface-navy` — the diagonal navy gradient used by the header, hero, CP section and footer
- `tile-gradient` / `tile-gradient-alt` — alternating service-tile fills

Type is Sora for display (`font-display`) and Manrope for body, loaded from Google Fonts
in `index.html`.

## Motion

`fade-up`, `line-wipe`, `float`, `marquee` and `sheen` keyframes are registered as Tailwind
`--animate-*` theme values, so they are used as `animate-float` etc. Scroll reveals are
driven by `Reveal`, which flips `data-visible` when an element enters the viewport.
All of it is disabled under `prefers-reduced-motion`.

### Signature motif — the CCTV network

`CctvMesh` ([src/components/CctvMesh.tsx](src/components/CctvMesh.tsx)) paints a sparse
field of cameras behind the hero. They blink online one by one over ~4.5s, each firing a
single expanding ring, and stitch into a mesh as links form between neighbours within
168px. Every camera carries a viewing cone that pans slowly, so the field reads as
surveillance rather than a generic particle network.

It is deliberately restrained — roughly 0.6% pixel coverage. Tunables sit at the top of
the file: `CAMERA_COUNT`, `LINK_DISTANCE`, `BOOT_MS`, `BOOT_WINDOW_MS`, `CONE_LENGTH`.

The loop stops when the hero scrolls out of view or the tab is hidden, and a resize
repositions the cameras without replaying the boot sequence. Under
`prefers-reduced-motion` it paints the settled mesh once and never animates.

### Supporting animations

| Component | Effect |
| --- | --- |
| `Hero` | Headline lines wipe up from behind a clipping edge (`line-wipe`), staggered 180ms/320ms; the rest of the column fades up on an 80→760ms ladder |
| `SplitFlap` | Hero stats riffle through glyphs and settle left to right, Solari-board style, when scrolled into view |
| `PatrolLine` | Left-edge route whose trail fills with scroll; a waypoint lights up per section and a glowing unit tracks your position |
| `Hero` emblem | Pointer tilt on a 900px perspective. It is a flat PNG, so this is the only depth available without a vector version |

`SplitFlap` renders its real value on first paint, so the number stays readable if the
observer never fires. `PatrolLine` is hidden below `lg`.

## Placeholder actions

Service tiles, wing cards, news cards and the three highlight cards are not yet wired to
real destinations. Clicking one raises a toast — "<title> — under development" — matching
the reference site. The handler is `comingSoon()` in `src/components/Sections.tsx`; replace
those `onClick`s with real routes as the pages are built.

## Assets

Images in `public/assets/` (emblem, hero skyline, Commissioner portrait, four gallery
photos) were taken from the reference site. Swap them for official originals before any
public deployment.
