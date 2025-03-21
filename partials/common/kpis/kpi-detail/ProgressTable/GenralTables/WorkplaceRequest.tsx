import { useState } from 'react'
import { AdminApi } from '@queries'
import { useRouter } from 'next/router'
import { CreatedAtDate, Typography } from '@components'
import { ColumnDef } from '@tanstack/react-table'
import { DataKpiTable } from '../../DataKpiTable'
import { RiGitPullRequestFill } from 'react-icons/ri'
import { IWorkplaceIndustries } from 'redux/queryTypes'
import moment, { Moment } from 'moment'

const workplaceColumns: ColumnDef<IWorkplaceIndustries>[] = [
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
        accessorKey: 'workplaceRequestDate',
        header: 'Workplace Request Date',
        cell: (info) => (
            <CreatedAtDate createdAt={info.row?.original?.createdAt} />
        ),
    },
    {
        accessorKey: 'currentStatus',
        header: 'Status',
    },
]

export const WorkplaceRequest = ({
    endDate,
    startDate,
}: {
    startDate: Moment | null
    endDate: Moment | null
}) => {
    const router = useRouter()

    const [page, setPage] = useState(1)
    const [itemPerPage] = useState(10)

    const workplace = AdminApi.Kpi.workplaceDetails(
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
        <div className="">
            <DataKpiTable
                colors="blue"
                setPage={setPage}
                data={workplace}
                title="Workplace Request"
                columns={workplaceColumns}
                Icon={RiGitPullRequestFill}
            />
        </div>
    )
}
