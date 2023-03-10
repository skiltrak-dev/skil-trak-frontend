import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { AdminApi } from '@queries'

import { SubAdmin } from '@types'
import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const DeleteModal = ({
    subAdmin,
    onCancel,
    setChangeStatusResult,
}: {
    subAdmin: SubAdmin | undefined
    onCancel: Function
    setChangeStatusResult: any
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const [remove, removeResult] = AdminApi.SubAdmins.useRemove()

    const onConfirmUClicked = async (subAdmin: SubAdmin) => {
        await remove(subAdmin?.user?.id)
    }

    useEffect(() => {
        setChangeStatusResult(removeResult)
    }, [removeResult])

    useEffect(() => {
        if (removeResult.isSuccess) {
            alert.error({
                title: `subAdmin Deleted`,
                description: `subAdmin "${subAdmin?.user?.name}" has been deleted.`,
            })
            onCancel()
        }
        if (removeResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for deleting subAdmin was failed`,
            })
        }
    }, [removeResult])

    return (
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
    )
}
