import {
    Badge,
    Button,
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TechnicalError,
    Typography,
    UserCreatedAt,
} from '@components'
import { ColumnDef } from '@tanstack/react-table'
import { SubAdminApi } from '@queries'
import { RemovePartnerRequest, StudentActionsRequest } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { IndustryCellInfo } from '../Industries'
import { IndustryRequestRemovalStatus, IndustryRequestsActions } from './enum'
import {
    ApprovePartnerIndustryApprovalList,
    RejectPartnerIndustryApprovalList,
    StudentApprovalActionsModal,
    StudentRejectActionsModal,
} from './modal'
import { StudentCellInfo } from '../students'
import { FaEnvelope } from 'react-icons/fa'

export const StudentNotContactableRequest = () => {
    const router = useRouter()

    const [modal, setModal] = useState<ReactElement | null>(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    const { isLoading, isFetching, data, isError, isSuccess } =
        SubAdminApi.Student.studentActionsApprovalRequests(
            {
                skip: itemPerPage * page - itemPerPage,
                limit: itemPerPage,
                search: `action:${IndustryRequestsActions.NonContactable}`,
            },
            {
                refetchOnMountOrArgChange: 30,
            }
        )

    const onCancel = () => setModal(null)

    const onApproveClicked = (request: StudentActionsRequest) => {
        setModal(
            <StudentApprovalActionsModal
                request={request}
                onCancel={onCancel}
            />
        )
    }

    const onRejectClicked = (request: StudentActionsRequest) => {
        setModal(
            <StudentRejectActionsModal request={request} onCancel={onCancel} />
        )
    }

    const columns: ColumnDef<StudentActionsRequest>[] = [
        {
            accessorKey: 'user.name',
            cell: (info) => (
                <StudentCellInfo student={info.row.original?.student} />
            ),
            header: () => <span>Student</span>,
        },
        {
            accessorKey: 'requestedBy',
            header: () => <span>Requested By</span>,
            cell: (info) => (
                <div>
                    <Typography variant="label">
                        {info?.row?.original?.requestedBy?.name}
                    </Typography>
                    <div className="flex items-center gap-x-1">
                        <span className="text-gray-400">
                            <FaEnvelope />
                        </span>
                        <Typography variant="small" color="text-gray-500">
                            {info?.row?.original?.requestedBy?.email}
                        </Typography>
                    </div>
                </div>
            ),
        },
        {
            accessorKey: 'createdBy',
            header: () => <span>Created At</span>,
            cell: ({ row }) => (
                <UserCreatedAt createdAt={row?.original?.createdAt} />
            ),
        },
        {
            accessorKey: 'status',
            header: () => <span>Status</span>,
            cell: ({ row }) => (
                <Badge
                    text={row?.original?.status}
                    variant={
                        row.original?.status ===
                        IndustryRequestRemovalStatus.REJECTED
                            ? 'error'
                            : 'warning'
                    }
                />
            ),
        },
        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: (info) => (
                <div className="flex gap-x-1 items-center">
                    <Button
                        text={'Approve'}
                        variant="success"
                        onClick={() => onApproveClicked(info.row.original)}
                    />
                    <Button
                        text={'Reject'}
                        variant="error"
                        onClick={() => onRejectClicked(info.row.original)}
                    />
                </div>
            ),
        },
    ]

    return (
        <>
            {modal}
            <div className="flex flex-col gap-y-4 mb-32">
                <Card noPadding>
                    {isError && <TechnicalError />}
                    {isLoading || isFetching ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : data && data?.data.length && isSuccess ? (
                        <Table columns={columns} data={data.data}>
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
                                                setItemPerPage,
                                                data?.data?.length
                                            )}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination(
                                                    data?.pagination,
                                                    setPage
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className="px-6"
                                            id={'studentScrollId'}
                                        >
                                            {table}
                                        </div>
                                        {data?.data?.length > 10 && (
                                            <div className="p-6 mb-2 flex justify-between">
                                                {pageSize(
                                                    itemPerPage,
                                                    setItemPerPage,
                                                    data?.data?.length
                                                )}
                                                <div className="flex gap-x-2">
                                                    {quickActions}
                                                    {pagination(
                                                        data?.pagination,
                                                        setPage
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )
                            }}
                        </Table>
                    ) : (
                        !isError && (
                            <EmptyData
                                title={'No Pending Student!'}
                                description={
                                    'You have no pending Student request yet'
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
