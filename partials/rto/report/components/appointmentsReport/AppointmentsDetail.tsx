import {
    InitialAvatar,
    LoadingAnimation,
    NoData,
    Table,
    TechnicalError,
    Typography,
} from '@components'

import { UserRoles } from '@constants'
import { RtoApi } from '@queries'
import { ColumnDef } from '@tanstack/react-table'
import { getUserCredentials } from '@utils'

type Props = {
    rtoUser?: number
}

export const AppointmentsDetail = ({ rtoUser }: Props) => {
    const { data, isLoading, isError } = RtoApi.Students.useAppointmentsReport(
        {
            user: rtoUser,
        },
        {
            skip:
                (getUserCredentials()?.role === UserRoles.ADMIN ||
                    getUserCredentials()?.role === UserRoles.SUBADMIN) &&
                !rtoUser,
        }
    )
    const columns: ColumnDef<any>[] = [
        {
            header: () => <span>Appointment By</span>,
            accessorKey: 'appointmentBy',
            cell: (info: any) => {
                return (
                    <a className="flex items-center gap-x-2">
                        <InitialAvatar
                            name={
                                info?.row?.original?.appointmentBy?.name ||
                                'N/A'
                            }
                            imageUrl={
                                info?.row?.original?.appointmentBy?.avatar ||
                                'N/A'
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
    const count = data?.length
    return (
        <>
            <div className="flex justify-between">
                <div className="">
                    <Typography variant="title" color="text-gray-400">
                        Appointments
                    </Typography>
                    <Typography variant="h3">{count || 0}</Typography>
                </div>
            </div>
            {isError && <TechnicalError />}
            {isLoading ? (
                <LoadingAnimation height="h-[60vh]" />
            ) : data && data?.length ? (
                <Table columns={columns} data={data}>
                    {({ table, pagination, pageSize, quickActions }: any) => {
                        return (
                            <div>
                                <div className="px-6">{table}</div>
                            </div>
                        )
                    }}
                </Table>
            ) : (
                !isError && <NoData text="No Appointments Found" />
            )}
        </>
    )
}
