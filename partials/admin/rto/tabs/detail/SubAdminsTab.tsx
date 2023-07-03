import {
    ActionButton,
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TableAction,
    TableActionOption,
    TableChildrenProps,
} from '@components'
import { ColumnDef } from '@tanstack/react-table'
import { FaEdit, FaEye } from 'react-icons/fa'

import { AdminApi } from '@queries'
import { ReactElement, useEffect, useState } from 'react'
import { MdBlock } from 'react-icons/md'

import { useContextBar } from '@hooks'
import { SubAdminCell } from '@partials/admin/sub-admin'
import { DeleteModal } from '@partials/admin/sub-admin/modals'
import { RTOSubAdmin, SubAdmin } from '@types'
import { useRouter } from 'next/router'

export const SubAdminsTab = ({ rto }: any) => {
    const [changeStatusResult, setChangeStatusResult] = useState<any>({})
    const router = useRouter()

    const [modal, setModal] = useState<ReactElement | null>(null)

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const { isLoading, data, refetch } = AdminApi.Rtos.useRtoProfileSubAdmins({
        id: Number(rto?.data?.user?.id),
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
    const onDeleteClicked = (subAdmin: SubAdmin) => {
        setModal(
            <DeleteModal
                setChangeStatusResult={setChangeStatusResult}
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

    const columns: ColumnDef<RTOSubAdmin>[] = [
        {
            accessorKey: 'user.name',
            cell: (info) => (
                <SubAdminCell subAdmin={info.row.original as RTOSubAdmin} />
            ),
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
                <Card noPadding>
                    {isLoading ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : data && data?.data.length ? (
                        <Table<RTOSubAdmin>
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
                            }: TableChildrenProps) => {
                                return (
                                    <div>
                                        <div className="p-6 mb-2 flex justify-between">
                                            {pageSize
                                                ? pageSize(
                                                      itemPerPage,
                                                      setItemPerPage
                                                  )
                                                : null}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination
                                                    ? pagination(
                                                          data?.pagination,
                                                          setPage
                                                      )
                                                    : null}
                                            </div>
                                        </div>
                                        <div className="px-6">{table}</div>
                                    </div>
                                )
                            }}
                        </Table>
                    ) : (
                        <EmptyData
                            title={'No Sub Admin were found!'}
                            description={
                                'There is no any Sub Admin detail on your request'
                            }
                            height={'50vh'}
                        />
                    )}
                </Card>
            </div>
        </>
    )
}
