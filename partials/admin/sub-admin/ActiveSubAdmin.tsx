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
    Typography,
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
import { useActionModal, useContextBar } from '@hooks'
import { AddSubAdminCB, ViewRtosCB, ViewSectorsCB } from './contextBar'
import { BsArchiveFill } from 'react-icons/bs'
import { RiLockPasswordFill } from 'react-icons/ri'

export const ActiveSubAdmin = () => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const router = useRouter()

    const contextBar = useContextBar()

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    // hooks
    const { passwordModal, onViewPassword } = useActionModal()

    const { isLoading, data, isError } = AdminApi.SubAdmins.useListQuery({
        search: `status:approved`,
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
            onClick: (subadmin: SubAdmin) => {
                onEditSubAdmin(subadmin)
            },
            Icon: FaEdit,
        },
        {
            text: 'View Password',
            onClick: (subAdmin: SubAdmin) => onViewPassword(subAdmin),
            Icon: RiLockPasswordFill,
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
            accessorKey: 'addressLine1',
            header: () => <span>Address</span>,
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'createdBy.role',
            header: () => <span>Created By</span>,
            cell: (info) => (
                <Typography>{info.row.original?.createdBy?.role}</Typography>
            ),
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
            {passwordModal && passwordModal}
            <div className="flex flex-col gap-y-4 mb-32">
                <PageHeading
                    title={'Active Sub Admin'}
                    subtitle={'List of Active Sub Admin'}
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
                                title={'No Active SubAdmin!'}
                                description={'You have no Active SubAdmin'}
                                height={'50vh'}
                            />
                        )
                    )}
                </Card>
            </div>
        </>
    )
}
