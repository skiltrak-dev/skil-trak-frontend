import { Card } from '@components'
import { RtoProfileProgress } from '@partials/admin'
import { RtoApi } from '@queries'
import { Activity } from 'lucide-react'
import React from 'react'

export const ProgressDistribution = () => {
    const count = RtoApi.Rto.useDashboard()
    return (
        <>
            <div className="pb-3">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-secondary to-primary rounded-xl blur opacity-30"></div>
                        <div className="relative h-10 w-10 rounded-xl bg-primaryNew flex items-center justify-center shadow-premium">
                            <Activity className="h-5 w-5 text-white" />
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-white/0 to-white/20"></div>
                        </div>
                    </div>
                    <div>
                        <div>Progress Distribution</div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Student status breakdown
                        </p>
                    </div>
                </div>
            </div>
            <RtoProfileProgress statisticsCount={count} />
        </>
    )
}
