import { Button } from '@components'
import {
    ApproveWpApprovalRequest,
    RejectWpApprovalRequest,
} from '@partials/rto/wpApprovalReq/modal'
import { RtoApprovalWorkplaceRequest } from '@types'
import React, { ReactElement, useState } from 'react'

export const ApproveRtoWorkplaceActions = ({
    wpApproval,
}: {
    wpApproval: RtoApprovalWorkplaceRequest
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const onCancelModal = () => setModal(null)

    const onApprove = () => {
        setModal(
            <ApproveWpApprovalRequest
                wpAppReq={wpApproval}
                onCancel={onCancelModal}
            />
        )
    }

    const onReject = () => {
        setModal(
            <RejectWpApprovalRequest
                wpAppReq={wpApproval}
                onCancel={onCancelModal}
            />
        )
    }
    return (
        <div className="flex gap-x-1 items-center">
            {modal}
            <Button
                text="Approve"
                onClick={() => {
                    onApprove()
                }}
                variant="success"
            />

            <Button
                text="Reject"
                onClick={() => {
                    onReject()
                }}
                variant="error"
            />
        </div>
    )
}
