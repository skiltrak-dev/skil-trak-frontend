import { Modal, ShowErrorNotifications, TextArea } from '@components'
import { useNotification } from '@hooks'
import { AdminApi } from '@queries'

import { useEffect, useState } from 'react'

export const CancelVolunteerModal = ({
    onCancel,
    volunteer,
}: {
    volunteer: any
    onCancel: Function
}) => {
    const [note, setNote] = useState<string>('')

    const { notification } = useNotification()
    const [cancelRequest, cancelRequestResult] =
        AdminApi.Volunteer.cancelVolunteerRequest()

    const onConfirmUClicked = async (volunteer: any) => {
        await cancelRequest({
            id: volunteer?.id,
            note,
        })
    }

    useEffect(() => {
        if (cancelRequestResult.isSuccess) {
            notification.error({
                title: `Volunter Request Closed`,
                description: `Volunteer Request has neen closed successfully.`,
            })
            onCancel()
        }
    }, [cancelRequestResult])

    return (
        <Modal
            title="Close the Volunteer Request"
            subtitle="You are about to close volunteer request. Do you wish to continue?"
            onCancelClick={onCancel}
            onConfirmClick={() => {
                onConfirmUClicked(volunteer)
            }}
        >
            <ShowErrorNotifications result={cancelRequestResult} />

            <TextArea
                name={'note'}
                label={'Add Note Here'}
                required
                placeholder={'Add Note Here'}
                rows={6}
                onChange={(e: any) => {
                    setNote(e.target?.value)
                }}
            />
        </Modal>
    )
}
