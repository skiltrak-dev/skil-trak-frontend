import { AdminApi } from '@queries'
import { useRouter } from 'next/router'
import { RiPhoneLine } from 'react-icons/ri'
import { DataKpiTable } from '../DataKpiTable'
import { useState } from 'react'
import { CreatedAtDate, Typography } from '@components'
import { ColumnDef } from '@tanstack/react-table'
import moment, { Moment } from 'moment'

// Call Student-specific columns
const callStudentColumns: ColumnDef<any>[] = [
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
        accessorKey: 'callDate',
        header: 'Call Date',
        cell: (info) => (
            <CreatedAtDate createdAt={info.row?.original?.createdAt} />
        ),
    },
    {
        accessorKey: 'callStatus',
        header: 'Status',
        cell: (info) => (
            <Typography variant="label" normal>
                {info.row.original?.callLog?.[0]?.isAnswered
                    ? 'Answered'
                    : info.row.original?.callLog?.[0]?.isAnswered === false
                    ? 'Not Answered'
                    : '---'}
            </Typography>
        ),
    },
]

export const CallStudents = ({
    startDate,
    endDate,
}: {
    startDate: Moment | null
    endDate: Moment | null
}) => {
    const router = useRouter()

    const [page, setPage] = useState(1)
    const [itemPerPage] = useState(10)

    const callStudentData = AdminApi.Kpi.callStududents(
        {
            limit: itemPerPage,
            id: Number(router.query.id),
            skip: itemPerPage * page - itemPerPage,
            search: `startDate:${moment(startDate).format(
                'YYYY-MM-DD'
            )},endDate:${moment(endDate).format('YYYY-MM-DD')}`,
        },
        {
            skip: !router.query.id,
        }
    )

    return (
        <DataKpiTable
            colors="blue"
            setPage={setPage}
            Icon={RiPhoneLine}
            title="Call Student"
            data={callStudentData}
            columns={callStudentColumns}
        />
    )
}
