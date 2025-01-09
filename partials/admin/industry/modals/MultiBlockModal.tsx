import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'
import { Industry, UserStatus } from '@types'
import { useEffect } from 'react'
import { FaBan } from 'react-icons/fa'
import { HiCheckBadge } from 'react-icons/hi2'

export const MultiBlockModal = ({
    industries,
    onCancel,
}: {
    industries: Industry[] | undefined | null
    onCancel: () => void
}) => {
    const { notification } = useNotification()

    const [bulkAction, resultBulkAction] =
        CommonApi.changeUserStatus.useChangeStatus()

    const onConfirmUClicked = async (industries: Industry[]) => {
        const arrayOfIds = industries.map((industry: any) => industry?.user.id)
        bulkAction({
            ids: arrayOfIds,
            status: UserStatus.Blocked,
        })
    }

    useEffect(() => {
        if (resultBulkAction.isSuccess) {
            notification.success({
                title: `Request Blocked`,
                description: `Multi Industries has been Blocked.`,
            })
            onCancel()
        }
    }, [resultBulkAction])

    return (
        <>
            <ShowErrorNotifications result={resultBulkAction} />
            <ActionModal
                Icon={FaBan}
                variant="error"
                title="Are you sure!"
                description={`You are about to block Multiple Industries. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                actionObject={industries}
                loading={resultBulkAction.isLoading}
            />
        </>
    )
}
