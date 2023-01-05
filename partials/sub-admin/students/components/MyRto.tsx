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

export const MyRto = ({ myRto }: any) => {
    const pathname = useRouter()
    const { id } = pathname.query
    return (
        <Card fullHeight>
            {/* Card Header */}
            <div className="flex justify-between items-center">
                {/* Icon Title */}
                <div className="flex items-center gap-x-2">
                    <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex justify-center items-center">
                        <FaSchool size={16} />
                    </div>
                    <p className="text-sm font-semibold">My RTO</p>
                </div>

                {/* Action */}
                <Link
                    href={`/portals/sub-admin/users/rtos/${myRto?.rto?.id}?tab=overview`}
                >
                    <a className="inline-block uppercase text-xs font-medium bg-orange-100 text-orange-600 px-4 py-2 rounded">
                        See Details
                    </a>
                </Link>
            </div>

            {/* Card Body */}
            <div className="flex items-center gap-x-6 py-4">
                <div className="flex-shrink-0">
                    <RtoAvatar imageUrl={myRto?.rto?.user?.avatar} />
                </div>
                <div>
                    <div>
                        <p className="font-medium">{myRto?.rto?.user?.name}</p>
                        <p className="text-slate-400 text-sm">
                            {myRto?.rto?.user?.email}
                        </p>
                    </div>
                    <div className="flex gap-x-6 mt-1">
                        <div className="flex items-center gap-x-2">
                            <span className="text-gray-400">
                                <MdPermContactCalendar size={14} />
                            </span>
                            <span className="text-xs">
                                {myRto?.emergencyPerson}
                            </span>
                        </div>
                        <div className="flex gap-x-6 mt-1">
                            <div className="flex items-center gap-x-2">
                                <span className="text-gray-400">
                                    <MdPermContactCalendar size={14} />
                                </span>
                                <span className="text-xs">
                                    {myRto?.emergencyPerson}
                                </span>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <span className="text-gray-400">
                                    <MdPhone size={14} />
                                </span>
                                <span className="text-xs">
                                    {myRto?.emergencyPersonPhone}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between gap-x-2 mt-3">
                        {myRto?.rto?.subadmin.length && (
                            <div>
                                <p className="text-[11px] text-gray-400">
                                    Coordinators
                                </p>
                                <p className="font-medium text-sm">
                                    {myRto?.rto?.subadmin[0].user.name}
                                </p>
                                <p className="text-xs font-medium text-slate-400">
                                    {myRto?.rto?.subadmin[0].user.email}
                                </p>
                            </div>
                        )}

                        {myRto?.rto?.subadmin?.length > 1 && (
                            <InitialAvatarContainer show={2}>
                                {myRto?.rto?.subadmin
                                    ?.slice(1)
                                    ?.map((subAdmin: SubAdmin, idx: number) => (
                                        <InitialAvatar
                                            key={subAdmin.id}
                                            name={subAdmin.user.name}
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
