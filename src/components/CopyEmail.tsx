"use client"

import { useState } from "react"

// Click to copy the email, with a brief "Copied" confirmation.
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
      {copied ? "Copied ✓" : label ?? email}
    </a>
  )
}
