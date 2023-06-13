/** @type {import('tailwindcss').Config} */

const colors = {
    primary: {
        DEFAULT: 'var(--theme-primary-default)',
        dark: 'var(--theme-primary-dark)',
        light: 'var(--theme-primary-light)',
    },

    secondary: {
        DEFAULT: 'var(--theme-secondary-default)',
        dark: 'var(--theme-secondary-dark)',
        light: 'var(--theme-secondary-light)',
    },

    success: {
        DEFAULT: 'var(--theme-success-default)',
        dark: 'var(--theme-success-dark)',
        light: 'var(--theme-success-light)',
    },

    info: {
        DEFAULT: 'var(--theme-info-default)',
        dark: 'var(--theme-info-dark)',
        light: 'var(--theme-info-light)',
    },

    error: {
        DEFAULT: 'var(--theme-error-default)',
        dark: 'var(--theme-error-dark)',
        light: 'var(--theme-error-light)',
    },

    link: {
        DEFAULT: 'var(--theme-link-default)',
        dark: 'var(--theme-link-dark)',
        light: 'var(--theme-link-light)',
    },

    typography: {
        DEFAULT: 'var(--theme-text-base)',
        light: 'var(--theme-text-secondary)',
        dark: 'var(--theme-text-dark)',
    },

    muted: {
        DEFAULT: 'var(--theme-text-muted)',
        dark: 'var(--theme-text-muted-dark)',
    },
}

module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './layouts/**/*.{js,ts,jsx,tsx}',
        './partials/**/*.{js,ts,jsx,tsx}',
        './cypress/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                ...colors,
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(5px)' },
                    '50%': { transform: 'translateY(0px)' },
                },
            },
            animation: {
                float: 'float 3s ease-in-out infinite',
            },
            boxShadow: {
                'inner-image': 'inset 0 1px 4px rgba(0, 0, 0, 0.3)',
            },
        },
    },
    plugins: [],
}
