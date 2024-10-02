import { Button } from '@components'
import { useNotification } from '@hooks'
import { ReactElement, useState } from 'react'
import { WorkplaceApprovalDeclaration, WorkplaceRejectedModal } from './modal'

export const WorkplaceApprovalActions = ({
    onCancel,
    declaration,
    wpApprovalId,
}: {
    declaration: string
    onCancel?: () => void
    wpApprovalId: number
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const { notification } = useNotification()

    const onCancelModal = () => setModal(null)

    const onApprovelClicked = (declaration: string) => {
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
            <div className="w-72 flex flex-col gap-y-1 items-center justify-center mx-auto py-2">
                <div className="h-10 w-full">
                    <Button
                        fullWidth
                        fullHeight
                        onClick={() => {
                            // onChangeStatusClicked(WPApprovalStatus.Approved)
                            onApprovelClicked(declaration)
                        }}
                        text="Approve"
                        variant="success"
                    />
                </div>
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
