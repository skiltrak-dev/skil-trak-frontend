import { InitialAvatar } from '@components'
import { Student } from '@types'
import moment from 'moment'
import Link from 'next/link'
import { ImPhone, ImPhoneHangUp } from 'react-icons/im'
import { MdEmail, MdPhone, MdPhoneIphone } from 'react-icons/md'

export const StudentCellInfo = ({
    student,
    call,
}: {
    student: Student
    call?: boolean
}) => {
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
        <Link
            legacyBehavior
            href={`/portals/rto/students/${student?.id}?tab=overview`}
        >
            <a className="flex items-center gap-x-2">
                <div className="shadow-inner-image rounded-full">
                    {student?.user?.name && (
                        <InitialAvatar
                            name={student?.user?.name}
                            imageUrl={student?.user?.avatar}
                        />
                    )}
                </div>
                <div>
                    <div className="flex items-center gap-x-2">
                        <p className="flex items-center gap-x-1 text-xs">
                            {student?.studentId}
                        </p>
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
                                        title={'Call Made and Not Answered'}
                                        className="text-white text-[10px]"
                                    />
                                </div>
                            ) : null)}
                    </div>
                    <p className="font-semibold">
                        {student?.user?.name} {student?.familyName}
                    </p>
                    <div className="font-medium text-xs text-gray-500">
                        <p className="flex items-center gap-x-1">
                            <span>
                                <MdEmail />
                            </span>
                            {student?.user?.email}
                        </p>
                    </div>
                    <div className="font-medium text-xs text-gray-500">
                        <p className="flex items-center gap-x-1">
                            <span>
                                <MdPhone />
                            </span>
                            {student?.phone}
                        </p>
                    </div>
                </div>
            </a>
        </Link>
    )
}
