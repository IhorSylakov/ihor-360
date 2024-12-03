import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd1unuvan7ts7ur.cloudfront.net',
        port: '', // оставьте пустым, если порт не используется
        pathname: '/**', // разрешить любые пути
      },
    ],
  },
};

export default nextConfig;
