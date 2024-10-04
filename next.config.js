/** @type {import('next').NextConfig} */

const nextConfig = {
    // reactStrictMode: true,
    swcMinify: true,
    env: {
        googleDirectionApi: "AIzaSyApOsp5NyUUJyW3vlZtvQ4IYf8urG7rrKA"
    },
    async rewrites() {
        return {
            beforeFiles: [
                // These rewrites are checked after headers/redirects
                // and before all files including _next/public files which
                // allows overriding page files
                {
                    source: '/blogs/:slug/:id',
                    destination: '/blogs/:slug',
                },
            ],
        }
    },
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
    // experimental: {
    //     // reactStrictMode: true,
    //     instrumentationHook: true,
    // },
}
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
    openAnalyzer: false,
})
module.exports = withBundleAnalyzer({})
module.exports = nextConfig
