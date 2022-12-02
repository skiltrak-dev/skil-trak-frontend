import {
    Button,
    ActionButton,
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
import { FaEdit, FaEye, FaFileExport, FaFilter } from 'react-icons/fa'

import { AdminApi } from '@queries'
import { MdBlock, MdEmail, MdPhoneIphone } from 'react-icons/md'
import { ReactElement, useState } from 'react'
import { RtoCellInfo, SectorCell } from './components'
import { useChangeStatus } from './hooks'
import { Rto } from '@types'
import { BlockModal } from './modals'
import { useContextBar } from '@hooks'
import { ViewSubAdminsCB } from './contextBar'
import { useRouter } from 'next/router'

export const ApprovedRto = () => {
    const router = useRouter()

    const [modal, setModal] = useState<ReactElement | null>(null)

    const [filterAction, setFilterAction] = useState(null)
    const [itemPerPage, setItemPerPage] = useState(5)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState({})
    const { isLoading, data } = AdminApi.Rtos.useListQuery({
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
    const onBlockClicked = (rto: Rto) => {
        setModal(
            <BlockModal rto={rto} onCancel={() => onModalCancelClicked()} />
        )
    }

    const contextBar = useContextBar()
    const onViewSubAdminsClicked = (rto: Rto) => {
        contextBar.setTitle('Sub Admins')
        contextBar.setContent(<ViewSubAdminsCB rto={rto} />)
        contextBar.show()
    }

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: () => {},
            Icon: FaEye,
        },
        {
            text: 'Edit',
            onClick: (rto: Rto) => {
                router.push(`/portals/admin/rto/edit/${rto.id}`)
            },
            Icon: FaEdit,
        },
        {
            text: 'Sub Admins',
            onClick: (item: any) => {
                onViewSubAdminsClicked(item)
            },
            Icon: FaEdit,
        },
        {
            text: 'Block',
            onClick: (rto: Rto) => onBlockClicked(rto),
            Icon: MdBlock,
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        },
    ]

    const columns: ColumnDef<Rto>[] = [
        {
            accessorKey: 'user.name',
            cell: (info) => {
                return <RtoCellInfo rto={info.row.original} />
            },
            header: () => <span>Name</span>,
        },
        {
            accessorKey: 'rtoCode',
            header: () => <span>Code</span>,
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'students',
            header: () => <span>Students</span>,
            cell: (info) => info?.row?.original?.students.length,
        },
        {
            accessorKey: 'sectors',
            header: () => <span>Sectors</span>,
            cell: (info) => {
                return <SectorCell rto={info.row.original} />
            },
        },
        {
            accessorKey: 'suburb',
            header: () => <span>Address</span>,
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: ({ row }: any) => {
                return (
                    <div className="flex gap-x-1 items-center">
                        <TableAction
                            options={tableActionOptions}
                            rowItem={row.original}
                        />
                    </div>
                )
            },
        },
    ]

    const quickActionsElements = {
        id: 'id',
        individual: (item: Rto) => (
            <div className="flex gap-x-2">
                <ActionButton Icon={FaEdit}>Edit</ActionButton>
                <ActionButton>Sub Admins</ActionButton>
                <ActionButton
                    Icon={MdBlock}
                    variant="error"
                    onClick={() => onBlockClicked(item)}
                >
                    Block
                </ActionButton>
            </div>
        ),
        common: (items: Rto[]) => (
            <ActionButton Icon={MdBlock} variant="error">
                Block
            </ActionButton>
        ),
    }

    return (
        <>
            {modal && modal}
            <div className="flex flex-col gap-y-4 mb-32">
                <PageHeading
                    title={'Approved RTOs'}
                    subtitle={'List of Approved RTOs'}
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
                        <Table<Rto>
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
                            title={'No Approved RTO!'}
                            description={
                                'You have not approved any RTO request yet'
                            }
                            height={'50vh'}
                        />
                    )}
                </Card>
            </div>
        </>
    )
}
