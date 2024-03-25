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
    Typography,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaEdit, FaEye, FaFileExport, FaTrash } from 'react-icons/fa'

import { useActionModal } from '@hooks'
import { AdminApi } from '@queries'
import { SubAdmin, UserStatus } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { RiLockPasswordFill } from 'react-icons/ri'
import { RtoCell, SectorCell, SubAdminCell } from './components'
import { AcceptModal, DeleteModal } from './modals'
import { UserRoles } from '@constants'
import { getUserCredentials } from '@utils'

export const BlockedSubAdmin = () => {
    const router = useRouter()
    const [changeStatusResult, setChangeStatusResult] = useState<any>({})
    const [modal, setModal] = useState<ReactElement | null>(null)

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])
    const role = getUserCredentials()?.role

    // hooks
    const { passwordModal, onViewPassword } = useActionModal()

    const { isLoading, data, isError, refetch } =
        AdminApi.SubAdmins.useListQuery({
            search: `status:${UserStatus.Blocked}`,
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        })
    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            refetch()
        }
    }, [changeStatusResult])

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
    const onDeleteClicked = (subAdmin: SubAdmin) => {
        setModal(
            <DeleteModal
                setChangeStatusResult={setChangeStatusResult}
                subAdmin={subAdmin}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const tableActionOptions = (subAdmin: any) => {
        return [
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
                onClick: (student: any) => {
                    router.push(
                        `/portals/admin/industry/edit-industry/${student.id}`
                    )
                },
                Icon: FaEdit,
            },
            {
                ...(role === UserRoles.ADMIN
                    ? {
                          text: 'View Password',
                          onClick: (subAdmin: SubAdmin) =>
                              onViewPassword(subAdmin),
                          Icon: RiLockPasswordFill,
                      }
                    : {}),
            },
            {
                text: 'Un-Block',
                onClick: (subAdmin: SubAdmin) => {
                    onAcceptClicked(subAdmin)
                },
                color: 'text-green-500 hover:bg-green-100 hover:border-green-200',
            },
            {
                ...(role === UserRoles.ADMIN
                    ? {
                          text: `${!subAdmin?.canAdmin && 'Delete'}`,
                          onClick: (subAdmin: SubAdmin) => {
                              onDeleteClicked(subAdmin)
                          },
                          Icon: FaTrash,
                          color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
                      }
                    : {}),
            },

            // {
            //     text: 'Delete',
            //     onClick: (subAdmin: SubAdmin) => {
            //         onDeleteClicked(subAdmin)
            //     },
            //     Icon: FaTrash,
            //     color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
            // },
        ]
    }

    const columns: ColumnDef<SubAdmin>[] = [
        {
            accessorKey: 'user.name',
            cell: (info) => {
                return <SubAdminCell subAdmin={info.row.original} />
            },
            header: () => <span>Name</span>,
        },
        {
            accessorKey: 'sector',
            header: () => <span>Sectors</span>,
            cell: (info) => <SectorCell subAdmin={info.row.original} />,
        },
        {
            accessorKey: 'rto',
            header: () => <span>RTOs</span>,
            cell: (info) => <RtoCell subAdmin={info.row.original} />,
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
                const actions = tableActionOptions(info?.row?.original)
                console.log('info?.row?.original', info?.row?.original)
                return (
                    <div className="flex gap-x-1 items-center">
                        <TableAction
                            options={actions}
                            rowItem={info.row.original}
                        />
                    </div>
                )
            },
        },
    ]

    const quickActionsElements = {
        id: 'id',
        individual: (id: SubAdmin) => (
            <div className="flex gap-x-2">
                <ActionButton Icon={FaEdit}>Edit</ActionButton>
                <ActionButton variant="success">Accept</ActionButton>
                {role === UserRoles.ADMIN && (
                    <ActionButton Icon={FaTrash} variant="error">
                        Delete
                    </ActionButton>
                )}
            </div>
        ),
        common: (ids: SubAdmin[]) => (
            <div className="flex gap-x-2">
                {role === UserRoles.ADMIN && (
                    <ActionButton Icon={FaTrash} variant="error">
                        Delete
                    </ActionButton>
                )}
                <ActionButton variant="success">Accept</ActionButton>
            </div>
        ),
    }

    return (
        <>
            {modal && modal}
            {passwordModal && passwordModal}
            <div className="flex flex-col gap-y-4 mb-32">
                <PageHeading
                    title={'Rejected Sub Admin'}
                    subtitle={'List of Rejected Sub Admin'}
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
                                title={'No Rejected Sub Admin!'}
                                description={
                                    'You have not rejected any Sub Admin request yet'
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
