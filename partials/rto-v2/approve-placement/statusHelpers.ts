import {
    AlertCircle,
    Clock,
    Eye,
    CheckCircle2,
    Flag,
    AlertTriangle,
} from 'lucide-react'

export const getPriorityBadge = (priority: 'critical' | 'high' | 'medium') => {
    const configs = {
        critical: {
            className:
                'bg-destructive/10 text-destructive border-destructive/20',
            icon: AlertCircle,
            label: 'Critical',
        },
        high: {
            className: 'bg-warning/10 text-warning border-warning/20',
            icon: Clock,
            label: 'High',
        },
        medium: {
            className: 'bg-primary/10 text-primary border-primary/20',
            icon: Flag,
            label: 'Medium',
        },
    }

    const config = configs[priority]
    const IconComponent = config.icon

    return {
        className: config.className,
        icon: IconComponent,
        label: config.label,
    }
}

export const getStatusBadge = (
    status: 'pending' | 'under_review' | 'urgent' | 'open'
) => {
    const configs = {
        pending: {
            className: 'bg-warning/10 text-warning border-warning/20',
            icon: Clock,
            label: 'Pending Review',
        },
        under_review: {
            className: 'bg-primary/10 text-primary border-primary/20',
            icon: Eye,
            label: 'Under Review',
        },
        urgent: {
            className:
                'bg-destructive/10 text-destructive border-destructive/20',
            icon: AlertTriangle,
            label: 'Urgent',
        },
        open: {
            className: 'bg-warning/10 text-warning border-warning/20',
            icon: AlertCircle,
            label: 'Open',
        },
    }

    const config = configs[status]
    const IconComponent = config.icon

    return {
        className: config.className,
        icon: IconComponent,
        label: config.label,
    }
}

export const getMatchScoreColor = (score: number): string => {
    if (score >= 90) return 'text-success'
    if (score >= 75) return 'text-primaryNew'
    return 'text-warning'
}

export const getPerformanceColor = (performance: number): string => {
    if (performance >= 90) return 'text-success'
    if (performance >= 75) return 'text-primary'
    if (performance >= 60) return 'text-warning'
    return 'text-destructive'
}

export const getDaysRemainingColor = (days: number): string => {
    if (days <= 2) return 'border-destructive/20 text-destructive'
    if (days <= 5) return 'border-warning/20 text-warning'
    return 'border-primary/20 text-primary'
}
