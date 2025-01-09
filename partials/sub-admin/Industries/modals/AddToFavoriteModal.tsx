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
    onCancel: () => void
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
                title: `Favorite`,
                description: `Industry ${industry?.user?.name}  ${
                    industry?.subAdmin && industry?.subAdmin?.length > 0
                        ? 'removed from favorite'
                        : 'marked as favorite'
                } .`,
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
