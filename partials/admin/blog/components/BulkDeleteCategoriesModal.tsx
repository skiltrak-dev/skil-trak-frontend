import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { adminApi } from '@queries'
import React, { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const BulkDeleteCategoriesModal = ({
    onCancel,
    categoriesIds,
}: {
    onCancel: Function
    categoriesIds: number[]
}) => {
    const { notification } = useNotification()

    const [bulkRemove, bulkRemoveResult] =
        adminApi.useBulkDeleteBlogCategoriesMutation()

    useEffect(() => {
        if (bulkRemoveResult.isSuccess) {
            notification.success({
                title: 'Categories Removed',
                description: 'Categories Removed Successfully',
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
                description={`You are about to delete ${categoriesIds?.length} Categories. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                actionObject={categoriesIds}
                loading={bulkRemoveResult.isLoading}
            />
        </>
    )
}
