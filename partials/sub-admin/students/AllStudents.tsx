import { useRouter } from 'next/router'
import { ReactElement } from 'react'

// Icons
import { FaEdit, FaEye } from 'react-icons/fa'

// components
import {
    Card,
    EmptyData,
    InitialAvatar,
    LoadingAnimation,
    StudentStatusProgressCell,
    Table,
    TableAction,
    TableActionOption,
    Typography,
} from '@components'
import { StudentCellInfo } from './components'

import { TechnicalError } from '@components/ActionAnimations/TechnicalError'
import { useActionModal, useJoyRide } from '@hooks'
import { useGetSubAdminStudentsQuery, SubAdminApi } from '@queries'
import { Student, UserStatus } from '@types'
import { useEffect, useState } from 'react'
import { MdBlock } from 'react-icons/md'
import {
    AssignStudentModal,
    BlockModal,
    ChangeStudentStatusModal,
} from './modals'

import { ProgressCell, SectorCell } from '@partials/admin/student/components'
import { checkStudentStatus, checkWorkplaceStatus, setLink } from '@utils'
import { IndustryCellInfo } from '../indestries/components'
import { ColumnDef } from '@tanstack/react-table'
import { EditTimer } from '@components/StudentTimer/EditTimer'
import { RiLockPasswordFill } from 'react-icons/ri'

export const AllStudents = () => {
    const router = useRouter()

    const [mount, setMount] = useState(false)
    const [changeExpiryData, setChangeExpiryData] = useState(false)

    // hooks
    const { passwordModal, onViewPassword } = useActionModal()

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

    const [modal, setModal] = useState<ReactElement | null>(null)

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    const { isLoading, data, isError, refetch } = SubAdminApi.Student.useList({
        search: `status:${UserStatus.Approved}`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    useEffect(() => {
        if (changeExpiryData) {
            refetch()
        }
    }, [changeExpiryData])

    const onModalCancelClicked = () => {
        setModal(null)
    }
    const onAssignStudentClicked = (student: Student) => {
        setModal(
            <AssignStudentModal
                student={student}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const onChangeStatus = (student: Student) => {
        setModal(
            <ChangeStudentStatusModal
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
                changeExpiryData={setChangeExpiryData}
            />
        )
    }

    const onBlockClicked = (student: Student) => {
        setModal(<BlockModal item={student} onCancel={onModalCancelClicked} />)
    }

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: (student: Student) => {
                router.push(
                    `/portals/sub-admin/students/${student.id}?tab=overview`
                )
                setLink('subadmin-student', router)
            },
            Icon: FaEye,
        },
        {
            text: 'Assign to me',
            onClick: (student: Student) => onAssignStudentClicked(student),
            Icon: MdBlock,
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        },
        {
            text: 'Change Status',
            onClick: (student: Student) => onChangeStatus(student),
            Icon: FaEdit,
        },
        {
            text: 'View Password',
            onClick: (student: Student) => onViewPassword(student),
            Icon: RiLockPasswordFill,
        },
        {
            text: 'Block',
            onClick: (student: Student) => onBlockClicked(student),
            Icon: MdBlock,
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        },
        {
            text: 'Change Expiry',
            onClick: (student: Student) => onDateClick(student),
            Icon: FaEdit,
        },
    ]

    const Columns: ColumnDef<Student>[] = [
        {
            header: () => 'Name',
            accessorKey: 'user',
            cell: ({ row }: any) => {
                return <StudentCellInfo student={row.original} />
            },
        },
        {
            header: () => 'RTO',
            accessorKey: 'rto',
            cell({ row }: any) {
                const { rto } = row.original

                return (
                    <div className="flex gap-x-2 items-center">
                        <InitialAvatar name={rto.user.name} small />
                        {rto.user.name}
                    </div>
                )
            },
        },
        {
            accessorKey: 'industry',
            header: () => <span>Industry</span>,
            cell: (info: any) => {
                const industry = info.row.original?.industries

                return industry && industry?.length > 0 ? (
                    <IndustryCellInfo industry={industry[0]} />
                ) : (
                    <Typography center>N/A</Typography>
                )
            },
        },
        {
            accessorKey: 'sectors',
            header: () => <span>Sectors</span>,
            cell: ({ row }: any) => {
                return <SectorCell student={row.original} />
            },
        },
        {
            accessorKey: 'progress',
            header: () => <span>Progress</span>,
            cell: ({ row }) => {
                const workplace = row.original.workplace[0]
                const industries = row.original?.industries
                const steps = checkWorkplaceStatus(workplace?.currentStatus)
                const studentStatus = checkStudentStatus(
                    row.original?.studentStatus
                )

                return industries?.length > 0 ? (
                    <StudentStatusProgressCell step={studentStatus} />
                ) : (
                    <ProgressCell
                        step={steps > 14 ? 14 : steps < 1 ? 1 : steps}
                    />
                )
            },
        },
        {
            header: () => 'Action',
            accessorKey: 'Action',
            cell: ({ row }: any) => {
                return (
                    <TableAction
                        options={tableActionOptions}
                        rowItem={row.original}
                    />
                )
            },
        },
    ]

    return (
        <div>
            {modal && modal}
            {passwordModal}
            {isError && <TechnicalError />}
            <Card noPadding>
                {isLoading ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && data?.data.length ? (
                    <Table
                        columns={Columns}
                        data={data.data}
                        enableRowSelection
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
                                        {pageSize(itemPerPage, setItemPerPage)}
                                        <div className="flex gap-x-2">
                                            {quickActions}
                                            {pagination(
                                                data?.pagination,
                                                setPage
                                            )}
                                        </div>
                                    </div>

                                    <div
                                        id="students-list"
                                        className="px-6 overflow-auto remove-scrollbar"
                                    >
                                        {table}
                                    </div>
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
