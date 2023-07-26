/** @type {import('next').NextConfig} */
const nextConfig = {
    // reactStrictMode: true,
    swcMinify: true,
    images: {
        unoptimized: true,
        domains: [
            'skiltrak.org',
            'placeimg.com',
            'picsum.photos',
            'loremflickr.com',
            'skiltrak.com.au',
            'www.skiltrak.com.au',
            'images.unsplash.com',
            'hivedinn.s3.amazonaws.com',
            'skiltrak-dev.s3.amazonaws.com',
            'skiltrak-dev.s3.ap-southeast-2.amazonaws.com',
        ],
    },
}

module.exports = nextConfig
