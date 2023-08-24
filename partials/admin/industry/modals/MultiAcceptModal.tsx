import { ActionModal, ShowErrorNotifications } from '@components'
import { useAlert, useNotification } from '@hooks'
import { AdminApi, CommonApi, commonApi } from '@queries'
import { Industry, Subscriber, UserStatus } from '@types'
import { useEffect } from 'react'
import { FaBan } from 'react-icons/fa'
import { HiCheckBadge } from 'react-icons/hi2'
import { useChangeStatus } from '../hooks'

export const MultiAcceptModal = ({
    industries,
    onCancel,
}: {
    industries: Industry[] | undefined | null
    onCancel: Function
}) => {
    const { notification } = useNotification()

    const [bulkAction, resultBulkAction] =
        CommonApi.changeUserStatus.useChangeStatus()

    const onConfirmUClicked = async (industries: Industry[]) => {
        const arrayOfIds = industries.map((industry: any) => industry?.user.id)
        bulkAction({
            ids: arrayOfIds,
            status: UserStatus.Approved,
        })
    }

    useEffect(() => {
        if (resultBulkAction.isSuccess) {
            notification.success({
                title: `Request Accepted`,
                description: `Multi Industries has been accepted.`,
            })
            onCancel()
        }
    }, [resultBulkAction])

    return (
        <>
            <ShowErrorNotifications result={resultBulkAction} />
            <ActionModal
                Icon={HiCheckBadge}
                variant="success"
                title="Are you sure!"
                description={`You are about to accept Multiple Industries. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                actionObject={industries}
                loading={resultBulkAction.isLoading}
            />
        </>
    )
}
