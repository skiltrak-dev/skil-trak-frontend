import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'
import { IndustryStatus } from '@types'
import { useEffect } from 'react'
import { AiFillCheckCircle } from 'react-icons/ai'
export const MultipleDefaultModal = ({
    ids,
    onCancel,
}: {
    ids: number[]
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const [changeStatus, changeStatusResult] =
        CommonApi.FindWorkplace.useMultipleStatusChange()

    const onConfirmClicked = async () => {
        await changeStatus({
            ids,
            status: IndustryStatus?.DEFAULT,
        })
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            notification.error({
                title: `Industry is default`,
                description: `Industries have been default.`,
            })
            onCancel()
        }
    }, [changeStatusResult])

    return (
        <>
            <ShowErrorNotifications result={changeStatusResult} />
            <ActionModal
                Icon={AiFillCheckCircle}
                variant="primary"
                title="Are you sure!"
                description={`You are about to default <em>"Multiple Industries"</em>. Do you wish to continue?`}
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
