// Icons

// components
import { Card, Table, Typography } from '@components'
// import { StudentCellInfo } from './components'

import { Course, Industry, Rto, Sector, Student, User } from '@types'

import { ColumnDef } from '@tanstack/react-table'
import { CourseDot } from '@partials/admin/student/components'
import { SectorsDot } from './SectorsDot'

type ColumnType = User & {
    businessName: string
    student: Student
    industry: Industry
    rto: Rto
    futureIndustry: boolean
    sector: Sector[]
}

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
    const Columns: ColumnDef<ColumnType>[] = [
        {
            header: () => 'Name',
            accessorKey: 'name',
            cell: ({ row }) => (
                <Typography variant="small" semibold>
                    {row?.original?.name || row?.original?.businessName}
                </Typography>
            ),
        },
        // {
        //     header: () => 'Email',
        //     accessorKey: 'email',
        //     cell: ({ row }) => (
        //         <Typography variant="small" semibold>
        //             {row?.original?.email}
        //         </Typography>
        //     ),
        // },
        {
            header: () => 'Courses',
            accessorKey: 'courses',
            cell: ({ row }) => (
                <div className="flex gap-x-1">
                    {row?.original?.futureIndustry ? (
                        <div>
                            <Typography
                                variant="badge"
                                color="text-gray-600"
                                uppercase
                                bold
                            >
                                Sectors
                            </Typography>
                            {row.original?.sector?.map((s: Sector) => (
                                <SectorsDot key={s.id} sector={s} />
                            ))}
                        </div>
                    ) : (
                        row.original[
                            row.original?.role as keyof ColumnType
                        ]?.courses?.map((c: Course) => (
                            <CourseDot key={c.id} course={c} />
                        ))
                    )}
                </div>
            ),
        },
        {
            accessorKey: 'role',
            header: () => <span>Role</span>,
            cell: ({ row }) => (
                <Typography variant="small" bold uppercase>
                    {row?.original?.businessName
                        ? 'Future Industry'
                        : row.original?.role}{' '}
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
