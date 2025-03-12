import {
    ActionButton,
    Card,
    EmptyData,
    InitialAvatar,
    LoadingAnimation,
    Table,
    TableAction,
    TableActionOption,
    Tooltip,
    TruncatedTextWithTooltip,
    Typography,
    UserCreatedAt,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaEdit } from 'react-icons/fa'

import { useActionModal, useContextBar } from '@hooks'
import { IndustryStatus, RtoStatus, SubAdmin } from '@types'
import { useRouter } from 'next/router'
import { MdBlock, MdDelete, MdOutlineFavorite, MdSnooze } from 'react-icons/md'
// import { RtoCell, SectorCell, SubAdminCell } from './components'
// import { AddSubAdminCB, ViewRtosCB, ViewSectorsCB } from './contextBar'
import { ReactElement, useState } from 'react'
import { AiFillCheckCircle, AiFillWarning } from 'react-icons/ai'
import { BiPencil } from 'react-icons/bi'
import { FiLogIn } from 'react-icons/fi'
// import { DefaultModal } from './DefaultModal'
// import { DoNotDisturbModal } from './DoNotDisturbModal'
// import { FavoriteModal } from './FavoriteModal'
// import {
//     AddToSignupModal,
//     DeleteFutureIndustryModal,
//     DeleteMultiFutureIndustryModal,
// } from './modal'
import { checkListLength, ellipsisText } from '@utils'
import Image from 'next/image'
import {
    RtoDoNotDisturbModal,
    RtoDefaultModal,
    RtoFavoriteModal,
    RtoListingDeleteModal,
    RtoFollowUpModal,
    RtoSnoozedModal,
} from './modal'
import { AddRtoListing } from './contextBar'
import Link from 'next/link'
import { RiChatFollowUpLine } from 'react-icons/ri'
// import { AddIndustry } from './tabs'

export const FilteredRtoListing = ({
    industries,
    setPage,
    itemPerPage,
    setItemPerPage,
    onSetIndustryData,
}: {
    industries: any
    setPage: any
    itemPerPage: any
    setItemPerPage: any
    onSetIndustryData: (val: any) => void
}) => {
    const router = useRouter()
    const [modal, setModal] = useState<ReactElement | null>(null)

    const contextBar = useContextBar()

    // hooks
    const { passwordModal, onViewPassword } = useActionModal()

    const onModalCancelClicked = () => setModal(null)

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

    const onFollowUpClicked = (rto: any) => {
        setModal(
            <RtoFollowUpModal
                rto={rto}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }
    const onSnoozedClicked = (rto: any) => {
        setModal(
            <RtoSnoozedModal
                rto={rto}
                onCancel={() => onModalCancelClicked()}
            />
        )
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
            {
                text: 'Follow Up',
                onClick: (rto: any) => onFollowUpClicked(rto),
                Icon: RiChatFollowUpLine,
                color: 'text-indigo-500 hover:bg-indigo-100 hover:border-indigo-200',
            },
            {
                text: 'Snoozed',
                onClick: (rto: any) => onSnoozedClicked(rto),
                Icon: MdSnooze,
                color: 'text-gray-500 hover:bg-gray-100 hover:border-gray-200',
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

    const statusConfig: any = {
        [RtoStatus.FAVOURITE]: {
            label: 'Favorite',
            color: 'text-green-500',
            icon: <MdOutlineFavorite className="text-green-500" />,
        },
        [RtoStatus.DO_NOT_DISTURB]: {
            label: 'Do Not Disturb',
            color: 'text-red-500',
            icon: <AiFillWarning className="text-red-500 text-lg" />,
        },
        [RtoStatus.FOLLOW_UP]: {
            label: 'Follow Up',
            color: 'text-indigo-500',
            icon: <RiChatFollowUpLine className="text-indigo-500 text-lg" />,
        },
        [RtoStatus.SNOOZED]: {
            label: 'Snoozed',
            color: 'text-gray-500',
            icon: <MdSnooze className="text-gray-500 text-lg" />,
        },
    }

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'businessName',
            header: () => <span>Name</span>,
            cell: (info) => {
                const isDuplicated = industries?.dupicatedListing
                    ?.map((e: any) => e?.listing_email)
                    ?.includes(info?.row?.original?.email)
                return (
                    <Link
                        href={`/portals/sub-admin/tasks/rto-listing/${info?.row?.original?.id}`}
                        className={`flex items-center gap-x-1.5`}
                    >
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
                    </Link>
                )
            },
        },
        {
            accessorKey: 'phone',
            header: () => <span>Phone</span>,
        },
        {
            accessorKey: 'rtoCode',
            header: () => <span>RTO Code</span>,
        },
        {
            accessorKey: 'contactPerson',
            header: () => <span>Contact Person</span>,
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
            cell: ({ row }) => {
                const { status } = row.original
                const statusData = statusConfig[status]

                return statusData ? (
                    <div className="rounded-lg flex items-center gap-x-2">
                        <p className={`${statusData.color} font-semibold`}>
                            {statusData.label}
                        </p>
                        {statusData?.icon}
                    </div>
                ) : (
                    <div className="flex items-center gap-x-2">----</div>
                )
            },
        },
        {
            accessorKey: 'note',
            header: () => <span>Note</span>,
            cell: (info) => (
                <div title={info?.row?.original?.note}>
                    {ellipsisText(info.row.original?.note, 16) || 'N/A'}
                </div>
            ),
        },
        {
            accessorKey: 'createdBy',
            header: () => <span>Created By</span>,
            cell: (info) => <>{info.row.original?.createdBy?.name || 'N/A'}</>,
        },
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
    //     individual: (id: SubAdmin) => (
    //         <div className="flex gap-x-2">
    //             <ActionButton Icon={FaEdit}>Edit</ActionButton>
    //             <ActionButton>Sub Admins</ActionButton>
    //             <ActionButton Icon={MdBlock} variant="error">
    //                 Block
    //             </ActionButton>
    //         </div>
    //     ),
    //     common: (ids: SubAdmin[]) => (
    //         <ActionButton Icon={MdBlock} variant="error">
    //             Block
    //         </ActionButton>
    //     ),
    // }

    return (
        <>
            {modal}
            {passwordModal && passwordModal}
            <div className="flex flex-col gap-y-4 p-4">
                <PageHeading
                    title={'Filtered RTO'}
                    subtitle={'List of Filtered RTO'}
                />

                <Card noPadding>
                    {industries?.isLoading || industries?.isFetching ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : industries?.data && industries?.data?.data?.length ? (
                        <Table
                            columns={columns as any}
                            data={industries.data?.data}
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
                                                industries.data?.data?.length
                                            )}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination(
                                                    industries?.data
                                                        ?.pagination,
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
                        <>
                            {/* <div className="flex justify-center mt-4 mb-24">
                                <Button
                                    text="Click here to add industry"
                                    variant="primary"
                                    onClick={() =>
                                        router.push(
                                            '/portals/admin/add-industry'
                                        )
                                    }
                                />
                            </div> */}
                            <EmptyData
                                title={'No RTO in your Search!'}
                                description={'No RTO in your Search yet'}
                                height={'50vh'}
                            />
                        </>
                    )}
                </Card>
            </div>
        </>
    )
}
