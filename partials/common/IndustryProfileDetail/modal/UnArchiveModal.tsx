import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { Industry } from '@types'
import { useEffect } from 'react'
import { CgUnblock } from 'react-icons/cg'
import { useChangeStatus } from '../hooks'

export const UnArchiveModal = ({
    industry,
    onCancel,
}: {
    industry: Industry | undefined | null
    onCancel: () => void
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
                title: `Industry Un Archived`,
                description: `Industry "${industry?.user?.name}" has been UnArchived.`,
            })
            onCancel()
        }
        if (changeStatusResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for UnArchived Industry was failed`,
            })
        }
    }, [changeStatusResult])

    return (
        <ActionModal
            Icon={CgUnblock}
            variant="primary"
            title="Are you sure!"
            description={`You are about to UnArchived <em>"${industry?.user?.name}"</em>. Do you wish to continue?`}
            onConfirm={onConfirmClicked}
            onCancel={onCancel}
            input
            inputKey={industry?.user?.email}
            actionObject={industry}
            loading={changeStatusResult.isLoading}
        />
    )
}
