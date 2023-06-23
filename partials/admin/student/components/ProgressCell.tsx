import { Modal, Typography } from '@components'
import { useContextBar } from '@hooks'
import { ChangeWorkplaceStatus } from '@partials/common'
import { RequestType } from '@partials/sub-admin/workplace/components'
import { Student, SubAdmin, User } from '@types'
import classNames from 'classnames'
import Link from 'next/link'
import { ReactElement, useState } from 'react'
import { MdEmail, MdPhoneIphone } from 'react-icons/md'

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

const WorkplaceRequestProgress = {
    '1-NotRequested': {
        status: 'Not Requested',
        description: 'Pending',
        color: 'text-gray-400',
        image: 'not-requested.png',
    },
    '2-Requested': {
        status: 'Request Sent',
        description: 'No Case Officer',
        color: 'text-orange-700',
        image: 'industry-check.png',
    },
    '3-Assigned': {
        status: 'Assigned',
        description: 'Case Officer',
        color: 'text-orange-600',
        image: 'case-officer.png',
    },
    '4-Interview': {
        status: 'Interview',
        description: 'with Case Officer',
        color: 'text-orange-500',
        image: 'interview.png',
    },
    '5-Waiting': {
        status: 'Waiting',
        description: 'for Workplace Response',
        color: 'text-indigo-400',
        image: 'waiting.png',
    },
    '6-Meeting': {
        status: 'Appointment',
        description: 'with Workplace Supervisor',
        color: 'text-indigo-600',
        image: 'appointment.png',
    },
    '7-AgreementPending': {
        status: 'Agreement & Eligibility',
        description: 'Checklist Pending',
        color: 'text-blue-500',
        image: 'agreement.png',
    },
    '8-AgreementSigned': {
        status: 'Agreement & Eligibility',
        description: 'Checklist Signed',
        color: 'text-green-500',
        image: 'agreement.png',
    },
    '9-PlacementStarted': {
        status: 'Placement Started',
        description: '',
        color: 'text-white',
        image: 'placement-started.png',
    },
    '10-PlacementCancelled': {
        status: 'Placement Cancelled',
        description: 'placement-cancelled',
        color: 'text-error',
        image: 'placement-cancelled.png',
    },
    '11-PlacementCompleted': {
        status: 'Placement Completed',
        description: 'placement-completed',
        color: 'text-green-500',
        image: 'placement-cancelled.png',
    },
    '12-NotResponded': {
        status: 'Industry NotResponded',
        description: 'industry not-responded',
        color: 'text-green-500',
        image: 'placement-cancelled.png',
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
    },
}

export const ProgressCell = ({
    studentId,
    status,
    step,
    assigned,
}: {
    studentId?: number
    status?: WorkplaceRequestStatus
    step: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | number
    assigned?: SubAdmin
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    // const currentStatus = WorkplaceRequestProgress[status]
    const currentStatus = Object.values(WorkplaceRequestProgress)[step - 1]

    const contextBar = useContextBar()

    const classes = classNames({
        'px-2 py-1 rounded-md flex items-center gap-x-2 min-w-max': true,
        'bg-white':
            currentStatus.status !==
            WorkplaceRequestProgress['9-PlacementStarted'].status,
        'bg-green-500':
            currentStatus.status ===
            WorkplaceRequestProgress['9-PlacementStarted'].status,
    })

    const onCancelModal = () => {
        setModal(null)
    }

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
                </div>
            </div>
        </>
    )
}
