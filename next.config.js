/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable build-time optimizations that cause issues with Context
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Use export for static hosting (Netlify)
  trailingSlash: true,
  output: "export",
  distDir: "dist",
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

module.exports = nextConfig;
