import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { Student } from '@types'
import { useEffect } from 'react'
import { IoWarningOutline } from 'react-icons/io5'
import { useChangeStatus } from '../hooks'

export const ApproveModal = ({
    eSign,
    onCancel,
}: {
    eSign: any
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const { onAccept, changeStatusResult } = useChangeStatus()

    const onConfirmClicked = async (eSign: Student) => {
        await onAccept(eSign)
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            notification.success({
                title: `Request Approved`,
                description: `Document "${eSign?.name}" has been approved.`,
            })
            onCancel()
        }
    }, [changeStatusResult])

    return (
        <>
            <ShowErrorNotifications result={changeStatusResult} />
            <ActionModal
                Icon={IoWarningOutline}
                variant="primary"
                title="Are you sure!"
                description={`You are about to approve <em>"${eSign?.name}"<em>. Do you wish to continue?`}
                onConfirm={onConfirmClicked}
                onCancel={onCancel}
                input
                inputKey={eSign?.user?.email}
                actionObject={eSign}
                loading={changeStatusResult.isLoading}
            />
        </>
    )
}
