import {
    ActionButton,
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TableAction,
    Typography,
    UserCreatedAt,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaEdit } from 'react-icons/fa'

import { useContextBar } from '@hooks'
import { SubAdmin } from '@types'
import { useRouter } from 'next/router'
import { MdBlock, MdDelete, MdOutlineFavorite } from 'react-icons/md'

import { UserRoles } from '@constants'
import { getUserCredentials } from '@utils'
import { ReactElement, useState } from 'react'
import { AiFillCheckCircle, AiFillWarning } from 'react-icons/ai'
import { BiPencil } from 'react-icons/bi'
import { FiLogIn } from 'react-icons/fi'
import {
    AddressCell,
    IndustryListingCellInfo,
    IndustryListingStatus,
    ListingCreatedBy,
    PhoneNumberCell,
} from './components'
import { DefaultModal } from './DefaultModal'
import { DoNotDisturbModal } from './DoNotDisturbModal'
import { FavoriteModal } from './FavoriteModal'
import {
    AddToSignupModal,
    DeleteFutureIndustryModal,
    ViewNoteModal,
} from './modal'
import { AddIndustry } from './tabs'

export const FilteredSearchIndustries = ({
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

    const onModalCancelClicked = () => setModal(null)

    const onDoNotDisturbClicked = (industry: any) => {
        setModal(
            <DoNotDisturbModal
                industry={industry}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }
    const onDefaultClicked = (industry: any) => {
        setModal(
            <DefaultModal
                industry={industry}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }
    const onFavoriteClicked = (industry: any) => {
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

    const onAddToSignupClicked = (industry: any) => {
        setModal(
            <AddToSignupModal
                industry={industry}
                onCancel={onModalCancelClicked}
            />
        )
    }

    const onEditIndustry = (industryData: any) => {
        contextBar.setContent(
            <AddIndustry
                industryData={industryData}
                onSetIndustryData={() => {
                    onSetIndustryData(null)
                }}
            />
        )
        contextBar.show(false)
        contextBar.setTitle('Edit Future Industry')
    }

    const onViewNote = (industry: any) => {
        setModal(
            <ViewNoteModal
                onCancel={onModalCancelClicked}
                industry={industry}
            />
        )
    }

    const role = getUserCredentials()?.role

    const tableActionOptions = (industry: any) => {
        const stored = localStorage.setItem(
            'signup-data',
            JSON.stringify(industry)
        )
        return [
            {
                text: 'Default',
                onClick: (industry: any) => onDefaultClicked(industry),
                Icon: AiFillCheckCircle,
                color: `'text-green-500 hover:bg-green-100 hover:border-green-200'`,
            },
            {
                text: industry?.signedUp
                    ? 'Remove From Signup'
                    : 'Add to Signup',
                onClick: (industry: any) => onAddToSignupClicked(industry),
                Icon: AiFillCheckCircle,
                color: `'text-green-500 hover:bg-green-100 hover:border-green-200'`,
            },
            {
                text: 'Favorite',
                onClick: (industry: any) => onFavoriteClicked(industry),
                Icon: MdOutlineFavorite,
                color: 'text-green-500 hover:bg-green-100 hover:border-green-200',
            },
            {
                text: 'Do Not Disturb',
                onClick: (industry: any) => onDoNotDisturbClicked(industry),
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
                    onEditIndustry(futureIndustry)
                },
                Icon: BiPencil,
            },
            {
                ...(role === UserRoles.ADMIN
                    ? {
                          text: 'Delete',
                          onClick: (futureIndustry: any) => {
                              onDeleteFutureIndustry(futureIndustry)
                          },
                          Icon: MdDelete,
                      }
                    : {}),
            },
        ]
    }

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'businessName',
            header: () => <span>Name</span>,
            cell: (info) => {
                const isDuplicated = industries?.data?.dupicatedListing
                    ?.map((e: any) => e?.listing_email)
                    ?.includes(info?.row?.original?.email)
                return (
                    <IndustryListingCellInfo
                        industryListing={info?.row?.original}
                        isDuplicated={isDuplicated}
                    />
                )
            },
        },
        {
            accessorKey: 'phone',
            header: () => <span>Phone</span>,
            cell: (info) => {
                const listing = info.row.original
                return (
                    <PhoneNumberCell
                        id={listing?.id}
                        note={listing?.note}
                        phoneNumber={listing?.phone}
                    />
                )
            },
        },
        {
            accessorKey: 'address',
            header: () => <span>Address</span>,
            cell: (info) => (
                <AddressCell address={info.row.original?.address} />
            ),
        },
        {
            accessorKey: 'department',
            header: () => <span>Department</span>,
            cell: (info) => (
                <Typography variant="label" capitalize>
                    {info.row?.original?.department}
                </Typography>
            ),
        },
        {
            accessorKey: 'status',
            header: () => <span>Status</span>,
            cell: (info) => (
                <IndustryListingStatus status={info.row.original?.staus} />
            ),
        },
        {
            accessorKey: 'note',
            header: () => <div>Note</div>,
            cell: (info) => (
                <ActionButton
                    variant="info"
                    simple
                    onClick={() => {
                        onViewNote(info?.row?.original)
                    }}
                >
                    View
                </ActionButton>
            ),
        },
        {
            accessorKey: 'createdBy',
            header: () => <span>Created By</span>,
            cell: (info) => (
                <ListingCreatedBy createdBy={info.row.original?.createdBy} />
            ),
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

    const quickActionsElements = {
        id: 'id',
        individual: (id: SubAdmin) => (
            <div className="flex gap-x-2">
                <ActionButton Icon={FaEdit}>Edit</ActionButton>
                <ActionButton>Sub Admins</ActionButton>
                <ActionButton Icon={MdBlock} variant="error">
                    Block
                </ActionButton>
            </div>
        ),
        common: (ids: SubAdmin[]) => (
            <ActionButton Icon={MdBlock} variant="error">
                Block
            </ActionButton>
        ),
    }

    return (
        <>
            {modal}
            <div className="flex flex-col gap-y-4 p-4">
                <PageHeading
                    title={'Filtered Industries'}
                    subtitle={'List of Filtered Industries'}
                />

                <Card noPadding>
                    {industries?.isLoading || industries?.isFetching ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : industries?.data &&
                      industries?.data?.paginatedResults?.data?.length ? (
                        <Table
                            columns={columns as any}
                            data={industries.data?.paginatedResults?.data}
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
                                                setItemPerPage,
                                                industries.data
                                                    ?.paginatedResults?.data
                                                    ?.length
                                            )}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination(
                                                    industries?.data
                                                        ?.paginatedResults
                                                        ?.pagination,
                                                    setPage
                                                )}
                                            </div>
                                        </div>
                                        <div className="px-6 overflow-auto custom-scrollbar">
                                            {table}
                                        </div>
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
                                title={'No Industry in your Search!'}
                                description={'No Industry in your Search yet'}
                                height={'50vh'}
                            />
                        </>
                    )}
                </Card>
            </div>
        </>
    )
}
