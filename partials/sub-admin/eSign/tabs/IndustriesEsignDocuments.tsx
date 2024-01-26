import {
    ActionButton,
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
} from '@components'
import { PageHeading } from '@components/headings'
import { UserRoles } from '@constants'
import { useContextBar } from '@hooks'
import { StudentCellInfo } from '@partials/sub-admin/students'
import { CommonApi } from '@queries'
import { ColumnDef } from '@tanstack/react-table'
import React, { ReactElement, useState } from 'react'
import { ViewSignersCB } from '../contextBar'
import { checkListLength } from '@utils'
import { useRouter } from 'next/router'
import { FaEdit, FaEye } from 'react-icons/fa'
import { CancelInitiateSign } from '@partials/sub-admin/assessmentEvidence/modal'
import { IndustryCellInfo } from '@partials/sub-admin/Industries'
import { ListingEnum } from '../enums'

export const IndustriesEsignDocuments = () => {
    const router = useRouter()
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    const industriesDocuments = CommonApi.ESign.useSubadminEsignList(
        {
            search: `role:${ListingEnum.INDUSTRY}`,
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        },
        {
            refetchOnMountOrArgChange: true,
        }
    )

    const contextBar = useContextBar()

    const onViewSigners = (signers: any) => {
        contextBar.show()
        contextBar.setTitle('View Signers')
        contextBar.setContent(<ViewSignersCB signers={signers} />)
    }

    const onModalCancel = () => setModal(null)

    const onCancelInitiateSignClicked = (eSign: any) => {
        setModal(<CancelInitiateSign onCancel={onModalCancel} eSign={eSign} />)
    }

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: (eSign: any) => {
                router.push(`/portals/sub-admin/e-sign/${eSign?.id}`)
            },
            Icon: FaEye,
        },
        {
            text: 'Edit',
            onClick: (eSign: any) => {
                // router.push(`/portals/admin/rto/${rto.id}/edit-profile`)
            },
            Icon: FaEdit,
        },
        {
            text: 'Cancel',
            onClick: (eSign: any) => {
                onCancelInitiateSignClicked(eSign)
            },
            Icon: FaEdit,
        },
    ]

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'template.name',
            header: () => <span>Document</span>,
            cell: (info) => (
                <Typography variant="small" semibold>
                    {info.row.original?.template?.name}
                </Typography>
            ),
        },
        {
            accessorKey: 'user.name',
            cell: (info) => {
                const industry = info.row?.original?.signers?.find(
                    (s: any) => s?.user?.role === UserRoles.INDUSTRY
                )
                return (
                    <IndustryCellInfo
                        industry={{
                            ...industry?.user?.industry,
                            user: industry?.user,
                        }}
                    />
                )
            },
            header: () => <span>Industry</span>,
        },
        {
            accessorKey: 'template.course.title',
            header: () => <span>Course</span>,
            cell: (info) => (
                <Typography variant="small" semibold>
                    {info.row.original?.template?.course?.title}
                </Typography>
            ),
        },
        {
            accessorKey: 'template.folder.name',
            header: () => <span>Folder</span>,
            cell: (info) => (
                <Typography variant="small" semibold>
                    {info.row.original?.template?.folder?.name}
                </Typography>
            ),
        },
        {
            accessorKey: 'status',
            header: () => <span>Status</span>,
            cell: (info) => <Badge text={info.row.original?.status} />,
        },
        {
            accessorKey: 'signers',
            header: () => <span>Signer</span>,
            cell: (info) => (
                <ActionButton
                    onClick={() => {
                        onViewSigners(info.row.original?.signers)
                    }}
                    variant="info"
                >
                    View
                </ActionButton>
            ),
        },
        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: ({ row }: any) => (
                <div className="flex items-center gap-x-2">
                    <Button
                        text={
                            row.original?.status === 'signed'
                                ? 'View Document'
                                : 'Sign Document'
                        }
                        onClick={() => {
                            router.push(
                                `/portals/sub-admin/e-sign/${row?.original?.id}`
                            )
                        }}
                    />
                    <div className="flex gap-x-1 items-center">
                        <TableAction
                            options={tableActionOptions}
                            rowItem={row.original}
                            lastIndex={checkListLength<any>(
                                industriesDocuments?.data?.data as any
                            )?.includes(row?.index)}
                        />
                    </div>
                </div>
            ),
        },
    ]

    return (
        <>
            {modal}
            <div className="flex flex-col gap-y-4 mb-32">
                <PageHeading
                    title={'Documents that needs to be signed by Industries'}
                    subtitle={'List of All Esign Industries Documents'}
                />

                {/* RTO:Documents that needs to be signed by {user}s */}
                {/* Document name, Course, Folder */}

                <Card noPadding>
                    {industriesDocuments?.isError && <TechnicalError />}
                    {industriesDocuments?.isLoading ||
                    industriesDocuments?.isFetching ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : industriesDocuments?.data?.data &&
                      industriesDocuments?.data?.data.length ? (
                        <Table<any>
                            columns={columns}
                            data={industriesDocuments?.data?.data}
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
                                                industriesDocuments?.data?.data
                                                    ?.length
                                            )}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination(
                                                    industriesDocuments?.data
                                                        ?.pagination,
                                                    setPage
                                                )}
                                            </div>
                                        </div>
                                        <div className="px-6 w-full overflow-x-scroll remove-scrollbar">
                                            {table}
                                        </div>
                                    </div>
                                )
                            }}
                        </Table>
                    ) : (
                        industriesDocuments?.isSuccess && (
                            <EmptyData
                                title={'No Approved RTO!'}
                                description={
                                    'You have not approved any RTO request yet'
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
