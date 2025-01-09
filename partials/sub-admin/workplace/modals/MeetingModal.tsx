import { ActionModal, ShowErrorNotifications } from '@components'
import { useContextBar, useNotification } from '@hooks'
import { SubAdminApi } from '@queries'
import { Student } from '@types'
import { useEffect } from 'react'
import { FaBan, FaUsers } from 'react-icons/fa'

export const MeetingModal = ({
    workIndustry,
    workplace,
    student,
    onCancel,
}: {
    workIndustry: number
    workplace: number
    onCancel: () => void
    student: Student
}) => {
    const { notification } = useNotification()
    const contextBar = useContextBar()

    const [meeting, meetingResult] =
        SubAdminApi.Workplace.useSendMeetingNotification()

    const onInterviewClicked = () => {
        meeting({
            workIndustry,
            workplace,
        })
    }

    useEffect(() => {
        if (meetingResult.isSuccess) {
            notification.success({
                title: 'Meeting Assigned to Student',
                description: 'Meeting Assigned to Student',
            })
            onCancel()
            contextBar.setContent(null)
            contextBar.setTitle(null)
            contextBar.hide()
        }
    }, [meetingResult])

    return (
        <>
            <ShowErrorNotifications result={meetingResult} />
            <ActionModal
                Icon={workplace ? FaUsers : FaBan}
                variant={workplace ? 'info' : 'error'}
                title="Are you sure!"
                description={
                    workplace
                        ? `You are about to Assign Meeting <em>"${student?.user?.name}"</em>. Do you wish to continue?`
                        : `There is no workplace for <em>"${student?.user?.name}"</em>`
                }
                onConfirm={onInterviewClicked}
                onCancel={onCancel}
                input
                inputKey={student?.user?.email}
                actionObject={student}
                loading={meetingResult.isLoading}
            />
        </>
    )
}
