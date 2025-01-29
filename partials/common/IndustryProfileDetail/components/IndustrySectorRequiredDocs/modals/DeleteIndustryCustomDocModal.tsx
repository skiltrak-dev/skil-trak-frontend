import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { IndustryApi } from '@queries'

import { FaTrash } from 'react-icons/fa'

export const DeleteIndustryCustomDocModal = ({
    doc,
    onCancel,
}: {
    doc: any
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const [remove, removeResult] = IndustryApi.Folders.removeCustomDoc()

    const onConfirmUClicked = async (doc: any) => {
        const res: any = await remove(Number(doc.id))

        if (res?.data) {
            notification.error({
                title: `Doc Deleted`,
                description: `Doc "${doc?.name}" has been deleted.`,
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
                description={`You are about to delete "${doc?.name}". Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={doc?.name}
                actionObject={doc}
                loading={removeResult.isLoading}
            />
        </>
    )
}
