import {
    ActionButton,
    Button,
    Card,
    EmptyData,
    Filter,
    LoadingAnimation,
    RtoFilters,
    Table,
    TableAction,
    TableActionOption,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaEdit, FaEye, FaFileExport } from 'react-icons/fa'

import { AdminApi } from '@queries'
import { Industry, SubAdmin } from '@types'
import { ReactElement, useState } from 'react'
import { SubAdminCell } from './components'
import { useChangeStatus } from './hooks'
import { AcceptModal, RejectModal } from './modals'
import { useRouter } from 'next/router'

export const PendingSubAdmin = () => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const router = useRouter()
    const [filterAction, setFilterAction] = useState(null)
    const [itemPerPage, setItemPerPage] = useState(5)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState({})
    const { isLoading, data } = AdminApi.SubAdmins.useListQuery({
        search: `status:pending,${JSON.stringify(filter)
            .replaceAll('{', '')
            .replaceAll('}', '')
            .replaceAll('"', '')
            .trim()}`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    // console.log("::: Sub Admin DATA", data)

    const { changeStatusResult } = useChangeStatus()
    const onModalCancelClicked = () => {
        setModal(null)
    }
    const onAcceptClicked = (subAdmin: SubAdmin) => {
        setModal(
            <AcceptModal
                subAdmin={subAdmin}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }
    const onRejectClicked = (subAdmin: SubAdmin) => {
        setModal(
            <RejectModal
                subAdmin={subAdmin}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: () => {},
            Icon: FaEye,
        },
        {
            text: 'Edit',
            onClick: (row: any) => {
                router.push(
                    `/portals/admin/sub-admin/edit-sub-admin/${row?.id}`
                )
            },
            Icon: FaEdit,
        },
    ]

    const tableStatusOptions = (row: TableActionOption) => {
        return [
            {
                text: 'Approved',
                onClick: () => {},
                // Icon: FaEye,
            },
            {
                text: 'Reject',
                onClick: (row: any) => {
                    router.push(
                        `/portals/admin/sub-admin/edit-sub-admin/${row.id}`
                    )
                },
                // Icon: FaEdit,
            },
        ]
    }

    const columns: ColumnDef<SubAdmin>[] = [
        {
            accessorKey: 'user.name',
            cell: (info) => {
                return <SubAdminCell subAdmin={info.row.original} />
            },
            header: () => <span>Sub Admin</span>,
        },
        {
            accessorKey: 'id',
            header: () => <span>Coordinator ID</span>,
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'contactPerson',
            header: () => <span>Contact Person</span>,
            cell: (info) => {
                return (
                    <div>
                        {/* <p>{info.row.original.contactPerson}</p>
            <p className="text-xs text-gray-500">
              {info.row.original.contactPersonNumber}
            </p> */}
                    </div>
                )
            },
        },

        {
            accessorKey: 'address',
            header: () => <span>Address</span>,
            cell: (info) => info.getValue(),
        },

        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: (info: any) => {
                return (
                    <TableAction
                        options={tableActionOptions}
                        rowItem={info.row.original}
                    />
                )
            },
        },
    ]

    const quickActionsElements = {
        id: 'id',
        individual: (id: number) => (
            <div className="flex gap-x-2">
                <ActionButton variant="success" onClick={() => {}}>
                    Accept
                </ActionButton>
                <ActionButton variant="error" onClick={() => {}}>
                    Reject
                </ActionButton>
            </div>
        ),
        common: (ids: number[]) => (
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
                    title={'Pending Sub Admin'}
                    subtitle={'List of Pending Sub Admin'}
                >
                    {data && data?.data.length ? (
                        <>
                            {filterAction}
                            <Button
                                text="Export"
                                variant="action"
                                Icon={FaFileExport}
                            />
                        </>
                    ) : null}
                </PageHeading>

                {data && data?.data.length ? (
                    <Filter
                        component={RtoFilters}
                        initialValues={{ name: '', email: '', rtoCode: '' }}
                        setFilterAction={setFilterAction}
                        setFilter={setFilter}
                    />
                ) : null}

                <Card noPadding>
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
                            }: any) => {
                                return (
                                    <div>
                                        <div className="p-6 mb-2 flex justify-between">
                                            {pageSize(
                                                itemPerPage,
                                                setItemPerPage
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
                                    </div>
                                )
                            }}
                        </Table>
                    ) : (
                        <EmptyData
                            title={'No Pending Industry!'}
                            description={'You have no pending Industry'}
                            height={'50vh'}
                        />
                    )}
                </Card>
            </div>
        </>
    )
}
