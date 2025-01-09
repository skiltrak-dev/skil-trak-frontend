import {
    ActionModal,
    Modal,
    ShowErrorNotifications,
    TextArea,
} from '@components'
import { useNotification } from '@hooks'
import { VolunteerRequestEnum } from '@partials/admin'
import { IndustryApi } from '@queries'

import { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { MdCancel } from 'react-icons/md'

export const CancelVolunteerModal = ({
    onCancel,
    volunteer,
}: {
    volunteer: any
    onCancel: () => void
}) => {
    const [note, setNote] = useState<string>('')

    const { notification } = useNotification()
    const [cancelRequest, cancelRequestResult] =
        IndustryApi.Volunteer.cancelVolunteerRequest()

    const onConfirmUClicked = async (volunteer: any) => {
        await cancelRequest({
            id: volunteer?.id,
            status: VolunteerRequestEnum.CANCELLED,
        })
    }

    useEffect(() => {
        if (cancelRequestResult.isSuccess) {
            notification.error({
                title: `Volunter Request Cancelled`,
                description: `Volunteer Request has been cancelled successfully.`,
            })
            onCancel()
        }
    }, [cancelRequestResult])

    return (
        <>
            <ShowErrorNotifications result={cancelRequestResult} />
            <ActionModal
                Icon={MdCancel}
                variant="error"
                title="Cancel the Volunteer Request!"
                description={`You are about to cancel volunteer request. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={volunteer.title}
                actionObject={volunteer}
                loading={cancelRequestResult.isLoading}
            />
        </>
    )
}
