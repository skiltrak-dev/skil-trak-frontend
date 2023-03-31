/** @type {import('next').NextConfig} */
const nextConfig = {
    // reactStrictMode: true,
    swcMinify: true,
    images: {
        unoptimized: true,
        domains: [
            'images.unsplash.com',
            'loremflickr.com',
            'picsum.photos',
            'placeimg.com',
            'skiltrak-dev.s3.amazonaws.com',
            'skiltrak.com.au',
            'www.skiltrak.com.au',
            'skiltrak-dev.s3.ap-southeast-2.amazonaws.com',
            'hivedinn.s3.amazonaws.com',
            'skiltrak.org',
        ],
    },
}

module.exports = nextConfig
