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
}: {
  children: React.ReactNode
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}
