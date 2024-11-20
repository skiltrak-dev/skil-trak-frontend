const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
// const customJestConfig = {
//   // Test environment setup
//   setupFilesAfterEnv: [
//     "<rootDir>/jest.setup.js",
//   ],
//   testEnvironment: "jest-environment-jsdom",

//   // Module paths and aliases
//   moduleDirectories: ["node_modules", "<rootDir>"],
//   moduleNameMapper: {
//     // Update these paths according to your project structure
//     "^@components(.*)$": "<rootDir>/components$1",


//     // Add other aliases as needed
//     "^@partials(.*)$": "<rootDir>/partials$1",
//     "^@/(.*)$": "<rootDir>$1",

//     '\\.css$': 'identity-obj-proxy',

//     // Handle CSS imports
//     // "^.+\\.(css|sass|scss)$": "identity-obj-proxy",

//     // Handle image imports
//     "^.+\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js"
//   },

//   // Test patterns
//   testMatch: [
//     "**/__tests__/**/*.[jt]s?(x)",
//     "**/?(*.)+(spec|test).[jt]s?(x)"
//   ],
//   testPathIgnorePatterns: [
//     "<rootDir>/.next/",
//     "<rootDir>/node_modules/",
//     "<rootDir>/coverage/",
//     "<rootDir>/dist/"
//   ],

//   // Coverage settings
//   collectCoverage: true,
//   collectCoverageFrom: [
//     "**/(components|partials)/**/*.{js,jsx,ts,tsx}",
//     "!**/*.stories.{js,jsx,ts,tsx}",
//     "!**/*.styles.{js,jsx,ts,tsx}",
//     "!**/node_modules/**",
//     "!**/.next/**"
//   ],
//   coverageDirectory: "coverage",
//   coverageReporters: ["text", "lcov", "json", "html"],
//   coverageThreshold: {
//     global: {
//       branches: 80,
//       functions: 80,
//       lines: 80,
//       statements: 80
//     }
//   },

//   // Performance settings
//   maxWorkers: "50%",

//   // Transform settings
//   transform: {
//     "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
//     // Handle TypeScript files
//     '^.+\\.(ts|tsx)$': ['ts-jest', {
//       tsconfig: '<rootDir>/tsconfig.json',
//     }],
//     // Handle JavaScript files
//     '^.+\\.(ts|tsx)$': ['babel-jest', {}],
//   },

//   // Important for Next.js
//   transformIgnorePatterns: [
//     "/node_modules/",
//     "^.+\\.module\\.(css|sass|scss)$"
//   ],

//   // Environment variables
//   globals: {
//     "ts-jest": {
//       // tsconfig: "tsconfig.jest.json"
//       tsconfig: "<rootDir>/tsconfig.json"
//     }
//   },
//   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],


//   // Verbose output
//   verbose: true,

//   // Clear mocks between every test
//   clearMocks: true,

//   // Automatically reset mock state
//   resetMocks: true,

//   // Automatically restore mock state between every test
//   restoreMocks: true,

//   // Watch plugins
//   // watchPlugins: [
//   //   "jest-watch-typeahead/filename",
//   //   "jest-watch-typeahead/testname"
//   // ]
// };

const customJestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@components(.*)$': '<rootDir>/components$1',
    '^@utils(.*)$': '<rootDir>/utils$1',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  clearMocks: true,
  coverageDirectory: "coverage",
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);