import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { DM_Serif_Display } from "next/font/google"
import { Nav } from "@/components/Nav"
import { CopyEmail } from "@/components/CopyEmail"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Ahmed Razin",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSerifDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-inter)" }}>
        <Nav />
        <div className="flex-1 flex flex-col">{children}</div>
        <footer className="border-t border-[#E5E0D8] px-6 py-8">
          <div className="max-w-6xl mx-auto flex justify-between items-center text-sm text-[#8A847D]">
            <span style={{ fontFamily: "var(--font-serif)" }} className="text-[#1A1714]">
              Ahmed Razin
            </span>
            <div className="flex gap-6">
              <CopyEmail
                email="ahmedrazinux@gmail.com"
                label="Email"
                className="hover:text-[#1A1714] transition-colors cursor-pointer"
              />
              <a
                href="https://linkedin.com/in/ahmrazin"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1A1714] transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
