# Portfolio Handoff — ahmedrazin.me

Current as of June 2026. This supersedes the older `portfolio-handoff.md`. Read this top to bottom before editing; it captures the gotchas that will otherwise cost you an afternoon.

---

## 0. What this is

A static UX portfolio for Ahmed Razin, built with a **modified Next.js 16** (App Router) and exported to plain HTML in `out/`. Hosted on DreamHost. Editorial visual identity: cream `#F8F5F0`, ink `#1A1714`, terracotta accent `#C44B20`, DM Serif Display headings over Inter body. Five case studies (3 healthcare at URMC + 2 earlier startup projects), plus Home, About, Resume, and a 404.

---

## 1. Continue on a new laptop (do this, not a FileZilla download)

The deployed website (`out/`) is **build output only** — you cannot develop from it. The editable source is on GitHub.

```bash
# 1. Clone the source
git clone https://github.com/razin68/Raz-Portfolio.git
cd Raz-Portfolio        # repo root contains package.json, src/, etc.

# 2. Install Node 20+ (this machine used v24.16.0, npm 11.13.0)
#    https://nodejs.org  — any recent LTS works

# 3. Install dependencies
npm install

# 4. Run the dev server
npm run dev             # http://localhost:3000
```

If `npm install` misbehaves on the modified Next build, delete `node_modules` and `package-lock.json` is committed, so `npm ci` is the safest reinstall.

---

## 2. Critical gotchas (read before building)

1. **This is NOT stock Next.js.** See `AGENTS.md`. APIs differ from training data and from public docs. `params` is a `Promise` and must be awaited. Before writing Next-specific code, read the relevant guide in `node_modules/next/dist/docs/`.
2. **Never run `npm run build` while the dev server is running.** It corrupts `.next` and the dev server starts throwing 500s. Stop dev first.
3. **Always wipe `out/` and `.next` before a production build:**
   ```bash
   rm -rf out .next && npm run build
   ```
   Tailwind v4 scans existing files; a stale `out/` makes it regenerate dead CSS for old classes. Wiping first keeps the stylesheet lean.
4. **After editing images, regenerate the dimension map** (see §10) or layout-shift protection goes stale.
5. **The resume PDF is a separate binary** (`public/Ahmed_Razin_Resume.pdf`). Editing the Resume *page* does not change the downloadable PDF. Keep them in sync by hand.

---

## 3. Project structure

```
Raz-Portfolio/
  next.config.ts            # output:"export", trailingSlash:true, images.unoptimized
  AGENTS.md / CLAUDE.md     # "this is a modified Next" warning
  DEPLOY.md                 # DreamHost deploy setup
  HANDOFF.md                # this file
  .claude/launch.json       # preview/dev launch config (cwd pinned to project)
  src/
    app/
      layout.tsx            # root metadata, OG/Twitter, JSON-LD Person, theme-color,
                            #   skip-link, footer, BackToTop
      page.tsx              # Home (hero + Selected Work + Earlier Work)
      about/page.tsx
      resume/page.tsx
      work/[slug]/page.tsx  # the case-study renderer (the big one)
      not-found.tsx         # custom 404
      sitemap.ts            # generates /sitemap.xml  (needs `dynamic="force-static"`)
      robots.ts             # generates /robots.txt   (needs `dynamic="force-static"`)
      icon... / favicon.ico # favicon.ico is the real one; apple-icon.png for iOS
      globals.css           # @theme tokens, mesh/grain, focus-visible ring
    components/             # Nav, Hero, ProjectCard, BeforeAfter, StatValue,
                            #   Zoomable (lightbox), BackToTop, FadeIn, etc.
    lib/
      projects.ts           # ALL case-study content + the Project/Section types
      imageMeta.ts          # AUTO-GENERATED image dimensions (do not hand-edit)
  public/
    projects/<slug>/...     # case-study images
    personal/...            # hero photo, portraits, gallery
    og.png                  # 1200x630 social share card
    Ahmed_Razin_Resume.pdf
  out/                      # build output (git-ignored or committed; this is what deploys)
```

---

## 4. Build & deploy (FileZilla → DreamHost)

```bash
# stop the dev server first, then:
rm -rf out .next && npm run build   # emits out/
npx tsc --noEmit                    # optional: typecheck
```

Then upload via FileZilla:

- Upload the **contents of `out/`** (not the `out` folder itself) into the DreamHost web root, so `index.html` sits at the root.
- Include root assets: `sitemap.xml`, `robots.txt`, `favicon.ico`, `apple-icon.png`, `og.png`, `404.html`, plus `_next/`, `work/`, `about/`, `resume/`, `personal/`, `projects/`.
- **Overwrite on conflict**, and delete remote files that no longer exist locally (FileZilla won't auto-delete). Routing is trailing-slash, so each page is a folder with its own `index.html`.
- After upload, hard-refresh and spot-check a case study plus `/sitemap.xml` and `/robots.txt`.

`DEPLOY.md` documents an optional GitHub Actions → rsync path if you'd rather automate it.

---

## 5. Editing content (where things live)

- **Case-study text and metrics:** `src/lib/projects.ts`. Each project is one object: `problem`, `solution`, `outcomes`, `sections[]` (each with `title`, `goal`, `body`, and optional `stats`, `cards`, `flow`, `hypotheses`, `reframes`, `learnings`, `pullQuotes`, `mediaRow`/`mediaFull`/`images`/`wideImage`, `beforeAfter`), `impactBody`, `impactStats`, `reflection[]`.
- **Display order** of case studies: the `displayOrder` array at the bottom of `projects.ts` (not the raw array order). Home grid and "next project" both follow it.
- **Home hero / Selected & Earlier Work copy:** `src/app/page.tsx` and `src/components/Hero.tsx`.
- **About / Resume:** `src/app/about/page.tsx`, `src/app/resume/page.tsx`.
- **Colors / tokens:** `src/app/globals.css` (`@theme`). Note: most components use literal hex (e.g. `text-[#736E67]`) rather than the token, so a global color change is a find/replace across `src`.
- **SEO / social:** root metadata in `src/app/layout.tsx`; share image is `public/og.png` (regenerate with the script that drew it if the tagline changes).

---

## 6. Writing style rules (the voice — keep these)

All site copy follows these. Metrics, quotes, and claims are **never invented or altered for style** — restructure sentences, never the facts.

**Hard bans:** AI buzzwords (delve, testament, furthermore, moreover, revolutionize, foster, ensure, crucial, "it is important to note"); the "it's not X, it's Y" antithesis; **em dashes** (use commas/colons/periods/parentheses/semicolons); passive voice as default.

**Variation rules:**
1. Vary sentence length; avoid two consecutive sentences in the same bucket (short ≤8 / medium 9–20 / long 21+). Break the "long setup → 2-word punch → medium explanation" template.
2. Ration the punch fragment ("It worked." "Shipped.") to ~one per case study.
3. ≤1 sentence per paragraph starts with "I". Lead from varied angles.
4. Retire "Here's…" as an opener.
5. ≤1 sentence per section opens with So/And/But.
6. Dramatic colon: ≤1 per section.
7. Use because/while/after/which and the occasional semicolon, not the same comma-splice everywhere.
8. Twin-parallel sentences ("Write it once. Reuse it anywhere.") ≤1 per case study.
9. Rhetorical questions: ≤1 across the whole site.
10. Vary paragraph shape — not every section is "paragraph + bullet list."
11. Use all four sentence types; subordinated sentences ≥ comma-spliced ones.
12. Mix loose and periodic construction (occasionally hold the main clause to the end).
13. Vary branching: open with a participial phrase, a temporal marker, or a prepositional phrase, not always subject-verb.
14. No two sentences within a section begin with the same word (watch The, I, It, Every, That, So).
15. Kill cleft tics ("That's what lets it scale," "It was X that Y") — ≤1 per case study.
16. Widen transitions past So/But/And/Here's; a hard cut can be best.
17. **Ration tricolons (rule-of-three lists)** — ≤1 per case study; elsewhere use two or four items, or dissolve into a sentence.
18. **Prefer verbs to nominalizations** — "we aligned," not "drove alignment."
19. Verb diversity — no signature verb (built, ran, drove, shipped, turned) twice in one section.
20. Cut filler (actually, really, just, simply, very) and "kept [verb]ing."
21. Don't repeat a load-bearing noun within ~20 words; use a pronoun or synonym.
22. Vary paragraph length and topic-sentence placement.
23. Stagger section entry points (number / tension / scene / stakeholder / action) — never the same move twice in a row.
24. Give each case study its own texture inside the one voice: research framework = precise/analytical; design system = measured/structural; Student Voice = reflective; Meal Tab = scrappy/fast; Indoor Buddy = practical/direct.

**Guardrail:** these are ear-guided targets, not mechanical quotas. The real test is read-aloud — each paragraph should sound different from the one before it.

---

## 7. Metrics reference (what's claimed, and the provenance)

Keep these consistent across the site **and** the resume PDF. Measured vs estimated matters in interviews.

| Metric | Where | Status |
|---|---|---|
| Net sentiment −2 → +15, a 17-point gain (H1) | Research framework | Measured (Sentiment × Severity scoring, 6 interviews). **Not** "275%" — that was invalid math and was removed. |
| Filter engagement +10.3%, profile clicks +5.9% (H2) | Research framework | Measured (Looker Studio) |
| −21 score, feature killed before a sprint (H3) | Research framework | Measured |
| 268 observations, 11 participants, 3 audiences, 27-code taxonomy | Research framework | Measured |
| 658K provider-profile views / quarter, 65.8% engagement (NY State) | Research framework impact | Measured (Looker dashboards) |
| 70 components, all in production | Design system | Measured |
| 40–50% fewer design-doc review comments | Design system | Measured (Figma comment threads + meeting hours) |
| ~one-third faster design-to-build handoff | Design system | **Estimate** (labeled as such) |
| 1.2M patients, 30,000-person system, <3 mo delivery | Design system | Stated |
| 18 documented widgets (4 student-voice) | Student Voice | Stated |
| 60–80 editorial hours/cycle saved | Student Voice | **Projection** (never shipped; labeled) |
| Killed by Kentico→Drupal CMS migration | Student Voice | Stated |
| 100 interviews (30 personally conducted), 79% valuable, 66% would switch, 77% easy, 50 Maze users | Meal Tab | Stated. 66% (not 71%) matches Indoor Buddy. |
| 400% more info emails, +24% demo conversion | Indoor Buddy | Stated |

Employer is named (University of Rochester Medical Center / URMC), so UR Medicine branding in screenshots is fine.

---

## 8. What changed this session (changelog)

- Reordered case studies (Research Framework leads); removed the weakest (First Steps).
- Fixed `StatValue` SSR so static HTML shows real numbers, never "0".
- Relabeled the bogus "275% comprehension" to the honest "−2 → +15, 17-point gain"; reconciled all cross-study metric inconsistencies (66% switch, 18/4 widgets, H2 numbers).
- Added real scale data, design-system adoption/velocity, named the employer.
- Mobile/tablet pass: reduced spacing, `100svh` hero, `Zoomable` lightbox for dense artifacts, verdict-first hypotheses, back-to-top, bigger touch targets.
- Layout-shift fix: intrinsic image dimensions (`src/lib/imageMeta.ts`) on every content image.
- SEO: `sitemap.xml`, `robots.txt`, real `favicon.ico`, `apple-icon.png`, Open Graph + Twitter cards (`og.png`), JSON-LD Person, theme-color.
- Accessibility: WCAG-AA muted text (`#736E67`), skip-to-content link, focus-visible rings.
- Recompressed heaviest JPGs (~2 MB saved).
- Full copy rewrite for sentence-structure variation (rules in §6), facts untouched.

### Later in the session
- Homepage: removed the "Selected Work"/"Earlier Work" eyebrow kickers; renamed the headings to **Selected work** and **Earlier work**; scroll cue is one centered horizontal row (text + arrow).
- Case-study **titles** are now descriptive (what + how/result, e.g. "A design system people trust, fully adopted"); card **taglines** rewritten to add non-repetitive supporting context.
- **Section headings rewritten so the headings alone tell each case study's story** — specific, non-generic, in order. If you edit a heading, keep that read-the-headings-only narrative intact.
- Case-study **load order**: the title reveals first, then the cover image (`FadeIn` delays in `work/[slug]/page.tsx`).
- **Eyebrow cleanup**: removed the "Project Overview" kicker and the per-section "Goal" kicker (goal text now reads as a plain subtitle). Kept the functional overview field labels (Outcomes, The Problem, My Role, etc.) on purpose — removing them would leave unlabeled walls of text.
- **Fun/engaging micro-interactions** (all reduced-motion safe): a warm-gold cursor spotlight on the hero (`Hero.tsx`, 240px radius, `rgba(235,195,110,0.30)`), a springy copy-email confirmation (`CopyEmail.tsx`), springy terracotta nav underlines (`Nav.tsx`), a rotating "Currently…" line in the footer (`RotatingLine.tsx`), a terracotta hover sweep on project cards (`ProjectCard.tsx`), and snappier expo-out scroll reveals (`FadeIn.tsx`).
- Hero positioning statement was experimented with, then **reverted to the original** ("…5 years building research infrastructure, clinical design systems, and evidence-based product strategy.").
- Fixed the H1/H2 hypothesis screenshots to transparent PNGs (`filter-shift.png`, `specialties-label.png`); re-optimized the oversized library board (16540px / 14 MB → 3000px / 474 KB).
- `AccomplishmentsMarquee.tsx` (a scroll marquee) was built, then removed from the homepage per request. The file still exists, unused — **safe to delete**.

---

## 9. Open / pending work

1. **Deploy** the latest `out/` (build + FileZilla). Highest priority — the live site lags the source.
2. **Update `Ahmed_Razin_Resume.pdf`** to match the site (it still says "275%" and pre-edit numbers).
3. **Add one real testimonial** quote → wire into a healthcare study (the `testimonials` field already exists; Meal Tab uses it).
4. **Second-context / range:** any non-URMC work, a downstream conversion metric for provider search (bookings/task completion), or one concrete PM-collaboration beat. These are the remaining levers for senior-level signal.

---

## 10. Utility: regenerate image dimensions

After adding/replacing/resizing images in `public/`, regenerate `src/lib/imageMeta.ts` so layout-shift protection stays accurate. On Windows PowerShell:

```powershell
Add-Type -AssemblyName System.Drawing
$pub = "$PWD\public"
$files = Get-ChildItem -Path $pub -Recurse -File | Where-Object { $_.Extension -match '\.(jpg|jpeg|png)$' }
$map = [ordered]@{}
foreach ($f in $files) {
  try {
    $img = [System.Drawing.Image]::FromFile($f.FullName)
    $rel = "/" + ($f.FullName.Substring($pub.Length+1) -replace '\\','/')
    $map[$rel] = [ordered]@{ w = $img.Width; h = $img.Height }
    $img.Dispose()
  } catch {}
}
$json = $map | ConvertTo-Json -Compress
$body = "// Auto-generated intrinsic image dimensions (px) for layout-shift (CLS) prevention.`n// Do not hand-edit.`nexport const imageMeta: Record<string, { w: number; h: number }> = $json`n`nexport function imgDims(src?: string): { width: number; height: number } | undefined {`n  const m = src ? imageMeta[src] : undefined`n  return m ? { width: m.w, height: m.h } : undefined`n}`n"
[System.IO.File]::WriteAllText("$PWD\src\lib\imageMeta.ts", $body, (New-Object System.Text.UTF8Encoding $false))
```

(On macOS/Linux, use any image-size library to produce the same `path → {w,h}` map.)

---

## Quick reference

- **Dev:** `npm run dev` → http://localhost:3000
- **Build:** stop dev, then `rm -rf out .next && npm run build`
- **Typecheck:** `npx tsc --noEmit`
- **Content:** `src/lib/projects.ts` · **Home/Hero:** `src/app/page.tsx`, `src/components/Hero.tsx` · **About/Resume:** `src/app/about|resume/page.tsx`
- **Deploy:** upload contents of `out/` to DreamHost web root (see §4 and `DEPLOY.md`)
- **Repo:** https://github.com/razin68/Raz-Portfolio (branch `main`)
