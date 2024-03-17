/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'localhost' },
      { hostname: 'https://paradigm-qbzl.onrender.com/' },
      { hostname: 'loremflickr.com' },
    ],
  },
}

export default nextConfig
