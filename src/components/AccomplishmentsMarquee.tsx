"use client"

import { motion, useReducedMotion } from "framer-motion"

// Short, self-standing standout facts. All true to the work.
const ITEMS = [
  "5 years in healthcare UX",
  "70-component design system",
  "1.2M patients reached",
  "658K provider views",
  "Killed a feature with data",
]

function Row() {
  return (
    <span className="flex shrink-0 items-center">
      {ITEMS.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="px-7 font-medium text-[#F8F5F0]/75">{item}</span>
          <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#C44B20]" />
        </span>
      ))}
    </span>
  )
}

export function AccomplishmentsMarquee() {
  const reduce = useReducedMotion()

  return (
    <section
      aria-label="Selected accomplishments"
      className="relative flex w-full items-center overflow-hidden border-y border-white/10 bg-[#1A1714]"
      style={{ height: "clamp(88px, 11vw, 110px)" }}
    >
      {/* Accessible, non-visual list */}
      <ul className="sr-only">
        {ITEMS.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {reduce ? (
        <div aria-hidden className="w-full overflow-x-auto">
          <div className="flex w-max text-lg sm:text-xl leading-none">
            <Row />
          </div>
        </div>
      ) : (
        // Four identical rows; animating x from -25% to 0% scrolls rightward
        // and loops seamlessly. Linear + constant duration = steady, no scroll response.
        <motion.div
          aria-hidden
          className="flex whitespace-nowrap text-lg sm:text-xl leading-none will-change-transform"
          animate={{ x: ["-25%", "0%"] }}
          transition={{ duration: 36, ease: "linear", repeat: Infinity }}
        >
          <Row />
          <Row />
          <Row />
          <Row />
        </motion.div>
      )}

      {/* Soft edge fades so words enter/leave gracefully */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#1A1714] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#1A1714] to-transparent" />
    </section>
  )
}
