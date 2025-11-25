import { LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'
import { Typography } from '@components'

interface InfoCardProps {
    icon: LucideIcon
    label: string
    value: string
    className?: string
}

export function InfoCard({
    icon: Icon,
    label,
    value,
    className = '',
}: InfoCardProps) {
    return (
        <div
            className={`flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-200 ${className}`}
        >
            <Icon className="h-3.5 w-3.5 text-primaryNew" />
            <div className="flex-1 min-w-0">
                <Typography
                    variant="small"
                    className="text-[10px] text-gray-500"
                >
                    {label}
                </Typography>
                <Typography
                    variant="small"
                    className="text-xs text-gray-900 font-medium truncate"
                >
                    {value}
                </Typography>
            </div>
        </div>
    )
}

interface SectionHeaderProps {
    icon: LucideIcon
    title: string
    description?: string
    badge?: ReactNode
    gradient?: string
}

export function SectionHeader({
    icon: Icon,
    title,
    description,
    badge,
    gradient = 'from-primaryNew to-primaryNew',
}: SectionHeaderProps) {
    return (
        <div className={`bg-gradient-to-r ${gradient} px-5 py-4`}>
            <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-2.5">
                    <Icon className="h-5 w-5" />
                    <Typography
                        variant="h4"
                        className="font-semibold text-white"
                    >
                        {title}
                    </Typography>
                </div>
                {badge}
            </div>
            {description && (
                <Typography
                    variant="small"
                    className="text-white/80 text-xs mt-1"
                >
                    {description}
                </Typography>
            )}
        </div>
    )
}

interface StatusCardProps {
    icon: LucideIcon
    title: string
    description: string
    variant?: 'info' | 'success' | 'warning'
    children?: ReactNode
}

export function StatusCard({
    icon: Icon,
    title,
    description,
    variant = 'info',
    children,
}: StatusCardProps) {
    const backgrounds = {
        info: 'from-gray-50 to-gray-100',
        success: 'from-emerald-50 via-teal-50 to-green-50',
        warning: 'from-amber-50 to-orange-50',
    }

    const iconBgs = {
        info: 'bg-white',
        success: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
        warning: 'bg-gradient-to-br from-amber-500 to-amber-600',
    }

    const borderColors = {
        info: 'border-gray-200',
        success: 'border-2 border-emerald-300',
        warning: 'border-2 border-amber-300',
    }

    return (
        <div
            className={`relative overflow-hidden p-4 bg-gradient-to-br ${backgrounds[variant]} ${borderColors[variant]} rounded-xl`}
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-200/30 rounded-full -mr-16 -mt-16" />
            <div className="relative flex items-start gap-3">
                <div className={`p-2 ${iconBgs[variant]} rounded-lg shadow-sm`}>
                    <Icon
                        className={`h-5 w-5 ${
                            variant === 'info' ? 'text-gray-600' : 'text-white'
                        }`}
                    />
                </div>
                <div className="flex-1">
                    <Typography
                        variant={variant === 'success' ? 'h4' : 'small'}
                        className={`font-medium ${
                            variant === 'success'
                                ? 'text-emerald-900 font-semibold'
                                : 'text-gray-900'
                        }`}
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant="small"
                        className={`mt-1 ${
                            variant === 'success'
                                ? 'text-emerald-700'
                                : 'text-gray-600'
                        }`}
                    >
                        {description}
                    </Typography>
                    {children}
                </div>
            </div>
        </div>
    )
}
