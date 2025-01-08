import {
    ActionButton,
    Button,
    Card,
    EmptyData,
    Filter,
    LoadingAnimation,
    NoteTemplateFilter,
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

import { useContextBar } from '@hooks'
import { AdminApi } from '@queries'
import { NoteTemplateFilterFilterType, WorkplaceType } from '@types'
import { getFilterQuery } from '@utils'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { DeleteNoteTemplateModal } from './modals'
import { ContentViewModal } from './components'

const filterKeys = ['subject']

export const NoteTemplate = () => {
    const router = useRouter()
    const contextBar = useContextBar()

    const [modal, setModal] = useState<ReactElement | null>(null)

    const [filterAction, setFilterAction] = useState(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState<NoteTemplateFilterFilterType>(
        {} as NoteTemplateFilterFilterType
    )

    const { isLoading, data, isError, isFetching } =
        AdminApi.NotesTemplates.notesTemplates({
            search: `${JSON.stringify(filter)
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

    const onDeleteClicked = (noteTemplate: any) => {
        setModal(
            <DeleteNoteTemplateModal
                noteTemplate={noteTemplate}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const onContentViewClicked = (content: string, type: string) => {
        setModal(
            <ContentViewModal
                type={type}
                content={content}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    useEffect(() => {
        contextBar.hide()
    }, [])

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'Edit',
            onClick: (noteTemplate: any) => {
                router.push(
                    `/portals/admin/note-template/${noteTemplate?.id}/edit`
                )
            },
            Icon: FaEdit,
        },
        {
            text: 'Delete',
            onClick: (noteTemplate: any) => onDeleteClicked(noteTemplate),
            Icon: FaTrash,
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        },
    ]

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'subject',
            cell: (info) => (
                <div className="relative group ">
                    <Typography variant="label" color="text-gray-800">
                        {info.row.original?.subject}
                    </Typography>
                </div>
            ),
            header: () => <span>Subject</span>,
        },
        {
            accessorKey: 'subject',
            cell: (info) => (
                <ActionButton
                    onClick={() => {
                        onContentViewClicked(
                            info?.row?.original?.successContent,
                            'Success'
                        )
                    }}
                    variant="info"
                >
                    View
                </ActionButton>
            ),
            header: () => <span>Success Content</span>,
        },
        {
            accessorKey: 'subject',
            cell: (info) => (
                <ActionButton
                    onClick={() => {
                        onContentViewClicked(
                            info?.row?.original?.failureContent,
                            'Failure'
                        )
                    }}
                    variant="info"
                >
                    View
                </ActionButton>
            ),
            header: () => <span>Failure Content</span>,
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

    return (
        <>
            {modal && modal}
            <div className="flex flex-col gap-y-4 mb-32">
                <PageHeading
                    title={'Notes Template'}
                    subtitle={'List of all Notes Template'}
                >
                    <Button
                        text="Add Note Template"
                        onClick={() => {
                            router.push('/portals/admin/note-template/add')
                        }}
                    />

                    {filterAction}
                </PageHeading>

                <Filter<NoteTemplateFilterFilterType>
                    component={NoteTemplateFilter}
                    initialValues={filter}
                    setFilterAction={setFilterAction}
                    setFilter={setFilter}
                    filterKeys={filterKeys}
                />

                <Card noPadding>
                    {isError && <TechnicalError />}
                    {isLoading || isFetching ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : data && data?.data.length ? (
                        <Table
                            columns={columns}
                            data={data?.data}
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
                                                    data?.data?.length
                                                )}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination &&
                                                    pagination(
                                                        data?.pagination,
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
                        !isError && (
                            <EmptyData
                                title={'No Workplace Types!'}
                                description={
                                    'You have not added any workplace types yet'
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
