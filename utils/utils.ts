/**
 * Utility function to conditionally join class names
 * similar to clsx or classnames, but minimal.
 */
export function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(' ')
}
