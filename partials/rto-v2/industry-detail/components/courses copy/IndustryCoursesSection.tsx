import { useState } from 'react'
import { sectors as initialSectors } from '../courses/data'
import { CoursesHeaderSection } from '../courses/header/CoursesHeaderSection'
import { AddSupervisorDialog } from '../courses/modals/AddSupervisorDialog'
import { EditCourseCapacityDialog } from '../courses/modals/EditCourseCapacityDialog'
import { EditSectorMetricsDialog } from '../courses/modals/EditSectorMetricsDialog'
import { SectorCard } from '../courses/SectorCard'
import { Course, Sector, Supervisor } from '../courses/types'

export function IndustryCoursesSection() {
    const [expandedSectors, setExpandedSectors] = useState<number[]>([1])
    const [expandedCourses, setExpandedCourses] = useState<number[]>([])
    const [expandedESignatures, setExpandedESignatures] = useState<number[]>([])
    const [coursesData, setCoursesData] = useState<Sector[]>(initialSectors)
    const [searchQuery, setSearchQuery] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [editingSector, setEditingSector] = useState<Sector | null>(null)
    const [editingCourse, setEditingCourse] = useState<Course | null>(null)
    const [approvingCourse, setApprovingCourse] = useState<{
        course: Course
        sectorId: number
    } | null>(null)
    const [addingSupervisorFor, setAddingSupervisorFor] = useState<{
        course: Course
        sectorId: number
    } | null>(null)

    const toggleSector = (sectorId: number) => {
        if (expandedSectors.includes(sectorId)) {
            setExpandedSectors(expandedSectors.filter((id) => id !== sectorId))
        } else {
            setExpandedSectors([...expandedSectors, sectorId])
        }
    }

    const toggleCourse = (courseId: number) => {
        if (expandedCourses.includes(courseId)) {
            setExpandedCourses(expandedCourses.filter((id) => id !== courseId))
        } else {
            setExpandedCourses([...expandedCourses, courseId])
        }
    }

    const toggleESignature = (sectorId: number) => {
        if (expandedESignatures.includes(sectorId)) {
            setExpandedESignatures(
                expandedESignatures.filter((id) => id !== sectorId)
            )
        } else {
            setExpandedESignatures([...expandedESignatures, sectorId])
        }
    }

    const startEditingSectorMetrics = (sectorId: number) => {
        const sector = coursesData.find((s) => s.id === sectorId)
        if (sector) {
            setEditingSector(sector)
        }
    }

    const saveSectorMetrics = (
        sectorId: number,
        values: { students: number; capacity: number; duration: string }
    ) => {
        const updatedCoursesData = coursesData.map((sector) => {
            if (sector.id === sectorId) {
                // Update the capacity for all courses proportionally
                const totalCurrentCapacity = sector.courses.reduce(
                    (sum, c) => sum + c.capacity,
                    0
                )
                const totalCurrentStudents = sector.courses.reduce(
                    (sum, c) => sum + c.students,
                    0
                )
                const capacityRatio =
                    totalCurrentCapacity > 0
                        ? values.capacity / totalCurrentCapacity
                        : 1
                const studentsRatio =
                    totalCurrentStudents > 0
                        ? values.students / totalCurrentStudents
                        : 1

                return {
                    ...sector,
                    courses: sector.courses.map((course, idx) => ({
                        ...course,
                        students:
                            idx === 0
                                ? values.students
                                : Math.round(course.students * studentsRatio),
                        capacity:
                            idx === 0
                                ? values.capacity
                                : Math.round(course.capacity * capacityRatio),
                        duration: values.duration,
                    })),
                }
            }
            return sector
        })
        setCoursesData(updatedCoursesData)
    }

    const startEditingCourseCapacity = (courseId: number) => {
        const course = coursesData
            .flatMap((s) => s.courses)
            .find((c) => c.id === courseId)
        if (course) {
            setEditingCourse(course)
        }
    }

    const saveCourseCapacity = (
        courseId: number,
        values: { students: number; capacity: number }
    ) => {
        const updatedCoursesData = coursesData.map((sector) => ({
            ...sector,
            courses: sector.courses.map((course) => {
                if (course.id === courseId) {
                    return {
                        ...course,
                        students: values.students,
                        capacity: values.capacity,
                    }
                }
                return course
            }),
        }))
        setCoursesData(updatedCoursesData)
    }

    const updateFacilityChecklistStatus = (
        courseId: number,
        status: 'approved' | 'rejected' | 'pending'
    ) => {
        const updatedCoursesData = coursesData.map((sector) => ({
            ...sector,
            courses: sector.courses.map((course) => {
                if (course.id === courseId) {
                    return {
                        ...course,
                        facilityChecklistStatus: status,
                    }
                }
                return course
            }),
        }))
        setCoursesData(updatedCoursesData)
    }

    const confirmTask = (
        courseId: number,
        taskId: number,
        method: 'industry' | 'sourcing' | 'direct'
    ) => {
        const updatedCoursesData = coursesData.map((sector) => ({
            ...sector,
            courses: sector.courses.map((course) => {
                if (course.id === courseId && course.highlightedTasks) {
                    return {
                        ...course,
                        highlightedTasks: course.highlightedTasks.map(
                            (task) => {
                                if (task.id === taskId) {
                                    return {
                                        ...task,
                                        confirmed: true,
                                        confirmedBy:
                                            method === 'industry'
                                                ? 'Industry Partner'
                                                : method === 'sourcing'
                                                ? 'Sourcing Team'
                                                : 'Workplace',
                                        confirmedAt:
                                            new Date().toLocaleDateString(
                                                'en-US',
                                                {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                }
                                            ),
                                    }
                                }
                                return task
                            }
                        ),
                    }
                }
                return course
            }),
        }))
        setCoursesData(updatedCoursesData)
    }

    // Start approval workflow for facility checklist
    const startApprovingFacilityChecklist = (
        courseId: number,
        sectorId: number
    ) => {
        const course = coursesData
            .flatMap((s) => s.courses)
            .find((c) => c.id === courseId)
        if (course) {
            setApprovingCourse({ course, sectorId })
        }
    }

    // Approve facility checklist and trigger supervisor addition
    const approveFacilityChecklist = (courseId: number) => {
        const today = new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        })

        const updatedCoursesData = coursesData.map((sector) => ({
            ...sector,
            courses: sector.courses.map((course) => {
                if (course.id === courseId) {
                    return {
                        ...course,
                        facilityChecklistStatus: 'approved' as const,
                        facilityChecklistApprovedDate: today,
                        facilityChecklistApprovedBy: 'You (RTO Administrator)',
                    }
                }
                return course
            }),
        }))

        setCoursesData(updatedCoursesData)

        // Find the course and trigger supervisor modal
        const course = updatedCoursesData
            .flatMap((s) => s.courses)
            .find((c) => c.id === courseId)
        const sectorId = updatedCoursesData.find((s) =>
            s.courses.some((c) => c.id === courseId)
        )?.id

        if (course && sectorId) {
            setTimeout(() => {
                setAddingSupervisorFor({ course, sectorId })
            }, 300)
        }
    }

    // Reject facility checklist
    const rejectFacilityChecklist = (courseId: number) => {
        const updatedCoursesData = coursesData.map((sector) => ({
            ...sector,
            courses: sector.courses.map((course) => {
                if (course.id === courseId) {
                    return {
                        ...course,
                        facilityChecklistStatus: 'rejected' as const,
                    }
                }
                return course
            }),
        }))
        setCoursesData(updatedCoursesData)
    }

    // Add supervisor and complete course approval
    const addSupervisor = (
        courseId: number,
        sectorId: number,
        supervisor: Supervisor
    ) => {
        const updatedCoursesData = coursesData.map((sector) => {
            if (sector.id === sectorId) {
                return {
                    ...sector,
                    supervisors: [...sector.supervisors, supervisor],
                    courses: sector.courses.map((course) => {
                        if (course.id === courseId) {
                            return {
                                ...course,
                                supervisorAdded: true,
                                courseApprovalStatus: 'approved' as const,
                            }
                        }
                        return course
                    }),
                }
            }
            return sector
        })
        setCoursesData(updatedCoursesData)
    }

    // Calculate overall statistics
    const totalCourses = coursesData.reduce(
        (sum, s) => sum + s.courses.length,
        0
    )
    const totalStudents = coursesData.reduce(
        (sum, s) => s.courses.reduce((cSum, c) => cSum + c.students, 0) + sum,
        0
    )
    const totalCapacity = coursesData.reduce(
        (sum, s) => s.courses.reduce((cSum, c) => cSum + c.capacity, 0) + sum,
        0
    )
    const overallCapacity = Math.round((totalStudents / totalCapacity) * 100)

    return (
        <div className="space-y-5">
            {/* Premium Header Section */}
            <CoursesHeaderSection
                showSearch={showSearch}
                searchQuery={searchQuery}
                totalCourses={totalCourses}
                totalStudents={totalStudents}
                totalCapacity={totalCapacity}
                overallCapacity={overallCapacity}
                onToggleSearch={() => setShowSearch(!showSearch)}
                onSearchChange={setSearchQuery}
            />

            {/* Sector Cards - Enhanced Design */}
            <div className="space-y-3">
                {coursesData.map((sector, sectorIndex) => {
                    const isExpanded = expandedSectors.includes(sector.id)

                    return (
                        <SectorCard
                            key={sector.id}
                            sector={sector}
                            sectorIndex={sectorIndex}
                            isExpanded={isExpanded}
                            expandedCourses={expandedCourses}
                            expandedESignatures={expandedESignatures}
                            onToggleSector={toggleSector}
                            onToggleCourse={toggleCourse}
                            onToggleESignature={toggleESignature}
                            onStartEditingSectorMetrics={
                                startEditingSectorMetrics
                            }
                            onUpdateFacilityChecklistStatus={
                                updateFacilityChecklistStatus
                            }
                            onConfirmTask={confirmTask}
                            onStartApprovingFacilityChecklist={
                                startApprovingFacilityChecklist
                            }
                        />
                    )
                })}
            </div>

            {/* Edit Dialogs */}
            <EditSectorMetricsDialog
                open={editingSector !== null}
                sector={editingSector}
                onOpenChange={(open) => !open && setEditingSector(null)}
                onSave={saveSectorMetrics}
            />

            <EditCourseCapacityDialog
                open={editingCourse !== null}
                course={editingCourse}
                onOpenChange={(open) => !open && setEditingCourse(null)}
                onSave={saveCourseCapacity}
            />

            <AddSupervisorDialog
                open={addingSupervisorFor !== null}
                course={addingSupervisorFor?.course || null}
                sectorId={addingSupervisorFor?.sectorId || null}
                onOpenChange={(open) => !open && setAddingSupervisorFor(null)}
                onAddSupervisor={addSupervisor}
            />
        </div>
    )
}
