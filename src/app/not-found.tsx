import Link from "next/link"

export const metadata = {
  title: "Page not found: Ahmed Razin",
}

export default function NotFound() {
  return (
    <main className="min-h-[70svh] flex flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-xs tracking-widest uppercase text-[#736E67] mb-6">Error 404</p>
      <h1
        className="text-[clamp(2.5rem,7vw,5rem)] leading-[1.1] text-[#1A1714] mb-5"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        This page wandered off.
      </h1>
      <p className="text-lg text-[#736E67] max-w-md leading-relaxed mb-10">
        The link may be old or mistyped. Let&apos;s get you back to the work.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full bg-[#C44B20] px-6 py-3 text-sm text-white transition-colors hover:bg-[#a83d19]"
      >
        Back to work
        <span aria-hidden>&rarr;</span>
      </Link>
    </main>
  )
}
