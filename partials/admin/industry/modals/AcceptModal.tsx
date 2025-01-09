import { ActionModal, ShowErrorNotifications } from '@components'
import { useAlert } from '@hooks'
import { Industry } from '@types'
import { useEffect } from 'react'
import { HiCheckBadge } from 'react-icons/hi2'
import { useChangeStatus } from '../hooks'

export const AcceptModal = ({
    industry,
    onCancel,
}: {
    industry: Industry | undefined | null
    onCancel: () => void
}) => {
    const { alert } = useAlert()
    const { onAccept, changeStatusResult } = useChangeStatus()

    const onConfirmUClicked = async (industry: Industry) => {
        await onAccept(industry)
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            alert.success({
                title: `Request Accepted`,
                description: `Industry "${industry?.user?.name}" has been accepted.`,
            })
            onCancel()
        }
    }, [changeStatusResult])

    return (
        <>
            <ShowErrorNotifications result={changeStatusResult} />
            <ActionModal
                Icon={HiCheckBadge}
                variant="success"
                title="Are you sure!"
                description={`You are about to accept <em>"${industry?.user?.name}"<em>. Do you wish to continue?`}
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
