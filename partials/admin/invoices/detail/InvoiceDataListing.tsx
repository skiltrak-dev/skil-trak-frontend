import {
    ActionButton,
    Badge,
    Button,
    Card,
    CreatedAtDate,
    TableAction,
    TableActionOption,
    Typography,
} from '@components'
import { DataKpiTable } from '@partials/common'
import { AdminApi } from '@queries'
import { ColumnDef } from '@tanstack/react-table'
import moment, { Moment } from 'moment'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { RiUserLine } from 'react-icons/ri'
import {
    ChangeStatusModal,
    ConfirmAllPaymentModal,
    ConfirmPaymentModal,
} from '../modals'
import { paymentStatusData } from './InvoiceStatusData'
import { FaEye } from 'react-icons/fa'
import { BiSolidPencil } from 'react-icons/bi'

export const InvoiceDataListing = ({
    startDate,
    endDate,
}: {
    startDate: string | null
    endDate: string | null
}) => {
    const router = useRouter()
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [page, setPage] = useState(1)
    const [itemPerPage] = useState(30)

    const invoice = AdminApi.Invoice.invoiceRtoDataList(
        {
            limit: itemPerPage,
            id: Number(router.query.id),
            skip: itemPerPage * page - itemPerPage,
            search:
                startDate && endDate
                    ? `startDate:${moment(startDate).format(
                          'YYYY-MM-DD'
                      )},endDate:${moment(endDate).format('YYYY-MM-DD')}`
                    : '',
        },
        {
            skip: !router.query.id,
        }
    )

    const onCancelModal = () => setModal(null)

    const onPaymentConfirm = (invoice: any) => {
        setModal(
            <ConfirmPaymentModal onCancel={onCancelModal} invoice={invoice} />
        )
    }

    const onPaymentAllConfirm = (ids: number[]) => {
        setModal(<ConfirmAllPaymentModal ids={ids} onCancel={onCancelModal} />)
    }

    const onStatusChangeClicked = (id: any) => {
        setModal(<ChangeStatusModal onCancel={onCancelModal} id={id} />)
    }

    const tableActionOptions: TableActionOption<any>[] = [
        {
            text: 'Student Profile',
            onClick: (invoice: any) => {
                router.push(
                    `/portals/admin/student/${invoice?.student?.id}/detail`
                )
            },
            Icon: FaEye,
        },
    ]

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'name',
            header: 'Name',
            cell: (info) => (
                <div className="flex flex-col">
                    <Typography variant="small" color="text-gray-500" normal>
                        {info.row?.original?.student?.studentId}
                    </Typography>
                    <Typography variant="label" normal>
                        {info.row?.original?.student?.user?.name}
                    </Typography>
                </div>
            ),
        },
        {
            accessorKey: 'courses',
            header: 'COURSE',
            cell: (info) => (
                <div>
                    <Typography variant="small" normal>
                        {info?.row?.original?.course?.code}
                    </Typography>
                    <Typography variant="label" normal>
                        {info?.row?.original?.course?.title}
                    </Typography>
                </div>
            ),
        },
        {
            accessorKey: 'invoiceAction',
            header: 'Invoice Action',
            cell: (info) => (
                <div>
                    <Badge
                        variant="success"
                        text={info?.row?.original?.invoiceAction}
                    />
                </div>
            ),
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: (info) => {
                const paymentStatus = paymentStatusData(
                    info.row?.original?.paymentStatus || '---'
                )
                return (
                    <div className="flex items-center gap-2">
                        <Badge
                            text={paymentStatus?.text + ''}
                            variant={
                                paymentStatus?.variant || ('primary' as any)
                            }
                        />
                        <ActionButton
                            variant="info"
                            onClick={() => {
                                onStatusChangeClicked(info.row?.original?.id)
                            }}
                            disabled={info.row?.original?.isDuplicated}
                            Icon={BiSolidPencil}
                        />
                    </div>
                )
            },
        },
        {
            accessorKey: 'confirmation',
            header: 'Confirm',
            cell: (info) => (
                <div className="flex flex-col gap-y-2.5">
                    <Button
                        text={
                            info?.row?.original?.isConfirmed
                                ? 'Confirmed'
                                : 'Confirm'
                        }
                        onClick={() => {
                            onPaymentConfirm(info?.row?.original)
                        }}
                        disabled={
                            info?.row?.original?.isConfirmed ||
                            info?.row?.original?.isDuplicated
                        }
                    />
                    {info?.row?.original?.isConfirmed && (
                        <div>
                            <Typography variant="small" normal bold>
                                Confirmed At
                            </Typography>
                            <CreatedAtDate
                                createdAt={info.row?.original?.confirmationDate}
                            />
                        </div>
                    )}
                </div>
            ),
        },
        {
            accessorKey: 'createdAt',
            header: 'Created At',
            cell: (info) => (
                <CreatedAtDate createdAt={info.row?.original?.createdAt} />
            ),
        },
        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: (info: any) => (
                <TableAction
                    options={tableActionOptions}
                    rowItem={info.row.original}
                />
            ),
        },
    ]

    const quickActionsElements = {
        id: 'id',
        individual: (invoice: any) => (
            <Button
                text={invoice?.isConfirmed ? 'Confirmed' : 'Confirm'}
                onClick={() => {
                    onPaymentConfirm(invoice)
                }}
                disabled={invoice?.isConfirmed}
            />
        ),
        common: (invoices: any) => {
            return (
                <div className="flex gap-x-2">
                    <Button
                        text={'Confirm All Selected'}
                        onClick={() => {
                            onPaymentAllConfirm(
                                invoices?.map((invoice: any) => invoice?.id)
                            )
                        }}
                    />
                </div>
            )
        },
    }

    return (
        <>
            {modal && modal}
            <Card noPadding>
                <DataKpiTable
                    setPage={setPage}
                    colors="[blue]"
                    Icon={RiUserLine}
                    title="Invoice Data"
                    columns={columns}
                    data={invoice}
                    enableRowSelection
                    quickActions={quickActionsElements}
                />
            </Card>
            {/* <div className="flex flex-col gap-y-4 mb-32">
                <Card noPadding>
                    {appointment?.isError && <TechnicalError />}
                    {appointment?.isLoading || appointment?.isFetching ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : appointment?.data?.data &&
                      appointment?.data?.data?.length ? (
                        <Table
                            columns={columns}
                            data={appointment?.data?.data}
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
                                            <div className="flex items-center gap-x-8">
                                                <div className="flex items-center gap-2">
                                                    <div className="p-2 border border-[#1436B033] rounded-lg">
                                                        <span
                                                            className={` text-base`}
                                                            style={{
                                                                color: 'blue',
                                                            }}
                                                        >
                                                            <RiUserLine />
                                                        </span>
                                                    </div>
                                                    <Typography semibold>
                                                        Invoice Data
                                                    </Typography>
                                                </div>{' '}
                                                {pageSize(
                                                    itemPerPage,
                                                    setItemPerPage
                                                )}
                                            </div>
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination(
                                                    appointment?.data
                                                        ?.pagination,
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
                        !appointment?.isError && (
                            <EmptyData
                                title={'No Pending RTO!'}
                                description={
                                    'You have no pending RTO request yet'
                                }
                                height={'50vh'}
                            />
                        )
                    )}
                </Card>
            </div> */}
        </>
    )
}
