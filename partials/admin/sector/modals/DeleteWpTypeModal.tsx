import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { AdminApi } from '@queries'

import { FaTrash } from 'react-icons/fa'

export const DeleteWpTypeModal = ({
    wpType,
    onCancel,
}: {
    wpType: any
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const [remove, removeResult] = AdminApi.WpTypes.removeWpType()

    const onConfirmClicked = async (wpType: any) => {
        const res: any = await remove(wpType?.id)
        if (res?.data) {
            notification.error({
                title: `Course Deleted`,
                description: `Course "${wpType?.name}" has been deleted.`,
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
                description={`You are about to delete "${wpType?.name}". Do you wish to continue?`}
                onConfirm={onConfirmClicked}
                onCancel={onCancel}
                input
                inputKey={wpType?.name}
                actionObject={wpType}
                loading={removeResult.isLoading}
            />
        </>
    )
}
