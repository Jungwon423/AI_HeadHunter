/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'lh5.googleusercontent.com',
      'media.tacdn.com',
      'dbscthumb-phinf.pstatic.net',
      'media-cdn.tripadvisor.com',
      'search.pstatic.net',
    ],
    // formats: ['image/webp'],
    // minimumCacheTTL: 31536000,
    // output: 'standalone',
  },
  reactStrictMode: false,
  swcMinify: true,
}

module.exports = nextConfig
