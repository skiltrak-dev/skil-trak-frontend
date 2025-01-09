import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { RtoApi } from '@queries'

import { SubAdmin } from '@types'
import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const DeleteRtoCoordinatorModal = ({
    coordinator,
    onCancel,
}: {
    coordinator: SubAdmin
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const [removeCoordinator, removeCoordinatorResult] =
        RtoApi.Coordinator.useRemove()

    const onConfirmUClicked = async (coordinator: SubAdmin) => {
        await removeCoordinator(Number(coordinator?.user?.id))
    }

    useEffect(() => {
        if (removeCoordinatorResult.isSuccess) {
            notification.error({
                title: `Coordinator Deleted`,
                description: `Coordinator "${coordinator?.user?.name}" has been deleted.`,
            })
            onCancel()
        }
    }, [removeCoordinatorResult])

    return (
        <>
            <ShowErrorNotifications result={removeCoordinatorResult} />
            <ActionModal
                Icon={FaTrash}
                variant="error"
                title="Are you sure!"
                description={`You are about to delete "${coordinator?.user?.name}". Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={coordinator?.user?.name}
                actionObject={coordinator}
                loading={removeCoordinatorResult.isLoading}
            />
        </>
    )
}
