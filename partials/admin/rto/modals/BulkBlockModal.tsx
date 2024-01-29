import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { commonApi } from '@queries'
import React, { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const BulkBlockModal = ({
    onCancel,
    rto,
}: {
    onCancel: Function
    rto: number[]
}) => {
    const { notification } = useNotification()

    const [bulkAction, resultBulkAction] = commonApi.useBulkStatusMutation()

    useEffect(() => {
        if (resultBulkAction.isSuccess) {
            notification.success({
                title: `Rtos ${rto?.length} Blocked'`,
                description: `Rtos ${rto?.length} Blocked Successfully`,
            })
            onCancel()
        }
    }, [resultBulkAction])

    const onConfirmUClicked = (ids: number[]) => {
        bulkAction(ids)
    }
    return (
        <>
            <ShowErrorNotifications result={resultBulkAction} />
            <ActionModal
                Icon={FaTrash}
                variant="error"
                title="Are you sure!"
                description={`You are about to Block ${rto?.length} Rtos. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                actionObject={rto}
                loading={resultBulkAction?.isLoading}
            />
        </>
    )
}
