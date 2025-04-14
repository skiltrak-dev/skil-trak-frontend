import { Rto } from '@types'
import { useEffect } from 'react'
import { ActionModal } from '@components'
import { useChangeStatus } from '../hooks'
import { HiCheckBadge } from 'react-icons/hi2'
import { useAlert, useNotification } from '@hooks'

export const AcceptModal = ({
    rto,
    onCancel,
}: {
    rto: Rto | undefined | null
    onCancel: () => void
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const { onAccept, changeStatusResult } = useChangeStatus()

    const onConfirmUClicked = async (rto: Rto) => {
        await onAccept(rto)
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            alert.success({
                title: `Request Accepted`,
                description: `RTO "${rto?.user?.name}" has been accepted.`,
            })
            onCancel()
        }
        if (changeStatusResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for accepting RTO was failed`,
            })
        }
    }, [changeStatusResult])

    return (
        <ActionModal
            Icon={HiCheckBadge}
            variant="success"
            title="Are you sure!"
            description={`You are about to accept <em>"${rto?.user?.name}"<em>. Do you wish to continue?`}
            onConfirm={onConfirmUClicked}
            onCancel={onCancel}
            input
            inputKey={rto?.user?.email}
            actionObject={rto}
            loading={changeStatusResult.isLoading}
        />
    )
}
