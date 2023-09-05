import { Card } from '@components/cards'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { IoBriefcase } from 'react-icons/io5'

//queries
import { LoadingAnimation, StudentSubAdmin, WorkplaceAvatar } from '@components'
import { ActionButton } from '@components/buttons'
import { UserRoles } from '@constants'
import { useContextBar } from '@hooks'
import { RemoveIndustryModal } from '@partials/sub-admin/workplace/modals'
import { useGetSubAdminStudentWorkplaceQuery } from '@queries'
import { UserStatus } from '@types'
import { WorkplaceCurrentStatus, getUserCredentials } from '@utils'
import { ReactElement, useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { AddSecondWPCB } from '../contextBar'
import { AddWorkplace } from './AddWorkplace'

export const MyWorkplace = ({ student }: { student: StudentSubAdmin }) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [currentStatus, setCurrentStatus] = useState<string | null>(null)

    const pathname = useRouter()
    const profileId = pathname.query.profileId

    const [workplaceIndustries, setWorkplaceIndustries] = useState<any>([])
    const [isSecondWorkplaceView, setSsSecondWorkplaceView] =
        useState<boolean>(false)
    const [industry, setIndustry] = useState<any>({})

    const workplace = useGetSubAdminStudentWorkplaceQuery(student?.id, {
        skip: !student?.id,
    })

    const contextBar = useContextBar()

    useEffect(() => {
        if (
            workplace.isSuccess &&
            workplace.data &&
            workplace?.data?.length > 0
        ) {
            setCurrentStatus(workplace.data[0]?.currentStatus)
        }
    }, [workplace])

    useEffect(() => {
        if (student?.industries && student?.industries?.length > 0) {
            setIndustry(student?.industries?.[0])
        }
        if (!student?.industries?.length) {
            setIndustry({})
        }
    }, [student?.industries])

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
    const status = getUserCredentials()?.status

    const onCancelClicked = () => {
        setModal(null)
    }

    const onDeleteIndustry = (industry: any) => {
        setModal(
            <RemoveIndustryModal
                industry={industry}
                onCancel={onCancelClicked}
                studentId={student?.id}
            />
        )
    }

    const WorkplaceStatusData = ({
        imageUrl,
        title,
        subTitle,
    }: {
        imageUrl: string
        title: string
        subTitle: string
    }) => {
        return (
            <div className="flex flex-col items-center">
                <Image
                    src={imageUrl}
                    width={48}
                    height={48}
                    alt={'No Workplace'}
                />
                <div className="text-center my-4">
                    <p className="font-semibold text-lg text-gray-500">
                        {title}
                    </p>
                    <p className="font-medium text-sm text-gray-400">
                        {subTitle}
                    </p>
                </div>
            </div>
        )
    }

    const noWorkplace = () => {
        return (
            <>
                <WorkplaceStatusData
                    imageUrl={'/images/icons/industry.png'}
                    title={'No Workplace'}
                    subTitle={'You dont have any workplace yet'}
                />
                {role === UserRoles.SUBADMIN &&
                    student?.user?.status === UserStatus.Approved && (
                        <div className="flex justify-center">
                            <AddWorkplace id={Number(student?.id)} />
                        </div>
                    )}
            </>
        )
    }

    const workplaceStatus = () => {
        switch (currentStatus) {
            case WorkplaceCurrentStatus.NotRequested:
                return noWorkplace()
            case WorkplaceCurrentStatus.Applied:
                return (
                    <WorkplaceStatusData
                        imageUrl={
                            '/images/students/workplace-progress/industry-check.png'
                        }
                        title={'Request Sent'}
                        subTitle={'No Case Officer'}
                    />
                )
            case WorkplaceCurrentStatus.CaseOfficerAssigned:
                return (
                    <WorkplaceStatusData
                        imageUrl={
                            '/images/students/workplace-progress/case-officer.png'
                        }
                        title={'Assigned'}
                        subTitle={'Case Officer'}
                    />
                )
            case WorkplaceCurrentStatus.Interview:
                return (
                    <WorkplaceStatusData
                        imageUrl={
                            '/images/students/workplace-progress/interview.png'
                        }
                        title={'Interview'}
                        subTitle={'with Case Officer'}
                    />
                )
            case WorkplaceCurrentStatus.AwaitingWorkplaceResponse:
                return (
                    <WorkplaceStatusData
                        imageUrl={
                            '/images/students/workplace-progress/waiting.png'
                        }
                        title={'Waiting'}
                        subTitle={'for Workplace Response'}
                    />
                )
            case WorkplaceCurrentStatus.AppointmentBooked:
                return (
                    <WorkplaceStatusData
                        imageUrl={
                            '/images/students/workplace-progress/appointment.png'
                        }
                        title={'Appointment'}
                        subTitle={'with Workplace Supervisor'}
                    />
                )
            case WorkplaceCurrentStatus.AwaitingAgreementSigned:
                return (
                    <WorkplaceStatusData
                        imageUrl={
                            '/images/students/workplace-progress/agreement.png'
                        }
                        title={'Agreement & Eligibility'}
                        subTitle={'Checklist Pending'}
                    />
                )
            case WorkplaceCurrentStatus.AgreementSigned:
                return (
                    <WorkplaceStatusData
                        imageUrl={
                            '/images/students/workplace-progress/agreement.png'
                        }
                        title={'Agreement & Eligibility'}
                        subTitle={'Checklist Signed'}
                    />
                )
            case WorkplaceCurrentStatus.PlacementStarted:
                return (
                    <WorkplaceStatusData
                        imageUrl={
                            '/images/students/workplace-progress/placement-started.png'
                        }
                        title={'Placement Started'}
                        subTitle={'Placement Started'}
                    />
                )
            case WorkplaceCurrentStatus.Cancelled:
                return (
                    <WorkplaceStatusData
                        imageUrl={
                            '/images/students/workplace-progress/placement-cancelled.png'
                        }
                        title={'Placement Cancelled'}
                        subTitle={'placement-cancelled'}
                    />
                )
            case WorkplaceCurrentStatus.Completed:
                return (
                    <WorkplaceStatusData
                        imageUrl={
                            '/images/students/workplace-progress/placement-started.png'
                        }
                        title={'Placement Completed'}
                        subTitle={'placement-completed'}
                    />
                )
            case WorkplaceCurrentStatus.NoResponse:
                return (
                    <WorkplaceStatusData
                        imageUrl={
                            '/images/students/workplace-progress/placement-cancelled.png'
                        }
                        title={'Industry NotResponded'}
                        subTitle={'industry not-responded'}
                    />
                )
            case WorkplaceCurrentStatus.Rejected:
                return (
                    <WorkplaceStatusData
                        imageUrl={
                            '/images/students/workplace-progress/placement-cancelled.png'
                        }
                        title={'Rejected'}
                        subTitle={'placement-rejected'}
                    />
                )
            case WorkplaceCurrentStatus.Terminated:
                return (
                    <WorkplaceStatusData
                        imageUrl={
                            '/images/students/workplace-progress/placement-cancelled.png'
                        }
                        title={'Terminated'}
                        subTitle={'placement-terminated'}
                    />
                )
            default:
                return noWorkplace()
        }
    }

    const industryByWorkplace =
        workplace?.data &&
        workplace?.data?.length > 0 &&
        workplace?.data[0]?.industries?.find(
            (ind: any) => ind?.industry?.id === industry?.id
        )

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
                            onClick={() =>
                                onDeleteIndustry(industryByWorkplace)
                            }
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

                    {role !== 'rto' && student?.industries?.length > 1 ? (
                        <ActionButton
                            variant={'link'}
                            onClick={() => {
                                isSecondWorkplaceView
                                    ? setIndustry(student?.industries[0])
                                    : setIndustry(student?.industries[1])
                                setSsSecondWorkplaceView(!isSecondWorkplaceView)
                            }}
                        >
                            {isSecondWorkplaceView
                                ? 'View First'
                                : 'View Second'}
                        </ActionButton>
                    ) : null}
                    {role !== 'rto' && student?.industries?.length === 1 ? (
                        <ActionButton
                            variant={'link'}
                            onClick={() => {
                                contextBar.setContent(
                                    <AddSecondWPCB studentId={student?.id} />
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
            ) : workplace.isLoading ? (
                <LoadingAnimation />
            ) : (
                <div>{workplaceStatus()}</div>
            )}
        </Card>
    )
}
