/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Configuration for static export
  trailingSlash: true,
  output: "export",
  distDir: "dist",
  images: {
    unoptimized: true,
  },
  // Skip API routes since they don't work with static export
  async rewrites() {
    return [];
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

module.exports = nextConfig;
