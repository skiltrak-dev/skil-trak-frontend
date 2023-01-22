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
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/router'
import { FaEdit, FaEye, FaFileExport } from 'react-icons/fa'

import { useContextBar } from '@hooks'
import { AdminApi } from '@queries'
import { Rto } from '@types'
import { ReactElement, useState } from 'react'
import { RtoCellInfo, SectorCell } from './components'
import { useChangeStatus } from './hooks'
import { AcceptModal, RejectModal } from './modals'

export const PendingRto = () => {
    const contextBar = useContextBar()
    const [modal, setModal] = useState<ReactElement | null>(null)
    const router = useRouter()

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const { isLoading, data, isError } = AdminApi.Rtos.useListQuery({
        search: `status:pending`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    const { changeStatusResult } = useChangeStatus()

    const onModalCancelClicked = () => {
        setModal(null)
    }
    const onAcceptClicked = (rto: Rto) => {
        setModal(
            <AcceptModal rto={rto} onCancel={() => onModalCancelClicked()} />
        )
    }
    const onRejectClicked = (rto: Rto) => {
        setModal(
            <RejectModal rto={rto} onCancel={() => onModalCancelClicked()} />
        )
    }

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: (rto: any) => {
                router.push(`/portals/admin/rto/${rto.id}?tab=sectors`)
            },
            Icon: FaEye,
        },
        {
            text: 'Edit',
            onClick: () => {},
            Icon: FaEdit,
        },
    ]

    const columns: ColumnDef<any>[] = [
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
            cell: (info) => <SectorCell rto={info.row.original} />,
        },
        {
            accessorKey: 'suburb',
            header: () => <span>Address</span>,
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: (info) => (
                <div className="flex gap-x-1 items-center">
                    <ActionButton
                        variant="success"
                        onClick={() => onAcceptClicked(info.row.original)}
                        loading={changeStatusResult.isLoading}
                        disabled={changeStatusResult.isLoading}
                    >
                        Accept
                    </ActionButton>
                    <ActionButton
                        variant="error"
                        onClick={() => onRejectClicked(info.row.original)}
                        loading={changeStatusResult.isLoading}
                        disabled={changeStatusResult.isLoading}
                    >
                        Reject
                    </ActionButton>

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
            <div className="flex flex-col gap-y-4 mb-32">
                <PageHeading
                    title={'Pending RTOs'}
                    subtitle={'List of Pending RTOs'}
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
                                title={'No Pending RTO!'}
                                description={
                                    'You have no pending RTO request yet'
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
