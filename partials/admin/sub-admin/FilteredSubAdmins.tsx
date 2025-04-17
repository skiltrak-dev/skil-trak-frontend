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
import { UserRoles } from '@constants'
import { getUserCredentials } from '@utils'
import { AllowPermissionModal } from './modals'
import { ReactElement, useState } from 'react'
import { PiCellSignalLowFill } from 'react-icons/pi'

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
    const [modal, setModal] = useState<ReactElement | null>(null)
    const router = useRouter()

    const contextBar = useContextBar()
    const role = getUserCredentials()?.role

    // hooks
    const { passwordModal, onViewPassword } = useActionModal()

    const onEditSubAdmin = (subAdmin: SubAdmin) => {
        contextBar.setContent(<AddSubAdminCB edit subAdmin={subAdmin} />)
        contextBar.setTitle('Edit SubAdmin')
        contextBar.show()
    }

    const onModalCancelClicked = () => setModal(null)

    const onAllowPermissionClicked = (subadmin: SubAdmin) => {
        setModal(
            <AllowPermissionModal
                subadmin={subadmin}
                onCancel={onModalCancelClicked}
            />
        )
    }

    const tableActionOptions: TableActionOption<any>[] = [
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
            text: 'New Profile',
            onClick: (subAdmin: any) => {
                router.push(`/portals/admin/sub-admin/${subAdmin?.id}/detail`)
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
            ...(role === UserRoles.ADMIN
                ? {
                      text: 'Permissions',
                      onClick: (subAdmin: SubAdmin) =>
                          onAllowPermissionClicked(subAdmin),
                      Icon: PiCellSignalLowFill,
                  }
                : {}),
        },
        {
            ...(role === UserRoles.ADMIN
                ? {
                      text: 'View Password',
                      onClick: (subAdmin: SubAdmin) => onViewPassword(subAdmin),
                      Icon: RiLockPasswordFill,
                  }
                : {}),
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
            cell: (info) => <SubAdminCell subAdmin={info.row.original} />,
            header: () => <span>Sub Admin</span>,
        },
        {
            accessorKey: 'sector',
            header: () => <span>Sectors</span>,
            cell: (info) => <SectorCell subAdmin={info.row.original} />,
        },
        {
            accessorKey: 'rto',
            header: () => <span>RTOs</span>,
            cell: (info) => {
                return <RtoCell subAdmin={info.row.original} />
            },
        },
        {
            accessorKey: 'studentCount',
            header: () => <span>Assigned Students</span>,
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
            cell: (info) => (
                <Typography variant={'small'} uppercase>
                    <span className="font-semibold">
                        {info.row.original?.createdBy?.role}
                    </span>
                </Typography>
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
        individual: (id: SubAdmin) => (
            <div className="flex gap-x-2">
                <ActionButton Icon={FaEdit}>Edit</ActionButton>
                <ActionButton>Sub Admins</ActionButton>
                <ActionButton Icon={MdBlock} variant="error">
                    Block
                </ActionButton>
            </div>
        ),
        common: (ids: SubAdmin[]) => (
            <ActionButton Icon={MdBlock} variant="error">
                Block
            </ActionButton>
        ),
    }

    return (
        <>
            {modal}
            {passwordModal}
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
