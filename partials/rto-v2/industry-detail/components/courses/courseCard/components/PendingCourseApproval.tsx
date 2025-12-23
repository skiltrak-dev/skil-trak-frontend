import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, FileCheck } from 'lucide-react'
import { IndustryCourseApproval } from '@types'
import moment from 'moment'
import { Button } from '@components'
import { cn } from '@utils'
import { ApproveFacilityChecklistDialog } from '../../modals/ApproveFacilityChecklistDialog'

export const PendingCourseApproval = ({
    approval,
}: {
    approval: IndustryCourseApproval
}) => {
    const [reviewFacilityChecklist, setReviewFacilityChecklist] =
        useState(false)

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-[#F7A619]/10 to-[#EA580C]/10 border border-[#F7A619]/30 rounded-lg p-3"
            >
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#F7A619] to-[#EA580C] rounded-lg flex items-center justify-center">
                            <AlertCircle className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-[#1A2332]">
                                {approval?.file
                                    ? 'Facility Checklist Ready for Review'
                                    : 'Waiting for Industry Checklist to upload'}
                            </p>
                            <p className="text-[10px] text-[#64748B]">
                                Industry partner signed on{' '}
                                {moment(approval?.createdAt).fromNow()}
                            </p>
                        </div>
                    </div>
                    <Button
                        onClick={() => setReviewFacilityChecklist(true)}
                        disabled={!approval?.file}
                        className={cn({
                            '"bg-gradient-to-r from-[#F7A619] to-[#EA580C] hover:from-[#EA580C] hover:to-[#D97706] text-white text-xs h-9 px-4 gap-2 shadow-lg shadow-[#F7A619]/30"':
                                approval?.file,
                        })}
                    >
                        <FileCheck className="w-3.5 h-3.5" />
                        Review & Approve
                    </Button>
                </div>
            </motion.div>

            <ApproveFacilityChecklistDialog
                open={reviewFacilityChecklist}
                approval={approval}
                onOpenChange={setReviewFacilityChecklist}
            />
        </>
    )
}
