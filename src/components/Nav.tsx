"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion"

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const { scrollY } = useScroll()

  // Track elevated style past 12px (nav stays pinned: no hide/reveal).
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 12)
  })

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const links: { href: string; label: string; external?: boolean }[] = [
    { href: "/", label: "Work" },
    { href: "/about", label: "About" },
    { href: "/resume", label: "Resume" },
  ]

  // The home hero is a dark full-bleed photo, use light nav text over it
  // until the user scrolls (when the nav gains its solid background).
  const onDark = pathname === "/" && !scrolled

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-[#F8F5F0] border-b border-[#E5E0D8]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className={`font-serif text-base transition-opacity hover:opacity-70 ${
            onDark ? "text-white" : "text-[#1A1714]"
          }`}
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Ahmed Razin
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-8">
          {links.map(({ href, label, external }) =>
            external ? (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative text-sm transition-colors ${
                  onDark ? "text-white/75 hover:text-white" : "text-[#736E67] hover:text-[#1A1714]"
                }`}
              >
                {label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#C44B20] transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-x-100" />
              </a>
            ) : (
              <Link
                key={href}
                href={href}
                className={`group relative text-sm transition-colors ${
                  pathname === href
                    ? onDark
                      ? "text-white"
                      : "text-[#1A1714]"
                    : onDark
                      ? "text-white/75 hover:text-white"
                      : "text-[#736E67] hover:text-[#1A1714]"
                }`}
              >
                {label}
                {pathname === href ? (
                  <motion.span
                    layoutId="nav-underline"
                    className={`absolute -bottom-1 left-0 h-px w-full ${onDark ? "bg-white" : "bg-[#1A1714]"}`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ) : (
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#C44B20] transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-x-100" />
                )}
              </Link>
            )
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className={`sm:hidden -mr-1 p-3 ${onDark ? "text-white" : "text-[#1A1714]"}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <div className="w-5 flex flex-col gap-1">
            <span
              className={`block h-px bg-current transition-transform origin-center ${menuOpen ? "rotate-45 translate-y-[4px]" : ""}`}
            />
            <span
              className={`block h-px bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px bg-current transition-transform origin-center ${menuOpen ? "-rotate-45 -translate-y-[4px]" : ""}`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="sm:hidden overflow-hidden bg-[#F8F5F0] border-t border-[#E5E0D8]"
          >
            <div className="px-6 py-3 flex flex-col gap-1">
              {links.map(({ href, label, external }) =>
                external ? (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 text-base text-[#736E67]"
                  >
                    {label}
                  </a>
                ) : (
                  <Link
                    key={href}
                    href={href}
                    className={`py-2 text-base ${pathname === href ? "text-[#1A1714]" : "text-[#736E67]"}`}
                  >
                    {label}
                  </Link>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
