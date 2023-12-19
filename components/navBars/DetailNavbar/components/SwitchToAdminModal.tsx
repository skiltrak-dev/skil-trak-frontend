import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { SubAdmin } from '@types'
import { useEffect } from 'react'
import { FaBan } from 'react-icons/fa'
import { MdAdminPanelSettings } from 'react-icons/md'
import { CommonApi } from '@queries'

export const SwitchToAdminModal = ({
    subAdmin,
    onCancel,
}: {
    subAdmin: SubAdmin
    onCancel: Function
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    // const { onBlock, changeStatusResult } = useChangeStatus()
    const [switchUserRole, resultSwitchUserRole] =
        CommonApi.Impersonation.useImpersonationToggle()
    const onConfirmClicked = async (subAdmin: SubAdmin) => {
        await switchUserRole()
    }

    useEffect(() => {
        if (resultSwitchUserRole?.isSuccess) {
            alert.error({
                title: `subAdmin Switching to Admin`,
                description: `subAdmin "${subAdmin?.user?.name}" has been switched to Admin.`,
            })
            onCancel()
        }
        if (resultSwitchUserRole?.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your switching from subadmin to admin was failed`,
            })
        }
    }, [resultSwitchUserRole])

    return (
        <ActionModal
            Icon={MdAdminPanelSettings}
            variant="error"
            title="Are you sure!"
            description={`You are about to switching <em>"${subAdmin?.user?.name}"</em> to admin. Do you wish to continue?`}
            onConfirm={onConfirmClicked}
            onCancel={onCancel}
            input
            inputKey={subAdmin?.user?.email}
            actionObject={subAdmin}
            loading={resultSwitchUserRole?.isLoading}
        />
    )
}
