"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

// Click to copy the email, with a springy "Copied" confirmation in the accent color.
export function CopyEmail({
  email,
  label,
  className,
}: {
  email: string
  label?: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)
  const reduce = useReducedMotion()

  async function copy(e: React.MouseEvent) {
    e.preventDefault()
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <a
      href={`mailto:${email}`}
      onClick={copy}
      className={className}
      aria-label={`Copy email address ${email}`}
    >
      <motion.span
        key={copied ? "copied" : "idle"}
        initial={reduce ? false : { scale: 0.92, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 520, damping: 15 }}
        className={copied ? "inline-block text-[#C44B20]" : "inline-block"}
      >
        {copied ? "Copied ✓" : label ?? email}
      </motion.span>
    </a>
  )
}
