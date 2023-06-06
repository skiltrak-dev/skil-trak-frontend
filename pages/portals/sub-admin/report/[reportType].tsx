import { NextPageWithLayout } from '@types'
import { SubAdminLayout } from '@layouts'
import { ReactElement } from 'react'
import { useRouter } from 'next/router'

import { Card, PageTitle } from '@components'
import {
    ActiveStudentsDetail,
    ActiveStudentsWithoutWorkplaceDetail,
    AppointmentsDetail,
    ArchivedStudentsDetail,
    CancelledWorkplaceDetail,
    CompletedWorkplaceDetail,
    DownloadButton,
    PlacementStartedDetail,
    StudentHaveWorkplaceDetail,
    StudentsAssignedDetail,
    StudentsCallsDetail,
    TerminatedWorkplaceDetail,
   } from '@partials/sub-admin'
import { SubAdminReports } from 'types/sub-admin-reports.type'



const ReportType: NextPageWithLayout = () => {
    const router = useRouter()
    const { reportType } = router.query
    let title
    if (Array.isArray(reportType)) {
        title = reportType[0]?.replace(/-/g, ' ')
    } else {
        title = reportType?.replace(/-/g, ' ')
    }

    const reports = () => {
        switch (reportType) {
            case SubAdminReports.ASSIGNED_STUDENTS:
                return <StudentsAssignedDetail />
            case SubAdminReports.STUDENT_HAVE_WORKPLACE:
                return null
            case SubAdminReports.ACTIVE_STUDENTS:
                return <ActiveStudentsDetail />
            case SubAdminReports.ARCHIVED_STUDENTS:
                return <ArchivedStudentsDetail />
            case SubAdminReports.STUDENTS_CALLS:
                return <StudentsCallsDetail />
            case SubAdminReports.BOOK_APPOINTMENTS:
                return <AppointmentsDetail />
            case SubAdminReports.TERMINATED_WORKPLACE:
                return <TerminatedWorkplaceDetail />
            case SubAdminReports.COMPLETED_WORKPLACE:
                return <CompletedWorkplaceDetail />
            case SubAdminReports.CANCELLED_WORKPLACE:
                return <CancelledWorkplaceDetail />
            case SubAdminReports.PLACEMENT_STARTED:
                return <PlacementStartedDetail />
            case SubAdminReports.NO_WORKPLACE:
                return <ActiveStudentsWithoutWorkplaceDetail />
            case SubAdminReports.STUDENT_HAVE_WORKPLACE:
                return <StudentHaveWorkplaceDetail />
            default:
                return null
        }
    }
    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <PageTitle title={`${title} Detail`} />
                <DownloadButton />
            </div>
            <Card>{reports()}</Card>
        </>
    )
}

ReportType.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default ReportType
