"use client"

import { motion, useReducedMotion } from "framer-motion"

type FadeInProps = {
  children: React.ReactNode
  delay?: number
  className?: string
  direction?: "up" | "none"
}

// Expo-out easing gives the reveals a bit more snap and character.
const EASE = [0.16, 1, 0.3, 1] as const

export function FadeIn({ children, delay = 0, className, direction = "up" }: FadeInProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: direction === "up" ? 22 : 0 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export function FadeInOnScroll({
  children,
  className,
  delay = 0,
  duration = 0.7,
  y = 28,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  y?: number
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

// Pull quotes land a touch slower and softer than body copy, so a big
// quote reads like a breath rather than snapping in with the section.
const QUOTE_EASE = [0.22, 1, 0.36, 1] as const

export function QuoteReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.1, delay, ease: QUOTE_EASE }}
    >
      {children}
    </motion.div>
  )
}
