"use client"

import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

// Gentle enter transition on every route change (keyed by pathname so it
// also plays when navigating between case studies).
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
