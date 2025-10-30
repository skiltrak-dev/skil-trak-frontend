import { useState } from 'react'
import {
    X,
    Megaphone,
    AlertTriangle,
    Info,
    CheckCircle2,
    ChevronDown,
    ChevronUp,
} from 'lucide-react'
import { ActionButton, Badge, Button } from '@components'
import { UrgencyLevel } from '@partials/admin/rto/message-center/enum'

interface AdminMessageProps {
    type?: UrgencyLevel
    title: string
    message: string
    from?: string
    date?: string
    actionLabel?: string
    onDismiss?: () => void
    onAction?: () => void
}

export const AdminMessage = ({
    type = UrgencyLevel.URGENT,
    title,
    message,
    from = 'Admin Team',
    date,
    actionLabel,
    onDismiss,
    onAction,
}: AdminMessageProps) => {
    const [isVisible, setIsVisible] = useState(true)
    const [isExpanded, setIsExpanded] = useState(false)

    const handleDismiss = () => {
        setIsVisible(false)
        onDismiss?.()
    }

    if (!isVisible) return null

    const config = {
        [UrgencyLevel.URGENT]: {
            bgColor: 'bg-primary-light/50',
            borderColor: 'border-destructive/30',
            icon: AlertTriangle,
            iconColor: 'text-white',
            iconBg: 'bg-gradient-to-br from-destructive to-red-600',
            badgeClass:
                'bg-gradient-to-r from-destructive to-red-600 text-white animate-pulse shadow-lg',
            badgeText: 'URGENT',
            accentColor: 'text-destructive',
        },
        [UrgencyLevel.HIGH]: {
            bgColor:
                'bg-gradient-to-r from-warning/10 via-accent/5 to-warning/10',
            borderColor: 'border-warning/30',
            icon: AlertTriangle,
            iconColor: 'text-white',
            iconBg: 'bg-gradient-to-br from-warning to-accent',
            badgeClass:
                'bg-gradient-to-r from-warning to-accent text-white shadow-md',
            badgeText: 'Important',
            accentColor: 'text-warning',
        },
        [UrgencyLevel.MEDIUM]: {
            bgColor:
                'bg-gradient-to-r from-success/10 via-emerald-500/5 to-success/10',
            borderColor: 'border-success/30',
            icon: CheckCircle2,
            iconColor: 'text-white',
            iconBg: 'bg-gradient-to-br from-success to-emerald-500',
            badgeClass:
                'bg-gradient-to-r from-success to-emerald-500 text-white shadow-md',
            badgeText: 'Update',
            accentColor: 'text-success',
        },
        [UrgencyLevel.LOW]: {
            bgColor:
                'bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10',
            borderColor: 'border-primary/30',
            icon: Info,
            iconColor: 'text-white',
            iconBg: 'bg-gradient-to-br from-primary to-secondary',
            badgeClass:
                'bg-gradient-to-r from-primary to-secondary text-white shadow-md',
            badgeText: 'Info',
            accentColor: 'text-primary',
        },
    }

    const currentConfig = config[type]
    const Icon = currentConfig.icon

    return (
        <div
            className={`border ${currentConfig.borderColor} ${currentConfig.bgColor} rounded-2xl shadow-premium-lg overflow-hidden animate-scale-in backdrop-blur-sm relative hover-lift`}
        >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none"></div>

            {/* Compact Header - Always Visible */}
            <div className="flex items-center gap-3 p-4 relative">
                {/* Icon */}
                <div className="relative shrink-0">
                    <div
                        className={`absolute inset-0 ${currentConfig.iconBg} rounded-xl blur opacity-30`}
                    ></div>
                    <div
                        className={`relative h-10 w-10 rounded-xl flex items-center justify-center ${currentConfig.iconBg} shadow-premium`}
                    >
                        <Icon
                            className={`h-5 w-5 ${currentConfig.iconColor}`}
                            strokeWidth={2.5}
                        />
                    </div>
                </div>

                {/* Title & Badge - Clickable to expand */}
                <div
                    className="flex-1 min-w-0 flex items-center gap-2.5 flex-wrap cursor-pointer"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <span className="font-bold truncate text-sm">{title}</span>
                    {/* <Badge
                        className={`${currentConfig.badgeClass} border-0 shadow-premium text-xs h-5 px-2.5 font-semibold`}
                    >
                        {currentConfig.badgeText}
                    </Badge> */}
                    <Badge
                        // className={`${currentConfig.badgeClass} border-0 shadow-premium text-xs h-5 px-2.5 font-semibold`}
                        className="animate-pulse !bg-red-600 text-white"
                        text={currentConfig.badgeText}
                    />
                    {/* <div
                        className={`${currentConfig.badgeClass} border-0 shadow-premium text-xs h-5 px-2.5 font-semibold`}
                    >
                        {currentConfig.badgeText}
                    </div> */}
                </div>

                {/* Metadata - Desktop only - Clickable to expand */}
                <div
                    className="hidden md:flex items-center gap-3 text-xs text-muted-foreground cursor-pointer"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className="flex items-center gap-1.5">
                        <Megaphone className="h-3 w-3" />
                        <span className="truncate max-w-[150px]">{from}</span>
                    </div>
                    {date && (
                        <>
                            <span>•</span>
                            <span>{date}</span>
                        </>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 shrink-0">
                    {actionLabel && onAction && (
                        <div
                            onClick={onAction}
                            className={`h-8 text-xs font-semibold px-3 shadow-sm hover:shadow-md transition-all hover-lift ${
                                type === UrgencyLevel.URGENT
                                    ? 'bg-gradient-to-r from-destructive to-red-600 hover:opacity-90'
                                    : ''
                            }`}
                        >
                            {actionLabel}
                        </div>
                    )}
                    {onDismiss && (
                        <ActionButton
                            variant="error"
                            simple
                            onClick={handleDismiss}
                        >
                            <X className="h-3.5 w-3.5" />
                        </ActionButton>
                    )}
                    <ActionButton
                        simple
                        variant="light"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {isExpanded ? (
                            <ChevronUp className="h-4 w-4" />
                        ) : (
                            <ChevronDown className="h-4 w-4" />
                        )}
                    </ActionButton>
                </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
                <div className="border-t px-4 py-3 space-y-2 animate-fade-in">
                    <p className="text-xs text-foreground/90 leading-relaxed">
                        {message}
                    </p>

                    {/* Metadata - Mobile only */}
                    <div className="md:hidden flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <Megaphone className="h-3 w-3" />
                            <span>{from}</span>
                        </div>
                        {date && (
                            <>
                                <span>•</span>
                                <span>{date}</span>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
