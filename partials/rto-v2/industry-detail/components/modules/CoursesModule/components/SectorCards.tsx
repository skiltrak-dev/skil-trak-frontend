import { Badge } from '@components'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@components/ui/collapsible'
import { motion } from 'framer-motion'
import { BookOpen, ChevronDown, User } from 'lucide-react'
import {
    CourseDurationCard,
    SectorCapacityCard,
    StudentCountCard,
} from '../cards'
import { CoursesAndPrograms } from './CoursesAndPrograms'
import { SectorFacilityChecklist } from './SectorFacilityChecklist'
import { SectorTitle } from './SectorTitle'
import { Supervisors } from './Supervisors'

export const SectorCards = ({
    sector,
    isExpanded,
    toggleSector,
    sectorIndex,

    startEditingSectorMetrics,
    expandedCourses,
    toggleCourse,
}: {
    toggleCourse: (id: number) => void
    expandedCourses: number[]
    startEditingSectorMetrics: (id: number) => void
    sector: any
    isExpanded: boolean
    toggleSector: (id: number) => void
    sectorIndex: number
}) => {
    const sectorStudents = sector.courses.reduce(
        (sum: number, c: any) => sum + c.students,
        0
    )
    const sectorCapacity = sector.courses.reduce(
        (sum: number, c: any) => sum + c.capacity,
        0
    )
    const capacityPercent = Math.round((sectorStudents / sectorCapacity) * 100)
    return (
        <Collapsible
            open={isExpanded}
            onOpenChange={() => toggleSector(sector.id)}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sectorIndex * 0.1 }}
                className="w-full bg-white rounded-lg border border-[#E2E8F0] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500"
            >
                {/* Sector Header - Premium Design */}
                <CollapsibleTrigger asChild className="w-full">
                    <div className="w-full h-auto p-3 hover:bg-gradient-to-br hover:from-[#FAFBFC] hover:to-white transition-all duration-300 group">
                        <div className="flex items-start justify-between gap-3 w-full">
                            {/* Left Section - Icon & Title */}
                            <div className="flex items-start gap-2.5 flex-1 min-w-0">
                                {/* Premium Icon with Glow Effect */}
                                <motion.div
                                    whileHover={{
                                        scale: 1.05,
                                        rotate: 5,
                                    }}
                                    className="relative"
                                >
                                    <div
                                        className={`absolute inset-0 rounded-lg bg-gradient-to-br ${sector.color} blur-md opacity-30`}
                                    ></div>
                                    <div
                                        className={`relative w-10 h-10 rounded-lg bg-gradient-to-br ${sector.color} flex items-center justify-center text-xl shadow-lg overflow-hidden`}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                                        <span className="relative z-10 filter drop-shadow-lg">
                                            {sector.icon}
                                        </span>
                                    </div>
                                </motion.div>

                                {/* Title & Meta */}
                                <div className="flex-1 min-w-0 space-y-2">
                                    {/* Title Row */}
                                    <div>
                                        <SectorTitle sector={sector} />

                                        <div className="flex items-center gap-1.5">
                                            <Badge
                                                Icon={BookOpen}
                                                variant="primaryNew"
                                                text={`${sector.courses.length} courses`}
                                            />
                                            <Badge
                                                Icon={User}
                                                variant="primaryNew"
                                                text={`${sector.supervisors.length} supervisors`}
                                            />
                                        </div>
                                    </div>

                                    {/* Premium Stats Cards - Editable */}
                                    <div className="grid grid-cols-4 gap-2 w-full">
                                        {/* Students Card */}
                                        <StudentCountCard
                                            sectorStudents={sectorStudents}
                                            sectorCapacity={sectorCapacity}
                                        />
                                        {/* Duration Card */}
                                        {sector.courses.length > 0 &&
                                            sector.courses[0].duration && (
                                                <CourseDurationCard
                                                    sector={sector}
                                                />
                                            )}
                                        {/* Capacity Card */}
                                        <SectorCapacityCard
                                            capacityPercent={capacityPercent}
                                            startEditingSectorMetrics={
                                                startEditingSectorMetrics
                                            }
                                            sector={sector}
                                        />

                                        {/*  */}
                                        <SectorFacilityChecklist
                                            sector={sector}
                                        />
                                    </div>
                                    {/* Expandable E-Signature Timeline */}
                                </div>
                            </div>

                            {/* Right Section - Expand Button */}
                            <div className="flex items-start pt-2">
                                <motion.div
                                    animate={{
                                        rotate: isExpanded ? 180 : 0,
                                    }}
                                    transition={{
                                        duration: 0.3,
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg ${
                                        isExpanded
                                            ? 'bg-gradient-to-br from-[#044866] to-[#0D5468] text-white shadow-[#044866]/30'
                                            : 'bg-white text-[#64748B] group-hover:bg-gradient-to-br group-hover:from-[#F8FAFB] group-hover:to-[#E8F4F8] group-hover:text-[#044866] border border-[#E2E8F0]'
                                    }`}
                                >
                                    <ChevronDown className="w-5 h-5" />
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </CollapsibleTrigger>

                {/* Expanded Content - Premium Layout */}
                <CollapsibleContent className="overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="px-4 pb-4 space-y-4 border-t border-[#E2E8F0] bg-gradient-to-b from-[#FAFBFC] to-white">
                            {/* Supervisors Section - Premium Cards */}
                            <Supervisors sector={sector} />

                            {/* Courses Section - Premium Cards */}
                            <CoursesAndPrograms
                                sector={sector}
                                expandedCourses={expandedCourses}
                                toggleCourse={toggleCourse}
                            />
                        </div>
                    </motion.div>
                </CollapsibleContent>
            </motion.div>
        </Collapsible>
    )
}
