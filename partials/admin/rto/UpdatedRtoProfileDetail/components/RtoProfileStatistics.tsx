import React from 'react'
import { Card } from '@components'
import { AdminApi, SubAdminApi } from '@queries'
import { ProfileCounts } from './ProfileCounts'
import { RtoProfileProgress } from './RtoProfileProgress'
import { UserRoles } from '@constants'
import { getUserCredentials } from '@utils'

export const RtoProfileStatistics = ({ rtoUserId }: { rtoUserId: number }) => {
    const role = getUserCredentials()?.role
    const statisticsCount = AdminApi.Rtos.useStatisticsCount(
        Number(rtoUserId),
        { skip: !rtoUserId }
    )
    const subadminStatisticsCount = SubAdminApi.Rto.subadminRtoStatistics(
        Number(rtoUserId),
        { skip: !rtoUserId || role !== UserRoles.SUBADMIN }
    )

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 mt-[18px]">
            <div className="flex flex-col">
                <div className="flex-grow">
                    <div className="h-full">
                        <ProfileCounts
                            statisticsCount={
                                role === UserRoles.SUBADMIN
                                    ? subadminStatisticsCount
                                    : statisticsCount
                            }
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="flex-grow">
                    <Card shadowType="profile" fullHeight>
                        <RtoProfileProgress
                            statisticsCount={
                                role === UserRoles.SUBADMIN
                                    ? subadminStatisticsCount
                                    : statisticsCount
                            }
                        />
                    </Card>
                </div>
            </div>
        </div>
    )
}
