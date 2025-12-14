import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@components/ui/collapsible'
import { motion } from 'framer-motion'
import { CoursesSection } from './CoursesSection'
import { ESignatureTimeline } from './ESignatureTimeline'
import { SectorHeader } from './SectorHeader'
import { SupervisorsSection } from './SupervisorsSection'
import { Sector } from './types'

interface SectorCardProps {
    sector: Sector
    sectorIndex: number
    isExpanded: boolean
    expandedCourses: number[]
    expandedESignatures: number[]
    onToggleSector: (sectorId: number) => void
    onToggleCourse: (courseId: number) => void
    onToggleESignature: (sectorId: number) => void
    onStartEditingSectorMetrics: (sectorId: number) => void
    onUpdateFacilityChecklistStatus: (
        courseId: number,
        status: 'approved' | 'rejected' | 'pending'
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
}: SectorCardProps) {
    const sectorStudents = sector.courses.reduce(
        (sum, c) => sum + c.students,
        0
    )
    const sectorCapacity = sector.courses.reduce(
        (sum, c) => sum + c.capacity,
        0
    )
    const capacityPercent = Math.round((sectorStudents / sectorCapacity) * 100)

    return (
        <Collapsible
            key={sector.id}
            open={isExpanded}
            onOpenChange={() => onToggleSector(sector.id)}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sectorIndex * 0.1 }}
                className="bg-white rounded-lg border border-[#E2E8F0] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500"
            >
                {/* Sector Header - World-Class Premium Design */}
                <CollapsibleTrigger asChild>
                    <div className="w-full h-auto p-0 hover:bg-transparent transition-all duration-300 group">
                        <div className="w-full flex items-end justify-between gap-2">
                            {/* New World-Class Sector Header */}
                            <div className="flex-1">
                                <SectorHeader
                                    sector={sector}
                                    isExpanded={isExpanded}
                                    sectorStudents={sectorStudents}
                                    sectorCapacity={sectorCapacity}
                                    capacityPercent={capacityPercent}
                                    duration={
                                        sector.courses.length > 0 &&
                                        sector.courses[0].duration
                                            ? sector.courses[0].duration
                                            : undefined
                                    }
                                    expandedESignatures={expandedESignatures}
                                    toggleESignature={onToggleESignature}
                                    startEditingSectorMetrics={
                                        onStartEditingSectorMetrics
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </CollapsibleTrigger>

                {/* Expanded Content - Compact Layout */}
                <CollapsibleContent className="overflow-hidden space-y-4 px-4 pb-4">
                    {/* Expandable E-Signature Timeline */}
                    {sector.eSignature &&
                        expandedESignatures.includes(sector.id) && (
                            <ESignatureTimeline
                                eSignature={sector.eSignature}
                            />
                        )}

                    {/* Supervisors Section - Premium Cards */}
                    <SupervisorsSection supervisors={sector.supervisors} />

                    {/* Courses Section - Premium Cards */}
                    <CoursesSection
                        courses={sector.courses}
                        expandedCourses={expandedCourses}
                        onToggleCourse={onToggleCourse}
                        onUpdateFacilityChecklistStatus={
                            onUpdateFacilityChecklistStatus
                        }
                    />
                </CollapsibleContent>
            </motion.div>
        </Collapsible>
    )
}
