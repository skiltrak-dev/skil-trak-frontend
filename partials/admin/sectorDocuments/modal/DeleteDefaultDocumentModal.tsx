import { ActionModal, ShowErrorNotifications } from '@components'
import { useAlert, useNotification } from '@hooks'
import { AdminApi } from '@queries'

import { DefaultDocumentsType, Sector } from '@types'
import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const DeleteDefaultDocumentModal = ({
    defaultDocument,
    onCancel,
}: {
    onCancel: () => void
    defaultDocument: DefaultDocumentsType
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const [remove, removeResult] =
        AdminApi.DefaultDocuments.removeDefaultDocument()

    const onConfirmClicked = async (sector: Sector) => {
        const res: any = await remove(defaultDocument.id)
        if (res?.data) {
            notification.error({
                title: `Default Document Deleted`,
                description: `Default Document "${defaultDocument.name}" has been deleted.`,
            })
            onCancel()
        }
    }

    useEffect(() => {
        if (removeResult.isSuccess) {
            alert.error({
                title: `Default Document Deleted`,
                description: `Sector "${defaultDocument.name}" has been deleted.`,
            })
            onCancel()
        }
        if (removeResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for deleting Sector was failed`,
            })
        }
    }, [removeResult])

    return (
        <div>
            <ShowErrorNotifications result={removeResult} />
            <ActionModal
                Icon={FaTrash}
                variant="error"
                title="Are you sure!"
                description={`You are about to delete "${defaultDocument.name}". Do you wish to continue?`}
                onConfirm={onConfirmClicked}
                onCancel={onCancel}
                input
                inputKey={defaultDocument.name}
                actionObject={defaultDocument}
                loading={removeResult.isLoading}
            />
        </div>
    )
}
