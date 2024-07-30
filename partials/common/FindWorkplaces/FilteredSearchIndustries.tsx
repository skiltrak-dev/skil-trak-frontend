import {
    ActionButton,
    Card,
    EmptyData,
    GlobalModal,
    InitialAvatar,
    LoadingAnimation,
    Table,
    TableAction,
    TableActionOption,
    Tooltip,
    Typography,
    UserCreatedAt,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaEdit } from 'react-icons/fa'

import { useActionModal, useContextBar } from '@hooks'
import { IndustryStatus, SubAdmin } from '@types'
import { useRouter } from 'next/router'
import { MdBlock, MdDelete, MdEmail, MdOutlineFavorite } from 'react-icons/md'
// import { RtoCell, SectorCell, SubAdminCell } from './components'
// import { AddSubAdminCB, ViewRtosCB, ViewSectorsCB } from './contextBar'
import { ReactElement, useState } from 'react'
import { AiFillCheckCircle, AiFillWarning } from 'react-icons/ai'
import { BiPencil } from 'react-icons/bi'
import { FiLogIn } from 'react-icons/fi'
import { DefaultModal } from './DefaultModal'
import { DoNotDisturbModal } from './DoNotDisturbModal'
import { FavoriteModal } from './FavoriteModal'
import {
    AddIndustryListingNoteModal,
    AddToSignupModal,
    DeleteFutureIndustryModal,
    DeleteMultiFutureIndustryModal,
    ViewNoteModal,
} from './modal'
import { checkListLength } from '@utils'
import Image from 'next/image'
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

    // hooks
    const { passwordModal, onViewPassword } = useActionModal()

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

    const onDeleteMultiFutureIndustry = (industry: any) => {
        setModal(
            <DeleteMultiFutureIndustryModal
                futureIndustries={industry}
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

    // const tableActionOptions: TableActionOption[] = [
    //     {
    //         text: 'Add to Signup',
    //         onClick: (industry: any) => onAddToSignupClicked(industry),
    //         Icon: AiFillCheckCircle,
    //         color: `'text-green-500 hover:bg-green-100 hover:border-green-200'`,
    //     },
    //     {
    //         text: 'Default',
    //         onClick: (industry: any) => onDefaultClicked(industry),
    //         Icon: AiFillCheckCircle,
    //         color: `'text-green-500 hover:bg-green-100 hover:border-green-200'`,
    //     },
    //     {
    //         text: 'Favorite',
    //         onClick: (industry: any) => onFavoriteClicked(industry),
    //         Icon: MdOutlineFavorite,
    //         color: 'text-green-500 hover:bg-green-100 hover:border-green-200',
    //     },
    //     {
    //         text: 'Do Not Disturb',
    //         onClick: (industry: any) => onDoNotDisturbClicked(industry),
    //         Icon: AiFillWarning,
    //         color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
    //     },
    //     {
    //         text: 'SignUp',
    //         onClick: (industry: any) => {
    //             localStorage.setItem('signup-data', JSON.stringify(industry))
    //             router.push(`/auth/signup/industry?step=account-info`)
    //         },
    //         Icon: FiLogIn,
    //     },
    //     {
    //         text: 'Edit',
    //         onClick: (futureIndustry: any) => {
    //             onSetIndustryData(futureIndustry)
    //         },
    //         Icon: BiPencil,
    //     },
    //     {
    //         text: 'Delete',
    //         onClick: (futureIndustry: any) => {
    //             onDeleteFutureIndustry(futureIndustry)
    //         },
    //         Icon: MdDelete,
    //     },
    // ]

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
                    <div className="flex items-center gap-x-1.5">
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
                            <Typography variant={'label'}>
                                {info?.row?.original?.email}
                            </Typography>
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
            accessorKey: 'note',
            header: () => <div>Note</div>,
            cell: (info) => {
                return (
                    <>
                        <div className="flex items-center">
                            {info?.row?.original?.note ? (
                                <div>
                                    <ActionButton
                                        variant="info"
                                        simple
                                        onClick={() => {
                                            onViewNote(info?.row?.original)
                                        }}
                                    >
                                        View
                                    </ActionButton>
                                </div>
                            ) : null}

                            <div>
                                <ActionButton
                                    variant="info"
                                    simple
                                    onClick={() => {
                                        setModal(
                                            <GlobalModal>
                                                <AddIndustryListingNoteModal
                                                    onCancel={
                                                        onModalCancelClicked
                                                    }
                                                    id={info?.row?.original?.id}
                                                    noteData={
                                                        info?.row?.original
                                                            ?.note
                                                    }
                                                />
                                            </GlobalModal>
                                        )
                                    }}
                                >
                                    {info?.row?.original?.note ? 'Edit' : 'Add'}
                                </ActionButton>
                            </div>
                        </div>
                    </>
                )
            },
        },
        {
            accessorKey: 'createdBy',
            header: () => <span>Created By</span>,
            cell: (info) =>
                info?.row?.original?.createdBy ? (
                    <div className="flex items-center gap-x-2">
                        <div className="shadow-inner-image rounded-full relative">
                            {info?.row?.original?.createdBy?.user?.name && (
                                <InitialAvatar
                                    name={info?.row?.original?.createdBy?.name}
                                    imageUrl={
                                        info?.row?.original?.createdBy?.name
                                    }
                                />
                            )}
                        </div>
                        <div>
                            <div className="flex items-center gap-x-2">
                                <p className="font-semibold">
                                    {info?.row?.original?.createdBy?.name}
                                </p>
                            </div>

                            <div className="font-medium text-xs text-gray-500">
                                <p className="flex items-center gap-x-1">
                                    <span>
                                        <MdEmail />
                                    </span>
                                    {info?.row?.original?.createdBy?.email}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    '---'
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
            {passwordModal && passwordModal}
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
