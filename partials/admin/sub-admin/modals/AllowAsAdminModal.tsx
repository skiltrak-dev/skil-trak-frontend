import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { SubAdmin } from '@types'
import { useEffect } from 'react'
import { FaBan } from 'react-icons/fa'
import { useChangeStatus } from '../hooks'
import { MdAdminPanelSettings } from 'react-icons/md'
import { CommonApi } from '@queries'

export const AllowAsAdminModal = ({
    subAdmin,
    onCancel,
}: {
    subAdmin: SubAdmin
    onCancel: Function
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    // const { onBlock, changeStatusResult } = useChangeStatus()
    const [canAdmin, resultCanAdmin] = CommonApi.Impersonation.useAllowAsAdmin()
    const onConfirmClicked = async (subAdmin: SubAdmin) => {
        await canAdmin(subAdmin?.id)
    }

    useEffect(() => {
        if (resultCanAdmin?.isSuccess) {
            alert.error({
                title: `subAdmin Allowed As Admin`,
                description: `subAdmin "${subAdmin?.user?.name}" has been Allowed as Admin.`,
            })
            onCancel()
        }
        if (resultCanAdmin?.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for allowing subAdmin as admin was failed`,
            })
        }
    }, [resultCanAdmin])

    return (
        <ActionModal
            Icon={MdAdminPanelSettings}
            variant="error"
            title="Are you sure!"
            description={`You are about to allow <em>"${subAdmin?.user?.name}"</em> as admin. Do you wish to continue?`}
            onConfirm={onConfirmClicked}
            onCancel={onCancel}
            input
            inputKey={subAdmin?.user?.email}
            actionObject={subAdmin}
            loading={resultCanAdmin?.isLoading}
        />
    )
}
