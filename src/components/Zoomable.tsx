"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { imgDims } from "@/lib/imageMeta"

type ZoomableProps = {
  src: string
  alt: string
  imgClassName?: string
}

// Inline image that opens a full-screen, pannable view on tap. Built for the
// dense artifacts (Airtable base, library board, doc breakdown) that are
// unreadable at phone width. On mobile the overlay renders the image wider than
// the viewport so it stays legible and the reader pans; on desktop it fits to
// the screen. Escape and a backdrop tap both close it.
export function Zoomable({ src, alt, imgClassName }: ZoomableProps) {
  const [open, setOpen] = useState(false)
  const dims = imgDims(src)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Zoom: ${alt}`}
        className="group/zoom relative block w-full cursor-zoom-in"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          width={dims?.width}
          height={dims?.height}
          className={imgClassName}
        />
        <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-[#1A1714]/70 px-2.5 py-1 text-[11px] tracking-wide text-white backdrop-blur-sm transition-opacity duration-200 opacity-70 sm:opacity-0 sm:group-hover/zoom:opacity-100">
          Zoom
          <span aria-hidden>⤢</span>
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-center justify-center overflow-auto overscroll-contain bg-black/90 p-4"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={alt}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close zoom"
              className="fixed right-4 top-4 z-[61] flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-2xl leading-none text-white backdrop-blur transition-colors hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              ×
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              onClick={(e) => e.stopPropagation()}
              className="h-auto w-[1200px] max-w-none rounded-lg sm:w-auto sm:max-h-[92vh] sm:max-w-[95vw]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
