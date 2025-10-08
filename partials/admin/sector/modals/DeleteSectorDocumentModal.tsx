import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { AdminApi } from '@queries'

import { FaTrash } from 'react-icons/fa'

export const DeleteSectorDocumentModal = ({
    sectorDocument,
    onCancel,
}: {
    sectorDocument: any
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const [remove, removeResult] =
        AdminApi.SectorDocuments.removeSectorDocument()

    const onConfirmClicked = async (sectorDocument: any) => {
        const res: any = await remove(sectorDocument?.id)
        if (res?.data) {
            notification.error({
                title: `Sector Document Deleted`,
                description: `Sector document "${sectorDocument?.name}" has been deleted.`,
            })
            onCancel()
        }
    }

    return (
        <>
            <ShowErrorNotifications result={removeResult} />
            <ActionModal
                Icon={FaTrash}
                variant="error"
                title="Are you sure!"
                description={`You are about to delete "${sectorDocument?.name}". Do you wish to continue?`}
                onConfirm={onConfirmClicked}
                onCancel={onCancel}
                input
                inputKey={sectorDocument?.name}
                actionObject={sectorDocument}
                loading={removeResult.isLoading}
            />
        </>
    )
}
