import { ActionModal, ShowErrorNotifications } from '@components'
import { useAlert, useNotification } from '@hooks'
import { Industry, Rto } from '@types'
import { useEffect } from 'react'
import { FaBan } from 'react-icons/fa'
import { useChangeStatus } from '../hooks'

export const ArchiveModal = ({
    industry,
    onCancel,
}: {
    industry: Industry | undefined | null
    onCancel: Function
}) => {
    const { notification } = useNotification()
    const { onArchive, changeStatusResult } = useChangeStatus()

    const onConfirmUClicked = async (industry: Industry) => {
        await onArchive(industry)
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            notification.success({
                title: `Request Archived`,
                description: `Industry "${industry?.user?.name}" has been Archived.`,
            })
            onCancel()
        }
    }, [changeStatusResult])

    return (
        <>
            <ShowErrorNotifications result={changeStatusResult} />
            <ActionModal
                Icon={FaBan}
                variant="primary"
                title="Are you sure!"
                description={`You are about to archive "${industry?.user?.name}". Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={industry?.user?.email}
                actionObject={industry}
                loading={changeStatusResult.isLoading}
            />
        </>
    )
}
