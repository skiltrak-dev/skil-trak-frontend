/** @type {import('next').NextConfig} */
const nextConfig = {
    // reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['images.unsplash.com', 'loremflickr.com', 'picsum.photos', 'placeimg.com', 'skiltrak.com.au'],
    },
}

module.exports = nextConfig
