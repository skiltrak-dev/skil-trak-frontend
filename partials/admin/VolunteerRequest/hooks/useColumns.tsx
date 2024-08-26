import { HideRestrictedData, Typography } from '@components'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { VolunteerIndustryCellInfo } from '../components'
import { UserRoles } from '@constants'
import moment from 'moment'

export const useColumns = () => {
    const columns: ColumnDef<any>[] = [
        {
            header: () => <span>Name</span>,
            accessorKey: 'name',
            cell: (info) => (
                <VolunteerIndustryCellInfo
                    industry={info?.row?.original?.industry}
                />
            ),
        },
        {
            header: () => <span>ABN</span>,
            accessorKey: 'industry.abn',
            cell: (info) => (
                <HideRestrictedData type={UserRoles.INDUSTRY}>
                    <Typography variant="label">
                        {info.row.original?.industry?.abn}
                    </Typography>
                </HideRestrictedData>
            ),
        },
        {
            header: () => <span>Course</span>,
            accessorKey: 'course',
            cell: (info) => (
                <div>
                    <Typography variant={'small'} color={'text-gray-500'}>
                        {info.row.original?.course?.code}{' '}
                    </Typography>
                    <Typography variant="label" color={'text-gray-800'}>
                        {info.row.original?.course?.title}{' '}
                    </Typography>
                </div>
            ),
        },
        {
            header: () => <span>Address</span>,
            accessorKey: 'industry.addressLine1',
            cell: (info) =>
                `${info?.row?.original?.industry?.addressLine1 || 'N/A'}, ${
                    info?.row?.original?.industry?.addressLine2 || ''
                }`,
        },
        {
            header: () => <span>Created At</span>,
            accessorKey: 'industry.addressLine1',
            cell: (info) => (
                <Typography variant="small" medium color={'text-gray-800'}>
                    {moment(info?.row?.original?.createdAt).format(
                        'Do MMMM, YYYY'
                    )}
                </Typography>
            ),
        },
    ]

    return columns
}
