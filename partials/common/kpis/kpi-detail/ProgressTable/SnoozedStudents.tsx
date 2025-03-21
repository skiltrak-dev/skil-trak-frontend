import { useState } from 'react'
import { AdminApi } from '@queries'
import { useRouter } from 'next/router'
import { DataKpiTable } from '../DataKpiTable'
import { MdOutlineSnooze } from 'react-icons/md'
import { CreatedAtDate } from '@components'
import { ColumnDef } from '@tanstack/react-table'
import { Student } from '@types'
import { SectorCell } from '@partials/admin/student/components'
import moment, { Moment } from 'moment'

// Call Student-specific columns
const callStudentColumns: ColumnDef<Student>[] = [
    {
        accessorKey: 'studentId',
        header: 'Student ID',
        cell: (info: any) => info.getValue() as string,
    },
    {
        accessorKey: 'user.name',
        header: 'Name',
    },
    {
        accessorKey: 'user.email',
        header: 'Email',
    },
    {
        accessorKey: 'phone',
        header: 'Phone',
    },
    {
        accessorKey: 'courses',
        header: 'COURSES',
        cell: (info) => <SectorCell student={info.row.original} hideButton />,
    },
    {
        accessorKey: 'snoozedAt',
        header: 'Snoozed At',
        cell: (info) => (
            <CreatedAtDate createdAt={info.row.original?.snoozedAt} />
        ),
    },
    {
        accessorKey: 'snoozedDate',
        header: 'Snoozed End',
        cell: (info) => (
            <CreatedAtDate createdAt={info.row.original?.snoozedDate} />
        ),
    },
]

export const SnoozedStudents = ({
    startDate,
    endDate,
}: {
    startDate: Moment | null
    endDate: Moment | null
}) => {
    const router = useRouter()

    const [page, setPage] = useState(1)
    const [itemPerPage] = useState(10)

    const snoozedStudents = AdminApi.Kpi.snoozedStudents(
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
    return (
        <DataKpiTable
            colors="blue"
            title="Snoozed"
            setPage={setPage}
            Icon={MdOutlineSnooze}
            data={snoozedStudents}
            columns={callStudentColumns}
        />
    )
}
