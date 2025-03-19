import { AdminApi } from '@queries'
import { useRouter } from 'next/router'
import { RiBuilding2Line } from 'react-icons/ri'
import { DataKpiTable } from '../DataKpiTable'
import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Industry } from '@types'
import { CreatedAtDate, Typography } from '@components'

const callIndustriesColumns: ColumnDef<Industry>[] = [
    {
        accessorKey: 'user.name',
        header: 'Name',
    },
    {
        accessorKey: 'user.email',
        header: 'Email',
    },
    {
        accessorKey: 'phoneNumber',
        header: 'Phone',
    },
    {
        accessorKey: 'contactPerson',
        header: 'Contact Person',
        cell: (info) => (
            <div>
                <Typography variant="label" medium>
                    {info.row.original?.contactPerson}
                </Typography>
                <Typography variant="small">
                    {info.row.original?.contactPersonNumber}
                </Typography>
            </div>
        ),
    },
    {
        accessorKey: 'callDate',
        header: 'Call Date',
        cell: (info) => (
            <CreatedAtDate
                createdAt={info.row?.original?.callLog?.[0]?.createdAt}
            />
        ),
    },
    {
        accessorKey: 'callStatus',
        header: 'Status',
        cell: (info) => (
            <Typography>
                {info.row.original?.callLog?.[0]?.isAnswered
                    ? 'Answered'
                    : info.row.original?.callLog?.[0]?.isAnswered === false
                    ? 'Not Answered'
                    : '---'}
            </Typography>
        ),
    },
]

export const CallIndustriesTable = () => {
    const router = useRouter()

    const [page, setPage] = useState(1)
    const [itemPerPage] = useState(10)

    const callIndustries = AdminApi.Kpi.callIndustries(
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
            setPage={setPage}
            data={callIndustries}
            Icon={RiBuilding2Line}
            title="Call Industries"
            columns={callIndustriesColumns}
        />
    )
}
