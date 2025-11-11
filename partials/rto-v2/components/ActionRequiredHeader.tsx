import { Button } from '@components'
import { LucideIcon, AlertTriangle } from 'lucide-react'

interface ActionRequiredHeaderProps {
    icon: LucideIcon
    title: string
    description: string
    urgentCount?: number
    urgentLabel?: string
    pendingCount?: number
    pendingLabel?: string
    UrgentIcon?: any
    actionButton?: {
        label: string
        icon?: LucideIcon
        onClick?: () => void
    }
    warningMessage?: string
    gradientFrom: string
    gradientTo: string
    iconGradient: string
}

export const ActionRequiredHeader = ({
    icon: Icon,
    title,
    description,
    urgentCount,
    UrgentIcon,
    urgentLabel,
    pendingCount,
    pendingLabel,
    actionButton,
    warningMessage,
    gradientFrom,
    gradientTo,
    iconGradient,
}: ActionRequiredHeaderProps) => {
    return (
        <div
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-${gradientFrom}/10 to-${gradientTo}/10 p-6 border border-${gradientFrom}/20 shadow-premium-lg`}
        >
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl"></div>

            <div className="relative flex items-start justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div
                            className={`absolute inset-0 bg-gradient-to-br ${iconGradient} rounded-2xl blur-md opacity-50`}
                        ></div>
                        <div
                            className={`relative h-16 w-16 rounded-2xl bg-gradient-to-br ${iconGradient} flex items-center justify-center shadow-premium-lg`}
                        >
                            <Icon
                                className="h-8 w-8 text-white"
                                strokeWidth={2.5}
                            />
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-white/0 to-white/20"></div>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold mb-1.5">{title}</h1>
                        <p className="text-sm text-muted-foreground mb-2">
                            {description}
                        </p>
                        <div className="flex items-center gap-3 text-xs">
                            {urgentLabel && (
                                <div
                                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-br from-${gradientFrom}/10 to-${gradientTo}/10 border`}
                                >
                                    {UrgentIcon ? (
                                        <UrgentIcon
                                            className={`h-3 w-3 text-${gradientFrom}`}
                                        />
                                    ) : (
                                        <AlertTriangle
                                            className={`h-3 w-3 text-${gradientFrom}`}
                                        />
                                    )}

                                    <span
                                        className={`font-semibold text-${gradientFrom}`}
                                    >
                                        {urgentCount} {urgentLabel}
                                    </span>
                                </div>
                            )}
                            {pendingCount !== undefined && pendingLabel && (
                                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-warning/10 border border-warning/20">
                                    <span className="font-semibold text-warning">
                                        {pendingCount} {pendingLabel}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {actionButton && (
                    <Button
                        className="bg-gradient-to-r from-success to-emerald-600 gap-2 hover-lift shadow-premium"
                        onClick={actionButton.onClick}
                    >
                        {actionButton?.icon && (
                            <actionButton.icon className="h-4 w-4" />
                        )}
                        {actionButton.label}
                    </Button>
                )}
            </div>

            {warningMessage && (
                <div className="relative mt-4 flex items-center gap-2 p-3 rounded-xl bg-white/60 dark:bg-white/5 border border-destructive/10 backdrop-blur-sm">
                    <AlertTriangle className="h-4 w-4 text-destructive shrink-0 animate-pulse" />
                    <p
                        className="text-xs text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: warningMessage }}
                    />
                </div>
            )}
        </div>
    )
}
