import { Typography } from '@components'
import React, { ReactElement, useState } from 'react'
import { StudentDetailCard } from './StudentDetailCard'
import { Student } from '@types'
import moment from 'moment'
import { getGender } from '@utils'
import { CallLogsModal } from '@partials/sub-admin/students/modals'
import { SubAdminApi } from '@queries'
import { useNotification } from '@hooks'

export const StudentDetail = ({ profile }: { profile: Student }) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const { notification } = useNotification()

    const [callLog, callLogResult] = SubAdminApi.Student.useStudentCallLog()

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
                <div>
                    <StudentDetailCard
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
                                variant="badge"
                                color="text-primaryNew"
                                bold
                                underline
                            >
                                Call Log
                            </Typography>
                        </div>
                    </StudentDetailCard>
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
                        detail={String(getGender(profile?.gender))}
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
