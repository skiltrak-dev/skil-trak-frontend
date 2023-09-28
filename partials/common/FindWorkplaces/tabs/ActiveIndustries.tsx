import {
    ActionButton,
    Button,
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TableAction,
    TechnicalError,
    Typography,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaEdit, FaFileExport } from 'react-icons/fa'

import { CommonApi, commonApi } from '@queries'
import { Industry, IndustryStatus } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { FiLogIn } from 'react-icons/fi'
import { MdBlock, MdOutlineFavorite, MdDelete } from 'react-icons/md'
// import { IndustryCell, SectorCell } from './components'
// import { BlockModal } from './modals'

// hooks
import { useActionModal } from '@hooks'
import { AiFillCheckCircle, AiFillWarning } from 'react-icons/ai'
import { DefaultModal } from '../DefaultModal'
import { DoNotDisturbModal } from '../DoNotDisturbModal'
import { FavoriteModal } from '../FavoriteModal'
import {
    DeleteFutureIndustryModal,
    DeleteMultiFutureIndustryModal,
} from '../modal'
import { BiPencil } from 'react-icons/bi'

export const ActiveIndustries = ({
    onSetIndustryData,
}: {
    onSetIndustryData: (val: any) => void
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const router = useRouter()
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    const { isLoading, data, isError } =
        CommonApi.FindWorkplace.useGetAllFindWorkplaces({
            search: '',
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        })

    const [bulkAction, resultBulkAction] = commonApi.useBulkStatusMutation()

    const onModalCancelClicked = () => {
        setModal(null)
    }

    const onDoNotDisturbClicked = (industry: Industry) => {
        setModal(
            <DoNotDisturbModal
                industry={industry}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }
    const onDefaultClicked = (industry: Industry) => {
        setModal(
            <DefaultModal
                industry={industry}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }
    const onFavoriteClicked = (industry: Industry) => {
        setModal(
            <FavoriteModal
                industry={industry}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const onDeleteFutureIndustry = (industry: any) => {
        setModal(
            <DeleteFutureIndustryModal
                futureIndustry={industry}
                onCancel={onModalCancelClicked}
            />
        )
    }

    const onDeleteMultiFutureIndustry = (industry: any) => {
        setModal(
            <DeleteMultiFutureIndustryModal
                futureIndustries={industry}
                onCancel={onModalCancelClicked}
            />
        )
    }

    const tableActionOptions = (industry: any) => {
        const stored = localStorage.setItem(
            'signup-data',
            JSON.stringify(industry)
        )
        return [
            {
                text: 'Default',
                onClick: (industry: Industry) => onDefaultClicked(industry),
                Icon: AiFillCheckCircle,
                color: `'text-green-500 hover:bg-green-100 hover:border-green-200'`,
            },
            {
                text: 'Favorite',
                onClick: (industry: Industry) => onFavoriteClicked(industry),
                Icon: MdOutlineFavorite,
                color: 'text-green-500 hover:bg-green-100 hover:border-green-200',
            },
            {
                text: 'Do Not Disturb',
                onClick: (industry: Industry) =>
                    onDoNotDisturbClicked(industry),
                Icon: AiFillWarning,
                color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
            },
            {
                text: 'SignUp',
                onClick: (industry: any) => {
                    localStorage.setItem(
                        'signup-data',
                        JSON.stringify(industry)
                    )
                    router.push(`/auth/signup/industry?step=account-info`)
                },
                Icon: FiLogIn,
            },
            {
                text: 'Edit',
                onClick: (futureIndustry: any) => {
                    onSetIndustryData(futureIndustry)
                },
                Icon: BiPencil,
            },
            {
                text: 'Delete',
                onClick: (futureIndustry: any) => {
                    onDeleteFutureIndustry(futureIndustry)
                },
                Icon: MdDelete,
            },
        ]
    }

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'businessName',
            header: () => <span>Name</span>,
            cell: (info) => {
                return (
                    <div className="flex flex-col gap-y-1">
                        <Typography variant={'label'}>
                            {info?.row?.original?.businessName}
                        </Typography>
                        <Typography variant={'label'}>
                            {info?.row?.original?.email}
                        </Typography>
                    </div>
                )
            },
        },
        {
            accessorKey: 'phone',
            header: () => <Typography variant={'label'}>Phone</Typography>,
        },
        {
            accessorKey: 'address',
            header: () => <Typography variant={'label'}>Address</Typography>,
        },
        {
            accessorKey: 'status',
            header: () => <span>Status</span>,
            cell: (info) => {
                return (
                    <div>
                        {info.row.original.status ===
                        IndustryStatus.FAVOURITE ? (
                            <div className="rounded-lg flex items-center gap-x-2">
                                <p className="text-green-500 font-semibold">
                                    Favorite
                                </p>
                                <MdOutlineFavorite className="text-green-500" />
                            </div>
                        ) : info.row.original.status ===
                          IndustryStatus.DO_NOT_DISTURB ? (
                            <div className="rounded-lg flex items-center gap-x-2">
                                <p className="text-red-500 font-semibold">
                                    Do Not Disturb
                                </p>
                                <AiFillWarning className="text-red-500 text-lg" />
                            </div>
                        ) : (
                            <div className="flex items-center gap-x-2">
                                ----
                            </div>
                        )}
                    </div>
                )
            },
        },
        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: ({ row }: any) => {
                const tableActionOption = tableActionOptions(row.original)
                return (
                    <TableAction
                        options={tableActionOption}
                        rowItem={row.original}
                    />
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
        common: (ids: Industry[]) => (
            <ActionButton
                onClick={() => {
                    const arrayOfIds = ids.map((id: any) => id?.id)
                    onDeleteMultiFutureIndustry(arrayOfIds)
                    // bulkAction({ ids: arrayOfIds, status: 'blocked' })
                }}
                Icon={MdDelete}
                variant="error"
            >
                Delete
            </ActionButton>
        ),
    }

    return (
        <>
            {modal && modal}
            <div className="flex flex-col gap-y-4 mb-32">
                <PageHeading
                    title={'All Industries'}
                    subtitle={'List of all Industries'}
                >
                    {data && data?.data?.length ? (
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
                    ) : data && data?.data?.length ? (
                        <Table
                            columns={columns as any}
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
                                title={'No All Industry!'}
                                description={
                                    'You have not all any Industry request yet'
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
