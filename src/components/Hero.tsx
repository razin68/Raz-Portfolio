"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import { FadeIn } from "@/components/FadeIn"
import { RevealText } from "@/components/RevealText"
import { ScrollCue } from "@/components/ScrollCue"

// As the hero scrolls away, push into the figure (you), fade the headline,
// and lighten the scrim so the person resolves into focus.
export function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 2.3])
  // Pan the image down as it zooms, so the figure drifts toward the bottom.
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "26%"])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -30])
  const scrimOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0.4])

  return (
    <section ref={ref} className="relative min-h-screen flex items-end overflow-hidden">
      {/* Photo: zooms toward the figure (~38% / 30%) on scroll. Responsive
          srcset so large/retina screens get a crisp source. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        src="/personal/shadow-seaport-2000.jpg"
        srcSet="/personal/shadow-seaport-1200.jpg 1200w, /personal/shadow-seaport-2000.jpg 2000w, /personal/shadow-seaport-3000.jpg 3000w"
        sizes="100vw"
        alt="Street photograph by Ahmed Razin, a silhouette in raking light, South Street Seaport, New York"
        fetchPriority="high"
        style={reduce ? undefined : { scale, y: imgY, transformOrigin: "38% 30%" }}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {/* Legibility scrim: lightens as the headline fades */}
      <motion.div
        style={reduce ? undefined : { opacity: scrimOpacity }}
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30"
      />

      <motion.div
        style={reduce ? undefined : { opacity: contentOpacity, y: contentY }}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-20 sm:pb-28 pt-28"
      >
        <FadeIn delay={0.1}>
          <p className="text-xs tracking-widest uppercase text-white/70 mb-6">
            UX Designer · New York
          </p>
        </FadeIn>
        <h1
          className="text-[clamp(2.8rem,7vw,6.5rem)] leading-[1.05] text-white mb-6 max-w-5xl"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          <RevealText onMount delay={0.2}>
            Hi, I&apos;m Ahmed.
          </RevealText>
        </h1>
        <FadeIn delay={0.45}>
          <p className="text-lg text-white/80 max-w-xl leading-relaxed">
            I&apos;m a UX designer and researcher with 5 years building research
            infrastructure, clinical design systems, and evidence-based product strategy
            that teams need to make good calls.
          </p>
        </FadeIn>
        <FadeIn delay={0.6} className="mt-10">
          <ScrollCue />
        </FadeIn>
      </motion.div>

      {/* Photo credit: it's his own street photography */}
      <p className="absolute bottom-5 right-6 z-10 text-[10px] tracking-widest uppercase text-white/45">
        Shadow Seaport · New York, my photo
      </p>
    </section>
  )
}
