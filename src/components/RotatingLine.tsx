"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

// Real, rotating bits of personality (pulled from the About page).
const ITEMS = ["riding gravel roads", "shooting street corners", "building research tools"]

export function RotatingLine() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)

  useEffect(() => {
    if (reduce) return
    const t = window.setInterval(() => setI((p) => (p + 1) % ITEMS.length), 2800)
    return () => window.clearInterval(t)
  }, [reduce])

  return (
    <span className="inline-flex items-center gap-1.5">
      <span>Currently</span>
      <span className="relative inline-flex h-[1.25em] items-center overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={i}
            initial={reduce ? false : { y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: "-110%", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="whitespace-nowrap text-[#1A1714]"
          >
            {ITEMS[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  )
}
