import { useState } from 'react'
import { sectors as initialSectors } from '../courses/data'
import { Sector, Course } from '../courses/types'
import { CoursesHeaderSection } from '../courses/header/CoursesHeaderSection'
import { SectorCard } from '../courses/SectorCard'
import { EditSectorMetricsDialog } from '../courses/modals/EditSectorMetricsDialog'
import { EditCourseCapacityDialog } from '../courses/modals/EditCourseCapacityDialog'

export function IndustryCourses() {
    const [expandedSectors, setExpandedSectors] = useState<number[]>([1])
    const [expandedCourses, setExpandedCourses] = useState<number[]>([])
    const [expandedESignatures, setExpandedESignatures] = useState<number[]>([])
    const [coursesData, setCoursesData] = useState<Sector[]>(initialSectors)
    const [searchQuery, setSearchQuery] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [editingSector, setEditingSector] = useState<Sector | null>(null)
    const [editingCourse, setEditingCourse] = useState<Course | null>(null)

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
        </div>
    )
}
