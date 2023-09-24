import { Typography } from '@components/Typography'
import { useContextBar } from '@hooks'
import { ChangeWorkplaceStatus } from '@partials/common'
import { Student } from '@types'
import classNames from 'classnames'
import moment from 'moment'
import Link from 'next/link'
import { MdEmail, MdPhoneIphone } from 'react-icons/md'

type StudentProgressStatus =
    | '1-PlacementStarted'
    | '2-Completed'
    | '3-Cancelled'
    | '4-Terminated'

type StudentPrgressStatusDetail = {
    status: string
    description: string
    color: string
    image: string
    date?: string
}

const StudentProgress = (appliedIndustry?: any) => ({
    '1-PlacementStarted': {
        status: 'Placement Started',
        description: '',
        color: 'text-white',
        image: 'placement-started.png',
        date: appliedIndustry?.placementStartedDate,
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
        status: 'Placement Cancelled',
        description: 'placement cancelled',
        color: 'text-error',
        image: 'placement-cancelled.png',
    },
    '5-Terminated': {
        status: 'Terminated',
        description: 'terminated',
        color: 'text-error',
        image: 'placement-cancelled.png',
    },
})

export const StudentStatusProgressCell = ({
    studentId,
    status,
    step,
    appliedIndustry,
}: {
    studentId?: any
    status?: StudentProgressStatus
    step: 1 | 2 | 3 | 4 | number
    appliedIndustry: any
}) => {
    console.log('Place', appliedIndustry)
    const contextBar = useContextBar()
    // const currentStatus = StudentProgress[status]
    const currentStatus: StudentPrgressStatusDetail = Object.values(
        StudentProgress(appliedIndustry)
    )[step - 1]

    const classes = classNames({
        'px-2 py-1 rounded-md flex items-center gap-x-2 min-w-max cursor-pointer':
            true,
        'bg-white':
            currentStatus.status !==
            StudentProgress()['1-PlacementStarted'].status,
        'bg-green-500':
            currentStatus.status ===
            StudentProgress()['1-PlacementStarted'].status,
    })

    const onProgressClicked = (studentId: number | undefined) => {
        contextBar.setContent(<ChangeWorkplaceStatus studentId={studentId} />)
        contextBar.show()
        contextBar.setTitle('Change Workplace Status')
    }

    return (
        <div
            className={classes}
            onClick={() => {
                onProgressClicked(studentId)
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
                <p className="text-[11px] text-gray-400 whitespace-nowrap">
                    {currentStatus.description}
                </p>
                {currentStatus?.date && (
                    <Typography>
                        <span className="text-[10px] font-semibold">
                            {moment(currentStatus?.date).format('Do MMM YYYY')}
                        </span>
                    </Typography>
                )}
            </div>
        </div>
    )
}
