import { useRouter } from 'next/router'
import React, {
    createContext,
    ReactElement,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'
import { AdminApi } from '@queries'
import {
    ActionButton,
    CaseOfficerAssignedStudent,
    MoreActionsButton,
    StudentExpiryDaysLeft,
    TableAction,
    Typography,
} from '@components'
import { ColumnDef } from '@tanstack/react-table'
import { Student } from '@types'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import { MdBlock, MdPriorityHigh } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import { useActionModal, useNotification } from '@hooks'
import {
    ArchiveModal,
    BlockModal,
    BlockMultiStudentsModal,
    ChangeStatusModal,
    HighPriorityModal,
} from '@partials/admin/student/modals'
import { EditTimer } from '@components/StudentTimer/EditTimer'
import { checkListLength, isBrowser, setLink } from '@utils'
import {
    SectorCell,
    StudentCellInfo,
    StudentIndustries,
} from '@partials/admin/student/components'
import { RtoCellInfo } from '@partials/admin/rto/components'
import moment from 'moment'
import { useChangeStatus } from '@partials/admin/student/hooks'
import { useModal } from './ModalProvider'
import { useStudentActionModal } from './useStudentActionModal'

const DepartmentStudentsListContext = createContext<any>(null)

type StatusFilters = {
    snoozed?: boolean
    flagged?: boolean
    nonContactable?: boolean
}
export const useDepartmentStudentList = (initialStatus?: StatusFilters) => {
    const context = useContext(DepartmentStudentsListContext)
    if (context === null || context === undefined) {
        throw new Error(
            'DepartmentStudentsListContext must be used within a DepartmentStudentsListProvider'
        )
    }
    React.useEffect(() => {
        const currentFilter = context.statusFilter
        const hasFilterChanged =
            initialStatus &&
            Object.entries(initialStatus).some(
                ([key, value]) => currentFilter[key] !== value
            )

        if (hasFilterChanged) {
            context.setStatusFilter(initialStatus)
        }
    }, [])
    return context
}
export const DepartmentStudentsListProvider = ({ children }: any) => {
    // pagination
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    const [modal, setModal] = useState<ReactElement | null>(null)

    // filter
    const [filterAction, setFilterAction] = useState(null)
    const [filter, setFilter] = useState<any>({} as any)

    const [statusFilter, setStatusFilter] = useState<StatusFilters>({})

    const listingRef = useRef<any>(null)

    const savedScrollPosition =
        isBrowser() && localStorage.getItem('lastScroll')
    useEffect(() => {
        if (listingRef.current && savedScrollPosition) {
            listingRef.current.scrollTop = parseInt(savedScrollPosition, 10)
        }
    }, [savedScrollPosition, listingRef])
    // router
    const router = useRouter()
    const id = router.query.id

    useEffect(() => {
        setPage(Number(router.query?.page || 1))
        setItemPerPage(Number(router.query?.pageSize || 50))
    }, [router])

    const { passwordModal, onViewPassword } = useActionModal()
    // data fetching
    const { data, isLoading, isFetching, isError, isSuccess } =
        AdminApi.Department.useDeptStudentsList(
            {
                id: id,
                params: {
                    search: `${JSON.stringify({
                        ...filter,
                        ...statusFilter,
                    })
                        .replaceAll('{', '')
                        .replaceAll('}', '')
                        .replaceAll('"', '')
                        .trim()}`,
                    skip: !id ? 0 : itemPerPage * page - itemPerPage,
                    limit: itemPerPage,
                },
            },
            {
                refetchOnMountOrArgChange: true,
            }
        )

    useEffect(() => {
        const getScrollId = sessionStorage.getItem('scrollId')
        if (getScrollId) {
            router.push({
                pathname: router.pathname,
                query: { ...router.query, scrollId: getScrollId },
            })
        }
    }, [])

    const onModalCancelClicked = useCallback(() => {
        setModal(null)
    }, [])
    // const onBlockClicked = (student: Student) => {
    //     setModal(<BlockModal item={student} onCancel={onModalCancelClicked} />)
    // }

    const onBlockMultiStudents = (student: Student[]) => {
        setModal(
            <BlockMultiStudentsModal
                onCancel={onModalCancelClicked}
                student={student}
            />
        )
    }
    const { changeStatusResult } = useChangeStatus()

    const onBlockClicked = (student: Student) => {
        setModal(<BlockModal item={student} onCancel={onModalCancelClicked} />)
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

    const tableActionOptions = (student: any) => {
        return [
            {
                text: 'View',
                onClick: (student: any) => {
                    router.push(`/portals/admin/student/${student?.id}/detail`)
                    setLink('student', router)
                },
                Icon: FaEye,
                color: 'text-link',
            },
            {
                text: 'Edit',
                onClick: (student: Student) => {
                    router.push(
                        `/portals/admin/student/edit-student/${student?.id}`
                    )
                },
                Icon: FaEdit,
                color: 'text-green-400',
            },
            {
                text: 'Change Status',
                onClick: (student: Student) => onChangeStatus(student),
                Icon: FaEdit,
            },
            {
                text: 'Change Expiry',
                onClick: (student: Student) => onDateClick(student),
                Icon: FaEdit,
                color: 'text-gray-500',
            },
            // {
            //     text: 'View Password',
            //     onClick: (student: Student) =>
            //         onViewPassword({ user: student?.user }),
            //     Icon: RiLockPasswordFill,
            // },
            {
                text: 'Block',
                onClick: (student: Student) => onBlockClicked(student),
                Icon: MdBlock,
                color: 'text-red-500',
            },
            {
                text: student?.isHighPriority
                    ? 'Remove Mark High Priority'
                    : 'Mark High Priority',
                onClick: (student: Student) =>
                    onMarkAsHighPriorityClicked(student),
                Icon: MdPriorityHigh,
                color: 'text-orange-500',
            },
            {
                text: 'Archive',
                onClick: (student: Student) => onArchiveClicked(student),
                Icon: MdBlock,
                color: 'text-red-600',
            },
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
            accessorKey: 'expiry',
            header: () => <span>Expiry Countdown</span>,
            cell: (info) => (
                <StudentExpiryDaysLeft
                    expiryDate={info.row.original?.expiryDate}
                />
            ),
        },
        {
            accessorKey: 'progress',
            header: () => <span>Progress</span>,
            cell: ({ row }) => (
                <CaseOfficerAssignedStudent student={row.original} />
            ),
        },
        {
            accessorKey: 'createdAt',
            header: () => <span>Created At</span>,
            cell: (info) => {
                return (
                    <>
                        <Typography variant={'small'} color={'text-gray-600'}>
                            <span className="font-semibold whitespace-pre">
                                {moment(info?.row?.original?.createdAt).format(
                                    'Do MMM YYYY'
                                )}
                            </span>
                        </Typography>
                        <Typography variant={'small'} color={'text-gray-600'}>
                            <span className="font-semibold whitespace-pre">
                                {moment(info?.row?.original?.createdAt).format(
                                    'hh:mm:ss a'
                                )}
                            </span>
                        </Typography>
                    </>
                )
            },
        },
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

    const handleScroll = () => {
        if (listingRef.current) {
            isBrowser() &&
                localStorage.setItem('lastScroll', listingRef.current.scrollTop)
        }
    }
    const setStatusFilterSafe = useCallback((newFilter: StatusFilters) => {
        setStatusFilter((prev: any) => {
            // Only update if there are actual changes
            const hasChanges = Object.entries(newFilter).some(
                ([key, value]) => prev[key] !== value
            )
            return hasChanges ? newFilter : prev
        })
    }, [])
    const contextValue = {
        statusFilter,
        setStatusFilter: setStatusFilterSafe,
        data,
        isLoading,
        isFetching,
        isError,
        itemPerPage,
        page,
        filter,
        setFilterAction,
        filterAction,
        setFilter,
        columns,
        modal,
        quickActionsElements,
        listingRef,
        handleScroll,
        setPage,
    }
    return (
        <DepartmentStudentsListContext.Provider value={contextValue}>
            {children}
        </DepartmentStudentsListContext.Provider>
    )
}
