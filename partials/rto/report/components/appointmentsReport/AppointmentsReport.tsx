import {
    ActionButton,
    AuthorizedUserComponent,
    EmptyData,
    InitialAvatar,
    LoadingAnimation,
    Table,
    TechnicalError,
    Typography,
} from '@components'

import { RtoApi } from '@queries'
import { ColumnDef } from '@tanstack/react-table'
import React, { useState } from 'react'
import { FilterReport } from '../../FilterReport'
import { CourseDot } from '@partials/rto/student/components'
import { Course, ReportOptionsEnum } from '@types'
import { ViewFullListReport } from '../../ViewFullListReport'
import { useRouter } from 'next/router'
import { UserRoles } from '@constants'

type Props = {
    startDate: Date
    setStartDate: (startDate: Date) => void
    endDate: Date
    setEndDate: (endDate: Date) => void
    user?: number
}

export const AppointmentsReport = ({
    setStartDate,
    setEndDate,
    startDate,
    endDate,
    user,
}: Props) => {
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const router = useRouter()
    const { data, isLoading, isError } = RtoApi.Students.useAppointmentsReport({
        user,
        startDate: startDate.toISOString().slice(0, 10),
        endDate: endDate.toISOString().slice(0, 10),
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    const columns: ColumnDef<any>[] = [
        {
            header: () => <span>Appointment By</span>,
            accessorKey: 'appointmentBy',
            cell: (info: any) => {
                return (
                    <a className="flex items-center gap-x-2">
                        <InitialAvatar
                            name={info?.row?.original?.appointmentBy?.name}
                            imageUrl={
                                info?.row?.original?.appointmentBy?.avatar
                            }
                        />
                        <div className="flex flex-col">
                            <span>{info.row.original.appointmentBy?.id}</span>
                            <span>
                                {info.row.original.appointmentBy?.name || 'N/A'}
                            </span>
                            <span>
                                {info.row.original.appointmentBy?.email}
                            </span>
                        </div>
                    </a>
                )
            },
        },
        {
            accessorKey: 'appointmentFor',
            header: () => <span>Appointment For</span>,
            cell: (info) => {
                // const { appointmentFor: { name, id, avatar } } = info.row.original;
                return (
                    <a className="flex items-center gap-x-2">
                        <InitialAvatar
                            name={
                                info?.row?.original?.appointmentFor?.name ||
                                'N/A'
                            }
                            imageUrl={info.row.original?.appointmentFor?.avatar}
                        />
                        <div className="flex flex-col">
                            <span>{info.row.original.appointmentFor?.id}</span>
                            <span>
                                {info.row.original.appointmentFor?.name ||
                                    'N/A'}
                            </span>
                        </div>
                    </a>
                )
            },
        },
        // {
        //     accessorKey: 'email',
        //     header: () => <span>Email</span>,

        // },
        // {
        //     accessorKey: 'phone',
        //     header: () => <span>Phone</span>,
        // },
        // {
        //     accessorKey: 'courses',
        //     header: () => <span>Courses</span>,
        //     cell: (info) => {
        //         return info?.row?.original?.courses?.map((c: Course) => (
        //     <CourseDot key={c?.id} course={c} />
        //     ))
        //     },
        // },
        {
            accessorKey: 'startTime',
            header: () => <span>Start Time</span>,
        },
        {
            accessorKey: 'endTime',
            header: () => <span>End Time</span>,
        },
        {
            accessorKey: 'date',
            header: () => <span>Date</span>,
        },
    ]
    const count = data?.data?.length
    return (
        <>
            <div className="flex justify-between">
                <div className="">
                    <Typography variant="title" color="text-gray-400">
                        Appointments
                    </Typography>
                    <Typography variant="h3">{count || 0}</Typography>
                </div>

                <div className="flex items-center gap-x-4">
                    <FilterReport
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                    />

                    <AuthorizedUserComponent roles={[UserRoles.ADMIN]}>
                        <ActionButton
                            onClick={() => {
                                router.push(
                                    `/portals/admin/rto/${router.query?.id}/${ReportOptionsEnum.APPOINTMENTS_REPORT}`
                                )
                            }}
                        >
                            View Full List
                        </ActionButton>
                    </AuthorizedUserComponent>
                    <AuthorizedUserComponent roles={[UserRoles.SUBADMIN]}>
                        <ActionButton
                            onClick={() => {
                                router.push(
                                    `/portals/sub-admin/users/rtos/${router.query?.id}/${ReportOptionsEnum.APPOINTMENTS_REPORT}`
                                )
                            }}
                        >
                            View Full List
                        </ActionButton>
                    </AuthorizedUserComponent>
                    <AuthorizedUserComponent roles={[UserRoles.RTO]}>
                        <ActionButton
                            onClick={() => {
                                router.push(
                                    `/portals/rto/report/${ReportOptionsEnum.APPOINTMENTS_REPORT}`
                                )
                            }}
                        >
                            View Full List
                        </ActionButton>
                    </AuthorizedUserComponent>
                </div>
            </div>
            {isError && <TechnicalError />}
            {isLoading ? (
                <LoadingAnimation height="h-[60vh]" />
            ) : data?.data && data?.data?.length ? (
                <Table columns={columns} data={data?.data}>
                    {({ table, pagination, pageSize, quickActions }: any) => {
                        return (
                            <div>
                                <div className="p-6 mb-2 flex justify-between">
                                    {pageSize(itemPerPage, setItemPerPage)}
                                    <div className="flex gap-x-2">
                                        {/* {quickActions} */}
                                        {pagination(data?.pagination, setPage)}
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
                        title={'No Appointments Found'}
                        description={'There is no Appointments yet'}
                        height={'50vh'}
                    />
                )
            )}
        </>
    )
}
