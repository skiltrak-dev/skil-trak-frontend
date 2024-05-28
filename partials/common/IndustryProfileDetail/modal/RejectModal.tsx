import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { Industry } from '@types'
import { useEffect } from 'react'
import { FaBan } from 'react-icons/fa'
import { useChangeStatus } from '../hooks'

export const RejectModal = ({
    industry,
    onCancel,
}: {
    industry: Industry | undefined | null
    onCancel: Function
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const { onReject, changeStatusResult } = useChangeStatus()

    const onConfirmUClicked = async (industry: Industry) => {
        await onReject(industry)
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            alert.error({
                title: `Request Rejected`,
                description: `Industry "${industry?.user?.name}" has been rejected.`,
            })
            onCancel()
        }
        if (changeStatusResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for rejecting Industry was failed`,
            })
        }
    }, [changeStatusResult])

    return (
        <ActionModal
            Icon={FaBan}
            variant="error"
            title="Are you sure!"
            description={`You are about to reject "${industry?.user?.name}". Do you wish to continue?`}
            onConfirm={onConfirmUClicked}
            onCancel={onCancel}
            input
            inputKey={industry?.user?.email}
            actionObject={industry}
            loading={changeStatusResult.isLoading}
        />
    )
}
