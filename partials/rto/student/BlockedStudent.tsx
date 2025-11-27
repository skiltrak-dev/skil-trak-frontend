import {
    ActionButton,
    Card,
    CaseOfficerAssignedStudent,
    EmptyData,
    LoadingAnimation,
    StudentExpiryDaysLeft,
    Table,
    TableAction,
    TableActionOption,
    TableChildrenProps,
    TechnicalError,
    Typography,
} from '@components'
import { ColumnDef } from '@tanstack/react-table'
import { FaEye, FaTrash } from 'react-icons/fa'

import { useGetRtoStudentsQuery } from '@queries'
import { Student, UserStatus } from '@types'
import { studentsListWorkplace } from '@utils'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { CgUnblock } from 'react-icons/cg'
import { IndustryCell, SectorCell, StudentCellInfo } from './components'
import { DeleteModal, UnblockModal } from './modals'

export const BlockedStudent = () => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const router = useRouter()

    const { isLoading, data, isError } = useGetRtoStudentsQuery({
        search: `status:${UserStatus.Blocked}`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    const onModalCancelClicked = () => {
        setModal(null)
    }
    const onUnblockClicked = (student: Student) => {
        setModal(
            <UnblockModal
                item={student}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }
    const onDeleteClicked = (student: Student) => {
        setModal(
            <DeleteModal
                item={student}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const tableActionOptions: TableActionOption<any>[] = [
        {
            text: 'View',
            // onClick: (student: Student) => {
            //     router.push(
            //         `/portals/rto/students-and-placements/all-students/${student?.id}/detail`
            //     )
            // },
            onClick: (student: Student) => {
                router.push(`/portals/rto/students/${student.id}`)
            },
            Icon: FaEye,
        },
        {
            text: 'Unblock',
            onClick: (student: Student) => onUnblockClicked(student),
            Icon: CgUnblock,
            color: 'text-orange-500 hover:bg-orange-100 hover:border-orange-200',
        },
        {
            text: 'Delete',
            onClick: (student: Student) => onDeleteClicked(student),
            Icon: FaTrash,
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        },
    ]

    const columns: ColumnDef<Student>[] = [
        {
            accessorKey: 'user.name',
            cell: (info) => (
                <StudentCellInfo
                    // link={`/portals/rto/students-and-placements/all-students/${info.row.original.id}/detail`}
                    student={info.row.original}
                />
            ),
            header: () => <span>Student</span>,
        },
        {
            accessorKey: 'phone',
            header: () => <span>Phone</span>,
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'industry',
            header: () => <span>Industry</span>,
            cell: (info: any) => {
                const industry = info.row.original?.industries

                const appliedIndustry = studentsListWorkplace(
                    info.row.original?.workplace
                )

                return industry && industry?.length > 0 ? (
                    <IndustryCell industry={industry[0]} />
                ) : info.row.original?.workplace &&
                  info.row.original?.workplace?.length > 0 &&
                  appliedIndustry ? (
                    <IndustryCell industry={appliedIndustry} />
                ) : (
                    <Typography center>N/A</Typography>
                )
            },
        },
        {
            accessorKey: 'sectors',
            header: () => <span>Sectors</span>,
            cell: (info) => {
                return <SectorCell student={info.row.original} />
            },
        },
        {
            accessorKey: 'batch',
            header: () => <span>Batch</span>,
            cell: ({ row }) => (
                <Typography whiteSpacePre variant="small" medium>
                    {row?.original?.batch}
                </Typography>
            ),
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
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: (info) => (
                <div className="flex gap-x-1 items-center">
                    <TableAction
                        options={tableActionOptions}
                        rowItem={info.row.original}
                    />
                </div>
            ),
        },
    ]

    const quickActionsElements = {
        id: 'id',
        individual: (id: Student) => (
            <div className="flex gap-x-2">
                <ActionButton>Sub Admins</ActionButton>
                <ActionButton Icon={CgUnblock} variant="warning">
                    Unblock
                </ActionButton>
                <ActionButton Icon={FaTrash} variant="error">
                    Delete
                </ActionButton>
            </div>
        ),
        common: (ids: Student[]) => (
            <div className="flex gap-x-2">
                <ActionButton Icon={CgUnblock} variant="warning">
                    Unblock
                </ActionButton>
                <ActionButton Icon={FaTrash} variant="error">
                    Delete
                </ActionButton>
            </div>
        ),
    }

    return (
        <>
            {modal}
            <div className="flex flex-col gap-y-4">
                {/* <PageHeading
                    title={'Blocked Students'}
                    subtitle={'List of Blocked Students'}
                >
                    {data && data?.data.length ? (
                        <>
                            <Button
                                text="Export"
                                variant="action"
                                Icon={FaFileExport}
                            />
                        </>
                    ) : null}
                </PageHeading> */}

                <Card noPadding>
                    {isError && <TechnicalError />}
                    {isLoading ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : data && data?.data.length ? (
                        <Table
                            columns={columns}
                            data={data.data}
                            quickActions={quickActionsElements}
                            enableRowSelection
                        >
                            {({
                                table,
                                pagination,
                                pageSize,
                                quickActions,
                            }: TableChildrenProps) => (
                                <div>
                                    <div className="p-6 mb-2 flex justify-between">
                                        {pageSize &&
                                            pageSize(
                                                itemPerPage,
                                                setItemPerPage
                                            )}
                                        <div className="flex gap-x-2">
                                            {quickActions}
                                            {pagination &&
                                                pagination(
                                                    data?.pagination,
                                                    setPage
                                                )}
                                        </div>
                                    </div>
                                    <div className="px-6 overflow-auto">
                                        {table}
                                    </div>
                                </div>
                            )}
                        </Table>
                    ) : (
                        !isError && (
                            <EmptyData
                                title={'No Blocked Student!'}
                                description={
                                    'There is no any blocked Student yet'
                                }
                                height={'50vh'}
                            />
                        )
                    )}
                </Card>
            </div>
        </>
    )
}
