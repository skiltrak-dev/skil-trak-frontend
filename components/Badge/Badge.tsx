import classNames from 'classnames'
import { PulseLoader } from 'react-spinners'

interface BadgeProps {
    text: string
    variant?:
        | 'primary'
        | 'secondary'
        | 'accent'
        | 'success'
        | 'info'
        | 'error'
        | 'warning'
        | 'muted'
    size?: 'xs' | 'sm' | 'md' | 'lg'
    shape?: 'rounded' | 'pill' | 'flat'
    disabled?: boolean
    loading?: boolean
}

const LoaderColor = {
    primary: '#f97316',
    secondary: '#0ea5e9',
    accent: '#6366f1',
    success: '#22c55e',
    info: '#3b82f6',
    error: '#ef4444',
    warning: '#f59e0b',
    muted: '#64748b',
}
export const Badge = ({
    text,
    variant = 'primary',
    size = 'sm',
    shape = 'rounded',
    disabled,
    loading,
}: BadgeProps) => {
    const classes = classNames({
        'px-2 py-0.5 inline-block uppercase': true,
        rounded: shape === 'rounded',
        'rounded-full': shape === 'pill',
        'text-sm font-medium': size === 'md',
        'text-xs font-medium': size === 'sm',
        'text-[10px]': size === 'xs',
        'text-normal': size === 'lg',

        // Colors
        'bg-orange-100 text-orange-500': !disabled && variant === 'primary',
        'bg-sky-100 text-sky-500': variant === 'secondary',
        'bg-indigo-100 text-indigo-500': !disabled && variant === 'accent',
        'bg-green-100 text-green-500': !disabled && variant === 'success',
        'bg-blue-100 text-blue-500': !disabled && variant === 'info',
        'bg-red-100 text-red-500': !disabled && variant === 'error',
        'bg-amber-100 text-amber-500': !disabled && variant === 'warning',
        'bg-slate-200 text-slate-500': !disabled && variant === 'muted',
        'bg-gray-100 text-gray-500': disabled,
    })
    return (
        <div className={classes}>
            {loading ? (
                <PulseLoader size={5} color={(LoaderColor as any)[variant]} />
            ) : (
                text
            )}
        </div>
    )
}
