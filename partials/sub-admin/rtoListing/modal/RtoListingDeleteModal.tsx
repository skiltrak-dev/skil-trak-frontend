import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { Industry, UserStatus, RtoStatus } from '@types'
import { useEffect } from 'react'
import { MdCall } from 'react-icons/md'
import { SubAdminApi } from '@queries'
import { AiFillCheckCircle } from 'react-icons/ai'
export const RtoListingDeleteModal = ({
    rto,
    onCancel,
}: {
    rto: any | undefined | null
    onCancel: Function
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const [remove, removeResult] = SubAdminApi.SubAdmin.useDeleteRtoListing()

    const onConfirmClicked = async (rto: any) => {
        await remove(rto?.id)
    }

    useEffect(() => {
        if (removeResult.isSuccess) {
            alert.error({
                title: `RTO is delete`,
                description: `RTO "${rto?.businessName}" has been delete.`,
            })
            onCancel()
        }
        if (removeResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for "${rto?.businessName}" RTO was failed`,
            })
        }
    }, [removeResult])

    return (
        <ActionModal
            Icon={AiFillCheckCircle}
            variant="primary"
            title="Are you sure!"
            description={`You are about to delete <em>"${rto?.businessName}"</em>. Do you wish to continue?`}
            onConfirm={onConfirmClicked}
            onCancel={onCancel}
            input
            inputKey={rto?.email}
            actionObject={rto}
            loading={removeResult.isLoading}
        />
    )
}
