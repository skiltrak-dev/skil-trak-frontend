import {
    Button,
    Card,
    EmptyData,
    InitialAvatar,
    LoadingAnimation,
    Table,
    TableAction,
    TableActionOption,
    TechnicalError,
    TruncatedTextWithTooltip
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaEye, FaFileExport } from 'react-icons/fa'

import { CommonApi } from '@queries'
import { Industry, IndustryBranchesAddressType } from '@types'
import { ReactElement, useState } from 'react'

// hooks
import { useContextBar } from '@hooks'
import { MdDelete, MdEmail, MdPhoneIphone } from 'react-icons/md'
import { AddBranchesAddresses, EditBranchesAddresses } from './contextBar'
import { DeleteBranchesModal } from './modal'

export const IndustryBranchesAddress = ({
    industry,
}: {
    industry: Industry
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    const contextBar = useContextBar()

    const { isLoading, data, isError } = CommonApi.Industries.useList({
        id: industry?.id,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    const onModalCancelClicked = () => {
        setModal(null)
    }

    const onRemoveBranch = (branch: IndustryBranchesAddressType) => {
        setModal(
            <DeleteBranchesModal
                branch={branch}
                onCancel={onModalCancelClicked}
            />
        )
    }

    const onAddLocations = () => {
        contextBar.show(false)
        contextBar.setTitle('Add Secondary Address')
        contextBar.setContent(
            <AddBranchesAddresses industryId={industry?.id} />
        )
    }

    const onEditBranch = (branch: IndustryBranchesAddressType) => {
        contextBar.show(false)
        contextBar.setTitle('Edit Secondary Address')
        contextBar.setContent(
            <EditBranchesAddresses branch={branch} industryId={industry?.id} />
        )
    }

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'Edit',
            onClick: (branch: any) => {
                onEditBranch(branch)
            },
            Icon: FaEye,
        },
        {
            text: 'Delete',
            onClick: (branch: IndustryBranchesAddressType) =>
                onRemoveBranch(branch),
            Icon: MdDelete,
        },
    ]

    const columns: ColumnDef<IndustryBranchesAddressType>[] = [
        {
            accessorKey: 'user.name',
            cell: (info) => {
                return (
                    <div className="flex items-center gap-x-2">
                        <div className="shadow-inner-image rounded-full relative">
                            {info.row.original?.contactPerson && (
                                <InitialAvatar
                                    name={info.row.original?.contactPerson}
                                />
                            )}
                        </div>
                        <div>
                            <div className="flex items-center gap-x-2">
                                <p className="font-semibold">
                                    {info.row.original?.contactPerson}
                                </p>
                            </div>
                            {/* snoozedDate */}
                            <div className="font-medium text-xs text-gray-500">
                                <p className="flex items-center gap-x-1">
                                    <span>
                                        <MdEmail />
                                    </span>
                                    {info.row.original?.contactPersonEmail}
                                </p>
                                <p className="flex items-center gap-x-1">
                                    <span>
                                        <MdPhoneIphone />
                                    </span>
                                    {info.row.original?.contactPersonPhone}
                                </p>
                            </div>
                        </div>
                    </div>
                )
            },
            header: () => <span>Contact Person</span>,
        },
        {
            accessorKey: 'address',
            header: () => <span>Address</span>,
            cell: (info) => (
                <TruncatedTextWithTooltip text={info?.row?.original?.address} />
            ),
        },
        {
            accessorKey: 'suburb',
            header: () => <span>Suburb</span>,
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'studentCapacity',
            header: () => <span>Capacity</span>,
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'enrolledStudents',
            header: () => <span>Enrolled</span>,
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

    return (
        <>
            {modal && modal}
            <div className="flex flex-col gap-y-4 mb-32">
                <PageHeading
                    title={'Industry Locations'}
                    subtitle={'List of Industry Locations'}
                >
                    <Button
                        text="Add Location"
                        variant="info"
                        Icon={FaFileExport}
                        onClick={onAddLocations}
                    />
                </PageHeading>

                <Card noPadding>
                    {isError && <TechnicalError />}
                    {isLoading ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : data && data?.data?.length ? (
                        <Table columns={columns} data={data.data}>
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
                                    <div className="px-6">{table}</div>
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
                                title={'No Industry Branches!'}
                                description={'There is no Industry Branches'}
                                height={'50vh'}
                            />
                        )
                    )}
                </Card>
            </div>
        </>
    )
}
