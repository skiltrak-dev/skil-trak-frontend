import {
    ActionButton,
    AppointmentTypeFilters,
    BackButton,
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
    Typography,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaEnvelope, FaFileExport, FaPhone, FaTrash } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'

import { useContextBar } from '@hooks'
import { IndustryCell } from '@partials/admin/industry/components'
import { AdminApi } from '@queries'
import { AppointmentTypeFilterType, Job } from '@types'
import moment from 'moment'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { AiFillEye } from 'react-icons/ai'
import { DeleteModal, RequirementModal } from '../modals'
import { JobTitleView, ViewApplicantButton } from '../components'

export const ActiveJobs = () => {
    const router = useRouter()
    const contextBar = useContextBar()
    const [modal, setModal] = useState<ReactElement | null>(null)

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    const { isLoading, data, isError } = AdminApi.Jobs.useList({
        search: `status:approved`,
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

    const tableActionOptions = (job: any): TableActionOption<any>[] => [
        // {
        //     text: 'View',
        //     Icon: AiFillEye,
        //     onClick: () => {
        //         router.push(`/portals/admin/jobs/${job?.id}`)
        //     },
        //     color: 'text-green-500 hover:bg-green-100 hover:border-red-200',
        // },
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
            cell: (info) => <JobTitleView job={info.row.original} />,
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
            header: () => <span>Applicants</span>,
            accessorKey: 'applicationCount',
            cell: (info) => (
                <ViewApplicantButton
                    id={Number(info.row.original?.id)}
                    applicationCount={Number(
                        info.row.original?.applicationCount
                    )}
                />
            ),
        },
        {
            header: () => <span>Views</span>,
            accessorKey: 'views',
            cell: (info) => {
                return (
                    <Typography variant="small" semibold>
                        {info.row.original?.views}
                    </Typography>
                )
            },
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
                ` ${moment(info?.row?.original?.createdAt).format(
                    'Do MMMM, YYYY'
                )}`,
        },
        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: (info) => {
                const actionOptions = tableActionOptions(info.row.original)
                return (
                    <div className="flex gap-x-1 items-center">
                        <TableAction
                            options={actionOptions}
                            rowItem={info.row.original}
                        />
                    </div>
                )
            },
        },
    ]

    return (
        <>
            {modal && modal}
            <div className="flex flex-col gap-y-4 mb-32">
                <div>
                    <BackButton />
                    <PageHeading
                        title={'Active Jobs'}
                        subtitle={'List of All Active Jobs'}
                    />
                </div>

                <Card noPadding>
                    {isError && <TechnicalError />}
                    {isLoading ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : data?.data && data?.data?.length ? (
                        <Table columns={columns} data={data?.data}>
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
