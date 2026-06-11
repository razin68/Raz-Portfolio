import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { DM_Serif_Display } from "next/font/google"
import { Nav } from "@/components/Nav"
import { BackToTop } from "@/components/BackToTop"
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
  metadataBase: new URL("https://ahmedrazin.me"),
  title: {
    default: "Ahmed Razin: UX Designer & Researcher",
    template: "%s",
  },
  description:
    "UX designer and researcher with 5 years building research infrastructure, clinical design systems, and evidence-based product strategy in high-stakes healthcare.",
  openGraph: {
    title: "Ahmed Razin: UX Designer & Researcher",
    description:
      "Research infrastructure, clinical design systems, and evidence-based product strategy in healthcare.",
    url: "https://ahmedrazin.me",
    siteName: "Ahmed Razin",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Ahmed Razin: UX Designer & Researcher",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Razin: UX Designer & Researcher",
    description:
      "Research infrastructure, clinical design systems, and evidence-based product strategy in healthcare.",
    images: ["/og.png"],
  },
}

export const viewport: Viewport = {
  themeColor: "#F8F5F0",
}

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ahmed Razin",
  jobTitle: "UX Designer & Researcher",
  url: "https://ahmedrazin.me",
  email: "mailto:ahmedrazinux@gmail.com",
  sameAs: ["https://www.linkedin.com/in/ahmrazin"],
  worksFor: {
    "@type": "Organization",
    name: "University of Rochester Medical Center",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "New York",
    addressRegion: "NY",
    addressCountry: "US",
  },
  knowsAbout: [
    "UX Research",
    "Design Systems",
    "Product Design",
    "Healthcare UX",
    "Accessibility",
  ],
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-[#1A1714] focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <Nav />
        <div id="main-content" className="flex-1 flex flex-col">{children}</div>
        <footer className="border-t border-[#E5E0D8] px-6 py-8">
          <div className="max-w-6xl mx-auto flex justify-between items-center text-sm text-[#736E67]">
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
        <BackToTop />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
      </body>
    </html>
  )
}
