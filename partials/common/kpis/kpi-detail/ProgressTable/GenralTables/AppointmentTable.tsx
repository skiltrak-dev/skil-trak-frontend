import { AdminApi } from '@queries'
import { useRouter } from 'next/router'
import { RiUserLine } from 'react-icons/ri'
import { DataKpiTable } from '../../DataKpiTable'
import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Appointment } from '@types'
import { UserRoles } from '@constants'
import { CreatedAtDate, Typography } from '@components'
import moment, { Moment } from 'moment'

export const AppointmentTable = ({
    startDate,
    endDate,
}: {
    startDate: Moment | null
    endDate: Moment | null
}) => {
    const router = useRouter()
    const [page, setPage] = useState(1)
    const [itemPerPage] = useState(10)

    const appointment = AdminApi.Kpi.appointmentDetails(
        {
            limit: itemPerPage,
            id: Number(router.query.id),
            skip: itemPerPage * page - itemPerPage,
            search: `startDate:${moment(startDate).format(
                'YYYY-MM-DD'
            )},endDate:${moment(endDate).format('YYYY-MM-DD')}`,
        },
        {
            skip: !router.query.id || !startDate || !endDate,
        }
    )

    const getStudent = (appointment: Appointment) => {
        const student =
            appointment?.appointmentBy?.role === UserRoles.STUDENT
                ? appointment?.appointmentBy
                : appointment?.appointmentFor
        return student
    }

    const appointmentColumns: ColumnDef<Appointment>[] = [
        {
            accessorKey: 'studentId',
            header: 'Student ID',
            cell: (info) => {
                const student = getStudent(info.row.original)
                return (
                    <Typography variant="label" normal>
                        {student?.student?.studentId}
                    </Typography>
                )
            },
        },
        {
            accessorKey: 'name',
            header: 'Name',
            cell: (info) => {
                const student = getStudent(info.row.original)
                return (
                    <Typography variant="label" normal>
                        {student?.name}
                    </Typography>
                )
            },
        },
        {
            accessorKey: 'email',
            header: 'Email',
            cell: (info) => {
                const student = getStudent(info.row.original)
                return (
                    <Typography variant="label" normal>
                        {student?.email}
                    </Typography>
                )
            },
        },
        {
            accessorKey: 'phone',
            header: 'Phone',
            cell: (info) => {
                const student = getStudent(info.row.original)
                return (
                    <Typography variant="label" normal>
                        {student?.student?.phone}
                    </Typography>
                )
            },
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
            accessorKey: 'appointmentDate',
            header: 'Appointment Book Date',
            cell: (info) => (
                <CreatedAtDate createdAt={info.row?.original?.createdAt} />
            ),
        },
    ]

    return (
        <>
            <DataKpiTable
                setPage={setPage}
                colors="[blue]"
                Icon={RiUserLine}
                title="Student Appointments"
                columns={appointmentColumns}
                data={appointment}
            />
        </>
    )
}
