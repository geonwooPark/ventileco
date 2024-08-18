/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

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
      'avatars.githubusercontent.com',
      'search1.kakaocdn.net',
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  transpilePackages: ['three'],

  output: 'standalone',

  webpack(config) {
    config.module.rules.push({
      test: /.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}

module.exports = withBundleAnalyzer(nextConfig)
