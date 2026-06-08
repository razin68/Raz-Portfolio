import { SectionVisual } from "@/components/SectionVisual"

type ComparePanel = {
  image?: string
  visual?: string
  caption: string
}

// Side-by-side Before / After comparison. Each panel is a real screenshot
// (shown full size, uncropped) or an on-brand diagram of the prior state.
export function BeforeAfter({
  before,
  after,
  gradient,
  stacked = false,
}: {
  before: ComparePanel
  after: ComparePanel
  gradient: string
  stacked?: boolean
}) {
  const panels = [
    { p: before, label: "Before", accent: false },
    { p: after, label: "After", accent: true },
  ]

  return (
    <div
      className={`grid gap-x-6 gap-y-8 items-start ${
        stacked ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
      }`}
    >
      {panels.map(({ p, label, accent }) => (
        <div key={label} className="flex flex-col gap-3">
          <span
            className={`inline-flex w-fit items-center text-xs tracking-widest uppercase rounded-full px-3 py-1 ${
              accent
                ? "bg-[#C44B20] text-white"
                : "border border-[#E5E0D8] text-[#8A847D]"
            }`}
          >
            {label}
          </span>

          {p.image ? (
            <figure className="overflow-hidden rounded-xl border border-[#E5E0D8] bg-white shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image}
                alt={`${label}: ${p.caption}`}
                loading="lazy"
                className="block w-full h-auto"
              />
            </figure>
          ) : p.visual ? (
            <div className={`relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-gradient-to-br ${gradient}`}>
              <div className="absolute inset-0 mesh opacity-70" />
              <SectionVisual variant={p.visual} className="absolute inset-0" />
              <div className="absolute inset-0 grain-soft" />
            </div>
          ) : null}

          <p className="text-sm text-[#8A847D] leading-relaxed">{p.caption}</p>
        </div>
      ))}
    </div>
  )
}
