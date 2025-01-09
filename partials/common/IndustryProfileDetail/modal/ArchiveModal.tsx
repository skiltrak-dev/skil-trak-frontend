import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { AdminApi } from '@queries'
import { Industry } from '@types'
import { useEffect } from 'react'
import { FaBan } from 'react-icons/fa'
import { IoWarningOutline } from 'react-icons/io5'
import { useChangeStatus } from '../hooks'

export const ArchiveModal = ({
    item,
    onCancel,
}: {
    item: Industry | undefined | null
    onCancel: () => void
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const { onArchive, changeStatusResult } = useChangeStatus()

    const onConfirmClicked = async (item: Industry) => {
        await onArchive(item)
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            alert.success({
                title: `Request Archived`,
                description: `Rto "${item?.user?.name}" has been archived.`,
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
