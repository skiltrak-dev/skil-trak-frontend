import { ReactElement, useEffect, useState } from 'react'

// layouts

import { Button, Card, PageTitle } from '@components'

import {
    ActiveStudentsReport,
    ActiveStudentsWithoutWorkplacesReport,
    AppointmentsReport,
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
import { useRouter } from 'next/router'
import { IoMdDownload } from 'react-icons/io'
import { SubAdminReports } from 'types/sub-admin-reports.type'

// components

export const SubAdminReportsTab = ({ subadmin }: { subadmin: number }) => {
    const weekEnd = new Date()
    weekEnd.setDate(weekEnd.getDate() - 6)
    const [startDate, setStartDate] = useState<any>(weekEnd)
    const [endDate, setEndDate] = useState<any>(new Date())
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [reportType, setReportType] = useState<SubAdminReports>(
        SubAdminReports.ASSIGNED_STUDENTS
    )

    const router = useRouter()
    useEffect(() => {
        router?.query?.report &&
            setReportType(router?.query?.report as SubAdminReports)
    }, [router])

    const onClose = () => {
        setModal(null)
    }
    const onViewClicked = () => {
        setModal(
            <ReportListModal onClose={() => onClose()} subadmin={subadmin} />
        )
    }

    const onReportChange = (e: SubAdminReports) => {
        // router.push({
        //     pathname: '/portals/sub-admin/report',
        //     query: { report: e },
        // })
        setReportType(e)
    }

    const reports = () => {
        switch (reportType) {
            case SubAdminReports.ASSIGNED_STUDENTS:
                return (
                    <StudentsAssignedReport
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        subadmin={subadmin}
                    />
                )
            case SubAdminReports.STUDENT_HAVE_WORKPLACE:
                return (
                    <StudentHaveWorkplaceReport
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        subadmin={subadmin}
                    />
                )
            case SubAdminReports.ACTIVE_STUDENTS:
                return <ActiveStudentsReport subadmin={subadmin} />
            // case SubAdminReports.ARCHIVED_STUDENTS:
            //     return <ArchivedStudentsReport />
            case SubAdminReports.STUDENTS_CALLS:
                return (
                    <StudentsCallsPerDayReport
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        subadmin={subadmin}
                    />
                )
            case SubAdminReports.BOOK_APPOINTMENTS:
                return (
                    <AppointmentsReport
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        subadmin={subadmin}
                    />
                )
            case SubAdminReports.TERMINATED_STUDENTS:
                return (
                    <TerminatedWorkplaceReport
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        subadmin={subadmin}
                    />
                )
            case SubAdminReports.COMPLETED_STUDENTS:
                return (
                    <CompletedWorkplaceReport
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        subadmin={subadmin}
                    />
                )
            case SubAdminReports.CANCELLED_STUDENTS:
                return (
                    <CancelledWorkplaceReport
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        subadmin={subadmin}
                    />
                )
            case SubAdminReports.PLACEMENT_STARTED:
                return (
                    <PlacementStartedReport
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        subadmin={subadmin}
                    />
                )
            case SubAdminReports.NO_WORKPLACE:
                return (
                    <ActiveStudentsWithoutWorkplacesReport
                        subadmin={subadmin}
                    />
                )
            default:
                return (
                    <StudentsAssignedReport
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        subadmin={subadmin}
                    />
                )
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
                    onReportChange={onReportChange}
                />
            </div>
            <Card>{reports()}</Card>
        </>
    )
}
