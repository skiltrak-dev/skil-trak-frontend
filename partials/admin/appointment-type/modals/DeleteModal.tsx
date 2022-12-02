import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { AdminApi } from '@queries'

import { AppointmentType, Rto, Sector } from '@types'
import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const DeleteModal = ({
    appointmentType,
    onCancel,
}: {
    appointmentType: AppointmentType
    onCancel: Function
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const [remove, removeResult] = AdminApi.AppointmentTypes.useRemove()

    const onConfirmClicked = async (appointmentType: AppointmentType) => {
        await remove(appointmentType.id)
    }

    useEffect(() => {
        if (removeResult.isSuccess) {
            alert.error({
                title: `Appointment Type Deleted`,
                description: `Appointment Type "${appointmentType.title}" has been deleted.`,
            })
            onCancel()
        }
        if (removeResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for deleting Appointment Type was failed`,
            })
        }
    }, [removeResult])

    return (
        <ActionModal
            Icon={FaTrash}
            variant="error"
            title="Are you sure!"
            description={`You are about to delete "${appointmentType.title}". Do you wish to continue?`}
            onConfirm={onConfirmClicked}
            onCancel={onCancel}
            input
            inputKey={appointmentType.title}
            actionObject={appointmentType}
            loading={removeResult.isLoading}
        />
    )
}
