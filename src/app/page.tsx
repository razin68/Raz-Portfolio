import type { Metadata } from "next"
import { FadeInOnScroll } from "@/components/FadeIn"
import { Hero } from "@/components/Hero"
import { ProjectCard } from "@/components/ProjectCard"
import { projects } from "@/lib/projects"

export const metadata: Metadata = {
  title: "Ahmed Razin: UX Designer",
  description:
    "UX designer and researcher with 5 years building research infrastructure, clinical design systems, and evidence-based product strategy in high-stakes healthcare environments.",
}

export default function HomePage() {
  const current = projects.filter((p) => p.era !== "earlier")
  const earlier = projects.filter((p) => p.era === "earlier")

  return (
    <main className="flex flex-col">
      {/* Hero: full-bleed street photograph that zooms toward the figure on scroll */}
      <Hero />

      {/* Projects */}
      <section id="projects" className="px-6 max-w-6xl mx-auto w-full pt-24 sm:pt-32 pb-32 scroll-mt-20">
        <FadeInOnScroll>
          <div className="max-w-2xl mb-20 sm:mb-28">
            <p className="text-xs tracking-widest uppercase text-[#8A847D] mb-5">
              Selected Work
            </p>
            <h2
              className="text-4xl md:text-5xl text-[#1A1714] leading-[1.1] mb-5"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Case studies
            </h2>
            <p className="text-lg text-[#8A847D] leading-relaxed">
              My healthcare work across research, design systems, and content strategy, each
              one a look at how I actually work through a problem.
            </p>
          </div>
        </FadeInOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-16">
          {current.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        {earlier.length > 0 && (
          <>
            <FadeInOnScroll>
              <div className="max-w-2xl mt-28 sm:mt-36 mb-16 sm:mb-20 border-t border-[#E5E0D8] pt-14">
                <p className="text-xs tracking-widest uppercase text-[#8A847D] mb-5">
                  Earlier Work
                </p>
                <h2
                  className="text-3xl md:text-4xl text-[#1A1714] leading-[1.1] mb-5"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Where the instincts started
                </h2>
                <p className="text-lg text-[#8A847D] leading-relaxed">
                  Startup and student work from 2018&ndash;2020, the early reps in research,
                  product, and shipping.
                </p>
              </div>
            </FadeInOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-16">
              {earlier.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i} />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  )
}
