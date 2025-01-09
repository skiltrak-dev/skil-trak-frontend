import { ActionModal, ShowErrorNotifications } from '@components'
import { useAlert, useNotification } from '@hooks'
import { AdminApi } from '@queries'

import { Student } from '@types'
import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const DeleteRplModal = ({
    rpl,
    onCancel,
}: {
    rpl: any
    onCancel: () => void
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const [remove, removeResult] = AdminApi.Rpl.useRemoveRpl()

    const onConfirmUClicked = async (rpl: any) => {
        await remove(rpl.id)
    }

    useEffect(() => {
        if (removeResult.isSuccess) {
            notification.error({
                title: `RPL Deleted`,
                description: `RPL "${rpl?.industry?.user?.name}" has been deleted.`,
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
                description={`You are about to delete "${rpl?.industry?.user?.name} RPL". Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={rpl?.industry?.user?.email}
                actionObject={rpl}
                loading={removeResult.isLoading}
            />
        </>
    )
}
