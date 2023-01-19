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
import { FaEdit, FaEye } from 'react-icons/fa'

import { useActionModal, useContextBar } from '@hooks'
import { Industry } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { MdBlock } from 'react-icons/md'
import { IndustryCell } from './components'
import { BlockModal } from './modals'
import { RiLockPasswordFill } from 'react-icons/ri'

export const FilteredIndustry = ({
    industry,
    setPage,
    itemPerPage,
    setItemPerPage,
}: {
    industry: any
    setPage: any
    itemPerPage: any
    setItemPerPage: any
}) => {
    const router = useRouter()
    const [modal, setModal] = useState<ReactElement | null>(null)

    // hooks
    const { passwordModal, onViewPassword } = useActionModal()

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

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: (industry: any) => {
                router.push(
                    `/portals/admin/industry/${industry.id}?tab=sectors`
                )
            },
            Icon: FaEye,
        },
        {
            text: 'Edit',
            onClick: (row: any) => {
                router.push(`/portals/admin/industry/edit-industry/${row.id}`)
            },
            Icon: FaEdit,
        },
        {
            text: 'View Password',
            onClick: (industry: Industry) => onViewPassword(industry),
            Icon: RiLockPasswordFill,
        },
        // {
        //     text: 'Block',
        //     onClick: (industry: Industry) => onBlockClicked(industry),
        //     Icon: MdBlock,
        //     color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        // },
    ]

    const columns: ColumnDef<Industry>[] = [
        {
            accessorKey: 'user.name',
            cell: (info) => {
                return <IndustryCell industry={info.row.original} />
            },
            header: () => <span>Industry</span>,
        },
        {
            accessorKey: 'abn',
            header: () => <span>ABN</span>,
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'contactPerson',
            header: () => <span>Contact Person</span>,
            cell: (info) => {
                return (
                    <div>
                        <p>{info.row.original.contactPerson}</p>
                        <p className="text-xs text-gray-500">
                            {info.row.original.contactPersonNumber}
                        </p>
                    </div>
                )
            },
        },

        {
            accessorKey: 'addressLine1',
            header: () => <span>Address</span>,
            cell: (info) => info.getValue(),
        },

        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: (info: any) => {
                return (
                    <div className="flex gap-x-1 items-center">
                        <TableAction
                            options={tableActionOptions}
                            rowItem={info.row.original}
                        />
                    </div>
                )
            },
        },
    ]

    const quickActionsElements = {
        id: 'id',
        individual: (id: number) => (
            <div className="flex gap-x-2">
                <ActionButton Icon={FaEdit}>Edit</ActionButton>
                <ActionButton>Sub Admins</ActionButton>
                <ActionButton Icon={MdBlock} variant="error">
                    Block
                </ActionButton>
            </div>
        ),
        common: (ids: number[]) => (
            <ActionButton Icon={MdBlock} variant="error">
                Block
            </ActionButton>
        ),
    }

    return (
        <>
            {modal && modal}
            {passwordModal && passwordModal}
            <div className="flex flex-col gap-y-4 p-4">
                <PageHeading
                    title={'Filtered Industries'}
                    subtitle={'List of Filtered Industries'}
                />

                <Card noPadding>
                    {industry?.isLoading || industry?.isFetching ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : industry?.data && industry?.data?.data.length ? (
                        <Table
                            columns={columns}
                            data={industry?.data.data}
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
                                                    industry?.data?.pagination,
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
                        <EmptyData
                            title={'No Industries in your Search!'}
                            description={'No Industries in your Search yet'}
                            height={'50vh'}
                        />
                    )}
                </Card>
            </div>
        </>
    )
}
