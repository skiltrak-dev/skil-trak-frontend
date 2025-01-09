import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'
import { IndustryStatus } from '@types'
import { useEffect } from 'react'
import { MdBlockFlipped, MdOutlineFavorite } from 'react-icons/md'
export const MultipleBlockModal = ({
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
            status: IndustryStatus.BLOCKED,
        })
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            notification.error({
                title: `Blocked`,
                description: `Industries have been Blocked.`,
            })
            onCancel()
        }
    }, [changeStatusResult])

    return (
        <>
            <ShowErrorNotifications result={changeStatusResult} />
            <ActionModal
                Icon={MdBlockFlipped}
                variant="error"
                title="Are you sure!"
                description={`You are about to change status to blocked, Do you wish to continue?`}
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
