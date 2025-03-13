import {
    ActionButton,
    Button,
    Card,
    CaseOfficerAssignedStudent,
    EmptyData,
    LoadingAnimation,
    NoData,
    StudentExpiryDaysLeft,
    Table,
    TableAction,
    TableChildrenProps,
    TechnicalError,
    Typography,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaEdit, FaEye, FaFileExport, FaFlag } from 'react-icons/fa'

import { RtoCellInfo } from '@partials/admin/rto/components'
import { AdminApi } from '@queries'
import { Student, UserStatus } from '@types'
import { checkListLength, isBrowser, setLink } from '@utils'
import { useRouter } from 'next/router'
import { ReactElement, useCallback, useEffect, useRef, useState } from 'react'
import { MdBlock, MdPriorityHigh } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import { SectorCell, StudentCellInfo, StudentIndustries } from './components'
import {
    ArchiveModal,
    BlockModal,
    BlockMultiStudentsModal,
    ChangeStatusModal,
    HighPriorityModal,
} from './modals'

// hooks
import { useActionModal } from '@hooks'

import moment from 'moment'
import { EditTimer } from '@components/StudentTimer/EditTimer'
import { isWorkplaceValid } from 'utils/workplaceRowBlinking'
import Modal from '@modals/Modal'
import {
    FlagStudentModal,
    SwitchOffFlagModal,
} from '@partials/common/StudentProfileDetail/modals'

export const FlaggedStudentsList = () => {
    const router = useRouter()
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const listingRef = useRef<any>(null)

    const savedScrollPosition =
        isBrowser() && localStorage.getItem('lastScroll')
    useEffect(() => {
        if (listingRef.current && savedScrollPosition) {
            listingRef.current.scrollTop = parseInt(savedScrollPosition, 10)
        }
    }, [savedScrollPosition, listingRef])

    // Function to handle scrolling
    const handleScroll = () => {
        if (listingRef.current) {
            isBrowser() &&
                localStorage.setItem('lastScroll', listingRef.current.scrollTop)
        }
    }

    // Attach the scroll event listener when the component mounts
    // useEffect(() => {
    //     if (listingRef.current) {
    //         listingRef.current.addEventListener('scroll', handleScroll)
    //     }

    //     // Remove the event listener when the component unmounts
    //     return () => {
    //         if (listingRef.current) {
    //             listingRef.current.removeEventListener('scroll', handleScroll)
    //         }
    //     }
    // }, [listingRef])

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    // hooks
    const { passwordModal, onViewPassword } = useActionModal()

    // admin/students/reported/list
    const { isLoading, isFetching, data, isError } =
        AdminApi.Students.useFlaggedStudents(
            {
                // search: `status:${UserStatus.Approved}`,
                skip: itemPerPage * page - itemPerPage,
                limit: itemPerPage,
            },
            { refetchOnMountOrArgChange: 30 }
        )

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
    // ============================= END ====================================

    const onModalCancelClicked = useCallback(() => {
        setModal(null)
    }, [])
    const onBlockClicked = (student: Student) => {
        setModal(<BlockModal item={student} onCancel={onModalCancelClicked} />)
    }

    const onBlockMultiStudents = (student: Student[]) => {
        setModal(
            <BlockMultiStudentsModal
                onCancel={onModalCancelClicked}
                student={student}
            />
        )
    }

    const onArchiveClicked = (student: Student) => {
        setModal(
            <ArchiveModal item={student} onCancel={onModalCancelClicked} />
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

    const onChangeStatus = (student: Student) => {
        setModal(
            <ChangeStatusModal
                student={student}
                onCancel={onModalCancelClicked}
            />
        )
    }

    const onDateClick = (student: Student) => {
        setModal(
            <EditTimer
                studentId={student?.user?.id}
                date={student?.expiryDate}
                onCancel={onModalCancelClicked}
            />
        )
    }

    const numberOfWeeks = 20
    const endDate = new Date() // Starting from the current date

    const dateObjects = []

    for (let i = numberOfWeeks - 1; i >= 0; i--) {
        const currentDate = new Date(endDate)
        currentDate.setDate(currentDate.getDate() - i * 7) // Decrement by a week

        const lastWeekDate = new Date(currentDate)
        lastWeekDate.setDate(lastWeekDate.getDate() + 6) // End of the week

        const dateObject = {
            startDate: currentDate.toISOString().slice(0, 10), // Format as YYYY-MM-DD
            endDate: lastWeekDate.toISOString().slice(0, 10),
        }

        dateObjects.push(dateObject)
    }

    const onMakeProblamatic = (student: Student) => {
        setModal(
            <FlagStudentModal
                onCancel={onModalCancelClicked}
                studentId={student?.id}
            />
        )
    }
    const onSwitchOffFlag = (student: Student) => {
        setModal(
            <SwitchOffFlagModal
                onCancel={onModalCancelClicked}
                studentId={student?.id}
            />
        )
    }

    const tableActionOptions = (student: any) => {
        return [
            {
                text: 'View',
                onClick: (student: any) => {
                    router.push(`/portals/admin/student/${student?.id}/detail`)
                    setLink('student', router)
                },
                Icon: FaEye,
            },
            {
                text:
                    // !student?.isReported && student?.hasIssue
                    //     ? 'Report to RTO'
                    //     :
                    'Cancel',
                onClick: (student: Student) => {
                    onSwitchOffFlag(student)
                    // if (student?.isReported || student?.hasIssue) {
                    //   onMakeProblamatic(student)
                    // }
                    // else {
                    // onSwitchOffFlag(student)
                    // }
                },
                Icon: FaFlag,
            },
            // {
            //     text: 'Edit',
            //     onClick: (student: Student) => {
            //         router.push(
            //             `/portals/admin/student/edit-student/${student?.id}`
            //         )
            //     },
            //     Icon: FaEdit,
            // },
            // {
            //     text: 'Change Status',
            //     onClick: (student: Student) => onChangeStatus(student),
            //     Icon: FaEdit,
            // },
            // {
            //     text: 'Change Expiry',
            //     onClick: (student: Student) => onDateClick(student),
            //     Icon: FaEdit,
            // },
            // {
            //     text: 'View Password',
            //     onClick: (student: Student) =>
            //         onViewPassword({ user: student?.user }),
            //     Icon: RiLockPasswordFill,
            // },
            // {
            //     text: 'Block',
            //     onClick: (student: Student) => onBlockClicked(student),
            //     Icon: MdBlock,
            //     color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
            // },
            // {
            //     text: student?.isHighPriority
            //         ? 'Remove Mark High Priority'
            //         : 'Mark High Priority',
            //     onClick: (student: Student) =>
            //         onMarkAsHighPriorityClicked(student),
            //     Icon: MdPriorityHigh,
            //     color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
            // },
            // {
            //     text: 'Archive',
            //     onClick: (student: Student) => onArchiveClicked(student),
            //     Icon: MdBlock,
            //     color: 'text-red-400 hover:bg-red-100 hover:border-red-200',
            // },
        ]
    }

    const columns: ColumnDef<Student>[] = [
        {
            accessorKey: 'user.name',
            cell: (info) => (
                <StudentCellInfo student={info?.row?.original} call />
            ),
            header: () => <span>Student</span>,
        },
        {
            accessorKey: 'rto',
            header: () => <span>RTO</span>,
            cell: (info) => (
                <RtoCellInfo rto={info?.row?.original?.rto} short />
            ),
        },
        {
            accessorKey: 'industry',
            header: () => <span>Industry</span>,
            cell: (info) => (
                <StudentIndustries
                    industries={info.row.original?.industries}
                    workplace={info.row.original?.workplace}
                />
            ),
        },
        {
            accessorKey: 'sectors',
            header: () => <span>Sectors</span>,
            cell: (info) => <SectorCell student={info.row.original} />,
        },
        {
            accessorKey: 'statusHistory',
            header: () => <span>Flag Comment</span>,
            cell: (info) => {
                return (
                    <Modal>
                        <Modal.Open>
                            <Button variant={'info'} text="View" outline />
                        </Modal.Open>
                        <Modal.Window>
                            <div className="p-5 flex flex-col justify-center items-center gap-y-4">
                                <Typography variant="title">
                                    Reported Comment
                                </Typography>
                                {info.row?.original?.statusHistory &&
                                info.row?.original?.statusHistory?.length >
                                    0 ? (
                                    <div className="flex gap-x-4 w-full h-full">
                                        <div
                                            className={`flex flex-col gap-y-1 ${
                                                info.row?.original
                                                    ?.statusHistory?.[
                                                    info.row?.original
                                                        ?.statusHistory
                                                        ?.length - 1
                                                ]?.response
                                                    ? 'w-1/2'
                                                    : 'w-full'
                                            }`}
                                        >
                                            <Typography
                                                variant="label"
                                                semibold
                                            >
                                                Coordinator Comment
                                            </Typography>
                                            <Typography variant="body">
                                                {info.row?.original
                                                    ?.statusHistory?.[
                                                    info.row?.original
                                                        ?.statusHistory
                                                        ?.length - 1
                                                ]?.comment ?? 'NA'}
                                            </Typography>
                                        </div>
                                        {info.row?.original?.statusHistory?.[
                                            info.row?.original?.statusHistory
                                                ?.length - 1
                                        ]?.response && (
                                            <>
                                                <div className="w-[2px] bg-gray-200 h-auto min-h-full mx-4"></div>
                                                <div className="flex flex-col gap-y-1 w-1/2">
                                                    <Typography
                                                        variant="label"
                                                        semibold
                                                    >
                                                        RTO Comment
                                                    </Typography>
                                                    <Typography variant="body">
                                                        {info.row?.original
                                                            ?.statusHistory?.[
                                                            info.row?.original
                                                                ?.statusHistory
                                                                ?.length - 1
                                                        ]?.response ?? 'NA'}
                                                    </Typography>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ) : (
                                    <NoData text="No Data found" />
                                )}
                            </div>
                        </Modal.Window>
                    </Modal>
                )
            },
        },
        // {
        //     accessorKey: 'expiry',
        //     header: () => <span>Expiry Countdown</span>,
        //     cell: (info) => (
        //         <StudentExpiryDaysLeft
        //             expiryDate={info.row.original?.expiryDate}
        //         />
        //     ),
        // },
        {
            accessorKey: 'progress',
            header: () => <span>Progress</span>,
            cell: ({ row }) => (
                <CaseOfficerAssignedStudent student={row.original} />
            ),
        },
        // {
        //     accessorKey: 'createdAt',
        //     header: () => <span>Created At</span>,
        //     cell: (info) => {
        //         return (
        //             <>
        //                 <Typography variant={'small'} color={'text-gray-600'}>
        //                     <span className="font-semibold whitespace-pre">
        //                         {moment(info?.row?.original?.createdAt).format(
        //                             'Do MMM YYYY'
        //                         )}
        //                     </span>
        //                 </Typography>
        //                 <Typography variant={'small'} color={'text-gray-600'}>
        //                     <span className="font-semibold whitespace-pre">
        //                         {moment(info?.row?.original?.createdAt).format(
        //                             'hh:mm:ss a'
        //                         )}
        //                     </span>
        //                 </Typography>
        //             </>
        //         )
        //     },
        // },
        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: (info) => {
                const length = checkListLength<Student>(data?.data as Student[])
                const tableActionOption = tableActionOptions(
                    info?.row?.original
                )
                return (
                    <div className="flex gap-x-1 items-center">
                        <TableAction
                            options={tableActionOption}
                            rowItem={info?.row?.original}
                            lastIndex={length.includes(info?.row?.index)}
                        />
                    </div>
                )
            },
        },
    ]

    const quickActionsElements = {
        id: 'id',
        individual: (student: Student) => {
            return (
                <div className="flex gap-x-2">
                    <ActionButton
                        onClick={() => {
                            router.push(
                                `/portals/admin/student/${student?.id}/detail`
                            )
                        }}
                    >
                        View
                    </ActionButton>
                    <ActionButton
                        Icon={FaEdit}
                        onClick={() => {
                            router.push(
                                `/portals/admin/student/edit-student/${student?.id}`
                            )
                        }}
                    >
                        Edit
                    </ActionButton>
                    <ActionButton
                        Icon={MdBlock}
                        variant="error"
                        onClick={() => {
                            onBlockClicked(student)
                        }}
                    >
                        Block
                    </ActionButton>
                </div>
            )
        },
        common: (student: Student[]) => (
            <ActionButton
                onClick={() => {
                    onBlockMultiStudents(student)
                }}
                Icon={MdBlock}
                variant="error"
            >
                Block
            </ActionButton>
        ),
    }

    return (
        <>
            {modal && modal}
            {passwordModal && passwordModal}
            <div className="flex flex-col gap-y-4">
                <div className="flex">
                    <PageHeading
                        title={'Flagged Students'}
                        subtitle={'List of Flagged Students'}
                    />
                    {data && data?.data.length ? (
                        <div className="">
                            <a
                                href={`${process.env.NEXT_PUBLIC_END_POINT}/admin/students/list/download
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
                </div>
                <Card noPadding>
                    {isError && <TechnicalError />}
                    {isLoading || isFetching ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : data && data?.data.length ? (
                        <Table
                            columns={columns}
                            data={data.data}
                            quickActions={quickActionsElements}
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
                            }: TableChildrenProps) => {
                                return (
                                    <div>
                                        <div
                                            ref={listingRef}
                                            onScroll={handleScroll}
                                            className="p-6 mb-2 flex justify-between"
                                        >
                                            {pageSize
                                                ? pageSize(
                                                      itemPerPage,
                                                      setItemPerPage,
                                                      data?.data?.length
                                                  )
                                                : null}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination
                                                    ? pagination(
                                                          data?.pagination,
                                                          setPage
                                                      )
                                                    : null}
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
                                                {pageSize
                                                    ? pageSize(
                                                          itemPerPage,
                                                          setItemPerPage,
                                                          data?.data?.length
                                                      )
                                                    : null}
                                                <div className="flex gap-x-2">
                                                    {quickActions}
                                                    {pagination
                                                        ? pagination(
                                                              data?.pagination,
                                                              setPage
                                                          )
                                                        : null}
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
                                title={'No Flagged Student!'}
                                description={'You have not flagged student'}
                                height={'50vh'}
                            />
                        )
                    )}
                </Card>
            </div>
        </>
    )
}
