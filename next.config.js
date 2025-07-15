/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  // Generate static pages at build time
  trailingSlash: false,
  // Configure output for deployment
  output: "export",
  images: {
    unoptimized: true,
  },
  // Disable static generation for problematic pages
  async generateStaticParams() {
    return [];
  },
};

module.exports = nextConfig;
