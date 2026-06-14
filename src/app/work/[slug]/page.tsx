import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { projects, orderedProjects, getProject } from "@/lib/projects"
import { FadeIn, FadeInOnScroll } from "@/components/FadeIn"
import { RevealText } from "@/components/RevealText"
import { ProjectThumb } from "@/components/ProjectThumb"
import { SectionVisual } from "@/components/SectionVisual"
import { AuditMap } from "@/components/AuditMap"
import { BeforeAfter } from "@/components/BeforeAfter"
import { StatValue } from "@/components/StatValue"
import { Zoomable } from "@/components/Zoomable"
import { imgDims } from "@/lib/imageMeta"
import { Magnetic } from "@/components/Magnetic"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return {
    title: `${project.title}: Ahmed Razin`,
    description: project.tagline,
    openGraph: {
      title: `${project.title}: Ahmed Razin`,
      description: project.tagline,
      type: "article",
      images: project.cover
        ? [{ url: project.cover, alt: `${project.title}: cover` }]
        : undefined,
    },
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const currentIndex = orderedProjects.findIndex((p) => p.slug === slug)
  const nextProject = orderedProjects[(currentIndex + 1) % orderedProjects.length]

  return (
    <main className="min-h-screen overflow-x-clip">
      {/* Hero */}
      <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 px-6 max-w-4xl mx-auto">
        <FadeIn delay={0.45}>
          <Magnetic className="mb-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-[#736E67] hover:text-[#1A1714] transition-colors"
            >
              ← All work
            </Link>
          </Magnetic>
        </FadeIn>

        <FadeIn delay={0.55}>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.era === "earlier" && (
              <span className="text-xs text-[#736E67] border border-[#E5E0D8] bg-[#EDE7DD] rounded-full px-3 py-1">
                Earlier work{project.timeline ? ` · ${project.timeline}` : ""}
              </span>
            )}
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-[#736E67] border border-[#E5E0D8] rounded-full px-3 py-1"
              >
                {tag}
              </span>
            ))}
            {project.year && (
              <span className="text-xs text-[#736E67] border border-[#E5E0D8] rounded-full px-3 py-1">
                {project.year}
              </span>
            )}
            {project.status && (
              <span className="text-xs text-[#C44B20] border border-[#C44B20]/30 bg-[#C44B20]/5 rounded-full px-3 py-1">
                {project.status}
              </span>
            )}
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1
            className="text-[clamp(2.5rem,6vw,5rem)] leading-[1.1] text-[#1A1714] mb-6"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            <RevealText onMount delay={0.15}>
              {project.title}
            </RevealText>
          </h1>
          <p className="text-xl text-[#736E67] leading-relaxed max-w-2xl">
            {project.tagline}
          </p>
        </FadeIn>
      </section>

      {/* Cover */}
      <FadeIn delay={0.65}>
        {project.cover ? (
          <div className="max-w-4xl mx-auto px-6 mb-12 sm:mb-20">
            <figure
              className={`relative aspect-[3/2] overflow-hidden rounded-xl border border-[#E5E0D8] shadow-sm ${
                project.coverContain ? `bg-gradient-to-br ${project.gradient}` : ""
              }`}
            >
              {project.coverContain && <div className="absolute inset-0 mesh opacity-60" />}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.cover}
                alt={`${project.title}: cover`}
                className={`relative block h-full w-full ${
                  project.coverContain
                    ? "object-contain object-center p-6 sm:p-10"
                    : "object-cover object-center"
                }`}
              />
            </figure>
          </div>
        ) : (
          <div className={`relative w-full aspect-[16/7] overflow-hidden bg-gradient-to-br ${project.gradient} mb-20`}>
            <div className="absolute inset-0 mesh" />
            <ProjectThumb slug={project.slug} className="absolute inset-0" />
            <div className="absolute inset-0 grain-soft" />
          </div>
        )}
      </FadeIn>

      {/* Project overview */}
      <section className="px-6 max-w-4xl mx-auto mb-16 sm:mb-24">
        <FadeInOnScroll>
          {/* Outcomes lead */}
          {project.outcomes && project.outcomes.length > 0 && (
            <div className="mb-14">
              <p className="text-xs tracking-widest uppercase text-[#736E67] mb-4">Outcomes</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3">
                {project.outcomes.map((outcome) => (
                  <li
                    key={outcome}
                    className="text-base text-[#1A1714] leading-relaxed border-l border-[#C44B20]/40 pl-4"
                  >
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.timeline && (
            <div className="mb-10">
              <p className="text-xs tracking-widest uppercase text-[#736E67] mb-2">
                Timeline
              </p>
              <p className="text-base text-[#1A1714] leading-relaxed">{project.timeline}</p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 mb-14">
            <div>
              <p className="text-xs tracking-widest uppercase text-[#736E67] mb-2">
                The Problem
              </p>
              <p className="text-base text-[#1A1714] leading-relaxed">{project.problem}</p>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase text-[#736E67] mb-2">
                The Solution
              </p>
              <p className="text-base text-[#1A1714] leading-relaxed">{project.solution}</p>
            </div>
          </div>
          <div className="border-t border-[#E5E0D8] pt-10">
            {project.role && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div>
                  <p className="text-xs tracking-widest uppercase text-[#736E67] mb-2">My Role</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-base text-[#1A1714] leading-relaxed">{project.role}</p>
                </div>
              </div>
            )}
            {project.team && project.team.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-8">
                <div>
                  <p className="text-xs tracking-widest uppercase text-[#736E67] mb-2">Team</p>
                </div>
                <div className="md:col-span-2">
                  <ul className="flex flex-wrap gap-x-6 gap-y-1">
                    {project.team.map((member) => (
                      <li key={member} className="text-base text-[#1A1714] leading-relaxed">
                        {member}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {project.owned && project.owned.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-8">
                <div>
                  <p className="text-xs tracking-widest uppercase text-[#736E67] mb-2">
                    I Personally Owned
                  </p>
                </div>
                <div className="md:col-span-2">
                  <ul className="flex flex-col gap-1">
                    {project.owned.map((item) => (
                      <li key={item} className="text-base text-[#1A1714] leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {project.mainGoal && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-8">
                <div>
                  <p className="text-xs tracking-widest uppercase text-[#736E67] mb-2">Main Goal</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-base text-[#1A1714] leading-relaxed">{project.mainGoal}</p>
                </div>
              </div>
            )}
          </div>
        </FadeInOnScroll>
      </section>

      {/* My Process intro */}
      <section className="px-6 max-w-4xl mx-auto mb-16">
        <FadeInOnScroll>
          <h2
            className="text-3xl md:text-4xl text-[#1A1714] border-t border-[#E5E0D8] pt-10"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            My Process
          </h2>
        </FadeInOnScroll>
      </section>

      {/* Process sections */}
      <section className="px-6 max-w-4xl mx-auto mb-20">
        <div className="flex flex-col gap-20 sm:gap-28 md:gap-36">
          {project.sections.map((section, i) => (
            <FadeInOnScroll key={`${section.title}-${i}`}>
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-16">
                <div>
                  <span className="text-xs tracking-widest uppercase text-[#736E67]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="text-2xl text-[#1A1714] mt-2 leading-tight"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {section.title}
                  </h3>
                  {section.goal && (
                    <p className="text-sm text-[#736E67] mt-3 leading-relaxed">
                      {section.goal}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-6">
                  {section.statsTop && section.stats && section.stats.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                      {section.stats.map((stat, j) => (
                        <div
                          key={j}
                          className={`group relative overflow-hidden rounded-xl p-4 sm:p-6 bg-gradient-to-br ${project.gradient} transition-transform duration-300 hover:-translate-y-1`}
                        >
                          <div className="absolute inset-0 mesh opacity-70" />
                          <div className="relative">
                            <p
                              className="text-3xl sm:text-4xl text-[#1A1714] mb-2"
                              style={{ fontFamily: "var(--font-serif)" }}
                            >
                              <StatValue value={stat.value} />
                            </p>
                            <p className="text-xs sm:text-sm text-[#1A1714] leading-relaxed">
                              {stat.label}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.body && (
                    <p className="text-base leading-relaxed text-[#1A1714] whitespace-pre-line">
                      {section.body}
                    </p>
                  )}

                  {section.cards && section.cards.length > 0 && section.cardsHorizontal && (
                    <div className="grid gap-4 sm:grid-cols-3">
                      {section.cards.map((card, j) => (
                        <div
                          key={j}
                          className="flex flex-col rounded-xl border border-[#E5E0D8] bg-white/70 p-6"
                        >
                          <span className="text-xs tracking-widest uppercase text-[#C44B20]">
                            {String(j + 1).padStart(2, "0")}
                          </span>
                          <h4
                            className="mt-2 text-lg text-[#1A1714] leading-snug"
                            style={{ fontFamily: "var(--font-serif)" }}
                          >
                            {card.title}
                          </h4>
                          {card.lead && (
                            <p className="mt-3 text-sm text-[#736E67] leading-relaxed">
                              {card.lead}
                            </p>
                          )}
                          {card.points && card.points.length > 0 && (
                            <ul className="mt-2 flex flex-col gap-1.5 list-disc pl-5 marker:text-[#C44B20]">
                              {card.points.map((p, k) => (
                                <li key={k} className="text-sm text-[#1A1714] leading-relaxed pl-1">
                                  {p}
                                </li>
                              ))}
                            </ul>
                          )}
                          {card.body && (
                            <p className="mt-3 text-base text-[#1A1714] leading-relaxed whitespace-pre-line">
                              {card.body}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {section.cards && section.cards.length > 0 && !section.cardsHorizontal && (
                    <div className="flex flex-col">
                      {section.cards.map((card, j) => (
                        <div key={j}>
                          <div className="rounded-xl border border-[#E5E0D8] bg-white/70 p-6 md:p-7">
                            <div className="grid gap-5 md:grid-cols-[1fr_1.7fr] md:gap-10">
                              <div>
                                <span className="text-xs tracking-widest uppercase text-[#C44B20]">
                                  {String(j + 1).padStart(2, "0")}
                                </span>
                                <h4
                                  className="mt-2 text-lg text-[#1A1714] leading-snug"
                                  style={{ fontFamily: "var(--font-serif)" }}
                                >
                                  {card.title}
                                </h4>
                              </div>
                              <div className="flex flex-col gap-3">
                                {card.lead && (
                                  <p className="text-base text-[#736E67] leading-relaxed">
                                    {card.lead}
                                  </p>
                                )}
                                {card.points && card.points.length > 0 && (
                                  <ul className="flex flex-col gap-1.5 list-disc pl-5 marker:text-[#C44B20]">
                                    {card.points.map((p, k) => (
                                      <li
                                        key={k}
                                        className="text-base text-[#1A1714] leading-relaxed pl-1"
                                      >
                                        {p}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                                {card.body && (
                                  <p className="text-base text-[#1A1714] leading-relaxed whitespace-pre-line">
                                    {card.body}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          {j < (section.cards?.length ?? 0) - 1 && (
                            <div
                              className="mx-auto h-8 w-px bg-[#C44B20]/30"
                              aria-hidden
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {section.reframes && section.reframes.length > 0 && (
                    <div className="flex flex-col gap-8">
                      {section.reframes.map((r, j) => (
                        <div
                          key={j}
                          className="rounded-xl border border-[#E5E0D8] p-6 md:p-7"
                        >
                          <div>
                            <span className="text-xs tracking-widest uppercase text-[#C44B20]">
                              {r.tag}
                            </span>
                            {r.stat && (
                              <div className="mt-3 flex items-baseline gap-2">
                                <span
                                  className="text-3xl text-[#1A1714]"
                                  style={{ fontFamily: "var(--font-serif)" }}
                                >
                                  <StatValue value={r.stat.value} />
                                </span>
                                <span className="max-w-[16rem] text-xs text-[#736E67] leading-snug">
                                  {r.stat.label}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
                            <div className="rounded-lg border border-dashed border-[#E5E0D8] bg-white/70 p-4">
                              <p className="text-[11px] tracking-widest uppercase text-[#736E67] mb-2">
                                Before
                              </p>
                              <p className="text-sm text-[#736E67] leading-relaxed">
                                {r.before}
                              </p>
                            </div>
                            <div className="flex items-center justify-center text-[#C44B20]">
                              <span className="hidden text-2xl md:block">&rarr;</span>
                              <span className="text-2xl md:hidden">&darr;</span>
                            </div>
                            <div className="rounded-lg border border-[#C44B20]/40 bg-white/70 p-4">
                              <p className="text-[11px] tracking-widest uppercase text-[#C44B20] mb-2">
                                Re-scored
                              </p>
                              <p className="text-sm text-[#1A1714] leading-relaxed">
                                {r.after}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.learnings && section.learnings.length > 0 && (
                    <div className="flex flex-col gap-7">
                      {section.learnings.map((l, j) => (
                        <div key={j} className="border-l-2 border-[#C44B20]/40 pl-5">
                          <h4
                            className="text-lg text-[#1A1714] leading-snug"
                            style={{ fontFamily: "var(--font-serif)" }}
                          >
                            {l.title}
                          </h4>
                          <p className="text-base text-[#1A1714] leading-relaxed mt-1.5">
                            {l.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.flow && section.flow.length > 0 && (
                    <ol className="mt-2 flex flex-col">
                      {section.flow.map((s, j) => (
                        <li key={j} className="relative flex gap-5 pb-8 last:pb-0">
                          <div className="flex flex-col items-center">
                            <span
                              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#C44B20] text-sm tracking-widest text-[#C44B20]"
                              style={{ fontFamily: "var(--font-serif)" }}
                            >
                              {s.step}
                            </span>
                            {j < (section.flow?.length ?? 0) - 1 && (
                              <span className="mt-2 w-px flex-1 bg-[#E5E0D8]" aria-hidden />
                            )}
                          </div>
                          <div className="pt-2 pb-1">
                            <div className="flex flex-wrap items-center gap-3">
                              <h4
                                className="text-lg text-[#1A1714] leading-snug"
                                style={{ fontFamily: "var(--font-serif)" }}
                              >
                                {s.title}
                              </h4>
                              {s.tag && (
                                <span
                                  className="text-[11px] tracking-widest uppercase rounded-full px-2.5 py-1"
                                  style={
                                    s.owned
                                      ? {
                                          color: "#C44B20",
                                          border: "1px solid rgba(196,75,32,0.35)",
                                          backgroundColor: "rgba(196,75,32,0.06)",
                                        }
                                      : {
                                          color: "#736E67",
                                          border: "1px solid #E5E0D8",
                                          backgroundColor: "rgba(138,132,125,0.08)",
                                        }
                                  }
                                >
                                  {s.tag}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-[#736E67] leading-relaxed mt-1.5 max-w-xl">
                              {s.body}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  )}

                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="flex flex-col gap-3 border-l border-[#E5E0D8] pl-5">
                      {section.bullets.map((bullet, j) => (
                        <li
                          key={j}
                          className="text-base leading-relaxed text-[#1A1714]"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.widgetGrid && section.widgetGrid.length > 0 && (
                    <div className="mt-4 flex flex-col gap-16 sm:gap-20">
                      {section.widgetGrid.map((widget, j) => (
                        <figure key={j} className="flex flex-col">
                          <h4
                            className="text-xl text-[#1A1714] leading-snug"
                            style={{ fontFamily: "var(--font-serif)" }}
                          >
                            {widget.heading}
                          </h4>
                          <p className="text-sm text-[#736E67] leading-relaxed mt-2 max-w-xl">
                            {widget.useCase}
                          </p>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={widget.image}
                            alt={`${widget.heading}: example`}
                            loading="lazy"
                            {...imgDims(widget.image)}
                            className="block w-full h-auto mt-6"
                          />
                        </figure>
                      ))}
                    </div>
                  )}

                  {section.quotes && section.quotes.length > 0 && (
                    <div className="flex flex-col gap-5">
                      {section.quotes.map((quote, j) => (
                        <div
                          key={j}
                          className="bg-white border border-[#E5E0D8] rounded-xl p-5"
                        >
                          {quote.question && (
                            <p className="text-xs text-[#736E67] mb-2 italic">
                              {quote.question}
                            </p>
                          )}
                          <p
                            className="text-base text-[#1A1714] leading-relaxed"
                            style={{ fontFamily: "var(--font-serif)" }}
                          >
                            &ldquo;{quote.text}&rdquo;
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {!section.statsTop && section.stats && section.stats.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {section.stats.map((stat, j) => (
                        <div
                          key={j}
                          className={`group relative overflow-hidden rounded-xl p-6 bg-gradient-to-br ${project.gradient} transition-transform duration-300 hover:-translate-y-1`}
                        >
                          <div className="absolute inset-0 mesh opacity-70" />
                          <div className="relative">
                            <p
                              className="text-4xl text-[#1A1714] mb-2"
                              style={{ fontFamily: "var(--font-serif)" }}
                            >
                              <StatValue value={stat.value} />
                            </p>
                            <p className="text-sm text-[#1A1714] leading-relaxed">
                              {stat.label}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Section visuals: before/after, screenshots, a diagram, else placeholder */}
                  {section.beforeAfter ? (
                    <div className="mt-4">
                      {section.beforeAfter.title && (
                        <p className="text-xs tracking-widest uppercase text-[#736E67] mb-5">
                          {section.beforeAfter.title}
                        </p>
                      )}
                      <BeforeAfter
                        before={section.beforeAfter.before}
                        after={section.beforeAfter.after}
                        gradient={project.gradient}
                      />
                    </div>
                  ) : (section.mediaRow && section.mediaRow.length > 0) ||
                    (section.mediaFull && section.mediaFull.length > 0) ||
                    (section.images && section.images.length > 0) ? (
                    <div className="mt-4 flex flex-col gap-6">
                  {section.mediaRow && section.mediaRow.length > 0 && (
                        section.mediaRowEqualHeight ? (
                          <div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:items-center sm:gap-10">
                            {section.mediaRow.map((src, k) => (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                key={`row-${k}`}
                                src={src}
                                alt={`${section.title}: visual ${k + 1}`}
                                loading="lazy"
                                {...imgDims(src)}
                                className="h-auto w-auto max-w-full object-contain rounded-lg sm:h-[22rem]"
                              />
                            ))}
                          </div>
                        ) : (
                          <div
                            className={`grid gap-6 ${
                              section.mediaRow.length > 1 ? "sm:grid-cols-2" : ""
                            }`}
                          >
                            {section.mediaRow.map((src, k) => (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                key={`row-${k}`}
                                src={src}
                                alt={`${section.title}: visual ${k + 1}`}
                                loading="lazy"
                                {...imgDims(src)}
                                className="block w-full h-auto rounded-lg"
                              />
                            ))}
                          </div>
                        )
                      )}
                      {section.mediaFull &&
                        section.mediaFull.map((src, k) => (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            key={`full-${k}`}
                            src={src}
                            alt={`${section.title}: visual`}
                            loading="lazy"
                            {...imgDims(src)}
                            className="block w-full h-auto mt-4 sm:mt-8"
                          />
                        ))}
                      {section.images &&
                        section.images.map((src, k) => (
                          <figure key={k} className="overflow-hidden rounded-xl">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={src}
                              alt={`${section.title}: screenshot`}
                              loading="lazy"
                              {...imgDims(src)}
                              className="block w-full h-auto"
                            />
                          </figure>
                        ))}
                    </div>
                  ) : section.visual === "audit" ? (
                    <AuditMap className="mt-4 block h-auto w-full" />
                  ) : section.visual ? (
                    <div className={`relative mt-4 w-full aspect-[16/9] rounded-xl overflow-hidden bg-gradient-to-br ${project.gradient}`}>
                      <div className="absolute inset-0 mesh opacity-70" />
                      <SectionVisual variant={section.visual} className="absolute inset-0" />
                      <div className="absolute inset-0 grain-soft" />
                    </div>
                  ) : section.wideImage ||
                    (section.widgetGrid && section.widgetGrid.length > 0) ||
                    (section.cards && section.cards.length > 0) ||
                    (section.flow && section.flow.length > 0) ||
                    (section.hypotheses && section.hypotheses.length > 0) ||
                    (section.reframes && section.reframes.length > 0) ||
                    (section.learnings && section.learnings.length > 0) ? null : null}

                  {section.pullQuotes && section.pullQuotes.length > 0 && !section.wideImage && (
                    <div className="mt-4 flex flex-col gap-7">
                      <p className="text-xs tracking-widest uppercase text-[#736E67]">
                        {section.pullQuotesLabel ?? "In their words"}
                      </p>
                      {section.pullQuotes.map((q, j) => {
                        const toneColor =
                          q.tone === "positive"
                            ? "#2E7D4F"
                            : q.tone === "negative"
                            ? "#C0392B"
                            : q.tone === "neutral"
                            ? "#736E67"
                            : "#C44B20"
                        return (
                          <figure
                            key={j}
                            className="border-l-[3px] pl-5"
                            style={{ borderColor: toneColor }}
                          >
                            {q.tag && (
                              <figcaption
                                className="text-base sm:text-lg font-semibold tracking-tight mb-3"
                                style={{ color: toneColor }}
                              >
                                {q.tag}
                              </figcaption>
                            )}
                            <blockquote
                              className="text-lg sm:text-xl leading-snug text-[#1A1714]"
                              style={{ fontFamily: "var(--font-serif)" }}
                            >
                              &ldquo;{q.text}&rdquo;
                            </blockquote>
                            <figcaption className="text-sm text-[#736E67] mt-3">
                              {q.role}
                            </figcaption>
                          </figure>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
              {section.wideImage && (
                <div className="w-screen ml-[calc(50%-50vw)] mt-12">
                  <div className="mx-auto max-w-[92rem] px-6">
                    {section.pullQuotes && section.pullQuotes.length > 0 ? (
                      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-start">
                        <figure>
                          <Zoomable
                            src={section.wideImage}
                            alt={`${section.title}: ${section.wideImageCaption ?? "visual"}`}
                            imgClassName={
                              section.wideImageTransparent
                                ? "block w-full h-auto"
                                : "block w-full h-auto rounded-xl border border-[#E5E0D8] bg-white shadow-sm"
                            }
                          />
                          {section.wideImageCaption && (
                            <figcaption className="text-sm text-[#736E67] leading-relaxed mt-3">
                              {section.wideImageCaption}
                            </figcaption>
                          )}
                        </figure>
                        <div className="flex flex-col gap-7">
                          <p className="text-xs tracking-widest uppercase text-[#736E67]">
                            {section.pullQuotesLabel ?? "In their words"}
                          </p>
                          {section.pullQuotes.map((q, j) => {
                            const toneColor =
                              q.tone === "positive"
                                ? "#2E7D4F"
                                : q.tone === "negative"
                                ? "#C0392B"
                                : q.tone === "neutral"
                                ? "#736E67"
                                : "#C44B20"
                            return (
                              <figure
                                key={j}
                                className="border-l-[3px] pl-5"
                                style={{ borderColor: toneColor }}
                              >
                                {q.tag && (
                                  <figcaption
                                    className="text-base sm:text-lg font-semibold tracking-tight mb-3"
                                    style={{ color: toneColor }}
                                  >
                                    {q.tag}
                                  </figcaption>
                                )}
                                <blockquote
                                  className="text-lg leading-snug text-[#1A1714]"
                                  style={{ fontFamily: "var(--font-serif)" }}
                                >
                                  &ldquo;{q.text}&rdquo;
                                </blockquote>
                                <figcaption className="text-sm text-[#736E67] mt-3">
                                  {q.role}
                                </figcaption>
                              </figure>
                            )
                          })}
                        </div>
                      </div>
                    ) : (
                      <figure>
                        <Zoomable
                          src={section.wideImage}
                          alt={`${section.title}: ${section.wideImageCaption ?? "visual"}`}
                          imgClassName={
                            section.wideImageTransparent
                              ? "block w-full h-auto"
                              : "block w-full h-auto rounded-xl border border-[#E5E0D8] bg-white shadow-sm"
                          }
                        />
                        {section.wideImageCaption && (
                          <figcaption className="text-sm text-[#736E67] leading-relaxed mt-3 max-w-2xl">
                            {section.wideImageCaption}
                          </figcaption>
                        )}
                      </figure>
                    )}
                  </div>
                </div>
              )}
              {section.hypotheses && section.hypotheses.length > 0 && (
                <div className="w-screen ml-[calc(50%-50vw)] mt-16 sm:mt-24">
                  <div className="mx-auto flex max-w-[92rem] flex-col gap-12 sm:gap-16 md:gap-20 px-6">
                    {section.hypotheses.map((h, j) => {
                      const verdictColor =
                        h.verdict === "Killed" ? "#C0392B" : "#2E7D4F"
                      return (
                        <div
                          key={j}
                          className="grid items-start gap-8 md:grid-cols-[1.4fr_1fr] md:gap-14"
                        >
                          {/* Mobile-only verdict header: lead with the call before the screenshot */}
                          <div className="md:hidden flex flex-wrap items-center gap-3">
                            <span className="text-xs tracking-widest uppercase text-[#736E67]">
                              {h.label}
                            </span>
                            <h4
                              className="text-2xl text-[#1A1714] leading-snug"
                              style={{ fontFamily: "var(--font-serif)" }}
                            >
                              {h.title}
                            </h4>
                            <span
                              className="text-[11px] tracking-widest uppercase rounded-full px-2.5 py-1"
                              style={{
                                color: verdictColor,
                                border: `1px solid ${verdictColor}40`,
                                backgroundColor: `${verdictColor}0d`,
                              }}
                            >
                              {h.verdict}
                            </span>
                          </div>
                          {h.imageTransparent ? (
                            <Zoomable
                              src={h.image}
                              alt={`${h.label}: ${h.title}`}
                              imgClassName="block w-full h-auto"
                            />
                          ) : (
                            <figure className="overflow-hidden rounded-xl border border-[#E5E0D8] bg-white shadow-sm">
                              <Zoomable
                                src={h.image}
                                alt={`${h.label}: ${h.title}`}
                                imgClassName="block w-full h-auto"
                              />
                            </figure>
                          )}

                          <div className="flex flex-col gap-5">
                            <div
                              className={`relative overflow-hidden rounded-xl p-6 bg-gradient-to-br ${project.gradient}`}
                            >
                              <div className="absolute inset-0 mesh opacity-70" />
                              <div className="relative">
                                <p
                                  className="text-4xl sm:text-5xl text-[#1A1714]"
                                  style={{ fontFamily: "var(--font-serif)" }}
                                >
                                  <StatValue value={h.stat.value} />
                                </p>
                                <p className="text-sm text-[#1A1714] leading-relaxed mt-2">
                                  {h.stat.label}
                                </p>
                              </div>
                            </div>

                            <div className="hidden md:flex flex-wrap items-center gap-3">
                              <span className="text-xs tracking-widest uppercase text-[#736E67]">
                                {h.label}
                              </span>
                              <h4
                                className="text-2xl text-[#1A1714] leading-snug"
                                style={{ fontFamily: "var(--font-serif)" }}
                              >
                                {h.title}
                              </h4>
                              <span
                                className="text-[11px] tracking-widest uppercase rounded-full px-2.5 py-1"
                                style={{
                                  color: verdictColor,
                                  border: `1px solid ${verdictColor}40`,
                                  backgroundColor: `${verdictColor}0d`,
                                }}
                              >
                                {h.verdict}
                              </span>
                            </div>

                            <p className="text-base leading-relaxed text-[#1A1714] whitespace-pre-line">
                              {h.body}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </FadeInOnScroll>
          ))}
        </div>
      </section>

      {/* Before & After */}
      {project.beforeAfter && (
        <section className="px-6 max-w-4xl mx-auto mb-16 sm:mb-24">
          <FadeInOnScroll>
            <h2
              className="text-3xl md:text-4xl text-[#1A1714] border-t border-[#E5E0D8] pt-10 mb-3"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Before &amp; After
            </h2>
            {project.beforeAfter.title && (
              <p className="text-lg text-[#736E67] leading-relaxed mb-10 max-w-2xl">
                {project.beforeAfter.title}
              </p>
            )}
            <BeforeAfter
              before={project.beforeAfter.before}
              after={project.beforeAfter.after}
              gradient={project.gradient}
            />
          </FadeInOnScroll>
        </section>
      )}

      {/* Impact */}
      {(project.impactBody || project.impactStats || project.testimonials || project.reflection) && (
        <section className="px-6 max-w-4xl mx-auto mb-20 sm:mb-32">
          <FadeInOnScroll>
            <h2
              className="text-3xl md:text-4xl text-[#1A1714] border-t border-[#E5E0D8] pt-10 mb-10"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              My Impact
            </h2>
            {project.impactBody && (
              <p className="text-lg leading-relaxed text-[#1A1714] whitespace-pre-line mb-10 max-w-2xl">
                {project.impactBody}
              </p>
            )}

            {project.impactStats && project.impactStats.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {project.impactStats.map((stat, i) => (
                  <div
                    key={i}
                    className={`group relative overflow-hidden rounded-2xl p-6 sm:p-8 bg-gradient-to-br ${project.gradient} transition-transform duration-300 hover:-translate-y-1.5`}
                  >
                    <div className="absolute inset-0 mesh opacity-70" />
                    <div className="absolute inset-0 grain-soft" />
                    <div className="relative">
                      <p
                        className="text-4xl sm:text-5xl text-[#1A1714] mb-3"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        <StatValue value={stat.value} />
                      </p>
                      <p className="text-sm text-[#1A1714] leading-relaxed">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {project.reflection && project.reflection.length > 0 && (
              <div className="mt-12">
                <p className="text-xs tracking-widest uppercase text-[#736E67] mb-6">
                  What I&apos;d do differently
                </p>
                <div className="flex flex-col gap-8">
                  {project.reflection.map((item) => (
                    <div key={item.title} className="border-l border-[#E5E0D8] pl-5">
                      <h3
                        className="text-xl text-[#1A1714] mb-2 leading-snug"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-base text-[#1A1714] leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.testimonials && project.testimonials.length > 0 && (
              <div className="mt-12">
                <p className="text-xs tracking-widest uppercase text-[#736E67] mb-6">
                  What people said
                </p>
                <div className="flex flex-col gap-4">
                  {project.testimonials.map((quote, i) => (
                    <blockquote
                      key={i}
                      className="bg-white border border-[#E5E0D8] rounded-xl p-6 text-base leading-relaxed text-[#1A1714]"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      &ldquo;{quote}&rdquo;
                    </blockquote>
                  ))}
                </div>
              </div>
            )}
          </FadeInOnScroll>
        </section>
      )}

      {/* Next project */}
      <section className="border-t border-[#E5E0D8] px-6 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto">
          <FadeInOnScroll>
            <p className="text-xs tracking-widest uppercase text-[#736E67] mb-6">Next project</p>
            <Link
              href={`/work/${nextProject.slug}`}
              className="group flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <Magnetic strength={0.25}>
                <h2
                  className="text-4xl md:text-5xl text-[#1A1714] group-hover:text-[#C44B20] transition-colors"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {nextProject.title}
                </h2>
              </Magnetic>
              <Magnetic>
                <span className="text-2xl text-[#736E67] group-hover:translate-x-2 transition-transform inline-block">
                  →
                </span>
              </Magnetic>
            </Link>
          </FadeInOnScroll>
        </div>
      </section>
    </main>
  )
}
