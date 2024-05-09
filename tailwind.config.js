/** @type {import('tailwindcss').Config} */

const colors = {
    primary: {
        DEFAULT: 'var(--theme-primary-default)',
        dark: 'var(--theme-primary-dark)',
        light: 'var(--theme-primary-light)',
    },

    primaryNew: {
        DEFAULT: 'var(--theme-primaryNew-default)',
        dark: 'var(--theme-primaryNew-dark)',
        light: 'var(--theme-primaryNew-light)',
    },

    layout: {
        DEFAULT: 'var(--theme-layout-default)',
        dark: 'var(--theme-layout-dark)',
        light: 'var(--theme-layout-light)',
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

    base: {
        DEFAULT: 'var(--theme-base-default)',
        light: 'var(--theme-base-light)',
        dark: 'var(--theme-base-dark)',
    },

    muted: {
        DEFAULT: 'var(--theme-text-muted)',
        dark: 'var(--theme-text-muted-dark)',
        light: 'var(--theme-text-muted-light)',
    },
}

const maxWidth = {
    'screen-3xl': '1800px',
}

const boxShadow = {
    site: '0px 4px 34px 0px rgba(177, 177, 177, 0.25)',
    profiles: '0px 4px 16px 0px rgba(0, 0, 0, 0.05)',
    'inner-image': 'inset 0 1px 4px rgba(0, 0, 0, 0.3)',
}

module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './layouts/**/*.{js,ts,jsx,tsx}',
        './partials/**/*.{js,ts,jsx,tsx}',
        './cypress/**/*.{js,ts,jsx,tsx}',
        './hooks/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            boxShadow: {
                ...boxShadow,
            },
            maxWidth: {
                ...maxWidth,
            },
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
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
        },
    },
    plugins: [],
}
