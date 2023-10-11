import { ReactElement, ReactNode } from 'react'

const TypographyOptions = {
    h1: { className: `text-4xl font-bold`, element: 'h1' },
    h2: { className: `text-3xl font-bold`, element: 'h2' },
    h3: { className: `text-xl md:text-2xl font-bold`, element: 'h3' },
    h4: { className: `text-xl font-bold`, element: 'h4' },
    body: { className: `text-base text-normal`, element: 'p' },
    title: { className: `text-lg font-semibold`, element: 'p' },
    subtitle: { className: `text-base font-medium`, element: 'p' },
    label: { className: `text-sm font-medium`, element: 'label' },
    muted: { className: `text-xs font-medium`, element: 'p' },
    small: { className: `text-xs font-normal`, element: 'p' },
    xs: { className: `text-[11px] font-normal`, element: 'p' },
    tableCell: { className: `text-xs font-medium`, element: 'p' },
    badge: { className: `text-[9px] font-semibold`, element: 'span' },
}

const VariantOptions = [
    'h1',
    'h2',
    'h3',
    'h4',
    'body',
    'title',
    'subtitle',
    'label',
    'muted',
    'small',
    'xs',
    'tableCell',
    'badge',
] as const

interface TypographyProps {
    variant?: (typeof VariantOptions)[number]

    children: ReactNode

    // Label Specific
    htmlFor?: string

    // Transform
    uppercase?: boolean
    capitalize?: boolean

    // Alignment
    center?: boolean
    left?: boolean
    right?: boolean

    color?: string

    bold?: boolean
    semibold?: boolean
    medium?: boolean
    light?: boolean
    normal?: boolean
}

export const Typography = ({
    variant = 'body',
    children,

    // Alignment
    center,
    left,
    right,

    // Transform
    uppercase,
    capitalize,

    // Label Specific
    htmlFor,

    // tailwind class
    color = 'text-typography',

    bold,
    medium,
    light,
    normal,
    semibold,
}: TypographyProps) => {
    let classes = `${color}`

    if (left) {
        classes = `${classes} text-left`
    } else if (center) {
        classes = `${classes} text-center`
    } else if (right) {
        classes = `${classes} text-right`
    }

    if (capitalize) {
        classes = `${classes} capitalize`
    } else if (uppercase) {
        classes = `${classes} uppercase`
    }

    if (bold) {
        classes = `${classes} !font-bold`
    } else if (semibold) {
        classes = `${classes} !font-semibold`
    } else if (medium) {
        classes = `${classes} !font-medium`
    } else if (normal) {
        classes = `${classes} !font-normal`
    } else if (light) {
        classes = `${classes} !font-light`
    }

    const Component = `${
        (TypographyOptions as any)[variant].element
    }` as keyof JSX.IntrinsicElements
    return (
        <Component
            className={`${
                (TypographyOptions as any)[variant].className
            } ${classes}`}
            {...(htmlFor ? { htmlFor } : {})}
        >
            {children}
        </Component>
    )
}
