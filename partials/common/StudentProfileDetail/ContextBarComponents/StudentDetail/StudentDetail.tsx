import { Typography } from '@components'
import { useNotification } from '@hooks'
import { CallLogsModal } from '@partials/sub-admin/students/modals'
import { SubAdminApi } from '@queries'
import { Student } from '@types'
import { getGender } from '@utils'
import moment from 'moment'
import { ReactElement, useState } from 'react'
import { StudentDetailCard } from './StudentDetailCard'

export const StudentDetail = ({ profile }: { profile: Student }) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    // const [callType, setCallType] = useState<string>(CallType.Answer)

    const { notification } = useNotification()

    const [callLog] = SubAdminApi.Student.useStudentCallLog()

    // const [isAnsweredCall, isAnsweredCallResult] =
    //     SubAdminApi.Student.useStudentAnsweredCall()

    const onViewCallLogs = (e: any) => {
        e.stopPropagation()
        setModal(
            <CallLogsModal
                studentId={profile?.id}
                onCancel={() => {
                    setModal(null)
                }}
            />
        )
    }
    return (
        <div className="mt-5">
            {modal}
            <Typography variant="small" medium>
                Student Details
            </Typography>

            <div className="mt-1.5 flex flex-col gap-y-1.5">
                <div className="flex items-center gap-x-[5px]">
                    <StudentDetailCard
                        title="Student ID"
                        detail={profile?.studentId}
                    />
                    <StudentDetailCard
                        title="Student Batch"
                        detail={profile?.batch}
                    />
                </div>
                <div className="border border-[#6B728050] rounded-md">
                    <StudentDetailCard
                        border={false}
                        title="Phone Number"
                        detail={profile?.phone}
                        onClick={() => {
                            navigator.clipboard.writeText(profile?.phone)
                            callLog({
                                student: profile?.id,
                            }).then((res: any) => {
                                if (res?.data) {
                                    notification.success({
                                        title: 'Called Student',
                                        description: `Called Student with Id: ${profile.studentId}`,
                                    })
                                }
                            })
                            notification.success({
                                title: 'Cpoied',
                                description: 'Phone Number Copied',
                            })
                        }}
                    >
                        <div onClick={onViewCallLogs}>
                            <Typography
                                variant="xs"
                                color="text-primaryNew"
                                bold
                                underline
                            >
                                Call Log
                            </Typography>
                        </div>
                    </StudentDetailCard>
                    <div className="px-2.5 pb-2">
                        <Typography
                            normal
                            variant="xxs"
                            color="text-[#979797] block"
                        >
                            Last Call Log
                        </Typography>
                        <div className="flex items-center gap-x-1">
                            {/* <div
                                className="group relative p-1 rounded-full bg-red-500 cursor-pointer"
                                onClick={() => {
                                    setCallType(CallType.NotAnswer)
                                    isAnsweredCall({
                                        id: callLog?.id,
                                        status: 'false',
                                    })
                                }}
                            >
                                <ImPhoneHangUp className="text-white text-[10px]" />
                            </div>
                            <div
                                className="group relative p-1 rounded-full bg-success cursor-pointer"
                                onClick={() => {
                                    setCallType(CallType.Answer)
                                    isAnsweredCall({
                                        id: callLog?.id,
                                        status: 'true',
                                    })
                                }}
                            >
                                <ImPhone className="text-white text-[10px]" />
                            </div> */}
                        </div>
                    </div>
                </div>
                <div>
                    <StudentDetailCard
                        title="Account Created"
                        detail={moment(profile?.createdAt).format(
                            'Do MMM YYYY - hh:mm:ss A'
                        )}
                    />
                </div>
                <div className="flex items-center gap-x-[5px]">
                    <StudentDetailCard
                        title="Age Range"
                        detail={profile?.age}
                    />
                    <StudentDetailCard
                        title="Gender"
                        detail={
                            profile?.gender
                                ? String(getGender(profile?.gender))
                                : '---'
                        }
                    />
                </div>
                <div>
                    <StudentDetailCard
                        title="Location"
                        detail={`${profile?.suburb}, ${profile?.state}, ${profile?.addressLine1}`}
                    />
                </div>

                <div>
                    <StudentDetailCard
                        title="Student Type"
                        detail={
                            profile?.isInternational
                                ? 'International'
                                : 'Domestic'
                        }
                    />
                </div>
            </div>
        </div>
    )
}
