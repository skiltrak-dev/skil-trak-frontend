import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { adminApi } from '@queries'
import React, { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const BulkDeleteModal = ({
    onCancel,
    blogsIds,
}: {
    onCancel: () => void
    blogsIds: number[]
}) => {
    const { notification } = useNotification()

    const [bulkRemove, bulkRemoveResult] = adminApi.useBulkRemoveBlogMutation()

    useEffect(() => {
        if (bulkRemoveResult.isSuccess) {
            notification.success({
                title: 'Blogs Removed',
                description: 'Blogs Removed Successfully',
            })
            onCancel()
        }
    }, [bulkRemoveResult])

    const onConfirmUClicked = (ids: number[]) => {
        bulkRemove(ids)
    }
    return (
        <>
            <ShowErrorNotifications result={bulkRemoveResult} />
            <ActionModal
                Icon={FaTrash}
                variant="error"
                title="Are you sure!"
                description={`You are about to delete ${blogsIds?.length} Blogs. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                actionObject={blogsIds}
                loading={bulkRemoveResult.isLoading}
            />
        </>
    )
}
