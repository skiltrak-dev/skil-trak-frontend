import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { Student } from '@types'
import { useEffect } from 'react'
import { FaBan } from 'react-icons/fa'
import { useChangeStatus } from '../hooks'

export const BlockModal = ({
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
    const { onBlock, changeStatusResult } = useChangeStatus()

    const onConfirmClicked = async (item: Student) => {
        await onBlock(item)
    }

    useEffect(() => {
        if (setResult) {
            setResult(changeStatusResult)
        }
    }, [changeStatusResult])

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            alert.error({
                title: `Student Blocked`,
                description: `Student "${item?.user?.name}" has been blocked.`,
            })
            onCancel()
        }
        if (changeStatusResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for blocking Student was failed`,
            })
        }
    }, [changeStatusResult])

    return (
        <ActionModal
            Icon={FaBan}
            variant="error"
            title="Are you sure!"
            description={`You are about to block <em>"${item?.user?.name}"</em>. Do you wish to continue?`}
            onConfirm={onConfirmClicked}
            onCancel={onCancel}
            input
            inputKey={item?.user?.email}
            actionObject={item}
            loading={changeStatusResult.isLoading}
        />
    )
}
