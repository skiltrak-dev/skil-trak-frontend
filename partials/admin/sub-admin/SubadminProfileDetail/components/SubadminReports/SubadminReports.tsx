import { Card, Typography } from '@components'
import React from 'react'
import { HistoryCountCard } from './cards'

export const SubadminReports = () => {
    return (
        <Card fullHeight shadowType="profile" noPadding>
            <div className="h-full overflow-hidden">
                <div className="px-4 py-3.5 border-b border-secondary-dark">
                    <Typography semibold>
                        <span className="text-[15px]">History</span>
                    </Typography>
                </div>
            </div>

            {/*  */}
            <div className="p-4">
                <HistoryCountCard />
            </div>
        </Card>
    )
}
