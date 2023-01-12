/** @type {import('next').NextConfig} */
const nextConfig = {
    // reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [
            'images.unsplash.com',
            'loremflickr.com',
            'picsum.photos',
            'placeimg.com',
            'skiltrak-dev.s3.amazonaws.com',
        ],
    },
}

module.exports = nextConfig
