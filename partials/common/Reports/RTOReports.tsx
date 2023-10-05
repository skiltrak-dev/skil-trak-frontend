import { Button, Card, PageTitle } from '@components'
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
import { ReportOptionsEnum, User } from '@types'
import { ReactElement, useState } from 'react'
import { IoMdDownload } from 'react-icons/io'

export const RTOReports = ({ user }: { user?: User }) => {
    // const monthEnd = new Date()
    // monthEnd.setDate(monthEnd.getDate() - 30)
    // const [startDate, setStartDate] = useState<Date>(monthEnd)
    // const [endDate, setEndDate] = useState<Date>(new Date())

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

    // const reports = () => {
    //     switch (reportType?.value) {
    //         case ReportOptionsEnum.NON_CONTACTABLE:
    //             return (
    //                 <NonContactableReport
    //                     setStartDate={setStartDate}
    //                     setEndDate={setEndDate}
    //                     startDate={startDate}
    //                     endDate={endDate}
    //                     user={user?.id}
    //                 />
    //             )
    //         case ReportOptionsEnum.NEW_STUDENTS:
    //             return (
    //                 <NewStudentReport
    //                     setStartDate={setStartDate}
    //                     setEndDate={setEndDate}
    //                     startDate={startDate}
    //                     endDate={endDate}
    //                     user={user?.id}
    //                 />
    //             )
    //         case ReportOptionsEnum.CANCELLED_WORKPLACE_REQUEST:
    //             return (
    //                 <CancelledWorkplaceReport
    //                     setStartDate={setStartDate}
    //                     setEndDate={setEndDate}
    //                     startDate={startDate}
    //                     endDate={endDate}
    //                     user={user?.id}
    //                 />
    //             )
    //         case ReportOptionsEnum.BLOCKED_STUDENTS:
    //             return <BlockedStudentsReport user={user?.id} />
    //         case ReportOptionsEnum.ARCHIVED_STUDENTS:
    //             return <ArchivedStudentsReport user={user?.id} />
    //         case ReportOptionsEnum.WORKPLACE_REQUEST_COMPLETED:
    //             return (
    //                 <CompletedWorkplaceReport
    //                     setStartDate={setStartDate}
    //                     setEndDate={setEndDate}
    //                     startDate={startDate}
    //                     endDate={endDate}
    //                     user={user?.id}
    //                 />
    //             )
    //         case ReportOptionsEnum.WORKPLACE_REQUEST_TERMINATED:
    //             return (
    //                 <TerminatedWorkplaceReport
    //                     setStartDate={setStartDate}
    //                     setEndDate={setEndDate}
    //                     startDate={startDate}
    //                     endDate={endDate}
    //                     user={user?.id}
    //                 />
    //             )
    //         case ReportOptionsEnum.WORKPLACE_REQUEST:
    //             return (
    //                 <WorkplaceRequestReport
    //                     setStartDate={setStartDate}
    //                     setEndDate={setEndDate}
    //                     startDate={startDate}
    //                     endDate={endDate}
    //                     user={user?.id}
    //                 />
    //             )
    //         case ReportOptionsEnum.STUDENT_WITHOUT_WORKPLACE_REQUEST:
    //             return <StudentsWithoutWorkplaceReport user={user?.id} />
    //         case ReportOptionsEnum.APPOINTMENTS_REPORT:
    //             return (
    //                 <AppointmentsReport
    //                     setStartDate={setStartDate}
    //                     setEndDate={setEndDate}
    //                     startDate={startDate}
    //                     endDate={endDate}
    //                     user={user?.id}
    //                 />
    //             )
    //         case ReportOptionsEnum.REPORTED_STUDENTS:
    //             return <ReportedStudents user={user?.id} />
    //         default:
    //             return (
    //                 <NonContactableReport
    //                     setStartDate={setStartDate}
    //                     setEndDate={setEndDate}
    //                     startDate={startDate}
    //                     endDate={endDate}
    //                     user={user?.id}
    //                 />
    //             )
    //     }
    // }
    const reports = [
        <NonContactableReport
            // setStartDate={setStartDate}
            // setEndDate={setEndDate}
            // startDate={startDate}
            // endDate={endDate}
            user={user?.id}
        />,
        <NewStudentReport
            // setStartDate={setStartDate}
            // setEndDate={setEndDate}
            // startDate={startDate}
            // endDate={endDate}
            user={user?.id}
        />,
        <CancelledWorkplaceReport
            // setStartDate={setStartDate}
            // setEndDate={setEndDate}
            // startDate={startDate}
            // endDate={endDate}
            user={user?.id}
        />,
        <BlockedStudentsReport user={user?.id} />,
        // <ArchivedStudentsReport user={user?.id} />,
        <CompletedWorkplaceReport
            // setStartDate={setStartDate}
            // setEndDate={setEndDate}
            // startDate={startDate}
            // endDate={endDate}
            user={user?.id}
        />,
        <TerminatedWorkplaceReport
            // setStartDate={setStartDate}
            // setEndDate={setEndDate}
            // startDate={startDate}
            // endDate={endDate}
            user={user?.id}
        />,
        <WorkplaceRequestReport
            // setStartDate={setStartDate}
            // setEndDate={setEndDate}
            // startDate={startDate}
            // endDate={endDate}
            user={user?.id}
        />,
        <AppointmentsReport
            // setStartDate={setStartDate}
            // setEndDate={setEndDate}
            // startDate={startDate}
            // endDate={endDate}
            user={user?.id}
        />,
        <StudentsWithoutWorkplaceReport user={user?.id} />,
        <ReportedStudents user={user?.id} />,
    ]

    return (
        <>
            {modal && modal}
            <div className="flex items-center justify-between mb-4">
                <PageTitle title="Statistics" />

                <div className="flex items-center gap-x-3">
                    {/* <Button
                        onClick={() => {
                            contextBar.show()
                            contextBar.setTitle('Weekly Report')
                            contextBar.setContent('Saad')
                        }}
                        variant="dark"
                        text={'Weekly Report'}
                    /> */}

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
