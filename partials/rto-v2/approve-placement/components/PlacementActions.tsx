import { Check, X } from 'lucide-react'
import { Button, Tooltip } from '@components'
import React, { ReactElement, useState } from 'react'
import { RtoApprovalWorkplaceRequest } from '@types'
import { ApproveWpApprovalRequest, RejectWpApprovalRequest } from '../modals'

export const PlacementActions = ({
    approval,
}: {
    approval: RtoApprovalWorkplaceRequest
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const onCancelModal = () => setModal(null)

    const onApprove = (wpAppReq: RtoApprovalWorkplaceRequest) => {
        setModal(
            <ApproveWpApprovalRequest
                wpAppReq={wpAppReq}
                onCancel={onCancelModal}
            />
        )
    }

    const onReject = (wpAppReq: RtoApprovalWorkplaceRequest) => {
        setModal(
            <RejectWpApprovalRequest
                wpAppReq={wpAppReq}
                onCancel={onCancelModal}
            />
        )
    }

    return (
        <div className="flex items-center gap-2 shrink-0">
            {modal}
            <div className="relative group">
                <Button
                    variant="error"
                    outline
                    onClick={() => onReject(approval)}
                    className="!px-2.5 min-w-auto"
                >
                    <X className="h-4 w-4" />
                </Button>
                <Tooltip>Reject Placement</Tooltip>
            </div>

            <Button
                Icon={Check}
                text=" Quick Approve"
                onClick={() => onApprove(approval)}
            />
        </div>
    )
}
