import { GlobalModal } from '@components/Modal/GlobalModal'
import { Button, Typography } from '@components'
import { TextArea } from '@components/inputs/TextArea'
import { MessageSquare, Info, Plus } from 'lucide-react'
import { MdCancel } from 'react-icons/md'

interface ManualNoteModalProps {
    open: boolean
    onClose: () => void
    note: string
    onNoteChange: (note: string) => void
    onConfirm: () => void
}

export function ManualNoteModal({
    open,
    onClose,
    note,
    onNoteChange,
    onConfirm,
}: ManualNoteModalProps) {
    if (!open) return null

    return (
        <GlobalModal onCancel={onClose} className="sm:max-w-[500px]">
            <div className="p-6">
                <div className="flex items-center justify-between mb-4 pb-4 border-b">
                    <div>
                        <Typography variant="h3" className="text-primaryNew text-xl flex items-center gap-2">
                            <MessageSquare className="h-5 w-5" />
                            Add Manual Note
                        </Typography>
                        <Typography variant="small" className="text-gray-600 mt-1">
                            Add a custom note or observation about this
                            placement
                        </Typography>
                    </div>
                    <MdCancel
                        onClick={onClose}
                        className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90"
                    />
                </div>

                <div className="space-y-4 py-4">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start gap-2">
                            <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                            <Typography variant="small" className="text-blue-900">
                                This note will appear in the Status Check
                                Notes section with a blue "Manual Note"
                                badge.
                            </Typography>
                        </div>
                    </div>
                    <div>
                        <Typography variant="label" className="text-sm font-medium">
                            Note *
                        </Typography>
                        <TextArea
                            name="manualNote"
                            placeholder="Enter your note here..."
                            className="mt-2"
                            rows={6}
                            value={note}
                            onChange={(e: any) =>
                                onNoteChange(e.target.value)
                            }
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t mt-4">
                    <Button
                        variant="secondary"
                        onClick={() => {
                            onClose()
                            onNoteChange('')
                        }}
                        text="Cancel"
                    />
                    <Button
                        variant="primaryNew"
                        onClick={onConfirm}
                        Icon={Plus}
                        text="Add Note"
                    />
                </div>
            </div>
        </GlobalModal>
    )
}

