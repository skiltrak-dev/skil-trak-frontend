import { CreatedAtDate, Typography } from '@components'
import { KpiAppointment } from '@partials/common/kpis/types'
import { AdminApi } from '@queries'
import { ColumnDef } from '@tanstack/react-table'
import moment, { Moment } from 'moment'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { RiUserLine } from 'react-icons/ri'
import { DataKpiTable } from '../../DataKpiTable'

export const AppointmentTable = ({
    startDate,
    endDate,
}: {
    startDate: Moment | null
    endDate: Moment | null
}) => {
    const router = useRouter()
    const [page, setPage] = useState(1)
    const [itemPerPage] = useState(50)

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

    const appointmentColumns: ColumnDef<KpiAppointment>[] = [
        {
            accessorKey: 'name',
            header: 'Name',
            cell: (info) => (
                <Typography variant="label" normal>
                    {info.row.original?.appointmentfor}
                </Typography>
            ),
        },
        {
            accessorKey: 'courses',
            header: 'COURSE',
            cell: (info) => (
                <div>
                    <Typography variant="small" normal>
                        {info?.row?.original?.coursecode}
                    </Typography>
                    <Typography variant="label" normal>
                        {info?.row?.original?.course}
                    </Typography>
                </div>
            ),
        },
        {
            accessorKey: 'appointmentWith',
            header: 'Appointment With',
            cell: (info) => (
                <div>
                    <Typography variant="xs" semibold normal uppercase>
                        {info?.row?.original?.appointmentbyrole}
                    </Typography>
                    <Typography variant="label" normal>
                        {info?.row?.original?.appointmentby}
                    </Typography>
                </div>
            ),
        },
        {
            accessorKey: 'appointmentType',
            header: 'Appointment Type',
            cell: (info) => (
                <div>
                    <Typography variant="label" normal>
                        {info?.row?.original?.appointmenttypetitle}
                    </Typography>
                </div>
            ),
        },
        {
            accessorKey: 'appointmentData',
            header: 'Appointment Date',
            cell: (info) => (
                <CreatedAtDate createdAt={info.row?.original?.date} />
            ),
        },
        {
            accessorKey: 'appointmentDate',
            header: 'Appointment Book Date',
            cell: (info) => (
                <CreatedAtDate
                    createdAt={info.row?.original?.appointmentcreatedat}
                />
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
