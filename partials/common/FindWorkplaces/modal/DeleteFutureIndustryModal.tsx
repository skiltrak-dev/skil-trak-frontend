import { ActionModal, ShowErrorNotifications } from '@components'
import { useAlert, useNotification } from '@hooks'
import { CommonApi, useRemoveRTOStudentMutation } from '@queries'

import { Student } from '@types'
import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const DeleteFutureIndustryModal = ({
    onCancel,
    futureIndustry,
}: {
    onCancel: Function
    futureIndustry: any
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const [remove, removeResult] =
        CommonApi.FindWorkplace.useRemoveFutureIndustryMutation()

    const onConfirmUClicked = async (futureIndustry: Student) => {
        await remove(futureIndustry.id)
    }

    useEffect(() => {
        if (removeResult.isSuccess) {
            notification.error({
                title: `Future Industry Deleted`,
                description: `Future Industry "${futureIndustry?.businessName}" has been deleted.`,
            })
            onCancel()
        }
    }, [removeResult])

    return (
        <>
            <ShowErrorNotifications result={removeResult} />
            <ActionModal
                Icon={FaTrash}
                variant="error"
                title="Are you sure!"
                description={`You are about to delete "${futureIndustry?.businessName}". Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={futureIndustry?.email}
                actionObject={futureIndustry}
                loading={removeResult.isLoading}
            />
        </>
    )
}
