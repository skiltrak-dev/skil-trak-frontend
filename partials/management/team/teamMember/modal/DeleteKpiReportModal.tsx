import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { ManagementApi } from '@queries'

import { Student } from '@types'
import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const DeleteKpiReportModal = ({
    item,
    onCancel,
}: {
    item: any
    onCancel: () => void
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const [remove, removeResult] = ManagementApi.CheckKpi.useDeleteKpiReport()

    const onConfirmUClicked = async (item: any) => {
        await remove(item?.id)
    }
    useEffect(() => {
        if (removeResult.isSuccess) {
            alert.error({
                title: `Report Deleted`,
                description: `Report "${item?.from} - ${item?.to}" has been deleted.`,
            })
            onCancel()
        }
        if (removeResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for deleting Report was failed`,
            })
        }
    }, [removeResult])

    return (
        <ActionModal
            Icon={FaTrash}
            variant="error"
            title="Are you sure!"
            description={`You are about to delete Report "${item?.from} - ${item?.to}". Do you wish to continue?`}
            onConfirm={onConfirmUClicked}
            onCancel={onCancel}
            input
            inputKey={item?.from}
            actionObject={item}
            loading={removeResult?.isLoading}
        />
    )
}
