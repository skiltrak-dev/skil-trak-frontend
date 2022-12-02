import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { Industry } from '@types'
import { useEffect } from 'react'
import { CgUnblock } from 'react-icons/cg'
import { useChangeStatus } from '../hooks'

export const UnblockModal = ({
    industry,
    onCancel,
}: {
    industry: Industry
    onCancel: Function
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const { onAccept, changeStatusResult } = useChangeStatus()

    const onConfirmClicked = async (industry: Industry) => {
        await onAccept(industry)
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            alert.warning({
                title: `Industry Unblocked`,
                description: `Industry "${industry.user.name}" has been unblocked.`,
            })
            onCancel()
        }
        if (changeStatusResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for unblocking Industry was failed`,
            })
        }
    }, [changeStatusResult])

    return (
        <ActionModal
            Icon={CgUnblock}
            variant="primary"
            title="Are you sure!"
            description={`You are about to unblock <em>"${industry.user.name}"</em>. Do you wish to continue?`}
            onConfirm={onConfirmClicked}
            onCancel={onCancel}
            input
            inputKey={industry.user.email}
            actionObject={industry}
            loading={changeStatusResult.isLoading}
        />
    )
}
