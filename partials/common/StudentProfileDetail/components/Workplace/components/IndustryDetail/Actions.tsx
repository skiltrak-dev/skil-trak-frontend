import { Button, ShowErrorNotifications } from '@components'
import { ApproveRequestModal } from '@partials/sub-admin/workplace/modals'
import {
    CommonApi,
    useIndustryResponseMutation,
    useUpdateWorkplaceStatusMutation,
} from '@queries'
import { Course, Student, UserStatus } from '@types'
import { WorkplaceCurrentStatus } from '@utils'
import { ReactElement, useState } from 'react'
import { InitiateSign } from './components'

export const Actions = ({
    workplace,
    student,
    courses,
    currentStatus,
    appliedIndustry,
}: {
    workplace: any
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

    const course = courses?.[0]

    const eSignDocument = CommonApi.ESign.useStudentEsignDocument(
        {
            std: student?.user?.id,
            folder: Number(course?.assessmentEvidence?.[0]?.id),
        },
        {
            skip: !course,
            refetchOnMountOrArgChange: true,
        }
    )

    const onModalCancelClicked = () => setModal(null)

    const onApproveModal = () => {
        // if (student?.user?.schedules && student?.user?.schedules?.length > 0) {
        setModal(
            <ApproveRequestModal
                appliedIndustryId={appliedIndustry?.id}
                onCancel={onModalCancelClicked}
            />
        )
        // }
        // else {
        //     setModal(
        //         <ShowScheduleInfoBeforeApproveWPModal
        //             onCancel={onModalCancelClicked}
        //             appliedIndustryId={appliedIndustry?.id}
        //         />
        //     )
        // }
    }

    return (
        <div>
            {modal}
            <ShowErrorNotifications result={updateStatusResult} />
            <ShowErrorNotifications result={industryResponseResult} />
            {currentStatus === WorkplaceCurrentStatus.AppointmentBooked ? (
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
                <div className="flex items-center gap-x-2">
                    <InitiateSign
                        student={student}
                        folder={course?.assessmentEvidence?.[0]}
                        courseId={course?.id}
                        eSignDocument={eSignDocument}
                    />
                    {/* <Button
                        text="Agreement Signed"
                        onClick={() => onChangeStatusToSigned()}
                        variant="info"
                    /> */}
                </div>
            ) : null}
        </div>
    )
}
