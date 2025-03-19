import { CreatedAtDate, Typography } from '@components'
import { AdminApi } from '@queries'
import { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { HiCheck } from 'react-icons/hi'
import { IWorkplaceIndustries } from 'redux/queryTypes'
import { DataKpiTable } from '../../DataKpiTable'

const completedColumns: ColumnDef<IWorkplaceIndustries>[] = [
    {
        accessorKey: 'student.studentId',
        header: 'Student ID',
    },
    {
        accessorKey: 'student.user.name',
        header: 'Name',
    },
    {
        accessorKey: 'student.user.email',
        header: 'Email',
    },
    {
        accessorKey: 'student.phone',
        header: 'Phone',
    },
    {
        accessorKey: 'courses',
        header: 'COURSES',
        cell: (info) => (
            <div>
                <Typography variant="small" normal>
                    {info?.row?.original?.courses?.[0]?.code}
                </Typography>
                <Typography variant="label" normal>
                    {info?.row?.original?.courses?.[0]?.title}
                </Typography>
            </div>
        ),
    },
    {
        accessorKey: 'completedDate',
        header: 'Completed Date',
        cell: (info) => (
            <CreatedAtDate
                createdAt={info.row?.original?.industries?.[0]?.isCompletedDate}
            />
        ),
    },
    {
        accessorKey: 'currentStatus',
        header: 'Completion Status',
    },
]

export const Completed = () => {
    const router = useRouter()

    const [page, setPage] = useState(1)
    const [itemPerPage] = useState(10)

    const workplace = AdminApi.Kpi.completedDetails(
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
            colors="red"
            Icon={HiCheck}
            title="Completed"
            columns={completedColumns}
            data={workplace}
            setPage={setPage}
        />
    )
}
