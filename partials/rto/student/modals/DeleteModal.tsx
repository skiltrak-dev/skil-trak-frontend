import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { useRemoveRTOStudentMutation } from '@queries'

import { Student } from '@types'
import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const DeleteModal = ({
    item,
    onCancel,
}: {
    item: Student
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const [remove, removeResult] = useRemoveRTOStudentMutation()

    const onConfirmUClicked = async (item: Student) => {
        await remove(item?.user?.id).then((res: any) => {
            if (res?.data) {
                notification.error({
                    title: `Student Deleted`,
                    description: `Student "${item.user.name}" has been deleted.`,
                })
                onCancel()
            }
        })
    }

    return (
        <>
            <ShowErrorNotifications result={removeResult} />
            <ActionModal
                Icon={FaTrash}
                variant="error"
                title="Are you sure!"
                description={`You are about to delete "${item.user.name}". Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={item.user.email}
                actionObject={item}
                loading={removeResult?.isLoading}
            />
        </>
    )
}
