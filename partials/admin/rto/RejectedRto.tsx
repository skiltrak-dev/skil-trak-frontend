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
    TruncatedTextWithTooltip,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaEdit, FaEye, FaFileExport, FaTrash } from 'react-icons/fa'

import { AdminApi } from '@queries'
import { Rto, UserStatus } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { RtoCellInfo } from './components'
import {
    AcceptModal,
    AdminRtoModalType,
    DeleteModal,
    getAdminRtoModal,
} from './modals'
import { UserRoles } from '@constants'
import { getUserCredentials } from '@utils'
import { useModal } from '@hooks'

export const RejectedRto = () => {
    // const [modal, setModal] = useState<ReactElement | null>(null)
    const router = useRouter()

    const [filterAction, setFilterAction] = useState(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState({})
    const role = getUserCredentials()?.role
    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    const { modal, openModal, closeModal } = useModal()

    const handleOpenModal = (type: AdminRtoModalType, rto: Rto) => {
        openModal(getAdminRtoModal(type, rto, closeModal))
    }

    const { isLoading, data, isError } = AdminApi.Rtos.useListQuery({
        search: `status:${UserStatus.Rejected}`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: (rto: any) => {
                router.push(`/portals/admin/rto/${rto.id}?tab=sectors`)
            },
            Icon: FaEye,
        },
        {
            text: 'New Profile',
            onClick: (rto: any) => {
                router.push(`/portals/admin/rto/${rto.id}/detail`)
            },
            Icon: FaEye,
        },
        {
            text: 'Edit',
            onClick: (rto: Rto) => {
                router.push(`/portals/admin/rto/${rto.id}/edit-profile`)
            },
            Icon: FaEdit,
        },
        {
            text: 'Accept',
            onClick: (rto: Rto) =>
                handleOpenModal(AdminRtoModalType.ACCEPT, rto),
            color: 'text-green-500 hover:bg-green-100 hover:border-green-200',
        },
        {
            ...(role === UserRoles.ADMIN
                ? {
                      text: 'Delete',
                      onClick: (rto: Rto) =>
                          handleOpenModal(AdminRtoModalType.DELETE, rto),
                      Icon: FaTrash,
                      color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
                  }
                : {}),
        },

        // {
        //     text: 'Delete',
        //     onClick: (rto: Rto) => onDeleteClicked(rto),
        //     Icon: FaTrash,
        //     color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        // },
    ]

    const columns: ColumnDef<Rto>[] = [
        {
            accessorKey: 'user.name',
            cell: (info) => <RtoCellInfo rto={info.row.original} />,
            header: () => <span>Name</span>,
        },
        {
            accessorKey: 'rtoCode',
            header: () => <span>Code</span>,
            cell: (info) => info.getValue(),
        },

        {
            accessorKey: 'sectors',
            header: () => <span>Sectors</span>,
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'suburb',
            header: () => <span>Address</span>,
            cell: (info) => (
                <TruncatedTextWithTooltip
                    text={info?.row?.original?.addressLine1}
                />
            ),
        },
        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: (info) => (
                <div className="flex gap-x-1 items-center">
                    <TableAction
                        options={tableActionOptions}
                        rowItem={info.row.original}
                    />
                </div>
            ),
        },
    ]

    const quickActionsElements = {
        id: 'id',
        individual: (item: Rto) => (
            <div className="flex gap-x-2">
                <ActionButton Icon={FaEdit}>Edit</ActionButton>
                <ActionButton
                    variant="success"
                    onClick={() =>
                        handleOpenModal(AdminRtoModalType.ACCEPT, item)
                    }
                >
                    Accept
                </ActionButton>
                <ActionButton
                    Icon={FaTrash}
                    variant="error"
                    onClick={() =>
                        handleOpenModal(AdminRtoModalType.DELETE, item)
                    }
                >
                    Delete
                </ActionButton>
            </div>
        ),
        common: (items: Rto[]) => (
            <div className="flex gap-x-2">
                <ActionButton variant="success">Accept</ActionButton>
                <ActionButton Icon={FaTrash} variant="error">
                    Delete
                </ActionButton>
            </div>
        ),
    }

    return (
        <>
            {modal && modal}
            <div className="flex flex-col gap-y-4 mb-32">
                <PageHeading
                    title={'Rejected RTOs'}
                    subtitle={'List of Rejected RTOs'}
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
                                title={'No Rejected RTO!'}
                                description={
                                    'You have not rejected any RTO request yet'
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
