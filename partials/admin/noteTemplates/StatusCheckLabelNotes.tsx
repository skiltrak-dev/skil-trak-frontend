import {
    ActionButton,
    Button,
    Card,
    EmptyData,
    Filter,
    LoadingAnimation,
    NoteTemplateFilter,
    TableAction,
    TableActionOption,
    TechnicalError,
    Typography,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaEdit, FaTrash } from 'react-icons/fa'

import { useContextBar } from '@hooks'
import { AdminApi } from '@queries'
import { NoteTemplateFilterFilterType } from '@types'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { ContentViewModal, Table } from './components'
import { useNotes } from './hooks'
import { DeleteNoteTemplateModal } from './modals'
import { BiSolidDownArrow, BiSolidRightArrow } from 'react-icons/bi'
import { NotesTemplateType } from './enum'
import moment from 'moment'
const DndWrapper = dynamic(
    () => import('./components/DndWrapper').then((mod) => mod.DndWrapper),
    { ssr: false }
)
const filterKeys = ['subject']

export const StatusCheckLabelNotes = () => {
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
            search: `type:${
                NotesTemplateType.StatusCheckLabel
            },${JSON.stringify(filter)
                .replaceAll('{', '')
                .replaceAll('}', '')
                .replaceAll('"', '')
                .trim()}`,
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        })
    const { notes, toggleExpand, handleDragEnd } = useNotes(data)

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
            accessorKey: 'arrow',
            cell: ({ row }) => (
                <button
                    onClick={() => toggleExpand(row.original.id)}
                    className="text-gray-600 hover:text-blue-500"
                >
                    {row.original.expanded ? (
                        <BiSolidDownArrow className="text-2xl" />
                    ) : (
                        <BiSolidRightArrow className="text-2xl" />
                    )}
                </button>
            ),
            header: () => <span> </span>,
        },
        {
            accessorKey: 'sequenceNo',
            header: () => <span>Serial No</span>,
        },
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
            accessorKey: 'updatedAt',
            cell: (info) =>
                moment(info.row.original?.updatedAt)?.format(
                    'DD MMM YYYY hh:mm:ss'
                ),
            header: () => <span>Updated At</span>,
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
                        <DndWrapper
                            items={notes.map((note) => note.id)}
                            onDragEnd={handleDragEnd}
                        >
                            <Table notes={notes} columns={columns} />
                        </DndWrapper>
                    ) : (
                        !isError && (
                            <EmptyData
                                title={'No Workplace Types!'}
                                description={'No Note added yet'}
                                height={'50vh'}
                            />
                        )
                    )}
                </Card>
            </div>
        </>
    )
}
