/**
 * Utility function to conditionally join class names
 * similar to clsx or classnames, but minimal.
 */
export function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(' ')
}

// import { clsx, type ClassValue } from 'clsx'
// import { twMerge } from 'tailwind-merge'

// export function cn(...inputs: ClassValue[]) {
//     return twMerge(clsx(inputs))
// }
