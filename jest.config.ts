import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
})

// Add any custom config to be passed to Jest
const config: Config = {
    coverageProvider: 'v8',
    testEnvironment: 'jsdom',
    // Add more setup options before each test is run
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        '^@components(.*)$': '<rootDir>/components/$1',
        '^@utils/(.*)$': '<rootDir>/utils/$1',
    },
    // moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    // transform: {
    //     '^.+\\.js$': 'babel-jest',
    //     '^.+\\.jsx$': 'babel-jest',
    //     // Add other transformations as needed
    // },
    // transformIgnorePatterns: [
    //     '/node_modules/(?!swiper)', // Adjust the pattern based on your dependencies
    // ],
    // moduleNameMapper: {
    //     'swiper/react': 'swiper/react/swiper-react.js',
    //     'swiper/css': 'swiper/swiper.min.css',
    // },
    transform: {
        '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
        '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/react/babel'] }],
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    // coverageDirectory: '../../coverage/libs/components',
    transformIgnorePatterns: ['node_modules/(?!swiper|ssr-window|dom7)'],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
