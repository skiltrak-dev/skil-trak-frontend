import React, { ReactElement, useState } from 'react'
import { LatestCallAnswer } from './LatestCallAnswer'
import {
    AuthorizedUserComponent,
    Typography,
    useIsRestricted,
    useRestrictedData,
} from '@components'
import { Student } from '@types'
import { SubAdminApi } from '@queries'
import { UserRoles } from '@constants'
import { getUserCredentials } from '@utils'
import { useMaskText, useNotification } from '@hooks'
import { UserProfileDetailCard } from '@partials/common/Cards'
import { CallLogsModal } from '@partials/sub-admin/students/modals'

export const StudentPhoneInfo = ({ profile }: { profile: Student }) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const { notification } = useNotification()

    const canAccess = useIsRestricted(UserRoles.STUDENT)

    const role = getUserCredentials()?.id

    const studentLog = SubAdminApi.Student.getSingleStudentCallLog(
        profile?.id,
        {
            skip: !profile?.id,
        }
    )
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
        <>
            {modal}
            <div className="border border-[#6B728050] rounded-md">
                <UserProfileDetailCard
                    border={false}
                    title="Phone Number"
                    detail={useRestrictedData(
                        useMaskText({
                            key: profile?.phone,
                        }),
                        UserRoles.STUDENT
                    )}
                    onClick={() => {
                        if (canAccess && role !== UserRoles.OBSERVER) {
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
                        }
                    }}
                >
                    <AuthorizedUserComponent
                        excludeRoles={[UserRoles.OBSERVER]}
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
                    </AuthorizedUserComponent>
                </UserProfileDetailCard>
                {studentLog?.data && studentLog?.data?.isAnswered === null ? (
                    <div className="px-2.5 pb-2 flex justify-between">
                        <Typography
                            normal
                            variant="xs"
                            color="text-gray-500 block"
                        >
                            Last Call Log
                        </Typography>
                        <LatestCallAnswer callLog={studentLog?.data} />
                    </div>
                ) : null}
            </div>
        </>
    )
}
