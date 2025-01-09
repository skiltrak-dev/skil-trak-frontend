import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'
import React, { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const BulkDeleteModal = ({
    onCancel,
    usersIds,
}: {
    onCancel: () => void
    usersIds: number[]
}) => {
    const { notification } = useNotification()

    const [bulkRemove, bulkRemoveResult] = CommonApi.User.bulkRemove()

    useEffect(() => {
        if (bulkRemoveResult.isSuccess) {
            notification.success({
                title: 'Users Removed',
                description: 'Users Removed Successfully',
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
                description={`You are about to delete ${usersIds?.length} Users. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                actionObject={usersIds}
                loading={bulkRemoveResult.isLoading}
            />
        </>
    )
}
