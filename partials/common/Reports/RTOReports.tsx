import {
    AuthorizedUserComponent,
    Button,
    Card,
    EmptyData,
    NoData,
    PageTitle,
    Typography,
} from '@components'
import { UserRoles } from '@constants'
import { useContextBar } from '@hooks'
import { ReportListDownload } from '@partials/rto/components/ReportListDownload'
import { ReportListModal } from '@partials/rto/components/ReportListModal'
import {
    AppointmentsReport,
    BlockedStudentsReport,
    CancelledWorkplaceReport,
    CompletedWorkplaceReport,
    NewStudentReport,
    NonContactableReport,
    PlacementStartedReport,
    ReportedStudents,
    StudentResultsReport,
    StudentsWithoutWorkplaceReport,
    TerminatedWorkplaceReport,
    WorkplaceRequestReport,
} from '@partials/rto/report'
import { User } from '@types'
import { getUserCredentials } from '@utils'
import moment from 'moment'
import { ReactElement, useEffect, useState } from 'react'
import { IoDocumentText } from 'react-icons/io5'
import { WeeklyReport } from './contextBar'
import { IoMdDownload } from 'react-icons/io'

export const RTOReports = ({
    user,
    createdAt,
}: {
    user?: User
    createdAt: Date
}) => {
    const [reportType, setReportType] = useState({
        label: 'Non Contactable',
        value: 'non-contactable',
    })
    const monthEnd = new Date()
    monthEnd.setDate(monthEnd.getDate() - 30)
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [startDate, setStartDate] = useState<Date>(monthEnd)
    const [endDate, setEndDate] = useState<Date>(new Date())
    let end = new Date(endDate)
    end.setDate(end.getDate() + 1)
    const onClose = () => {
        setModal(null)
    }

    const dates = () => {
        const currentDate = new Date() // Current date
        const maxWeeks = 20
        const dateObjects = []

        if (createdAt) {
            // Calculate the difference in weeks
            const weeksDifference = Math.floor(
                (currentDate.getTime() - new Date(createdAt).getTime()) /
                    (7 * 24 * 60 * 60 * 1000)
            )

            // Determine the number of weeks to generate, capped at 20 weeks
            const numberOfWeeks = Math.min(weeksDifference, maxWeeks)

            for (let i = 0; i < numberOfWeeks; i++) {
                const startDate = new Date(currentDate)
                startDate.setDate(startDate.getDate() - i * 7) // Decrement by a week

                const endDate = new Date(startDate)
                endDate.setDate(endDate.getDate() + 6) // End of the week

                const dateObject = {
                    startDate: startDate.toISOString().slice(0, 10), // Format as YYYY-MM-DD
                    endDatee: endDate.toISOString().slice(0, 10),
                    // createdAt: createdAt.toISOString().slice(0, 10),
                }

                dateObjects.push(dateObject)
            }
        } else {
            // If createdAt is not provided, generate 20 weeks of dates starting from the current date
            for (let i = 0; i < maxWeeks; i++) {
                const startDate = new Date(currentDate)
                startDate.setDate(startDate.getDate() - i * 7) // Decrement by a week

                const endDate = new Date(startDate)
                endDate.setDate(endDate.getDate() + 6) // End of the week

                const dateObject = {
                    startDate: startDate.toISOString().slice(0, 10), // Format as YYYY-MM-DD
                    endDatee: endDate.toISOString().slice(0, 10),
                }

                dateObjects.push(dateObject)
            }
        }

        return dateObjects.reverse() // Reverse the array to start from the current date
    }
    const dateObjects = dates()

    useEffect(() => {
        if (dateObjects && dateObjects?.length > 0) {
            const firstDate = dateObjects[0]
            setStartDate(new Date(firstDate?.startDate))
            setEndDate(new Date(firstDate?.endDatee))
        }
    }, [])

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
        <NonContactableReport
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            user={user?.id}
        />,
        // <NewStudentReport
        //     user={user?.id}
        //     startDate={startDate}
        //     setStartDate={setStartDate}
        //     endDate={endDate}
        //     setEndDate={setEndDate}
        // />,
        // <CancelledWorkplaceReport
        //     user={user?.id}
        //     startDate={startDate}
        //     setStartDate={setStartDate}
        //     endDate={endDate}
        //     setEndDate={setEndDate}
        // />,
        // <BlockedStudentsReport
        //     user={user?.id}
        //     // startDate={startDate}
        //     // setStartDate={setStartDate}
        //     // endDate={endDate}
        //     // setEndDate={setEndDate}
        // />,
        <CompletedWorkplaceReport
            user={user?.id}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
        />,
        <PlacementStartedReport
            user={user?.id}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
        />,
        <StudentResultsReport
            user={user?.id}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
        />,
        // <TerminatedWorkplaceReport
        //     user={user?.id}
        //     startDate={startDate}
        //     setStartDate={setStartDate}
        //     endDate={endDate}
        //     setEndDate={setEndDate}
        // />,
        <WorkplaceRequestReport
            user={user?.id}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
        />,
        <AppointmentsReport
            user={user?.id}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
        />,
        // <StudentsWithoutWorkplaceReport
        //     user={user?.id}
        //     // startDate={startDate}
        //     // setStartDate={setStartDate}
        //     // endDate={endDate}
        //     // setEndDate={setEndDate}
        // />,
        // <ReportedStudents
        //     user={user?.id}
        //     startDate={startDate}
        //     setStartDate={setStartDate}
        //     endDate={endDate}
        //     setEndDate={setEndDate}
        // />,
    ]

    const role = getUserCredentials()?.role

    console.log("user", user)

    return (
        <>
            {modal && modal}
            <div className="flex items-center justify-between mb-4">
                <PageTitle title="Statistics" />

                <div className="flex items-center gap-x-3">
                    {/* <AuthorizedUserComponent roles={[UserRoles.RTO]}>
                        <Button
                            onClick={() => {
                                contextBar.show()
                                contextBar.setTitle('Weekly Report')
                                contextBar.setContent(<WeeklyReport />)
                            }}
                            variant="action"
                            text={'Weekly Report'}
                        />
                    </AuthorizedUserComponent> */}
                    <ReportListDownload
                        user={Number(user?.id)}
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                    />
                    <Button
                        onClick={() => {
                            onViewClicked()
                        }}
                        variant="action"
                        Icon={IoMdDownload}
                        text={'Monthly Report Download'}
                    />
                </div>
            </div>
            <div
                className={`grid ${
                    role === UserRoles.ADMIN ? 'grid-cols-3' : 'grid-cols-4'
                }  gap-x-2`}
            >
                <div
                    className={`${
                        role === UserRoles.ADMIN ? 'col-span-2' : 'col-span-3'
                    }`}
                >
                    {dateObjects && dateObjects?.length > 0 ? (
                        <div
                            className={`flex flex-col gap-y-2 ${
                                role === UserRoles.ADMIN
                                    ? 'h-[calc(100vh-150px)]'
                                    : 'h-[calc(100vh-250px)]'
                            }  overflow-auto custom-scrollbar`}
                        >
                            {reports.map((report) => (
                                <Card>{report}</Card>
                            ))}
                        </div>
                    ) : (
                        <Card>
                            <EmptyData title="No Report were generated" />
                        </Card>
                    )}
                </div>
                <div className="relative">
                    <Card>
                        {dateObjects && dateObjects?.length > 0 ? (
                            <div className="sticky top-0 h-[calc(100vh-250px)] overflow-auto custom-scrollbar">
                                {dateObjects
                                    ?.reverse()
                                    .map((dateObject: any) => (
                                        <div
                                            className={`${
                                                dateObject?.startDate ===
                                                moment(startDate).format(
                                                    'YYYY-MM-DD'
                                                )
                                                    ? 'bg-gray-200'
                                                    : ''
                                            } shadow p-3 rounded-md cursor-pointer flex items-center gap-x-2`}
                                            onClick={() => {
                                                let endDateObject = new Date(
                                                    dateObject.endDatee
                                                )
                                                endDateObject.setDate(
                                                    endDateObject.getDate() + 1
                                                )
                                                setStartDate(
                                                    new Date(
                                                        dateObject.startDate
                                                    )
                                                )
                                                setEndDate(
                                                    new Date(
                                                        dateObject.endDatee
                                                    )
                                                )
                                            }}
                                        >
                                            <IoDocumentText size={25} />
                                            <Typography>
                                                {moment(
                                                    new Date(
                                                        dateObject?.startDate
                                                    )
                                                ).format('DD MMMM, YYYY')}
                                            </Typography>
                                            {/* {JSON.stringify(dateObject)} */}
                                        </div>
                                    ))}
                            </div>
                        ) : (
                            <NoData text={'No Report were found'} />
                        )}
                    </Card>
                </div>
            </div>

            {/* <div className="w-1/4">
                <ReportType
                    reportType={reportType}
                    setReportType={setReportType}
                />
            </div> */}
            {/* <div className="flex flex-col gap-y-2">
                {reports.map((report) => (
                    <Card>{report}</Card>
                ))}
            </div> */}
        </>
    )
}
