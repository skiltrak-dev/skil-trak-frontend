import React from 'react'
import { ProfileCounts } from './ProfileCounts'
import { RtoProfileProgress } from './RtoProfileProgress'
import { Card } from '@components'
import { AdminApi } from '@queries'

export const RtoProfileStatistics = ({ rtoUserId }: { rtoUserId: number }) => {
    const statisticsCount = AdminApi.Rtos.useStatisticsCount(
        Number(rtoUserId),
        { skip: !rtoUserId }
    )

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 mt-[18px]">
            <div className="flex flex-col">
                <div className="flex-grow">
                    <div className="h-full">
                        <ProfileCounts statisticsCount={statisticsCount} />
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="flex-grow">
                    <Card shadowType="profile" fullHeight>
                        <RtoProfileProgress statisticsCount={statisticsCount} />
                    </Card>
                </div>
            </div>
        </div>
    )
}
