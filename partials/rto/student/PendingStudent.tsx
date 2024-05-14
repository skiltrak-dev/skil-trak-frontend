import {
    ActionButton,
    Button,
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TableAction,
    TableActionOption,
    TechnicalError,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaEye, FaFileExport } from 'react-icons/fa'

import { useContextBar } from '@hooks'
import { useGetRtoStudentsQuery } from '@queries'
import { Student, UserStatus } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { StudentCellInfo } from './components'
import { useChangeStatus } from './hooks'
import { AcceptModal, RejectModal } from './modals'

export const PendingStudent = () => {
    const router = useRouter()
    const contextBar = useContextBar()
    const [modal, setModal] = useState<ReactElement | null>(null)

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const { isLoading, data, isError } = useGetRtoStudentsQuery({
        search: `status:${UserStatus.Pending}`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    const { changeStatusResult } = useChangeStatus()
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

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: (student: StudentSubAdmin) => {
                router.push(`/portals/rto/students/${student.id}`)
            },
            Icon: FaEye,
        },
        {
            text: 'Approve',
            onClick: (student: StudentSubAdmin) => onAcceptClicked(student),
            Icon: FaEye,
        },
        {
            text: 'Reject',
            onClick: (student: StudentSubAdmin) => onRejectClicked(student),
            Icon: FaEye,
        },
    ]

    const columns: ColumnDef<Student>[] = [
        {
            accessorKey: 'user.name',
            cell: (info) => {
                return <StudentCellInfo student={info.row.original} />
            },
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
            cell: (info: any) => {
                return (
                    <div className="flex gap-x-1 items-center">
                        <TableAction
                            options={tableActionOptions}
                            rowItem={info.row.original}
                        />
                    </div>
                )
            },
        },
    ]

    const quickActionsElements = {
        id: 'id',
        individual: (id: StudentSubAdmin) => (
            <div className="flex gap-x-2">
                <ActionButton variant="success" onClick={() => {}}>
                    Accept
                </ActionButton>
                <ActionButton variant="error" onClick={() => {}}>
                    Reject
                </ActionButton>
            </div>
        ),
        common: (ids: Student) => (
            <ActionButton variant="error" onClick={() => {}}>
                Reject
            </ActionButton>
        ),
    }

    return (
        <>
            {modal && modal}
            <div className="flex flex-col gap-y-4 mb-32">
                <PageHeading
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
                </PageHeading>

                <Card noPadding>
                    {isError && <TechnicalError />}
                    {isLoading ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : data && data?.data?.length ? (
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
                                        <div className="px-6">{table}</div>
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
                        <EmptyData
                            title={'No Pending Student!'}
                            description={
                                'You have no pending Student request yet'
                            }
                            height={'50vh'}
                        />
                    )}
                </Card>
            </div>
        </>
    )
}
