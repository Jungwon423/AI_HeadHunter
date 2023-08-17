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
    minimumCacheTTL: 31536000,
    // formats: ['image/webp'],
    output: 'standalone',
  },
  reactStrictMode: false,
  swcMinify: true,
}

module.exports = nextConfig
