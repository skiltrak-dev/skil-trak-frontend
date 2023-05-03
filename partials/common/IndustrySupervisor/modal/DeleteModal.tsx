import { ActionModal, ShowErrorNotifications } from '@components'
import { useAlert, useNotification } from '@hooks'
import { IndustryApi } from '@queries'

import { Rto } from '@types'
import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const DeleteModal = ({
    supervisor,
    onCancel,
}: {
    supervisor: any
    onCancel: Function
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const [remove, removeResult] = IndustryApi.Supervisor.removeSupervisor()

    const onConfirmUClicked = async (supervisor: Rto) => {
        await remove(supervisor?.id)
    }

    useEffect(() => {
        if (removeResult.isSuccess) {
            notification.error({
                title: `Supervisor Deleted`,
                description: `Supervisor "${supervisor?.name}" has been deleted.`,
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
                description={`You are about to delete "${supervisor?.name}". Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={supervisor?.email}
                actionObject={supervisor}
                loading={removeResult.isLoading}
            />
        </>
    )
}
