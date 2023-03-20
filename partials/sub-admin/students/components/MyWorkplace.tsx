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
import { useState, useEffect, ReactElement } from 'react'
import { AddWorkplace } from './AddWorkplace'
import { useContextBar } from '@hooks'
import { AddSecondWPCB } from '../contextBar'
import { MdDelete } from 'react-icons/md'
import { RemoveIndustryModal } from '@partials/sub-admin/workplace/modals'

export const MyWorkplace = ({
    id,
    industries,
}: {
    industries: any
    id: number
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const pathname = useRouter()
    const profileId = pathname.query.profileId

    const [workplaceIndustries, setWorkplaceIndustries] = useState<any>([])
    const [isSecondWorkplaceView, setSsSecondWorkplaceView] =
        useState<boolean>(false)
    const [industry, setIndustry] = useState<any>({})

    const workplace = useGetSubAdminStudentWorkplaceQuery(id, { skip: !id })
    const contextBar = useContextBar()

    useEffect(() => {
        if (industries && industries?.length > 0) {
            setIndustry(industries[0])
        }
        if (!industries?.length) {
            setIndustry({})
        }
    }, [industries])

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

    const onCancelClicked = () => {
        setModal(null)
    }

    const onDeleteIndustry = (industry: any) => {
        setModal(
            <RemoveIndustryModal
                industry={industry}
                onCancel={onCancelClicked}
                studentId={id}
            />
        )
    }

    return (
        <Card fullHeight>
            {modal}
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
                <div className="flex justify-between gap-x-1">
                    {Object.keys(industry)?.length > 0 && (
                        <ActionButton
                            mini
                            Icon={MdDelete}
                            variant={'error'}
                            title={'Delete Industry'}
                            onClick={() => {
                                onDeleteIndustry(industry)
                            }}
                        />
                    )}
                    {role !== 'rto' && Object.keys(industry)?.length > 0 ? (
                        <ActionButton
                            variant="success"
                            onClick={() => {
                                pathname.push(
                                    role === 'admin'
                                        ? `/portals/admin/industry/${industry?.id}?tab=sectors`
                                        : `/portals/sub-admin/users/industries/${industry?.id}?tab=overview`
                                )
                            }}
                        >
                            See Details
                        </ActionButton>
                    ) : null}

                    {role !== 'rto' && industries?.length > 1 ? (
                        <ActionButton
                            variant={'link'}
                            onClick={() => {
                                isSecondWorkplaceView
                                    ? setIndustry(industries[0])
                                    : setIndustry(industries[1])
                                setSsSecondWorkplaceView(!isSecondWorkplaceView)
                            }}
                        >
                            {isSecondWorkplaceView
                                ? 'View First'
                                : 'View Second'}
                        </ActionButton>
                    ) : null}
                    {role !== 'rto' && industries?.length === 1 ? (
                        <ActionButton
                            variant={'link'}
                            onClick={() => {
                                contextBar.setContent(
                                    <AddSecondWPCB studentId={id} />
                                )
                                contextBar.show(false)
                            }}
                        >
                            Add Second
                        </ActionButton>
                    ) : null}
                </div>
            </div>
            {/* Card Body */}
            {Object.keys(industry)?.length > 0 ? (
                <div key={industry?.id} className="mt-4">
                    <div className="flex gap-x-6 mb-4">
                        <div className="flex-shrink-0">
                            <WorkplaceAvatar />
                        </div>
                        <div>
                            <div>
                                <p className="font-medium">
                                    {industry?.user?.name}
                                </p>
                                <p className="text-slate-400 text-sm">
                                    {industry?.user?.email}
                                </p>
                            </div>
                            <div>
                                {/* <div>
                                        <p className="font-medium">
                                            {
                                                industry?.industries[0]?.industry
                                                    ?.user?.name
                                            }
                                        </p>
                                        <p className="text-slate-400 text-sm">
                                            {
                                                industry?.industries[0]?.industry
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
                                            {industry?.addressLine1},{' '}
                                            {industry?.addressLine2},{' '}
                                            {industry?.state},{' '}
                                            {industry?.suburb}{' '}
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
                                                {industry?.contactPerson}
                                            </p>
                                            <p className="text-xs font-medium text-slate-400">
                                                {industry?.contactPersonNumber}
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
