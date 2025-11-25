import { GlobalModal } from '@components/Modal/GlobalModal'
import { Button } from '@components'
import { TextArea } from '@components/inputs/TextArea'
import { Typography } from '@components/Typography'
import {
    ClipboardCheck,
    MessageSquare,
    AlertCircle,
    ArrowLeft,
    CheckCircle2,
} from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'

interface StatusNotesModalProps {
    open: boolean
    onClose: () => void
    currentStatus: string
    pendingStatus: string
    note: string
    onNoteChange: (note: string) => void
    onConfirm: () => void
}

export function StatusNotesModal({
    open,
    onClose,
    currentStatus,
    pendingStatus,
    note,
    onNoteChange,
    onConfirm,
}: StatusNotesModalProps) {
    const methods = useForm()

    if (!open) return null

    return (
        <GlobalModal onCancel={onClose} className="max-w-[600px]">
            <FormProvider {...methods}>
                <div className="p-6">
                    {/* Header */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 text-primaryNew text-xl font-semibold mb-2">
                            <ClipboardCheck className="h-6 w-6" />
                            <Typography variant="h3">
                                Status Change: Add Check Notes
                            </Typography>
                        </div>
                        <Typography variant="small" className="text-gray-600">
                            Document this status change with important notes and
                            observations
                        </Typography>
                    </div>

                    {/* Status Change Display */}
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border border-primaryNew/20 rounded-xl mb-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-primaryNew font-medium">
                                    Current Status
                                </p>
                                <p className="text-primaryNew font-semibold">
                                    {currentStatus}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <ArrowLeft className="h-6 w-6 text-orange-500 rotate-180" />
                            </div>
                            <div>
                                <p className="text-sm text-primaryNew font-medium">
                                    New Status
                                </p>
                                <p className="text-primaryNew font-semibold">
                                    {pendingStatus}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="space-y-5">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <MessageSquare className="h-4 w-4" />
                                <Typography variant="label">
                                    Status Check Notes *
                                </Typography>
                            </div>
                            <TextArea
                                name="statusNote"
                                placeholder={`Add detailed notes about this status change... 

Examples:
• Why is this status changing?
• What actions were taken?
• Any important observations or decisions?
• Next steps or follow-ups required?`}
                                rows={7}
                                value={note}
                                onChange={(e: any) =>
                                    onNoteChange(e.target.value)
                                }
                            />
                            <p className="text-xs text-gray-500 mt-2">
                                These notes will be logged with timestamp and
                                user information
                            </p>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-orange-500/30 rounded-xl">
                            <AlertCircle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-amber-900">
                                <strong>Required:</strong> Status check notes
                                are mandatory for compliance and audit purposes.
                            </p>
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
                            variant="primaryNew"
                            onClick={onConfirm}
                            disabled={!note.trim()}
                            Icon={CheckCircle2}
                            text="Confirm Status Change"
                        />
                    </div>
                </div>
            </FormProvider>
        </GlobalModal>
    )
}
