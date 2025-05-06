import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { Student } from '@types'
import { CgUnblock } from 'react-icons/cg'
import { useChangeStatus } from '../hooks'

export const UnblockModal = ({
    item,
    onCancel,
}: {
    item: Student
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const { onAccept, changeStatusResult } = useChangeStatus()

    const onConfirmClicked = async (item: Student) => {
        const res: any = await onAccept(item)
        if (res?.data) {
            notification.warning({
                title: `Student Unblocked`,
                description: `Student "${item.user.name}" has been unblocked.`,
            })
            onCancel()
        }
    }

    return (
        <>
            <ShowErrorNotifications result={changeStatusResult} />
            <ActionModal
                Icon={CgUnblock}
                variant="primary"
                title="Are you sure!"
                description={`You are about to unblock <em>"${item.user.name}"</em>. Do you wish to continue?`}
                onConfirm={onConfirmClicked}
                onCancel={onCancel}
                input
                inputKey={item.user.email}
                actionObject={item}
                loading={changeStatusResult.isLoading}
            />
        </>
    )
}
