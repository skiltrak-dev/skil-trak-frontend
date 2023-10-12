import { AuthorizedUserComponent, Button, Card, PageTitle } from '@components'
import { UserRoles } from '@constants'
import { useContextBar } from '@hooks'
import { ReportListModal } from '@partials/rto/components/ReportListModal'
import {
    AppointmentsReport,
    ArchivedStudentsReport,
    BlockedStudentsReport,
    CancelledWorkplaceReport,
    CompletedWorkplaceReport,
    NewStudentReport,
    NonContactableReport,
    ReportedStudents,
    StudentsWithoutWorkplaceReport,
    TerminatedWorkplaceReport,
    WorkplaceRequestReport,
} from '@partials/rto/report'
import { ReportType } from '@partials/rto/report/ReportType'
import { RtoApi, useRtoWeelyReportQuery } from '@queries'
import { ReportOptionsEnum, User } from '@types'
import { ReactElement, useState } from 'react'
import { IoMdDownload } from 'react-icons/io'
import { WeeklyReport } from './contextBar'

export const RTOReports = ({ user }: { user?: User }) => {
    const [reportType, setReportType] = useState({
        label: 'Non Contactable',
        value: 'non-contactable',
    })
    const [modal, setModal] = useState<ReactElement | null>(null)
    const onClose = () => {
        setModal(null)
    }

    const contextBar = useContextBar()

    const onViewClicked = () => {
        setModal(
            <ReportListModal
                onClose={() => onClose()}
                user={Number(user?.id)}
            />
        )
    }

    const reports = [
        <NonContactableReport user={user?.id} />,
        <NewStudentReport user={user?.id} />,
        <CancelledWorkplaceReport user={user?.id} />,
        <BlockedStudentsReport user={user?.id} />,
        <CompletedWorkplaceReport user={user?.id} />,
        <TerminatedWorkplaceReport user={user?.id} />,
        <WorkplaceRequestReport user={user?.id} />,
        <AppointmentsReport user={user?.id} />,
        <StudentsWithoutWorkplaceReport user={user?.id} />,
        <ReportedStudents user={user?.id} />,
    ]

    return (
        <>
            {modal && modal}
            <div className="flex items-center justify-between mb-4">
                <PageTitle title="Statistics" />

                <div className="flex items-center gap-x-3">
                    <AuthorizedUserComponent roles={[UserRoles.RTO]}>
                        <Button
                            onClick={() => {
                                contextBar.show()
                                contextBar.setTitle('Weekly Report')
                                contextBar.setContent(<WeeklyReport />)
                            }}
                            variant="action"
                            text={'Weekly Report'}
                        />
                    </AuthorizedUserComponent>

                    <Button
                        onClick={() => {
                            onViewClicked()
                        }}
                        variant="dark"
                        Icon={IoMdDownload}
                        text={'Download'}
                    />
                </div>
            </div>
            {/* <div className="w-1/4">
                <ReportType
                    reportType={reportType}
                    setReportType={setReportType}
                />
            </div> */}
            <div className="flex flex-col gap-y-2">
                {reports.map((report) => (
                    <Card>{report}</Card>
                ))}
            </div>
        </>
    )
}
