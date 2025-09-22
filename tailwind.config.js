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
    profiles2: '0px 1px 16px 0px rgba(0, 0, 0, 0.10)',
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
        './modals/**/*.{js,ts,jsx,tsx}',
    ],
    safelist: [
        'bg-gradient-black-to-white',
        'column-border',
        'rectangle',
        'ourServicesBg',
        'pac-container',
        'animate-float',
        'custom-scrollbar',
        'remove-scrollbar',
        'help-text',
        'row-unchecked',
        'table-row',
        'react-calendar-day-titles',
        'react-calendar-days',
        'react-calendar-day',
        'react-calendar__tile',
        'is-selected',
        'phoneinputwithcountry',
        'react-pdf__Page__annotations',
        'card-bg',
        'arrow-clr',
        'arrow',
        'file-view-icon',
        'file-view-group',
        'file-view-detail',
        'active-nav',
        'hidden-nav',
        'unordered-list',
        'modal-animation',
        'content-editor',
        'list-style-inside',
        'ql-editor',
        'management-portal-bg',
        'remove-text-bg',
        'marker',
        'marker-student',
        'marker-industry',
        'gradient-background',
        'blink',
        'blink-green',
        'blink-yellow',
        'content',
        'small-font',
        // Switch related classes
        'switch',
        'slider',
        'profileSwitch',
        // Table related classes
        'th:first-child',
        'td:first-child',
        'td:last-child',
        'tr[aria-hidden]',
        // Animation related
        'zoomIn',
        // Custom scrollbar related
        'custom-scrollbar::-webkit-scrollbar',
        'custom-scrollbar::-webkit-scrollbar:horizontal',
        'custom-scrollbar::-webkit-scrollbar-track',
        'custom-scrollbar::-webkit-scrollbar-thumb',
        // Input related
        'input[type="checkbox"]:not(.noDefault)',
        'input[type="checkbox"]:checked',
        'input[type="checkbox"]:disabled',
        'input[type="checkbox"]:checked:disabled',
        'input[type="radio"]',
        'input[type="radio"]:checked',
        // States
        'switch input:checked+.slider',
        'switch input:focus+.slider',
        'switch input:checked+.slider:before',
        'profileSwitch input:checked+.slider',
        'profileSwitch input:focus+.slider',
        'profileSwitch input:checked+.slider:before',
        // Hover states
        'file-view-group:hover .file-view-icon',
        'file-view-icon:hover>.file-view-detail',
        'table-row:hover .row-unchecked',
        // Animation keyframes
        'upDown',
        'blink',
        'blink-green',
        'blink-yellow',
        'zoomIn',
    ],
    theme: {
        extend: {
            textShadow: {
                inner: '0 2px 4px #00000040',
            },
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
            animation: {
                blink: 'blink 2s infinite',
            },
            keyframes: {
                blink: {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0 },
                },
            },
        },
    },
    plugins: [],
}
