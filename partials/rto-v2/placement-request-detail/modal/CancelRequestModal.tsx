import { GlobalModal } from '@components/Modal/GlobalModal'
import { Button, Typography } from '@components'
import { TextArea } from '@components/inputs/TextArea'
import { XCircle, AlertCircle } from 'lucide-react'
import { MdCancel } from 'react-icons/md'

interface CancelRequestModalProps {
    open: boolean
    onClose: () => void
    cancellationReason: string
    onCancellationReasonChange: (reason: string) => void
    onConfirm: () => void
}

export function CancelRequestModal({
    open,
    onClose,
    cancellationReason,
    onCancellationReasonChange,
    onConfirm,
}: CancelRequestModalProps) {
    if (!open) return null

    return (
        <GlobalModal onCancel={onClose} className="sm:max-w-[500px]">
            <div className="p-6">
                <div className="flex items-center justify-between mb-4 pb-4 border-b">
                    <div>
                        <Typography variant="h3" className="text-red-400 text-xl flex items-center gap-2">
                            <XCircle className="h-5 w-5" />
                            Cancel Placement Request
                        </Typography>
                        <Typography variant="small" className="text-gray-600 mt-1">
                            This action will cancel the placement request.
                            Please provide a reason for cancellation.
                        </Typography>
                    </div>
                    <MdCancel
                        onClick={onClose}
                        className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90"
                    />
                </div>

                <div className="space-y-4 py-4">
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                        <div className="flex items-start gap-2">
                            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                            <div>
                                <Typography variant="label" className="text-amber-900 font-medium text-sm">
                                    Warning
                                </Typography>
                                <Typography variant="small" className="text-amber-700 mt-1">
                                    Once cancelled, this placement request
                                    cannot be reactivated. All workflow
                                    actions will be disabled.
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Typography variant="label" className="text-sm font-medium">
                            Reason for Cancellation *
                        </Typography>
                        <TextArea
                            name="cancellationReason"
                            placeholder="e.g., Student withdrew from course, industry declined placement, student found alternative placement..."
                            className="mt-2"
                            rows={5}
                            value={cancellationReason}
                            onChange={(e: any) =>
                                onCancellationReasonChange(e.target.value)
                            }
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t mt-4">
                    <Button
                        variant="secondary"
                        onClick={() => {
                            onClose()
                            onCancellationReasonChange('')
                        }}
                        text="Keep Request"
                    />
                    <Button
                        variant="error"
                        onClick={onConfirm}
                        Icon={XCircle}
                        text="Confirm Cancellation"
                    />
                </div>
            </div>
        </GlobalModal>
    )
}

