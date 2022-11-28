import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { useRemoveEmployeeMutation } from '@queries'

import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const DeleteModal = ({
    employee,
    onCancel,
}: {
    employee: any
    onCancel: Function
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const [remove, removeResult] = useRemoveEmployeeMutation()

    const onConfirmUClicked = async (employee: any) => {
        await remove(employee.id)
    }

    useEffect(() => {
        if (removeResult.isSuccess) {
            alert.error({
                title: `RTO Deleted`,
                description: `RTO "${employee.firstName} ${employee.lastName}" has been deleted.`,
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
            description={`You are about to delete "${employee.firstName} ${employee.lastName}". Do you wish to continue?`}
            onConfirm={onConfirmUClicked}
            onCancel={onCancel}
            input
            inputKey={employee.email}
            actionObject={employee}
            loading={removeResult?.isLoading}
        />
    )
}
