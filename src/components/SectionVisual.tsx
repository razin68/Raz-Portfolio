// On-brand SVG diagrams for case-study sections that don't have a screenshot.
// Drawn over the project gradient (white cards + ink text + accent highlights).

const INK = "#1A1714"
const ACCENT = "#C44B20"
const MUTED = "#8A847D"
const BORDER = "#E5E0D8"
const CARD = "rgba(255,255,255,0.96)"
const LINE = "#CFC7BB"
const SERIF = "var(--font-serif)"

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 480 270"
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <filter id="sv-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#1A1714" floodOpacity="0.1" />
        </filter>
      </defs>
      {children}
    </svg>
  )
}

function Title({ children }: { children: string }) {
  return (
    <text x="28" y="40" fontSize="16" fill={INK} style={{ fontFamily: SERIF }}>
      {children}
    </text>
  )
}

/* The applicant journey funnel */
function Journey() {
  const steps = [
    { x: 60, n: "1", label: "Coursework" },
    { x: 150, n: "2", label: "Exam prep" },
    { x: 240, n: "3", label: "Shadowing" },
    { x: 330, n: "4", label: "Research" },
    { x: 420, n: "5", label: "Apply" },
  ]
  return (
    <Frame>
      <Title>A long, high-stakes journey</Title>
      <line x1="60" y1="120" x2="420" y2="120" stroke={LINE} strokeWidth="2" />
      {steps.map((s, i) => (
        <g key={s.n}>
          <circle cx={s.x} cy="120" r="14" fill={i === steps.length - 1 ? ACCENT : CARD} stroke={i === steps.length - 1 ? ACCENT : INK} strokeWidth="1.5" />
          <text x={s.x} y="125" textAnchor="middle" fontSize="12" fill={i === steps.length - 1 ? "#FFFFFF" : INK} style={{ fontFamily: SERIF }}>{s.n}</text>
          <text x={s.x} y="150" textAnchor="middle" fontSize="10" fill={MUTED}>{s.label}</text>
        </g>
      ))}
      <line x1="240" y1="120" x2="240" y2="195" stroke={ACCENT} strokeWidth="1.5" strokeDasharray="4 4" />
      <rect x="150" y="195" width="180" height="34" rx="17" fill={ACCENT} opacity="0.1" stroke={ACCENT} strokeWidth="1" />
      <text x="240" y="216" textAnchor="middle" fontSize="11" fill={ACCENT}>answers found off-site</text>
    </Frame>
  )
}

/* Scattered content -> structure */
function Structure() {
  const scattered = [
    { x: 44, y: 78, w: 60, h: 16, r: -6 },
    { x: 120, y: 70, w: 48, h: 16, r: 7 },
    { x: 60, y: 110, w: 52, h: 16, r: 4 },
    { x: 130, y: 120, w: 64, h: 16, r: -5 },
    { x: 48, y: 150, w: 70, h: 16, r: 6 },
    { x: 140, y: 165, w: 44, h: 16, r: -8 },
    { x: 80, y: 188, w: 56, h: 16, r: 3 },
  ]
  return (
    <Frame>
      <Title>Not missing content: missing structure</Title>
      {scattered.map((s, i) => (
        <rect key={i} x={s.x} y={s.y} width={s.w} height={s.h} rx="4" fill={CARD} stroke={BORDER} transform={`rotate(${s.r} ${s.x + s.w / 2} ${s.y + s.h / 2})`} />
      ))}
      <text x="120" y="225" textAnchor="middle" fontSize="10" fill={MUTED}>buried</text>
      {/* arrow */}
      <line x1="220" y1="140" x2="270" y2="140" stroke={ACCENT} strokeWidth="2" />
      <path d="M270 140 l-9 -5 v10 z" fill={ACCENT} />
      {/* structured stack */}
      {[80, 106, 132, 158, 184].map((y, i) => (
        <rect key={y} x="300" y={y} width={i === 0 ? 150 : 130} height="18" rx="4" fill={CARD} stroke={i === 0 ? ACCENT : BORDER} />
      ))}
      <text x="365" y="225" textAnchor="middle" fontSize="10" fill={MUTED}>structured</text>
    </Frame>
  )
}

/* One entry -> many widgets */
function Fanout() {
  const widgets = [
    { x: 320, y: 70 },
    { x: 400, y: 70 },
    { x: 320, y: 112 },
    { x: 400, y: 112 },
    { x: 320, y: 154 },
    { x: 400, y: 154 },
  ]
  return (
    <Frame>
      <Title>One entry, everywhere it&apos;s relevant</Title>
      <rect x="36" y="108" width="120" height="56" rx="12" fill={CARD} stroke={INK} strokeWidth="1.5" filter="url(#sv-shadow)" />
      <text x="96" y="133" textAnchor="middle" fontSize="12" fill={INK} style={{ fontFamily: SERIF }}>1 content</text>
      <text x="96" y="150" textAnchor="middle" fontSize="12" fill={INK} style={{ fontFamily: SERIF }}>entry</text>
      {widgets.map((w, i) => (
        <g key={i}>
          <path d={`M156 136 C 240 136, 250 ${w.y + 14}, ${w.x} ${w.y + 14}`} fill="none" stroke={ACCENT} strokeWidth="1" opacity="0.5" />
          <rect x={w.x} y={w.y} width="64" height="28" rx="6" fill={CARD} stroke={BORDER} />
        </g>
      ))}
      <text x="384" y="205" textAnchor="middle" fontSize="11" fill={MUTED}>18 documented widgets</text>
    </Frame>
  )
}

/* Decisions by opinion */
function Opinion() {
  const chips = ["executive preference", "anecdotal feedback", "one-off observation"]
  return (
    <Frame>
      <Title>Decisions by opinion</Title>
      <rect x="40" y="86" width="180" height="60" rx="16" fill={ACCENT} />
      <path d="M70 146 l0 22 l20 -22 z" fill={ACCENT} />
      <text x="130" y="122" textAnchor="middle" fontSize="14" fill="#FFFFFF" style={{ fontFamily: SERIF }}>&ldquo;I don&apos;t like the blue&rdquo;</text>
      <line x1="232" y1="116" x2="270" y2="116" stroke={INK} strokeWidth="2" />
      <path d="M270 116 l-9 -5 v10 z" fill={INK} />
      {chips.map((c, i) => (
        <rect key={c} x="288" y={78 + i * 40} width="168" height="28" rx="6" fill={CARD} stroke={BORDER} />
      ))}
      {chips.map((c, i) => (
        <text key={c} x="372" y={96 + i * 40} textAnchor="middle" fontSize="10" fill={MUTED}>{c}</text>
      ))}
      <text x="372" y="232" textAnchor="middle" fontSize="10" fill={INK}>every input weighted the same</text>
    </Frame>
  )
}

/* Old interviews -> framework -> new signal */
function Reuse() {
  return (
    <Frame>
      <Title>Old interviews. New signal.</Title>
      {[0, 1, 2].map((i) => (
        <rect key={i} x={46 + i * 8} y={80 + i * 6} width="78" height="96" rx="6" fill={CARD} stroke={BORDER} />
      ))}
      <text x="93" y="196" textAnchor="middle" fontSize="10" fill={MUTED}>past sessions</text>
      <line x1="150" y1="128" x2="186" y2="128" stroke={ACCENT} strokeWidth="2" />
      <path d="M186 128 l-9 -5 v10 z" fill={ACCENT} />
      <rect x="196" y="100" width="96" height="58" rx="10" fill={INK} />
      <text x="244" y="134" textAnchor="middle" fontSize="12" fill="#FFFFFF" style={{ fontFamily: SERIF }}>framework</text>
      <line x1="304" y1="128" x2="340" y2="128" stroke={ACCENT} strokeWidth="2" />
      <path d="M340 128 l-9 -5 v10 z" fill={ACCENT} />
      <line x1="350" y1="186" x2="452" y2="186" stroke={LINE} strokeWidth="1.5" />
      {[34, 52, 24, 64].map((h, i) => (
        <rect key={i} x={356 + i * 24} y={186 - h} width="16" height={h} rx="3" fill={i === 3 ? ACCENT : INK} />
      ))}
      <text x="404" y="206" textAnchor="middle" fontSize="10" fill={MUTED}>scored insight</text>
    </Frame>
  )
}

/* Compounding studies */
function Compounding() {
  const blocks = [
    { x: 56, y: 150, h: 56, label: "Study 1" },
    { x: 186, y: 122, h: 84, label: "Study 2" },
    { x: 316, y: 92, h: 114, label: "Study 3" },
  ]
  return (
    <Frame>
      <Title>Every study compounds</Title>
      {blocks.map((b, i) => (
        <g key={b.label}>
          <rect x={b.x} y={b.y} width="96" height={b.h} rx="10" fill={i === 2 ? ACCENT : CARD} stroke={i === 2 ? ACCENT : BORDER} opacity={i === 2 ? 0.9 : 1} />
          <text x={b.x + 48} y="224" textAnchor="middle" fontSize="10" fill={MUTED}>{b.label}</text>
          {i < blocks.length - 1 && (
            <>
              <line x1={b.x + 96} y1="206" x2={b.x + 130} y2="206" stroke={INK} strokeWidth="1.5" />
              <path d={`M${b.x + 130} 206 l-9 -5 v10 z`} fill={INK} />
            </>
          )}
        </g>
      ))}
      <text x="240" y="58" textAnchor="middle" fontSize="11" fill={MUTED}>not starting from zero each time</text>
    </Frame>
  )
}

/* Four disconnected teams */
function Silos() {
  const blocks = [
    { x: 56, y: 70, title: "Design", sub: "UX · Visual" },
    { x: 272, y: 70, title: "Engineering", sub: "Front · Back" },
    { x: 56, y: 160, title: "Content", sub: "CMS · Editors" },
    { x: 272, y: 160, title: "Product", sub: "Strategy · Roadmap" },
  ]
  return (
    <Frame>
      <Title>Four teams, four sources of truth</Title>
      {blocks.map((b) => (
        <g key={b.title}>
          <rect x={b.x} y={b.y} width="152" height="66" rx="10" fill={CARD} stroke={BORDER} />
          <text x={b.x + 20} y={b.y + 30} fontSize="13" fill={INK} style={{ fontFamily: SERIF }}>{b.title}</text>
          <text x={b.x + 20} y={b.y + 48} fontSize="10" fill={MUTED}>{b.sub}</text>
        </g>
      ))}
      {/* broken connection */}
      <line x1="208" y1="103" x2="272" y2="103" stroke={LINE} strokeWidth="1.5" strokeDasharray="5 5" />
      <line x1="208" y1="193" x2="272" y2="193" stroke={LINE} strokeWidth="1.5" strokeDasharray="5 5" />
      <line x1="132" y1="136" x2="132" y2="160" stroke={LINE} strokeWidth="1.5" strokeDasharray="5 5" />
      <line x1="348" y1="136" x2="348" y2="160" stroke={LINE} strokeWidth="1.5" strokeDasharray="5 5" />
      <g transform="translate(240 148)">
        <circle r="13" fill="#FFFFFF" stroke={ACCENT} strokeWidth="1.5" />
        <line x1="-5" y1="-5" x2="5" y2="5" stroke={ACCENT} strokeWidth="2" />
        <line x1="5" y1="-5" x2="-5" y2="5" stroke={ACCENT} strokeWidth="2" />
      </g>
    </Frame>
  )
}

/* Three-step approach */
function Steps() {
  const cards = [
    { x: 28, n: "1", title: "Problem Framing", tag: "Owned", owned: true },
    { x: 180, n: "2", title: "Token Architecture", tag: "Owned", owned: true },
    { x: 332, n: "3", title: "Engineering Partnership", tag: "Collaboration", owned: false },
  ]
  return (
    <Frame>
      <Title>Two steps I owned, one I shared</Title>
      {cards.map((c, i) => (
        <g key={c.n}>
          <rect x={c.x} y="86" width="120" height="120" rx="12" fill={CARD} stroke={BORDER} filter="url(#sv-shadow)" />
          <text x={c.x + 18} y="124" fontSize="26" fill={INK} opacity="0.25" style={{ fontFamily: SERIF }}>{c.n}</text>
          <text x={c.x + 18} y="156" fontSize="12" fill={INK} style={{ fontFamily: SERIF }}>
            <tspan x={c.x + 18} dy="0">{c.title.split(" ")[0]}</tspan>
            <tspan x={c.x + 18} dy="16">{c.title.split(" ").slice(1).join(" ")}</tspan>
          </text>
          <rect x={c.x + 18} y="178" width={c.owned ? 56 : 92} height="18" rx="9" fill={c.owned ? ACCENT : "rgba(138,132,125,0.18)"} />
          <text x={c.x + 18 + (c.owned ? 28 : 46)} y="191" textAnchor="middle" fontSize="9" fill={c.owned ? "#FFFFFF" : MUTED}>{c.tag}</text>
          {i < cards.length - 1 && (
            <>
              <line x1={c.x + 120} y1="146" x2={c.x + 150} y2="146" stroke={INK} strokeWidth="1.5" />
              <path d={`M${c.x + 150} 146 l-9 -5 v10 z`} fill={INK} />
            </>
          )}
        </g>
      ))}
    </Frame>
  )
}

/* Design token foundation */
function Tokens() {
  const swatches = ["#F1E9DD", INK, ACCENT, MUTED, "#D8CFC2"]
  const cells = [0, 1, 2, 3, 4, 5]
  return (
    <Frame>
      <Title>The foundation</Title>
      {swatches.map((c, i) => (
        <circle key={i} cx={56 + i * 30} cy="86" r="12" fill={c} stroke={BORDER} />
      ))}
      <text x="220" y="90" fontSize="11" fill={MUTED}>color</text>
      <text x="56" y="150" fontSize="34" fill={INK} style={{ fontFamily: SERIF }}>Aa</text>
      <text x="110" y="150" fontSize="18" fill={MUTED} style={{ fontFamily: SERIF }}>Aa</text>
      <text x="56" y="172" fontSize="11" fill={MUTED}>type</text>
      {cells.map((i) => (
        <rect key={i} x={250 + (i % 3) * 64} y={110 + Math.floor(i / 3) * 50} width="54" height="40" rx="6" fill={i === 1 ? ACCENT : CARD} stroke={BORDER} />
      ))}
      <text x="340" y="226" textAnchor="middle" fontSize="11" fill={MUTED}>70 components · 13 tokens</text>
    </Frame>
  )
}

/* One system, two platforms */
function Platforms() {
  return (
    <Frame>
      <Title>One system, two platforms</Title>
      <rect x="40" y="108" width="140" height="56" rx="12" fill={INK} filter="url(#sv-shadow)" />
      <text x="110" y="141" textAnchor="middle" fontSize="13" fill="#FFFFFF" style={{ fontFamily: SERIF }}>Design system</text>
      <path d="M180 128 C 240 128, 250 96, 320 96" fill="none" stroke={ACCENT} strokeWidth="1.5" />
      <path d="M180 144 C 240 144, 250 180, 320 180" fill="none" stroke={ACCENT} strokeWidth="1.5" />
      <rect x="320" y="74" width="130" height="46" rx="10" fill={CARD} stroke={BORDER} />
      <text x="385" y="102" textAnchor="middle" fontSize="11" fill={INK}>Patient care</text>
      <rect x="320" y="158" width="130" height="46" rx="10" fill={CARD} stroke={BORDER} />
      <text x="385" y="186" textAnchor="middle" fontSize="11" fill={INK}>Medical school</text>
    </Frame>
  )
}

/* BEFORE states (for the Before/After comparison) */

/* Dense, hierarchy-less admissions copy */
function OldAdmissions() {
  const rows = [44, 64, 84, 104, 170, 190, 210]
  return (
    <Frame>
      {rows.map((y, i) => (
        <rect key={i} x="40" y={y} width={i % 3 === 0 ? 380 : 404} height="9" rx="3" fill={LINE} />
      ))}
      <rect x="150" y="122" width="184" height="40" rx="6" fill={CARD} stroke={BORDER} opacity="0.7" />
      <circle cx="172" cy="142" r="9" fill={MUTED} opacity="0.6" />
      <rect x="190" y="134" width="118" height="6" rx="3" fill={LINE} />
      <rect x="190" y="146" width="84" height="6" rx="3" fill={LINE} />
      <text x="240" y="246" textAnchor="middle" fontSize="11" fill={MUTED}>one buried quote in a wall of copy</text>
    </Frame>
  )
}

/* Provider profile with no specialties anchor */
function OldProfile() {
  return (
    <Frame>
      <rect x="64" y="58" width="352" height="150" rx="12" fill={CARD} stroke={BORDER} />
      <circle cx="112" cy="106" r="26" fill={MUTED} opacity="0.5" />
      <rect x="152" y="88" width="150" height="14" rx="5" fill={INK} opacity="0.85" />
      <rect x="152" y="110" width="90" height="9" rx="4" fill={MUTED} />
      <rect x="88" y="146" width="300" height="42" rx="8" fill="none" stroke={MUTED} strokeWidth="1.5" strokeDasharray="6 5" />
      <text x="238" y="172" textAnchor="middle" fontSize="12" fill={MUTED}>specialties: not surfaced</text>
      <text x="396" y="80" textAnchor="end" fontSize="16" fill={ACCENT} style={{ fontFamily: SERIF }}>−2</text>
    </Frame>
  )
}

/* Inconsistent, duplicated components */
function OldComponents() {
  return (
    <Frame>
      <rect x="50" y="68" width="92" height="34" rx="17" fill={ACCENT} />
      <rect x="172" y="62" width="124" height="46" rx="6" fill={INK} />
      <rect x="322" y="74" width="84" height="26" rx="13" fill="#8FA39A" />
      <rect x="60" y="140" width="112" height="30" rx="4" fill="none" stroke={INK} strokeWidth="1.5" />
      <rect x="200" y="134" width="96" height="42" rx="21" fill={ACCENT} opacity="0.65" />
      <rect x="322" y="150" width="104" height="24" rx="2" fill={MUTED} />
      <text x="152" y="96" fontSize="22" fill={MUTED}>≠</text>
      <text x="304" y="96" fontSize="22" fill={MUTED}>≠</text>
      <text x="240" y="214" textAnchor="middle" fontSize="12" fill={MUTED}>multiple versions · no source of truth</text>
    </Frame>
  )
}

/* Institutional directory, no student presence */
function OldDirectory() {
  const items = [0, 1, 2, 3, 4, 5]
  return (
    <Frame>
      <rect x="58" y="50" width="170" height="172" rx="10" fill={CARD} stroke={BORDER} />
      {items.map((i) => (
        <rect key={i} x="76" y={70 + i * 26} width="134" height="13" rx="4" fill={i === 0 ? ACCENT : LINE} opacity={i === 0 ? 0.5 : 1} />
      ))}
      <rect x="252" y="50" width="170" height="58" rx="8" fill={CARD} stroke={BORDER} />
      <rect x="252" y="118" width="170" height="48" rx="8" fill={CARD} stroke={BORDER} />
      <rect x="252" y="174" width="170" height="48" rx="8" fill={CARD} stroke={BORDER} />
      <text x="240" y="248" textAnchor="middle" fontSize="11" fill={MUTED}>institutional structure over student experience</text>
    </Frame>
  )
}

/* A scored framework catches the wrong feature before a sprint */
function Direction() {
  const RED = "#C0392B"
  const items = [
    { y: 78, pass: true },
    { y: 120, pass: false },
    { y: 162, pass: true },
  ]
  return (
    <Frame>
      <Title>Caught before the sprint</Title>
      {items.map((it, i) => (
        <g key={i}>
          <rect x="36" y={it.y} width="92" height="30" rx="6" fill={CARD} stroke={BORDER} />
          <rect x="48" y={it.y + 9} width="44" height="5" rx="2.5" fill={LINE} />
          <rect x="48" y={it.y + 18} width="64" height="5" rx="2.5" fill={LINE} />
          <line x1="128" y1={it.y + 15} x2="200" y2={it.y + 15} stroke={LINE} strokeWidth="1.5" />
        </g>
      ))}
      <rect x="200" y="70" width="60" height="128" rx="12" fill={INK} filter="url(#sv-shadow)" />
      <text
        x="230"
        y="138"
        textAnchor="middle"
        fontSize="11"
        fill="#FFFFFF"
        style={{ fontFamily: SERIF }}
        transform="rotate(-90 230 138)"
      >
        framework
      </text>
      {items.map((it, i) =>
        it.pass ? (
          <g key={i}>
            <line x1="260" y1={it.y + 15} x2="362" y2={it.y + 15} stroke={ACCENT} strokeWidth="2" />
            <path d={`M362 ${it.y + 15} l-9 -5 v10 z`} fill={ACCENT} />
            <rect x="370" y={it.y} width="74" height="30" rx="6" fill={CARD} stroke={ACCENT} />
            <text x="407" y={it.y + 19} textAnchor="middle" fontSize="10" fill={INK}>build</text>
          </g>
        ) : (
          <g key={i}>
            <line
              x1="260"
              y1={it.y + 15}
              x2="330"
              y2={it.y + 15}
              stroke={RED}
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <g transform={`translate(350 ${it.y + 15})`}>
              <circle r="14" fill="#FFFFFF" stroke={RED} strokeWidth="1.5" />
              <line x1="-5" y1="-5" x2="5" y2="5" stroke={RED} strokeWidth="2" />
              <line x1="5" y1="-5" x2="-5" y2="5" stroke={RED} strokeWidth="2" />
            </g>
          </g>
        )
      )}
      <text x="240" y="234" textAnchor="middle" fontSize="10" fill={MUTED}>
        the feature users didn&apos;t need, stopped
      </text>
    </Frame>
  )
}

/* A number makes the decision stick */
function Decision() {
  return (
    <Frame>
      <Title>A number decisions stick to</Title>
      <rect x="46" y="92" width="118" height="92" rx="16" fill={ACCENT} filter="url(#sv-shadow)" />
      <text x="105" y="150" textAnchor="middle" fontSize="40" fill="#FFFFFF" style={{ fontFamily: SERIF }}>
        +17
      </text>
      <text x="105" y="204" textAnchor="middle" fontSize="10" fill={MUTED}>
        weighted score
      </text>
      <line x1="176" y1="138" x2="232" y2="138" stroke={INK} strokeWidth="2" />
      <path d="M232 138 l-9 -5 v10 z" fill={INK} />
      <rect x="250" y="100" width="186" height="76" rx="12" fill={CARD} stroke={INK} strokeWidth="1.5" />
      <text x="343" y="136" textAnchor="middle" fontSize="13" fill={INK} style={{ fontFamily: SERIF }}>
        Roadmap decision
      </text>
      <g transform="translate(343 150)">
        <rect x="-11" y="0" width="22" height="16" rx="3" fill={ACCENT} />
        <path d="M-6 0 v-4 a6 6 0 0 1 12 0 v4" fill="none" stroke={ACCENT} strokeWidth="2.5" />
      </g>
      <text x="343" y="204" textAnchor="middle" fontSize="10" fill={MUTED}>
        harder to reverse
      </text>
    </Frame>
  )
}

/* One fragmented system cascading into three downstream costs */
function Cascade() {
  const cards = [
    { y: 54, label: "Search friction" },
    { y: 116, label: "Slow release" },
    { y: 178, label: "Loss of trust" },
  ]
  return (
    <Frame>
      <Title>What a fragmented system costs</Title>
      {/* fragmented source: mismatched, misaligned components */}
      <g>
        <rect x="40" y="112" width="68" height="20" rx="4" fill={CARD} stroke={BORDER} transform="rotate(-5 74 122)" />
        <rect x="48" y="138" width="56" height="20" rx="4" fill={CARD} stroke={ACCENT} transform="rotate(6 76 148)" />
        <rect x="40" y="164" width="72" height="20" rx="4" fill={CARD} stroke={BORDER} transform="rotate(-3 76 174)" />
        <text x="74" y="204" textAnchor="middle" fontSize="10" fill={MUTED}>Fragmented system</text>
      </g>
      {/* connectors fanning out to each cost */}
      {[77, 139, 201].map((ty, i) => (
        <path
          key={i}
          d={`M114 148 C 215 148, 212 ${ty}, 300 ${ty}`}
          fill="none"
          stroke={ACCENT}
          strokeWidth="1.5"
          opacity="0.45"
        />
      ))}
      {/* cost cards */}
      {cards.map((c, i) => {
        const cy = c.y + 23
        return (
          <g key={c.label}>
            <rect x="300" y={c.y} width="152" height="46" rx="10" fill={CARD} stroke={BORDER} filter="url(#sv-shadow)" />
            {i === 0 && (
              <g stroke={ACCENT} strokeWidth="1.6" fill="none" strokeLinecap="round">
                <circle cx="320" cy={cy - 1} r="5" />
                <line x1="324" y1={cy + 3} x2="328" y2={cy + 7} />
              </g>
            )}
            {i === 1 && (
              <g stroke={ACCENT} strokeWidth="1.6" fill="none" strokeLinecap="round">
                <circle cx="321" cy={cy} r="6" />
                <line x1="321" y1={cy} x2="321" y2={cy - 3.5} />
                <line x1="321" y1={cy} x2="324.5" y2={cy + 1} />
              </g>
            )}
            {i === 2 && (
              <g stroke={ACCENT} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <line x1="321" y1={cy - 6} x2="321" y2={cy + 5} />
                <path d={`M321 ${cy + 6} l-3 -4 M321 ${cy + 6} l3 -4`} />
              </g>
            )}
            <text x="338" y={cy + 4} fontSize="12" fill={INK} style={{ fontFamily: SERIF }}>
              {c.label}
            </text>
          </g>
        )
      })}
    </Frame>
  )
}

/* Big widgets held; the small pieces drifted out of sync */
function Drift() {
  return (
    <Frame>
      <Title>The small pieces drifted, the big ones held</Title>
      {/* large widgets: identical, consistent */}
      <text x="28" y="74" fontSize="10" fill={MUTED}>
        Large widgets · consistent
      </text>
      {[168, 268, 368].map((x) => (
        <g key={x}>
          <rect x={x} y="82" width="84" height="52" rx="8" fill={CARD} stroke={BORDER} />
          <rect x={x + 9} y="90" width="66" height="18" rx="4" fill="rgba(138,132,125,0.18)" />
          <rect x={x + 9} y="114" width="46" height="5" rx="2.5" fill={LINE} />
          <rect x={x + 9} y="123" width="58" height="5" rx="2.5" fill={LINE} />
        </g>
      ))}
      {/* divider */}
      <line x1="40" y1="158" x2="452" y2="158" stroke={BORDER} strokeDasharray="4 4" />
      {/* small pieces: every one different */}
      <text x="28" y="180" fontSize="10" fill={MUTED}>
        Small pieces · inconsistent
      </text>
      <rect x="168" y="176" width="58" height="22" rx="11" fill="none" stroke={BORDER} />
      <rect x="238" y="174" width="52" height="24" rx="3" fill={ACCENT} />
      <rect x="302" y="178" width="62" height="20" rx="10" fill={CARD} stroke={ACCENT} filter="url(#sv-shadow)" />
      <rect x="378" y="176" width="42" height="22" rx="2" fill="#34333B" />
      <rect x="168" y="208" width="68" height="20" rx="6" fill="rgba(196,75,32,0.16)" />
      <rect x="248" y="210" width="40" height="18" rx="9" fill="none" stroke={MUTED} strokeWidth="1.4" strokeDasharray="3 3" />
      <rect x="300" y="206" width="56" height="24" rx="12" fill="#8FA39A" />
      <text x="372" y="224" fontSize="15" fill={MUTED}>
        &ne;
      </text>
    </Frame>
  )
}

const VARIANTS: Record<string, () => React.ReactNode> = {
  journey: Journey,
  direction: Direction,
  decision: Decision,
  cascade: Cascade,
  drift: Drift,
  "old-admissions": OldAdmissions,
  "old-profile": OldProfile,
  "old-components": OldComponents,
  "old-directory": OldDirectory,
  structure: Structure,
  fanout: Fanout,
  opinion: Opinion,
  reuse: Reuse,
  compounding: Compounding,
  silos: Silos,
  steps: Steps,
  tokens: Tokens,
  platforms: Platforms,
}

export function SectionVisual({ variant, className }: { variant: string; className?: string }) {
  const Component = VARIANTS[variant]
  if (!Component) return null
  return (
    <div className={`pointer-events-none ${className ?? ""}`}>
      <Component />
    </div>
  )
}
