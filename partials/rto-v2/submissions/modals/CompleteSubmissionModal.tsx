import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { RtoApi } from '@queries'
import { Result } from '@constants/course-result'
import { HiCheckBadge } from 'react-icons/hi2'

export const CompleteSubmissionModal = ({
    submission,
    onCancel,
}: {
    submission: any
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const [changeStatus, changeStatusResult] =
        RtoApi.Submissions.changeSubmissionStatus()

    const onConfirmUClicked = async () => {
        const res: any = await changeStatus({
            id: Number(submission?.id),
            result: Result.Competent,
        })

        if (res?.data) {
            notification.success({
                title: 'Completed',
                description: 'Submission marked as completed.',
            })
            onCancel()
        }
    }

    return (
        <>
            <ShowErrorNotifications result={changeStatusResult} />
            <ActionModal
                Icon={HiCheckBadge}
                variant="success"
                title="Are you sure!"
                description={`You are about to mark this submission as <strong>completed</strong>. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                actionObject={submission}
                loading={changeStatusResult.isLoading}
            />
        </>
    )
}
