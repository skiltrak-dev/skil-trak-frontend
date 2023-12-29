import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { CommonApi } from '@queries'

import { Course } from '@types'
import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const DeleteStateModal = ({
    state,
    onCancel,
}: {
    state: any
    onCancel: Function
}) => {
    console.log("state:::", state)
    const { alert } = useAlert()
    const { notification } = useNotification()
    const [remove, removeResult] = CommonApi.Countries.useDeleteState()

    const onConfirmClicked = async (state: any) => {
        await remove(state.id)
    }

    useEffect(() => {
        if (removeResult.isSuccess) {
            alert.error({
                title: `State Deleted`,
                description: `State "${state.name}" has been deleted.`,
            })
            onCancel()
        }
        if (removeResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for deleting state was failed`,
            })
        }
    }, [removeResult])

    return (
        <ActionModal
            Icon={FaTrash}
            variant="error"
            title="Are you sure!"
            description={`You are about to delete "${state.name}". Do you wish to continue?`}
            onConfirm={onConfirmClicked}
            onCancel={onCancel}
            input
            inputKey={state.name}
            actionObject={state}
            loading={removeResult.isLoading}
        />
    )
}
