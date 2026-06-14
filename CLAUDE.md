@AGENTS.md

# Project context for Claude — ahmedrazin.me portfolio

**Read `HANDOFF.md` (repo root) before any substantial work.** It is the source of truth for state, structure, gotchas, the metrics table (measured vs estimated), the writing-style rules, the changelog, and open items. This file is the quick map so a fresh session isn't blind.

## What this is
Static UX portfolio for **Ahmed Razin**. **Modified Next.js 16** (App Router) exported to static HTML in `out/`. Hosted on DreamHost via manual FileZilla upload of `out/`. Repo: https://github.com/razin68/Raz-Portfolio (branch `main`).
Identity: cream `#F8F5F0`, ink `#1A1714`, terracotta accent `#C44B20`, muted `#736E67`; DM Serif Display headings, Inter body. Five case studies (3 healthcare at URMC + 2 earlier startup), plus Home, About, Resume, 404.

## Where things live
- **Case-study content + types:** `src/lib/projects.ts` — all copy (titles, taglines, sections, stats). `displayOrder` (bottom of file) controls card/nav order.
- **Case-study renderer:** `src/app/work/[slug]/page.tsx` (the large one).
- **Home:** `src/app/page.tsx` + `src/components/Hero.tsx`.
- **About / Resume pages:** `src/app/about|resume/page.tsx`. Downloadable resume is a separate binary, `public/Ahmed_Razin_Resume.pdf` (edit by hand; it can drift from the site).
- **Components:** `src/components/` — Nav, Hero, ProjectCard, BeforeAfter, StatValue, Zoomable (lightbox), BackToTop, RotatingLine (footer "Currently…"), FadeIn, ScrollCue, Magnetic, CopyEmail, SectionVisual, AuditMap, ProjectThumb. (`AccomplishmentsMarquee.tsx` is unused — safe to delete.)
- **Tokens/colors:** `src/app/globals.css`. Note: components mostly use literal hex, not the `@theme` tokens, so a color change is a find/replace across `src`.
- **SEO:** `src/app/layout.tsx` (metadata, OG/Twitter, JSON-LD Person), `sitemap.ts`, `robots.ts`, `favicon.ico`, `public/og.png`.
- **Image dimension map (CLS):** `src/lib/imageMeta.ts` — AUTO-GENERATED; regenerate after image changes (script in HANDOFF §10).

## Critical gotchas
1. **Modified Next 16** (see `AGENTS.md`): `params` is a `Promise`; read `node_modules/next/dist/docs/` before Next-specific code.
2. **Never `npm run build` while the dev server runs** — it corrupts `.next`.
3. **Always `rm -rf out .next && npm run build`** before deploying (stale `out/` bloats Tailwind's CSS).

## Run / build / deploy
- Dev: `npm run dev` → http://localhost:3000
- Typecheck: `npx tsc --noEmit`
- Build: stop dev, then `rm -rf out .next && npm run build` → emits `out/`
- Deploy: FileZilla-upload the **contents of `out/`** to DreamHost. **`git push` does NOT deploy.**

## Hard content rules (full set in HANDOFF §6)
- **Never fabricate** metrics, quotes, or claims — restructure copy, never the facts. Leave placeholders if data is missing.
- No em dashes; no AI buzzwords; no "it's not X, it's Y" antithesis; ration tricolons.
- Case-study **section headings must read as a coherent, specific story on their own** (heading-only narrative).
- After source edits: `npx tsc --noEmit`, rebuild `out/`, and commit + push when the user asks.

## Open / pending (HANDOFF §9)
Deploy the latest `out/`; update the resume PDF to match the site; add a real testimonial; add any non-URMC / second-context work.
