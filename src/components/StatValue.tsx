"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "framer-motion"

// Parse a stat string into a single animatable number with surrounding text.
// "275%" -> {prefix:"", num:275, suffix:"%"}; "<3 mo" -> {prefix:"<", num:3, suffix:" mo"}.
// Strings with more than one number (e.g. "2 shipped, 1 killed") don't match and render as-is.
function parse(value: string) {
  const m = value.match(/^(\D*?)(\d[\d,]*(?:\.\d+)?)(\D*)$/)
  if (!m) return null
  const raw = m[2].replace(/,/g, "")
  const decimals = raw.includes(".") ? raw.split(".")[1].length : 0
  return { prefix: m[1], num: parseFloat(raw), suffix: m[3], decimals }
}

function format(prefix: string, n: number, suffix: string, decimals: number) {
  const shown =
    decimals > 0
      ? n.toFixed(decimals)
      : Math.round(n).toLocaleString("en-US")
  return `${prefix}${shown}${suffix}`
}

export function StatValue({ value, className }: { value: string; className?: string }) {
  const reduce = useReducedMotion()
  const parsed = parse(value)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const [display, setDisplay] = useState(() =>
    parsed && !reduce ? format(parsed.prefix, 0, parsed.suffix, parsed.decimals) : value
  )

  useEffect(() => {
    if (!parsed) return
    if (reduce) {
      setDisplay(value)
      return
    }
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const dur = 1100
    const ease = (t: number) => 1 - Math.pow(1 - t, 3)
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur)
      setDisplay(format(parsed.prefix, parsed.num * ease(t), parsed.suffix, parsed.decimals))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce])

  return (
    <span ref={ref} className={className}>
      {parsed ? display : value}
    </span>
  )
}
