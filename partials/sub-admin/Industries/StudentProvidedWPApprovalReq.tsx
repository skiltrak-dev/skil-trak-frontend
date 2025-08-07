import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

// Icons

// components
import {
    Button,
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TechnicalError,
    UserCreatedAt,
} from '@components'

import { SubAdminApi } from '@queries'
import { ColumnDef } from '@tanstack/react-table'
import { StudentProvidedWpAppRequest } from '@types'
import { ellipsisText, getUserCredentials } from '@utils'
import { StudentCellInfo } from '../students'
import { IndustryCellInfo } from './components'
import {
    StdProvidedWpApprovalReqApproved,
    StdProvidedWpApprovalReqRejected,
} from './modals'

export const StudentProvidedWPApprovalReq = ({
    isHod,
}: {
    isHod?: boolean
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const router = useRouter()
    const [itemPerPage, setItemPerPage] = useState(10)
    const [page, setPage] = useState(1)

    const subadminId = getUserCredentials()?.id

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 10))
    }, [router])

    const { isLoading, data, isError } =
        SubAdminApi.Industry.getStdProvidedWpAppReq(
            {
                skip: itemPerPage * page - itemPerPage,
                limit: itemPerPage,
            },
            {
                refetchOnMountOrArgChange: true,
            }
        )

    const id = getUserCredentials()?.id

    const onCancelClicked = () => setModal(null)

    const onApproveClicked = (request: StudentProvidedWpAppRequest) =>
        setModal(
            <StdProvidedWpApprovalReqApproved
                request={request}
                onCancel={onCancelClicked}
            />
        )

    const onRejectClicked = (request: StudentProvidedWpAppRequest) =>
        setModal(
            <StdProvidedWpApprovalReqRejected
                request={request}
                onCancel={onCancelClicked}
            />
        )

    const Columns: ColumnDef<StudentProvidedWpAppRequest>[] = [
        {
            header: () => 'Business Name',
            accessorKey: 'user',
            // sort: true,
            cell: ({ row }) => {
                return (
                    <div className="">
                        <IndustryCellInfo
                            industry={row.original?.industry}
                            call
                        />
                    </div>
                )
            },
        },
        {
            header: () => 'Student Name',
            accessorKey: 'user',
            cell: ({ row }) => (
                <div className="">
                    <StudentCellInfo student={row.original?.student} call />
                </div>
            ),
        },
        {
            accessorKey: 'industry.abn',
            header: () => <span>ABN Number</span>,
        },

        {
            accessorKey: 'channel',
            header: () => <span>Registered By</span>,
            cell: ({ row }) => (
                <div>
                    {row?.original?.industry?.createdBy !== null ? (
                        <div className="bg-emerald-100 text-emerald-600 rounded-md px-2 py-0.5 flex items-center gap-x-1">
                            {/* <FaArrowUp /> */}
                            <p className="text-xs whitespace-nowrap">
                                {ellipsisText(
                                    row.original?.industry?.createdBy?.name,
                                    10
                                )}
                            </p>
                        </div>
                    ) : (
                        <div className="flex items-center gap-x-1 bg-blue-100 text-blue-600 rounded-md px-2 py-0.5">
                            {/* <FaArrowUp /> */}

                            <p className="text-xs">
                                {row?.original?.industry?.channel}
                            </p>
                        </div>
                    )}
                    <UserCreatedAt createdAt={row?.original?.createdAt} />
                </div>
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
                        // disabled={
                        //     info.row.original?.status !==
                        //     IndustryRequestRemovalStatus.PENDING
                        // }
                        onClick={() => onApproveClicked(info.row.original)}
                    />
                    <Button
                        text={'Reject'}
                        variant="error"
                        // disabled={
                        //     info.row.original?.status !==
                        //     IndustryRequestRemovalStatus.PENDING
                        // }
                        onClick={() => onRejectClicked(info.row.original)}
                    />
                </div>
            ),
        },
    ]

    return (
        <>
            {modal}
            <Card noPadding>
                {isError && <TechnicalError />}
                {isLoading ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && data?.data.length ? (
                    <Table
                        columns={Columns?.filter((c: any) => c?.header) as any}
                        data={data.data}
                        // quickActions={quickActionsElements}
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
                                            setItemPerPage,
                                            data?.data.length
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
                            title={'No Approved Industry!'}
                            description={
                                'You have not approved any Industry request yet'
                            }
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
        </>
    )
}
