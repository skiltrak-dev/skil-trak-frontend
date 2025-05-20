import {
    Badge,
    Button,
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TableAction,
    TableActionOption,
    TechnicalError,
    Typography,
    UserCreatedAt,
} from '@components'
import { ColumnDef } from '@tanstack/react-table'
import { FaEdit, FaEye } from 'react-icons/fa'

import { RtoCellInfo } from '@partials/admin/rto/components'
import { SubAdminApi } from '@queries'
import { RemovePartnerRequest, Student, UserStatus } from '@types'
import moment from 'moment'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { IndustryCellInfo } from '../Industries'
import {
    ApprovePartnerIndustryApprovalList,
    RejectPartnerIndustryApprovalList,
} from './modal'
import { IndustryRequestRemovalStatus, IndustryRequestsActions } from './enum'

export const IndustryPartnerRemovalRequest = () => {
    const router = useRouter()

    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [modal, setModal] = useState<ReactElement | null>(null)

    useEffect(() => {
        setPage(Number(router.query.page))
        setItemPerPage(Number(router.query.pageSize))
    }, [router])

    const { isLoading, isFetching, data, isError, isSuccess } =
        SubAdminApi.Industry.removePartnerIndustryReq(
            {
                limit: itemPerPage,
                skip: itemPerPage * page - itemPerPage,
                search: `action:${IndustryRequestsActions.Partner}`,
            },
            {
                refetchOnMountOrArgChange: 30,
            }
        )

    const onCancel = () => setModal(null)

    const onApproveClicked = (request: RemovePartnerRequest) => {
        setModal(
            <ApprovePartnerIndustryApprovalList
                request={request}
                onCancel={onCancel}
            />
        )
    }

    const onRejectClicked = (request: RemovePartnerRequest) => {
        setModal(
            <RejectPartnerIndustryApprovalList
                request={request}
                onCancel={onCancel}
            />
        )
    }

    const columns: ColumnDef<RemovePartnerRequest>[] = [
        {
            accessorKey: 'user.name',
            cell: (info) => (
                <IndustryCellInfo industry={info.row.original?.industry} />
            ),
            header: () => <span>Industry</span>,
        },
        {
            accessorKey: 'industry.abn',
            header: () => <span>ABN</span>,
        },
        {
            header: () => 'Contact Person',
            accessorKey: 'contactPersonNumber',
            cell: ({ row }) => {
                const { contactPersonNumber, contactPerson } =
                    row.original?.industry
                return (
                    <Typography variant={'muted'} color={'gray'}>
                        {contactPersonNumber} {contactPerson}
                    </Typography>
                )
            },
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
