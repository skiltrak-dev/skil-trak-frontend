import { ThemeColors } from './type'

export const createTheme = (theme: ThemeColors) => {
    return {
        // Primary
        '--theme-primary-default': theme.primary.DEFAULT,
        '--theme-primary-dark': theme.primary.dark,
        '--theme-primary-light': theme.primary.light,

        '--theme-primaryNew-default': theme.primaryNew.DEFAULT,
        '--theme-primaryNew-dark': theme.primaryNew.dark,
        '--theme-primaryNew-light': theme.primaryNew.light,

        // Secondary
        '--theme-secondary-default': theme.secondary.DEFAULT,
        '--theme-secondary-dark': theme.secondary.dark,
        '--theme-secondary-light': theme.secondary.light,

        // Success
        '--theme-success-default': theme.success.DEFAULT,
        '--theme-success-dark': theme.success.dark,
        '--theme-success-light': theme.success.light,

        // Info
        '--theme-info-default': theme.info.DEFAULT,
        '--theme-info-dark': theme.info.dark,
        '--theme-info-light': theme.info.light,

        // Error
        '--theme-error-default': theme.error.DEFAULT,
        '--theme-error-dark': theme.error.dark,
        '--theme-error-light': theme.error.light,

        // Link
        '--theme-link-default': theme.link.DEFAULT,
        '--theme-link-dark': theme.link.dark,
        '--theme-link-light': theme.link.light,

        // BASE
        '--theme-base-default': theme.base.DEFAULT,
        '--theme-base-dark': theme.base.dark,
        '--theme-base-light': theme.base.light,

        // Text
        '--theme-text-base': theme.base.DEFAULT,
        '--theme-text-dark': theme.base.dark,
        '--theme-text-secondary': theme.base.light,
        '--theme-text-muted': theme.muted.DEFAULT,
        '--theme-text-muted-dark': theme.muted.dark,
    }
}

export const applyTheme = (theme: Object) => {
    if (typeof window !== 'undefined') {
        const root = document.documentElement
        Object.keys(theme).forEach((cssVar) => {
            root.style.setProperty(cssVar, (theme as any)[cssVar])
        })
    }
}

export const getCurrentTheme = () => {
    return 'Base' // localstorag
}
