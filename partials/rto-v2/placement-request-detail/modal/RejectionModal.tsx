import { GlobalModal } from '@components/Modal/GlobalModal'
import { Button } from '@components'
import { TextArea } from '@components/inputs/TextArea'
import { Typography } from '@components/Typography'
import { XCircle } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'

interface RejectionModalProps {
    open: boolean
    onClose: () => void
    reason: string
    onReasonChange: (reason: string) => void
    onConfirm: () => void
}

export function RejectionModal({
    open,
    onClose,
    reason,
    onReasonChange,
    onConfirm,
}: RejectionModalProps) {
    const methods = useForm()

    if (!open) return null

    return (
        <GlobalModal onCancel={onClose} className="max-w-[500px]">
            <FormProvider {...methods}>
                <div className="p-6">
                    {/* Header */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 text-red-400 text-xl font-semibold mb-2">
                            <XCircle className="h-5 w-5" />
                            <Typography variant="h3">
                                Reject Placement
                            </Typography>
                        </div>
                        <Typography variant="small" className="text-gray-600">
                            Please provide a reason for rejection
                        </Typography>
                    </div>

                    {/* Form */}
                    <div className="space-y-4">
                        <div>
                            <Typography variant="label" className="mb-2">
                                Rejection Reason
                            </Typography>
                            <TextArea
                                name="rejectionReason"
                                placeholder="Enter reason for rejecting this placement..."
                                rows={6}
                                value={reason}
                                onChange={(e: any) =>
                                    onReasonChange(e.target.value)
                                }
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                        <Button
                            variant="secondary"
                            onClick={onClose}
                            text="Cancel"
                        />
                        <Button
                            variant="error"
                            onClick={onConfirm}
                            Icon={XCircle}
                            text="Submit Rejection"
                            className="bg-red-400 hover:bg-red-500"
                        />
                    </div>
                </div>
            </FormProvider>
        </GlobalModal>
    )
}
