import { NextPageWithLayout } from '@types'
import { ReactElement, useState } from 'react'

// layouts
import { SubAdminLayout } from '@layouts'

import { Button, Card, PageTitle } from '@components'

import {
    ActiveStudentsReport,
    ActiveStudentsWithoutWorkplacesReport,
    AppointmentsReport,
    ArchivedStudentsReport,
    StudentsAssignedReport,
    StudentsCallsPerDayReport,
} from '@partials/sub-admin'
import { ReportListModal } from '@partials/sub-admin/components/ReportListModal'
import { ReportType } from '@partials/sub-admin/report/ReportType'
import {
    CancelledWorkplaceReport,
    CompletedWorkplaceReport,
    PlacementStartedReport,
    StudentHaveWorkplaceReport,
    TerminatedWorkplaceReport,
} from '@partials/sub-admin/report/components/studentsWorkplace'
import { IoMdDownload } from 'react-icons/io'
import { SubAdminReports } from 'types/sub-admin-reports.type'

// components

const Report: NextPageWithLayout = () => {
    const weekEnd = new Date()
    weekEnd.setDate(weekEnd.getDate() - 6)
    const [startDate, setStartDate] = useState<any>(weekEnd)
    const [endDate, setEndDate] = useState<any>(new Date())

    const [reportType, setReportType] = useState({
        label: 'Assigned Students',
        value: 'assigned-students',
    })

    const [modal, setModal] = useState<ReactElement | null>(null)
    const onClose = () => {
        setModal(null)
    }
    const onViewClicked = () => {
        setModal(<ReportListModal onClose={() => onClose()} />)
    }

    const reports = () => {
        switch (reportType?.value) {
            case SubAdminReports.ASSIGNED_STUDENTS:
                return (
                    <StudentsAssignedReport
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                    />
                )
            case SubAdminReports.STUDENT_HAVE_WORKPLACE:
                return (
                    <StudentHaveWorkplaceReport
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                    />
                )
            case SubAdminReports.ACTIVE_STUDENTS:
                return <ActiveStudentsReport />
            case SubAdminReports.ARCHIVED_STUDENTS:
                return <ArchivedStudentsReport />
            case SubAdminReports.STUDENTS_CALLS:
                return (
                    <StudentsCallsPerDayReport
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                    />
                )
            case SubAdminReports.BOOK_APPOINTMENTS:
                return (
                    <AppointmentsReport
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                    />
                )
            case SubAdminReports.TERMINATED_STUDENTS:
                return (
                    <TerminatedWorkplaceReport
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                    />
                )
            case SubAdminReports.COMPLETED_STUDENTS:
                return (
                    <CompletedWorkplaceReport
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                    />
                )
            case SubAdminReports.CANCELLED_STUDENTS:
                return (
                    <CancelledWorkplaceReport
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                    />
                )
            case SubAdminReports.PLACEMENT_STARTED:
                return (
                    <PlacementStartedReport
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                    />
                )
            case SubAdminReports.NO_WORKPLACE:
                return <ActiveStudentsWithoutWorkplacesReport />
            default:
                return null
        }
    }

    return (
        <>
            {modal && modal}
            <div className="flex items-center justify-between mb-4">
                <PageTitle title="Statistics" />
                <Button
                    onClick={() => {
                        onViewClicked()
                    }}
                    variant="dark"
                >
                    <span className="flex items-center gap-x-2">
                        <IoMdDownload size={18} />
                        <span>Download</span>
                    </span>
                </Button>
            </div>
            <div className="w-1/4">
                <ReportType
                    reportType={reportType}
                    setReportType={setReportType}
                />
            </div>
            <Card>{reports()}</Card>
        </>
    )
}

Report.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default Report
