import type { Metadata } from "next"
import { FadeIn, FadeInOnScroll } from "@/components/FadeIn"
import { CopyEmail } from "@/components/CopyEmail"

export const metadata: Metadata = {
  title: "Resume: Ahmed Razin",
  description:
    "Resume of Ahmed Razin, UX designer and researcher with 5 years in high-stakes healthcare: research infrastructure, clinical design systems, and evidence-based product strategy.",
}

const PDF = "/Ahmed_Razin_Resume.pdf"

type Bullet = { lead?: string; text: string; sub?: string[] }
type Group = { heading?: string; bullets: Bullet[] }
type Role = {
  org: string
  orgUrl?: string
  role: string
  dates: string
  meta: string
  groups: Group[]
}

const experience: Role[] = [
  {
    org: "University of Rochester Medical Center",
    orgUrl: "https://www.urmc.rochester.edu",
    role: "UX Designer",
    dates: "Jan 2021 – Present",
    meta: "Rochester, NY · 30,000-person academic health system · 1.2M patients across Western New York",
    groups: [
      {
        heading: "Established UX research as an organizational discipline",
        bullets: [
          {
            text: "Served as the web team's lead UX research authority, defining research and design process standards and shaping product direction across engineering, web strategy, and clinical teams.",
          },
          {
            lead: "Built the team's UX research function from the ground up.",
            text: " Presented leadership with a framework that converted subjective findings into defensible numerical scores. Weighted Impact Scores (Sentiment × Severity) turned research from a soft input into a product-direction mechanism.",
          },
          {
            lead: "Designed and executed a 4-hypothesis A/B research study",
            text: " on provider search and discovery: 11 participants, 268 coded observations, Maze click-tracking, and session recording, producing outcome metrics that sped up development by raising confidence in decisions.",
            sub: [
              "Swung provider-profile sentiment from −2 to +15 (a 17-point gain) by diagnosing a visual-hierarchy failure and solving it with a targeted header redesign.",
              "+10.3% filter engagement and +5.9% downstream profile clicks by redesigning filter labels and groupings to match patient mental models, not internal clinical taxonomies.",
              "Caught a divergence between positive behavioral analytics and weak qualitative satisfaction, triangulating both in Looker Studio to prevent a false-positive product decision.",
            ],
          },
        ],
      },
      {
        heading: "Rebuilt and scaled the clinical design system org-wide",
        bullets: [
          {
            lead: "Designed a 70-component production UI library",
            text: " across 6 clinical flows (navigation, provider discovery, location & search, condition search, and utilities), documented at full fidelity across 4 responsive breakpoints and built on 13 design-token foundations, including a WCAG AA/AAA palette engineered for older users navigating care under stress.",
          },
          {
            lead: "Secured executive buy-in",
            text: " by reframing the conversation around the development-efficiency cost of design and engineering working from different sources of truth.",
          },
          {
            lead: "Scaled the system across platforms,",
            text: " extending it to the School of Medicine with a bespoke pattern library that sharpened student storytelling while preserving clinical brand coherence.",
          },
        ],
      },
      {
        heading: "Hospital and branding redesign project",
        bullets: [
          {
            lead: "Stopped a cosmetic redesign from shipping",
            text: " by correctly diagnosing the problem: administration scoped a visual refresh, but research showed patients were failing navigation, not aesthetics. I shifted the project to an information-architecture overhaul, changing what engineering built.",
          },
          {
            lead: "Led a mixed-methods study",
            text: " (5 moderated interviews plus a survey to 5,500+ recipients) that produced specific IA recommendations: nav labels renamed to patient task language and the global/hospital hierarchy restructured. The relaunched brand site shipped with those structural corrections built in.",
          },
        ],
      },
    ],
  },
  {
    org: "Indoor Buddy",
    role: "UX Designer",
    dates: "May 2019 – Dec 2020",
    meta: "New York, NY · B2B startup · Mobile app and web platform for store-manager operations",
    groups: [
      {
        bullets: [
          {
            lead: "Owned end-to-end UX as the only designer,",
            text: " covering research, information architecture, interaction design, and visual UI across the iOS app and marketing site, from early stage through enterprise demo partnerships.",
          },
          {
            lead: "Conducted 30 in-store intercept interviews",
            text: " at Brooklyn Fare and Gristedes, synthesizing findings into a shopper persona framework that shaped the app's navigation model and value-proposition hierarchy.",
          },
          {
            lead: "Secured and designed two live in-store demo partnerships",
            text: " by redesigning the site to answer the three objections managers raised (unclear ROI, weak proof of shopper interest, thin product explanation), adding conversion metrics, a demo video, and a demo-request CTA.",
          },
          {
            lead: "Diagnosed and resolved two core usability failures",
            text: " in the app, redesigning the navigation and the initial demo menu and validating with Maze, where 79% of participants rated the experience highly valuable.",
          },
          {
            lead: "Rebuilt the marketing website from scratch",
            text: " in HTML, CSS, and Bootstrap, including a scroll-triggered demo video that auto-played in view so store owners saw product proof without seeking it out.",
          },
        ],
      },
    ],
  },
]

const skills: { label: string; items: string }[] = [
  {
    label: "Research Methods",
    items:
      "Moderated & unmoderated usability testing · contextual inquiry · think-aloud protocol · diary studies · surveys · competitive analysis · affinity mapping · hypothesis-driven research · mixed-methods synthesis",
  },
  {
    label: "Design Practice",
    items:
      "Design systems & token architecture · interaction design · information architecture · wireframing · high-fidelity prototyping · visual design · accessibility (WCAG 2.1 AA/AAA) · responsive design (4-breakpoint)",
  },
  {
    label: "AI & Data",
    items:
      "AI-assisted research synthesis (Claude, ChatGPT) · behavioral analytics · quantitative synthesis · Weighted Impact Scoring · HIPAA-compliant research design",
  },
  {
    label: "Collaboration & Process",
    items:
      "Cross-functional stakeholder alignment · executive presentations · design QA & handoff · design critique facilitation · agile workflow · research framework design & documentation",
  },
  {
    label: "Tools",
    items:
      "Figma · FigJam · Airtable · Looker Studio · Maze · Salesforce Marketing Cloud · Microsoft Forms · Miro · Adobe Creative Suite · After Effects · Premiere Pro · Invision",
  },
]

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-xs tracking-widest uppercase text-[#C44B20] mb-6">{children}</p>
  )
}

export default function ResumePage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <FadeIn>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1
                className="text-5xl md:text-6xl text-[#1A1714] leading-[1.05]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Ahmed Razin
              </h1>
              <p className="mt-3 text-lg text-[#C44B20]">UX Designer &amp; Researcher</p>
            </div>
            <a
              href={PDF}
              download
              className="inline-flex w-fit items-center gap-2 rounded-full bg-[#C44B20] px-5 py-2.5 text-sm text-white transition-colors hover:bg-[#a83d19]"
            >
              Download PDF
              <span aria-hidden>↓</span>
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#736E67]">
            <CopyEmail
              email="ahmedrazinux@gmail.com"
              className="cursor-pointer hover:text-[#1A1714] transition-colors"
            />
            <span aria-hidden>·</span>
            <span>(646) 384-7503</span>
            <span aria-hidden>·</span>
            <a
              href="https://linkedin.com/in/ahmrazin"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1A1714] transition-colors"
            >
              linkedin.com/in/ahmrazin
            </a>
            <span aria-hidden>·</span>
            <span>New York, NY</span>
          </div>
        </FadeIn>

        {/* Summary */}
        <FadeInOnScroll>
          <section className="border-t border-[#E5E0D8] mt-12 pt-12">
            <SectionLabel>Summary</SectionLabel>
            <p className="text-lg leading-relaxed text-[#1A1714]">
              UX designer and researcher with 5 years building research infrastructure,
              clinical design systems, and evidence-based product strategy in high-stakes
              healthcare environments. Known for translating ambiguous, politically complex
              problems into design decisions organizations adopt and ship. I work where it
              takes stakeholder navigation, clinical domain fluency, and original research
              judgment: reframing executive misdiagnoses, building quantified research
              frameworks from scratch, and finding cross-functional alignment.
            </p>
          </section>
        </FadeInOnScroll>

        {/* Experience */}
        <FadeInOnScroll>
          <section className="border-t border-[#E5E0D8] mt-12 pt-12">
            <SectionLabel>Experience</SectionLabel>
            <div className="flex flex-col gap-12">
              {experience.map((role) => (
                <div key={role.org}>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h2
                      className="text-xl text-[#1A1714]"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {role.orgUrl ? (
                        <a
                          href={role.orgUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#C44B20] transition-colors"
                        >
                          {role.org}
                        </a>
                      ) : (
                        role.org
                      )}
                      <span className="text-[#736E67]"> · {role.role}</span>
                    </h2>
                    <span className="text-sm text-[#736E67] whitespace-nowrap">
                      {role.dates}
                    </span>
                  </div>
                  <p className="mt-1 text-sm italic text-[#736E67]">{role.meta}</p>

                  <div className="mt-5 flex flex-col gap-6">
                    {role.groups.map((group, gi) => (
                      <div key={gi}>
                        {group.heading && (
                          <h3 className="text-sm font-semibold text-[#1A1714] mb-2">
                            {group.heading}
                          </h3>
                        )}
                        <ul className="flex flex-col gap-2.5 border-l border-[#E5E0D8] pl-5">
                          {group.bullets.map((b, bi) => (
                            <li
                              key={bi}
                              className="text-base leading-relaxed text-[#1A1714]"
                            >
                              {b.lead && (
                                <span className="font-semibold">{b.lead}</span>
                              )}
                              {b.text}
                              {b.sub && (
                                <ul className="mt-2 flex flex-col gap-2 pl-5 list-disc marker:text-[#C44B20]">
                                  {b.sub.map((s, si) => (
                                    <li
                                      key={si}
                                      className="text-[15px] leading-relaxed text-[#57534D] pl-1"
                                    >
                                      {s}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeInOnScroll>

        {/* Skills */}
        <FadeInOnScroll>
          <section className="border-t border-[#E5E0D8] mt-12 pt-12">
            <SectionLabel>Skills</SectionLabel>
            <div className="flex flex-col gap-5">
              {skills.map((group) => (
                <div
                  key={group.label}
                  className="grid gap-1 sm:grid-cols-[200px_1fr] sm:gap-6"
                >
                  <h3 className="text-sm font-semibold text-[#1A1714]">{group.label}</h3>
                  <p className="text-base leading-relaxed text-[#1A1714]">{group.items}</p>
                </div>
              ))}
            </div>
          </section>
        </FadeInOnScroll>

        {/* Education */}
        <FadeInOnScroll>
          <section className="border-t border-[#E5E0D8] mt-12 pt-12">
            <SectionLabel>Education</SectionLabel>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h2
                className="text-xl text-[#1A1714]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                NYU Tandon School of Engineering
              </h2>
              <span className="text-sm text-[#736E67] whitespace-nowrap">
                Sep 2015 – May 2019
              </span>
            </div>
            <p className="mt-1 text-base text-[#1A1714]">
              B.S., Integrated Digital Media.{" "}
              <span className="text-[#736E67]">
                Relevant coursework: User Experience Design, Intro to Web Development.
              </span>
            </p>
          </section>
        </FadeInOnScroll>

        {/* Bottom download */}
        <FadeInOnScroll>
          <div className="border-t border-[#E5E0D8] mt-12 pt-12">
            <a
              href={PDF}
              download
              className="inline-flex items-center gap-2 rounded-full border border-[#C44B20] px-5 py-2.5 text-sm text-[#C44B20] transition-colors hover:bg-[#C44B20] hover:text-white"
            >
              Download PDF
              <span aria-hidden>↓</span>
            </a>
          </div>
        </FadeInOnScroll>
      </div>
    </main>
  )
}
