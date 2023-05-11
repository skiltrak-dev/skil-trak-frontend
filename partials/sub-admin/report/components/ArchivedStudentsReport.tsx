import { EmptyData, InitialAvatar, LoadingAnimation, Table, TechnicalError, Typography } from '@components'

import React, { useState } from 'react'
import { RtoApi } from '@queries'
import { ColumnDef } from '@tanstack/react-table'
import { Course } from '@types'
import { ViewFullListReport } from '../ViewFullListReport'
import { CourseDot } from '@partials/rto/student/components'
type Props = {}

export const ArchivedStudentsReport = (props: Props) => {
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    const { data, isLoading, isError } = RtoApi.Students.useArchivedStudentsReport({
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    });
    console.log("data", data);

    const columns: ColumnDef<any>[] = [
        {
            header: () => <span>Name</span>,
            accessorKey: 'user',
            cell: (info: any) => {
                const {
                    id,
                    user: { name, avatar },
                } = info.row.original || {}

                return (
                    <a className="flex items-center gap-x-2">
                        <InitialAvatar name={name} imageUrl={avatar} />
                        <div className='flex flex-col'>
                            <span>{id}</span>
                            <span>
                                {name}
                            </span>
                        </div>
                    </a>
                )
            },

        },
        {
            accessorKey: 'email',
            header: () => <span>Email</span>,
            cell: (info) => {
                const { user: { email } } = info.row.original || {}
                return <span>{email}</span>
            }
        },
        {
            accessorKey: 'phone',
            header: () => <span>Phone</span>,
        },
        {
            accessorKey: 'courses',
            header: () => <span>Courses</span>,
            cell: (info) => {
                return info?.row?.original?.courses?.map((c: Course) => (
                    <CourseDot key={c?.id} course={c} />
                ))
            },
        },


    ]
    const count = data?.data?.length;
    return (
        <>
            <div className="flex justify-between items-center">
                <div className="">
                    <Typography variant="title" color="text-gray-400">
                        Archived Students
                    </Typography>
                    <Typography variant="h3">{count || 0}</Typography>
                </div>
                <ViewFullListReport data={data} columns={columns} />
            </div>

            {isError && <TechnicalError />}
            {isLoading ? (
                <LoadingAnimation height="h-[60vh]" />
            ) : data?.data && data?.data?.length ? (
                <Table columns={columns} data={data?.data}>
                    {({
                        table,
                        pagination,
                        pageSize,
                        quickActions,
                    }: any) => {
                        return (
                            <div>
                                <div className="p-6 mb-2 flex justify-between">
                                    {pageSize(itemPerPage, setItemPerPage)}
                                    <div className="flex gap-x-2">
                                        {quickActions}
                                        {pagination(
                                            data?.pagination,
                                            setPage
                                        )}
                                    </div>
                                </div>
                                <div className="px-6">{table}</div>
                            </div>
                        )
                    }}
                </Table>
            ) : (
                !isError && (
                    <EmptyData
                        title={'No Not Contactable Students Found'}
                        description={
                            'There is no any Not Contactable Students yet'
                        }
                        height={'50vh'}
                    />
                )
            )}
        </>
    )
}
