import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { SubAdmin } from '@types'
import { useEffect } from 'react'
import { FaBan } from 'react-icons/fa'
import { MdAdminPanelSettings } from 'react-icons/md'
import { CommonApi } from '@queries'
import { isBrowser } from '@utils'

export const SwitchBackToSubAdmin = ({
    // subAdmin,
    onCancel,
}: {
    // subAdmin: SubAdmin
    onCancel: Function
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    // const { onBlock, changeStatusResult } = useChangeStatus()
    const [switchUserRole, resultSwitchUserRole] =
        CommonApi.Impersonation.useImpersonationToggle()
    const onConfirmClicked = async () => {
        await switchUserRole()
    }

    useEffect(() => {
        if (resultSwitchUserRole?.isSuccess) {
            alert.error({
                title: `subAdmin as Switching back to subadmin`,
                description: `Subadmin as admin has been switched back to subadmin.`,
            })
            onCancel()
            // if (isBrowser()) {
            //     setTimeout(() => {
            //         location.reload()
            //     }, 500)
            // }
        }
        if (resultSwitchUserRole?.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your switching from admin to subadmin was failed`,
            })
        }
    }, [resultSwitchUserRole])

    return (
        <ActionModal
            Icon={MdAdminPanelSettings}
            variant="error"
            title="Are you sure!"
            description={`You are about to switching from admin to subadmin. Do you wish to continue?`}
            onConfirm={onConfirmClicked}
            onCancel={onCancel}
            input
            inputKey={'subAdmin'}
            actionObject={'subAdmin'}
            loading={resultSwitchUserRole?.isLoading}
        />
    )
}
