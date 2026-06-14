import type { Metadata } from "next"
import { FadeInOnScroll } from "@/components/FadeIn"
import { Hero } from "@/components/Hero"
import { ProjectCard } from "@/components/ProjectCard"
import { orderedProjects } from "@/lib/projects"

export const metadata: Metadata = {
  title: "Ahmed Razin: UX Designer",
  description:
    "UX designer and researcher with 5 years building research infrastructure, clinical design systems, and evidence-based product strategy in high-stakes healthcare environments.",
}

export default function HomePage() {
  const current = orderedProjects.filter((p) => p.era !== "earlier")
  const earlier = orderedProjects.filter((p) => p.era === "earlier")

  return (
    <main className="flex flex-col">
      {/* Hero: full-bleed street photograph that zooms toward the figure on scroll */}
      <Hero />

      {/* Projects */}
      <section id="projects" className="px-6 max-w-6xl mx-auto w-full pt-20 sm:pt-32 pb-24 sm:pb-32 scroll-mt-20">
        <FadeInOnScroll>
          <div className="max-w-2xl mb-20 sm:mb-28">
            <h2
              className="text-4xl md:text-5xl text-[#1A1714] leading-[1.1] mb-5"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Selected work
            </h2>
            <p className="text-lg text-[#736E67] leading-relaxed">
              Three projects with URMC in research, design systems, and content strategy. Each
              one takes a look at how I solve problems.
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
              <div className="max-w-2xl mt-20 sm:mt-36 mb-14 sm:mb-20 border-t border-[#E5E0D8] pt-14">
                <h2
                  className="text-3xl md:text-4xl text-[#1A1714] leading-[1.1] mb-5"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Earlier work
                </h2>
                <p className="text-lg text-[#736E67] leading-relaxed">
                  Startup work from 2018&ndash;2020, the early reps in research and product.
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
