import {
    ActionButton,
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TableAction,
    TableActionOption,
    Typography,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaEdit, FaEye } from 'react-icons/fa'

import { useActionModal, useContextBar } from '@hooks'
import { SubAdmin } from '@types'
import { useRouter } from 'next/router'
import { MdBlock } from 'react-icons/md'
import { RtoCell, SectorCell, SubAdminCell } from './components'
import { AddSubAdminCB, ViewRtosCB, ViewSectorsCB } from './contextBar'
import { RiLockPasswordFill } from 'react-icons/ri'

export const FilteredSubAdmins = ({
    subAdmin,
    setPage,
    itemPerPage,
    setItemPerPage,
}: {
    subAdmin: any
    setPage: any
    itemPerPage: any
    setItemPerPage: any
}) => {
    const router = useRouter()

    const contextBar = useContextBar()

    // hooks
    const { passwordModal, onViewPassword } = useActionModal()

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
            onClick: (subadmin: SubAdmin) => onEditSubAdmin(subadmin),
            Icon: FaEdit,
        },
        {
            text: 'View Password',
            onClick: (subAdmin: SubAdmin) => onViewPassword(subAdmin),
            Icon: RiLockPasswordFill,
        },
        // {
        //     text: 'Archive',
        //     onClick: (subAdmin: SubAdmin) => onArchivedClicked(subAdmin),
        //     Icon: BsArchiveFill,
        //     color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        // },
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
            accessorKey: 'sector',
            header: () => <span>Sectors</span>,
            cell: (info) => {
                return <SectorCell subAdmin={info.row.original} />
            },
        },
        {
            accessorKey: 'rto',
            header: () => <span>RTOs</span>,
            cell: (info) => {
                return <RtoCell subAdmin={info.row.original} />
            },
        },
        {
            accessorKey: 'user.status',
            header: () => <span>Status</span>,
            cell: (info) => (
                <Typography variant={'small'} uppercase>
                    <span className="font-semibold">
                        {info.row.original?.user?.status}
                    </span>
                </Typography>
            ),
        },

        {
            accessorKey: 'addressLine1',
            header: () => <span>Address</span>,
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'Created By',
            header: () => <span>Created By</span>,
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
                <ActionButton Icon={FaEdit}>Edit</ActionButton>
                <ActionButton>Sub Admins</ActionButton>
                <ActionButton Icon={MdBlock} variant="error">
                    Block
                </ActionButton>
            </div>
        ),
        common: (ids: number[]) => (
            <ActionButton Icon={MdBlock} variant="error">
                Block
            </ActionButton>
        ),
    }

    return (
        <>
            {passwordModal && passwordModal}
            <div className="flex flex-col gap-y-4 p-4">
                <PageHeading
                    title={'Filtered Sub Admins'}
                    subtitle={'List of Filtered Sub Admins'}
                />

                <Card noPadding>
                    {subAdmin?.isLoading || subAdmin?.isFetching ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : subAdmin?.data && subAdmin?.data?.data.length ? (
                        <Table
                            columns={columns}
                            data={subAdmin?.data.data}
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
                                                    subAdmin?.data?.pagination,
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
                            title={'No Sub Admins in your Search!'}
                            description={'No Sub Admins in your Search yet'}
                            height={'50vh'}
                        />
                    )}
                </Card>
            </div>
        </>
    )
}
