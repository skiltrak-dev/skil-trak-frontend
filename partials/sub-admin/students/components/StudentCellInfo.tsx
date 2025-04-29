import { InitialAvatar, Tooltip, TooltipPosition } from '@components'
import { useScrollIntoView, useSubadminProfile } from '@hooks'
import { Student } from '@types'
import { isBrowser, setLink } from '@utils'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BsTicketDetailed } from 'react-icons/bs'
import { FiPhoneOff } from 'react-icons/fi'
import { ImPhone, ImPhoneHangUp } from 'react-icons/im'
import { LuFlagTriangleRight } from 'react-icons/lu'
import { MdSnooze } from 'react-icons/md'

export const StudentCellInfo = ({
    student,
    call,
}: {
    student: Student
    call?: boolean
}) => {
    const router = useRouter()

    const subadmin = useSubadminProfile()

    useScrollIntoView(student) // Scroll into view with scroll ID

    const callLog = student?.callLog?.reduce(
        (a: any, b: any) => (a?.createdAt > b?.createdAt ? a : b),
        {
            isExpired: true,
            createdAt: null,
        }
    )

    const today = moment()
    const startDate = today.startOf('week').format('MM-DD-YYYY')
    const endDate = today.endOf('week').format('MM-DD-YYYY')
    const createdAt = moment(callLog?.createdAt, 'YYYY-MM-DD')

    const isDateExist = createdAt.isBetween(startDate, endDate, 'day')

    return (
        <div
            className="flex items-center relative z-10"
            id={student?.studentId}
        >
            <div className="flex items-center gap-x-2">
                <div>
                    {student?.user?.name && (
                        <InitialAvatar
                            name={student?.user?.name}
                            imageUrl={student?.user?.avatar}
                        />
                    )}
                </div>

                <Link
                    href={`${
                        router.pathname === '/portals/sub-admin/talent-pool'
                            ? '#'
                            : `/portals/sub-admin/students/${student?.id}/detail`
                    }`}
                    legacyBehavior
                >
                    <a
                        onClick={() => {
                            setLink('subadmin-student', router)
                            if (isBrowser()) {
                                sessionStorage.setItem(
                                    'scrollId',
                                    student?.studentId
                                )
                            }
                        }}
                    >
                        <div className="flex items-center gap-x-2">
                            <div className="flex items-center gap-x-2">
                                <div className="flex items-center gap-x-2">
                                    {subadmin?.isManager && (
                                        <p
                                            className={
                                                'whitespace-nowrap text-xs text-gray-500'
                                            }
                                        >
                                            {student?.studentId}
                                        </p>
                                    )}
                                    {student?.nonContactable && (
                                        <div className="group relative bg-red-600 p-1 rounded-full flex items-center justify-center">
                                            <FiPhoneOff className="text-white text-[10px]" />
                                            <Tooltip
                                                position={TooltipPosition.left}
                                            >
                                                Not Contactable
                                            </Tooltip>
                                        </div>
                                    )}
                                    {student?.hasIssue && (
                                        <div className="flex items-center">
                                            <div className="group relative ">
                                                <LuFlagTriangleRight className="text-red-600 text-xl" />
                                                <Tooltip
                                                    position={
                                                        TooltipPosition.left
                                                    }
                                                >
                                                    Flagged Issue
                                                </Tooltip>
                                            </div>
                                            {student?.isReported && (
                                                <div className="group relative">
                                                    <div className="text-red-600 text-lg font-bold">
                                                        R
                                                    </div>
                                                    <Tooltip
                                                        position={
                                                            TooltipPosition.left
                                                        }
                                                    >
                                                        Reported to RTO
                                                    </Tooltip>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    {student?.isHighPriority && (
                                        <div className="rounded-md whitespace-nowrap px-1 py-0.5 border border-red-400 text-red-400 text-xs font-medium">
                                            High Priority
                                        </div>
                                    )}
                                </div>
                                {call &&
                                    isDateExist &&
                                    (callLog.isAnswered ? (
                                        <div className="rounded-full bg-success p-0.5 relative group">
                                            <ImPhone className="text-white text-[10px]" />
                                            <Tooltip>
                                                Call Made and Answered
                                            </Tooltip>
                                        </div>
                                    ) : callLog.isAnswered === false ? (
                                        <div className="rounded-full bg-red-700 p-0.5 relative group">
                                            <ImPhoneHangUp className="text-white text-[10px]" />
                                            <Tooltip>
                                                Call Made and Not Answered
                                            </Tooltip>
                                        </div>
                                    ) : null)}
                            </div>
                        </div>
                        <div className="flex items-center gap-x-1.5">
                            <p className="text-gray-800 font-medium">
                                {student?.user?.name} {student?.familyName}{' '}
                            </p>
                            {student?.tickets &&
                            student?.tickets?.length > 0 ? (
                                <div className="w-4 h-4 rounded  relative group">
                                    <BsTicketDetailed className="text-black text-lg" />
                                    <Tooltip>Ticket Created</Tooltip>
                                </div>
                            ) : null}
                            {student?.isSnoozed ? (
                                <div className="w-4 h-4 rounded  relative group">
                                    <MdSnooze
                                        size={17}
                                        className="text-red-500"
                                    />
                                    <Tooltip>Student Snoozed</Tooltip>
                                </div>
                            ) : null}
                        </div>
                    </a>
                </Link>
            </div>
        </div>
    )
}
