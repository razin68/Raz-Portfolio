// Content audit: the PhD program placed inside the whole site path
// (homepage -> track -> category -> program), then its breadth of official
// pages, with the student voice nested deepest and faded.
const INK = "#1A1714"
const ACCENT = "#C44B20"
const MUTED = "#8A847D"
const OFFICIAL_FILL = "#EDEDEA"
const OFFICIAL_BORDER = "#DBD6CD"
const LINE = "#D3CEC5"
const SANS = "var(--font-inter)"

const context = [
  { label: "Homepage", role: "HOME", x: 20 },
  { label: "Education", role: "TRACK", x: 48 },
  { label: "Graduate Programs", role: "CATEGORY", x: 76 },
  { label: "PhD Program", role: "PROGRAM", x: 104, root: true },
]
const official = [
  "Admissions",
  "Financial Aid",
  "Curriculum",
  "Requirements",
  "Tuition",
  "Location",
  "News & Events",
  "Faculty, Students & Alumni",
]
const human = ["Student Perspectives", "Personal Growth", "Day in the Life"]

const W = 220
const H = 32
const STEP = 40
const officialX = 140
const humanX = 176

function Pill({
  x, y, label, fill, stroke, strokeOpacity = 1, textFill, bold,
}: {
  x: number; y: number; label: string; fill: string; stroke: string
  strokeOpacity?: number; textFill: string; bold?: boolean
}) {
  return (
    <>
      <rect x={x} y={y} width={W} height={H} rx="9" fill={fill} stroke={stroke} strokeOpacity={strokeOpacity} />
      <text x={x + W / 2} y={y + H / 2} textAnchor="middle" dominantBaseline="central" fontSize="13" fontWeight={bold ? "700" : "400"} fill={textFill}>
        {label}
      </text>
    </>
  )
}

export function AuditMap({ className }: { className?: string }) {
  const ctxY = context.map((_, i) => 130 + i * STEP)
  const programY = ctxY[ctxY.length - 1]
  const officialY = official.map((_, i) => programY + STEP + i * STEP)
  const facultyY = officialY[officialY.length - 1]
  const humanY = human.map((_, i) => facultyY + STEP + i * STEP)
  const captionY = humanY[humanY.length - 1] + H + 42

  return (
    <svg
      viewBox={`0 0 780 ${captionY + 22}`}
      className={className}
      role="img"
      aria-label="The PhD program within the site, and the buried student voice"
      style={{ fontFamily: SANS }}
    >
      <text x="20" y="34" fontSize="25" fontWeight="700" fill={INK}>
        Content audit
      </text>
      <text x="21" y="56" fontSize="13" fill={MUTED}>
        Where one program sits in the site, and where the student voice ends up
      </text>

      {/* Context path: homepage -> track -> category -> program */}
      {context.map((c, i) => {
        const cy = ctxY[i] + H / 2
        return (
          <g key={c.label}>
            {i > 0 && (
              <path
                d={`M${context[i - 1].x + 14} ${ctxY[i - 1] + H} V ${cy} H ${c.x}`}
                fill="none"
                stroke={LINE}
                strokeWidth="1.5"
              />
            )}
            <Pill
              x={c.x}
              y={ctxY[i]}
              label={c.label}
              fill={c.root ? "#34333B" : OFFICIAL_FILL}
              stroke={c.root ? "#34333B" : OFFICIAL_BORDER}
              textFill={c.root ? "#FFFFFF" : MUTED}
              bold={c.root}
            />
            <text x={c.x + W + 12} y={cy} dominantBaseline="central" fontSize="10" fontWeight="700" fill={MUTED} letterSpacing="1">
              {c.role}
            </text>
          </g>
        )
      })}

      {/* Program -> official pages (breadth) */}
      {official.map((label, i) => {
        const cy = officialY[i] + H / 2
        return (
          <g key={label}>
            <path d={`M${context[3].x + 14} ${programY + H} V ${cy} H ${officialX}`} fill="none" stroke={LINE} strokeWidth="1.5" />
            <Pill x={officialX} y={officialY[i]} label={label} fill={OFFICIAL_FILL} stroke={OFFICIAL_BORDER} textFill={MUTED} />
          </g>
        )
      })}

      {/* Faculty -> buried student voice (depth), faded */}
      <g opacity="0.55">
        {human.map((label, i) => {
          const cy = humanY[i] + H / 2
          return (
            <g key={label}>
              <path d={`M${officialX + 14} ${facultyY + H} V ${cy} H ${humanX}`} fill="none" stroke={ACCENT} strokeOpacity="0.5" strokeWidth="1.3" strokeDasharray="3 4" />
              <Pill x={humanX} y={humanY[i]} label={label} fill="rgba(196,75,32,0.10)" stroke={ACCENT} strokeOpacity={0.5} textFill={ACCENT} />
            </g>
          )
        })}
      </g>

      {/* Depth callout */}
      <path d={`M${humanX + W + 22} ${humanY[0]} h10 V ${humanY[2] + H} h-10`} fill="none" stroke={ACCENT} strokeWidth="1.5" />
      <text x={humanX + W + 44} y={humanY[1] + 6} fontSize="15" fontWeight="700" fill={ACCENT}>
        5 clicks deep
      </text>
      <text x={humanX + W + 44} y={humanY[1] + 26} fontSize="12.5" fill={MUTED}>
        and easy to miss
      </text>

      {/* Caption, set well below the map */}
      <text x="20" y={captionY} fontSize="13.5" fill="#57534D">
        The student&apos;s voice sits five clicks from the homepage, faded at the bottom of the tree.
      </text>
    </svg>
  )
}
