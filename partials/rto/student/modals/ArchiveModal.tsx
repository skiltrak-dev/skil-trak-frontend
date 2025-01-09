import { Student } from '@types'
import { useNotification } from '@hooks'
import { useChangeStatus } from '../hooks'
import { HiCheckBadge } from 'react-icons/hi2'
import { ActionModal, ShowErrorNotifications } from '@components'

export const ArchiveModal = ({
    item,
    onCancel,
}: {
    item: Student
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const { onArchive, changeStatusResult } = useChangeStatus()

    const onConfirmUClicked = async (item: Student) => {
        const res: any = await onArchive(item)

        if (res?.data) {
            notification.success({
                title: `Request Accepted`,
                description: `Student "${item.user.name}" has been accepted.`,
            })
            onCancel()
        }
    }

    return (
        <>
            <ShowErrorNotifications result={changeStatusResult} />
            <ActionModal
                Icon={HiCheckBadge}
                variant="success"
                title="Are you sure!"
                description={`You are about to archive <em>"${item.user.name}"<em>. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={item.user.email}
                actionObject={item}
                loading={changeStatusResult.isLoading}
            />
        </>
    )
}
