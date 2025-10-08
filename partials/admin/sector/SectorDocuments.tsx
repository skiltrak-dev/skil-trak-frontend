import {
    ActionButton,
    Button,
    Card,
    EmptyData,
    Filter,
    LoadingAnimation,
    SectorDocumentFilters,
    SetDetaultQueryFilteres,
    Table,
    TableAction,
    TableActionOption,
    TableChildrenProps,
    TechnicalError,
    Typography,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaEdit, FaTrash } from 'react-icons/fa'

import { useContextBar, useNavbar } from '@hooks'
import { AdminApi } from '@queries'
import { SectorDocument, SectorDocumentFilterType } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { DeleteSectorDocumentModal } from './modals'
import { removeEmptyValues } from '@utils'

const filterKeys = ['name', 'sectorId']

export const SectorDocuments = () => {
    const router = useRouter()
    const contextBar = useContextBar()
    const navBar = useNavbar()

    const [modal, setModal] = useState<ReactElement | null>(null)

    const [filterAction, setFilterAction] = useState(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState<SectorDocumentFilterType>(
        {} as SectorDocumentFilterType
    )

    useEffect(() => {
        navBar.setTitle('Sector Documents')
        return () => {
            navBar.setTitle('')
        }
    }, [])

    const data = AdminApi.SectorDocuments.sectorDocuments({
        search: `${JSON.stringify(removeEmptyValues(filter))
            .replaceAll('{', '')
            .replaceAll('}', '')
            .replaceAll('"', '')
            .trim()}`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    const onModalCancelClicked = () => {
        setModal(null)
    }

    const onDeleteClicked = (sectorDocument: SectorDocument) => {
        setModal(
            <DeleteSectorDocumentModal
                sectorDocument={sectorDocument}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    useEffect(() => {
        contextBar.hide()
    }, [])

    const tableActionOptions: TableActionOption<any>[] = [
        {
            text: 'Edit',
            onClick: (item: SectorDocument) => {
                router.push(
                    `/portals/admin/sectors/sector-documents/${item.id}`
                )
            },
            Icon: FaEdit,
        },
        {
            text: 'Delete',
            onClick: (sectorDocument: SectorDocument) =>
                onDeleteClicked(sectorDocument),
            Icon: FaTrash,
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        },
    ]

    const columns: ColumnDef<SectorDocument>[] = [
        {
            accessorKey: 'name',
            cell: (info) => (
                <div className="relative group ">
                    <Typography variant="label" color="text-gray-800">
                        {info.row.original?.name}
                    </Typography>
                </div>
            ),
            header: () => <span>Name</span>,
        },

        {
            accessorKey: 'sector',
            cell: (info) => (
                <div className="bg-primaryNew rounded px-2 py-1 w-fit">
                    <Typography variant="xs" color="text-white">
                        {info.row.original?.sector?.name}
                    </Typography>
                </div>
            ),
            header: () => <span>Sector</span>,
        },

        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: (info) => (
                <div className="flex gap-x-1 items-center">
                    <TableAction
                        options={tableActionOptions}
                        rowItem={info.row.original}
                    />
                </div>
            ),
        },
    ]

    const quickActionsElements = {
        id: 'id',
        individual: (item: any) => (
            <div className="flex gap-x-2">
                <ActionButton Icon={FaEdit}>Edit</ActionButton>
                <ActionButton
                    Icon={FaTrash}
                    variant="error"
                    onClick={() => onDeleteClicked(item)}
                >
                    Delete
                </ActionButton>
            </div>
        ),
        common: (items: any[]) => (
            <div className="flex gap-x-2">
                <ActionButton variant="success">Accept</ActionButton>
                <ActionButton Icon={FaTrash} variant="error">
                    Delete
                </ActionButton>
            </div>
        ),
    }

    console.log({ data })

    return (
        <>
            {modal}
            <SetDetaultQueryFilteres<SectorDocumentFilterType>
                filterKeys={filterKeys}
                setFilter={setFilter}
            />
            <div className="flex flex-col gap-y-4 mb-32">
                <PageHeading
                    title={'Sector Documents'}
                    subtitle={'List of all sector documents'}
                >
                    <Button
                        text="Add Sector Document"
                        onClick={() => {
                            router.push('sectors/sector-documents')
                        }}
                    />

                    {filterAction}
                </PageHeading>

                <Filter<SectorDocumentFilterType>
                    component={SectorDocumentFilters}
                    initialValues={filter}
                    setFilterAction={setFilterAction}
                    setFilter={setFilter}
                    filterKeys={filterKeys}
                />

                <Card noPadding>
                    {data?.isError && <TechnicalError />}
                    {data?.isLoading || data?.isFetching ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : data?.data?.data && data?.data?.data?.length ? (
                        <Table
                            columns={columns}
                            data={data?.data?.data}
                            enableRowSelection
                            quickActions={quickActionsElements}
                        >
                            {({
                                table,
                                pagination,
                                pageSize,
                                quickActions,
                            }: TableChildrenProps) => {
                                return (
                                    <div>
                                        <div className="p-6 mb-2 flex justify-between">
                                            {pageSize &&
                                                pageSize(
                                                    itemPerPage,
                                                    setItemPerPage,
                                                    data?.data?.data?.length
                                                )}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination &&
                                                    data?.data?.pagination &&
                                                    pagination(
                                                        data?.data?.pagination,
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
                        !data?.isError && (
                            <EmptyData
                                title={'No Sector Documents!'}
                                description={
                                    'You have not added any sector documents yet'
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
