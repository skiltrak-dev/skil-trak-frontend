import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { useDeleteDocumentMutation } from '@queries'
import { useRouter } from 'next/router'

import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const DeleteModal = ({
    folder,
    onCancel,
}: {
    folder: any
    onCancel: Function
}) => {
    const router = useRouter()

    const { notification } = useNotification()
    const [remove, removeResult] = useDeleteDocumentMutation()

    const onConfirmUClicked = async (folder: any) => {
        await remove(folder?.folderId)
    }

    useEffect(() => {
        if (removeResult.isSuccess) {
            notification.error({
                title: `Requirement Deleted!`,
                description: `Your folder requirement '${folder?.name}' was deleted successfully.`,
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
                description={`You are about to delete "${folder?.name}". Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={folder?.name}
                actionObject={folder}
                loading={removeResult.isLoading}
            />
        </>
    )
}
