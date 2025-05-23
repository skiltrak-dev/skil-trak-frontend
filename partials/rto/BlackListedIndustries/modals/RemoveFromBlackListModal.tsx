import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { RtoApi } from '@queries'

import { FaTrash } from 'react-icons/fa'

export const RemoveFromBlackListModal = ({
    wpRequest,
    onCancel,
}: {
    wpRequest: any
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const [remove, removeResult] = RtoApi.Industry.removeFromBlackList()

    const onConfirmUClicked = async () => {
        const res: any = await remove(Number(wpRequest?.id))

        if (res?.data) {
            notification.error({
                title: `Removed`,
                description: `Removed From Blacklist.`,
            })
            onCancel()
        }
    }

    return (
        <>
            <ShowErrorNotifications result={removeResult} />
            <ActionModal
                Icon={FaTrash}
                variant="error"
                title="Are you sure!"
                description={`You are about to Remove From Blacklist "${wpRequest?.industry?.user?.name}". Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={wpRequest.title}
                actionObject={wpRequest}
                loading={removeResult.isLoading}
            />
        </>
    )
}
