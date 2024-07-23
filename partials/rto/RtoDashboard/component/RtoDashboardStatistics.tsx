import React from 'react'
import { Card } from '@components'
import { AdminApi, RtoApi } from '@queries'
import { ProfileCounts } from './ProfileCounts'
import { UserRoles } from '@constants'
import { getUserCredentials } from '@utils'
import { RtoProfileProgress } from '@partials/admin'

export const RtoDashboardStatistics = ({
    rtoUserId,
}: {
    rtoUserId: number
}) => {
    const role = getUserCredentials()?.role
    const count = RtoApi.Rto.useDashboard()

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 mt-[18px]">
            <div className="flex flex-col">
                <div className="flex-grow">
                    <div className="h-full">
                        <ProfileCounts statisticsCount={count} />
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="flex-grow">
                    <Card shadowType="profile" fullHeight>
                        <RtoProfileProgress statisticsCount={count} />
                    </Card>
                </div>
            </div>
        </div>
    )
}
