import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { ManagementApi } from '@queries'

import { Student } from '@types'
import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const DeleteTeamModal = ({
    item,
    onCancel,
}: {
    item: any
    onCancel: () => void
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const [remove, removeResult] = ManagementApi.CheckKpi.useDeleteTeam()

    const onConfirmUClicked = async (item: any) => {
        await remove(item?.id)
    }
    useEffect(() => {
        if (removeResult.isSuccess) {
            alert.error({
                title: `Team Deleted`,
                description: `Team "${item?.name}" has been deleted.`,
            })
            onCancel()
        }
        if (removeResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for deleting Team was failed`,
            })
        }
    }, [removeResult])

    return (
        <ActionModal
            Icon={FaTrash}
            variant="error"
            title="Are you sure!"
            description={`You are about to delete Team "${item?.name}". Do you wish to continue?`}
            onConfirm={onConfirmUClicked}
            onCancel={onCancel}
            input
            inputKey={item?.name}
            actionObject={item}
            loading={removeResult?.isLoading}
        />
    )
}
