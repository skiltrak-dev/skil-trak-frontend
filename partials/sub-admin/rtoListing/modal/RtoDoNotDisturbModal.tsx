import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { Industry, UserStatus, RtoStatus } from '@types'
import { useEffect } from 'react'
import { FaBan } from 'react-icons/fa'
import { SubAdminApi } from '@queries'
export const RtoDoNotDisturbModal = ({
    rto,
    onCancel,
}: {
    rto: any | undefined | null
    onCancel: Function
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const [changeStatus, changeStatusResult] =
        SubAdminApi.SubAdmin.useRtosStatusChange()

    const onConfirmClicked = async (rto: any) => {
        await changeStatus({
            id: rto.id,
            status: RtoStatus.DO_NOT_DISTURB,
        })
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            alert.error({
                title: `rto is do not disturb`,
                description: `rto "${rto?.businessName}" has been do not disturb.`,
            })
            onCancel()
        }
        if (changeStatusResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for "${rto?.businessName}" do not disturb rto was failed`,
            })
        }
    }, [changeStatusResult])

    return (
        <ActionModal
            Icon={FaBan}
            variant="error"
            title="Are you sure!"
            description={`You are about 'to do not disturb'
                    
            }" <em>"${rto?.businessName}"</em>. Do you wish to continue?`}
            onConfirm={onConfirmClicked}
            onCancel={onCancel}
            input
            inputKey={rto?.email}
            actionObject={rto}
            loading={changeStatusResult.isLoading}
        />
    )
}
