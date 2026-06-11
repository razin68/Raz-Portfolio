"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

// Appears once the reader is deep in a long page (mostly case studies on
// mobile). 48px target, reduced-motion aware, sits below the nav (z-40 < z-50).
export function BackToTop() {
  const reduce = useReducedMotion()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.25 }}
          onClick={() =>
            window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
          }
          aria-label="Back to top"
          className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-[#E5E0D8] bg-[#F8F5F0]/90 text-[#1A1714] shadow-lg backdrop-blur-md transition-colors hover:border-[#C44B20] hover:text-[#C44B20] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C44B20]"
        >
          <span aria-hidden className="text-lg leading-none">
            ↑
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
