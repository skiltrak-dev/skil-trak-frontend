import { createTheme } from './utils'
import { ThemeColors } from './type'

const colors: ThemeColors = {
    primary: {
        DEFAULT: '#000000',
        dark: '#E5870E',
        light: '#FCD6A5',
    },

    secondary: {
        DEFAULT: '#F5F5F5',
        dark: '#E6E6E6',
        light: '#FAFAFA',
    },

    success: {
        DEFAULT: '#BADC58',
        dark: '#6AB04C',
        light: '#BADC5880',
    },

    info: {
        DEFAULT: '#686DE0',
        dark: '#4834D4',
        light: '#686DE080',
    },

    error: {
        DEFAULT: '#FF7979',
        dark: '#EB4D4B',
        light: '#FF797980',
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
        light: '#CCCCCC',
    },
}

export const darkTheme = {
    theme: createTheme(colors),
    colors,
}
