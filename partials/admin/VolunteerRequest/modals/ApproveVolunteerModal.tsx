import { AdminApi } from '@queries'
import { useNotification } from '@hooks'
import { Modal, ShowErrorNotifications, TextArea } from '@components'

import { useChangeStatus } from '../hooks'
import { useEffect, useState } from 'react'

export const ApproveVolunteerModal = ({
    onCancel,
    volunteer,
}: {
    volunteer: any
    onCancel: Function
}) => {
    const [note, setNote] = useState<string>('')

    const { notification } = useNotification()

    const { onAccept, changeStatusResult } = useChangeStatus()

    // const onConfirmUClicked = async (volunteer: any) => {
    //     await cancelRequest({
    //         id: volunteer?.id,
    //         note,
    //     })
    // }
    const onConfirmUClicked = async (volunteer: any) => {
        await onAccept({ ...volunteer, note })
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            notification.success({
                title: `Volunter Request Approved`,
                description: `Volunteer Request has neen approved successfully.`,
            })
            onCancel()
        }
    }, [changeStatusResult])

    return (
        <Modal
            title="Approve the Volunteer Request"
            subtitle="You are about to approve volunteer request. Do you wish to continue?"
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
