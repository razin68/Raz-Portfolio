"use client"

import { Magnetic } from "@/components/Magnetic"

// Hero scroll cue that smooth-scrolls to the projects section on click.
export function ScrollCue({ targetId = "projects" }: { targetId?: string }) {
  function handleClick() {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <Magnetic>
      <button
        type="button"
        onClick={handleClick}
        className="group flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
      >
        <span>Some of my projects</span>
        <span className="animate-nudge inline-block transition-transform group-hover:translate-y-0.5">↓</span>
      </button>
    </Magnetic>
  )
}
