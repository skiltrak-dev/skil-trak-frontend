import { ActionModal, ShowErrorNotifications } from '@components'
import { useAlert, useNotification } from '@hooks'
import { AdminApi, CommonApi, useRemoveJobMutation } from '@queries'

import { AppointmentType, Rto, Sector } from '@types'
import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const DeleteBranchesModal = ({
    branch,
    onCancel,
}: {
    branch: any
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const [remove, removeResult] =
        CommonApi.Industries.useRemoveIndustryBranch()

    const onConfirmUClicked = async (branch: any) => {
        await remove(Number(branch?.id))
    }

    useEffect(() => {
        if (removeResult.isSuccess) {
            notification.error({
                title: `Branch Deleted`,
                description: `Branch has been deleted.`,
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
                description={`You are about to delete Industry Branch. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={branch?.title}
                actionObject={branch}
                loading={removeResult.isLoading}
            />
        </>
    )
}
