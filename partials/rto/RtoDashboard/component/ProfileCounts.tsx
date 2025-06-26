import { ProfileCountsCard } from '@partials/admin'
import { IconType } from 'react-icons'
import { HiUserCircle } from 'react-icons/hi'
import {
    SiHomeassistantcommunitystore,
    SiSimpleanalytics,
} from 'react-icons/si'
import { RTODashboardStudentCountCard } from '../card'
import { WorkplaceCurrentStatus } from '@utils'

export interface RtoProfileCountDataType {
    title: string
    count: number
    Icon: IconType
    loading: boolean
    background: Background
    link?: {
        pathname: string
        query?: {
            [key: string]: string | number | boolean
        }
    }
    customDetail?: {
        text: string
        onClick?: Function
    }
}

export interface Background {
    from: string
    to: string
}

export const ProfileCounts = ({
    statisticsCount,
}: {
    statisticsCount: any
}) => {
    const countsData: RtoProfileCountDataType[] = [
        {
            title: 'Pending Student',
            count: Number(statisticsCount?.data?.pendingStudent),
            Icon: HiUserCircle,
            loading: statisticsCount?.isLoading,
            link: {
                pathname: '/portals/rto/students',
                query: {
                    tab: 'pending',
                },
            },
            background: {
                from: '#3E3D45',
                to: '#202020',
            },
        },
        {
            title: 'Total Students Received',
            count: Number(statisticsCount?.data?.allStudents),
            Icon: HiUserCircle,
            loading: statisticsCount?.isLoading,
            link: {
                pathname: '/portals/rto/students',
                query: {
                    tab: 'archived',
                },
            },
            background: {
                from: '#3E3D45',
                to: '#202020',
            },
        },
        {
            title: 'Completed Student',
            count: Number(statisticsCount?.data?.completedStudent),
            Icon: HiUserCircle,
            loading: statisticsCount?.isLoading,
            link: {
                pathname: '/portals/rto/students',
                query: {
                    tab: 'completed',
                },
            },
            background: {
                from: '#3E3D45',
                to: '#202020',
            },
        },
        {
            title: 'Archive Students',
            count: Number(statisticsCount?.data?.archivedStudents),
            Icon: HiUserCircle,
            loading: statisticsCount?.isLoading,
            link: {
                pathname: '/portals/rto/students',
                query: {
                    tab: 'archived',
                },
            },
            background: {
                from: '#3E3D45',
                to: '#202020',
            },
        },
        {
            title: 'Active Students',
            count: Number(statisticsCount?.data?.currentStudent),
            Icon: HiUserCircle,
            loading: statisticsCount?.isLoading,
            link: {
                pathname: '/portals/rto/students',
                query: {
                    tab: 'active',
                },
            },
            background: {
                from: '#3E3D45',
                to: '#202020',
            },
        },
        {
            title: 'Reported Students',
            count: Number(statisticsCount?.data?.flaggedStudents),
            Icon: HiUserCircle,
            loading: statisticsCount?.isLoading,
            link: {
                pathname: '/portals/rto/students',
                query: {
                    tab: 'active',
                    isReported: true,
                },
            },
            background: {
                from: '#E93B77',
                to: '#DA1F63',
            },
        },
        {
            title: 'Esign Pending',
            count: Number(statisticsCount?.data?.pendingDocuments),
            Icon: SiHomeassistantcommunitystore,
            loading: statisticsCount?.isLoading,
            link: { pathname: '/portals/rto/tasks/e-sign' },
            background: {
                from: '#63B967',
                to: '#4BA64F',
            },
        },
        {
            title: 'Placement Started',
            count: Number(statisticsCount?.data?.placementStarted),
            Icon: SiSimpleanalytics,
            loading: statisticsCount?.isLoading,
            link: {
                pathname: '/portals/rto/students',
                query: {
                    tab: 'active',
                    currentStatus: WorkplaceCurrentStatus.PlacementStarted,
                },
            },
            background: {
                from: '#439DEE',
                to: '#1E78E9',
            },
        },
    ]
    return (
        <div className="mt-[18px] h-[calc(100%-18px)] flex flex-col justify-between">
            <div className="grid grid-cols-1">
                <RTODashboardStudentCountCard
                    newAddedStudents={statisticsCount?.data?.newAddedStudents}
                />
            </div>
            <div className="mt-[18px] grid grid-cols-2 gap-x-3.5 gap-y-[18px]">
                {countsData.map((data, i) => (
                    <div key={i} className="mt-[18px]">
                        <ProfileCountsCard key={i} data={data} />
                    </div>
                ))}
            </div>
        </div>
    )
}
