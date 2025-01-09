import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { AdminApi } from '@queries'
import { Industry, SubAdmin, Subscriber } from '@types'
import { useEffect } from 'react'
import { FaBan } from 'react-icons/fa'
import { HiCheckBadge } from 'react-icons/hi2'
import { useChangeStatus } from '../hooks'

export const AcceptModal = ({
    subAdmin,
    onCancel,
}: {
    subAdmin: SubAdmin
    onCancel: () => void
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const { onAccept, changeStatusResult } = useChangeStatus()

    const onConfirmUClicked = async (subAdmin: SubAdmin) => {
        await onAccept(subAdmin?.user)
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            alert.success({
                title: `Request Accepted`,
                description: `subAdmin "${subAdmin.user.name}" has been accepted.`,
            })
            onCancel()
        }
        if (changeStatusResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for accepting subAdmin was failed`,
            })
        }
    }, [changeStatusResult])

    return (
        <ActionModal
            Icon={HiCheckBadge}
            variant="success"
            title="Are you sure!"
            description={`You are about to accept <em>"${subAdmin.user.name}"<em>. Do you wish to continue?`}
            onConfirm={onConfirmUClicked}
            onCancel={onCancel}
            input
            inputKey={subAdmin.user.email}
            actionObject={subAdmin}
            loading={changeStatusResult.isLoading}
        />
    )
}
