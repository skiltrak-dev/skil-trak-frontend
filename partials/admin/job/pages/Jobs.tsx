import {
    ActionButton,
    AppointmentTypeFilters,
    Button,
    Card,
    EmptyData,
    Filter,
    InitialAvatar,
    LoadingAnimation,
    Table,
    TableAction,
    TableActionOption,
    TechnicalError,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaEnvelope, FaFileExport, FaPhone, FaTrash } from 'react-icons/fa'

import { useContextBar } from '@hooks'
import { AdminApi } from '@queries'
import { AppointmentType, AppointmentTypeFilterType, Job } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { DeleteModal, RequirementModal } from '../modals'
import { IndustryCell } from '@partials/admin/industry/components'
import moment from 'moment'

export const Jobs = () => {
    const router = useRouter()
    const contextBar = useContextBar()
    const [modal, setModal] = useState<ReactElement | null>(null)

    const [filterAction, setFilterAction] = useState(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState<AppointmentTypeFilterType>(
        {} as AppointmentTypeFilterType
    )
    const { isLoading, data, isError } = AdminApi.Jobs.useList({
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

    const onViewContentClicked = (job: any) => {
        setModal(<RequirementModal job={job} onCancel={onModalCancelClicked} />)
    }

    const onDeleteClicked = (job: any) => {
        setModal(
            <DeleteModal job={job} onCancel={() => onModalCancelClicked()} />
        )
    }

    useEffect(() => {
        contextBar.hide()
    }, [])

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'Delete',
            onClick: (item: any) => onDeleteClicked(item),
            Icon: FaTrash,
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        },
    ]

    const columns: ColumnDef<Job>[] = [
        {
            header: () => <span>Title</span>,
            accessorKey: 'title',
            cell: (info) => {
                return (
                    <div className="flex items-center gap-x-1">
                        <InitialAvatar
                            name={info.row.original?.industry?.user?.name}
                            imageUrl={info.row.original.industry.user.avatar}
                            small
                        />
                        <div>
                            <p className="font-semibold">
                                {info.row.original.title}
                            </p>
                            <div className="flex items-center gap-x-2">
                                <p>{info.row.original?.industry?.user?.name}</p>
                            </div>
                            <div>
                                <p className="flex items-center gap-x-2">
                                    <span className="text-gray-400">
                                        <FaEnvelope size={12} />
                                    </span>
                                    <span className="text-gray-600">
                                        {info.row.original.email}
                                    </span>
                                </p>
                                <p className="flex items-center gap-x-2">
                                    <span className="text-gray-400">
                                        <FaPhone size={12} />
                                    </span>
                                    <span className="text-gray-600">
                                        {info.row.original.phone}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                )
            },
        },
        {
            header: () => <span>Industry</span>,
            accessorKey: 'industry',
            cell: (info) => (
                <IndustryCell industry={info.row.original?.industry} />
            ),
        },
        {
            header: () => <span>Description</span>,
            accessorKey: 'description',
            cell: (info) => {
                return (
                    <ActionButton
                        variant="link"
                        simple
                        onClick={() => {
                            onViewContentClicked(info.row.original)
                        }}
                    >
                        View
                    </ActionButton>
                )
            },
        },
        {
            header: () => <span>Contact Person</span>,
            accessorKey: 'contactPerson',
            cell: (info) => {
                return (
                    <div className="flex items-center gap-x-2">
                        <InitialAvatar
                            name={info.row.original.contactPerson}
                            small
                        />
                        <p>{info.row.original.contactPerson}</p>
                    </div>
                )
            },
        },
        {
            header: () => <span>Address</span>,
            accessorKey: 'suburb',
            cell: (info) => info.getValue(),
        },
        {
            header: () => <span>Salary</span>,
            accessorKey: 'salaryFrom',
            cell: (info) => {
                return (
                    <div>
                        <span className="text-gray-400">AUD</span>{' '}
                        <span className="text-gray-600 font-semibold">
                            {info.row.original.salaryFrom}
                        </span>{' '}
                        - <span className="text-gray-400">AUD</span>{' '}
                        <span className="text-gray-600 font-semibold">
                            {info.row.original.salaryTo}
                        </span>
                    </div>
                )
            },
        },
        {
            header: () => <span>Created At</span>,
            accessorKey: 'industry.addressLine1',
            cell: (info) =>
                ` ${moment(info?.row?.original?.industry?.createdAt).format(
                    'Do MMMM, YYYY'
                )}`,
        },
        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: (info) => {
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
        individual: (id: Job) => (
            <div className="flex gap-x-2">
                <ActionButton variant="success" onClick={() => {}}>
                    Accept
                </ActionButton>
                <ActionButton variant="error" onClick={() => {}}>
                    Reject
                </ActionButton>
            </div>
        ),
        common: (ids: Job[]) => (
            <ActionButton variant="error" onClick={() => {}}>
                Reject
            </ActionButton>
        ),
    }

    return (
        <>
            {modal && modal}
            <div className="flex flex-col gap-y-4 mb-32">
                <PageHeading title={'Jobs'} subtitle={'List of All Jobs'}>
                    {/* {filterAction} */}
                    {data && data?.data.length ? (
                        <Button
                            text="Export"
                            variant="action"
                            Icon={FaFileExport}
                        />
                    ) : null}
                </PageHeading>

                <Filter<AppointmentTypeFilterType>
                    component={AppointmentTypeFilters}
                    initialValues={filter}
                    setFilterAction={setFilterAction}
                    setFilter={setFilter}
                />

                <Card noPadding>
                    {isError && <TechnicalError />}
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
                                            {pageSize(
                                                itemPerPage,
                                                setItemPerPage
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
                                    </div>
                                )
                            }}
                        </Table>
                    ) : (
                        !isError && (
                            <EmptyData
                                title={'No Jobs!'}
                                description={'You have no jobs yet'}
                                height={'50vh'}
                            />
                        )
                    )}
                </Card>
            </div>
        </>
    )
}
