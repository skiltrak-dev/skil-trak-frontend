import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { AdminApi } from '@queries'

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
    const { alert } = useAlert()
    const { notification } = useNotification()
    const [remove, removeResult] = AdminApi.Students.useRemove()

    const onConfirmUClicked = async (item: Student) => {
        await remove(item?.user?.id)
    }

    useEffect(() => {
        if (removeResult.isSuccess) {
            alert.error({
                title: `Student Deleted`,
                description: `Student "${item.user.name}" has been deleted.`,
            })
            onCancel()
        }
        if (removeResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for deleting Student was failed`,
            })
        }
    }, [removeResult])

    return (
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
            loading={removeResult.isLoading}
        />
    )
}
