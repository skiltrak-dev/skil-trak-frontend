import { Check, CheckCircle2, X, XCircle } from 'lucide-react'
import { Button, Tooltip } from '@components'
import React, { ReactElement, useState } from 'react'
import { RtoApprovalWorkplaceRequest } from '@types'
import { ApproveWpApprovalRequest, RejectWpApprovalRequest } from '../../modals'

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
        <>
            {modal}
            <Button
                onClick={() => onApprove(approval)}
                variant="success"
                className="h-12"
                fullWidth
            >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <CheckCircle2 className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                <span>Approve Workplace</span>
            </Button>

            <Button
                onClick={() => onReject(approval)}
                variant="error"
                outline
                className="w-full border-2 border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400 h-12 transition-all group"
            >
                <XCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Reject Workplace
            </Button>
        </>
    )
}
