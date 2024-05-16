import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { Industry, UserStatus, RtoStatus } from '@types'
import { useEffect } from 'react'
import { FaHandshake } from 'react-icons/fa'
import { SubAdminApi } from '@queries'
import { MdOutlineFavorite } from 'react-icons/md'
export const RtoFavoriteModal = ({
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
            status: RtoStatus.FAVOURITE,
        })
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            alert.error({
                title: `Favorite`,
                description: `rto "${rto?.businessName}" has been added to favorite.`,
            })
            onCancel()
        }
        if (changeStatusResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for Favorite rto was failed`,
            })
        }
    }, [changeStatusResult])

    return (
        <ActionModal
            Icon={MdOutlineFavorite}
            variant="primary"
            title="Are you sure!"
            description={`You want to add <em>"${rto?.businessName}"</em> to your favorites?`}
            onConfirm={onConfirmClicked}
            onCancel={onCancel}
            input
            inputKey={rto?.email}
            actionObject={rto}
            loading={changeStatusResult.isLoading}
        />
    )
}
