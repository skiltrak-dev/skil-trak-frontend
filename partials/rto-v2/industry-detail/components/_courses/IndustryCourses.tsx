import { useState } from 'react'
import { sectors as initialSectors } from '../courses/data'
import { CoursesHeaderSection } from '../courses/header/CoursesHeaderSection'
import { EditCourseCapacityDialog } from '../courses/modals/EditCourseCapacityDialog'
import { EditSectorMetricsDialog } from '../courses/modals/EditSectorMetricsDialog'
import { SectorCard } from '../courses/SectorCard'
import { Course, Sector } from '@types'
import { RtoV2Api } from '@redux'
import { useAppSelector } from '@redux/hooks'
import { IndustrySectorGroup, useCoursesData } from './hooks'

export function IndustryCourses() {
    const industry = useAppSelector((state) => state.industry.industryDetail)

    const coursesDetails = RtoV2Api.Industries.industryCoursesDetails(
        {
            userId: industry?.user?.id,
        },
        {
            skip: !industry?.user?.id,
        }
    )

    const { groupBySector } = useCoursesData()

    const restructuredData = groupBySector(coursesDetails?.data || [])

    const [expandedSectors, setExpandedSectors] = useState<number[]>([1])
    const [expandedCourses, setExpandedCourses] = useState<number[]>([])
    const [expandedESignatures, setExpandedESignatures] = useState<number[]>([])
    const [coursesData, setCoursesData] = useState<Sector[]>(initialSectors)
    const [searchQuery, setSearchQuery] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [editingSector, setEditingSector] =
        useState<IndustrySectorGroup | null>(null)
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

    const saveSectorMetrics = (
        sectorId: number,
        values: { students: number; capacity: number; duration: string }
    ) => {}

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
                {restructuredData?.map((sector, sectorIndex) => {
                    const isExpanded = expandedSectors.includes(
                        sector?.sector?.id
                    )

                    return (
                        <SectorCard
                            sector={sector}
                            isExpanded={isExpanded}
                            key={sector?.sector?.id}
                            sectorIndex={sectorIndex}
                            expandedCourses={expandedCourses}
                            onToggleSector={toggleSector}
                            onToggleCourse={toggleCourse}
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
