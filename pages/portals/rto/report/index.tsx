import { NextPageWithLayout, ReportOptionsEnum } from '@types'
import { ReactElement, useState } from 'react'

// layouts
import { RtoLayout } from '@layouts'

import { Button, Card, PageTitle } from '@components'

import {
    AppointmentsReport,
    ArchivedStudentsReport,
    BlockedStudentsReport,
    CancelledWorkplaceReport,
    CompletedWorkplaceReport,
    DownloadButton,
    NewStudentReport,
    NonContactableReport,
    ReportedStudents,
    StudentsWithoutWorkplaceReport,
    TerminatedWorkplaceReport,
    WorkplaceRequestReport,
} from '@partials/rto/report'
import { ReportType } from '@partials/rto/report/ReportType'
import { ReportListModal } from '@partials/rto/components/ReportListModal'
import { IoMdDownload } from 'react-icons/io'
import { RTOReports } from '@partials/common/Reports'

const Report: NextPageWithLayout = () => {
    return <RTOReports />
//     const [startDate, setStartDate] = useState<any>(new Date())
//     const [endDate, setEndDate] = useState<any>(new Date())

//     const [reportType, setReportType] = useState({
//         label: 'Non Contactable',
//         value: 'non-contactable',
//     })
//     const [modal, setModal] = useState<ReactElement | null>(null)
//     const onClose = () => {
//         setModal(null)
//     }
//     const onViewClicked = () => {
//         setModal(<ReportListModal onClose={() => onClose()} />)
//     }

//     const reports = () => {
//         switch (reportType?.value) {
//             case ReportOptionsEnum.NON_CONTACTABLE:
//                 return (
//                     <NonContactableReport
//                         setStartDate={setStartDate}
//                         setEndDate={setEndDate}
//                         startDate={startDate}
//                         endDate={endDate}
//                     />
//                 )
//             case ReportOptionsEnum.NEW_STUDENTS:
//                 return (
//                     <NewStudentReport
//                         setStartDate={setStartDate}
//                         setEndDate={setEndDate}
//                         startDate={startDate}
//                         endDate={endDate}
//                     />
//                 )
//             case ReportOptionsEnum.CANCELLED_WORKPLACE_REQUEST:
//                 return (
//                     <CancelledWorkplaceReport
//                         setStartDate={setStartDate}
//                         setEndDate={setEndDate}
//                         startDate={startDate}
//                         endDate={endDate}
//                     />
//                 )
//             case ReportOptionsEnum.BLOCKED_STUDENTS:
//                 return <BlockedStudentsReport />
//             case ReportOptionsEnum.ARCHIVED_STUDENTS:
//                 return <ArchivedStudentsReport />
//             case ReportOptionsEnum.WORKPLACE_REQUEST_COMPLETED:
//                 return (
//                     <CompletedWorkplaceReport
//                         setStartDate={setStartDate}
//                         setEndDate={setEndDate}
//                         startDate={startDate}
//                         endDate={endDate}
//                     />
//                 )
//             case ReportOptionsEnum.WORKPLACE_REQUEST_TERMINATED:
//                 return (
//                     <TerminatedWorkplaceReport
//                         setStartDate={setStartDate}
//                         setEndDate={setEndDate}
//                         startDate={startDate}
//                         endDate={endDate}
//                     />
//                 )
//             case ReportOptionsEnum.WORKPLACE_REQUEST:
//                 return (
//                     <WorkplaceRequestReport
//                         setStartDate={setStartDate}
//                         setEndDate={setEndDate}
//                         startDate={startDate}
//                         endDate={endDate}
//                     />
//                 )
//             case ReportOptionsEnum.STUDENT_WITHOUT_WORKPLACE_REQUEST:
//                 return <StudentsWithoutWorkplaceReport />
//             case ReportOptionsEnum.APPOINTMENTS_REPORT:
//                 return (
//                     <AppointmentsReport
//                         setStartDate={setStartDate}
//                         setEndDate={setEndDate}
//                         startDate={startDate}
//                         endDate={endDate}
//                     />
//                 )
//             case ReportOptionsEnum.REPORTED_STUDENTS:
//                 return <ReportedStudents />
//             default:
//                 return null
//         }
//     }

//     return (
//         <>
//             {modal && modal}
//             <div className="flex items-center justify-between mb-4">
//                 <PageTitle title="Statistics" />

//                 <Button
//                     onClick={() => {
//                         onViewClicked()
//                     }}
//                     variant="dark"
//                 >
//                     <span className="flex items-center gap-x-2">
//                         <IoMdDownload size={18} />
//                         <span>Download</span>
//                     </span>
//                 </Button>
//             </div>
//             <div className="w-1/4">
//                 <ReportType
//                     reportType={reportType}
//                     setReportType={setReportType}
//                 />
//             </div>
//             <Card>{reports()}</Card>
//         </>
//     )
// }
}

Report.getLayout = (page: ReactElement) => {
    return <RtoLayout>{page}</RtoLayout>
}

export default Report
