import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { AdminApi } from '@queries'
import { Student, Subscriber } from '@types'
import { useEffect } from 'react'
import { FaBan } from 'react-icons/fa'
import { IoWarningOutline } from 'react-icons/io5'
import { useChangeStatus } from '../hooks'

export const ArchiveModal = ({
    eSign,
    onCancel,
}: {
    eSign: any
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const { onArchive, changeStatusResult } = useChangeStatus()

    const onConfirmClicked = async (eSign: Student) => {
        await onArchive(eSign)
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            notification.success({
                title: `Request Archived`,
                description: `Student "${eSign?.name}" has been archived.`,
            })
            onCancel()
        }
        if (changeStatusResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for archiving Student was failed`,
            })
        }
    }, [changeStatusResult])

    return (
        <ActionModal
            Icon={IoWarningOutline}
            variant="primary"
            title="Are you sure!"
            description={`You are about to archive <em>"${eSign?.name}"<em>. Do you wish to continue?`}
            onConfirm={onConfirmClicked}
            onCancel={onCancel}
            input
            inputKey={eSign?.user?.email}
            actionObject={eSign}
            loading={changeStatusResult.isLoading}
        />
    )
}
