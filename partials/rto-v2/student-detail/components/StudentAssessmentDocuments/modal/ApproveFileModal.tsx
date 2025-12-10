import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@components/ui'
import { CheckCircle, ThumbsUp } from 'lucide-react'
import { Button, TextArea } from '@components'
export const ApproveFileModal = ({
    isOpen,
    setIsOpen,
    selectedItem,
    handleApprove,
    result,
}: {
    result: any
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    selectedItem: any
    handleApprove: (reason: string) => void
}) => {
    const [approvalComment, setApprovalComment] = useState<string>('')
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-emerald-700">
                        <CheckCircle className="w-5 h-5" />
                        Approve Document
                        {selectedItem?.type === 'folder' ? 's' : ''}
                    </DialogTitle>
                    <DialogDescription>
                        Confirm approval of{' '}
                        {selectedItem?.type === 'folder'
                            ? 'all documents in this folder'
                            : 'this document'}
                        .
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <p className="text-sm text-slate-700">
                        Are you sure you want to approve{' '}
                        <span className="font-semibold">
                            {selectedItem?.data?.name}
                        </span>
                        ?
                    </p>
                </div>

                <div>
                    <TextArea
                        label={'Approval Comment'}
                        name="reason"
                        placeholder="e.g., Document quality sufficient, correct format, valid..."
                        value={approvalComment}
                        onChange={(e: any) =>
                            setApprovalComment(e.target.value)
                        }
                        className="mt-2"
                        rows={4}
                    />
                </div>

                <DialogFooter>
                    <Button variant="action" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="success"
                        onClick={() => handleApprove(approvalComment)}
                        loading={result?.isLoading}
                        disabled={result?.isLoading}
                    >
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        Approve
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
