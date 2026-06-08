import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for hosting on DreamHost (plain HTML/CSS/JS in `out/`).
  output: "export",
  // Each route becomes a folder with index.html, which Apache serves cleanly.
  trailingSlash: true,
  // No image optimizer in a static export; ship the images as-is.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
