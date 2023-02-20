import { Student } from '@types'
import classNames from 'classnames'
import Link from 'next/link'
import { MdEmail, MdPhoneIphone } from 'react-icons/md'

type StudentProgressStatus =
    | '1-PlacementStarted'
    | '2-Completed'
    | '3-Cancelled'
    | '4-Terminated'

const StudentProgress = {
    '1-PlacementStarted': {
        status: 'Placement Started',
        description: '',
        color: 'text-white',
        image: 'placement-started.png',
    },
    '2-Completed': {
        status: 'Completed',
        description: '',
        color: 'text-green-500',
        image: 'placement-started.png',
    },
    '3-Expired': {
        status: 'Expired',
        description: 'expired',
        color: 'text-red-500',
        image: 'placement-started.png',
    },
    '4-Cancelled': {
        status: 'Cancelled',
        description: 'cancelled',
        color: 'text-error',
        image: 'placement-cancelled.png',
    },
    '5-Terminated': {
        status: 'Terminated',
        description: 'terminated',
        color: 'text-error',
        image: 'placement-cancelled.png',
    },
}

export const StudentStatusProgressCell = ({
    status,
    step,
}: {
    status?: StudentProgressStatus
    step: 1 | 2 | 3 | 4 | number
}) => {
    // const currentStatus = StudentProgress[status]
    const currentStatus = Object.values(StudentProgress)[step - 1]

    const classes = classNames({
        'px-2 py-1 rounded-md flex items-center gap-x-2 min-w-max': true,
        'bg-white':
            currentStatus.status !==
            StudentProgress['1-PlacementStarted'].status,
        'bg-green-500':
            currentStatus.status ===
            StudentProgress['1-PlacementStarted'].status,
    })

    return (
        <div className={classes}>
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
                <p className="text-[11px] text-gray-400 whitespace-nowrap">
                    {currentStatus.description}
                </p>
            </div>
        </div>
    )
}
