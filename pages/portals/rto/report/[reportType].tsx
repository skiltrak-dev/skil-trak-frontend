import { NextPageWithLayout, ReportOptionsEnum } from '@types'
import { RtoLayout } from '@layouts'
import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import {
    AppointmentsDetail,
    ArchivedStudentsDetail,
    BlockedStudentsDetail,
    CancelledWorkplaceDetail,
    CompletedWorkplaceDetail,
    DownloadButton,
    NewStudentsDetail,
    NonContactableDetail,
    ReportStudentsDetail,
    StudentsWithoutWorkplaceDetail,
    TerminatedWorkplaceDetail,
    WorkplaceRequestDetail,
} from '@partials/rto/report'
import { Card, PageTitle } from '@components'

const ReportType: NextPageWithLayout = () => {
    const router = useRouter()
    const { reportType } = router.query
    console.log('reportType', reportType)
    const reports = () => {
        switch (reportType) {
            case ReportOptionsEnum.NON_CONTACTABLE:
                return <NonContactableDetail />
            case ReportOptionsEnum.NEW_STUDENTS:
                return (
                    <NewStudentsDetail />
                )
            case ReportOptionsEnum.CANCELLED_WORKPLACE_REQUEST:
                return (
                    <CancelledWorkplaceDetail />
                )
            case ReportOptionsEnum.BLOCKED_STUDENTS:
                return <BlockedStudentsDetail />
            case ReportOptionsEnum.ARCHIVED_STUDENTS:
                return <ArchivedStudentsDetail />
            case ReportOptionsEnum.WORKPLACE_REQUEST_COMPLETED:
                return (
                    <CompletedWorkplaceDetail />
                )
            case ReportOptionsEnum.WORKPLACE_REQUEST_TERMINATED:
                return (
                    <TerminatedWorkplaceDetail />
                )
            case ReportOptionsEnum.WORKPLACE_REQUEST:
                return (
                    <WorkplaceRequestDetail />
                )
            case ReportOptionsEnum.STUDENT_WITHOUT_WORKPLACE_REQUEST:
                return <StudentsWithoutWorkplaceDetail />
            case ReportOptionsEnum.APPOINTMENTS_REPORT:
                return (
                    <AppointmentsDetail />
                )
            case ReportOptionsEnum.REPORTED_STUDENTS:
                return <ReportStudentsDetail />
            default:
                return null
        }
    }
    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <PageTitle title={`${reportType} Detail`} />
                <DownloadButton />
            </div>
            <Card>
                {reports()}
            </Card>
        </>
    )
}

ReportType.getLayout = (page: ReactElement) => {
    return <RtoLayout>{page}</RtoLayout>
}

export default ReportType
