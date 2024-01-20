import { ActionModal, ShowErrorNotifications } from '@components'
import { useAlert, useNotification } from '@hooks'
import { adminApi } from '@queries'

import { AppointmentType, Rto, Sector } from '@types'
import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const DeleteCategoryModal = ({
    category,
    onCancel,
}: {
    category: any
    onCancel: Function
}) => {
    const { notification } = useNotification()
    const [remove, removeResult] = adminApi.useDeleteBlogCategoryMutation()

    const onConfirmUClicked = async (blog: any) => {
        await remove(Number(blog.id))
    }

    useEffect(() => {
        if (removeResult.isSuccess) {
            notification.error({
                title: `Category Deleted`,
                description: `Category "${category?.title}" has been deleted.`,
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
                description={`You are about to delete "${category.title}". Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={category?.title}
                actionObject={category}
                loading={removeResult.isLoading}
            />
        </>
    )
}
