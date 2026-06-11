// Bespoke SVG thumbnails that abstractly represent each project's content.
// Drawn on top of the card/cover gradient, using the site palette.

const INK = "#1A1714"
const ACCENT = "#C44B20"
const MUTED = "#736E67"
const BORDER = "#E5E0D8"
const CARD = "rgba(255,255,255,0.94)"
const LINE = "#CFC7BB"
const SERIF = "var(--font-serif)"

type ThumbProps = {
  slug: string
  className?: string
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <filter id="thumbShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#1A1714" floodOpacity="0.12" />
        </filter>
      </defs>
      {children}
    </svg>
  )
}

/* ---------- Student Voice System ---------- */
function StudentVoiceThumb() {
  return (
    <Frame>
      {/* Quote mark */}
      <text x="34" y="168" fontSize="170" fill={ACCENT} opacity="0.16" style={{ fontFamily: SERIF }}>
        &ldquo;
      </text>

      {/* Back card (rotated) */}
      <g transform="rotate(-5 230 120)">
        <rect x="158" y="62" width="186" height="108" rx="14" fill={CARD} stroke={BORDER} />
        <circle cx="184" cy="90" r="11" fill={MUTED} />
        <rect x="204" y="82" width="78" height="8" rx="4" fill={INK} opacity="0.75" />
        <rect x="204" y="96" width="44" height="6" rx="3" fill={MUTED} />
        <rect x="178" y="122" width="148" height="7" rx="3.5" fill={LINE} />
        <rect x="178" y="138" width="126" height="7" rx="3.5" fill={LINE} />
        <rect x="178" y="154" width="92" height="7" rx="3.5" fill={LINE} />
      </g>

      {/* Front card */}
      <g filter="url(#thumbShadow)">
        <rect x="92" y="120" width="206" height="126" rx="14" fill="rgba(255,255,255,0.98)" stroke={BORDER} />
        <circle cx="120" cy="150" r="13" fill={ACCENT} />
        <rect x="144" y="142" width="86" height="9" rx="4.5" fill={INK} />
        <rect x="144" y="159" width="50" height="6" rx="3" fill={MUTED} />
        <rect x="112" y="186" width="166" height="7" rx="3.5" fill={LINE} />
        <rect x="112" y="202" width="148" height="7" rx="3.5" fill={LINE} />
        <rect x="112" y="218" width="108" height="7" rx="3.5" fill={LINE} />
      </g>
    </Frame>
  )
}

/* ---------- UX Research Framework ---------- */
function ResearchThumb() {
  const chips = [
    { x: 84, label: "H1", value: "+17", fill: INK },
    { x: 158, label: "H2", value: "+10", fill: INK },
    { x: 232, label: "H3", value: "−21", fill: ACCENT },
  ]
  const bars = [
    { x: 96, h: 46, fill: INK },
    { x: 132, h: 34, fill: MUTED },
    { x: 168, h: 60, fill: ACCENT },
  ]
  return (
    <Frame>
      <g filter="url(#thumbShadow)">
        <rect x="64" y="58" width="272" height="184" rx="16" fill={CARD} stroke={BORDER} />
      </g>

      {/* Formula */}
      <text x="86" y="88" fontSize="14" fill={MUTED} letterSpacing="0.5" style={{ fontFamily: SERIF }}>
        Sentiment × Severity
      </text>

      {/* Hypothesis chips */}
      {chips.map((c) => (
        <g key={c.label}>
          <rect x={c.x} y="100" width="68" height="40" rx="9" fill={c.fill} />
          <text x={c.x + 12} y="116" fontSize="9" fill="#FFFFFF" opacity="0.7" letterSpacing="0.5">
            {c.label}
          </text>
          <text x={c.x + 12} y="132" fontSize="15" fill="#FFFFFF" style={{ fontFamily: SERIF }}>
            {c.value}
          </text>
        </g>
      ))}

      {/* Impact bar chart */}
      <line x1="86" y1="214" x2="314" y2="214" stroke={BORDER} strokeWidth="1.5" />
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={214 - b.h} width="20" height={b.h} rx="4" fill={b.fill} />
      ))}

      {/* Sentiment scale on the right */}
      <line x1="214" y1="196" x2="314" y2="196" stroke={BORDER} strokeWidth="1.5" />
      <circle cx="288" cy="196" r="5" fill={ACCENT} />
      <text x="210" y="214" fontSize="9" fill={MUTED}>−3</text>
      <text x="306" y="214" fontSize="9" fill={MUTED}>+3</text>
    </Frame>
  )
}

/* ---------- Healthcare Design Library ---------- */
function DesignLibraryThumb() {
  const swatches = [
    { x: 92, fill: "#F1E9DD" },
    { x: 120, fill: INK },
    { x: 148, fill: ACCENT },
    { x: 176, fill: MUTED },
    { x: 204, fill: "#D8CFC2" },
  ]
  const cells = [
    { x: 84, y: 168, fill: "rgba(255,255,255,0.9)" },
    { x: 128, y: 168, fill: ACCENT },
    { x: 172, y: 168, fill: "rgba(255,255,255,0.9)" },
    { x: 216, y: 168, fill: "rgba(255,255,255,0.9)" },
    { x: 84, y: 204, fill: "rgba(255,255,255,0.9)" },
    { x: 128, y: 204, fill: "rgba(255,255,255,0.9)" },
    { x: 172, y: 204, fill: INK },
    { x: 216, y: 204, fill: "rgba(255,255,255,0.9)" },
  ]
  return (
    <Frame>
      <g filter="url(#thumbShadow)">
        <rect x="62" y="54" width="276" height="192" rx="16" fill={CARD} stroke={BORDER} />
      </g>

      {/* Color tokens */}
      {swatches.map((s) => (
        <circle key={s.x} cx={s.x} cy="88" r="11" fill={s.fill} stroke={BORDER} strokeWidth="1" />
      ))}
      <text x="232" y="92" fontSize="11" fill={MUTED} letterSpacing="0.5">Tokens</text>

      {/* Button component */}
      <rect x="84" y="118" width="94" height="30" rx="15" fill={ACCENT} />
      <rect x="100" y="130" width="62" height="6" rx="3" fill="#FFFFFF" opacity="0.9" />

      {/* Type scale */}
      <text x="200" y="146" fontSize="32" fill={INK} style={{ fontFamily: SERIF }}>Aa</text>
      <text x="246" y="146" fontSize="18" fill={MUTED} style={{ fontFamily: SERIF }}>Aa</text>

      {/* Component grid */}
      {cells.map((c, i) => (
        <rect key={i} x={c.x} y={c.y} width="36" height="28" rx="6" fill={c.fill} stroke={BORDER} strokeWidth="1" />
      ))}
    </Frame>
  )
}

export function ProjectThumb({ slug, className }: ThumbProps) {
  const thumb =
    slug === "student-voice-system" ? (
      <StudentVoiceThumb />
    ) : slug === "ux-research-framework" ? (
      <ResearchThumb />
    ) : slug === "healthcare-design-library" ? (
      <DesignLibraryThumb />
    ) : null

  if (!thumb) return null
  return <div className={`pointer-events-none ${className ?? ""}`}>{thumb}</div>
}
