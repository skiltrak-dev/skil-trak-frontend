import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'

import { FaTrash } from 'react-icons/fa'

export const DeleteMailModal = ({
    mail,
    onCancel,
}: {
    mail: any
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const [remove, removeResult] = CommonApi.Messages.useRemoveMail()

    const onConfirmUClicked = async (mail: any) => {
        await remove(Number(mail.id)).then((res: any) => {
            if (res?.data) {
                notification.error({
                    title: `Mail Removed`,
                    description: `Mail "${mail?.subject}" has been removed.`,
                })
                onCancel()
            }
        })
    }

    return (
        <>
            <ShowErrorNotifications result={removeResult} />
            <ActionModal
                Icon={FaTrash}
                variant="error"
                title="Are you sure!"
                description={`You are about to delete Mail. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={mail?.title}
                actionObject={mail}
                loading={removeResult.isLoading}
            />
        </>
    )
}
