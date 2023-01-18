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
import { SubAdminCell } from './components'
import { PageHeading } from '@components/headings'
import { AdminApi } from '@queries'
import { ColumnDef } from '@tanstack/react-table'
import { SubAdmin } from '@types'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FaEdit, FaEye, FaFileExport, FaTrash } from 'react-icons/fa'
import { MdUnarchive } from 'react-icons/md'
import { useContextBar } from '@hooks'
import { AddSubAdminCB } from './contextBar'

export const ArchivedSubAdmin = () => {
    const router = useRouter()
    const contextBar = useContextBar()
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    const { isLoading, data, isError } = AdminApi.SubAdmins.useListQuery({
        search: `status:archived`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    const onEditSubAdmin = (subAdmin: SubAdmin) => {
        contextBar.setContent(<AddSubAdminCB edit subAdmin={subAdmin} />)
        contextBar.setTitle('Edit SubAdmin')
        contextBar.show()
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
            text: 'Edit',
            onClick: (subadmin: SubAdmin) => {
                onEditSubAdmin(subadmin)
            },
            Icon: FaEdit,
        },
        {
            text: 'Unarchive',
            onClick: () => {},
            Icon: MdUnarchive,
            color: 'text-orange-500 hover:bg-orange-100 hover:border-orange-200',
        },
        {
            text: 'Delete',
            onClick: () => {},
            Icon: FaTrash,
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        },
    ]

    const columns: ColumnDef<SubAdmin>[] = [
        {
            accessorKey: 'user.name',
            cell: (info) => {
                return <SubAdminCell subAdmin={info.row.original} />
            },
            header: () => <span>Industry</span>,
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
            accessorKey: 'addressLine1',
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
        individual: (id: number) => (
            <div className="flex gap-x-2">
                <ActionButton Icon={MdUnarchive} variant="warning">
                    Unarchive
                </ActionButton>
                <ActionButton Icon={FaTrash} variant="error">
                    Delete
                </ActionButton>
            </div>
        ),
        common: (ids: number[]) => (
            <div className="flex gap-x-2">
                <ActionButton Icon={MdUnarchive} variant="warning">
                    Unarchive
                </ActionButton>
                <ActionButton Icon={FaTrash} variant="error">
                    Delete
                </ActionButton>
            </div>
        ),
    }

    return (
        <div className="flex flex-col gap-y-4 mb-32">
            <PageHeading
                title={'Archived Sub Admin'}
                subtitle={'List of Archived Sub Admin'}
            >
                {data && data?.data.length ? (
                    <Button
                        text="Export"
                        variant="action"
                        Icon={FaFileExport}
                    />
                ) : null}
            </PageHeading>

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
                                        {pageSize(itemPerPage, setItemPerPage)}
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
                            title={'No Archived SubAdmin!'}
                            description={
                                'You have not archived any SubAdmin request yet'
                            }
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
        </div>
    )
}
