import {
    ActionButton,
    Badge,
    Button,
    Card,
    EmptyData,
    GlobalModal,
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
import { FaEdit, FaFileExport, FaRegCopy } from 'react-icons/fa'

import { CommonApi, commonApi } from '@queries'
import { Industry, IndustryStatus } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { FiLogIn } from 'react-icons/fi'
import { MdBlock, MdDelete, MdEmail, MdOutlineFavorite } from 'react-icons/md'
// import { IndustryCell, SectorCell } from './components'
// import { BlockModal } from './modals'

// hooks
import { useContextBar, useNotification } from '@hooks'
import Image from 'next/image'
import { AiFillCheckCircle, AiFillWarning } from 'react-icons/ai'
import { BiPencil } from 'react-icons/bi'
import { DefaultModal } from '../DefaultModal'
import { DoNotDisturbModal } from '../DoNotDisturbModal'
import { FavoriteModal } from '../FavoriteModal'
import {
    AddIndustryListingNoteModal,
    AddToSignupModal,
    BlockIndustryListingModal,
    DeleteFutureIndustryModal,
    DeleteMultiFutureIndustryModal,
    IndustryListingCallModal,
    ViewNoteModal,
} from '../modal'
import { MultipleDefaultModal } from '../MultipleDefaultModal'
import { MultipleDoNotDisturbModal } from '../MultipleDoNotDisturbModal'
import { MultipleFavoriteModal } from '../MultipleFavoriteModal'
import { AddIndustry } from './AddIndustry'
import { IndustryListingCellInfo } from '../components'

export const ActiveIndustries = ({
    onSetIndustryData,
}: {
    onSetIndustryData: (val: any) => void
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const router = useRouter()
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [noteId, setNoteId] = useState(null)

    const contextBar = useContextBar()

    const { notification } = useNotification()

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    const { isLoading, data, isError } =
        CommonApi.FindWorkplace.useGetAllFindWorkplaces(
            {
                search: '',
                skip: itemPerPage * page - itemPerPage,
                limit: itemPerPage,
            },
            {
                refetchOnMountOrArgChange: true,
            }
        )

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

    const onBlockClicked = (industry: Industry) => {
        setModal(
            <BlockIndustryListingModal
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
    const onMultipleFavoriteClicked = (ids: any) => {
        setModal(
            <MultipleFavoriteModal ids={ids} onCancel={onModalCancelClicked} />
        )
    }
    const onMultipleDoNotDisturbClick = (ids: any) => {
        setModal(
            <MultipleDoNotDisturbModal
                ids={ids}
                onCancel={onModalCancelClicked}
            />
        )
    }
    const onMultipleDefaultClicked = (ids: any) => {
        setModal(
            <MultipleDefaultModal ids={ids} onCancel={onModalCancelClicked} />
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
    // const onViewNote = ({ note }: any) => {
    //     setModal(
    //         <GlobalModal>
    //             <ViewIndustryListingNoteModal
    //                 note={note}
    //                 onCancel={onModalCancelClicked}
    //             />
    //         </GlobalModal>
    //     )
    // }

    const onViewNote = (industry: any) => {
        setModal(
            <ViewNoteModal
                onCancel={onModalCancelClicked}
                industry={industry}
            />
        )
    }

    const onPhoneClicked = (id: number, note: string) => {
        setModal(
            <IndustryListingCallModal
                note={note}
                id={id}
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
                text: industry?.signedUp
                    ? 'Remove From Signup'
                    : 'Add to Signup',
                onClick: (industry: any) => onAddToSignupClicked(industry),
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
                text: 'Block Industry',
                onClick: (industry: Industry) => onBlockClicked(industry),
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
                    router.push(
                        `/portals/sub-admin/tasks/industry-listing/signup-future-industry`
                    )
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
                const isDuplicated = data?.dupicatedListing
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
            cell: (info) => (
                <div className="group flex items-center gap-x-1">
                    <div
                        className="whitespace-pre  "
                        onClick={() => {
                            onPhoneClicked(
                                info?.row?.original?.id,
                                info?.row?.original?.note
                            )
                        }}
                    >
                        <Typography variant="label" cursorPointer>
                            {info?.row?.original?.phone}
                        </Typography>
                    </div>
                    <div className="hidden group-hover:block cursor-pointer ">
                        <div className="group relative">
                            <FaRegCopy
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        info?.row?.original?.phone
                                    )
                                    notification.success({
                                        title: 'Copies',
                                        description: 'Phone Number Copied',
                                    })
                                }}
                                className="text-gray-500"
                                size={18}
                            />
                            {/* <Tooltip>Copy Phone Number</Tooltip> */}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            accessorKey: 'address',
            header: () => <span>Address</span>,
            cell: (info) => (
                <TruncatedTextWithTooltip text={info.row.original?.address} />
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
            accessorKey: 'country.name',
            header: () => <span>Region</span>,
        },
        {
            accessorKey: 'region.name',
            header: () => <span>State</span>,
        },
        {
            accessorKey: 'status',
            header: () => <span>Status</span>,
            cell: (info) => {
                switch (info.row.original.status) {
                    case IndustryStatus.FAVOURITE:
                        return <Badge variant="success" text="Favorite" />
                    case IndustryStatus.DO_NOT_DISTURB:
                        return <Badge variant="error" text="Do Not Disturb" />
                    case IndustryStatus.BLOCKED:
                        return <Badge variant="success" text="Blocked" />

                    default:
                        return '---'
                }
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
            accessorKey: 'createdAt',
            header: () => <span>Created At</span>,
            cell: (info) => (
                <UserCreatedAt createdAt={info.row.original?.createdAt} />
            ),
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
            <div className="flex items-center gap-x-2">
                <ActionButton
                    onClick={() => {
                        const arrayOfIds = ids.map((id: any) => id?.id)
                        onMultipleDefaultClicked(arrayOfIds)
                    }}
                    Icon={MdDelete}
                    variant="light"
                >
                    Default
                </ActionButton>
                <ActionButton
                    onClick={() => {
                        const arrayOfIds = ids.map((id: any) => id?.id)
                        onMultipleDoNotDisturbClick(arrayOfIds)
                    }}
                    Icon={AiFillWarning}
                    variant="error"
                >
                    Do Not Disturb
                </ActionButton>
                <ActionButton
                    onClick={() => {
                        const arrayOfIds = ids.map((id: any) => id?.id)
                        onMultipleFavoriteClicked(arrayOfIds)
                    }}
                    Icon={MdOutlineFavorite}
                    variant="success"
                >
                    Favorite
                </ActionButton>
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
            </div>
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
                    ) : data?.paginatedResults?.data &&
                      data?.paginatedResults?.data?.length ? (
                        <Table
                            columns={columns as any}
                            data={data?.paginatedResults?.data}
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
                                            data?.paginatedResults?.data?.length
                                        )}
                                        <div className="flex gap-x-2">
                                            {quickActions}
                                            {pagination(
                                                data?.paginatedResults
                                                    ?.pagination,
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
