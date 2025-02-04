import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { Industry, UserStatus, RtoStatus } from '@types'
import { useEffect } from 'react'
import { RiChatFollowUpLine } from 'react-icons/ri'
import { SubAdminApi } from '@queries'
export const RtoFollowUpModal = ({
    rto,
    onCancel,
}: {
    rto: any | undefined | null
    onCancel: () => void
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const [changeStatus, changeStatusResult] =
        SubAdminApi.SubAdmin.useRtosStatusChange()

    const onConfirmClicked = async (rto: any) => {
        await changeStatus({
            id: rto.id,
            status: RtoStatus.FOLLOW_UP,
        })
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            alert.error({
                title: `rto is started follow up`,
                description: `rto "${rto?.businessName}" has been followed up.`,
            })
            onCancel()
        }
        if (changeStatusResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for "${rto?.businessName}" follow up rto was failed`,
            })
        }
    }, [changeStatusResult])

    return (
        <ActionModal
            Icon={RiChatFollowUpLine}
            variant="info"
            title="Are you sure!"
            description={`You want to 'Follow Up' mode for <em>"${rto?.businessName}"</em> ?`}
            onConfirm={onConfirmClicked}
            onCancel={onCancel}
            input
            inputKey={rto?.email}
            actionObject={rto}
            loading={changeStatusResult.isLoading}
        />
    )
}
