import { Settings, MapPin, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { Course } from './types'

interface CourseProgramsServicesProps {
    course: Course
}

export function CourseProgramsServices({
    course,
}: CourseProgramsServicesProps) {
    if (
        !course.programsAndServices &&
        !course.branchesAndLocations &&
        !course.activities &&
        !course.eligibilityNotes
    ) {
        return null
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-sm"
        >
            <h6 className="text-sm font-bold text-[#044866] mb-4 flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#E8F4F8] to-[#D1E7F0] flex items-center justify-center">
                    <Settings className="w-3.5 h-3.5 text-[#044866]" />
                </div>
                Programs and Services Offered
            </h6>

            <div className="space-y-4">
                {/* Main Programs and Services */}
                {course.programsAndServices && (
                    <div>
                        <p className="text-sm text-[#64748B] leading-relaxed">
                            {course.programsAndServices}
                        </p>
                    </div>
                )}

                {/* Branches and Locations */}
                {course.branchesAndLocations && (
                    <div className="pt-4 border-t border-[#E2E8F0]">
                        <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-4 h-4 text-[#044866]" />
                            <h6 className="text-sm font-bold text-[#1A2332]">
                                Branches & Site Locations
                            </h6>
                        </div>
                        <p className="text-sm text-[#64748B] leading-relaxed">
                            {course.branchesAndLocations}
                        </p>
                    </div>
                )}

                {/* Activities */}
                {course.activities && (
                    <div className="pt-4 border-t border-[#E2E8F0]">
                        <h6 className="text-sm font-bold text-[#1A2332] mb-3">
                            Activities
                        </h6>
                        <div className="space-y-3">
                            {course.activities.map((activity, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="flex items-start gap-3"
                                >
                                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#D1FAE5] to-[#A7F3D0] flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <CheckCircle className="w-4 h-4 text-[#10B981]" />
                                    </div>
                                    <p className="text-sm text-[#64748B] leading-relaxed flex-1">
                                        {activity}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Eligibility Notes */}
                {course.eligibilityNotes && (
                    <div className="pt-4 border-t border-[#E2E8F0]">
                        <h6 className="text-sm font-bold text-[#1A2332] mb-2">
                            Eligibility Notes / Justification for {course.code}
                        </h6>
                        <p className="text-sm text-[#64748B] leading-relaxed">
                            {course.eligibilityNotes}
                        </p>
                    </div>
                )}
            </div>
        </motion.div>
    )
}
