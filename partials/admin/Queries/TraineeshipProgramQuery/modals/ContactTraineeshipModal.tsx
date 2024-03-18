import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'

import { FaCheckCircle, FaTrash } from 'react-icons/fa'

export const ContactTraineeshipModal = ({
    traineeship,
    onCancel,
}: {
    traineeship: any
    onCancel: Function
}) => {
    const { notification } = useNotification()
    const [contact, contactResult] =
        CommonApi.Traineeship.useContactTraineeship()

    const onConfirmUClicked = async (job: any) => {
        await contact(Number(traineeship?.id)).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: `Contacted`,
                    description: `Contacted to ${traineeship?.fullName}.`,
                })
                onCancel()
            }
        })
    }

    return (
        <>
            <ShowErrorNotifications result={contactResult} />
            <ActionModal
                Icon={FaCheckCircle}
                variant="primary"
                title="Are you sure!"
                description={`You are about to contact "${traineeship?.fullName}". Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={traineeship?.title}
                actionObject={traineeship}
                loading={contactResult.isLoading}
            />
        </>
    )
}
