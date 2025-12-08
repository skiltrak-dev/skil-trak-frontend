import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@components/ui'
import { ThumbsDown, XCircle } from 'lucide-react'
import { Button, TextArea } from '@components'
export const RejectFileModal = ({
    isOpen,
    setIsOpen,
    selectedItem,
    handleReject,
    result,
}: {
    result: any
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    selectedItem: any
    handleReject: (rejectionReason: string) => void
}) => {
    const [rejectionReason, setRejectionReason] = useState<string>('')
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-red-700">
                        <XCircle className="w-5 h-5" />
                        Reject Document
                        {selectedItem?.type === 'folder' ? 's' : ''}
                    </DialogTitle>
                    <DialogDescription>
                        Please provide a reason for rejecting{' '}
                        {selectedItem?.type === 'folder'
                            ? 'these documents'
                            : 'this document'}
                        .
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <TextArea
                            label={'Rejection Reason'}
                            name="reason"
                            placeholder="e.g., Document quality insufficient, incorrect format, expired..."
                            value={rejectionReason}
                            onChange={(e: any) =>
                                setRejectionReason(e.target.value)
                            }
                            className="mt-2"
                            rows={4}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="action" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="error"
                        onClick={() => handleReject(rejectionReason)}
                        loading={result?.isLoading}
                        disabled={!rejectionReason.trim() || result?.isLoading}
                    >
                        <ThumbsDown className="w-4 h-4 mr-2" />
                        Reject
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
