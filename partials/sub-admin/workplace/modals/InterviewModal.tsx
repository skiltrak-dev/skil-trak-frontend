import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { useSendInterviewNotificationMutation } from '@queries'
import { Student } from '@types'
import { useEffect } from 'react'
import { FaBan } from 'react-icons/fa'

export const InterviewModal = ({
    workIndustry,
    workplace,
    student,
    onCancel,
}: {
    workIndustry: number
    workplace: number
    onCancel: Function
    student: Student
}) => {
    const { notification } = useNotification()

    const [interView, interViewResult] = useSendInterviewNotificationMutation()

    const onInterviewClicked = () => {
        if (student?.workplace && student?.workplace?.length > 0) {
            interView({
                workIndustry,
                workplace,
            })
        } else {
            onCancel()
        }
    }

    useEffect(() => {
        if (interViewResult.isSuccess) {
            notification.success({
                title: 'Interview Assigned to Student',
                description: 'Interview Assigned to Student',
            })
            onCancel()
        }
    }, [interViewResult])

    return (
        <>
            <ShowErrorNotifications result={interViewResult} />
            <ActionModal
                Icon={FaBan}
                variant="error"
                title="Are you sure!"
                description={
                    student?.workplace && student?.workplace?.length > 0
                        ? `You are about to Assign Interview <em>"${student?.user?.name}"</em>. Do you wish to continue?`
                        : `There is no workplace for <em>"${student?.user?.name}"</em>`
                }
                onConfirm={onInterviewClicked}
                onCancel={onCancel}
                input
                inputKey={student?.user?.email}
                actionObject={student}
                loading={interViewResult.isLoading}
            />
        </>
    )
}
