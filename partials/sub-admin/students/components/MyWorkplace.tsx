import { Card } from '@components/cards'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { IoBriefcase } from 'react-icons/io5'

//queries
import { WorkplaceAvatar } from '@components'
import { ActionButton } from '@components/buttons'
import { useGetSubAdminStudentWorkplaceQuery } from '@queries'
import { getUserCredentials } from '@utils'
import { useState, useEffect } from 'react'
import { AddWorkplace } from './AddWorkplace'

export const MyWorkplace = ({
    id,
    industries,
}: {
    industries: any
    id: number
}) => {
    const pathname = useRouter()
    const profileId = pathname.query.profileId

    const [workplaceIndustries, setWorkplaceIndustries] = useState<any>([])

    const workplace = useGetSubAdminStudentWorkplaceQuery(id, { skip: !id })

    useEffect(() => {
        if (
            workplace.isSuccess &&
            workplace?.data &&
            workplace?.data?.length > 0
        ) {
            setWorkplaceIndustries(workplace?.data[0])
        }
    }, [workplace])

    // const filteredData = myWorkplace?.workplace.filter(
    //     (item: any) => !item.isCancelled
    // )

    const role = getUserCredentials()?.role

    // const workplaceIndustry = workplaceIndustries?.industries?.find(
    //     (i: any) => i?.applied
    // )?.industry

    const workplaceIndustry = industries[0]

    console.log('abcdabcd', workplaceIndustries)
    return (
        <Card fullHeight>
            {/* Card Header */}
            <div className="flex justify-between items-center mb-4">
                {/* Icon Title */}
                <div className="flex items-center gap-x-2">
                    <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex justify-center items-center">
                        <IoBriefcase size={16} />
                    </div>
                    <p className="text-sm font-semibold">My Workplace</p>
                </div>

                {/* Action */}
                <div className="flex justify-between gap-x-4">
                    {role !== 'rto' && workplaceIndustry ? (
                        <ActionButton
                            variant="success"
                            onClick={() => {
                                pathname.push(
                                    role === 'admin'
                                        ? `/portals/admin/industry/${workplaceIndustry?.id}?tab=sectors`
                                        : `/portals/sub-admin/users/industries/${workplaceIndustry?.id}?tab=overview`
                                )
                            }}
                        >
                            See Details
                        </ActionButton>
                    ) : null}

                    {role !== 'rto' &&
                    workplace?.data?.industries?.length > 1 ? (
                        <Link legacyBehavior href="#">
                            <a className="inline-block uppercase text-xs font-medium bg-gray-100 text-gray-500 px-4 py-2 rounded">
                                VIEW SECOND
                            </a>
                        </Link>
                    ) : null}
                </div>
            </div>
            {/* Card Body */}
            {workplaceIndustry ? (
                <div key={workplaceIndustry?.id} className="mt-4">
                    <div className="flex gap-x-6 mb-4">
                        <div className="flex-shrink-0">
                            <WorkplaceAvatar />
                        </div>
                        <div>
                            <div>
                                <p className="font-medium">
                                    {workplaceIndustry?.user?.name}
                                </p>
                                <p className="text-slate-400 text-sm">
                                    {workplaceIndustry?.user?.email}
                                </p>
                            </div>
                            <div>
                                {/* <div>
                                        <p className="font-medium">
                                            {
                                                workplaceIndustry?.industries[0]?.industry
                                                    ?.user?.name
                                            }
                                        </p>
                                        <p className="text-slate-400 text-sm">
                                            {
                                                workplaceIndustry?.industries[0]?.industry
                                                    ?.user?.email
                                            }
                                        </p>
                                    </div> */}
                                <div className="flex gap-x-3 mt-1 border-t pt-2">
                                    <div className="flex items-center gap-x-1">
                                        <span className="text-gray-400">
                                            <FaMapMarkerAlt size={14} />
                                        </span>
                                        <span className="text-xs">
                                            {workplaceIndustry?.addressLine1},{' '}
                                            {workplaceIndustry?.addressLine2},{' '}
                                            {workplaceIndustry?.state},{' '}
                                            {workplaceIndustry?.suburb}{' '}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-2">
                                    <p className="text-[11px] text-gray-400">
                                        Contact Person
                                    </p>
                                    <div className="flex justify-between gap-x-4">
                                        <div>
                                            <p className="font-medium text-sm">
                                                {
                                                    workplaceIndustry?.contactPerson
                                                }
                                            </p>
                                            <p className="text-xs font-medium text-slate-400">
                                                {
                                                    workplaceIndustry?.contactPersonNumber
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    {/* <NoData text="No Workplace" /> */}
                    <div className="flex flex-col items-center">
                        <Image
                            src={'/images/icons/industry.png'}
                            width={48}
                            height={48}
                            alt={'No Workplace'}
                        />
                        <div className="text-center my-4">
                            <p className="font-semibold text-lg text-gray-500">
                                No Workplace
                            </p>
                            <p className="font-medium text-sm text-gray-400">
                                You don&apos;t have any workplace yet
                            </p>
                        </div>
                        {role === 'subadmin' && (
                            <AddWorkplace id={Number(id)} />
                        )}
                    </div>
                </div>
            )}
        </Card>
    )
}
