import { ActionModal, ShowErrorNotifications } from '@components'
import { useAlert, useNotification } from '@hooks'
import { adminApi } from '@queries'

import { AppointmentType, Rto, Sector } from '@types'
import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const DeleteModal = ({
    blog,
    onCancel,
}: {
    blog: any
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const [remove, removeResult] = adminApi.useRemoveBlogMutation()

    const onConfirmUClicked = async (blog: any) => {
        await remove(Number(blog.id))
    }

    useEffect(() => {
        if (removeResult.isSuccess) {
            notification.error({
                title: `Blog Deleted`,
                description: `Blog "${blog?.title}" has been deleted.`,
            })
            onCancel()
        }
    }, [removeResult])

    return (
        <>
            <ShowErrorNotifications result={removeResult} />
            <ActionModal
                Icon={FaTrash}
                variant="error"
                title="Are you sure!"
                description={`You are about to delete "${blog.title}". Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={blog?.title}
                actionObject={blog}
                loading={removeResult.isLoading}
            />
        </>
    )
}
