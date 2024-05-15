import {
    ActionButton,
    Button,
    Card,
    EmptyData,
    InitialAvatar,
    LoadingAnimation,
    Table,
    TableAction,
    TechnicalError,
    Tooltip,
    TruncatedTextWithTooltip,
    Typography,
    UserCreatedAt,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaEdit, FaFileExport } from 'react-icons/fa'

import { CommonApi, commonApi, SubAdminApi } from '@queries'
import { Industry, RtoStatus } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { FiLogIn } from 'react-icons/fi'
import { MdBlock, MdDelete, MdOutlineFavorite } from 'react-icons/md'
// import { IndustryCell, SectorCell } from './components'
// import { BlockModal } from './modals'

// hooks
import Image from 'next/image'
import { AiFillCheckCircle, AiFillWarning } from 'react-icons/ai'
import { BiPencil } from 'react-icons/bi'
// import { DefaultModal } from '../DefaultModal'
// import { DoNotDisturbModal } from '../DoNotDisturbModal'
// import { FavoriteModal } from '../FavoriteModal'
// import {
//     AddToSignupModal,
//     DeleteFutureIndustryModal,
//     DeleteMultiFutureIndustryModal,
// } from '../modal'
import { useContextBar } from '@hooks'
import { AddRtoListing } from '../contextBar'
import { ellipsisText } from '@utils'
import {
    RtoDoNotDisturbModal,
    RtoDefaultModal,
    RtoFavoriteModal,
    RtoListingDeleteModal,
} from '../modal'

export const ActiveRtosList = ({
    onSetIndustryData,
}: {
    onSetIndustryData: (val: any) => void
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const router = useRouter()
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    const contextBar = useContextBar()

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    const { isLoading, data, isError } = SubAdminApi.SubAdmin.useAllRtosList({
        search: '',
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })
    const [bulkAction, resultBulkAction] = commonApi.useBulkStatusMutation()

    const onModalCancelClicked = () => {
        setModal(null)
    }

    const onDoNotDisturbClicked = (rto: any) => {
        setModal(
            <RtoDoNotDisturbModal
                rto={rto}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }
    const onDefaultClicked = (rto: any) => {
        setModal(
            <RtoDefaultModal
                rto={rto}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }
    const onFavoriteClicked = (rto: any) => {
        setModal(
            <RtoFavoriteModal
                rto={rto}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const onDeleteRtoListing = (rto: any) => {
        setModal(
            <RtoListingDeleteModal rto={rto} onCancel={onModalCancelClicked} />
        )
    }

    // const onDeleteMultiFutureIndustry = (industry: any) => {
    //     setModal(
    //         <DeleteMultiFutureIndustryModal
    //             futureIndustries={industry}
    //             onCancel={onModalCancelClicked}
    //         />
    //     )
    // }

    // const onAddToSignupClicked = (industry: any) => {
    //     setModal(
    //         <AddToSignupModal
    //             industry={industry}
    //             onCancel={onModalCancelClicked}
    //         />
    //     )
    // }

    const onEditRto = (rtoData: any) => {
        contextBar.setContent(
            <AddRtoListing
                industryData={rtoData}
                onSetIndustryData={() => {
                    onSetIndustryData(null)
                }}
            />
        )
        contextBar.show(false)
        contextBar.setTitle('Edit Future Industry')
    }

    const tableActionOptions = (rto: any) => {
        const stored = localStorage.setItem('signup-data', JSON.stringify(rto))
        return [
            {
                text: 'Default',
                onClick: (rto: any) => onDefaultClicked(rto),
                Icon: AiFillCheckCircle,
                color: `'text-green-500 hover:bg-green-100 hover:border-green-200'`,
            },
            {
                text: 'Favorite',
                onClick: (rto: any) => onFavoriteClicked(rto),
                Icon: MdOutlineFavorite,
                color: 'text-green-500 hover:bg-green-100 hover:border-green-200',
            },
            {
                text: 'Do Not Disturb',
                onClick: (rto: any) => onDoNotDisturbClicked(rto),
                Icon: AiFillWarning,
                color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
            },
            // {
            //     text: rto?.signedUp
            //         ? 'Remove From Signup'
            //         : 'Add to Signup',
            //     onClick: (industry: any) => onAddToSignupClicked(industry),
            //     Icon: AiFillCheckCircle,
            //     color: `'text-green-500 hover:bg-green-100 hover:border-green-200'`,
            // },

            // {
            //     text: 'SignUp',
            //     onClick: (industry: any) => {
            //         localStorage.setItem(
            //             'signup-data',
            //             JSON.stringify(industry)
            //         )
            //         router.push(
            //             `/portals/admin/future-industries/signup-future-industry`
            //         )
            //     },
            //     Icon: FiLogIn,
            // },
            {
                text: 'Edit',
                onClick: (rto: any) => {
                    onEditRto(rto)
                },
                Icon: BiPencil,
            },
            {
                text: 'Delete',
                onClick: (rto: any) => {
                    onDeleteRtoListing(rto)
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
                const isDuplicated = data?.dupicatedListing
                    ?.map((e: any) => e?.listing_email)
                    ?.includes(info?.row?.original?.email)
                return (
                    <div className={`flex items-center gap-x-1.5`}>
                        {info?.row?.original?.businessName && (
                            <InitialAvatar
                                name={info?.row?.original?.businessName}
                            />
                        )}
                        <div className="flex flex-col gap-y-1">
                            <div className="flex items-center gap-x-2">
                                <Typography variant={'label'}>
                                    {info?.row?.original?.businessName}
                                </Typography>
                                {info.row.original?.signedUp && (
                                    <div className="relative group">
                                        <Image
                                            src={'/images/signup.png'}
                                            alt={''}
                                            width={20}
                                            height={20}
                                        />
                                        <Tooltip>Signed Up</Tooltip>
                                    </div>
                                )}
                            </div>
                            {/* <Highlighter
                                highlightClassName="YourHighlightClass"
                                searchWords={
                                    isDuplicated
                                        ? [info?.row?.original?.email]
                                        : ['']
                                }
                                autoEscape={true}
                                textToHighlight={info?.row?.original?.email}
                            /> */}
                            <div
                                className={` relative group ${
                                    isDuplicated ? 'bg-gray-300' : ''
                                } px-1.5 rounded-md`}
                            >
                                <TruncatedTextWithTooltip
                                    text={info.row.original?.email}
                                    maxLength={20}
                                />

                                {isDuplicated ? (
                                    <Tooltip>Duplicated Found</Tooltip>
                                ) : null}
                            </div>
                        </div>
                    </div>
                )
            },
        },
        {
            accessorKey: 'phone',
            header: () => <span>Phone</span>,
        },
        {
            accessorKey: 'address',
            header: () => <span>Address</span>,
            cell: (info) => (
                <TruncatedTextWithTooltip text={info.row.original?.address} />
            ),
        },
        // {
        //     accessorKey: 'country.name',
        //     header: () => <span>Region</span>,
        // },
        // {
        //     accessorKey: 'region.name',
        //     header: () => <span>State</span>,
        // },
        {
            accessorKey: 'status',
            header: () => <span>Status</span>,
            cell: (info) => {
                return (
                    <div>
                        {info.row.original.status === RtoStatus.FAVOURITE ? (
                            <div className="rounded-lg flex items-center gap-x-2">
                                <p className="text-green-500 font-semibold">
                                    Favorite
                                </p>
                                <MdOutlineFavorite className="text-green-500" />
                            </div>
                        ) : info.row.original.status ===
                          RtoStatus.DO_NOT_DISTURB ? (
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
        // {
        //     accessorKey: 'note',
        //     header: () => <span>Note</span>,
        // },
        {
            accessorKey: 'createdAt',
            header: () => <span>Created At</span>,
            cell: (info) => (
                <UserCreatedAt createdAt={info.row.original?.createdAt} />
            ),
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

    // const quickActionsElements = {
    //     id: 'id',
    //     individual: (id: Industry) => (
    //         <div className="flex gap-x-2">
    //             <ActionButton Icon={FaEdit}>Edit</ActionButton>
    //             <ActionButton Icon={MdBlock} variant="error">
    //                 Block
    //             </ActionButton>
    //         </div>
    //     ),
    //     common: (ids: Industry[]) => (
    //         <ActionButton
    //             onClick={() => {
    //                 const arrayOfIds = ids.map((id: any) => id?.id)
    //                 onDeleteMultiFutureIndustry(arrayOfIds)
    //                 // bulkAction({ ids: arrayOfIds, status: 'blocked' })
    //             }}
    //             Icon={MdDelete}
    //             variant="error"
    //         >
    //             Delete
    //         </ActionButton>
    //     ),
    // }

    return (
        <>
            {modal && modal}
            <div className="flex flex-col gap-y-4 mb-32">
                <PageHeading title={'All RTOs'} subtitle={'List of all RTOs'} />
                {/* {data && data?.data?.length ? (
                        <Button
                            text="Export"
                            variant="action"
                            Icon={FaFileExport}
                        />
                    ) : null} */}
                {/* </PageHeading> */}

                <Card noPadding>
                    {isError && <TechnicalError />}
                    {isLoading ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : data?.data && data?.data?.length ? (
                        <Table
                            columns={columns as any}
                            data={data?.data}
                            // quickActions={quickActionsElements}
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
                                title={'No All RTOs!'}
                                description={'You have not any Rto in the list'}
                                height={'50vh'}
                            />
                        )
                    )}
                </Card>
            </div>
        </>
    )
}
