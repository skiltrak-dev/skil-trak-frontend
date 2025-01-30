// Icons

// components
import { Card, Table, Typography } from '@components'
// import { StudentCellInfo } from './components'

import { User } from '@types'

import { ColumnDef } from '@tanstack/react-table'

export const GlobalSearchList = ({
    students,
    setPage,
    itemPerPage,
    setItemPerPage,
}: {
    students: any
    setPage: any
    itemPerPage: any
    setItemPerPage: any
}) => {
    const Columns: ColumnDef<User>[] = [
        {
            header: () => 'Name',
            accessorKey: 'name',
        },

        {
            header: () => 'Email',
            accessorKey: 'email',
        },
        {
            accessorKey: 'role',
            header: () => <span>Role</span>,
            cell: ({ row }) => (
                <Typography variant="small" bold uppercase>
                    {' '}
                    {row.original?.role}{' '}
                </Typography>
            ),
        },
    ]

    return (
        <div>
            <Card noPadding>
                <Table columns={Columns} data={students?.data}>
                    {({ table, pagination, pageSize, quickActions }: any) => {
                        return (
                            <div>
                                <div className="p-6 mb-2 flex justify-between">
                                    {pageSize(
                                        itemPerPage,
                                        setItemPerPage,
                                        students?.data?.length
                                    )}
                                    <div className="flex gap-x-2">
                                        {quickActions}
                                        {pagination(
                                            students?.pagination,
                                            setPage
                                        )}
                                    </div>
                                </div>
                                <div className="overflow-x-auto remove-scrollbar">
                                    <div
                                        className="px-6 w-full"
                                        id={'studentScrollId'}
                                    >
                                        {table}
                                    </div>
                                </div>
                                {students?.data?.length > 10 && (
                                    <div className="p-6 mb-2 flex justify-between">
                                        {pageSize(
                                            itemPerPage,
                                            setItemPerPage,
                                            students?.data?.length
                                        )}
                                        <div className="flex gap-x-2">
                                            {quickActions}
                                            {pagination(
                                                students?.pagination,
                                                setPage
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    }}
                </Table>
            </Card>
        </div>
    )
}
