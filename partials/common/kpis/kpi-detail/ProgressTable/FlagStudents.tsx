import { AdminApi } from '@queries'
import { useRouter } from 'next/router'
import { FaFlag } from 'react-icons/fa6'
import { DataKpiTable } from '../DataKpiTable'
import { useState } from 'react'
import { CourseDot, SectorCell } from '@partials/admin/student/components'
import { ColumnDef } from '@tanstack/react-table'
import { Student } from '@types'

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
]

export const FlagStudents = () => {
    const router = useRouter()

    const [page, setPage] = useState(1)
    const [itemPerPage] = useState(10)

    const flaggedStudents = AdminApi.Kpi.flaggedStudents(
        {
            limit: itemPerPage,
            id: Number(router.query.id),
            skip: itemPerPage * page - itemPerPage,
        },
        {
            skip: !router.query.id,
        }
    )
    return (
        <DataKpiTable
            colors="blue"
            Icon={FaFlag}
            title="Flaged"
            setPage={setPage}
            columns={callStudentColumns}
            data={flaggedStudents}
        />
    )
}
