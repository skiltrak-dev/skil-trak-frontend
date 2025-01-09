import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { CommonApi, SubAdminApi } from '@queries'

import { Student } from '@types'
import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const UnSnoozeStudentModal = ({
    student,
    onCancel,
}: {
    student: Student
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const [unSnooze, unSnoozeResult] = SubAdminApi.Student.useUnSnoozeStudent()

    const onConfirmUClicked = async (student: any) => {
        await unSnooze(Number(student?.id))
    }

    useEffect(() => {
        if (unSnoozeResult.isSuccess) {
            notification.error({
                title: `Student Un Snoozed`,
                description: `Student "${student?.user?.name}" has been Un Snoozed.`,
            })
            onCancel()
        }
    }, [unSnoozeResult])

    return (
        <>
            <ShowErrorNotifications result={unSnoozeResult} />
            <ActionModal
                Icon={FaTrash}
                variant="error"
                title="Are you sure!"
                description={`You are about to un snooze Student "${student?.user?.name}". Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={student?.user?.name}
                actionObject={student}
                loading={unSnoozeResult.isLoading}
            />
        </>
    )
}
