import { ActionModal, ShowErrorNotifications } from '@components'
import { useAlert, useNotification } from '@hooks'
import { Student } from '@types'
import { useEffect } from 'react'
import { FaBan } from 'react-icons/fa'
import { useChangeStatus } from '../hooks'
import { WorkplaceCancelInfoModal } from '@modals'

export const BlockModal = ({
    item,
    onCancel,
    setResult,
}: {
    item: Student
    onCancel: () => void
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
    }, [changeStatusResult])

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
                    description={`You are about to block <em>"${item?.user?.name}"</em>. Do you wish to continue?`}
                    onConfirm={onConfirmClicked}
                    onCancel={onCancel}
                    input
                    inputKey={item?.user?.email}
                    actionObject={item}
                    loading={changeStatusResult.isLoading}
                />
            )}
        </>
    )
}
