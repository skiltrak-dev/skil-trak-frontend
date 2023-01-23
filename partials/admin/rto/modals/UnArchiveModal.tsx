import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { AdminApi } from '@queries'
import { Rto } from '@types'
import { useEffect } from 'react'
import { FaBan } from 'react-icons/fa'
import { IoWarningOutline } from 'react-icons/io5'
import { useChangeStatus } from '../hooks'

export const UnArchiveModal = ({
    item,
    onCancel,
}: {
    item: Rto | undefined | null
    onCancel: Function
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const { onAccept, changeStatusResult } = useChangeStatus()

    const onConfirmClicked = async (item: Rto) => {
        await onAccept(item)
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            alert.success({
                title: `Request UnArchived`,
                description: `Rto "${item?.user?.name}" has been Un Archive.`,
            })
            onCancel()
        }
        if (changeStatusResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for archiving Rto was failed`,
            })
        }
    }, [changeStatusResult])

    return (
        <ActionModal
            Icon={IoWarningOutline}
            variant="primary"
            title="Are you sure!"
            description={`You are about to archive <em>"${item?.user?.name}"<em>. Do you wish to continue?`}
            onConfirm={onConfirmClicked}
            onCancel={onCancel}
            input
            inputKey={item?.user?.email}
            actionObject={item}
            loading={changeStatusResult.isLoading}
        />
    )
}
