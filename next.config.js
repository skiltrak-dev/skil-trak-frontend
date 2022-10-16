/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.unsplash.com',
            },
        ],
        domains: ['images.unsplash.com', 'loremflickr.com'],
    },
}

module.exports = nextConfig
