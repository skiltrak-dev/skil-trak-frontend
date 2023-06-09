import { ActionModal, ShowErrorNotifications } from '@components'
import { useAlert, useNotification } from '@hooks'
import { useAddToFavoriteMutation } from '@queries'
import { Industry } from '@types'
import { useEffect } from 'react'
import { HiCheckBadge } from 'react-icons/hi2'

export const AddToFavoriteModal = ({
    industry,
    onCancel,
}: {
    industry: Industry
    onCancel: Function
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()

    const [addToFavorite, addToFavoriteResult] = useAddToFavoriteMutation()

    const onConfirmUClicked = async (industry: Industry) => {
        await addToFavorite(industry?.id)
    }

    useEffect(() => {
        if (addToFavoriteResult.isSuccess) {
            notification.success({
                title: `Request Accepted`,
                description: `Student "${industry?.user?.name}" has been accepted.`,
            })
            onCancel()
        }
    }, [addToFavoriteResult])

    return (
        <>
            <ShowErrorNotifications result={addToFavoriteResult} />
            <ActionModal
                Icon={HiCheckBadge}
                variant="success"
                title="Are you sure!"
                description={`You are about to add to favorite <em>"${industry?.user?.name}"<em>. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={industry?.user?.email}
                actionObject={industry}
                loading={addToFavoriteResult.isLoading}
            />
        </>
    )
}
