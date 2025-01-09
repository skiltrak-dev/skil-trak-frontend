import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { RtoApi } from '@queries'

import { Rto } from '@types'
import { FaTrash } from 'react-icons/fa'

export const DeleteModal = ({
    contactPerson,
    onCancel,
}: {
    contactPerson: any
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const [remove, removeResult] = RtoApi.Rto.useRemoveContactPerson()

    const onConfirmUClicked = async (CP: Rto) => {
        await remove(CP.id).then((res: any) => {
            if (res?.data) {
                notification.error({
                    title: `Contact Person Deleted`,
                    description: `Contact Person "${contactPerson?.name}" has been deleted.`,
                })
                onCancel()
            }
        })
    }

    return (
        <>
            <ShowErrorNotifications result={removeResult} />
            <ActionModal
                Icon={FaTrash}
                variant="error"
                title="Are you sure!"
                description={`You are about to delete "${contactPerson?.name}". Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={contactPerson?.email}
                actionObject={contactPerson}
                loading={removeResult.isLoading}
            />
        </>
    )
}
