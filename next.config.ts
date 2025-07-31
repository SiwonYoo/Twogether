import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fesp-api.koyeb.app',
        port: '',
        pathname: '/market/files/**',
      },
      {
        protocol: 'https',
        hostname: 'fesp-api.koyeb.app',
        port: '',
        pathname: '/market//files/**',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
