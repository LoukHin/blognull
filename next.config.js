/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    domains: ['fswd-wp.devnss.com', 'secure.gravatar.com'],
  },
}

module.exports = nextConfig
