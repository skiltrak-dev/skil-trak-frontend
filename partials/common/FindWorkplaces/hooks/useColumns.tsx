import {
    ActionButton,
    AuthorizedUserComponent,
    Badge,
    CustomDropdown,
    TableAction,
    Typography,
    UserCreatedAt,
} from '@components'
import { ColumnDef } from '@tanstack/react-table'
import { FaEdit } from 'react-icons/fa'

import { Industry } from '@types'
import { ReactElement, useState } from 'react'
import { MdBlock, MdDelete } from 'react-icons/md'
// import { IndustryCell, SectorCell } from './components'
// import { BlockModal } from './modals'

// hooks
import { UserRoles } from '@constants'
import { useContextBar } from '@hooks'
import {
    AddressCell,
    IndustryListingCellInfo,
    IndustryListingStatus,
    ListingCreatedBy,
} from '../components'
import {
    BlockIndustryListingModal,
    DeleteMultiFutureIndustryModal,
    ViewNoteModal,
} from '../modal'
import { MultipleBlockModal } from '../MultipleBlockModal'
import { MultipleDefaultModal } from '../MultipleDefaultModal'
import { MultipleDoNotDisturbModal } from '../MultipleDoNotDisturbModal'
import { MultipleFavoriteModal } from '../MultipleFavoriteModal'
import { AddIndustry } from '../tabs'
import { useIndustryListingActions } from './useIndustryListingActions'

export const useColumns = ({
    data,
    onSetIndustryData,
}: {
    data: any
    onSetIndustryData: (val: any) => void
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const { actionsModal, tableActionOptions } =
        useIndustryListingActions(onSetIndustryData)

    const contextBar = useContextBar()

    const onModalCancelClicked = () => {
        setModal(null)
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
    const onMultipleBlockedClicked = (ids: any) => {
        setModal(
            <MultipleBlockModal ids={ids} onCancel={onModalCancelClicked} />
        )
    }

    const onViewNote = (industry: any) => {
        setModal(
            <ViewNoteModal
                onCancel={onModalCancelClicked}
                industry={industry}
            />
        )
    }

    const onBlockClicked = (industry: any) => {
        setModal(
            <BlockIndustryListingModal
                industry={industry}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const onEditIndustry = (industryData: any) => {
        contextBar.setContent(
            <AddIndustry
                industryData={industryData}
                onSetIndustryData={() => {
                    if (onSetIndustryData) {
                        onSetIndustryData(null)
                    }
                }}
            />
        )
        contextBar.show(false)
        contextBar.setTitle('Edit Future Industry')
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
            accessorKey: 'workplaceType',
            header: () => <span>Workplace Type</span>,
            cell: (info) => (
                <div className="min-w-32">
                    {info.row.original?.workplaceType ? (
                        <Badge
                            variant="info"
                            text={info.row.original?.workplaceType?.name}
                        />
                    ) : (
                        <Typography center>---</Typography>
                    )}
                </div>
            ),
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
            cell: (info) => (
                <IndustryListingStatus status={info.row.original?.status} />
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
                info?.row?.original?.isImported ? (
                    <Typography variant="label"> Auto Import </Typography>
                ) : (
                    <ListingCreatedBy
                        createdBy={info.row.original?.createdBy}
                    />
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

    const statusDataOptions = (ids: number[]) => [
        {
            onClick: () => {
                onMultipleDefaultClicked(ids)
            },
            text: 'Default',
            color: 'text-green-500 hover:bg-green-100 hover:border-green-200',
        },
        {
            onClick: () => {
                onMultipleDoNotDisturbClick(ids)
            },
            text: 'Do Not Disturb',
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        },
        {
            onClick: () => {
                onMultipleFavoriteClicked(ids)
            },
            text: 'Favorite',
            color: 'text-green-500 hover:bg-green-100 hover:border-green-200',
        },
        {
            onClick: () => {
                onMultipleBlockedClicked(ids)
            },
            text: 'Block',
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        },
    ]

    const quickActionsElements = {
        id: 'id',
        individual: (industry: any) => (
            <div className="flex gap-x-2">
                <ActionButton
                    Icon={FaEdit}
                    onClick={() => {
                        onEditIndustry(industry)
                    }}
                >
                    Edit
                </ActionButton>
                <ActionButton
                    Icon={MdBlock}
                    variant="error"
                    onClick={() => {
                        onBlockClicked(industry)
                    }}
                >
                    Block
                </ActionButton>
            </div>
        ),
        common: (ids: Industry[]) => {
            const arrayOfIds = ids.map((id: any) => id?.id)
            const options = statusDataOptions(arrayOfIds)
            return (
                <div className="flex items-center gap-x-2">
                    <CustomDropdown options={options} text="Change Status" />
                    <AuthorizedUserComponent roles={[UserRoles.ADMIN]}>
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
                    </AuthorizedUserComponent>
                </div>
            )
        },
    }

    return { columns, modal, actionsModal, quickActionsElements }
}
