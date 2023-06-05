import { useEffect, useState, ReactElement } from 'react'
import { useRouter } from 'next/router'
import moment from 'moment'

// Icons
import { FaEdit } from 'react-icons/fa'
import { MdBlock } from 'react-icons/md'

// components
import { SetUnavailabilityFormCB } from './form'
import {
    Table,
    TableActionOption,
    TableAction,
    ActionButton,
    Card,
    EmptyData,
    TechnicalError,
    LoadingAnimation,
    Typography,
} from '@components'
import { DeleteModal } from './modals'

// hooks
import { useContextBar } from '@hooks'

// query
import { useGetUnAvailabilitiesQuery } from '@queries'

export const SetUnavailabilityContainer = () => {
    const router = useRouter()
    const { setContent, show, hide } = useContextBar()

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [modal, setModal] = useState<ReactElement | null>(null)

    const { isLoading, data, isError } = useGetUnAvailabilitiesQuery({
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    useEffect(() => {
        setContent(<SetUnavailabilityFormCB />)
        show(false)

        return () => {
            setContent(null)
            hide()
        }
    }, [])

    const onModalCancelClicked = () => {
        setModal(null)
    }
    const onDeleteClicked = (unavailability: any) => {
        setModal(
            <DeleteModal
                unavailability={unavailability}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const tableActionOptions: TableActionOption[] = [
        // {
        //     text: 'Edit',
        //     onClick: (unavailability: any) => {
        //         router.push(`/portals/admin/rto/edit/${unavailability?.id}`)
        //     },
        //     Icon: FaEdit,
        // },
        {
            text: 'Delete',
            onClick: (unavailability: any) => onDeleteClicked(unavailability),
            Icon: MdBlock,
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        },
    ]

    const columns = [
        {
            accessorKey: 'date',
            header: () => <span>Dates</span>,
            cell: (info: any) => {
                return moment(info?.row?.original?.date).format('Do MMMM, YYYY')
            },
        },
        {
            accessorKey: 'type',
            header: () => <span>Type</span>,
            cell: (info: any) => (
                <Typography>
                    {' '}
                    {info.row.original?.fullDay
                        ? 'Full Day'
                        : info.row.original?.partialDay
                        ? 'Partial Day'
                        : '-'}{' '}
                </Typography>
            ),
        },
        {
            accessorKey: 'from',
            header: () => <span>From</span>,
            cell: (info: any) => {
                return info.row.original?.from || '-'
            },
        },
        {
            accessorKey: 'to',
            header: () => <span>To</span>,
            cell: (info: any) => {
                return info.row.original?.to || '-'
            },
        },
        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: ({ row }: any) => {
                return (
                    <div className="flex gap-x-1 items-center">
                        <TableAction
                            options={tableActionOptions}
                            rowItem={row.original}
                        />
                    </div>
                )
            },
        },
    ]

    const quickActionsElements = {
        id: 'id',
        individual: (item: any) => (
            <div className="flex gap-x-2">
                <ActionButton Icon={FaEdit}>Edit</ActionButton>
                <ActionButton
                    Icon={MdBlock}
                    variant="error"
                    onClick={() => onDeleteClicked(item)}
                >
                    Delete
                </ActionButton>
            </div>
        ),
    }
    return (
        <>
            {modal}
            {isError && <TechnicalError />}
            <Card noPadding>
                {isLoading ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && data?.data.length ? (
                    <Table
                        columns={columns}
                        data={data.data}
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
                                        {pageSize(itemPerPage, setItemPerPage)}
                                        <div className="flex gap-x-2">
                                            {quickActions}
                                            {pagination(
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
                            title={'No Un Availability!'}
                            description={
                                'You have not added an Un Availability yet'
                            }
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
        </>
    )
}
