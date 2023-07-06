import { AuthorizedUserComponent, Button, Card, PageTitle } from '@components'
import { UserRoles } from '@constants'
import { useNavbar } from '@hooks'
import {
    AppointmentsDetail,
    ArchivedStudentsDetail,
    BlockedStudentsDetail,
    CancelledWorkplaceDetail,
    CompletedWorkplaceDetail,
    NewStudentsDetail,
    NonContactableDetail,
    ReportStudentsDetail,
    StudentsWithoutWorkplaceDetail,
    TerminatedWorkplaceDetail,
    WorkplaceRequestDetail,
} from '@partials/rto/report'
import { ReportOptionsEnum } from '@types'
import { getUserCredentials } from '@utils'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export const RTOReportType = () => {
    const router = useRouter()
    const { reportType } = router.query
    let title: string
    if (Array.isArray(reportType)) {
        title = reportType[0]?.replace(/-/g, ' ')
    } else {
        title = String(reportType?.replace(/-/g, ' '))
    }

    const role = getUserCredentials()?.role

    const navBar = useNavbar()

    useEffect(() => {
        if (title && role === UserRoles.ADMIN) {
            navBar.setTitle(title)
        }
    }, [title])

    const reports = () => {
        switch (reportType) {
            case ReportOptionsEnum.NON_CONTACTABLE:
                return <NonContactableDetail />
            case ReportOptionsEnum.NEW_STUDENTS:
                return <NewStudentsDetail />
            case ReportOptionsEnum.CANCELLED_WORKPLACE_REQUEST:
                return <CancelledWorkplaceDetail />
            case ReportOptionsEnum.BLOCKED_STUDENTS:
                return <BlockedStudentsDetail />
            case ReportOptionsEnum.ARCHIVED_STUDENTS:
                return <ArchivedStudentsDetail />
            case ReportOptionsEnum.WORKPLACE_REQUEST_COMPLETED:
                return <CompletedWorkplaceDetail />
            case ReportOptionsEnum.WORKPLACE_REQUEST_TERMINATED:
                return <TerminatedWorkplaceDetail />
            case ReportOptionsEnum.WORKPLACE_REQUEST:
                return <WorkplaceRequestDetail />
            case ReportOptionsEnum.STUDENT_WITHOUT_WORKPLACE_REQUEST:
                return <StudentsWithoutWorkplaceDetail />
            case ReportOptionsEnum.APPOINTMENTS_REPORT:
                return <AppointmentsDetail />
            case ReportOptionsEnum.REPORTED_STUDENTS:
                return <ReportStudentsDetail />
            default:
                return <NonContactableDetail />
        }
    }
    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <AuthorizedUserComponent
                    roles={[UserRoles.RTO, UserRoles.SUBADMIN]}
                >
                    <PageTitle title={`${title} Report Detail`} />
                </AuthorizedUserComponent>

                {/* <DownloadButton /> */}
                {/* <div className="ml-auto">
                    <Button variant={'dark'} text={'Download'} />
                </div> */}
            </div>
            <Card>{reports()}</Card>
        </>
    )
}
