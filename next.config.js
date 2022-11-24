/** @type {import('next').NextConfig} */
const nextConfig = {
    // reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['images.unsplash.com', 'loremflickr.com', 'picsum.photos'],
    },
}

module.exports = nextConfig
