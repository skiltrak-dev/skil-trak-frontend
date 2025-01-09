import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { Industry, SubAdmin } from '@types'
import { useEffect } from 'react'
import { CgUnblock } from 'react-icons/cg'
import { useChangeStatus } from '../hooks'

export const UnArchiveModal = ({
    subadmin,
    onCancel,
}: {
    subadmin: SubAdmin | undefined | null
    onCancel: () => void
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const { onAccept, changeStatusResult } = useChangeStatus()

    const onConfirmClicked = async (subadmin: SubAdmin) => {
        await onAccept(subadmin?.user)
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            alert.warning({
                title: `Subadmin Un Archived`,
                description: `Subadmin "${subadmin?.user?.name}" has been UnArchived.`,
            })
            onCancel()
        }
        if (changeStatusResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for UnArchived Subadmin was failed`,
            })
        }
    }, [changeStatusResult])

    return (
        <ActionModal
            Icon={CgUnblock}
            variant="primary"
            title="Are you sure!"
            description={`You are about to UnArchived <em>"${subadmin?.user?.name}"</em>. Do you wish to continue?`}
            onConfirm={onConfirmClicked}
            onCancel={onCancel}
            input
            inputKey={subadmin?.user?.email}
            actionObject={subadmin}
            loading={changeStatusResult.isLoading}
        />
    )
}
