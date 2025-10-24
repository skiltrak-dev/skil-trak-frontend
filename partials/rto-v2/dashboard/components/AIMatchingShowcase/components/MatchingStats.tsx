import { Card } from '@components'
import { RtoV2Api } from '@queries'
import { Target } from 'lucide-react'
import React from 'react'

export const MatchingStats = () => {
    const autoWpCount = RtoV2Api.Dashboard.autoWpCount()

    return (
        <Card className="border-border/60 !shadow-premium-lg hover:shadow-premium-xl hover:border-accent/40 transition-all hover-lift bg-gradient-to-br from-white via-white to-accent/5 relative overflow-hidden group/card">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
            <div className="pb-2">
                <div className="flex items-center gap-2.5">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent rounded-lg blur opacity-30"></div>
                        <div className="relative h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-premium">
                            <Target className="h-4 w-4 text-white" />
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-white/0 to-white/20"></div>
                        </div>
                    </div>
                    <div>
                        <div className="text-sm">Matching Stats</div>
                        <p className="text-xs text-muted-foreground">
                            Live performance
                        </p>
                    </div>
                </div>
            </div>
            <div className="space-y-2 pt-8">
                <div className="space-y-1.5">
                    <div className="flex items-baseline justify-between">
                        <span className="text-xs text-muted-foreground">
                            Total Matches
                        </span>
                        <span className="text-xl font-bold">
                            {autoWpCount?.data?.automatic || 0}
                        </span>
                    </div>
                    <div className="flex items-baseline justify-between">
                        <span className="text-xs text-muted-foreground">
                            Success Rate
                        </span>
                        <span className="text-lg font-bold text-success">
                            {autoWpCount?.data?.percentage || 0}%
                        </span>
                    </div>
                    <div className="flex items-baseline justify-between">
                        <span className="text-xs text-muted-foreground">
                            Avg Time
                        </span>
                        <span className="text-lg font-bold text-accent">
                            15s
                        </span>
                    </div>
                </div>
            </div>
        </Card>
    )
}
