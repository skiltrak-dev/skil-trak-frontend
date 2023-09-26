import { ActionModal, ShowErrorNotifications } from '@components'
import { useAlert, useNotification } from '@hooks'
import { CommonApi, useRemoveRTOStudentMutation } from '@queries'

import { Student } from '@types'
import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const DeleteMultiFutureIndustryModal = ({
    onCancel,
    futureIndustries,
}: {
    onCancel: Function
    futureIndustries: any
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const [remove, removeResult] =
        CommonApi.FindWorkplace.useRemoveMultiFutureIndustry()

    const onConfirmUClicked = async (futureIndustries: Student) => {
        await remove({ ids: futureIndustries })
    }

    useEffect(() => {
        if (removeResult.isSuccess) {
            notification.error({
                title: `Future Industries Deleted`,
                description: `Future Industries has been deleted.`,
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
                description={`You are about to delete Multiple Future Industries. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                actionObject={futureIndustries}
                loading={removeResult.isLoading}
            />
        </>
    )
}
