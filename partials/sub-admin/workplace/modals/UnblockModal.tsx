import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { Rto } from '@types'
import { useEffect } from 'react'
import { CgUnblock } from 'react-icons/cg'
import { useChangeStatus } from '../hooks'

export const UnblockModal = ({
    rto,
    onCancel,
}: {
    rto: Rto
    onCancel: Function
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const { onAccept, changeStatusResult } = useChangeStatus()

    const onConfirmClicked = async (rto: Rto) => {
        await onAccept(rto)
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            alert.warning({
                title: `RTO Unblocked`,
                description: `RTO "${rto.user.name}" has been unblocked.`,
            })
            onCancel()
        }
        if (changeStatusResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for unblocking RTO was failed`,
            })
        }
    }, [changeStatusResult])

    return (
        <ActionModal
            Icon={CgUnblock}
            variant="primary"
            title="Are you sure!"
            description={`You are about to unblock <em>"${rto.user.name}"</em>. Do you wish to continue?`}
            onConfirm={onConfirmClicked}
            onCancel={onCancel}
            input
            inputKey={rto.user.email}
            actionObject={rto}
            loading={changeStatusResult.isLoading}
        />
    )
}
