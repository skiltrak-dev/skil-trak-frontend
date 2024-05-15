import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { Industry, UserStatus, RtoStatus } from '@types'
import { useEffect } from 'react'
import { MdCall } from 'react-icons/md'
import { SubAdminApi } from '@queries'
import { AiFillCheckCircle } from 'react-icons/ai'
export const RtoDefaultModal = ({
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
            id: rto?.id,
            status: RtoStatus?.DEFAULT,
        })
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            alert.error({
                title: `rto is default`,
                description: `rto "${rto?.businessName}" has been default.`,
            })
            onCancel()
        }
        if (changeStatusResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for "${rto?.businessName}" rto was failed`,
            })
        }
    }, [changeStatusResult])

    return (
        <ActionModal
            Icon={AiFillCheckCircle}
            variant="primary"
            title="Are you sure!"
            description={`You are about to default <em>"${rto?.businessName}"</em>. Do you wish to continue?`}
            onConfirm={onConfirmClicked}
            onCancel={onCancel}
            input
            inputKey={rto?.email}
            actionObject={rto}
            loading={changeStatusResult.isLoading}
        />
    )
}
