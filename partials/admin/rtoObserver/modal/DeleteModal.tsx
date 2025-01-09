import { AdminApi } from '@queries'
import { useNotification } from '@hooks'
import { FaTrash } from 'react-icons/fa'
import { ActionModal, ShowErrorNotifications } from '@components'
export const DeleteModal = ({
    onCancel,
    rtoObserver,
}: {
    rtoObserver: any
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const [remove, removeResult] = AdminApi.RtoObserver.useRemove()

    const onConfirmUClicked = async (rtoObserver: any) => {
        const res: any = await remove(rtoObserver?.user?.id)
        if (res?.data) {
            notification.error({
                title: `RTO Deleted`,
                description: `RTO "${rtoObserver?.user?.name}" has been deleted.`,
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
                description={`You are about to delete "${rtoObserver?.user?.name}". Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={rtoObserver?.user?.email}
                actionObject={rtoObserver}
                loading={removeResult.isLoading}
            />
        </>
    )
}
