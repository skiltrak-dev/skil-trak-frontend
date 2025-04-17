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
    PlacementStartedDetail,
    ReportStudentsDetail,
    StudentResultsDetail,
    StudentsWithoutWorkplaceDetail,
    TerminatedWorkplaceDetail,
    WorkplaceRequestDetail,
} from '@partials/rto/report'
import { ReportOptionsEnum } from '@types'
import { getUserCredentials } from '@utils'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export const RTOReportType = ({ rtoUser }: { rtoUser: number }) => {
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

        return () => {
            navBar.setTitle('')
        }
    }, [title])

    const reports = () => {
        switch (reportType) {
            case ReportOptionsEnum.NON_CONTACTABLE:
                return <NonContactableDetail rtoUser={rtoUser} />
            case ReportOptionsEnum.PLACEMENT_STARTED:
                return <PlacementStartedDetail rtoUser={rtoUser} />
            case ReportOptionsEnum.STUDENT_RESULTS:
                return <StudentResultsDetail rtoUser={rtoUser} />
            // case ReportOptionsEnum.NEW_STUDENTS:
            //     return <NewStudentsDetail rtoUser={rtoUser} />
            // case ReportOptionsEnum.CANCELLED_STUDENTS:
            //     return <CancelledWorkplaceDetail rtoUser={rtoUser} />
            // case ReportOptionsEnum.BLOCKED_STUDENTS:
            //     return <BlockedStudentsDetail rtoUser={rtoUser} />
            // case ReportOptionsEnum.ARCHIVED_STUDENTS:
            //     return <ArchivedStudentsDetail rtoUser={rtoUser} />
            case ReportOptionsEnum.STUDENTS_COMPLETED:
                return <CompletedWorkplaceDetail rtoUser={rtoUser} />
            // case ReportOptionsEnum.STUDENTS_TERMINATED:
            //     return <TerminatedWorkplaceDetail rtoUser={rtoUser} />
            case ReportOptionsEnum.WORKPLACE_REQUEST:
                return <WorkplaceRequestDetail rtoUser={rtoUser} />
            // case ReportOptionsEnum.STUDENT_WITHOUT_WORKPLACE_REQUEST:
            //     return <StudentsWithoutWorkplaceDetail rtoUser={rtoUser} />
            case ReportOptionsEnum.APPOINTMENTS_REPORT:
                return <AppointmentsDetail rtoUser={rtoUser} />
            // case ReportOptionsEnum.REPORTED_STUDENTS:
            //     return <ReportStudentsDetail rtoUser={rtoUser} />
            default:
                return <NonContactableDetail rtoUser={rtoUser} />
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
