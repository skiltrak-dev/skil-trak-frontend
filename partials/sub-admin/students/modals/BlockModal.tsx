import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { WorkplaceCancelInfoModal } from '@modals'
import { Student } from '@types'
import { FaBan } from 'react-icons/fa'
import { useChangeStatus } from '../hooks'

export const BlockModal = ({
    item,
    onCancel,
}: {
    item: Student
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const { onBlock, changeStatusResult } = useChangeStatus()

    const onConfirmClicked = async (item: Student) => {
        const res: any = await onBlock(item)
        if (res?.data) {
            notification.error({
                title: `Student Blocked`,
                description: `Student "${item.user.name}" has been blocked.`,
            })
            onCancel()
        }
    }

    return (
        <>
            <ShowErrorNotifications result={changeStatusResult} />
            {item?.workplace && item?.workplace?.length > 0 && false ? (
                <WorkplaceCancelInfoModal onCancel={onCancel} />
            ) : (
                <ActionModal
                    Icon={FaBan}
                    variant="error"
                    title="Are you sure!"
                    description={`You are about to block <em>"${item.user.name}"</em>. Do you wish to continue?`}
                    onConfirm={onConfirmClicked}
                    onCancel={onCancel}
                    input
                    inputKey={item.user.email}
                    actionObject={item}
                    loading={changeStatusResult.isLoading}
                />
            )}
        </>
    )
}
