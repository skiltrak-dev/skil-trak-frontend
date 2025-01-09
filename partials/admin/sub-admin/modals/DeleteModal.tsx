import { AdminApi } from '@queries'

import { SubAdmin } from '@types'
import { useEffect } from 'react'
import { useNotification } from '@hooks'
import { FaTrash } from 'react-icons/fa'
import { ActionModal, ShowErrorNotifications } from '@components'

export const DeleteModal = ({
    subAdmin,
    onCancel,
}: {
    subAdmin: SubAdmin | undefined
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const [remove, removeResult] = AdminApi.SubAdmins.useRemove()

    const onConfirmUClicked = async (subAdmin: SubAdmin) => {
        await remove(subAdmin?.user?.id)
    }

    useEffect(() => {
        if (removeResult.isSuccess) {
            notification.error({
                title: `subAdmin Deleted`,
                description: `subAdmin "${subAdmin?.user?.name}" has been deleted.`,
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
                description={`You are about to delete "${subAdmin?.user?.name}". Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={subAdmin?.user?.email}
                actionObject={subAdmin}
                loading={removeResult.isLoading}
            />
        </>
    )
}
