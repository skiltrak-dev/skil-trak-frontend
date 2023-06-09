import { ActionModal, ShowErrorNotifications } from '@components'
import { useAlert, useNotification } from '@hooks'
import { Industry, Rto } from '@types'
import { useEffect } from 'react'
import { FaBan } from 'react-icons/fa'
import { useChangeStatus } from '../hooks'

export const BlockModal = ({
    industry,
    onCancel,
}: {
    industry: Industry | undefined | null
    onCancel: Function
}) => {
    const { notification } = useNotification()
    const { onBlock, changeStatusResult } = useChangeStatus()

    const onConfirmUClicked = async (industry: Industry) => {
        await onBlock(industry)
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            notification.error({
                title: `Request Blocked`,
                description: `Industry "${industry?.user?.name}" has been Blocked.`,
            })
            onCancel()
        }
    }, [changeStatusResult])

    return (
        <>
            <ShowErrorNotifications result={changeStatusResult} />
            <ActionModal
                Icon={FaBan}
                variant="error"
                title="Are you sure!"
                description={`You are about to block "${industry?.user?.name}". Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={industry?.user?.email}
                actionObject={industry}
                loading={changeStatusResult.isLoading}
            />
        </>
    )
}
