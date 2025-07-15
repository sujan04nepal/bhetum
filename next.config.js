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
  // Configure ISR (Incremental Static Regeneration)
  async generateBuildId() {
    return "build-" + Date.now();
  },
};

module.exports = nextConfig;
