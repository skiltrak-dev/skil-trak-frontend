import { ReactElement, useState } from 'react'
import { NextPageWithLayout, ReportOptionsEnum } from '@types'

// layouts
import { SubAdminLayout } from '@layouts'


import { Card, PageTitle, Typography } from '@components'
import {
    AppointmentsReport,
    ArchivedStudentsReport,
    BlockedStudentsReport,
    CancelledWorkplaceReport,
    CompletedWorkplaceReport,
    DownloadButton,
    FilterReport,
    NewStudentReport,
    NonContactableReport,
    ReportedStudents,
    StudentsWithoutWorkplaceReport,
    TerminatedWorkplaceReport,
    WorkplaceRequestReport,
} from '@partials/sub-admin/report'
import { ReportType } from '@partials/sub-admin/report/ReportType'

// components

const Report: NextPageWithLayout = () => {
    const [startDate, setStartDate] = useState<any>(new Date())
    const [endDate, setEndDate] = useState<any>(new Date())
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    const [reportType, setReportType] = useState({
        label: 'Non Contactable',
        value: 'non-contactable',
    })

    const reports = () => {
        switch (reportType?.value) {
            case ReportOptionsEnum.NON_CONTACTABLE:
                return <NonContactableReport />;
            case ReportOptionsEnum.NEW_STUDENTS:
                return (
                    <NewStudentReport
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        startDate={startDate}
                        endDate={endDate}
                    />
                );
            case ReportOptionsEnum.CANCELLED_WORKPLACE_REQUEST:
                return (
                    <CancelledWorkplaceReport
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        startDate={startDate}
                        endDate={endDate}
                    />
                );
            case ReportOptionsEnum.BLOCKED_STUDENTS:
                return <BlockedStudentsReport />;
            case ReportOptionsEnum.ARCHIVED_STUDENTS:
                return <ArchivedStudentsReport />;
            case ReportOptionsEnum.WORKPLACE_REQUEST_COMPLETED:
                return (
                    <CompletedWorkplaceReport
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        startDate={startDate}
                        endDate={endDate}
                    />
                );
            case ReportOptionsEnum.WORKPLACE_REQUEST_TERMINATED:
                return (
                    <TerminatedWorkplaceReport
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        startDate={startDate}
                        endDate={endDate}
                    />
                );
            case ReportOptionsEnum.WORKPLACE_REQUEST:
                return (
                    <WorkplaceRequestReport
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        startDate={startDate}
                        endDate={endDate}
                    />
                );
            case ReportOptionsEnum.STUDENT_WITHOUT_WORKPLACE_REQUEST:
                return <StudentsWithoutWorkplaceReport />;
            case ReportOptionsEnum.APPOINTMENTS_REPORT:
                return (
                    <AppointmentsReport
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        startDate={startDate}
                        endDate={endDate}
                    />
                );
            case ReportOptionsEnum.REPORTED_STUDENTS:
                return <ReportedStudents />;
            default:
                return null;
        }
    }

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <PageTitle title="Statistics" />
                <DownloadButton />
            </div>
            <div className="w-1/4">
                <ReportType
                    reportType={reportType}
                    setReportType={setReportType}
                />
            </div>
            <Card>
                {reports()}
            </Card>

        </>
    )
}

Report.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default Report
