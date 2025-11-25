import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { Industry, UserStatus, RtoStatus } from '@types'
import { useEffect } from 'react'
import { FaBan } from 'react-icons/fa'
import { CommonApi, SubAdminApi } from '@queries'
import { isLessThan24HoursDifference } from '@utils'
export const CancelRtoAppointmentModal = ({
    appointment,
    onCancel,
}: {
    appointment: any
    onCancel: () => void
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const [changeStatus, changeStatusResult] =
        CommonApi.Appointments.cancellAppointment()

    const onConfirmClicked = async () => {
        await changeStatus(appointment?.id)
        if (!isLessThan24HoursDifference(appointment?.date)) {
            changeStatus(appointment?.id)
        } else {
            notification.error({
                title: 'Appointment Cant be cancel',
                description: 'Appointment Cant cancel before 1 day',
            })
        }
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            alert.error({
                title: `Cancel Appointment`,
                description: `Appointment cancel for "${appointment?.appointmentFor?.user?.name}"`,
            })
            onCancel()
        }
        if (changeStatusResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for cancel appointment was failed please try again`,
            })
        }
    }, [changeStatusResult])

    return (
        <ActionModal
            Icon={FaBan}
            variant="error"
            title="Are you sure!"
            description={`You want to cancel appointment <em>"${appointment?.appointmentFor?.name}"</em>?`}
            onConfirm={onConfirmClicked}
            onCancel={onCancel}
            input
            inputKey={appointment?.email}
            actionObject={appointment}
            loading={changeStatusResult.isLoading}
        />
    )
}
