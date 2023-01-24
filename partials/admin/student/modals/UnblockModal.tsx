import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { Student } from '@types'
import { useEffect } from 'react'
import { CgUnblock } from 'react-icons/cg'
import { useChangeStatus } from '../hooks'

export const UnblockModal = ({
    item,
    onCancel,
    setResult,
}: {
    item: Student
    onCancel: Function
    setResult?: Function
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const { onAccept, changeStatusResult } = useChangeStatus()

    const onConfirmClicked = async (item: Student) => {
        await onAccept(item)
    }

    useEffect(() => {
        if (setResult) {
            setResult(changeStatusResult)
        }
    }, [changeStatusResult])

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            alert.warning({
                title: `Student Unblocked`,
                description: `Student "${item.user.name}" has been unblocked.`,
            })
            onCancel()
        }
        if (changeStatusResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for unblocking Student was failed`,
            })
        }
    }, [changeStatusResult])

    return (
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
    )
}
