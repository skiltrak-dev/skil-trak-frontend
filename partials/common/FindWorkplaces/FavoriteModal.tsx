import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { Industry, UserStatus, IndustryStatus } from '@types'
import { useEffect } from 'react'
import { FaHandshake } from 'react-icons/fa'
import { commonApi } from '@queries'
import { MdOutlineFavorite } from 'react-icons/md'
export const FavoriteModal = ({
    industry,
    onCancel,
}: {
    industry: any | undefined | null
    onCancel: Function
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const [changeStatus, changeStatusResult] =
        commonApi.useIndustriesStatusChangeMutation()

    const onConfirmClicked = async (industry: any) => {
        await changeStatus({
            id: industry.id,
            status: IndustryStatus.FAVOURITE,
        })
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            alert.error({
                title: `Favorite`,
                description: `Industry "${industry?.businessName}" has been added to favorite.`,
            })
            onCancel()
        }
        if (changeStatusResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for Favorite Industry was failed`,
            })
        }
    }, [changeStatusResult])

    return (
        <ActionModal
            Icon={MdOutlineFavorite}
            variant="primary"
            title="Are you sure!"
            description={`You are about to favorite <em>"${industry?.businessName}"</em>. Do you wish to continue?`}
            onConfirm={onConfirmClicked}
            onCancel={onCancel}
            input
            inputKey={industry?.email}
            actionObject={industry}
            loading={changeStatusResult.isLoading}
        />
    )
}
