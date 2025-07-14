/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Force dynamic rendering for pages using client-side context
  async generateStaticParams() {
    return [];
  },
};

module.exports = nextConfig;
