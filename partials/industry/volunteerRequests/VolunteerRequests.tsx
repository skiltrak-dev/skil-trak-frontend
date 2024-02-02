import { ColumnDef } from '@tanstack/react-table'
import { ReactElement, useEffect, useState } from 'react'

import { AppointmentTypeFilterType } from '@types'

// query
import { IndustryApi } from '@queries'

// components
import { PageHeading } from '@components/headings'

import {
    AppointmentTypeFilters,
    BackButton,
    Badge,
    Button,
    Card,
    EmptyData,
    Filter,
    LoadingAnimation,
    Table,
    TableAction,
    TableActionOption,
    TechnicalError,
    Typography,
} from '@components'
import { useNavbar } from '@hooks'
import { CancelVolunteerModal } from '@partials/industry'
import { checkListLength, ellipsisText } from '@utils'
import moment from 'moment'
import { IoMdCloseCircle } from 'react-icons/io'
import { Router, useRouter } from 'next/router'

export const VolunteerRequests = () => {
    const navBar = useNavbar()

    const router = useRouter()

    const [modal, setModal] = useState<ReactElement | null>(null)

    const [filterAction, setFilterAction] = useState(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState<AppointmentTypeFilterType>(
        {} as AppointmentTypeFilterType
    )

    const volunteerRequests = IndustryApi.Volunteer.requestsList({
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    useEffect(() => {
        navBar.setTitle('Volunteer Request')
    }, [])

    const onCancelModal = () => setModal(null)

    const onCancelRequest = (volunteer: any) => {
        setModal(
            <CancelVolunteerModal
                volunteer={volunteer}
                onCancel={onCancelModal}
            />
        )
    }

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'Close',
            onClick: (volunteer: any) => {
                onCancelRequest(volunteer)
            },
            Icon: IoMdCloseCircle,
        },
    ]

    const columns: ColumnDef<any>[] = [
        {
            header: () => <span>Course</span>,
            accessorKey: 'jobDescription',
            cell: (info) => {
                return (
                    <div className="">
                        <Typography variant={'small'} color={'text-gray-500'}>
                            {info.row.original?.course?.code}{' '}
                        </Typography>
                        <Typography variant="label" color={'text-gray-800'}>
                            {info.row.original?.course?.title}{' '}
                        </Typography>
                    </div>
                )
            },
        },
        {
            header: () => <span>Requirements</span>,
            accessorKey: 'requirement',
            cell: (info) => (
                <div className="group relative">
                    <Typography variant={'label'}>
                        <span className="cursor-pointer">
                            {ellipsisText(
                                info.row.original?.requirement,
                                100
                            ) || '----'}
                        </span>
                    </Typography>
                    <div className="hidden group-hover:block text-[13px] max-h-[240px] overflow-auto custom-scrollbar w-full absolute top-full left-0 p-2 z-20 shadow rounded-md bg-white">
                        {info.row.original?.requirement}
                    </div>
                </div>
            ),
        },
        {
            header: () => <span>Response</span>,
            accessorKey: 'industry.abn',
            cell: (info) => (
                <div className="group relative">
                    <Typography variant={'label'}>
                        <span className="cursor-pointer">
                            {ellipsisText(info.row.original?.note, 100) ||
                                '----'}
                        </span>
                    </Typography>
                    <div className="hidden group-hover:block text-[13px] max-h-[240px] overflow-auto custom-scrollbar w-full absolute top-full left-0 p-2 z-20 shadow rounded-md bg-white">
                        {info.row.original?.note}
                    </div>
                </div>
            ),
        },
        {
            header: () => <span>Status</span>,
            accessorKey: 'status',
            cell: (info) => (
                <Badge
                    variant={info.row.original?.isClosed ? 'error' : 'primary'}
                    text={info.row.original?.isClosed ? 'Closed' : 'Active'}
                />
            ),
        },
        {
            header: () => <span>Created At</span>,
            accessorKey: 'industry.addressLine1',
            cell: (info) => (
                <Typography variant="small" medium color={'text-gray-800'}>
                    {moment(info.row.original?.createdAt).format(
                        'Do MMMM, YYYY'
                    )}
                </Typography>
            ),
        },
        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: ({ row }: any) => (
                <div className="flex gap-x-1 items-center">
                    <TableAction
                        options={tableActionOptions}
                        rowItem={row.original}
                        lastIndex={checkListLength<any>(
                            volunteerRequests?.data?.data as any
                        )?.includes(row?.index)}
                    />
                </div>
            ),
        },
    ]

    return (
        <div>
            {modal}
            <div className="flex flex-col gap-y-4 mb-32">
                <Filter<AppointmentTypeFilterType>
                    component={AppointmentTypeFilters}
                    initialValues={filter}
                    setFilterAction={setFilterAction}
                    setFilter={setFilter}
                />

                <BackButton
                    link={'/portals/industry'}
                    text={'Back To Dashboard'}
                />

                <Card noPadding>
                    <div className="px-6 pt-6">
                        <PageHeading
                            title={'All Volunteer Request'}
                            subtitle={'List of Volunteer All Request'}
                        >
                            <Button
                                variant="dark"
                                text={'Request Volunteer'}
                                onClick={() => {
                                    router.push(
                                        `/portals/industry/students/request-a-volunteer/submit-volunteer-request`
                                    )
                                }}
                            />
                        </PageHeading>
                    </div>
                    {volunteerRequests.isError && <TechnicalError />}
                    {volunteerRequests.isLoading ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : volunteerRequests?.data?.data &&
                      volunteerRequests?.data?.data.length ? (
                        <Table
                            columns={columns}
                            data={volunteerRequests?.data?.data}
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
                                                    volunteerRequests?.data
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
                        volunteerRequests.isSuccess && (
                            <EmptyData
                                title={'No Volunteer Request Found'}
                                description={
                                    'There is no any Volunteer Request request yet'
                                }
                                height={'50vh'}
                            />
                        )
                    )}
                </Card>
            </div>
        </div>
    )
}
