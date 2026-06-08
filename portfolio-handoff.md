# Portfolio Handoff: ahmedrazin.me

A working handoff for picking this up in a fresh thread. Everything below reflects the current state of the code in `C:\Users\razin\ahmedrazin.me\portfolio`.

---

## 1. Current State

- **Live preview:** local only, `http://localhost:3000` (Claude Preview MCP runs `start-dev.bat`, which `cd`s into `portfolio` and runs `npm run dev`).
- **Deployment platform:** none yet. Not deployed. Target domain is `ahmedrazin.me`. Vercel is the natural fit for this Next.js setup.
- **Version control:** none detected. The `portfolio` folder is not a git repo (no branch, no remote). First task in any serious continuation: `git init`, commit, push.
- **Build:** `npm run build` passes clean. `npx tsc --noEmit` passes clean.
- **Node:** v24.16.0 (installed via winget). On a new PowerShell session, refresh PATH:
  `$env:PATH = [System.Environment]::GetEnvironmentVariable("PATH","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("PATH","User")`

---

## 2. Project Overview

A full rebuild of Ahmed Razin's UX design portfolio. The old site was static HTML/Bootstrap; this is a Next.js app.

- **Target audience:** hiring managers and design leads. Ahmed is a mid-level UX designer/researcher (5 years), healthcare/clinical systems focus. The work should read as evidence-driven, systems-minded, and honest about outcomes (including work that did not ship).
- **Design aesthetic:** editorial and warm. Cream background, near-black ink, a single terracotta accent, DM Serif Display for headings against Inter for body. Lots of whitespace, restrained motion, real artifacts over decoration.
- **Content source of truth:** Ahmed's portfolio PDF + resume, anonymized. All three case studies were written from those.

### Tech Stack
- **Framework:** Next.js `16.2.6` (App Router, Turbopack). This is a modified build. `params` is a `Promise` and must be awaited. See `AGENTS.md`: read `node_modules/next/dist/docs/` before relying on Next behavior, it differs from training data.
- **Language:** TypeScript, React `19.2.4`.
- **Styling:** Tailwind CSS v4 (config lives in `src/app/globals.css` via `@theme`, not a JS config).
- **Animation:** Framer Motion `^12.40.0` (`motion`, `useScroll`, `useTransform`, `useInView`, `useReducedMotion`, `useMotionTemplate`, `useMotionValueEvent`).
- **Forms:** none. Contact is a `mailto:` + click-to-copy, no form library, no backend.
- **Offline tooling (not part of the app):** Python with PyMuPDF + Pillow (render/compose thumbnails from PDFs), and .NET `System.Drawing` via PowerShell (image resize/compress). These generated assets in `public/`; they are not runtime dependencies.

---

## 3. Component Map (page + component state)

### Pages
- **Home** (`src/app/page.tsx`) — done. Full-bleed photo hero (`Hero.tsx`) + a "Selected Work / Case studies" heading + project card grid (`md:grid-cols-2`).
- **About** (`src/app/about/page.tsx`) — done. Bio, "My Process", skills (`processGroups`), Education (NYU Tandon), "In my spare time", and "Let's connect" (copy-email, LinkedIn, phone).
- **Case study** (`src/app/work/[slug]/page.tsx`) — done. Renders everything from `projects.ts`: outcomes-led overview, role/team/owned, status pill, process sections (body, bullets, pull quotes, stats, media, diagrams), a "Before & After" block, impact, reflection, and a magnetic "Next project" link. `generateStaticParams` builds the three slugs.
- **Contact** — there is no standalone contact page. Contact lives in the About page footer and the global footer (`layout.tsx`). If a dedicated page is wanted, it does not exist yet.
- **404 / not-found** — default Next not-found. No custom design.

### Layout + key components (all in `src/components/`)
- `Hero.tsx` — hero photo with scroll-linked zoom toward the figure, downward pan, scrim that lightens, and headline that fades on scroll. Client component.
- `Nav.tsx` — fixed nav. Transparent over the dark home hero with white text; gains a solid cream background on scroll with dark text. Animated active-link underline (shared `layoutId`), animated mobile menu. (It no longer hides on scroll.)
- `ProjectCard.tsx` — pointer-tilt 3D card. If the project has a `cover` image it shows that with a hover zoom; otherwise it renders the SVG `ProjectThumb` + mesh + cursor-follow light.
- `ProjectThumb.tsx` — bespoke per-project SVG thumbnail (fallback when no cover image).
- `SectionVisual.tsx` — library of on-brand SVG diagrams used by case-study sections (`journey`, `structure`, `fanout`, `opinion`, `reuse`, `compounding`, `silos`, `steps`, `tokens`, `platforms`, plus `old-*` "before" states for comparisons).
- `AuditMap.tsx` — the content-audit infographic for "A disconnected story": the program shown in the full site path (Homepage → Education `TRACK` → Graduate Programs `CATEGORY` → PhD Program `PROGRAM`), its breadth of official pages, and the student-voice pages nested deepest and faded with a "5 clicks deep" callout. Uniform pills, centered labels.
- `BeforeAfter.tsx` — side-by-side (or `stacked`) comparison; each panel is a real image or an SVG `SectionVisual`.
- `StatValue.tsx` — count-up animation for impact numbers; parses a single number with prefix/suffix, leaves multi-number strings static, snaps to final value for reduced motion.
- `CopyEmail.tsx` — click to copy the email, flips to "Copied" briefly.
- `Magnetic.tsx` — subtle cursor-magnet wrapper for CTAs.
- `RevealText.tsx` — clip-mask reveal for headings.
- `ScrollCue.tsx` — magnetic "Some of my projects" button that smooth-scrolls to `#projects`.
- `FadeIn.tsx` — `FadeIn` (on mount) and `FadeInOnScroll` (in-view) helpers.
- `src/app/template.tsx` — per-route enter transition, keyed by pathname (fires on every navigation, including project-to-project).

### Data
- `src/lib/projects.ts` — single source for all case-study content. Three projects:
  1. **Elevating the Student Voice** (`student-voice-system`) — status: "No production build".
  2. **Improving Provider Experience** (`ux-research-framework`).
  3. **A Design System People Trust** (`healthcare-design-library`).
- Note: slugs are unchanged from earlier titles, so URLs and image folders stay stable even though display titles changed.

### Removed / deleted (do not re-add without reason)
- `Grain`, `ScrollProgress`, `ParallaxCover`, `SmoothScroll` (Lenis), `Pinwheel` were built then removed. Lenis smooth-scroll was explicitly rejected (caused jank). The `.aurora` CSS in `globals.css` is now dead (hero no longer uses it) and can be deleted.

---

## 4. Style Guide / Design Tokens

Defined in `src/app/globals.css` under `@theme`.

| Token | Hex | Use |
|---|---|---|
| `--color-bg` | `#F8F5F0` | page background (cream) |
| `--color-surface` | `#FFFFFF` | cards |
| `--color-ink` | `#1A1714` | primary text |
| `--color-muted` | `#8A847D` | secondary text |
| `--color-border` | `#E5E0D8` | hairlines, card borders |
| `--color-accent` | `#C44B20` | terracotta accent, links, highlights |

Other recurring values: official-pill gray `#EDEDEA` / border `#DBD6CD`; caption ink `#57534D`; dark node `#34333B`.

- **Fonts:** `DM Serif Display` weight 400 (`--font-serif`, headings) + `Inter` (`--font-inter`, body). Loaded via `next/font/google` in `layout.tsx`. Infographic headings use Inter bold, not serif.
- **Dark mode:** none. The only "dark" surface is the home hero photo, which the nav adapts to.
- **Breakpoints:** Tailwind defaults (`sm` 640, `md` 768, `lg` 1024). Home grid is `md:grid-cols-2`; nav switches at `sm`.
- **Selection + scrollbar:** custom accent text selection and a thin warm scrollbar in `globals.css`.

### UI/UX rules agreed (enforce these)
- **No fabricated content.** Never invent bios, stats, quotes, or personal details. Use placeholders. (Saved in memory.)
- **Writing voice.** No AI buzzwords (delve, testament, beacon, tapestry, furthermore, moreover, revolutionize, foster, ensure, crucial, "it is important to note"). Vary sentence length, active voice, conversational. **No "it's not X, it's Y" antithesis pattern. No em dashes** (use commas, colons, periods, or parentheses). (Saved in memory.)
- **Anonymize the employer** as "an academic medical center" in copy. (The mockup images still show real UR Medicine branding, see Known Issues.)
- **Images:** full size and uncropped on case-study pages; cards crop to `4:3`. Covers are real device mockups, kept as a consistent set.
- **Respect `prefers-reduced-motion`** everywhere (already wired in the motion components and CSS).

---

## 5. Code Implementations (notable)

- **Scroll-linked hero** (`Hero.tsx`): `useScroll({ target, offset: ["start start","end start"] })` drives `scale` (1 → 2.3), `y` pan (0 → 26%), content `opacity`/`y` fade, and scrim `opacity`. `transformOrigin: "38% 30%"` aims the zoom at the figure. Disabled under reduced motion.
- **Adaptive nav** (`Nav.tsx`): `useMotionValueEvent(scrollY, ...)` sets a `scrolled` flag; `onDark = pathname === "/" && !scrolled` swaps text/logo to white over the hero. Active underline via `motion.span layoutId="nav-underline"`.
- **Count-up stats** (`StatValue.tsx`): regex-parses `prefix / number / suffix`, animates with `requestAnimationFrame` + ease-out on `useInView`.
- **SVG diagram system** (`SectionVisual.tsx`, `AuditMap.tsx`, `ProjectThumb.tsx`): all diagrams are hand-built SVG using the tokens, so they stay crisp and on-brand with no raster/AI feel. `AuditMap` uses a uniform `Pill` (centered label, `dominant-baseline: central`).
- **Section media model** (`Section` type in `projects.ts`): `images` (carded, full width), `mediaRow` (transparent, equal-height row), `mediaFull` (transparent, full width), `pullQuotes` (`{text, role, tag}`), `visual` (diagram key; `"audit"` renders `AuditMap` full-width without a card), `beforeAfter`.
- **Page transitions** (`app/template.tsx`): `motion.div key={pathname}` with a gentle rise/fade enter.
- **Image pipeline (offline):** thumbnails were composed in Python (PyMuPDF render + Pillow compose) and compressed with `System.Drawing` to ~150–290 KB. Personal photos compressed to ~170–230 KB.

---

## 6. Completed Features

- Responsive nav with dark-hero adaptation, animated underline, animated mobile menu.
- Full-bleed photographic hero with scroll zoom/pan/fade.
- Three case studies fully written and laid out (overview, process, before/after, impact, reflection, next-project).
- Real mockup covers for all three projects (consistent set).
- Per-section SVG diagrams and the bespoke content-audit map.
- Pull quotes (research section), count-up stats, magnetic CTAs, copy-to-clipboard email, clip-reveal headings, smooth-scroll cue, page transitions.
- About page rewrite; footer/contact updated (`ahmedrazinux@gmail.com`, LinkedIn `linkedin.com/in/ahmrazin`, phone); resume linked in nav (`/Ahmed_Razin_Resume.pdf`).
- Old 143 MB academic image folder deleted; assets compressed.
- Full copy pass for voice rules (no em dashes, no antithesis, no buzzwords).

---

## 7. Pending Work (immediate roadmap)

Build/confirm these next, roughly in priority order:

1. **Verify all quotes against real sources.** The research pull quotes are tight paraphrases of interview *notes* (`Learner Interviews (2).docx`), not verbatim transcripts. Replace with exact wording or confirm. Decide attribution: program/role (current) vs first names (needs consent).
2. **Replace placeholder testimonial copy.** The student perspectives in the mockups (e.g., Kassaundra, Sebastian, Amari) and the Biomedical Genetics PhD perspective are fictional samples. Swap for real, attributed quotes before launch.
3. **Fix image licensing.** The healthcare cover (and provider screenshots) carry `gettyimages` / `Unsplash+` watermarks and real UR Medicine branding. Replace stock with licensed/free images, and decide whether to blur UR branding to match the anonymized copy.
4. **Initialize git and deploy.** `git init` + push, then deploy to Vercel, wire `ahmedrazin.me`.
5. **SEO.** Per-page `title`/`description` exist; add Open Graph/Twitter images, `sitemap`, `robots`, and a favicon set.
6. **Readability of detailed visuals.** The empathy map, Airtable shot, and audit map render small in the ~600 px section column. Add a click-to-zoom lightbox or let detailed figures break out wider.
7. **Confirm the resume link.** `public/Ahmed_Razin_Resume.pdf` is publicly downloadable and includes a phone number. Confirm that is intended.
8. **Normalize cover aspect ratios** (healthcare cover is 4:3, the other two are 3:2) so the case-study covers match.
9. **Accessibility pass.** Alt text exists; check muted-text contrast, focus-visible states, and keyboard nav.
10. **Cleanup.** Remove the unused `.aurora` CSS (and `floatA`/`floatB` keyframes) from `globals.css`.

---

## 8. Known Issues / Bugs

- **Turbopack cache is sticky.** Editing `globals.css`/CSS sometimes does not hot-reload. Fix: stop the dev server, delete `.next`, restart. **Do not delete `.next` while the dev server is running**, it corrupts the Turbopack cache and returns 500s. (Stop first, then clear, then start.)
- **Aspect mismatch:** healthcare cover `4:3` vs the other two `3:2` on case-study pages.
- **Detailed SVGs/screenshots are small** inside the case-study content column; hard to read without a zoom affordance.
- **Unverified copy:** pull quotes and sample testimonials are placeholders (accuracy risk), see Pending #1–2.
- **Branding vs anonymization:** copy says "an academic medical center" but cover/screenshot images show UR Medicine, see Pending #3.
- **Dead code:** `.aurora` styles in `globals.css` are unused.
- **Tooling note (not a site bug):** the preview screenshot tool times out on pages with continuous animation (the hero), so verify those via DOM/computed-style checks instead.

---

## Quick reference

- **Run:** `npm run dev` (or the Claude Preview server) → `http://localhost:3000`
- **Build:** `npm run build` · **Typecheck:** `npx tsc --noEmit`
- **Edit content:** `src/lib/projects.ts` (case studies), `src/app/page.tsx` + `Hero.tsx` (home), `src/app/about/page.tsx` (about)
- **Edit styling:** `src/app/globals.css` (tokens) + Tailwind classes
- **Assets:** `public/projects/<slug>/`, `public/personal/`, `public/Ahmed_Razin_Resume.pdf`
