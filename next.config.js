/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  // Disable static generation for problematic routes
  async generateStaticParams() {
    return [];
  },
  // Configure ISR (Incremental Static Regeneration)
  async generateBuildId() {
    return "build-" + Date.now();
  },
};

module.exports = nextConfig;
