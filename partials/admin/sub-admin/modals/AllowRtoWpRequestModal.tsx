import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { SubAdmin } from '@types'
import { useEffect } from 'react'
import { FaBan } from 'react-icons/fa'
import { useChangeStatus } from '../hooks'
import { MdAdminPanelSettings } from 'react-icons/md'
import { AdminApi, CommonApi } from '@queries'

export const AllowRtoWpRequestModal = ({
    subAdmin,
    onCancel,
}: {
    subAdmin: SubAdmin
    onCancel: () => void
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    // const { onBlock, changeStatusResult } = useChangeStatus()
    const [toggleRtoWpApproval, resultToggleRtoWpApproval] =
        AdminApi.SubAdmins.useToggleRtoWpApproval()
    const onConfirmClicked = async (subAdmin: SubAdmin) => {
        await toggleRtoWpApproval(subAdmin?.id)
    }

    useEffect(() => {
        if (resultToggleRtoWpApproval?.isSuccess) {
            alert.error({
                title: `subAdmin Allowed RTO Wp Approval Request`,
                description: `subAdmin "${subAdmin?.user?.name}" has been Allowed RTO Wp Approval Request.`,
            })
            onCancel()
        }
        if (resultToggleRtoWpApproval?.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for allowing subAdmin RTO wp approval request was failed`,
            })
        }
    }, [resultToggleRtoWpApproval])

    return (
        <ActionModal
            Icon={MdAdminPanelSettings}
            variant="error"
            title="Are you sure!"
            description={`You are about to allow <em>"${subAdmin?.user?.name}"</em> RTO Workplace Approval Request. Do you wish to continue?`}
            onConfirm={onConfirmClicked}
            onCancel={onCancel}
            input
            inputKey={subAdmin?.user?.email}
            actionObject={subAdmin}
            loading={resultToggleRtoWpApproval?.isLoading}
        />
    )
}
