"use client"

import { motion, useScroll, useSpring } from "framer-motion"

// Thin terracotta line under the nav that fills as you read the page.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed top-16 left-0 right-0 z-40 h-[2px] origin-left bg-[#C44B20]"
    />
  )
}
