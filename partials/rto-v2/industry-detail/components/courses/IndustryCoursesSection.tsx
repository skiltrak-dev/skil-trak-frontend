import { RtoV2Api, setIndustrySectorCapacity, SubAdminApi } from '@redux'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { useEffect, useState } from 'react'

import { CourseViewModel } from '../courses/courseCard/CourseCard'
import { CoursesHeaderSection } from '../courses/header/CoursesHeaderSection'
import { EditCourseCapacityDialog } from '../courses/modals/EditCourseCapacityDialog'
import { EditSectorMetricsDialog } from '../courses/modals/EditSectorMetricsDialog'
import { SectorCard } from '../courses/SectorCard'
import { IndustrySectorGroup, useCoursesData } from './hooks'

export function IndustryCoursesSection() {
    const [searchQuery, setSearchQuery] = useState('')
    // const [coursesDataState, setCoursesDataState] = useState<any>() // Removed unused state
    const [showSearch, setShowSearch] = useState(false)
    const [editingSector, setEditingSector] =
        useState<IndustrySectorGroup | null>(null)
    const [editingCourse, setEditingCourse] = useState<CourseViewModel | null>(
        null
    )

    const { industryDetail: industry } = useAppSelector(
        (state) => state.industry
    )
    const { groupBySector } = useCoursesData()
    const dispatch = useAppDispatch()

    const { data: sectorCapacityData } =
        SubAdminApi.Industry.useSectorBasedCapacity(industry?.id || 0, {
            skip: !industry?.id,
        })

    useEffect(() => {
        if (sectorCapacityData) {
            dispatch(setIndustrySectorCapacity(sectorCapacityData))
        }
    }, [sectorCapacityData, dispatch])

    const { data: coursesDetails } = RtoV2Api.Industries.industryCoursesDetails(
        {
            userId: industry?.user?.id,
        },
        {
            skip: !industry?.user?.id,
        }
    )

    // Use API data directly without transformation
    const coursesData = coursesDetails ? groupBySector(coursesDetails) : []

    const saveSectorMetrics = (
        sectorId: number,
        values: { students: number; capacity: number; duration: string }
    ) => { }

    const saveCourseCapacity = (
        courseId: number,
        values: { students: number; capacity: number }
    ) => {
        // Placeholder: Implement API call here
        console.log('Save capacity:', courseId, values)
    }

    // Calculate overall statistics
    const totalCourses = coursesData.reduce(
        (acc, group) => acc + group.approvalCourses.length,
        0
    )

    const totalStudents =
        sectorCapacityData?.reduce(
            (acc: number, curr: any) => acc + (curr.enrolled || 0),
            0
        ) || 0
    const totalCapacity =
        sectorCapacityData?.reduce(
            (acc: number, curr: any) => acc + (Number(curr?.capacity) || 0),
            0
        ) || 0

    const overallCapacity =
        totalCapacity > 0
            ? Math.round((totalStudents / totalCapacity) * 100)
            : 0

    const approvedCount = coursesData.filter(
        (group) => group.sector.industryApproval?.[0]?.status === 'approved'
    ).length

    const pendingActionsCount = coursesData.filter((group) => {
        const status = group.sector.industryApproval?.[0]?.status
        return status === 'pending'
    }).length

    return (
        <div id="courses" className="space-y-5">
            {/* Premium Header Section */}
            <CoursesHeaderSection
                showSearch={showSearch}
                searchQuery={searchQuery}
                totalCourses={totalCourses}
                totalStudents={totalStudents}
                totalCapacity={totalCapacity}
                overallCapacity={overallCapacity}
                pendingActionsCount={pendingActionsCount}
                approvedCount={approvedCount}
                onToggleSearch={() => setShowSearch(!showSearch)}
                onSearchChange={setSearchQuery}
            />

            {/* Sector Cards - Enhanced Design */}
            <div id="capacity" className="space-y-3">
                {coursesData.map((group, sectorIndex) => (
                    <SectorCard
                        key={group.sector.id}
                        sector={group}
                        sectorIndex={sectorIndex}
                    />
                ))}
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
