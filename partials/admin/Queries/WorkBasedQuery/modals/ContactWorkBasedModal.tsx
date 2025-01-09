import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'

import { FaCheckCircle } from 'react-icons/fa'

export const ContactWorkBasedModal = ({
    workBase,
    onCancel,
}: {
    workBase: any
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const [contact, contactResult] = CommonApi.WorkBased.useContactWorkBase()

    const onConfirmUClicked = async (job: any) => {
        await contact(Number(workBase?.id)).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: `Contacted`,
                    description: `Contacted to ${workBase?.fullName}.`,
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
                description={`You are about to contact "${workBase?.fullName}". Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={workBase?.title}
                actionObject={workBase}
                loading={contactResult.isLoading}
            />
        </>
    )
}
