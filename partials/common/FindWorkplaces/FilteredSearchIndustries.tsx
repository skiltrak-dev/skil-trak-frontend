import {
    ActionButton,
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TableAction,
    TableActionOption,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaEdit } from 'react-icons/fa'

import { useActionModal, useContextBar } from '@hooks'
import { IndustryStatus, SubAdmin } from '@types'
import { useRouter } from 'next/router'
import { MdBlock, MdDelete, MdOutlineFavorite } from 'react-icons/md'
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
    DeleteFutureIndustryModal,
    DeleteMultiFutureIndustryModal,
} from './modal'
import { checkListLength } from '@utils'

export const FilteredSearchIndustries = ({
    subAdmin,
    setPage,
    itemPerPage,
    setItemPerPage,
    onSetIndustryData,
}: {
    subAdmin: any
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

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'Default',
            onClick: (industry: any) => onDefaultClicked(industry),
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
                localStorage.setItem('signup-data', JSON.stringify(industry))
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

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'businessName',
            header: () => <span>Name</span>,
        },
        {
            accessorKey: 'email',
            header: () => <span>Email</span>,
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
            cell: (info: any) => {
                const length = checkListLength<any>(subAdmin?.data?.data)
                return (
                    <div className="flex gap-x-1 items-center">
                        <TableAction
                            options={tableActionOptions}
                            rowItem={info.row.original}
                            lastIndex={length.includes(info.row?.index)}
                        />
                    </div>
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
                    {subAdmin?.isLoading || subAdmin?.isFetching ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : subAdmin?.data && subAdmin?.data?.data.length ? (
                        <Table
                            columns={columns as any}
                            data={subAdmin?.data.data}
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
                                                setItemPerPage
                                            )}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination(
                                                    subAdmin?.data?.pagination,
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
