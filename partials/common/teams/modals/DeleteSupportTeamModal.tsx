import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { CommonApi, useRemoveJobMutation } from '@queries'

import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const DeleteSupportTeamModal = ({
    team,
    onCancel,
}: {
    team: any
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const [remove, removeResult] = CommonApi.Teams.useDeleteSupportTeam()

    const onConfirmUClicked = async (team: any) => {
        await remove(team?.id)
    }

    useEffect(() => {
        if (removeResult.isSuccess) {
            notification.error({
                title: `Team Deleted`,
                description: `Team "${team?.name}" has been deleted.`,
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
                description={`You are about to delete team "${team?.name}". Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={team?.title}
                actionObject={team}
                loading={removeResult.isLoading}
            />
        </>
    )
}
