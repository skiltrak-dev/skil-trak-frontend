import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'

import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const DeleteMultiMailsModal = ({
    ids,
    onCancel,
}: {
    ids: any
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const [remove, removeResult] = CommonApi.Messages.useRemoveMultipleMails()

    const onConfirmUClicked = async () => {
        await remove({ ids })
    }

    useEffect(() => {
        if (removeResult.isSuccess) {
            notification.error({
                title: `Mails Deleted`,
                description: `All Selected Mails Deleted.`,
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
                description={`You are about to delete multiple mails. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={ids}
                actionObject={ids}
                loading={removeResult.isLoading}
            />
        </>
    )
}
