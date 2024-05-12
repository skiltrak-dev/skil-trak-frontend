import React from 'react'
import { Rto } from '@types'
import { ProfileCountsCard, StudentCountCard } from '../cards'
import { HiUserCircle } from 'react-icons/hi'
import { IconType } from 'react-icons'
import {
    SiHomeassistantcommunitystore,
    SiSimpleanalytics,
} from 'react-icons/si'
import { AdminApi } from '@queries'

export interface RtoProfileCountDataType {
    title: string
    count: number
    Icon: IconType
    loading: boolean
    background: Background
}

export interface Background {
    from: string
    to: string
}

export const ProfileCounts = ({ rtoUserId }: { rtoUserId: number }) => {
    const statisticsCount = AdminApi.Rtos.useStatisticsCount(
        Number(rtoUserId),
        { skip: !rtoUserId }
    )
    const countsData: RtoProfileCountDataType[] = [
        {
            title: 'Active Students',
            count: Number(statisticsCount?.data?.currentStudent),
            Icon: HiUserCircle,
            loading: statisticsCount?.isLoading,
            background: {
                from: '#3E3D45',
                to: '#202020',
            },
        },
        {
            title: 'Pending Students',
            count: Number(statisticsCount?.data?.pendingStudent),
            Icon: HiUserCircle,
            loading: statisticsCount?.isLoading,
            background: {
                from: '#E93B77',
                to: '#DA1F63',
            },
        },
        {
            title: 'Workplace Request',
            count: Number(statisticsCount?.data?.workplaceRequest),
            Icon: SiHomeassistantcommunitystore,
            loading: statisticsCount?.isLoading,
            background: {
                from: '#63B967',
                to: '#4BA64F',
            },
        },
        {
            title: 'Pending Result',
            count: Number(statisticsCount?.data?.pendingResult),
            Icon: SiSimpleanalytics,
            loading: statisticsCount?.isLoading,
            background: {
                from: '#439DEE',
                to: '#1E78E9',
            },
        },
    ]
    return (
        <div className="mt-[18px] h-[calc(100%-18px)] flex flex-col justify-between">
            <StudentCountCard />
            <div className="mt-[18px] grid grid-cols-2 gap-x-3.5 gap-y-[18px]">
                {countsData.map((data, i) => (
                    <div className="mt-[18px]">
                        <ProfileCountsCard key={i} data={data} />
                    </div>
                ))}
            </div>
        </div>
    )
}
