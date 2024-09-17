import React from 'react'
import { SubAdminApi } from '@queries'
import { WPApprovalStatus } from './enum'
import { useNotification } from '@hooks'
import { Button, ShowErrorNotifications } from '@components'

export const WorkplaceApprovalActions = ({
    onCancel,
    wpApprovalId,
}: {
    onCancel?: () => void
    wpApprovalId: number
}) => {
    const { notification } = useNotification()

    const [changeStatus, changeStatusResult] =
        SubAdminApi.Workplace.changeWpReqStatus()

    const onChangeStatusClicked = async (status: WPApprovalStatus) => {
        const res: any = await changeStatus({ id: wpApprovalId, status })

        if (res?.data) {
            notification.success({
                title: 'Status Changed',
                description: 'Status Changed Successfully',
            })
            if (onCancel) {
                onCancel()
            }
        }
    }
    return (
        <>
            <ShowErrorNotifications result={changeStatusResult} />
            <div className="w-72 flex flex-col gap-y-1 items-center justify-center mx-auto py-2">
                <div className="h-10 w-full">
                    <Button
                        fullWidth
                        fullHeight
                        onClick={() => {
                            onChangeStatusClicked(WPApprovalStatus.Approved)
                        }}
                        text="Approve"
                        loading={changeStatusResult.isLoading}
                        disabled={changeStatusResult.isLoading}
                        variant="success"
                    />
                </div>
                <div className="h-10 w-full">
                    <Button
                        fullWidth
                        fullHeight
                        onClick={() => {
                            onChangeStatusClicked(WPApprovalStatus.Rejected)
                        }}
                        loading={changeStatusResult.isLoading}
                        disabled={changeStatusResult.isLoading}
                        text="Reject"
                        variant="action"
                    />
                </div>
            </div>
        </>
    )
}
