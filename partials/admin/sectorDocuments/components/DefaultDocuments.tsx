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
import { DefaultDocumentsType, SectorDocumentFilterType } from '@types'
import { removeEmptyValues } from '@utils'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { DeleteDefaultDocumentModal, UpdateDocumentModal } from '../modal'

const filterKeys = ['name', 'sectorId']

export const DefaultDocuments = () => {
    const router = useRouter()
    const contextBar = useContextBar()
    const navBar = useNavbar()

    const [modal, setModal] = useState<ReactElement | null>(null)
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
    const [selectedDefaultDocument, setSelectedDefaultDocument] =
        useState<DefaultDocumentsType | null>(null)

    const [filterAction, setFilterAction] = useState(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState<SectorDocumentFilterType>(
        {} as SectorDocumentFilterType
    )

    useEffect(() => {
        navBar.setTitle('Default Documents')
        return () => {
            navBar.setTitle('')
        }
    }, [])

    const data = AdminApi.DefaultDocuments.defaultDocuments({
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

    const onDeleteClicked = (defaultDocument: DefaultDocumentsType) => {
        setModal(
            <DeleteDefaultDocumentModal
                defaultDocument={defaultDocument}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    useEffect(() => {
        contextBar.hide()
    }, [])

    const tableActionOptions: TableActionOption<DefaultDocumentsType>[] = [
        {
            text: 'Edit',
            onClick: (sectorDocument) => {
                setIsUpdateDialogOpen(true)
                setSelectedDefaultDocument(sectorDocument)
            },
            Icon: FaEdit,
        },
        {
            text: 'Delete',
            onClick: (sectorDocument) => onDeleteClicked(sectorDocument),
            Icon: FaTrash,
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        },
    ]

    const columns: ColumnDef<DefaultDocumentsType>[] = [
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
            accessorKey: 'description',
            cell: (info) => (
                <div className="relative group ">
                    <Typography variant="label" color="text-gray-800">
                        {info.row.original?.description}
                    </Typography>
                </div>
            ),
            header: () => <span>Description</span>,
        },
        {
            accessorKey: 'type',
            cell: (info) => (
                <div className="relative group ">
                    <Typography variant="label" color="text-gray-800">
                        {info.row.original?.type}
                    </Typography>
                </div>
            ),
            header: () => <span>Type</span>,
        },
        {
            accessorKey: 'capacity',
            cell: (info) => (
                <div className="relative group ">
                    <Typography variant="label" color="text-gray-800">
                        {info.row.original?.capacity}
                    </Typography>
                </div>
            ),
            header: () => <span>Capacity</span>,
        },

        {
            accessorKey: 'link',
            cell: (info) => (
                <div className="relative group ">
                    <Typography variant="label" color="text-gray-800">
                        {info.row.original?.link}
                    </Typography>
                </div>
            ),
            header: () => <span>Link</span>,
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

    return (
        <>
            {modal}
            <SetDetaultQueryFilteres<SectorDocumentFilterType>
                filterKeys={filterKeys}
                setFilter={setFilter}
            />
            <div className="flex flex-col gap-y-4 mb-32">
                <Card noPadding>
                    {data?.isError && <TechnicalError />}
                    {data?.isLoading || data?.isFetching ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : data?.data?.data && data?.data?.data?.length ? (
                        <Table columns={columns} data={data?.data?.data}>
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
                <UpdateDocumentModal
                    isOpen={isUpdateDialogOpen}
                    setIsOpen={setIsUpdateDialogOpen}
                    initialValues={selectedDefaultDocument}
                />
            </div>
        </>
    )
}
