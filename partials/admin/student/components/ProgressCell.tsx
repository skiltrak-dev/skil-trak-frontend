import { Typography } from '@components'
import { useContextBar } from '@hooks'
import { ChangeWorkplaceStatus } from '@partials/common'
import { SubAdmin } from '@types'
import classNames from 'classnames'
import moment from 'moment'
import { ReactElement, useState } from 'react'

type WorkplaceRequestStatus =
    | '1-NotRequested'
    | '2-Requested'
    | '3-Assigned'
    | '4-Interview'
    | '5-Waiting'
    | '6-Meeting'
    | '7-AgreementPending'
    | '8-AgreementSigned'
    | '9-PlacementStarted'
    | '10-PlacementCancelled'
    | '11-PlacementCompleted'
    | '12-Rejected'
    | '13-Terminated'

type CurrentStatus = {
    status: string
    description: string
    color: string
    image: string
    date?: string
}

const WorkplaceRequestProgress = (appliedIndustry?: any) => {
    return {
        '1-NotRequested': {
            status: 'Not Requested',
            description: 'Pending',
            color: 'text-gray-400',
            image: 'not-requested.png',
            date: '',
        },
        '2-Requested': {
            status: 'Request Sent',
            description: 'No Case Officer',
            color: 'text-orange-700',
            image: 'industry-check.png',
            date: appliedIndustry?.appliedDate,
        },
        '3-Assigned': {
            status: 'Assigned',
            description: 'Case Officer',
            color: 'text-orange-600',
            image: 'case-officer.png',
            date: appliedIndustry?.caseOfficerAssignedDate,
        },
        '4-Interview': {
            status: 'Interview',
            description: 'with Case Officer',
            color: 'text-orange-500',
            image: 'interview.png',
            date: appliedIndustry?.interviewDate,
        },
        '5-Waiting': {
            status: 'Waiting',
            description: 'for Workplace Response',
            color: 'text-indigo-400',
            image: 'waiting.png',
            date: appliedIndustry?.awaitingWorkplaceResponseDate,
        },
        '6-Meeting': {
            status: 'Appointment',
            description: 'with Workplace Supervisor',
            color: 'text-indigo-600',
            image: 'appointment.png',
            date: appliedIndustry?.appointmentBookedDate,
        },
        '7-AgreementPending': {
            status: 'Agreement & Eligibility',
            description: 'Checklist Pending',
            color: 'text-blue-500',
            image: 'agreement.png',
            date: appliedIndustry?.awaitingAgreementSignedDate,
        },
        '8-AgreementSigned': {
            status: 'Agreement & Eligibility',
            description: 'Checklist Signed',
            color: 'text-green-500',
            image: 'agreement.png',
            date: appliedIndustry?.AgreementSignedDate,
        },
        '9-PlacementStarted': {
            status: 'Placement Started',
            description: '',
            color: 'text-white',
            image: 'placement-started.png',
            date: appliedIndustry?.placementStartedDate,
        },
        '10-PlacementCancelled': {
            status: 'Placement Cancelled',
            description: 'placement-cancelled',
            color: 'text-error',
            image: 'placement-cancelled.png',
            date: appliedIndustry?.cancelledDate,
        },
        '11-PlacementCompleted': {
            status: 'Placement Completed',
            description: 'placement-completed',
            color: 'text-green-500',
            image: 'placement-cancelled.png',
            date: appliedIndustry?.isCompletedDate,
        },
        '12-NotResponded': {
            status: 'Industry NotResponded',
            description: 'industry not-responded',
            color: 'text-green-500',
            image: 'placement-cancelled.png',
            date: appliedIndustry?.industryResponseDate,
        },
        '13-Rejected': {
            status: 'Rejected',
            description: 'placement-rejected',
            color: 'text-error',
            image: 'placement-cancelled.png',
        },
        '14-Terminated': {
            status: 'Terminated',
            description: 'placement-terminated',
            color: 'text-error',
            image: 'placement-cancelled.png',
            date: appliedIndustry?.terminatedDate,
        },
    }
}

export const ProgressCell = ({
    studentId,
    status,
    step,
    assigned,
    appliedIndustry,
}: {
    studentId?: number
    status?: WorkplaceRequestStatus
    step: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | number
    assigned?: SubAdmin
    appliedIndustry: any
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    // const currentStatus = WorkplaceRequestProgress[status]
    const currentStatus: CurrentStatus = Object.values(
        WorkplaceRequestProgress(appliedIndustry)
    )[step - 1]

    const contextBar = useContextBar()

    const classes = classNames({
        'px-2 py-1 rounded-md flex items-center gap-x-2 min-w-max': true,
        'bg-white':
            currentStatus.status !==
            WorkplaceRequestProgress()['9-PlacementStarted'].status,
        'bg-green-500':
            currentStatus.status ===
            WorkplaceRequestProgress()['9-PlacementStarted'].status,
    })

    const onProgressClicked = (studentId: number | undefined) => {
        contextBar.setContent(<ChangeWorkplaceStatus studentId={studentId} />)
        contextBar.show()
        contextBar.setTitle('Change Workplace Status')
    }

    return (
        <>
            {modal}
            <div
                className={`${classes} ${step > 1 ? 'cursor-pointer' : ''}`}
                onClick={() => {
                    if (step > 1) {
                        onProgressClicked(studentId)
                    }
                }}
            >
                <img
                    src={`/images/students/workplace-progress/${currentStatus.image}`}
                    alt=""
                    width={24}
                />
                <div>
                    <p
                        className={`${currentStatus.color} text-xs font-semibold whitespace-nowrap`}
                    >
                        {currentStatus.status}
                    </p>
                    {assigned ? (
                        <Typography variant={'xs'} color={'text-gray-500'}>
                            <span className="font-semibold">
                                <span className="text-gray-400">CO-</span>{' '}
                                {assigned?.user?.name}
                            </span>
                        </Typography>
                    ) : (
                        <p className="text-[11px] text-gray-400 whitespace-nowrap">
                            {currentStatus.description}
                        </p>
                    )}
                    {currentStatus?.date && (
                        <Typography>
                            <span className="text-[10px] font-semibold">
                                {' '}
                                {moment(currentStatus?.date).format(
                                    'Do MMM YYYY'
                                )}
                            </span>
                        </Typography>
                    )}
                </div>
            </div>
        </>
    )
}
