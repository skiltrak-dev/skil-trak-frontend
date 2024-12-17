import Image from 'next/image'
import Link from 'next/link'
// components
import {
    InitialAvatar,
    InitialAvatarContainer,
} from '@components/InitialAvatar'
import { Card } from '@components/cards'
// path
import { useRouter } from 'next/router'
// icons
import { FaSchool } from 'react-icons/fa'
import { MdPermContactCalendar, MdPhone } from 'react-icons/md'
import { RtoAvatar } from '@components/avatars'
import { SubAdmin } from '@types'
import { ActionButton } from '@components'
import { getUserCredentials } from '@utils'
import { useMediaQuery } from 'react-responsive'
import { MediaQueries } from '@constants'
import { SubAdminApi } from '@queries'

export const MyRto = () => {
    const pathname = useRouter()
    const role = getUserCredentials()?.role
    const isLargeDevice = useMediaQuery(MediaQueries.Large)

    const rtoDetail = SubAdminApi.Student.getStudentRtoDetail(
        Number(pathname?.query?.id),
        {
            skip: !pathname?.query?.id,
            refetchOnMountOrArgChange: 300,
        }
    )

    return (
        <Card fullHeight>
            {/* Card Header */}
            <div className="flex justify-between items-center">
                {/* Icon Title */}
                <div className="flex items-center gap-x-2">
                    <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex justify-center items-center">
                        <FaSchool size={isLargeDevice ? 16 : 14} />
                    </div>
                    <p className="text-xs 2xl:text-sm font-semibold">My RTO</p>
                </div>

                {role !== 'rto' ? (
                    <ActionButton
                        variant="success"
                        onClick={() => {
                            pathname.push(
                                role === 'admin'
                                    ? {
                                          pathname: `/portals/admin/rto/${rtoDetail?.data?.id}`,
                                          query: { tab: 'sectors' },
                                      }
                                    : {
                                          pathname: `/portals/sub-admin/users/rtos/${rtoDetail?.data?.id}`,
                                          query: { tab: 'overview' },
                                      }
                            )
                        }}
                    >
                        See Details
                    </ActionButton>
                ) : null}
            </div>

            {/* Card Body */}
            <div className="flex items-center gap-x-6 py-4">
                <div className="flex-shrink-0">
                    <RtoAvatar
                        imageUrl={rtoDetail?.data?.user?.avatar}
                        user={rtoDetail?.data?.user?.id}
                    />
                </div>
                <div>
                    <div>
                        <p className="font-medium text-sm 2xl:text-base">
                            {rtoDetail?.data?.user?.name}
                        </p>
                        <p className="text-slate-400 text-xs 2xl:text-sm">
                            {rtoDetail?.data?.user?.email}
                        </p>
                    </div>
                    <div className="flex gap-x-6 mt-1">
                        <div className="flex items-center gap-x-2">
                            <span className="text-gray-400">
                                <MdPermContactCalendar size={14} />
                            </span>
                            <span className="text-[11px] 2xl:text-xs">
                                {rtoDetail?.data?.phone}
                            </span>
                        </div>
                        <div className="flex gap-x-6 mt-1">
                            <div className="flex items-center gap-x-2">
                                <span className="text-gray-400">
                                    <MdPhone size={14} />
                                </span>
                                <span className="text-[11px] 2xl:text-xs">
                                    {rtoDetail?.data?.phone}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between gap-x-2 mt-3">
                        {rtoDetail?.data?.rto?.subadmin?.length && (
                            <div>
                                <p className="text-[11px] text-gray-400">
                                    Coordinators
                                </p>
                                <p className="font-medium text-sm">
                                    {
                                        rtoDetail?.data?.rto?.subadmin[0].user
                                            .name
                                    }
                                </p>
                                <p className="text-xs font-medium text-slate-400">
                                    {
                                        rtoDetail?.data?.rto?.subadmin[0].user
                                            .email
                                    }
                                </p>
                            </div>
                        )}

                        {rtoDetail?.data?.rto?.subadmin?.length > 1 && (
                            <InitialAvatarContainer show={2}>
                                {rtoDetail?.data?.rto?.subadmin
                                    ?.slice(1)
                                    ?.map((subAdmin: SubAdmin, idx: number) => (
                                        <InitialAvatar
                                            key={subAdmin?.id}
                                            name={subAdmin?.user?.name}
                                            first={idx === 0}
                                        />
                                    ))}
                            </InitialAvatarContainer>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    )
}
