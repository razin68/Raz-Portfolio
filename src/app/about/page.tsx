import type { Metadata } from "next"
import { FadeIn, FadeInOnScroll } from "@/components/FadeIn"
import { CopyEmail } from "@/components/CopyEmail"

export const metadata: Metadata = {
  title: "About: Ahmed Razin",
  description:
    "UX designer and researcher with 5 years building research infrastructure, clinical design systems, and evidence-based product strategy in high-stakes healthcare environments.",
}

const processGroups = [
  {
    label: "Research Methods",
    items: [
      "Moderated & unmoderated usability testing",
      "Contextual inquiry & think-aloud protocol",
      "Diary studies & surveys",
      "Competitive analysis & affinity mapping",
      "Hypothesis-driven, mixed-methods synthesis",
    ],
  },
  {
    label: "Design Practice",
    items: [
      "Design systems & token architecture",
      "Interaction design & information architecture",
      "Wireframing & high-fidelity prototyping",
      "Visual design",
      "Accessibility (WCAG 2.1 AA/AAA) & responsive design (4-breakpoint)",
    ],
  },
  {
    label: "AI & Data",
    items: [
      "AI-assisted research synthesis (Claude, ChatGPT)",
      "Behavioral analytics & quantitative synthesis",
      "Weighted Impact Scoring",
      "HIPAA-compliant research design",
    ],
  },
  {
    label: "Collaboration & Process",
    items: [
      "Cross-functional stakeholder alignment",
      "Executive presentations",
      "Design QA & handoff",
      "Design critique facilitation",
      "Agile workflow",
      "Research framework design & documentation",
    ],
  },
  {
    label: "Tools",
    items: [
      "Figma · FigJam · Miro",
      "Airtable · Looker Studio · Maze",
      "Salesforce Marketing Cloud · Microsoft Forms",
      "Adobe Creative Suite · After Effects · Premiere Pro",
      "Invision",
    ],
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <h1
            className="text-5xl md:text-6xl mb-12 text-[#1A1714] leading-[1.1]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            About me
          </h1>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mb-16 grid gap-8 sm:grid-cols-[1.5fr_1fr] sm:items-start">
            <div className="flex flex-col gap-6">
              <p className="text-xl leading-relaxed text-[#1A1714]">
                I&apos;m a UX designer and researcher. For five years I&apos;ve worked in
                healthcare, the high-stakes kind, building research systems, clinical design
                systems, and the evidence teams need to make good calls.
              </p>
              <p className="text-xl leading-relaxed text-[#1A1714]">
                I do my best work in the messy middle, where you have to win people over,
                learn the clinical side, and trust your own read of the research. In practice
                that has meant reframing a problem leadership had misdiagnosed, building a
                quantified research framework from scratch, and getting enough of the room
                aligned that the good decision actually ships.
              </p>
            </div>
            <figure className="overflow-hidden rounded-xl border border-[#E5E0D8]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/personal/about-portrait.jpg"
                alt="Ahmed Razin sitting on a bench in a New York park"
                loading="lazy"
                className="block aspect-[3/4] w-full object-cover object-center"
              />
            </figure>
          </div>
        </FadeIn>

        <FadeInOnScroll>
          <div className="border-t border-[#E5E0D8] pt-12 mb-16">
            <h2
              className="text-3xl text-[#1A1714] mb-6"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              My Process
            </h2>
            <p className="text-base leading-relaxed text-[#8A847D] mb-6">
              I try to be deliberate, and to stay flexible. I start by making sure I&apos;m
              solving the right problem, which often means reframing how it was first handed to me.
              Then I do the research to produce answers a team can actually act on. I believe{" "}
              <span className="text-[#1A1714]">design decisions get made on opinion until you
              build the infrastructure to make them on evidence</span>, so I&apos;ve built that
              infrastructure: weighted research frameworks, design systems, and documentation
              that teams trust enough to use.
            </p>
            <p className="text-base leading-relaxed text-[#8A847D]">
              In practice there are always constraints: tight timelines, technical limits,
              and stakeholders to bring along. So I apply the method that makes the most sense
              for the problem in its context. Currently, I&apos;m a UX designer at an academic
              medical center, where I lead research and design systems work for digital
              experiences used by over a million patients.
            </p>
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll>
          <div className="mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {processGroups.map((group) => (
                <div key={group.label}>
                  <h3 className="text-xs tracking-widest uppercase text-[#8A847D] mb-4">
                    {group.label}
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {group.items.map((item) => (
                      <li key={item} className="text-base text-[#1A1714]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll>
          <div className="border-t border-[#E5E0D8] pt-12 mb-16">
            <h2
              className="text-3xl text-[#1A1714] mb-6"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Education
            </h2>
            <p className="text-base leading-relaxed text-[#1A1714]">
              NYU Tandon School of Engineering, B.S., Integrated Digital Media (2015–2019).
              Relevant coursework: User Experience Design, Intro to Web Development.
            </p>
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll>
          <div className="border-t border-[#E5E0D8] pt-12 mb-16">
            <h2
              className="text-3xl text-[#1A1714] mb-6"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              In my spare time...
            </h2>
            <p className="text-base leading-relaxed text-[#8A847D] max-w-2xl">
              Outside of work, I&apos;m usually outside. I ride a lot, on roads and gravel,
              and I&apos;ll happily go out of my way for a good trail or a good view. I go to
              concerts, I hike, and I almost always have a camera on me. Putting myself
              somewhere new and just absorbing it is how I stay inspired.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <figure className="overflow-hidden rounded-xl border border-[#E5E0D8]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/personal/bike-colorado.jpg"
                  alt="Ahmed with his gravel bike on a ridge, mountains behind"
                  loading="lazy"
                  className="block aspect-[4/5] w-full object-cover object-center"
                />
                <figcaption className="px-4 py-3 text-sm text-[#8A847D]">
                  Out on the bike.
                </figcaption>
              </figure>
              <figure className="overflow-hidden rounded-xl border border-[#E5E0D8]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/personal/about-cafe.jpg"
                  alt="Ahmed at a cafe window, thinking"
                  loading="lazy"
                  className="block aspect-[4/5] w-full object-cover object-center"
                />
                <figcaption className="px-4 py-3 text-sm text-[#8A847D]">
                  Thinking it over.
                </figcaption>
              </figure>
            </div>
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll>
          <div className="border-t border-[#E5E0D8] pt-12 mb-12">
            <h2
              className="text-3xl text-[#1A1714] mb-6"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Through my lens
            </h2>
            <p className="text-base leading-relaxed text-[#8A847D] max-w-2xl mb-8">
              Photography is how I pay attention. Most of what I shoot is street work around
              New York, the light, the shadows, the small moments on a corner. It keeps my
              eye sharp for how people actually move through a space, which turns out to be
              most of the day job too.
            </p>
            <figure className="overflow-hidden rounded-xl border border-[#E5E0D8]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/personal/photography-gallery.jpg"
                alt="A grid of Ahmed's street photography from around New York"
                loading="lazy"
                className="block w-full h-auto"
              />
            </figure>
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll>
          <div className="border-t border-[#E5E0D8] pt-12">
            <h2 className="text-xs tracking-widest uppercase text-[#8A847D] mb-8">
              Let&apos;s connect
            </h2>
            <div className="flex flex-col gap-3">
              <CopyEmail
                email="ahmedrazinux@gmail.com"
                className="text-base text-[#1A1714] hover:text-[#C44B20] transition-colors cursor-pointer"
              />
              <a
                href="https://linkedin.com/in/ahmrazin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-[#1A1714] hover:text-[#C44B20] transition-colors"
              >
                linkedin.com/in/ahmrazin
              </a>
              <p className="text-base text-[#8A847D]">(646) 384-7503</p>
            </div>
          </div>
        </FadeInOnScroll>
      </div>
    </main>
  )
}
