/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
    images: {
    domains: ['media.licdn.com', 'pbs.twimg.com', 'www.harborfreight.com'], // Add the hostname(s) you want to allow
  }
}

module.exports = nextConfig
