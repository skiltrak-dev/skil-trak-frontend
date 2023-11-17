import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { CommonApi, useRemoveJobMutation } from '@queries'

import { Industry } from '@types'
import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const UnSnoozeIndustryModal = ({
    industry,
    onCancel,
}: {
    industry: Industry
    onCancel: Function
}) => {
    const { notification } = useNotification()
    const [unSnooze, unSnoozeResult] =
        CommonApi.Industries.useUnSnoozeIndustry()

    const onConfirmUClicked = async (industry: any) => {
        await unSnooze(Number(industry?.id))
    }

    useEffect(() => {
        if (unSnoozeResult.isSuccess) {
            notification.error({
                title: `Industry Un Snoozed`,
                description: `Industry "${industry?.user?.name}" has been Un Snoozed.`,
            })
            onCancel()
        }
    }, [unSnoozeResult])

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
