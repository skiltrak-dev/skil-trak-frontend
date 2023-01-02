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
    TechnicalError,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaEdit, FaEye, FaFileExport } from 'react-icons/fa'

import { AdminApi } from '@queries'
import { SubAdmin } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { RtoCell, SectorCell, SubAdminCell } from './components'
import { useChangeStatus } from './hooks'
import { AcceptModal, ArchiveModal, RejectModal } from './modals'
import { useContextBar } from '@hooks'
import { ViewRtosCB, ViewSectorsCB } from './contextBar'
import { BsArchiveFill } from 'react-icons/bs'

export const ActiveSubAdmin = () => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const router = useRouter()

    const contextBar = useContextBar()

    const [filterAction, setFilterAction] = useState(null)
    const [itemPerPage, setItemPerPage] = useState(5)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState({})
    const { isLoading, data, isError } = AdminApi.SubAdmins.useListQuery({
        search: `status:approved,${JSON.stringify(filter)
            .replaceAll('{', '')
            .replaceAll('}', '')
            .replaceAll('"', '')
            .trim()}`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    const onModalCancelClicked = () => {
        setModal(null)
    }
    const onArchivedClicked = (subAdmin: SubAdmin) => {
        setModal(
            <ArchiveModal
                item={subAdmin}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: (subAdmin: any) => {
                router.push(
                    `/portals/admin/sub-admin/${subAdmin?.id}?tab=notes`
                )
            },
            Icon: FaEye,
        },
        {
            text: 'Assign Courses',
            onClick: (subAdmin: any) => {
                contextBar.setTitle('Sectors & Courses')
                contextBar.setContent(<ViewSectorsCB subAdmin={subAdmin} />)
                contextBar.show()
            },
        },
        {
            text: 'Assign RTO',
            onClick: (subAdmin: any) => {
                contextBar.setTitle('Assigned RTOs')
                contextBar.setContent(<ViewRtosCB subAdmin={subAdmin} />)
                contextBar.show()
            },
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
        {
            text: 'Archive',
            onClick: (subAdmin: SubAdmin) => onArchivedClicked(subAdmin),
            Icon: BsArchiveFill,
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        },
    ]

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
            header: () => <span>Sectors</span>,
            cell: (info) => {
                return <SectorCell subAdmin={info.row.original} />
            },
        },
        {
            accessorKey: 'id',
            header: () => <span>RTOs</span>,
            cell: (info) => {
                return <RtoCell subAdmin={info.row.original} />
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
                    title={'Active Sub Admin'}
                    subtitle={'List of Active Sub Admin'}
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
                        !isError && (
                            <EmptyData
                                title={'No Pending Industry!'}
                                description={'You have no pending Industry'}
                                height={'50vh'}
                            />
                        )
                    )}
                </Card>
            </div>
        </>
    )
}
