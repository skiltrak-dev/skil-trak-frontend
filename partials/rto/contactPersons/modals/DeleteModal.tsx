import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { RtoApi } from '@queries'

import { Rto } from '@types'
import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const DeleteModal = ({
    contactPerson,
    onCancel,
}: {
    contactPerson: any
    onCancel: Function
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const [remove, removeResult] = RtoApi.Rto.useRemoveContactPerson()

    const onConfirmUClicked = async (contactPerson: Rto) => {
        await remove(contactPerson.id)
    }

    useEffect(() => {
        if (removeResult.isSuccess) {
            alert.error({
                title: `RTO Deleted`,
                description: `RTO "${contactPerson.name}" has been deleted.`,
            })
            onCancel()
        }
        if (removeResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for deleting RTO was failed`,
            })
        }
    }, [removeResult])

    return (
        <ActionModal
            Icon={FaTrash}
            variant="error"
            title="Are you sure!"
            description={`You are about to delete "${contactPerson.name}". Do you wish to continue?`}
            onConfirm={onConfirmUClicked}
            onCancel={onCancel}
            input
            inputKey={contactPerson.email}
            actionObject={contactPerson}
            loading={removeResult.isLoading}
        />
    )
}
