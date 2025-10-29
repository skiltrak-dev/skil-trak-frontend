import { createTheme } from './utils'
import { ThemeColors } from './type'

const colors: ThemeColors = {
    primary: {
        DEFAULT: '#F7910F',
        dark: '#E5870E',
        light: '#FCD6A5',
    },

    primaryNew: {
        DEFAULT: '#24556D',
        dark: '#21516A',
        light: '#24556D08',
    },

    secondary: {
        DEFAULT: '#F5F5F5',
        dark: '#E6E6E6',
        light: '#FAFAFA',
    },
    secondaryNew: {
        DEFAULT: '#0D5468', // light --secondary
        dark: '#044866', // dark --secondary
        light: '#0D546808',
    },

    success: {
        DEFAULT: '#22c55e',
        dark: '#6AB04C',
        light: '#BADC5880',
    },
    successNew: {
        DEFAULT: '#10b981', // light --success
        dark: '#16a34a', // dark --success
        light: '#10b98120',
    },

    info: {
        DEFAULT: '#686DE0',
        dark: '#4834D4',
        light: '#686DE080',
    },
    infoNew: {
        DEFAULT: '#044866', // light --info
        dark: '#0D5468', // dark --info
        light: '#04486620',
    },

    error: {
        DEFAULT: '#FF7979',
        dark: '#EB4D4B',
        light: '#FF797980',
    },
    warning: {
        DEFAULT: '#F7A619', // same in both
        dark: '#F7A619',
        light: '#F7A61920',
    },

    link: {
        DEFAULT: '#007AFF',
        dark: '#0369D9',
        light: '#007AFF80',
    },

    base: {
        DEFAULT: '#1D1D1D',
        light: '#2D3748',
        dark: '#000000',
    },

    muted: {
        DEFAULT: '#A5A3A9',
        dark: '#77757F',
        light: '#ffffff',
    },

    mutedNew: {
        DEFAULT: '#f1f5f9', // light --muted
        dark: '#1e2537', // dark --muted
        light: '#ffffff',
    },
    destructive: {
        DEFAULT: '#ef4444', // light --destructive
        dark: '#dc2626', // dark --destructive
        light: '#ef444420',
    },

    borderNew: {
        DEFAULT: '#e2e8f0', // light --border
        dark: '#2d3548', // dark --border
        light: '#f8fafc',
    },
}

export const baseTheme = {
    theme: createTheme(colors),
    colors,
}
