import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { Industry, UserStatus, RtoStatus } from '@types'
import { useEffect } from 'react'
import { MdSnooze } from 'react-icons/md'
import { SubAdminApi } from '@queries'
export const RtoSnoozedModal = ({
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
            status: RtoStatus.SNOOZED,
        })
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            alert.error({
                title: `rto is snoozed`,
                description: `rto "${rto?.businessName}" has been snoozed.`,
            })
            onCancel()
        }
        if (changeStatusResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for "${rto?.businessName}" snoozed rto was failed`,
            })
        }
    }, [changeStatusResult])

    return (
        <ActionModal
            Icon={MdSnooze}
            variant="secondary"
            title="Are you sure!"
            description={`You want to mode 'Snoozed' mode for <em>"${rto?.businessName}"</em> ?`}
            onConfirm={onConfirmClicked}
            onCancel={onCancel}
            input
            inputKey={rto?.email}
            actionObject={rto}
            loading={changeStatusResult.isLoading}
        />
    )
}
