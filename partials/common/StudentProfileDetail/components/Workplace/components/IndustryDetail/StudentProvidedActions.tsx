import { Button, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { SignAgreement } from '@partials/sub-admin/workplace/components/Industries/components/Actions/components'
import { useChangeCustomIndustryStatusMutation } from '@queries'
import { Student, UserStatus } from '@types'
import { WorkplaceCurrentStatus } from '@utils'
import React, { useEffect, useState } from 'react'
import { WorkplaceWorkIndustriesType } from 'redux/queryTypes'

export const StudentProvidedActions = ({
    student,
    workplace,
    appliedIndustry,
}: {
    student: Student
    appliedIndustry: WorkplaceWorkIndustriesType
    workplace: any
}) => {
    const [actionStatus, setActionStatus] = useState<any | string>('')

    const { notification } = useNotification()

    const [changeCustomIndustryStatus, changeCustomIndustryStatusResult] =
        useChangeCustomIndustryStatusMutation()

    useEffect(() => {
        if (changeCustomIndustryStatusResult.isSuccess) {
            notification.success({
                title: `Industry ${actionStatus}`,
                description: `Industry ${actionStatus} Successfully`,
            })
        }
    }, [changeCustomIndustryStatusResult])

    return (
        <div>
            <ShowErrorNotifications result={changeCustomIndustryStatusResult} />
            {workplace?.industryStatus === UserStatus.Pending ? (
                <div className="flex items-center gap-x-2">
                    <Button
                        text={'Approve Industry'}
                        onClick={() => {
                            setActionStatus(UserStatus.Approved)
                            if (workplace?.assignedTo) {
                                changeCustomIndustryStatus({
                                    industryId:
                                        appliedIndustry?.industry?.user?.id,
                                    workplaceId: workplace?.id,
                                    status: UserStatus.Approved,
                                })
                            } else {
                                notification.error({
                                    title: 'Changing Status Failed',
                                    description:
                                        'You can,t change the status without assigning Workplace',
                                })
                            }
                        }}
                        loading={changeCustomIndustryStatusResult.isLoading}
                        disabled={changeCustomIndustryStatusResult.isLoading}
                    />
                    <Button
                        text={'Reject Industry'}
                        variant={'dark'}
                        onClick={() => {
                            setActionStatus(UserStatus.Rejected)
                            if (workplace?.assignedTo) {
                                changeCustomIndustryStatus({
                                    industryId:
                                        appliedIndustry?.industry?.user?.id,
                                    workplaceId: workplace?.id,
                                    status: UserStatus.Rejected,
                                })
                            } else {
                                notification.error({
                                    title: 'Changing Status Failed',
                                    description:
                                        'You can,t change the status without assigning Workplace',
                                })
                            }
                        }}
                        loading={changeCustomIndustryStatusResult.isLoading}
                        disabled={changeCustomIndustryStatusResult.isLoading}
                    />
                </div>
            ) : null}

            {workplace?.currentStatus ===
            WorkplaceCurrentStatus.AwaitingAgreementSigned ? (
                <div>
                    <SignAgreement
                        student={student}
                        courses={workplace?.courses}
                        studentId={Number(workplace?.student?.id)}
                        appliedIndustryId={appliedIndustry?.id}
                    />
                </div>
            ) : null}
        </div>
    )
}
