import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { Industry } from '@types'
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
    const { alert } = useAlert()
    const { notification } = useNotification()
    const { onBlock, changeStatusResult } = useChangeStatus()

    const onConfirmClicked = async (industry: Industry) => {
        await onBlock(industry)
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            alert.error({
                title: `Industry Blocked`,
                description: `Industry "${industry?.user?.name}" has been blocked.`,
            })
            onCancel()
        }
        if (changeStatusResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for blocking Industry was failed`,
            })
        }
    }, [changeStatusResult])

    return (
        <ActionModal
            Icon={FaBan}
            variant="error"
            title="Are you sure!"
            description={`You are about to block <em>"${industry?.user?.name}"</em>. Do you wish to continue?`}
            onConfirm={onConfirmClicked}
            onCancel={onCancel}
            input
            inputKey={industry?.user?.email}
            actionObject={industry}
            loading={changeStatusResult.isLoading}
        />
    )
}
