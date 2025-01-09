import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { AdminApi, CommonApi } from '@queries'

import { Student } from '@types'
import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const DeleteModal = ({
    item,
    onCancel,
}: {
    item: any
    onCancel: () => void
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const [remove, removeResult] = CommonApi.Messages.useRemoveDraft()

    const onConfirmUClicked = async (item: any) => {
        await remove(item?.id)
    }
    useEffect(() => {
        if (removeResult.isSuccess) {
            alert.error({
                title: `Draft Deleted`,
                description: `Draft "${item.subject}" has been deleted.`,
            })
            onCancel()
        }
        if (removeResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for deleting Draft was failed`,
            })
        }
    }, [removeResult])

    return (
        <ActionModal
            Icon={FaTrash}
            variant="error"
            title="Are you sure!"
            description={`You are about to delete Draft with subject: "${item?.subject}". Do you wish to continue?`}
            onConfirm={onConfirmUClicked}
            onCancel={onCancel}
            input
            inputKey={item?.type}
            actionObject={item}
            loading={removeResult?.isLoading}
        />
    )
}
