import React from 'react'
import { Rto, UserStatus } from '@types'
import { ProfileCountsCard, StudentCountCard } from '../cards'
import { HiUserCircle } from 'react-icons/hi'
import { IconType } from 'react-icons'
import {
    SiHomeassistantcommunitystore,
    SiSimpleanalytics,
} from 'react-icons/si'
import { AdminApi, SubAdminApi } from '@queries'
import { useRouter } from 'next/router'
import { getUserCredentials } from '@utils'
import { UserRoles } from '@constants'

export interface RtoProfileCountDataType {
    title: string
    count: number
    Icon: IconType
    loading: boolean
    background: Background
    link?: {
        pathname: string
        query?: {
            [key: string]: string | number
        }
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
    const router = useRouter()

    const role = getUserCredentials()?.role
    const subadmin = SubAdminApi.SubAdmin.useProfile(undefined, {
        skip: role !== UserRoles.SUBADMIN,
        refetchOnMountOrArgChange: true,
    })

    const countsData: RtoProfileCountDataType[] = [
        {
            title: 'Completed Student',
            count: Number(statisticsCount?.data?.completedStudent),
            Icon: HiUserCircle,
            loading: statisticsCount?.isLoading,
            link: {
                pathname:
                    role === UserRoles.ADMIN || subadmin?.data?.isAdmin
                        ? '/portals/admin/student'
                        : role === UserRoles.SUBADMIN
                        ? '/portals/sub-admin/students'
                        : '',
                query: {
                    tab: 'completed',
                    page: 1,
                    pageSize: 50,
                    rtoId: Number(router?.query?.id),
                    completed: String(true),
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
                pathname:
                    role === UserRoles.ADMIN || subadmin?.data?.isAdmin
                        ? '/portals/admin/student'
                        : role === UserRoles.SUBADMIN
                        ? '/portals/sub-admin/students'
                        : '',
                query: {
                    tab: 'archive',
                    page: 1,
                    pageSize: 50,
                    rtoId: Number(router?.query?.id),
                    status: UserStatus.Archived,
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
                pathname:
                    role === UserRoles.ADMIN || subadmin?.data?.isAdmin
                        ? '/portals/admin/student'
                        : role === UserRoles.SUBADMIN
                        ? '/portals/sub-admin/students'
                        : '',
                query: {
                    tab: 'active',
                    page: 1,
                    pageSize: 50,
                    rtoId: Number(router?.query?.id),
                    status: UserStatus.Approved,
                },
            },
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
            link: {
                pathname:
                    role === UserRoles.ADMIN || subadmin?.data?.isAdmin
                        ? '/portals/admin/student'
                        : role === UserRoles.SUBADMIN
                        ? '/portals/sub-admin/students'
                        : '',
                query: {
                    tab: 'pending',
                    page: 1,
                    pageSize: 50,
                    rtoId: Number(router?.query?.id),
                    status: UserStatus.Pending,
                },
            },
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
            link:
                role === UserRoles.SUBADMIN
                    ? {
                          pathname:
                              '/portals/sub-admin/tasks/assessment-evidence',
                          query: {
                              tab: 'pending',
                              page: 1,
                              pageSize: 50,
                              rtoId: Number(router?.query?.id),
                              result: UserStatus.Pending,
                          },
                      }
                    : undefined,
            background: {
                from: '#439DEE',
                to: '#1E78E9',
            },
        },
    ]
    return (
        <div className="mt-[18px] h-[calc(100%-18px)] flex flex-col justify-between">
            <StudentCountCard
                newAddedStudents={statisticsCount?.data?.newAddedStudents}
            />
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
