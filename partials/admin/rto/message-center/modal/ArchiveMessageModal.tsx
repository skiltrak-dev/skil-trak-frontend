import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { AdminApi } from '@queries'
import { RtoMessage } from '@types'

import { FaTrash } from 'react-icons/fa'

export const ArchiveMessageModal = ({
    message,
    onCancel,
}: {
    message: RtoMessage
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const [changeStatus, changeStatusResult] =
        AdminApi.RtoMessageCenter.changeMessageStatus()

    const onConfirmUClicked = async (message: RtoMessage) => {
        const res: any = await changeStatus(Number(message?.id))

        if (res?.data) {
            notification.error({
                title: `Message Archived`,
                description: `Message has been Archived.`,
            })
            onCancel()
        }
    }

    return (
        <>
            <ShowErrorNotifications result={changeStatusResult} />
            <ActionModal
                Icon={FaTrash}
                variant="error"
                title="Are you sure!"
                description={`You are about to archive <em>"${message?.title}"</em>. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={message?.title}
                actionObject={message}
                loading={changeStatusResult.isLoading}
            />
        </>
    )
}
