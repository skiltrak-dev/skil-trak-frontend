import React, { ReactElement, useState } from 'react'
import { PageHeading } from '@components/headings'
import {
    Button,
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TableAction,
    TableActionOption,
    TechnicalError,
} from '@components'
import { CommonApi } from '@queries'
import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { DeleteModal } from '../modals'
import { Student } from '@types'
import { ViewModal } from './ViewModal'
type Props = {}

export const EmailDraftList = (props: Props) => {
    const router = useRouter()
    const [modal, setModal] = useState<ReactElement | null>(null)

    const { data, isLoading, isError, isFetching } =
        CommonApi.Messages.useAllTemplates()

    const onDeleteClicked = (mailDraft: any) => {
        setModal(
            <DeleteModal
                item={mailDraft}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const onModalCancelClicked = () => {
        setModal(null)
    }
    const onViewClicked = (mailDraft: any) => {
        setModal(<ViewModal id={mailDraft.id} onClose={() => onClose()} />)
    }
    const onClose = () => {
        setModal(null)
    }
    const tableActionOptions: TableActionOption<any>[] = [
        {
            text: 'View',
            onClick: (mailDraft: any) => {
                onViewClicked(mailDraft)
            },
            Icon: FaEye,
        },
        {
            text: 'Edit',
            onClick: (mailDraft: any) => {
                router.push(
                    `/portals/admin/create-email-draft/${mailDraft?.id}`
                )
            },
            Icon: FaEdit,
        },
        {
            text: 'Delete',
            onClick: (mailDraft: any) => onDeleteClicked(mailDraft),
            Icon: FaTrash,
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        },
    ]
    const columns: ColumnDef<any>[] = [
        {
            header: () => <span>Subject</span>,
            accessorKey: 'subject',
            cell: (info) => {
                const { subject } = info.row.original
                return (
                    <div className="flex items-center">
                        <p>{subject.substring(0, 50)}...</p>
                    </div>
                )
            },
        },
        {
            header: () => <span>Message</span>,
            accessorKey: 'content',
            cell: (info) => {
                const { content } = info.row.original
                return (
                    <div className="flex items-center">
                        <div
                            className="break-all block mr-6"
                            dangerouslySetInnerHTML={{
                                __html: content.substring(0, 55),
                            }}
                        />
                        ....
                    </div>
                )
            },
        },
        {
            header: () => <span>Created at</span>,
            accessorKey: 'createdAt',
            cell: (info) => {
                const { createdAt } = info.row.original
                return (
                    <div className="flex items-center">
                        <p>
                            {moment(createdAt).format('DD MMM YYYY, hh:mm a')}{' '}
                        </p>
                    </div>
                )
            },
        },
        {
            header: () => 'Action',
            accessorKey: 'Action',
            cell: ({ row }: any) => {
                return (
                    <TableAction
                        options={tableActionOptions}
                        rowItem={row.original}
                    />
                )
            },
        },
    ]
    return (
        <>
            {modal && modal}
            <div className="p-4">
                <Card noPadding>
                    {isError && <TechnicalError />}
                    {isLoading ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : data && data?.length ? (
                        <Table columns={columns} data={data}>
                            {({
                                table,
                                pagination,
                                pageSize,
                                quickActions,
                            }: any) => {
                                return (
                                    <div>
                                        <div className="p-6 mb-2 flex justify-between">
                                            {/* {pageSize(
                                    itemPerPage,
                                    setItemPerPage
                                )} */}
                                            <div className="flex gap-x-2">
                                                {/* {quickActions}
                                    {pagination(
                                        data?.pagination,
                                        setPage
                                    )} */}
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
                                title={'No Email Draft Found'}
                                description={
                                    'There is no Email Draft Request request yet'
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
