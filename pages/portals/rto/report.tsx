import { ReactElement, useState } from 'react'
import { NextPageWithLayout } from '@types'

// layouts
import { RtoLayout } from '@layouts'

import {
    Card,
    EmptyData,
    InitialAvatar,
    LoadingAnimation,
    PageTitle,
    Table,
    TechnicalError,
    Typography,
} from '@components'
import { RtoApi } from '@queries'
import { ColumnDef } from '@tanstack/react-table'
import { SectorCell } from '@partials/rto/student/components'
import {
    ArchivedStudentsReport,
    BlockedStudentsReport,
    CancelledWorkplaceReport,
    CompletedWorkplaceReport,
    DownloadButton,
    FilterReport,
    NewStudentReport,
    NonContactableReport,
    TerminatedWorkplaceReport,
} from '@partials/rto/report'
import { ReportType } from '@partials/rto/report/ReportType'

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
                {reportType.value === 'non-contactable' ? (
                    <NonContactableReport />
                ) : reportType.value === 'new-students' ? (
                    <NewStudentReport
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        startDate={startDate}
                        endDate={endDate}
                    />
                ) : reportType.value === 'cancelled-workplace-request' ? (
                    <CancelledWorkplaceReport
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        startDate={startDate}
                        endDate={endDate}
                    />
                ) : reportType.value === 'blocked-students' ? (
                    <BlockedStudentsReport />
                ) : reportType.value === 'archived-students' ? (
                    <ArchivedStudentsReport />
                ) : reportType.value === 'workplace-request-completed' ? (
                    <CompletedWorkplaceReport
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        startDate={startDate}
                        endDate={endDate}
                    />
                ) : reportType.value === 'workplace-request-terminated' ? (
                    <TerminatedWorkplaceReport
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        startDate={startDate}
                        endDate={endDate}
                    />
                ) : null}
            </Card>
        </>
    )
}

Report.getLayout = (page: ReactElement) => {
    return <RtoLayout>{page}</RtoLayout>
}

export default Report
