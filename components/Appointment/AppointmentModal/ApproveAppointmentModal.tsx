import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'

import { Rto } from '@types'
import { FaTrash } from 'react-icons/fa'

export const ApproveAppointmentModal = ({
    onCancel,
    appointment,
    appointmentUser,
}: {
    appointment: any
    onCancel: Function
    appointmentUser: any
}) => {
    console.log({ appointmentUser })
    const { notification } = useNotification()
    const [approveAppointment, approveAppointmentResult] =
        CommonApi.Appointments.useApproveAppointment()

    const onConfirmUClicked = async (appointment: Rto) => {
        await approveAppointment(appointment?.id).then((res: any) => {
            if (res?.data) {
                notification.error({
                    title: `Appointment Approved`,
                    description: `Appointment Approved Successfully`,
                })
                onCancel()
            }
        })
    }

    return (
        <>
            <ShowErrorNotifications result={approveAppointmentResult} />
            <ActionModal
                Icon={FaTrash}
                variant="error"
                title="Are you sure!"
                description={`You are about to approve "${appointmentUser?.name}" Appointment. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={appointment?.email}
                actionObject={appointment}
                loading={approveAppointmentResult?.isLoading}
            />
        </>
    )
}
