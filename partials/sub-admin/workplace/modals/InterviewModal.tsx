import { ActionModal, ShowErrorNotifications } from '@components'
import { useContextBar, useNotification } from '@hooks'
import { useSendInterviewNotificationMutation } from '@queries'
import { Student } from '@types'
import { ReactElement, useEffect, useState } from 'react'
import { FaBan, FaUsers } from 'react-icons/fa'
import { HiCheckBadge } from 'react-icons/hi2'
import { ActionModal as InterViewMessageModal } from './ActionModal'

export const InterviewModal = ({
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
    const [modal, setModal] = useState<ReactElement | null>(null)
    const { notification } = useNotification()
    const contextBar = useContextBar()

    const [interView, interViewResult] = useSendInterviewNotificationMutation()

    const onInterviewClicked = () => {
        if (workplace) {
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
            contextBar.setContent(null)
            contextBar.setTitle(null)
            contextBar.hide()
            setModal(
                <InterViewMessageModal
                    Icon={HiCheckBadge}
                    title={'Successfully Interview'}
                    subtitle={'Now You can forward the request to Industry'}
                    onCancel={() => {
                        setModal(null)
                    }}
                    confirmText={'OK'}
                />
            )
        }
    }, [interViewResult])

    return (
        <>
            {modal}
            <ShowErrorNotifications result={interViewResult} />
            <ActionModal
                Icon={workplace ? FaUsers : FaBan}
                variant={workplace ? 'info' : 'error'}
                title="Are you sure!"
                description={
                    workplace
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
