/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'firebasestorage.googleapis.com',
      'openweathermap.org',
      'img.shields.io',
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
