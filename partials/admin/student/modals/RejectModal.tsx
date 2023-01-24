import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { Student } from '@types'
import { useEffect } from 'react'
import { FaBan } from 'react-icons/fa'
import { useChangeStatus } from '../hooks'

export const RejectModal = ({
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
    const { onReject, changeStatusResult } = useChangeStatus()

    const onConfirmUClicked = async (item: Student) => {
        await onReject(item)
    }

    useEffect(() => {
        if (setResult) {
            setResult(changeStatusResult)
        }
    }, [changeStatusResult])

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            alert.error({
                title: `Request Rejected`,
                description: `Student "${item.user.name}" has been rejected.`,
            })
            onCancel()
        }
        if (changeStatusResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for rejecting Student was failed`,
            })
        }
    }, [changeStatusResult])

    return (
        <ActionModal
            Icon={FaBan}
            variant="error"
            title="Are you sure!"
            description={`You are about to reject "${item.user.name}". Do you wish to continue?`}
            onConfirm={onConfirmUClicked}
            onCancel={onCancel}
            input
            inputKey={item.user.email}
            actionObject={item}
            loading={changeStatusResult.isLoading}
        />
    )
}
