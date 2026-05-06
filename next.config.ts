import type { NextConfig } from 'next';
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  images: { unoptimized: true },
  experimental: { optimizePackageImports: ['lucide-react', 'framer-motion'] },
};

export default withBundleAnalyzer(nextConfig);
