import {
    InitialAvatar,
    Tooltip,
    TooltipPosition,
    useAuthorizedUserComponent,
} from '@components'
import { UserRoles } from '@constants'
import { useScrollIntoView, useSubadminProfile } from '@hooks'
import { Student } from '@types'
import { isBrowser, maskText, setLink } from '@utils'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BsTicketDetailed } from 'react-icons/bs'
import { FaEnvelope, FaPhone } from 'react-icons/fa'
import { FiPhoneOff } from 'react-icons/fi'
import { ImPhone, ImPhoneHangUp } from 'react-icons/im'
import { LuFlagTriangleRight } from 'react-icons/lu'
import { MdSnooze } from 'react-icons/md'

export const StudentCellInfo = ({
    student,
    call,
    isHod,
}: {
    isHod?: boolean
    student: Student
    call?: boolean
}) => {
    const router = useRouter()

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

    const subadmin = useSubadminProfile()
    const isPermission = useAuthorizedUserComponent({
        roles: [UserRoles.ADMIN],
        isHod: subadmin?.departmentMember?.isHod,
    })

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
                            // router.push({
                            //     pathname: router.pathname,
                            //     query: {
                            //         ...router.query,
                            //         scrollId: student?.studentId,
                            //     },
                            // }) // First router.push is using for the save the full url in session storage to access when go back from detail page to list page
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
                                    <p
                                        className={
                                            'whitespace-nowrap text-xs text-gray-500'
                                        }
                                    >
                                        {student?.studentId}
                                    </p>
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
                                        <div className="group relative ">
                                            <LuFlagTriangleRight className="text-red-600 text-xl" />
                                            <Tooltip
                                                position={TooltipPosition.left}
                                            >
                                                Flagged Issue
                                            </Tooltip>
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
                                        <div className="rounded-full bg-success p-0.5">
                                            <ImPhone
                                                title={'Call Made and Answered'}
                                                className="text-white text-[10px]"
                                            />
                                        </div>
                                    ) : callLog.isAnswered === false ? (
                                        <div className="rounded-full bg-red-700 p-0.5">
                                            <ImPhoneHangUp
                                                title={
                                                    'Call Made and Not Answered'
                                                }
                                                className="text-white text-[10px]"
                                            />
                                        </div>
                                    ) : null)}
                            </div>
                            {/* <div className="flex items-center gap-x-2 ">
                                            <div
                                                className={`w-1 h-1 rounded-full ${
                                                    industries === null
                                                        ? 'bg-red-400'
                                                        : 'bg-green-400'
                                                } `}
                                            ></div>
                                            <Typography
                                                variant="muted"
                                                color="text-green-400"
                                            >
                                                Completed
                                            </Typography>
                                        </div> */}
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
                        <div className="flex items-center gap-x-2 text-sm">
                            <span className="text-gray-400">
                                <FaEnvelope />
                            </span>
                            <p className="text-gray-500">
                                {maskText(
                                    student?.user?.email,
                                    isPermission
                                        ? student?.user?.email?.length || 0
                                        : 4
                                )}
                            </p>
                        </div>
                        <div className="flex items-center gap-x-2 text-sm">
                            <span className="text-gray-400">
                                <FaPhone />
                            </span>
                            <p className="text-gray-500">
                                {maskText(
                                    student?.phone,
                                    isHod ? student?.phone?.length : 4
                                )}
                            </p>
                        </div>
                    </a>
                </Link>
            </div>
        </div>
    )
}
