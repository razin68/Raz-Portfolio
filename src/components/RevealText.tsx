"use client"

import { motion, useReducedMotion } from "framer-motion"

type RevealTextProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  /** Animate on mount instead of when scrolled into view. */
  onMount?: boolean
}

// Clip-mask reveal: text slides up from behind a hidden edge.
export function RevealText({ children, className, delay = 0, onMount = false }: RevealTextProps) {
  const reduce = useReducedMotion()

  const inner = {
    hidden: { y: reduce ? 0 : "115%" },
    visible: { y: 0 },
  }

  return (
    <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
      <motion.span
        className={`block ${className ?? ""}`}
        variants={inner}
        initial="hidden"
        {...(onMount
          ? { animate: "visible" }
          : { whileInView: "visible", viewport: { once: true, margin: "-60px" } })}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  )
}
