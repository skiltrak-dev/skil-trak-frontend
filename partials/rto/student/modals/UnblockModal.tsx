import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { Student } from '@types'
import { useEffect } from 'react'
import { CgUnblock } from 'react-icons/cg'
import { useChangeStatus } from '../hooks'

export const UnblockModal = ({
    item,
    onCancel,
}: {
    item: Student
    onCancel: Function
}) => {
    const { notification } = useNotification()
    const { onAccept, changeStatusResult } = useChangeStatus()

    const onConfirmClicked = async (item: Student) => {
        await onAccept(item)
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            notification.warning({
                title: `Student Unblocked`,
                description: `Student "${item.user.name}" has been unblocked.`,
            })
            onCancel()
        }
    }, [changeStatusResult])

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
                loading={changeStatusResult?.isLoading}
                inputKey={item.user.email}
                actionObject={item}
            />
        </>
    )
}
