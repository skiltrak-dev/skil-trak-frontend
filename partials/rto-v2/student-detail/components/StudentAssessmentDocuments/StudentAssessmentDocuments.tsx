import { RtoV2Api } from '@queries'
import { Course, Student } from '@types'
import { useState } from 'react'
import { CourseOverview } from '../StudentOverview'
import { DocumentFilter, DocumentHeader } from './components'
import { FolderSection } from './components/FolderSection'
import { useSelector } from 'react-redux'

interface DocumentsProps {
    student: Student
}

export function StudentAssessmentDocuments({ student }: DocumentsProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [selectedView, setSelectedView] = useState<
        'all' | 'industry' | 'course'
    >('all')

    const selectedCourse = useSelector(
        (state: any) => state?.student?.selectedCourse
    )

    const count = RtoV2Api.StudentDocuments.getStudentDocumentsCount({
        studentId: student.id,
        courseId: selectedCourse?.id ?? 0,
    })

    const industryStats = {
        pending: count?.data?.pendingIndustryCheck,
        approved: count?.data?.approvedDocuments,
    }

    const courseStats = {
        approved: count?.data?.approvedCourseDocuments,
        pending: count?.data?.pendingCourseDocuments,
    }

    // Section configuration array
    const sections = [
        {
            type: 'industry' as const,
            title: 'Industry Checks & Clearances',
            description: 'Required compliance documents',
            stats: industryStats,
            filterKey: 'industryCheck',
        },
        {
            filterKey: 'courseDocument',
            type: 'course' as const,
            title: 'Course Documents',
            description: 'Placement records, assessments, and course materials',
            stats: courseStats,
        },
    ]

    return (
        <div className="space-y-4">
            {/* Hero Section with Quick Stats */}
            <CourseOverview />

            <DocumentHeader count={count} />

            {/* Search and Filter Bar */}
            <DocumentFilter
                selectedView={selectedView}
                setSearchQuery={setSearchQuery}
                setSelectedView={setSelectedView}
                setStatusFilter={setStatusFilter}
            />

            {/* Dynamic Sections */}
            {sections.map((section) => {
                const shouldRender =
                    selectedView === 'all' || selectedView === section.type
                return (
                    shouldRender && (
                        <FolderSection
                            key={section.type}
                            course={selectedCourse ?? ({ id: 0 } as Course)}
                            title={section.title}
                            description={section.description}
                            stats={section.stats}
                            sectionType={section.type}
                            filterKey={section.filterKey}
                        />
                    )
                )
            })}

            {/* Approval Dialog */}
            {/* <ApproveFileModal
                isOpen={approvalDialogOpen}
                setIsOpen={setApprovalDialogOpen}
                selectedItem={selectedItem}
                handleApprove={handleApprove}
            /> */}

            {/* Rejection Dialog */}
            {/* <RejectFileModal
                isOpen={rejectionDialogOpen}
                setIsOpen={setRejectionDialogOpen}
                selectedItem={selectedItem}
                handleReject={handleReject}
            /> */}
        </div>
    )
}
