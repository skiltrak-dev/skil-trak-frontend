import {
    ActionButton,
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TableAction,
    TableActionOption,
    TableChildrenProps,
    TechnicalError,
} from '@components'
import { ColumnDef } from '@tanstack/react-table'
import { FaEye } from 'react-icons/fa'

import { useGetRtoStudentsQuery } from '@queries'
import { Student, UserStatus } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { StudentCellInfo } from './components'
import { AcceptModal, RejectModal } from './modals'

export const PendingStudent = () => {
    const router = useRouter()
    const [modal, setModal] = useState<ReactElement | null>(null)

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const { isLoading, data, isError, isSuccess } = useGetRtoStudentsQuery({
        search: `status:${UserStatus.Pending}`,
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
    const onRejectClicked = (item: Student) => {
        setModal(
            <RejectModal item={item} onCancel={() => onModalCancelClicked()} />
        )
    }

    const tableActionOptions: TableActionOption<Student>[] = [
        {
            text: 'View',
            onClick: (student) => {
                router.push(`/portals/rto/students/${student.id}`)
            },
            Icon: FaEye,
        },
        {
            text: 'Approve',
            onClick: (student) => onAcceptClicked(student),
            Icon: FaEye,
        },
        {
            text: 'Reject',
            onClick: (student) => onRejectClicked(student),
            Icon: FaEye,
        },
    ]

    const columns: ColumnDef<Student>[] = [
        {
            accessorKey: 'user.name',
            cell: (info) => <StudentCellInfo student={info.row.original} />,
            header: () => <span>Student</span>,
        },
        {
            accessorKey: 'phone',
            header: () => <span>Phone</span>,
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'suburb',
            header: () => <span>Address</span>,
            cell: (info) => info.getValue(),
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
                <ActionButton variant="success" onClick={() => {}}>
                    Accept
                </ActionButton>
                <ActionButton variant="error" onClick={() => {}}>
                    Reject
                </ActionButton>
            </div>
        ),
        common: (ids: Student[]) => (
            <ActionButton variant="error" onClick={() => {}}>
                Reject
            </ActionButton>
        ),
    }

    return (
        <>
            {modal}
            <div className="flex flex-col gap-y-4">
                {/* <PageHeading
                    title={'Pending Students'}
                    subtitle={'List of Pending Students'}
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
                    ) : data?.data && data?.data?.length && isSuccess ? (
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
                            }: TableChildrenProps) => {
                                return (
                                    <div>
                                        <div className="p-6 mb-2 flex justify-between">
                                            {pageSize &&
                                                pageSize(
                                                    itemPerPage,
                                                    setItemPerPage,
                                                    data?.data?.length
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
                                        <div className="px-6">{table}</div>
                                        {data?.data?.length > 10 && (
                                            <div className="p-6 mb-2 flex justify-between">
                                                {pageSize &&
                                                    pageSize(
                                                        itemPerPage,
                                                        setItemPerPage,
                                                        data?.data?.length
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
                                        )}
                                    </div>
                                )
                            }}
                        </Table>
                    ) : isSuccess ? (
                        <EmptyData
                            title={'No Pending Student!'}
                            description={
                                'You have no pending Student request yet'
                            }
                            height={'50vh'}
                        />
                    ) : null}
                </Card>
            </div>
        </>
    )
}
