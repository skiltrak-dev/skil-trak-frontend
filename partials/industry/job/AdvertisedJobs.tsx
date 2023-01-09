import React, { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ColumnDef } from '@tanstack/react-table'

// Icons
import { MdEdit } from 'react-icons/md'
import { AiFillDelete } from 'react-icons/ai'

// components
import {
    Popup,
    Button,
    EmptyData,
    ReactTable,
    Typography,
    BackButton,
    TableAction,
    Filter,
    TechnicalError,
    Table,
    Card,
    LoadingAnimation,
} from '@components'
import { JobsFilter } from './components'

// hooks
// import { useContextBar } from "hooks";

// redux
import { useGetIndustryJobsQuery, useRemoveJobMutation } from '@queries'

// utills
import { getThemeColors } from '@theme'

// HOC
import { DeleteModal } from './modals'
import { Rto } from '@types'

const Colors = getThemeColors()

export const AdvertisedJobsContainer = () => {
    const router = useRouter()

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState({})
    const [filterActionButton, setFilterActionButton] = useState(null)
    const [modal, setModal] = useState<ReactElement | null>(null)

    // query
    const { data, isLoading, isError } = useGetIndustryJobsQuery({
        search: `${JSON.stringify(filter)
            .replaceAll('{', '')
            .replaceAll('}', '')
            .replaceAll('"', '')
            .trim()}`,
        sort: '-title',
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    const onModalCancelClicked = () => {
        setModal(null)
    }

    const onDeleteClicked = (job: any) => {
        setModal(
            <DeleteModal job={job} onCancel={() => onModalCancelClicked()} />
        )
    }

    const TableActionOption = [
        {
            text: 'View',
            Icon: MdEdit,
            onClick: (job: any) => {
                router.push(`/portals/industry/jobs/${job.id}`)
            },
        },
        {
            text: 'Edit',
            Icon: MdEdit,
            onClick: (job: any) => {
                router.push(`/portals/industry/jobs/form/${job.id}`)
            },
        },
        {
            text: 'Delete',
            Icon: AiFillDelete,
            onClick: (job: any) => onDeleteClicked(job),
        },
    ]

    const Columns: ColumnDef<Rto>[] = [
        {
            header: () => 'Job Title',
            accessorKey: 'title',
            cell: ({ row }: any) => {
                const { title, industry } = row.original
                return (
                    <Link
                        href={`/jobs/job-detail/${row.original.id}`}
                        className="flex items-center gap-x-2 relative"
                    >
                        <a>
                            <div className="absolute top-1">
                                {/* <SimpleCheckbox /> */}
                            </div>

                            <div>
                                <Typography color={'black'}>
                                    {' '}
                                    {title}{' '}
                                </Typography>
                                <Typography variant={'muted'} color={'gray'}>
                                    {industry?.user?.name}
                                </Typography>
                            </div>
                        </a>
                    </Link>
                )
            },
        },
        {
            header: () => 'Type',
            accessorKey: 'employmentType',
            cell: ({ row }: any) => {
                const { employmentType } = row.original
                switch (employmentType) {
                    case 'fullTime':
                        return 'Full Time'

                    case 'partTime':
                        return 'Part Time'

                    default:
                        return 'Temporary'
                }
            },
        },
        {
            header: () => 'Phone',
            accessorKey: 'phone',
        },
        {
            header: () => 'Status',
            accessorKey: 'isActive',
            cell: ({ row }: any) => {
                const { isActive } = row.original
                return isActive ? 'Approved' : 'Pending'
            },
        },
        {
            header: () => 'Action',
            accessorKey: 'Action',
            cell: ({ row }: any) => {
                return (
                    <TableAction
                        text={'More'}
                        options={TableActionOption}
                        rowItem={row.original}
                    />
                )
            },
        },
    ]

    const filterInitialValues = {
        title: '',
        type: '',
        status: '',
    }
    return (
        <div>
            {modal}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center pb-4">
                <BackButton link={'jobs'} text={'Back To Jobs'} />
                <div className="flex items-center gap-x-2">
                    {filterActionButton && filterActionButton}
                    <Button
                        variant={'dark'}
                        onClick={() =>
                            router.push('/portals/industry/jobs/form')
                        }
                    >
                        Advertise New Job
                    </Button>
                </div>
            </div>

            <Filter
                component={JobsFilter}
                setFilter={setFilter}
                setFilterAction={setFilterActionButton}
                initialValues={filterInitialValues}
            />

            {/* Showing Alert on Any Action */}

            {/* Jobs List */}

            <div className="flex justify-between items-center">
                <p className="text-sm font-bold">Your Jobs</p>
            </div>
            <Card noPadding>
                {isError && <TechnicalError />}
                {isLoading ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && data?.data.length ? (
                    <Table
                        columns={Columns}
                        data={data.data}
                        // quickActions={quickActionsElements}
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
                            title={'No Advertsed Job!'}
                            description={'You have not advertsed any Job yet'}
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
        </div>
    )
}
