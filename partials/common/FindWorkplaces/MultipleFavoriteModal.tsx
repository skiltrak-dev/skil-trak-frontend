import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'
import { IndustryStatus } from '@types'
import { useEffect } from 'react'
import { MdOutlineFavorite } from 'react-icons/md'
export const MultipleFavoriteModal = ({
    ids,
    onCancel,
}: {
    ids: any | undefined | null
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const [changeStatus, changeStatusResult] =
        CommonApi.FindWorkplace.useMultipleStatusChange()

    const onConfirmClicked = async () => {
        await changeStatus({
            ids,
            status: IndustryStatus.FAVOURITE,
        })
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            notification.error({
                title: `Favorite`,
                description: `Industries have been added to favorite.`,
            })
            onCancel()
        }
    }, [changeStatusResult])

    return (
        <>
            <ShowErrorNotifications result={changeStatusResult} />
            <ActionModal
                Icon={MdOutlineFavorite}
                variant="primary"
                title="Are you sure!"
                description={`You are about to change status to favorite, Do you wish to continue?`}
                onConfirm={onConfirmClicked}
                onCancel={onCancel}
                input
                inputKey={''}
                actionObject={{}}
                loading={changeStatusResult.isLoading}
            />
        </>
    )
}
