import moment from 'moment'
import React from 'react'

export const RecentActivityCard = ({
    activity,
    index,
    Icon,
}: {
    Icon: any
    index: number
    activity: any
}) => {
    return (
        <div
            className="flex items-center gap-3 p-3 rounded-xl border border-border/50 hover:bg-muted/30 hover:border-primary/20 transition-all hover-lift"
            style={{
                animationDelay: `${index * 50}ms`,
            }}
        >
            <div className="relative">
                <div className="p-2 rounded-lg bg-gray-200/80">
                    <Icon className={`h-3.5 w-3.5 ${activity.color}`} />
                </div>
                {index === 0 && (
                    <div className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-accent border-2 border-white animate-pulse" />
                )}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold">{activity?.title}</p>
                <p className="text-xs text-muted-foreground">
                    {activity?.description}
                </p>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap px-2 py-1 rounded-md bg-muted/30">
                {moment(activity?.createdat).format('MMM DD, YYYY')}
            </span>
        </div>
    )
}
