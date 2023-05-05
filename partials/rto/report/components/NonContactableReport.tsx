import { EmptyData, InitialAvatar, LoadingAnimation, Table, TechnicalError } from '@components'
import { SectorCell } from '@partials/rto/student/components'
import React, { useState } from 'react'
import { RtoApi } from '@queries'
import { ColumnDef } from '@tanstack/react-table'
type Props = {}

export const NonContactableReport = (props: Props) => {
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    const { data, isLoading, isError } = RtoApi.Students.useGetNotContactableStudents({
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    });

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
                return <SectorCell student={info.row.original} />
            },
        },


    ]
    return (
        <>

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
