import { Button } from '@components'
import { ReactElement, useState } from 'react'
import { WorkplaceApprovalDeclaration, WorkplaceRejectedModal } from './modal'
import { isBrowser } from '@utils'

export const WorkplaceApprovalActions = ({
    onCancel,
    declaration,
    wpApprovalId,
    dates,
}: {
    declaration: string
    onCancel?: () => void
    wpApprovalId: number
    dates: any
}) => {
    const onCancelModal = () => setModal(null)
    const [modal, setModal] = useState<ReactElement | null>(null)

    const onApprovalClicked = (declaration: string) => {
        setModal(
            <WorkplaceApprovalDeclaration
                onCancel={(val?: boolean) => {
                    if (val) {
                        onCancelModal()
                        if (onCancel) {
                            onCancel()
                        }
                    } else {
                        onCancelModal()
                    }
                }}
                declaration={declaration}
                wpApprovalId={wpApprovalId}
            />
        )
    }

    const onRejectedClicked = () => {
        setModal(
            <WorkplaceRejectedModal
                onCancel={(val?: boolean) => {
                    if (val) {
                        onCancelModal()
                        if (onCancel) {
                            onCancel()
                        }
                    } else {
                        onCancelModal()
                    }
                }}
                wpApprovalId={wpApprovalId}
            />
        )
    }
    return (
        <>
            {modal}
            <div className="w-full md:w-96 flex flex-col gap-y-1 items-center justify-center mx-auto py-2">
                {Object.values(dates)?.filter((date) => {
                    if (date) {
                        return date
                    }
                })?.length > 0 ? (
                    <div className="h-10 w-full flex items-center gap-x-6">
                        {dates?.date1 ? (
                            <Button
                                fullHeight
                                fullWidth
                                onClick={() => {
                                    if (isBrowser()) {
                                        window?.open(
                                            `${process.env.NEXT_PUBLIC_END_POINT}/subadmin/workplace/approval-request/${wpApprovalId}/update-status?status=approved&date=${dates?.date1}`
                                        )
                                    }
                                    if (onCancel) {
                                        onCancel()
                                    }
                                }}
                                text="Approve With Date 1"
                                variant="success"
                            />
                        ) : null}
                        {dates?.date2 ? (
                            <Button
                                fullHeight
                                fullWidth
                                onClick={() => {
                                    if (isBrowser()) {
                                        window?.open(
                                            `${process.env.NEXT_PUBLIC_END_POINT}/subadmin/workplace/approval-request/${wpApprovalId}/update-status?status=approved&date=${dates?.date2}`
                                        )
                                    }
                                    if (onCancel) {
                                        onCancel()
                                    }
                                }}
                                text="Approve With Date 2"
                                variant="success"
                            />
                        ) : null}
                    </div>
                ) : (
                    <div className="h-10 w-full">
                        <Button
                            fullWidth
                            fullHeight
                            onClick={() => {
                                // onChangeStatusClicked(WPApprovalStatus.Approved)
                                onApprovalClicked(declaration)
                            }}
                            text="Approve"
                            variant="success"
                        />
                    </div>
                )}
                <div className="h-10 w-full">
                    <Button
                        fullWidth
                        fullHeight
                        onClick={() => {
                            // onChangeStatusClicked(WPApprovalStatus.Rejected)
                            onRejectedClicked()
                        }}
                        text="Reject"
                        variant="action"
                    />
                </div>
            </div>
        </>
    )
}
