import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { Industry, SubAdmin } from '@types'
import { useEffect } from 'react'
import { CgUnblock } from 'react-icons/cg'
import { useChangeStatus } from '../hooks'

export const UnblockModal = ({
    subAdmin,
    onCancel,
}: {
    subAdmin: SubAdmin
    onCancel: Function
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const { onAccept, changeStatusResult } = useChangeStatus()

    const onConfirmClicked = async (subAdmin: SubAdmin) => {
        await onAccept(subAdmin)
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            alert.warning({
                title: `subAdmin Unblocked`,
                description: `subAdmin "${subAdmin.user.name}" has been unblocked.`,
            })
            onCancel()
        }
        if (changeStatusResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for unblocking subAdmin was failed`,
            })
        }
    }, [changeStatusResult])

    return (
        <ActionModal
            Icon={CgUnblock}
            variant="primary"
            title="Are you sure!"
            description={`You are about to unblock <em>"${subAdmin.user.name}"</em>. Do you wish to continue?`}
            onConfirm={onConfirmClicked}
            onCancel={onCancel}
            input
            inputKey={subAdmin.user.email}
            actionObject={subAdmin}
            loading={changeStatusResult.isLoading}
        />
    )
}
