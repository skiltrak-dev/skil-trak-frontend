import { Button, ShowErrorNotifications } from '@components'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@components/ui/dialog'
import { useNotification } from '@hooks'
import { RtoV2Api } from '@redux'
import { IndustryCourseApproval } from '@types'
import { AlertCircle, CheckCircle, FileCheck } from 'lucide-react'
import moment from 'moment'
import { FacilityChecklistActions } from '../FacilityChecklistActions'
import { AddSupervisorDialog } from './AddSupervisorDialog'
import { useState } from 'react'
import { useAppSelector } from '@redux/hooks'
import { ViewDocumentModal } from './ViewDocumentModal'

interface ApproveFacilityChecklistDialogProps {
    open: boolean
    approval: IndustryCourseApproval
    onOpenChange: (open: boolean) => void
}

export function ApproveFacilityChecklistDialog({
    open,
    approval,
    onOpenChange,
}: ApproveFacilityChecklistDialogProps) {
    const [addingSupervisorFor, setAddingSupervisorFor] = useState(false)

    const { notification } = useNotification()

    const industrySupervisors = useAppSelector(
        (state) =>
            state.industry.industrySupervisors?.[approval?.course?.sector?.id]
    )?.length

    const [changeCourseApprovalStatus, changeCourseApprovalStatusResult] =
        RtoV2Api.Industries.statusChangeCourseFacilityChecklist()

    const approveCourse = async () => {
        const res: any = await changeCourseApprovalStatus({
            id: approval.id,
            status: 'approved',
        })
        if (res?.data) {
            notification.success({
                title: 'Status Changed',
                description: 'Status Changed Successfully!',
            })
            onOpenChange(false)
        }
    }

    const handleApprove = async () => {
        if (!industrySupervisors) {
            setAddingSupervisorFor(true)
            onOpenChange(false)
            return
        }
        await approveCourse()
    }

    const handleReject = async () => {
        const res: any = await changeCourseApprovalStatus({
            id: approval.id,
            status: 'rejected',
        })
        if (res?.data) {
            notification.success({
                title: 'Status Changed',
                description: 'Status Changed Successfully to Rejected!',
            })
            onOpenChange(false)
        }
    }

    return (
        <>
            <ShowErrorNotifications result={changeCourseApprovalStatusResult} />
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
                                    {approval.course.code} -{' '}
                                    {approval.course.title}
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
                                        Industry partner has reviewed and
                                        e-signed the facility checklist on{' '}
                                        {moment(approval.createdAt).fromNow()}
                                    </p>
                                    <p className="text-xs text-[#64748B]">
                                        The document is ready for your review
                                        and approval. Once approved, you'll be
                                        prompted to add supervisor details to
                                        complete the course setup.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Document Preview Section */}
                        <div className="bg-[#F8FAFB] rounded-lg p-4 border border-[#E2E8F0]">
                            <h4 className="text-sm font-bold text-[#1A2332] mb-3">
                                Document Actions
                            </h4>
                            <FacilityChecklistActions
                                fileUrl={approval?.file}
                            />
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
                                        By approving this facility checklist,
                                        you confirm that the industry partner's
                                        workplace meets all requirements for
                                        student placements in this course.
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

            {!open && (
                <AddSupervisorDialog
                    course={approval?.course}
                    open={addingSupervisorFor}
                    onOpenChange={setAddingSupervisorFor}
                    onSuccess={() => {
                        approveCourse()
                        setAddingSupervisorFor(false)
                    }}
                    sectorId={approval?.course?.sector?.id || null}
                />
            )}
        </>
    )
}
