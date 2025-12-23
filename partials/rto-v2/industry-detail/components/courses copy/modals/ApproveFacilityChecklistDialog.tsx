import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@components/ui/dialog'
import { Button } from '@components'
import {
    CheckCircle,
    FileCheck,
    AlertCircle,
    Download,
    Eye,
} from 'lucide-react'
import { Course } from '../types'

interface ApproveFacilityChecklistDialogProps {
    open: boolean
    course: Course | null
    sectorId: number | null | undefined
    onOpenChange: (open: boolean) => void
    onApprove: (courseId: number) => void
    onReject: (courseId: number) => void
}

export function ApproveFacilityChecklistDialog({
    open,
    course,
    sectorId,
    onOpenChange,
    onApprove,
    onReject,
}: ApproveFacilityChecklistDialogProps) {
    if (!course) return null

    const handleApprove = () => {
        onApprove(course.id)
        onOpenChange(false)
    }

    const handleReject = () => {
        onReject(course.id)
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#044866] to-[#0D5468] rounded-xl flex items-center justify-center">
                            <FileCheck className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <DialogTitle className="text-lg">
                                Review Facility Checklist
                            </DialogTitle>
                            <DialogDescription className="text-xs">
                                {course.code} - {course.name}
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Status Banner */}
                    <div className="bg-gradient-to-r from-[#10B981]/10 to-[#059669]/10 border border-[#10B981]/20 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-lg flex items-center justify-center flex-shrink-0">
                                <CheckCircle className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-bold text-[#10B981] mb-1">
                                    Facility Checklist Signed
                                </h4>
                                <p className="text-xs text-[#059669] mb-2">
                                    Industry partner has reviewed and e-signed
                                    the facility checklist on{' '}
                                    {course.facilityChecklistSignedDate ||
                                        'Today'}
                                </p>
                                <p className="text-xs text-[#64748B]">
                                    The document is ready for your review and
                                    approval. Once approved, you'll be prompted
                                    to add supervisor details to complete the
                                    course setup.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Document Preview Section */}
                    <div className="bg-[#F8FAFB] rounded-lg p-4 border border-[#E2E8F0]">
                        <h4 className="text-sm font-bold text-[#1A2332] mb-3">
                            Document Actions
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                            <Button
                                variant="primaryNew"
                                outline
                                className="justify-start gap-2 text-xs h-9"
                            >
                                <Eye className="w-4 h-4" />
                                View Document
                            </Button>
                            <Button
                                variant="primaryNew"
                                outline
                                className="justify-start gap-2 text-xs h-9"
                            >
                                <Download className="w-4 h-4" />
                                Download PDF
                            </Button>
                        </div>
                    </div>

                    {/* Warning Notice */}
                    <div className="bg-[#FEF3C7] border border-[#F59E0B]/30 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-xs text-[#92400E] font-medium mb-1">
                                    Important Notice
                                </p>
                                <p className="text-xs text-[#92400E]">
                                    By approving this facility checklist, you
                                    confirm that the industry partner's
                                    workplace meets all requirements for student
                                    placements in this course.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 pt-2">
                        <Button
                            onClick={handleApprove}
                            className="flex-1 bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white gap-2 h-10"
                        >
                            <CheckCircle className="w-4 h-4" />
                            Approve Checklist
                        </Button>
                        <Button
                            onClick={handleReject}
                            variant="error"
                            className="flex-1 border-[#EF4444]/30 text-[#EF4444] hover:bg-[#EF4444]/10 gap-2 h-10"
                        >
                            <AlertCircle className="w-4 h-4" />
                            Reject & Request Changes
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
