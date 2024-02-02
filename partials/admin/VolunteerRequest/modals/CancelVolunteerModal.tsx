import { Modal, ShowErrorNotifications, TextArea } from '@components'
import { useNotification } from '@hooks'
import { AdminApi } from '@queries'

import { useEffect, useState } from 'react'
import { useChangeStatus } from '../hooks'

export const CancelVolunteerModal = ({
    onCancel,
    volunteer,
}: {
    volunteer: any
    onCancel: Function
}) => {
    const [note, setNote] = useState<string>('')

    const { notification } = useNotification()

    const { onCancelled, changeStatusResult } = useChangeStatus()

    // const onConfirmUClicked = async (volunteer: any) => {
    //     await cancelRequest({
    //         id: volunteer?.id,
    //         note,
    //     })
    // }
    const onConfirmUClicked = async (volunteer: any) => {
        await onCancelled({ ...volunteer, note })
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            notification.error({
                title: `Volunter Request Cancelled`,
                description: `Volunteer Request has neen cancelled successfully.`,
            })
            onCancel()
        }
    }, [changeStatusResult])

    return (
        <Modal
            title="Cancel the Volunteer Request"
            subtitle="You are about to cancel volunteer request. Do you wish to continue?"
            onCancelClick={onCancel}
            onConfirmClick={() => {
                onConfirmUClicked(volunteer)
            }}
            loading={changeStatusResult.isLoading}
        >
            <ShowErrorNotifications result={changeStatusResult} />

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
