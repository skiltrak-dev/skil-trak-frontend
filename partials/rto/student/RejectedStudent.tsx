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
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'

import { useGetRtoStudentsQuery } from '@queries'
import { Student, UserStatus } from '@types'
import { studentsListWorkplace } from '@utils'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { IndustryCell, SectorCell, StudentCellInfo } from './components'
import { AcceptModal, DeleteModal } from './modals'

export const RejectedStudent = () => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    const router = useRouter()

    const { isLoading, data, isError } = useGetRtoStudentsQuery({
        search: `status:${UserStatus.Rejected}`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    const onModalCancelClicked = () => {
        setModal(null)
    }
    const onAcceptClicked = (item: Student) => {
        setModal(
            <AcceptModal item={item} onCancel={() => onModalCancelClicked()} />
        )
    }
    const onDeleteClicked = (item: Student) => {
        setModal(
            <DeleteModal item={item} onCancel={() => onModalCancelClicked()} />
        )
    }

    const tableActionOptions: TableActionOption<Student>[] = [
        {
            text: 'View',
            onClick: (student) => {
                router.push(
                    `/portals/rto/students-and-placements/all-students/${student.id}/detail`
                )
            },
            Icon: FaEye,
        },
        {
            text: 'Accept',
            onClick: (student) => {
                onAcceptClicked(student)
            },
            color: 'text-green-500 hover:bg-green-100 hover:border-green-200',
        },

        {
            text: 'Delete',
            onClick: (student) => {
                onDeleteClicked(student)
            },
            Icon: FaTrash,
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        },
    ]

    const columns: ColumnDef<Student>[] = [
        {
            accessorKey: 'user.name',
            cell: (info) => (
                <StudentCellInfo
                    link={`/portals/rto/students-and-placements/all-students/${info.row.original.id}/detail`}
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
            cell: (info) => <SectorCell student={info.row.original} />,
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
                <ActionButton Icon={FaEdit}>Edit</ActionButton>
                <ActionButton variant="success">Accept</ActionButton>
                <ActionButton Icon={FaTrash} variant="error">
                    Delete
                </ActionButton>
            </div>
        ),
        common: (ids: Student[]) => (
            <div className="flex gap-x-2">
                <ActionButton variant="success">Accept</ActionButton>
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
                    title={'Rejected Students'}
                    subtitle={'List of Rejected Students'}
                >
                    {data && data?.data.length ? (
                        <Button
                            text="Export"
                            variant="action"
                            Icon={FaFileExport}
                        />
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
                                title={'No Rejected Student!'}
                                description={
                                    'You have not rejected any Student request yet'
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
