import { ActionButton, ShowErrorNotifications, Typography } from '@components'
import {
    Avatar,
    RtoDetail,
    StudentExpireTime,
} from '@partials/common/StudentProfileDetail/ContextBarComponents'
import { Student, UserStatus } from '@types'
import React from 'react'
import {
    EmergencyContact,
    StudentFeedBack,
    StudentDetail,
    StudentRelatedInfo,
    StudentReport,
    StudentStatus,
} from '../ContextBarComponents'
import { useWorkplaceActionsMutation } from '@queries'
import {
    WorkplaceCurrentStatus,
    getStudentWorkplaceAppliedIndustry,
} from '@utils'
import { useNotification } from '@hooks'

export const IndustryStudentProfileCB = ({ profile }: { profile: any }) => {
    const { notification } = useNotification()

    const industry = getStudentWorkplaceAppliedIndustry(profile?.industries)

    const [workplaceActions, workplaceActionsResult] =
        useWorkplaceActionsMutation()

    return (
        <div>
            <ShowErrorNotifications result={workplaceActionsResult} />
            <div className="flex justify-between items-center">
                <div>
                    <Avatar
                        avatar={profile?.student?.user?.avatar}
                        name={profile?.student?.user?.name}
                    />
                </div>
            </div>

            {/* User */}
            <div className="mt-2">
                <Typography semibold>
                    <span className="text-[15px]">
                        {profile?.student?.user?.name}
                    </span>
                </Typography>
                <Typography variant="xs" color="text-[#6B7280]">
                    {profile?.student?.user?.email}
                </Typography>
            </div>

            {/*  */}
            {WorkplaceCurrentStatus.AwaitingWorkplaceResponse ===
            profile?.currentStatus ? (
                <div className="py-2 flex items-center gap-x-2">
                    <ActionButton
                        variant={'success'}
                        onClick={() => {
                            workplaceActions({
                                id: Number(industry?.id),
                                status: UserStatus.Approved,
                            }).then((res: any) => {
                                if (res?.data) {
                                    notification.success({
                                        title: 'Workplace Approved',
                                        description:
                                            'Workplace Approved Successfully',
                                    })
                                }
                            })
                        }}
                        loading={workplaceActionsResult?.isLoading}
                        disabled={workplaceActionsResult?.isLoading}
                    >
                        Approve
                    </ActionButton>
                    <ActionButton
                        variant={'error'}
                        onClick={() => {
                            workplaceActions({
                                id: Number(industry?.id),
                                status: UserStatus.Rejected,
                            }).then((res: any) => {
                                if (res?.data) {
                                    notification.success({
                                        title: 'Workplace Rejected',
                                        description:
                                            'Workplace Rejected Successfully',
                                    })
                                }
                            })
                        }}
                        loading={workplaceActionsResult?.isLoading}
                        disabled={workplaceActionsResult?.isLoading}
                    >
                        Reject
                    </ActionButton>
                </div>
            ) : null}

            {/* Expiry Date */}
            <div className="flex items-center gap-x-5 mt-3">
                <StudentExpireTime
                    studentId={profile?.student?.user?.id}
                    date={profile?.student?.expiryDate}
                    oldExpiry={profile?.student?.oldExpiry}
                />
            </div>

            {/* Student Detail */}
            <StudentDetail profile={profile} />

            {/*  */}
            <StudentRelatedInfo profile={profile} />

            {/*  */}
            <EmergencyContact profile={profile} />

            {(industry?.awaitingAgreementSigned ||
                industry?.AgreementSigned) && (
                <div className="py-3 border-y border-secondary-dark">
                    <StudentStatus
                        industry={industry}
                        student={profile?.student}
                        currentStatus={profile?.currentStatus}
                    />
                </div>
            )}

            <div className="py-5 flex items-center gap-x-2">
                <StudentFeedBack workplace={profile} />
                <StudentReport workplace={profile} />
            </div>

            {/* RTO */}
            <RtoDetail rto={profile?.student?.rto} />
        </div>
    )
}
