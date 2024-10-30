import { useRouter } from 'next/router'

// Icons
import { FaEye } from 'react-icons/fa'

// components
import {
    Button,
    Card,
    CaseOfficerAssignedStudent,
    EmptyData,
    Filter,
    InitialAvatar,
    LoadingAnimation,
    MyStudentQuickFilters,
    MyStudentsFilters,
    StudentExpiryDaysLeft,
    Table,
    TableAction,
    UserCreatedAt,
} from '@components'
import { StudentCallLogDetail, SubadminStudentIndustries } from './components'

import { TechnicalError } from '@components/ActionAnimations/TechnicalError'
import { SubAdminApi, useGetSubAdminMyStudentsQuery } from '@queries'
import { Student, SubAdminStudentsFilterType } from '@types'
import { ReactElement, useEffect, useState } from 'react'
import { MdBlock, MdPriorityHigh } from 'react-icons/md'
import {
    AddToNonContactableStudents,
    BlockModal,
    HighPriorityModal,
    UnAssignStudentModal,
} from './modals'

import { PageHeading } from '@components/headings'
import { SectorCell } from '@partials/admin/student/components'
import { ColumnDef } from '@tanstack/react-table'
import { getFilterQuery, getUserCredentials, setLink } from '@utils'
import moment from 'moment'
import { FaFileExport } from 'react-icons/fa'
import { isWorkplaceValid } from 'utils/workplaceRowBlinking'

const filterKeys = [
    'nowp',
    'name',
    'email',
    'phone',
    'rtoId',
    'suburb',
    'status',
    'courseId',
    'completed',
    'studentId',
    'industryId',
    'currentStatus',
    'flagged',
    'snoozed',
    'nonContactable',
    'coordinator'
]

export const MyStudents = () => {
    const router = useRouter()
    const userId = getUserCredentials()?.id
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [filterAction, setFilterAction] = useState(null)
    const [filter, setFilter] = useState<SubAdminStudentsFilterType>(
        {} as SubAdminStudentsFilterType
    )
    const [snoozed, setSnoozed] = useState<boolean>(false)
    const [nonContactable, setNonContactable] = useState<boolean>(false)
    const [flagged, setFlagged] = useState<boolean>(false)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    const subadmin = SubAdminApi.SubAdmin.useProfile()
    const canViewAllStudents = subadmin?.data?.canViewAllStudents

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
        const query = getFilterQuery<SubAdminStudentsFilterType>({
            router,
            filterKeys,
        })
        setFilter(query as SubAdminStudentsFilterType)
    }, [router])

    const { isLoading, isFetching, data, isError, refetch } =
        useGetSubAdminMyStudentsQuery(
            {
                skip: itemPerPage * page - itemPerPage,
                limit: itemPerPage,
                search: `${JSON.stringify({
                    ...filter,
                    ...(flagged === true && { flagged }),
                    ...(snoozed === true && { snoozed }),
                    ...(nonContactable === true && { nonContactable }),
                })
                    .replaceAll('{', '')
                    .replaceAll('}', '')
                    .replaceAll('"', '')
                    .trim()}`,
            },
            {
                refetchOnMountOrArgChange: true,
            }
        )

    // ================= Blinking/Flashing rows of students ================
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
    // ============================= END ====================================

    const onModalCancelClicked = () => {
        setModal(null)
    }

    const onBlockClicked = (student: Student) => {
        setModal(<BlockModal item={student} onCancel={onModalCancelClicked} />)
    }

    const onAssignStudentClicked = (student: Student) => {
        setModal(
            <UnAssignStudentModal
                student={student}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const onNonContactableStudents = (student: Student) => {
        setModal(
            <AddToNonContactableStudents
                student={student}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }
    const onMarkAsHighPriorityClicked = (studetnt: Student) => {
        setModal(
            <HighPriorityModal
                item={studetnt}
                onCancel={onModalCancelClicked}
                // setRefetchStudents={setRefetchStudents}
            />
        )
    }

    const tableActionOptions = (student: any) => {
        return [
            {
                text: 'View',
                onClick: (student: Student) => {
                    router.push(
                        `/portals/sub-admin/students/${student?.id}/detail`
                    )

                    setLink('subadmin-student', router)
                },
                Icon: FaEye,
            },
            {
                text: 'Old Profile',
                onClick: (student: Student) => {
                    router.push(
                        `/portals/sub-admin/students/${student.id}?tab=overview`
                    )
                },
                Icon: FaEye,
            },
            {
                text: student?.nonContactable
                    ? 'Add to Contactable'
                    : 'Add to Not Contactable',
                onClick: (student: Student) =>
                    onNonContactableStudents(student),
                Icon: MdBlock,
            },
            {
                text: 'Un Assign',
                onClick: (student: Student) => onAssignStudentClicked(student),
                Icon: MdBlock,
                color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
            },
            {
                text: 'Block',
                onClick: (student: Student) => onBlockClicked(student),
                Icon: MdBlock,
                color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
            },
            {
                text: student?.isHighPriority
                    ? 'Remove Mark High Priority'
                    : 'Mark High Priority',
                onClick: (student: Student) =>
                    onMarkAsHighPriorityClicked(student),
                Icon: MdPriorityHigh,
                color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
            },
        ]
    }

    const Columns: ColumnDef<Student>[] = [
        {
            header: () => 'Name',
            accessorKey: 'user',
            cell: ({ row }: any) => {
                return <StudentCallLogDetail student={row.original} call />
            },
        },

        {
            header: () => 'RTO',
            accessorKey: 'rto',
            cell({ row }: any) {
                const { rto } = row.original

                return (
                    <div className="flex gap-x-2 items-center">
                        {rto.user.name && (
                            <InitialAvatar name={rto.user.name} small />
                        )}
                        {rto.user.name}
                    </div>
                )
            },
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
            // cell: (info: any) => {
            //     const industry = info.row.original?.industries

            //     const appliedIndustry = studentsListWorkplace(
            //         info.row.original?.workplace
            //     )
            //     return industry && industry?.length > 0 ? (
            //         <IndustryCellInfo industry={industry[0]} />
            //     ) : info.row.original?.workplace &&
            //       info.row.original?.workplace?.length > 0 &&
            //       appliedIndustry ? (
            //         <IndustryCellInfo industry={appliedIndustry} />
            //     ) : (
            //         <Typography center>N/A</Typography>
            //     )
            // },
        },
        {
            accessorKey: 'sectors',
            header: () => <span>Sectors</span>,
            cell: ({ row }: any) => <SectorCell student={row.original} />,
        },
        {
            accessorKey: 'expiry',
            header: () => <span>Expiry Countdown</span>,
            cell: (info) => (
                <StudentExpiryDaysLeft
                    expiryDate={info.row.original?.expiryDate}
                />
            ),
        },
        {
            header: () => 'Progress',
            accessorKey: 'progress',
            cell: ({ row }) => (
                <CaseOfficerAssignedStudent student={row.original} />
            ),
        },
        {
            accessorKey: 'createdAt',
            header: () => <span>Created At</span>,
            cell: ({ row }: any) => (
                <UserCreatedAt createdAt={row.original?.createdAt} />
            ),
        },
        {
            header: () => 'Action',
            accessorKey: 'Action',
            cell: ({ row }: any) => {
                const tableActionOption = tableActionOptions(row.original)
                return (
                    <TableAction
                        options={tableActionOption}
                        rowItem={row.original}
                    />
                )
            },
        },
    ]

    return (
        <div>
            {modal}
            {/* <div className="mb-2">
                <PageHeading
                    title={'My Students'}
                    subtitle={'List of My Students'}
                />
            </div> */}
            {!canViewAllStudents && (
                <div className="flex justify-end items-center gap-x-3 mb-4">
                    <MyStudentQuickFilters
                        setSnoozed={setSnoozed}
                        setFlagged={setFlagged}
                        setNonContactable={setNonContactable}
                        snoozed={snoozed}
                        flagged={flagged}
                        nonContactable={nonContactable}
                    />
                    {filterAction}
                </div>
            )}
            <div className="w-full py-4">
                <Filter<SubAdminStudentsFilterType>
                    setFilter={(f: SubAdminStudentsFilterType) => {
                        // setStudentId(null)
                        setFilter(f)
                    }}
                    initialValues={filter}
                    filterKeys={filterKeys}
                    setFilterAction={setFilterAction}
                    component={MyStudentsFilters}
                />
            </div>
            <Card noPadding>
                {isError && <TechnicalError />}

                {data && data?.data.length ? (
                    <div className="flex justify-end">
                        <a
                            href={`${process.env.NEXT_PUBLIC_END_POINT}/subadmin/students/download-list/${userId}
                        `}
                            target="_blank"
                            rel="noreferrer"
                            className=""
                        >
                            {' '}
                            <Button
                                text={'Export'}
                                variant={'action'}
                                Icon={FaFileExport}
                            />
                        </a>
                    </div>
                ) : null}
                {isLoading || isFetching ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && data?.data.length ? (
                    <Table
                        columns={Columns}
                        data={data.data}
                        // quickActions={quickActionsElements}
                        enableRowSelection
                        awaitingAgreementBeyondSevenDays={
                            filterAwaitingAgreementBeyondSevenDays
                        }
                        findCallLogsUnanswered={findCallLogsUnanswered}
                        findExpiringInNext45Days={findExpiringInNext45Days}
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
                            description={'You have not added any Student'}
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
        </div>
    )
}
