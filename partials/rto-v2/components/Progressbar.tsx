import React from 'react'

// Simple utility function for class concatenation
const cn = (...classes: (string | undefined | null | false)[]) => {
    return classes.filter(Boolean).join(' ')
}

export const ProgressBarVariants = {
    Primary: 'primary',
    PrimaryNew: 'primaryNew',
    Secondary: 'secondary',
    Info: 'info',
    Error: 'error',
    Action: 'action',
    Dark: 'dark',
    Success: 'success',
} as const

const VariantOptions = [
    'primary',
    'secondary',
    'info',
    'error',
    'action',
    'dark',
    'success',
    'primaryNew',
] as const

interface ProgressBarProps {
    variant?: (typeof VariantOptions)[number]
    value: number
    max?: number
    size?: 'xs' | 'sm' | 'md' | 'lg'
    showLabel?: boolean
    label?: string
    className?: string
    animated?: boolean
    striped?: boolean
}

const getVariantStyles = (variant: string, size: string) => {
    const sizeStyles = {
        xs: 'h-1',
        sm: 'h-2',
        md: 'h-3',
        lg: 'h-4',
    }

    const variantStyles = {
        primary: {
            bg: 'bg-primary',
            text: 'text-primary',
            ring: 'ring-primary-light',
        },
        primaryNew: {
            bg: 'bg-primaryNew',
            text: 'text-primaryNew',
            ring: 'ring-primaryNew-light',
        },
        secondary: {
            bg: 'bg-secondary',
            text: 'text-secondary',
            ring: 'ring-secondary-light',
        },
        info: {
            bg: 'bg-info',
            text: 'text-info',
            ring: 'ring-info-light',
        },
        error: {
            bg: 'bg-error',
            text: 'text-error',
            ring: 'ring-error-light',
        },
        action: {
            bg: 'bg-gray-400',
            text: 'text-gray-600',
            ring: 'ring-gray-300',
        },
        dark: {
            bg: 'bg-typography',
            text: 'text-typography',
            ring: 'ring-gray-300',
        },
        success: {
            bg: 'bg-success',
            text: 'text-success',
            ring: 'ring-success-light',
        },
    }

    return {
        size: sizeStyles[size as keyof typeof sizeStyles],
        variant: variantStyles[variant as keyof typeof variantStyles],
    }
}

export const Progressbar: React.FC<ProgressBarProps> = ({
    variant = 'primary',
    value,
    max = 100,
    size = 'sm',
    showLabel = false,
    label,
    className,
    animated = false,
    striped = false,
}) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
    const styles = getVariantStyles(variant, size)

    const progressBarClasses = cn(
        'w-full bg-gray-200 rounded-full overflow-hidden',
        styles.size,
        className
    )

    const progressFillClasses = cn(
        'h-full rounded-full transition-all duration-500 ease-out ',
        styles.variant.bg,
        animated && 'animate-pulse',
        striped && 'bg-stripes'
    )

    const labelClasses = cn('text-sm font-medium mb-1', styles.variant.text)

    return (
        <div className="w-full">
            {showLabel && (
                <div className="flex justify-between items-center mb-2">
                    <span className={labelClasses}>
                        {label || `${Math.round(percentage)}%`}
                    </span>
                    {showLabel && (
                        <span className="text-sm text-gray-600">
                            {value}/{max}
                        </span>
                    )}
                </div>
            )}

            <div className={progressBarClasses}>
                <div
                    className={progressFillClasses}
                    style={{
                        width: `${percentage}%`,
                        backgroundImage: striped
                            ? 'linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.2) 25%, rgba(255,255,255,0.2) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.2) 75%)'
                            : undefined,
                        backgroundSize: striped ? '1rem 1rem' : undefined,
                        animation: striped
                            ? 'stripes 1s linear infinite'
                            : undefined,
                    }}
                />
            </div>
        </div>
    )
}

// Add CSS for striped animation
const stripedKeyframes = `
@keyframes stripes {
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: 1rem 0;
    }
}
`

// Inject the CSS if not already present
if (typeof document !== 'undefined') {
    const styleId = 'progressbar-stripes'
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style')
        style.id = styleId
        style.textContent = stripedKeyframes
        document.head.appendChild(style)
    }
}
