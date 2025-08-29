import {
    ActionButton,
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TableAction,
    TechnicalError,
    TruncatedTextWithTooltip,
    Typography,
} from '@components'
import { ColumnDef } from '@tanstack/react-table'
import { ReactElement, useEffect, useRef, useState } from 'react'
import { FaEdit, FaEye } from 'react-icons/fa'

import { AdminApi, commonApi } from '@queries'
import { Industry } from '@types'
import { useRouter } from 'next/router'
import { MdBlock, MdSnooze } from 'react-icons/md'
import { IndustryCell } from './components'
import { BlockModal, MultiBlockModal } from './modals'
// hooks
import { UserRoles } from '@constants'
import { useActionModal } from '@hooks'
import { SnoozeIndustryModal, UnSnoozeIndustryModal } from '@partials/common'
import { getUserCredentials } from '@utils'
import { RiLockPasswordFill } from 'react-icons/ri'

export const SnoozedIndustry = () => {

    const [modal, setModal] = useState<ReactElement | null>(null)
    const router = useRouter()
    const [itemPerPage, setItemPerPage] = useState(30)
    const [page, setPage] = useState(1)
    const role = getUserCredentials()?.role
    // hooks
    const { passwordModal, onViewPassword } = useActionModal()

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 30))
    }, [router])
    // useSnoozedIndustry
    // const snoozedIndustryList = AdminApi.Industries.useSnoozedIndustry({
    //     // search: `status:${UserStatus.Approved}`,
    //     skip: itemPerPage * page - itemPerPage,
    //     limit: itemPerPage,
    // })
    const { isLoading, data, isError } = AdminApi.Industries.useSnoozedIndustry(
        {
            // search: `status:${UserStatus.Approved}`,
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        }
    )

    const [bulkAction, resultBulkAction] = commonApi.useBulkStatusMutation()

    const onModalCancelClicked = () => {
        setModal(null)
    }
    const onBlockClicked = (industry: Industry) => {
        setModal(
            <BlockModal
                industry={industry}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }
    // const onSnoozedClicked = (industry: Industry) => {
    //     setModal(
    //         <SnoozedModal
    //             industry={industry}
    //             onCancel={() => onModalCancelClicked()}
    //         />
    //     )
    // }
    const onSnooze = (industry: Industry) => {
        setModal(
            <SnoozeIndustryModal
                onCancel={onModalCancelClicked}
                industry={industry}
            />
        )
    }

    const UnSnoozeModal = (industry: Industry) => {
        setModal(
            <UnSnoozeIndustryModal
                onCancel={onModalCancelClicked}
                industry={industry}
            />
        )
    }
    const onMultiBlockClicked = (industries: Industry[]) => {
        setModal(
            <MultiBlockModal
                industries={industries}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const tableActionOptions = (industry: any) => {
        return [
            {
                text: 'View',
                onClick: (industry: any) => {
                    router.push(`/portals/admin/industry/${industry.id}`)
                },
                Icon: FaEye,
            },
            {
                text: 'Old Profile',
                onClick: (industry: any) =>
                    router.push(
                        `/portals/admin/industry/${industry?.id}/detail?tab=students`
                    ),
                Icon: FaEye,
            },
            {
                text: 'Edit',
                onClick: (row: any) => {
                    router.push(
                        `/portals/admin/industry/edit-industry/${row.id}`
                    )
                },
                Icon: FaEdit,
            },
            {
                text: `Unsnooze`,
                // onClick: (industry: Industry) => onSnoozedClicked(industry),
                onClick: (industry: any) => {
                    UnSnoozeModal(industry)
                },
                Icon: MdSnooze,
                color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
            },
            {
                ...(role === UserRoles.ADMIN
                    ? {
                        text: 'View Password',
                        onClick: (industry: Industry) =>
                            onViewPassword(industry),
                        Icon: RiLockPasswordFill,
                    }
                    : {}),
            },
            {
                text: 'Block',
                onClick: (industry: Industry) => onBlockClicked(industry),
                Icon: MdBlock,
                color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
            },
        ]
    }

    const columns: ColumnDef<Industry>[] = [
        {
            accessorKey: 'user.name',
            cell: (info: any) => <IndustryCell industry={info.row.original} />,
            header: () => <span>Industry</span>,
        },
        {
            accessorKey: 'abn',
            header: () => <span>ABN</span>,
        },
        {
            accessorKey: 'contactPerson',
            header: () => <span>Contact Person</span>,
            cell: (info: any) => {
                return (
                    <div>
                        <p>{info.row.original.contactPerson || 'N/A'}</p>
                        <p className="text-xs text-gray-500">
                            {info.row.original?.contactPersonNumber}
                        </p>
                    </div>
                )
            },
        },
        // {
        //     accessorKey: 'sectors',
        //     header: () => <span>Sectors</span>,
        //     cell: (info) => {
        //         return <SectorCell industry={info?.row?.original} />
        //     },
        // },
        {
            accessorKey: 'addressLine1',
            header: () => <span>Address</span>,
            cell: (info: any) => (
                <TruncatedTextWithTooltip
                    text={info?.row?.original?.addressLine1}
                />
            ),
        },
        {
            header: () => 'Snoozed By',
            accessorKey: 'snoozedBy',
            cell: ({ row }: any) => {
                return (
                    <Typography variant={'muted'} color={'gray'}>
                        {row?.original?.snoozedBy?.name}
                    </Typography>
                )
            },
        },
        {
            header: () => 'Snoozed At',
            accessorKey: 'snoozedAt',
            cell: ({ row }: any) => {
                return (
                    <Typography variant={'muted'} color={'gray'}>
                        {row?.original?.snoozedAt?.slice(0, 10) || 'N/A'}
                    </Typography>
                )
            },
        },
        {
            header: () => 'Snoozed Date',
            accessorKey: 'snoozedDate',
            cell: ({ row }: any) => {
                return (
                    <Typography variant={'muted'} color={'gray'}>
                        {row?.original?.snoozedDate?.slice(0, 10) || 'N/A'}
                    </Typography>
                )
            },
        },
        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: (info: any) => {
                const tableActionOption = tableActionOptions(
                    info?.row?.original
                )
                return (
                    <div className="flex gap-x-1 items-center">
                        <TableAction
                            options={tableActionOption}
                            rowItem={info.row.original}
                        />
                    </div>
                )
            },
        },
    ]

    const quickActionsElements = {
        id: 'id',
        individual: (id: Industry) => (
            <div className="flex gap-x-2">
                <ActionButton Icon={FaEdit}>Edit</ActionButton>
                <ActionButton Icon={MdBlock} variant="error">
                    Block
                </ActionButton>
            </div>
        ),
        common: (industries: Industry[]) => (
            <>
                {/* <ActionButton
                    onClick={() => {
                        const arrayOfIds = industries.map(
                            (id: any) => id?.user.id
                        )
                        bulkAction({
                            ids: arrayOfIds,
                            status: UserStatus.Pending,
                        })
                    }}
                    Icon={MdBlock}
                    variant="success"
                >
                    Pending
                </ActionButton> */}
                <ActionButton
                    onClick={() => {
                        onMultiBlockClicked(industries)
                    }}
                    Icon={MdBlock}
                    variant="error"
                >
                    Block
                </ActionButton>
            </>
        ),
    }

    return (
        <>
            {modal && modal}
            {passwordModal && passwordModal}
            <div className="flex flex-col gap-y-4 mb-32">
                <Card noPadding>
                    {isError && <TechnicalError />}
                    {isLoading ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : data && data?.data?.length ? (
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
                            }: any) => (
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
                                    <div className=" overflow-x-scroll remove-scrollbar">
                                        <div className="px-6 w-full">
                                            {table}
                                        </div>
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
                            )}
                        </Table>
                    ) : (
                        !isError && (
                            <EmptyData
                                title={'No Snoozed Industry!'}
                                description={
                                    'You have not Snoozed any Industry request yet'
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
