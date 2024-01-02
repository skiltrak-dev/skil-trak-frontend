import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { CommonApi, useRemoveJobMutation } from '@queries'

import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const DeleteModal = ({
    eSign,
    onCancel,
}: {
    eSign: any
    onCancel: Function
}) => {
    const { notification } = useNotification()
    const [remove, removeResult] = CommonApi.ESign.useRemoveTemplate()

    const onConfirmUClicked = async (eSign: any) => {
        await remove(Number(eSign?.id))
    }

    useEffect(() => {
        if (removeResult.isSuccess) {
            notification.error({
                title: `Template Deleted`,
                description: `Template "${eSign?.name}" has been deleted.`,
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
                description={`You are about to delete "${eSign?.name}" template. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={eSign?.name}
                actionObject={eSign}
                loading={removeResult.isLoading}
            />
        </>
    )
}
