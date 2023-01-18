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
import { FaEdit, FaEye, FaFileExport, FaTrash } from 'react-icons/fa'

import { AdminApi } from '@queries'
import { Industry } from '@types'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { MdUnarchive } from 'react-icons/md'
import { IndustryCell } from './components'

// hooks
import { useActionModal } from '@hooks'
import { RiLockPasswordFill } from 'react-icons/ri'

export const ArchivedIndustry = () => {
    const router = useRouter()
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    // hooks
    const { passwordModal, onViewPassword } = useActionModal()

    const { isLoading, data, isError } = AdminApi.Industries.useListQuery({
        search: `status:archived`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: (industry: any) => {
                router.push(
                    `/portals/admin/industry/${industry.id}?tab=sectors`
                )
            },
            Icon: FaEye,
        },
        {
            text: 'Edit',
            onClick: (row: any) => {
                router.push(`/portals/admin/industry/edit-industry/${row.id}`)
            },
            Icon: FaEdit,
        },
        {
            text: 'View Password',
            onClick: (industry: Industry) => onViewPassword(industry),
            Icon: RiLockPasswordFill,
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

    const columns: ColumnDef<Industry>[] = [
        {
            accessorKey: 'user.name',
            cell: (info) => {
                return <IndustryCell industry={info.row.original} />
            },
            header: () => <span>Industry</span>,
        },
        {
            accessorKey: 'abn',
            header: () => <span>ABN</span>,
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'contactPerson',
            header: () => <span>Contact Person</span>,
            cell: (info) => {
                return (
                    <div>
                        <p>{info.row.original.contactPerson}</p>
                        <p className="text-xs text-gray-500">
                            {info.row.original.contactPersonNumber}
                        </p>
                    </div>
                )
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
        <>
            {passwordModal && passwordModal}
            <div className="flex flex-col gap-y-4 mb-32">
                <PageHeading
                    title={'Archived Industries'}
                    subtitle={'List of Archived Industries'}
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
                                title={'No Archived Industry!'}
                                description={
                                    'You have not archived any Industry request yet'
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
