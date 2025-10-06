/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cloudfix.com',
      },
    ],
  },
}

module.exports = nextConfig
