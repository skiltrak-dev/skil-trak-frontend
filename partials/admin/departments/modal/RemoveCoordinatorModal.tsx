import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { SubAdmin } from '@types'
import { useEffect } from 'react'
import { MdOutlinePersonRemove } from 'react-icons/md'

import { AdminApi } from '@queries'

export const RemoveCoordinatorModal = ({
    item,
    onCancel,
}: {
    item: SubAdmin | undefined
    onCancel: () => void
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const [removeCoordinator, removeCoordinatorResult] =
        AdminApi.Department.useRemoveDepartmentCoordinator()

    const onConfirmClicked = async () => {
        await removeCoordinator(item?.id)
    }

    useEffect(() => {
        if (removeCoordinatorResult.isSuccess) {
            alert.success({
                title: `Request Removed`,
                description: `Coordinator "${item?.user?.name}" has been removed.`,
            })
            onCancel()
        }
        if (removeCoordinatorResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for removing coordinator was failed`,
            })
        }
    }, [removeCoordinatorResult.isSuccess])

    return (
        <ActionModal
            Icon={MdOutlinePersonRemove}
            variant="error"
            title="Are you sure!"
            description={`You are about to remove <em>"${item?.user?.name}"<em>. Do you wish to continue?`}
            onConfirm={onConfirmClicked}
            onCancel={onCancel}
            input
            inputKey={item?.user?.email}
            actionObject={item}
            loading={removeCoordinatorResult.isLoading}
        />
    )
}
