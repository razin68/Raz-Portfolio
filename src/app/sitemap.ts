import type { MetadataRoute } from "next"
import { projects } from "@/lib/projects"

const BASE = "https://ahmedrazin.me"

// Static export emits this as /sitemap.xml at build time.
export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/about/`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/resume/`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
  ]

  const work: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE}/work/${p.slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  return [...staticRoutes, ...work]
}
