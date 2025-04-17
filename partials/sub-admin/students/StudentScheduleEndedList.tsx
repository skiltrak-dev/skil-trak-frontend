import { useRouter } from 'next/router'
import { ReactElement } from 'react'

// Icons
import { FaEye } from 'react-icons/fa'

// components
import {
    Card,
    CaseOfficerAssignedStudent,
    EmptyData,
    LoadingAnimation,
    Table,
    TableAction,
    TableActionOption,
} from '@components'
import { StudentCellInfo, SubadminStudentIndustries } from './components'

import { TechnicalError } from '@components/ActionAnimations/TechnicalError'
import { useJoyRide } from '@hooks'
import { SubAdminApi } from '@queries'
import { Student, SubAdmin, UserStatus } from '@types'
import { useEffect, useState } from 'react'

import { SectorCell } from '@partials/admin/student/components'
import { ColumnDef } from '@tanstack/react-table'
import { setLink } from '@utils'
import moment from 'moment'
import { isWorkplaceValid } from 'utils/workplaceRowBlinking'
import { RTOCellInfo } from '../rto/components'

export const StudentScheduleEndedList = () => {
    const router = useRouter()

    const [mount, setMount] = useState(false)

    useEffect(() => {
        if (!mount) {
            setMount(true)
        }
    }, [])

    // WORKPLACE JOY RIDE - Start
    const joyride = useJoyRide()
    useEffect(() => {
        if (joyride.state.tourActive && mount) {
            setTimeout(() => {
                joyride.setState({ ...joyride.state, run: true, stepIndex: 1 })
            }, 1200)
        }
    }, [mount])

    // STUDENT JOY RIDE - END

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    const { isSuccess, isLoading, data, isError, isFetching, refetch } =
        SubAdminApi.Student.useList(
            {
                search: `schedule:${true}`,
                skip: itemPerPage * page - itemPerPage,
                limit: itemPerPage,
            },
            {
                refetchOnMountOrArgChange: 30,
            }
        )
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    // ================= Blinking/Flashing rows of students ================
    const activeAndCompleted = data?.data?.filter((student: any) => {
        if (
            student?.user?.status !== UserStatus.Approved &&
            !student?.workplace?.length
        ) {
            // Skip if status is not Approved or no workplace

            return false
        }

        const workplaceCount = student?.workplace?.length

        if (
            workplaceCount === 1 &&
            student?.user?.status === UserStatus.Approved
        ) {
            // If only one workplace, check its status
            return student?.workplace[0]?.currentStatus === 'completed'
        } else if (
            workplaceCount > 1 &&
            student?.user?.status === UserStatus.Approved
        ) {
            // If multiple workplaces, all must have 'completed' status
            // student.workplace.some(
            //     (placement: any) => placement?.currentStatus === 'completed'
            // )
            return student?.workplace?.every(
                (placement: any) => placement?.currentStatus === 'completed'
            )
        }

        return false
    })

    const findCallLogsUnanswered = data?.data?.filter((student: any) => {
        const unansweredCalls = student?.callLog?.filter((call: any) => {
            if (call?.isAnswered === null) {
                const isMoreThanSevenDays =
                    moment().diff(moment(call?.createdAt), 'days') >= 7
                return isMoreThanSevenDays
            }
            return false
        })

        const checkPlacementStarted =
            student?.workplace?.length &&
            student?.workplace?.some(
                (placement: any) =>
                    placement?.currentStatus === 'completed' ||
                    placement?.currentStatus === 'placementStarted'
            )

        return (
            !student?.hasIssue &&
            !student?.isSnoozed &&
            !student?.nonContactable &&
            !checkPlacementStarted &&
            unansweredCalls?.length > 0
        )
    })
    const findExpiringInNext45Days = data?.data?.filter((student: any) => {
        const expiryDate = new Date(student?.expiryDate)
        const currentDate = new Date()
        const timeDiff = expiryDate.getTime() - currentDate.getTime()
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
        const checkPlacementStarted =
            student?.workplace?.length &&
            student?.workplace?.some(
                (placement: any) =>
                    placement?.currentStatus === 'completed' ||
                    placement?.currentStatus === 'placementStarted'
            )
        return (
            !student?.hasIssue &&
            !student?.isSnoozed &&
            !student?.nonContactable &&
            !checkPlacementStarted &&
            // student?.workplace?.length === 0 &&
            daysDiff <= 45 &&
            daysDiff >= 0
        )
    })

    const filterAwaitingAgreementBeyondSevenDays = data?.data?.filter(
        (student: any) => {
            return (
                !student?.hasIssue &&
                !student?.isSnoozed &&
                !student?.nonContactable &&
                student?.workplace?.some((workplace: any) =>
                    isWorkplaceValid(workplace)
                )
            )
        }
    )

    const tableActionOptions: TableActionOption<Student>[] = [
        {
            text: 'View',
            onClick: (student) => {
                router.push(`/portals/sub-admin/students/${student?.id}/detail`)
                setLink('subadmin-student', router)
            },
            Icon: FaEye,
        },
    ]

    const Columns: ColumnDef<Student>[] = [
        {
            header: () => 'Name',
            accessorKey: 'user',
            cell: (info) => (
                <StudentCellInfo call student={info.row.original} />
            ),
        },
        {
            header: () => 'RTO',
            accessorKey: 'rto',
            cell: ({ row }: any) => (
                <RTOCellInfo rto={row.original?.rto} onlyName={false} />
            ),
        },
        {
            accessorKey: 'industry',
            header: () => <span>Industry</span>,
            cell: (info) => (
                <SubadminStudentIndustries
                    workplace={info.row.original?.workplace}
                    industries={info.row.original?.industries}
                />
            ),
        },
        {
            accessorKey: 'user.schedules',
            header: () => <span>Total Hours</span>,
            cell: ({ row }) => (
                <div>
                    <ol>
                        {row.original?.user?.schedules?.map(
                            (schedule: any, index: number) => (
                                <li key={index}>{schedule?.hours ?? 'NA'}</li>
                            )
                        )}
                    </ol>
                </div>
            ),
        },
        {
            accessorKey: 'scheduleStartDate',
            header: () => <span>Schedule End Date</span>,
            cell: ({ row }) => (
                <div>
                    <div>
                        <ol>
                            {row.original?.user?.schedules?.map(
                                (schedule: any, index: number) => (
                                    <li
                                        className="whitespace-nowrap"
                                        key={index}
                                    >
                                        {schedule?.endDate?.slice(0, 10) ??
                                            'NA'}
                                    </li>
                                )
                            )}
                        </ol>
                    </div>
                </div>
            ),
        },
        {
            accessorKey: 'sectors',
            header: () => <span>Sectors</span>,
            cell: ({ row }: any) => <SectorCell student={row.original} />,
        },

        {
            accessorKey: 'progress',
            header: () => <span>Progress</span>,
            cell: ({ row }) => (
                <CaseOfficerAssignedStudent student={row.original} />
            ),
        },

        {
            header: () => 'Action',
            accessorKey: 'Action',
            cell: ({ row }) => (
                <TableAction
                    options={tableActionOptions}
                    rowItem={row.original}
                />
            ),
        },
    ]

    return (
        <div>
            {isError && <TechnicalError />}
            <Card noPadding>
                {isLoading || isFetching ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && data?.data.length && !isError ? (
                    <Table
                        columns={Columns}
                        data={data.data}
                        enableRowSelection
                        awaitingAgreementBeyondSevenDays={
                            filterAwaitingAgreementBeyondSevenDays
                        }
                        findCallLogsUnanswered={findCallLogsUnanswered}
                        findExpiringInNext45Days={findExpiringInNext45Days}
                        activeAndCompleted={activeAndCompleted}
                    >
                        {({
                            table,
                            pagination,
                            pageSize,
                            quickActions,
                        }: any) => {
                            return (
                                <div>
                                    <div className="p-6 mb-2 flex justify-between">
                                        {pageSize(
                                            itemPerPage,
                                            setItemPerPage,
                                            data?.data?.length
                                        )}
                                        <div className="flex gap-x-2">
                                            {quickActions}
                                            {pagination(
                                                data?.pagination,
                                                setPage
                                            )}
                                        </div>
                                    </div>

                                    <div className="overflow-x-auto remove-scrollbar">
                                        <div
                                            className="px-6 w-full"
                                            id={'studentScrollId'}
                                        >
                                            {table}
                                        </div>
                                    </div>
                                    {data?.data?.length > 10 && (
                                        <div className="p-6 mb-2 flex justify-between">
                                            {pageSize(
                                                itemPerPage,
                                                setItemPerPage,
                                                data?.data?.length
                                            )}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination(
                                                    data?.pagination,
                                                    setPage
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        }}
                    </Table>
                ) : (
                    !isError && (
                        <EmptyData
                            title={'No Students'}
                            description={'You have not approved Students yet'}
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
        </div>
    )
}
