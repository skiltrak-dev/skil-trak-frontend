import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'

import { Industry } from '@types'
import { FaTrash } from 'react-icons/fa'

export const UnSnoozeIndustryModal = ({
    industry,
    onCancel,
}: {
    industry: Industry
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const [unSnooze, unSnoozeResult] =
        CommonApi.Industries.useUnSnoozeIndustry()

    const onConfirmUClicked = async (industry: any) => {
        const res: any = await unSnooze({ id: Number(industry?.id) })

        if (res?.data) {
            notification.error({
                title: `Industry Un Snoozed`,
                description: `Industry "${industry?.user?.name}" has been Un Snoozed.`,
            })
            onCancel()
        }
    }

    return (
        <>
            <ShowErrorNotifications result={unSnoozeResult} />
            <ActionModal
                Icon={FaTrash}
                variant="error"
                title="Are you sure!"
                description={`You are about to un snooze Industry "${industry?.user?.name}". Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={industry?.user?.name}
                actionObject={industry}
                loading={unSnoozeResult.isLoading}
            />
        </>
    )
}
