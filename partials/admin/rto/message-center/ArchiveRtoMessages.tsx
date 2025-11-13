import {
    ActionButton,
    Badge,
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TableAction,
    TableChildrenProps,
    TechnicalError,
    UserCreatedAt,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaEdit } from 'react-icons/fa'

import { AdminApi } from '@queries'
import { RtoMessage } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { ArchiveMessageModal, MessageModal } from './modal'
import { RtoCellInfo } from '../components'

export const ArchiveRtoMessages = () => {
    const router = useRouter()

    const [page, setPage] = useState(1)
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [itemPerPage, setItemPerPage] = useState(50)

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    const { isLoading, isFetching, data, isError } =
        AdminApi.RtoMessageCenter.messagesList(
            {
                search: `status:archived`,
                skip: itemPerPage * page - itemPerPage,
                limit: itemPerPage,
            },
            {
                refetchOnMountOrArgChange: true,
            }
        )

    const onCancel = () => setModal(null)

    const onMessageViewModal = (message: RtoMessage) => {
        setModal(<MessageModal message={message} onCancel={onCancel} />)
    }

    const columns: ColumnDef<RtoMessage>[] = [
        {
            accessorKey: 'title',
            header: () => <span>Title</span>,
            cell: (info) => info.getValue(),
        },

        {
            accessorKey: 'user.name',
            cell: (info) => <RtoCellInfo rto={info.row.original?.rto} />,
            header: () => <span>RTO</span>,
        },
        {
            accessorKey: 'senderName',
            header: () => <span>Sender</span>,
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'urgencyLevel',
            header: () => <span>Title</span>,
            cell: (info) => (
                <Badge
                    text={info?.row?.original?.urgencyLevel}
                    variant="primaryNew"
                />
            ),
        },
        {
            accessorKey: 'created',
            header: () => <span>Created At</span>,
            cell: (info) => (
                <UserCreatedAt createdAt={info?.row?.original?.createdAt} />
            ),
        },
        {
            accessorKey: 'message',
            header: () => <span>Message</span>,
            cell: (info) => (
                <ActionButton
                    text="View"
                    simple
                    variant="info"
                    onClick={() => onMessageViewModal(info?.row?.original)}
                />
            ),
        },
    ]

    return (
        <>
            {modal}
            <div className="flex flex-col gap-y-4 mb-32">
                <PageHeading
                    title={'Archived Rto Messages'}
                    subtitle={'List of Archived Rto Messages'}
                >
                    {/* <Button
                        text="Export"
                        variant="action"
                        Icon={FaFileExport}
                    /> */}
                </PageHeading>

                <Card noPadding>
                    {isError && <TechnicalError />}
                    {isLoading || isFetching ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : data && data?.data.length ? (
                        <Table columns={columns} data={data.data}>
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
                                                    data.data.length
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
                                        <div className="px-6 w-full overflow-x-scroll remove-scrollbar">
                                            {table}
                                        </div>
                                    </div>
                                )
                            }}
                        </Table>
                    ) : (
                        !isError && (
                            <EmptyData
                                title={'No Approved RTO!'}
                                description={
                                    'You have not approved any RTO request yet'
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
