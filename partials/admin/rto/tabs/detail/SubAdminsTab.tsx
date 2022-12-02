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
import { FaEdit, FaEye, FaFileExport } from 'react-icons/fa'

import { AdminApi } from '@queries'
import { MdBlock, MdEmail, MdPhoneIphone } from 'react-icons/md'
import { ReactElement, useState } from 'react'

import { Rto, SubAdmin } from '@types'
import { useContextBar } from '@hooks'
import { useRouter } from 'next/router'
import { SubAdminCell } from '@partials/admin/sub-admin'
import { DeleteModal } from '@partials/admin/sub-admin/modals'

export const SubAdminsTab = ({ rto }: any) => {
    console.log('rrr', rto)
    const router = useRouter()

    const [modal, setModal] = useState<ReactElement | null>(null)

    const [filterAction, setFilterAction] = useState(null)
    const [itemPerPage, setItemPerPage] = useState(5)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState({})
    const { isLoading, data } = AdminApi.Rtos.useRtoProfileSubAdmins({
        id: rto?.data?.user?.id,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    const onModalCancelClicked = () => {
        setModal(null)
    }
    const onDeleteClicked = (subAdmin: SubAdmin) => {
        setModal(
            <DeleteModal
                subAdmin={subAdmin}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const contextBar = useContextBar()

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: () => {},
            Icon: FaEye,
        },
        {
            text: 'Edit',
            onClick: (rto: SubAdmin) => {
                // router.push(`/portals/admin/rto/edit/${rto.id}`)
            },
            Icon: FaEdit,
        },
        {
            text: 'Delete',
            onClick: (subAdmin: SubAdmin) => onDeleteClicked(subAdmin),
            Icon: MdBlock,
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        },
    ]

    const columns: ColumnDef<SubAdmin>[] = [
        {
            accessorKey: 'user.name',
            cell: (info) => {
                return <SubAdminCell subAdmin={info.row.original} />
            },
            header: () => <span>Name</span>,
        },
        {
            accessorKey: 'email',
            header: () => <span>Email</span>,
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'phone',
            header: () => <span>Phone</span>,
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'assignedBy',
            header: () => <span>Assigned By</span>,
            cell: (info) => {
                return 'Assigned By'
            },
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
        individual: (item: SubAdmin) => (
            <div className="flex gap-x-2">
                <ActionButton Icon={FaEdit}>Edit</ActionButton>
                <ActionButton>Sub Admins</ActionButton>
                <ActionButton
                    Icon={MdBlock}
                    variant="error"
                    onClick={() => onDeleteClicked(item)}
                >
                    Block
                </ActionButton>
            </div>
        ),
        common: (items: SubAdmin[]) => (
            <ActionButton Icon={MdBlock} variant="error">
                Block
            </ActionButton>
        ),
    }

    return (
        <>
            {modal && modal}
            <div className="flex flex-col gap-y-4 mb-32">
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
                        <Table<SubAdmin>
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
