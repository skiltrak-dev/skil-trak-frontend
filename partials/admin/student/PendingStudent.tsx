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
import { FaEdit, FaEye, FaFileExport, FaFilter } from 'react-icons/fa'

import { AdminApi, commonApi } from '@queries'
import { MdEmail, MdPhoneIphone } from 'react-icons/md'
import { ReactElement, useEffect, useState } from 'react'
import { useActionModal, useContextBar } from '@hooks'
import { Rto, Student } from '@types'
import { SectorCell, StudentCellInfo } from './components'
import { RtoCellInfo } from '@partials/admin/rto/components'
import { AcceptModal, RejectModal } from './modals'
import { useChangeStatus } from './hooks'
import { useRouter } from 'next/router'
import { IndustryCell } from '../industry/components'
import { RiLockPasswordFill } from 'react-icons/ri'

export const PendingStudent = () => {
    const router = useRouter()
    const contextBar = useContextBar()
    const [modal, setModal] = useState<ReactElement | null>(null)

    const [filterAction, setFilterAction] = useState(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState({})

    // hooks
    const { passwordModal, onViewPassword } = useActionModal()

    const { isLoading, data, isError, isSuccess } =
        AdminApi.Students.useListQuery({
            search: `status:pending`,
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        })
    const [bulkAction, resultBulkAction] = commonApi.useBulkStatusMutation()

    const { changeStatusResult } = useChangeStatus()
    const onModalCancelClicked = () => {
        setModal(null)
    }
    const onAcceptClicked = (item: Student) => {
        setModal(
            <AcceptModal item={item} onCancel={() => onModalCancelClicked()} />
        )
    }
    const onRejectClicked = (item: Student) => {
        setModal(
            <RejectModal item={item} onCancel={() => onModalCancelClicked()} />
        )
    }

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: (student: any) => {
                router.push(
                    `/portals/admin/student/${student?.id}?tab=required-documents`
                )
            },
            Icon: FaEye,
        },
        {
            text: 'Edit',
            onClick: (row: any) => {
                router.push(`/portals/admin/student/edit-student/${row.id}`)
            },
            Icon: FaEdit,
        },
        {
            text: 'View Password',
            onClick: (student: Student) => onViewPassword(student),
            Icon: RiLockPasswordFill,
        },
    ]

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'user.name',
            cell: (info) => {
                return <StudentCellInfo student={info.row.original} />
            },
            header: () => <span>Student</span>,
        },
        {
            accessorKey: 'rto',
            header: () => <span>RTO</span>,
            cell: (info) => {
                return <RtoCellInfo rto={info.row.original.rto} short />
            },
        },
        {
            accessorKey: 'sectors',
            header: () => <span>Sectors</span>,
            cell: (info) => {
                return <SectorCell student={info.row.original} />
            },
        },
        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: (info: any) => {
                return (
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
                )
            },
        },
    ]

    const quickActionsElements = {
        id: 'id',
        individual: (student: Student) => (
            <div className="flex gap-x-2">
                <ActionButton
                    variant="success"
                    onClick={() => {
                        onAcceptClicked(student)
                    }}
                >
                    Accept
                </ActionButton>
                <ActionButton
                    variant="error"
                    onClick={() => {
                        onRejectClicked(student)
                    }}
                >
                    Reject
                </ActionButton>
            </div>
        ),
        common: (ids: number[]) => (
            <div className="flex gap-x-2">
                <ActionButton
                    onClick={() => {
                        const arrayOfIds = ids.map((id: any) => id?.user.id)
                        bulkAction({ ids: arrayOfIds, status: 'approved' })
                    }}
                    variant="success"
                >
                    Accept
                </ActionButton>
                <ActionButton
                    onClick={() => {
                        const arrayOfIds = ids.map((id: any) => id?.user.id)
                        bulkAction({ ids: arrayOfIds, status: 'rejected' })
                    }}
                    variant="error"
                >
                    Reject
                </ActionButton>
            </div>
        ),
    }

    return (
        <>
            {modal && modal}
            {passwordModal && passwordModal}
            <div className="flex flex-col gap-y-4 mb-32">
                <PageHeading
                    title={'Pending Students'}
                    subtitle={'List of Pending Students'}
                />

                <Card noPadding>
                    {isError && <TechnicalError />}
                    {isLoading ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : data && data?.data.length && isSuccess ? (
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
