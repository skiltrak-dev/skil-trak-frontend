import { AlertTriangle, Flag } from 'lucide-react'
import React from 'react'

type Priority = 'critical' | 'high' | 'medium' | 'na'

interface PriorityBadgeProps {
    priority?: Priority
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({
    priority = 'na',
}) => {
    const config = {
        critical: {
            className: 'bg-red-100 text-red-400 border-red-200 rounded-full',
            icon: AlertTriangle,
            label: 'Critical',
        },
        high: {
            className: 'bg-warning/10 text-warning border rounded-full',
            icon: Flag,
            label: 'High',
        },
        medium: {
            className:
                'bg-emerald-100 text-emerald-400 border-emerald-200 rounded-full',
            icon: Flag,
            label: 'Medium',
        },
        na: {
            className: 'bg-gray-100 text-gray-400 border-gray-200 rounded-full',
            icon: Flag,
            label: 'N/A',
        },
    }

    const { className, icon: Icon, label } = config[priority] ?? config.na

    return (
        <div
            className={`${className} border rounded-md px-2 py-1 inline-flex items-center text-xs font-medium`}
        >
            <Icon className="h-3 w-3 mr-1" />
            {label}
        </div>
    )
}
