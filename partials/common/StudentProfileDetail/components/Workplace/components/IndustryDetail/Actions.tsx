import { Button, ShowErrorNotifications } from '@components'
import {
    useIndustryResponseMutation,
    useUpdateWorkplaceStatusMutation,
} from '@queries'
import { ApproveRequestModal } from '@partials/sub-admin/workplace/modals'
import React, { ReactElement, useState } from 'react'
import { Course, Student, UserStatus } from '@types'
import { WorkplaceCurrentStatus } from '@utils'
import { SignAgreement } from '@partials/sub-admin/workplace/components/Industries/components/Actions/components'

export const Actions = ({
    student,
    courses,
    currentStatus,
    appliedIndustry,
}: {
    courses: Course[]
    student: Student
    appliedIndustry: any
    currentStatus: WorkplaceCurrentStatus
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [actionStatus, setActionStatus] = useState<string>('')

    const [updateStatus, updateStatusResult] =
        useUpdateWorkplaceStatusMutation()
    const [industryResponse, industryResponseResult] =
        useIndustryResponseMutation()

    const onModalCancelClicked = () => setModal(null)

    const onApproveModal = () => {
        setModal(
            <ApproveRequestModal
                appliedIndustryId={appliedIndustry?.id}
                onCancel={onModalCancelClicked}
            />
        )
    }
    return (
        <div>
            {modal}
            <ShowErrorNotifications result={updateStatusResult} />
            <ShowErrorNotifications result={industryResponseResult} />
            {currentStatus ===
            WorkplaceCurrentStatus.AwaitingWorkplaceResponse ? (
                <div className="flex items-center gap-x-2">
                    <Button
                        variant={'secondary'}
                        onClick={() => {
                            onApproveModal()
                        }}
                        loading={
                            updateStatusResult?.isLoading &&
                            actionStatus === UserStatus.Approved
                        }
                        disabled={
                            updateStatusResult?.isLoading &&
                            actionStatus === UserStatus.Approved
                        }
                    >
                        <span className="text-success">Approve</span>
                    </Button>
                    <Button
                        variant={'secondary'}
                        onClick={() => {
                            setActionStatus(UserStatus.Rejected)
                            updateStatus({
                                id: Number(appliedIndustry?.id),
                                response: UserStatus.Rejected,
                            })
                        }}
                        loading={
                            updateStatusResult?.isLoading &&
                            actionStatus === UserStatus.Rejected
                        }
                        disabled={
                            updateStatusResult?.isLoading &&
                            actionStatus === UserStatus.Rejected
                        }
                    >
                        <span className="text-error">Reject</span>
                    </Button>
                    <Button
                        text={'NOT RESPONDED'}
                        variant={'dark'}
                        onClick={() => {
                            industryResponse({
                                industryId: appliedIndustry?.id,
                                status: 'noResponse',
                            })
                        }}
                        loading={industryResponseResult?.isLoading}
                        disabled={industryResponseResult?.isLoading}
                    />
                </div>
            ) : null}
            {currentStatus ===
            WorkplaceCurrentStatus.AwaitingAgreementSigned ? (
                <div className="flex">
                    <SignAgreement
                        student={student}
                        courses={courses}
                        studentId={Number(student?.id)}
                        appliedIndustryId={appliedIndustry?.id}
                    />
                </div>
            ) : null}
        </div>
    )
}
