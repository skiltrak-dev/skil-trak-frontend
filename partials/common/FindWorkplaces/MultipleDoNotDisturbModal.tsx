import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'
import { IndustryStatus } from '@types'
import { useEffect } from 'react'
import { FaBan } from 'react-icons/fa'
export const MultipleDoNotDisturbModal = ({
    ids,
    onCancel,
}: {
    ids: number[]
    onCancel: Function
}) => {
    const { notification } = useNotification()
    const [changeStatus, changeStatusResult] =
        CommonApi.FindWorkplace.useMultipleStatusChange()

    const onConfirmClicked = async () => {
        await changeStatus({
            ids,
            status: IndustryStatus.DO_NOT_DISTURB,
        })
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            notification.error({
                title: `Industry is do not disturb`,
                description: `Industries have been do not disturb.`,
            })
            onCancel()
        }
    }, [changeStatusResult])

    return (
        <>
            <ShowErrorNotifications result={changeStatusResult} />
            <ActionModal
                Icon={FaBan}
                variant="error"
                title="Are you sure!"
                description={`You are about 'to do not disturb'" <em>"Multiple Industries"</em>. Do you wish to continue?`}
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
