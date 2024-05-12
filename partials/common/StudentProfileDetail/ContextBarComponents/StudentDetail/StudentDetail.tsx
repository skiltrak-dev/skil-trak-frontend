import { Typography } from '@components'
import { useNotification } from '@hooks'
import { CallLogsModal } from '@partials/sub-admin/students/modals'
import { SubAdminApi } from '@queries'
import { Student } from '@types'
import { getGender } from '@utils'
import moment from 'moment'
import { ReactElement, useState } from 'react'
import { StudentDetailCard } from './StudentDetailCard'
import { LatestCallAnswer } from './LatestCallAnswer'

export const StudentDetail = ({ profile }: { profile: Student }) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    // const [callType, setCallType] = useState<string>(CallType.Answer)

    const { notification } = useNotification()

    const [callLog] = SubAdminApi.Student.useStudentCallLog()

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
                                title: 'Copied',
                                description: 'Phone Number Copied',
                            })
                        }}
                    >
                        <div
                            className="bg-primaryNew py-1.5 px-2.5 rounded"
                            onClick={onViewCallLogs}
                        >
                            <Typography
                                variant="xs"
                                color="text-white"
                                bold
                                underline
                            >
                                Call Log
                            </Typography>
                        </div>
                    </StudentDetailCard>
                    {profile?.callLog?.[0] &&
                    profile?.callLog?.[0]?.isAnswered === null ? (
                        <div className="px-2.5 pb-2 flex justify-between">
                            <Typography
                                normal
                                variant="xs"
                                color="text-gray-500 block"
                            >
                                Last Call Log
                            </Typography>
                            <LatestCallAnswer callLog={profile?.callLog?.[0]} />
                        </div>
                    ) : null}
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
