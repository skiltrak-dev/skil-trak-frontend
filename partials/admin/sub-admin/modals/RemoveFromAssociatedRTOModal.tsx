import { SubAdmin } from '@types'
import { AdminApi } from '@queries'
import { useNotification } from '@hooks'
import { FaTrash } from 'react-icons/fa'
import { ActionModal, ShowErrorNotifications } from '@components'

export const RemoveFromAssociatedRTOModal = ({
    subadminId,
    onCancel,
}: {
    onCancel: Function
    subadminId: number
}) => {
    const { notification } = useNotification()
    const [remove, removeResult] = AdminApi.SubAdmins.useRemoveWithRto()

    const onConfirmUClicked = async () => {
        await remove(subadminId).then((res: any) => {
            if (res?.data) {
                notification.error({
                    title: `Subadmin Removed from RTO`,
                    description: `Subadmin Removed from RTO Successfully.`,
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
                description={`You are about to remove from RTO. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={String(subadminId)}
                actionObject={subadminId}
                loading={removeResult.isLoading}
            />
        </>
    )
}
