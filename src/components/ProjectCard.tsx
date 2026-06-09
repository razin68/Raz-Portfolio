"use client"

import Link from "next/link"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion"
import type { Project } from "@/lib/projects"
import { ProjectThumb } from "@/components/ProjectThumb"

type ProjectCardProps = {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const reduce = useReducedMotion()

  // Pointer position, normalized 0..1 across the card.
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)

  const springCfg = { stiffness: 150, damping: 18, mass: 0.4 }
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), springCfg)
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), springCfg)

  // Light follows the cursor.
  const lightX = useTransform(mx, [0, 1], ["12%", "88%"])
  const lightY = useTransform(my, [0, 1], ["12%", "88%"])
  const light = useMotionTemplate`radial-gradient(130% 130% at ${lightX} ${lightY}, rgba(255,255,255,0.55), transparent 55%)`

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  function handleLeave() {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: 0.08 * index, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link href={`/work/${project.slug}`} className="group block [perspective:1200px]">
        {/* Card image area */}
        <motion.div
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className={`relative w-full aspect-[4/3] rounded-2xl bg-gradient-to-br ${project.gradient} overflow-hidden mb-4 transition-shadow duration-500 group-hover:shadow-2xl group-hover:shadow-black/15`}
        >
          {project.cover ? (
            /* Real cover image */
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.cover}
              alt={project.title}
              loading="lazy"
              className={`absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-[1.03] ${
                project.coverContain
                  ? "object-contain object-center p-6 sm:p-8"
                  : "object-cover"
              }`}
            />
          ) : (
            <>
              {/* Mesh sheen */}
              <div className="absolute inset-0 mesh" />
              {/* Content thumbnail */}
              <ProjectThumb slug={project.slug} className="absolute inset-0" />
              {/* Cursor light */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: light }}
              />
              {/* Grain */}
              <div className="absolute inset-0 grain-soft" />
            </>
          )}

          {/* Hover CTA */}
          <div
            className="absolute inset-0 flex items-end p-5"
            style={{ transform: "translateZ(35px)" }}
          >
            <span className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#1A1714] bg-[#F8F5F0]/90 backdrop-blur-sm rounded-full px-3.5 py-2 shadow-sm ring-1 ring-black/5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              View case study
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </div>
        </motion.div>

        {/* Card meta */}
        <div className="px-1">
          {(project.tags.length > 0 || project.year) && (
            <div className="flex items-center gap-2 mb-1">
              {project.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="text-xs text-[#8A847D] tracking-wide">
                  {tag}
                </span>
              ))}
              {project.year && (
                <span className="text-xs text-[#8A847D]">
                  {project.tags.length > 0 ? "· " : ""}
                  {project.year}
                </span>
              )}
            </div>
          )}
          <h2 className="text-xl font-medium text-[#1A1714] transition-colors group-hover:text-[#C44B20]">
            {project.title}
          </h2>
          {project.tagline && (
            <p className="text-sm text-[#8A847D] mt-1 leading-relaxed">{project.tagline}</p>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
