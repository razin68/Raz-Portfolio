# Portfolio Handoff: ahmedrazin.me

A complete handoff for continuing this project in a fresh session with zero prior context. Everything reflects the current code in `C:\Users\razin\ahmedrazin.me\portfolio`.

> **Read this first, then read `AGENTS.md`.** This is a **modified Next.js 16 build**. `params` is a `Promise` and must be awaited. APIs differ from training data. Before relying on any Next behavior, read the relevant guide in `node_modules/next/dist/docs/`. (This is how we caught that v16 deprecated `priority` for `preload` and now *requires* `images.qualities`.)

---

## 1. Project Overview

### Mission
A UX portfolio for **Ahmed Razin** built to **maximize interview conversion** for **mid-to-senior product design roles**. The goal is employability, not a pretty website. Every section must move a skeptical hiring manager closer to "let's talk."

### Target audience (in priority order)
1. **UX hiring managers** — scan for outcomes, seniority signals, and whether you operate *with* cross-functional partners.
2. **Design directors / lead product designers** — look for systems thinking, constraint navigation, and judgment (e.g., killing features).
3. **Recruiters** — 30-second skim: range, scale, "healthcare-only?" filter risk.

### Core value proposition
> "UX designer and researcher with 5 years building research infrastructure, clinical design systems, and evidence-based product strategy that teams need to make good calls."

The differentiated story: **turning ambiguous, politically complex problems into design decisions organizations adopt and ship** — including a research framework that *kills* features before engineering spends a sprint.

### Design philosophy
- **Editorial and warm**, not a flashy dev portfolio. Cream paper, near-black ink, a single terracotta accent.
- **Show outcomes before process.** Restrained motion. Real artifacts over decoration.
- **Intellectual honesty reads as seniority** (e.g., "I'd be selling you a story to claim adoption numbers it never earned").
- Conversational, human writing voice (see voice rules in §4).

### Current visual aesthetic
Cream background `#F8F5F0`, ink `#1A1714`, terracotta accent `#C44B20`. DM Serif Display headings against Inter body. Generous whitespace, hairline borders, subtle gradient/mesh texture cards. No dark mode (only the home hero photo is "dark," and the nav adapts to it).

### Key strategic decisions
- **Added earlier-career case studies** (Meal Tab, Indoor Buddy, First Steps) grouped under "Earlier Work" to break the **single-employer trap** (all current work is URMC). This was the #1 audit fix.
- **Static export** (no server) so it can host anywhere, including DreamHost shared.
- **Hero = the person's own street photography** (ties to the "I notice things" personal thread).
- **A "bike" scroll-progress element was built and removed** — do not re-add without a strong reason.

### Deployment / environment
| Item | Value |
|---|---|
| **Live URL** | `https://ahmedrazin.me` (currently serving the OLD static site until first deploy of `out/`) |
| **Hosting** | DreamHost (likely shared; assume static) |
| **Deploy method** | Git → GitHub Actions → rsync `out/` over SSH (prebuilt; CI does **not** build) |
| **Repo** | GitHub (user pushed `main`); deploy needs 4 secrets (see §5 / `DEPLOY.md`) |
| **Branch** | `main` |
| **Node** | v24.16.0. New shell: `$env:PATH = [System.Environment]::GetEnvironmentVariable("PATH","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("PATH","User")` |
| **Build** | `npm run build` → emits `out/`. `npx tsc --noEmit` passes clean. |

---

## 2. Current State Audit

### Home Page (`src/app/page.tsx`)
- **Hero** (`Hero.tsx`): full-bleed street photo, scroll-linked zoom toward the figure, headline fade, scrim lightening. Headline "Hi, I'm Ahmed." + the value-prop subtitle. Responsive `<img srcset>` (1200/2000/3000px) — **not** `next/image` (static export has no optimizer).
- **Selected Work**: 3 healthcare case studies in a 2-col grid.
- **Earlier Work** ("Where the instincts started", 2018–2020): Meal Tab, Indoor Buddy, First Steps in their own grid, visually separated by a border-top + kicker.
- **Strengths:** clean, confident, real artifacts, no stock personas, now shows range beyond healthcare.
- **Weaknesses / remaining:** case study **order** still leads with Student Voice ("No production build" badge is a credibility ding per the audit — consider leading with the Research Framework). No SEO/OG/sitemap/favicon yet.

### Projects Section — per case study

All case studies are data in `src/lib/projects.ts`, rendered by `src/app/work/[slug]/page.tsx`.

| Slug | Title | Era | Status notes |
|---|---|---|---|
| `student-voice-system` | Elevating the Student Voice | current | Has a **"No production build"** status pill. Strongest artifact = the content-audit `AuditMap`. Research images now equal-height. |
| `ux-research-framework` | Improving Provider Experience | current | **Strongest case study.** Sentiment×Severity framework, color-coded scoring pull-quotes, the H3 "kill" (−21Δ). Airtable screenshot + scoring examples side-by-side. |
| `healthcare-design-library` | A Design System People Trust | current | Drift narrative (small atoms drifted, big widgets held), real old-library board, "Why It Mattered" cost cards (horizontal), "The Approach" flow with ownership tags, "Moving the Team Forward" = the annotated CTA-doc breakdown (transparent). |
| `meal-tab` | Meal Tab | earlier | Startup app. Best beat: in-store test failed → reframed to remote Maze study. Transparent device PNGs; cover uses `coverContain`. |
| `indoor-buddy` | Indoor Buddy Website | earlier | Marketing-site rebuild, conversion metrics (400% emails, +24% demos), front-end build. |
| `first-steps` | First Steps | earlier | UX-class task app. Full imagery: interviews, competitor table, personas, sketches, diary study doc, wireframes, user testing. |

**Per-study narrative structure** (the `Section[]` model): each section = `title` + optional `goal` + `body` + one or more of: `bullets`, `quotes`, `stats`, `pullQuotes`, `cards`, `flow`, `hypotheses`, `reframes`, `learnings`, `widgetGrid`, `images`/`mediaRow`/`mediaFull`, `wideImage`, `visual`, `beforeAfter`.

**Missing pieces / hiring-manager concerns (from the audit):**
- Research Framework should be **listed first**; the H3 kill should be a **full sub-section** (who approved it, sprint cost, how you presented −21).
- PM/Eng are listed in team rosters but **disappear from narratives** — add cross-functional tension/managing-up.
- Student Voice lacks **constraint navigation** (what got cut, CMS limits) and quantified projected impact.
- Healthcare metric counters historically rendered as "0"/"<0 mo" in static snapshots — see §9.

### About Page (`src/app/about/page.tsx`)
- Warm first-person intro beside a portrait photo, "My Process," a 5-group skills grid (`processGroups`), Education (NYU Tandon), "In my spare time" (bike photo + B&W cafe photo), "Through my lens" (photography gallery), "Let's connect."
- **Branding approach:** professional substance + genuine personality (cycling, street photography). The "I notice things" thread links hobbies to UX observation. Balance is good.

### Contact
- No standalone contact page. Contact lives in the About footer and the global footer (`layout.tsx`): copy-email (`CopyEmail`), LinkedIn, phone. **No form, no backend** (intentional for a static site). Remaining: none required; a dedicated page is optional.

---

## 3. Component Map

All components in `src/components/`. Render-config types live in `src/lib/projects.ts`.

| Component | Purpose | Status | Deps | Reusable | Known issues |
|---|---|---|---|---|---|
| `Nav.tsx` | Fixed nav; transparent over dark hero → solid cream on scroll; animated underline (`layoutId`), mobile menu. Resume links to `/resume`. | ✅ | framer-motion | site-wide | none |
| `Hero.tsx` | Home hero; scroll zoom/pan/fade; responsive `<img srcset>`. | ✅ | framer-motion | home only | screenshots time out on it (continuous anim) |
| `ProjectCard.tsx` | Pointer-tilt 3D card; cover (object-cover, or `object-contain`+gradient when `coverContain`); hover "View case study" pill (translucent cream + blur). | ✅ | framer-motion, ProjectThumb | home | none |
| `ProjectThumb.tsx` | Bespoke per-project SVG fallback thumbnail (only if no `cover`). | ✅ | — | yes | — |
| `SectionVisual.tsx` | Library of on-brand SVG diagrams: `journey, structure, fanout, opinion, reuse, compounding, silos, steps, tokens, platforms, direction, decision, cascade, drift`, plus `old-*` before-states. | ✅ | — | yes | several variants now unused (drift, cascade, direction, decision) |
| `AuditMap.tsx` | Content-audit infographic for Student Voice ("5 clicks deep"). | ✅ | — | no | — |
| `BeforeAfter.tsx` | Side-by-side / stacked image-or-SVG comparison. | ✅ | SectionVisual | yes | panels may still use white bg |
| `StatValue.tsx` | Count-up for stat numbers; parses prefix/number/suffix; snaps for reduced motion. | ✅ | framer-motion | yes | **SSR renders 0** until in-view JS runs (audit flagged "0" counters) |
| `CopyEmail.tsx` | Click-to-copy email → "Copied". | ✅ | — | yes | — |
| `Magnetic.tsx` | Cursor-magnet wrapper for CTAs. | ✅ | framer-motion | yes | — |
| `RevealText.tsx` | Clip-mask reveal for headings. | ✅ | framer-motion | yes | — |
| `ScrollCue.tsx` | Magnetic scroll-to-projects button. | ✅ | framer-motion | home | — |
| `FadeIn.tsx` | `FadeIn` (on mount) + `FadeInOnScroll` (in-view). Content starts at opacity 0 → **blank until JS runs** (e.g. `file://`). | ✅ | framer-motion | site-wide | see §9 |
| `app/work/[slug]/page.tsx` | The case-study renderer (the big one). Cover, overview, all section variants, impact, reflection, next-project. | ✅ | most components | — | long file; the section-render conditional chain is intricate |
| `app/resume/page.tsx` | Full digital resume (not just a PDF link) with Download buttons top + bottom. | ✅ | CopyEmail | — | — |
| `app/template.tsx` | Per-route enter transition keyed by pathname. | ✅ | framer-motion | — | — |
| Footer (in `layout.tsx`) | Name + copy-email + LinkedIn. | ✅ | CopyEmail | — | — |

**No Contact Form / Grid component / Timeline component exist** (not needed for a static editorial site).

---

## 4. Style Guide Assets

Defined in `src/app/globals.css` under Tailwind v4 `@theme` (config is in CSS, not a JS file).

### Colors
| Token | Hex | Use |
|---|---|---|
| `--color-bg` | `#F8F5F0` | page background (cream) |
| `--color-surface` | `#FFFFFF` | cards |
| `--color-ink` | `#1A1714` | primary text |
| `--color-muted` | `#8A847D` | secondary text |
| `--color-border` | `#E5E0D8` | hairlines, borders |
| `--color-accent` | `#C44B20` | terracotta accent, links, highlights |
| accent hover | `#a83d19` | button hover |
| caption ink | `#57534D` | sub-bullets |
| semantic green / red | `#2E7D4F` / `#C0392B` | scoring tone (positive/negative); "Shipped"/"Killed" pills |
| neutral grey (semantic) | `#8A847D` | scoring tone (neutral) |
| earlier-era pill bg | `#EDE7DD` | "Earlier work" tag |

### Typography
- **Headings:** `DM Serif Display` 400 (`--font-serif`) via `next/font/google`.
- **Body:** `Inter` (`--font-inter`). **Infographic labels use Inter, not serif.**
- Heading scale: hero `clamp(2.8rem,7vw,6.5rem)`; case-study H1 `clamp(2.5rem,6vw,5rem)`; section H2 `text-3xl/4xl`; section titles (H3) `text-2xl`; sub-headings (H4) `text-lg/xl`.
- Body `text-base` / `text-lg`; captions `text-sm`; kickers `text-xs tracking-widest uppercase text-muted`.

### Layout rules
- Containers: case-study content `max-w-4xl`; cover & sections align to it; home grid `max-w-6xl`; nav/footer `max-w-6xl`; about/resume `max-w-3xl`.
- Full-bleed pattern (used by `wideImage`, hypotheses, the removed bike): `w-screen ml-[calc(50%-50vw)]` inside a viewport-centered container; needs `overflow-x-clip` on a full-width ancestor if a vertical scrollbar would cause 100vw overflow.
- Breakpoints: Tailwind defaults (`sm` 640, `md` 768, `lg` 1024). Home/cards `md:grid-cols-2`; nav switches at `sm`.
- **Section vertical rhythm:** the process-sections container is `flex flex-col gap-36` (**144px**, consistent across all case studies — do not special-case).
- Covers: `aspect-[3/2]` `object-cover` (or `object-contain` + gradient fill + padding when `coverContain`).
- Respect `prefers-reduced-motion` everywhere.

### UI/UX principles (enforce these)
- **No fabricated content.** Never invent bios, stats, quotes, personal details. Use placeholders. (Saved in user memory.)
- **Writing voice:** active, conversational, varied sentence length. **Ban AI buzzwords** (delve, testament, beacon, tapestry, furthermore, moreover, revolutionize, foster, ensure, crucial, "it is important to note"). **No "it's not X, it's Y" antithesis. No em dashes** (use commas/colons/periods/parentheses). (Saved in user memory.)
- Anonymize the employer as "an academic medical center" in copy.
- Clarity over decoration; hiring managers scan before they read; show outcomes before process; every section earns its existence.

---

## 5. Technical Architecture

### Tech stack
- **Framework:** modified **Next.js 16.2.6** (App Router, Turbopack), **React 19.2.4**. `params` is a `Promise`.
- **Output:** `output: "export"` + `trailingSlash: true` + `images.unoptimized: true` (`next.config.ts`). Static HTML in `out/`.
- **Styling:** Tailwind CSS v4 (`@theme` in `globals.css`).
- **Animation:** Framer Motion `^12.40.0`.
- **Forms:** none.
- **Offline tooling (not runtime):** PowerShell `System.Drawing` for image resize/recompress/rotate (used throughout to keep images small); no `magick`/`cwebp`/`pngquant` available.

### File structure (important paths)
```
portfolio/
  next.config.ts            # output:export, trailingSlash, images.unoptimized
  DEPLOY.md                 # one-time DreamHost deploy setup
  .github/workflows/deploy.yml   # rsync prebuilt out/ over SSH (no build in CI)
  out/                      # COMMITTED build artifact (CI deploys this)
  .case-content/            # extracted text of old-site case studies (source for earlier work)
  src/
    app/
      layout.tsx            # Nav + footer + fonts
      page.tsx              # home (current + Earlier Work groups)
      about/page.tsx
      resume/page.tsx
      work/[slug]/page.tsx  # the case-study renderer (large)
      template.tsx          # route transition
      globals.css           # @theme tokens, mesh/grain, scrollbar
    components/             # see §3
    lib/projects.ts         # ALL case-study content + the Section/Project types
  public/
    personal/               # shadow-seaport-{1200,2000,3000}.jpg, about-portrait, about-cafe, bike-colorado, photography-gallery
    projects/<slug>/        # per-study images (optimized)
    Ahmed_Razin_Resume.pdf
```
Originals for earlier-work imagery live **outside** the repo at `C:\Users\razin\ahmedrazin.me\` (`Meal Tab/`, `IndoorBuddy/`, `First Steps/`, `img/`, `Meshall.jpg`, etc.). The 4001×5001 hero master is `img/Shadow Seaport.jpg`.

### Notable code implementations
- **Static-export image strategy:** no optimizer, so the hero uses a hand-built `srcset`; case-study images are pre-resized (max ~1400–1800px) and opaque screenshots are JPG, transparent mockups stay PNG.
- **`Section` render conditional chain** in `work/[slug]/page.tsx` decides what visual a section shows (beforeAfter → media/images → audit → visual → else `null`). **The empty gradient placeholder was removed** (text-only sections render cleanly).
- **Per-section flags** added over time: `statsTop`, `cardsHorizontal`, `wideImageTransparent`, `pullQuotesLabel`, `mediaRowEqualHeight`, plus project-level `era`, `coverContain`.
- **`mediaRow`**: default = 2-col grid (`w-full h-auto`); `mediaRowEqualHeight: true` = flex row at `sm:h-[22rem]` `object-contain` (equal heights for mismatched aspect ratios, e.g. Student Voice flow + Google).
- **`StatValue`**: regex `prefix/number/suffix`, `requestAnimationFrame` ease-out on `useInView`.
- **Scoring pull-quotes**: `pullQuotes[].tone` ∈ positive|neutral|negative → color-coded big tag + left border (green/grey/red).

### Deploy (DreamHost)
1. Create GitHub repo, `git push -u origin main`.
2. `ssh-keygen -t ed25519 -f deploy_key -N ""`; public key → DreamHost user `~/.ssh/authorized_keys`; private key → secret.
3. Repo secrets: `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_PATH` (`/home/<user>/ahmedrazin.me/`, trailing slash), `DEPLOY_SSH_KEY`.
4. Workflow rsyncs `out/` with `--delete` on push (or manual upload via FileZilla). Enable Let's Encrypt HTTPS in panel.
- **Update flow:** `npm run build` → `git add -A && commit && push`. `out/` is intentionally committed because the modified Next likely can't reinstall on a clean CI runner.

---

## 6. Design Strategy Decisions

- **Layouts chosen for scannability:** outcomes lead the overview; section visuals carry the argument; full-bleed for the highest-value artifacts (Airtable, old-library board).
- **Interactions rejected:** Lenis smooth-scroll (jank), a scroll-progress **bike** (cute but distracting — removed), `ScrollProgress`/`Grain`/`ParallaxCover`/`Pinwheel` (built then removed). Keep motion restrained.
- **Positioning:** lead with evidence and judgment; be honest about what didn't ship; show range (healthcare + startup + academic) to beat the "healthcare-only" recruiter filter.
- **Recruiter psychology:** 30-second skim must show outcomes, scale (1.2M patients, 275% lift), and that you work *with* PM/Eng. First impression: confident hero line + distinct, real thumbnails.
- **Repeated principle:** generated SVG diagrams are fine for *concepts*, but **real artifacts beat generated ones** — the user repeatedly preferred real screenshots (we removed several generated diagrams in favor of real images).

---

## 7. Completed Features

### Finished ✅
- Static export pipeline + committed `out/` + GitHub Actions deploy workflow + `DEPLOY.md`.
- Responsive nav (dark-hero adaptation, animated underline, mobile menu) and footer.
- Home: hero (responsive srcset, scroll zoom/fade), Selected Work + Earlier Work groups, tilt cards with legible hover CTA.
- **6 full case studies** (3 healthcare + 3 earlier), each with covers, sectioned narratives, stats, quotes, reflections; all images present and optimized (no broken links).
- Rich section component system (cards, horizontal cards, flow with ownership tags, hypotheses, reframes, learnings, scoring pull-quotes, wide/transparent images, equal-height media rows).
- About page with personal photos + photography gallery.
- **Digital resume page** (`/resume`) with top + bottom Download PDF.
- Image optimization pass (site `out/` ~14MB; hero multi-size; orphans deleted).
- Full copy in the agreed voice (no em dashes, no buzzwords, no antithesis).

### Mostly finished 🔶
- **Earlier-work case studies** — content + imagery complete; could deepen "constraint/decision" beats.
- **Deploy** — pipeline ready; **awaiting the user to add DreamHost secrets / first publish**.

---

## 8. Pending Work (prioritized backlog)

### Critical
- [ ] **First live deploy.** Add the 4 GitHub secrets + deploy key (or FileZilla-upload `out/`), enable HTTPS. Nothing is public yet.
- [ ] **Fix `StatValue` SSR.** It renders `0` in static HTML until JS runs → audit saw "0 components" / "<0 mo". Make it server-render the final value (animate from it on view, or render final + animate optionally). High credibility risk.
- [ ] **Image licensing / branding.** Some healthcare covers/mockups may still carry Getty/Unsplash watermarks and real **UR Medicine** branding (conflicts with "academic medical center" anonymization). Replace/blur before promoting widely.

### High
- [ ] **Reorder case studies** so **Research Framework leads**; consider dropping/softening the "No production build" badge on the home card.
- [ ] **Expand the H3 "kill" story** into its own sub-section (approver, sprint cost, how the −21 was presented).
- [ ] **Surface PM/Eng collaboration** in narratives (managing up, scope pushback, dev constraints that shaped decisions).
- [ ] **SEO:** per-page OG/Twitter images, `sitemap.xml`, `robots.txt`, favicon set. (Per-page `title`/`description` already exist.)

### Medium
- [ ] **Accessibility pass:** muted-text contrast, `focus-visible`, keyboard nav, alt-text review.
- [ ] **Quantify Student Voice impact** (projected editorial savings from the single-entry content model) and add a **constraint-navigation** beat.
- [ ] **Lightbox / click-to-zoom** for dense figures (audit board, Airtable, doc breakdown) that read small.

### Low
- [ ] Remove unused `SectionVisual` variants (`drift`, `cascade`, `direction`, `decision`) and any orphaned public assets.
- [ ] Analytics (privacy-friendly).
- [ ] Consider a 404 design.

---

## 9. Known Bugs & Technical Debt

| Item | Severity | Description | Suggested fix |
|---|---|---|---|
| **Count-up stats SSR as 0** | High | `StatValue` starts at 0; static HTML / slow load / snapshots show "0" or "<0 mo". | Render the parsed final value server-side; animate from it only client-side. |
| **Build-while-dev corrupts cache** | Med (dev only) | Running `npm run build` while the Turbopack dev server runs corrupts `.next` → routes 500 / preview wedges. | **Stop dev → `npm run build` → `rm -rf .next` → start dev.** Never delete `.next` while running. |
| **Preview screenshots time out** | Low (tooling) | The animated hero and tilt cards time out the screenshot tool; preview tab sometimes won't navigate to inner routes. | Verify via DOM/`fetch` of server HTML and computed styles instead of screenshots. |
| **`file://` blank page** | N/A (expected) | Opening `out/index.html` directly is blank (root-absolute `/_next` paths + opacity-0-until-JS). | Serve over HTTP (`python -m http.server` in `out/`) or just deploy. |
| **100vw full-bleed overflow** | Low | Full-bleed blocks can add a few px horizontal scroll when a scrollbar exists. | `overflow-x-clip` on the relevant full-width ancestor (already applied where needed). |
| **Anonymization vs branding** | Med | Copy says "academic medical center"; some images show UR Medicine. | Replace/blur branding in images. |
| **Unverified quotes** | Med | Research pull-quotes / earlier-study testimonials are paraphrases. | Confirm wording / attribution before wide distribution. |
| **CRLF warnings on commit** | Cosmetic | Git warns LF→CRLF on Windows. | Harmless; optional `.gitattributes`. |

---

## 10. UX Hiring Manager Perspective

**A cynical hiring manager's first read:** Clean, confident, real artifacts (good signs). Previously two red flags — **single employer** and **leading with unshipped work** — the first is now fixed (Earlier Work added); the second is partially open (Student Voice still first + "No production build" badge).

**Recruiter in 30 seconds:** sees a sharp value line, distinct healthcare thumbnails *and* startup range, real metrics (275%, 400%, +24%). Range objection is largely answered.

**Biggest strengths:** the Research Framework (Sentiment×Severity, the H3 kill = genuine senior signal), intellectual honesty in the writing, restraint in the visuals, real photography/personality.

**Biggest weaknesses / risks:** broken-looking "0" counters (fix immediately), invisible PM/Eng collaboration, strongest case study buried in the middle, lingering stock/branding in images.

**Highest-ROI improvements:** (1) fix the counters, (2) lead with the Research Framework + write the kill as a full story, (3) deploy + SEO so it's findable. These are days of work, not weeks.

---

## 11. Immediate Roadmap (do in this order)

1. **Fix `StatValue` SSR so numbers never show 0.**
   - *Objective:* render the final number in static HTML, animate from it only on the client.
   - *Why:* "0 components"/"<0 mo" actively destroys credibility on first load/snapshots.
   - *Output:* `StatValue.tsx` SSR-correct; rebuild `out/`; verify in the static HTML.
2. **Reorder case studies (Research Framework first) and soften the "No production build" badge.**
   - *Objective:* lead with the strongest, most defensible work.
   - *Why:* recruiters judge by the first card; don't open with unshipped.
   - *Output:* updated `projects.ts` order / home card; verify thumbnails.
3. **Expand the H3 kill into its own sub-section + thread PM/Eng through narratives.**
   - *Objective:* show judgment and cross-functional reality (managing up, scope pushback).
   - *Why:* this is the single best interview story and the clearest seniority signal.
   - *Output:* new/expanded sections in `ux-research-framework` (and light PM/Eng beats elsewhere).
4. **Ship it: deploy + SEO.**
   - *Objective:* publish to DreamHost; add OG images, sitemap, robots, favicon.
   - *Why:* a portfolio that isn't live or findable converts no one.
   - *Output:* live `ahmedrazin.me` on the new site; SEO assets in `out/`.

---

## 12. AI Collaboration Notes

- **Read `AGENTS.md` and the Next docs in `node_modules/next/dist/docs/` before any Next-specific code.** This build differs from training data (`params` is a Promise; v16 deprecated `priority`→`preload`; `images.qualities` required when optimizing).
- **Optimize for employability over artistic experimentation.** Think like a senior UX hiring manager; challenge weak decisions; cut anything that doesn't earn its place.
- **Preserve the design philosophy and tokens.** Reuse existing components and the established section model; **build incrementally, do not redesign**.
- **Honor the writing rules** (no buzzwords, no em dashes, no "not X but Y", vary sentence length) and **never fabricate content** — leave placeholders.
- **Prefer real artifacts over generated diagrams** (the user repeatedly chose real screenshots).
- **Workflow discipline:** `npx tsc --noEmit` after edits. To rebuild: **stop the preview dev server, `npm run build`, `rm -rf .next`, restart** (building while dev runs corrupts the cache). Verify via server-rendered HTML/`fetch` when screenshots time out. Rebuild `out/` and commit before handing back (CI deploys the committed `out/`).
- **Don't re-add removed elements** (bike, Lenis, scroll-progress, grain) without a clear reason.
- All case-study content lives in `src/lib/projects.ts`; the renderer is `src/app/work/[slug]/page.tsx`. Most changes are data edits plus the occasional per-section flag + a small render branch.

---

## Quick reference
- **Run:** `npm run dev` → `http://localhost:3000` · **Preview built site:** `cd out && python -m http.server 8080`
- **Build:** `npm run build` (emits `out/`) · **Typecheck:** `npx tsc --noEmit`
- **Edit content:** `src/lib/projects.ts` (case studies), `src/app/page.tsx` + `Hero.tsx` (home), `src/app/about/page.tsx`, `src/app/resume/page.tsx`
- **Edit styling:** `src/app/globals.css` (tokens) + Tailwind classes
- **Deploy:** see `DEPLOY.md` (push → GitHub Action rsyncs `out/`), or FileZilla-upload `out/` contents to the DreamHost web root
- **Assets:** `public/projects/<slug>/`, `public/personal/`, `public/Ahmed_Razin_Resume.pdf`; earlier-work originals in `C:\Users\razin\ahmedrazin.me\{Meal Tab,IndoorBuddy,First Steps,img}\`
