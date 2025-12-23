import { Button } from '@components/ui/button'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@components/ui/collapsible'
import { motion } from 'framer-motion'
import { ESignatureTimeline } from './ESignatureTimeline'
import { IndustrySectorGroup } from './hooks'
import { SectorHeader } from './SectorHeader'

interface SectorCardProps {
    sectorIndex: number
    isExpanded: boolean
    expandedCourses: number[]
    sector: IndustrySectorGroup
    expandedESignatures: number[]
    onToggleSector: (sectorId: number) => void
    onToggleCourse: (courseId: number) => void
    onToggleESignature: (sectorId: number) => void
    onStartEditingSectorMetrics: (sectorId: number) => void
    onUpdateFacilityChecklistStatus: (
        courseId: number,
        status: 'approved' | 'rejected' | 'pending'
    ) => void
    onConfirmTask?: (
        courseId: number,
        taskId: number,
        method: 'industry' | 'sourcing' | 'direct'
    ) => void
}

export function SectorCard({
    sector,
    sectorIndex,
    isExpanded,
    expandedCourses,
    expandedESignatures,
    onToggleSector,
    onToggleCourse,
    onToggleESignature,
    onStartEditingSectorMetrics,
    onUpdateFacilityChecklistStatus,
    onConfirmTask,
}: SectorCardProps) {
    const sectorStudents = 11
    const sectorCapacity = 11
    const capacityPercent = Math.round((sectorStudents / sectorCapacity) * 100)

    console.log({ isExpandedisExpanded: isExpanded })

    return (
        <Collapsible
            open={isExpanded}
            key={sector?.sector?.id}
            onOpenChange={() => onToggleSector(sector?.sector?.id)}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sectorIndex * 0.1 }}
                className="bg-white rounded-lg border border-[#E2E8F0] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500"
            >
                {/* Sector Header - World-Class Premium Design */}
                <CollapsibleTrigger asChild>
                    <Button
                        variant="ghost"
                        className="w-full h-auto p-0 hover:bg-transparent transition-all duration-300 group"
                    >
                        <div className="w-full flex items-end justify-between gap-2">
                            {/* New World-Class Sector Header */}
                            <div className="flex-1">
                                <SectorHeader
                                    sector={sector}
                                    isExpanded={isExpanded}
                                    sectorStudents={sectorStudents}
                                    sectorCapacity={sectorCapacity}
                                    capacityPercent={capacityPercent}
                                    duration={111 + ''}
                                    expandedESignatures={expandedESignatures}
                                    toggleESignature={onToggleESignature}
                                    startEditingSectorMetrics={
                                        onStartEditingSectorMetrics
                                    }
                                />
                            </div>
                        </div>
                    </Button>
                </CollapsibleTrigger>

                {/* Expanded Content - Compact Layout */}
                <CollapsibleContent className="overflow-hidden">
                    {/* Expandable E-Signature Timeline */}
                    {expandedESignatures.includes(sector?.sector?.id) && (
                        <ESignatureTimeline
                            eSignature={{
                                status: 'approved',
                                sentDate: '2024-11-15',
                                sentBy: 'Jessica Williams - Program Coordinator',
                                signedDate: '2024-11-18',
                                signedBy: 'Sarah Mitchell - Clinical Manager',
                                approvedDate: '2024-11-20',
                                approvedBy:
                                    'Dr. Robert Chen - Head of Department',
                                documentUrl:
                                    '/documents/facility-checklist-health-services.pdf',
                            }}
                        />
                    )}

                    {/* Supervisors Section - Premium Cards */}
                    {/* <SupervisorsSection supervisors={sector.supervisors} /> */}

                    {/* Courses Section - Premium Cards */}
                    {/* <CoursesSection
                        courses={sector?.approvalCourses}
                        expandedCourses={expandedCourses}
                        onToggleCourse={onToggleCourse}
                        onUpdateFacilityChecklistStatus={
                            onUpdateFacilityChecklistStatus
                        }
                        onConfirmTask={onConfirmTask}
                    /> */}
                </CollapsibleContent>
            </motion.div>
        </Collapsible>
    )
}
