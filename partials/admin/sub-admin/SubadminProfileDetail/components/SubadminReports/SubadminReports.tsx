import { Card, Typography } from '@components'
import {
    ActiveStudentsReport,
    ActiveStudentsWithoutWorkplacesReport,
    AppointmentsReport,
    StudentsAssignedReport,
    StudentsCallsPerDayReport,
} from '@partials/sub-admin'
import {
    CancelledWorkplaceReport,
    CompletedWorkplaceReport,
    PlacementStartedReport,
    StudentHaveWorkplaceReport,
    TerminatedWorkplaceReport,
} from '@partials/sub-admin/report/components/studentsWorkplace'
import { ReactElement, useState } from 'react'
import { SubAdminReports } from 'types/sub-admin-reports.type'
import { ReportType } from './ReportType'

export const SubadminReports = ({
    subadminUserId,
}: {
    subadminUserId: number
}) => {
    const weekEnd = new Date()
    weekEnd.setDate(weekEnd.getDate() - 6)
    const [startDate, setStartDate] = useState<any>(weekEnd)
    const [endDate, setEndDate] = useState<any>(new Date())
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [reportType, setReportType] = useState<SubAdminReports>(
        SubAdminReports.ASSIGNED_STUDENTS
    )
    const reports = () => {
        switch (reportType) {
            case SubAdminReports.ASSIGNED_STUDENTS:
                return (
                    <StudentsAssignedReport
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        subadmin={subadminUserId}
                    />
                )
            case SubAdminReports.STUDENT_HAVE_WORKPLACE:
                return (
                    <StudentHaveWorkplaceReport
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        subadmin={subadminUserId}
                    />
                )
            case SubAdminReports.ACTIVE_STUDENTS:
                return <ActiveStudentsReport subadmin={subadminUserId} />
            // case SubAdminReports.ARCHIVED_STUDENTS:
            //     return <ArchivedStudentsReport />
            case SubAdminReports.STUDENTS_CALLS:
                return (
                    <StudentsCallsPerDayReport
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        subadmin={subadminUserId}
                    />
                )
            case SubAdminReports.BOOK_APPOINTMENTS:
                return (
                    <AppointmentsReport
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        subadmin={subadminUserId}
                    />
                )
            case SubAdminReports.TERMINATED_STUDENTS:
                return (
                    <TerminatedWorkplaceReport
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        subadmin={subadminUserId}
                    />
                )
            case SubAdminReports.COMPLETED_STUDENTS:
                return (
                    <CompletedWorkplaceReport
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        subadmin={subadminUserId}
                    />
                )
            case SubAdminReports.CANCELLED_STUDENTS:
                return (
                    <CancelledWorkplaceReport
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        subadmin={subadminUserId}
                    />
                )
            case SubAdminReports.PLACEMENT_STARTED:
                return (
                    <PlacementStartedReport
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        subadmin={subadminUserId}
                    />
                )
            case SubAdminReports.NO_WORKPLACE:
                return (
                    <ActiveStudentsWithoutWorkplacesReport
                        subadmin={subadminUserId}
                    />
                )
            default:
                return (
                    <StudentsAssignedReport
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        subadmin={subadminUserId}
                    />
                )
        }
    }

    const onReportChange = (e: SubAdminReports) => {
        // router.push({
        //     pathname: '/portals/sub-admin/report',
        //     query: { report: e },
        // })
        setReportType(e)
    }
    return (
        <Card fullHeight shadowType="profile" noPadding>
            <div className="h-full overflow-hidden">
                <div className="px-4 py-3.5 flex justify-between items-center border-b border-secondary-dark">
                    <Typography semibold>
                        <span className="text-[15px]">Reports</span>
                    </Typography>
                    <div>
                        <ReportType
                            reportType={reportType}
                            onReportChange={onReportChange}
                        />
                    </div>
                </div>

                {/*  */}
                <div className="p-4 h-80 overflow-auto custom-scrollbar">
                    {reports()}
                </div>
            </div>
        </Card>
    )
}
