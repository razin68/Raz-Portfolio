import sharp from "sharp"
import { writeFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const __dirname = dirname(fileURLToPath(import.meta.url))
const appDir = join(__dirname, "..", "src", "app")
const SRC = join(__dirname, "..", "..", "Logo Square.png")

const TILE = 512
const RADIUS = 104 // ~20% rounded square
const INK = "#1A1714"
// Stat-box shade (case-study lead): Tailwind amber-100 -> orange-200.
const STAT_FROM = "#fef3c7"
const STAT_TO = "#fed7aa"

// 1. Trim the mark to its bounding box, then recolor black -> ink by
//    clipping a solid ink layer to the mark's alpha (matches the dark
//    stat-box text on the pale tile).
const trimmed = await sharp(SRC).trim().ensureAlpha().toBuffer({ resolveWithObject: true })
const { width: mw, height: mh } = trimmed.info

const inkMark = await sharp(trimmed.data)
  .composite([
    {
      input: { create: { width: mw, height: mh, channels: 4, background: INK } },
      blend: "in",
    },
  ])
  .png()
  .toBuffer()

// 2. Fit the mark into the tile with padding (mark spans ~62% of the tile).
const inner = Math.round(TILE * 0.62)
const fittedMark = await sharp(inkMark)
  .resize(inner, inner, { fit: "inside", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .toBuffer()

// 3. Rounded pale stat-box gradient with a faint ink edge so the light tile
//    still reads against light browser chrome.
const tileSvg = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${TILE}" height="${TILE}">
     <defs>
       <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
         <stop offset="0" stop-color="${STAT_FROM}"/>
         <stop offset="1" stop-color="${STAT_TO}"/>
       </linearGradient>
     </defs>
     <rect width="${TILE}" height="${TILE}" rx="${RADIUS}" ry="${RADIUS}" fill="url(#g)"/>
     <rect x="5" y="5" width="${TILE - 10}" height="${TILE - 10}" rx="${RADIUS - 5}" ry="${RADIUS - 5}" fill="none" stroke="${INK}" stroke-opacity="0.1" stroke-width="6"/>
   </svg>`
)

const master = await sharp(tileSvg)
  .composite([{ input: fittedMark, gravity: "center" }])
  .png()
  .toBuffer()

// 4. Emit the PNG icons used by the App Router metadata conventions.
await sharp(master).resize(180, 180).png().toFile(join(appDir, "apple-icon.png"))
await sharp(master).resize(512, 512).png().toFile(join(appDir, "icon.png"))

// 5. Build a multi-resolution favicon.ico (PNG-encoded entries: 16/32/48).
const sizes = [16, 32, 48]
const pngs = await Promise.all(
  sizes.map((s) => sharp(master).resize(s, s).png().toBuffer())
)

const header = Buffer.alloc(6)
header.writeUInt16LE(0, 0) // reserved
header.writeUInt16LE(1, 2) // type: icon
header.writeUInt16LE(sizes.length, 4)

const entries = []
let offset = 6 + 16 * sizes.length
pngs.forEach((png, i) => {
  const e = Buffer.alloc(16)
  e.writeUInt8(sizes[i] >= 256 ? 0 : sizes[i], 0) // width
  e.writeUInt8(sizes[i] >= 256 ? 0 : sizes[i], 1) // height
  e.writeUInt8(0, 2) // palette
  e.writeUInt8(0, 3) // reserved
  e.writeUInt16LE(1, 4) // planes
  e.writeUInt16LE(32, 6) // bpp
  e.writeUInt32LE(png.length, 8)
  e.writeUInt32LE(offset, 12)
  offset += png.length
  entries.push(e)
})

const ico = Buffer.concat([header, ...entries, ...pngs])
writeFileSync(join(appDir, "favicon.ico"), ico)

console.log("favicon.ico, icon.png, apple-icon.png written to", appDir)
console.log("mark bbox", mw, "x", mh, "inner", inner)
