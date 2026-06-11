import type { MetadataRoute } from "next"

// Static export emits this as /robots.txt at build time.
export const dynamic = "force-static"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://ahmedrazin.me/sitemap.xml",
    host: "https://ahmedrazin.me",
  }
}
