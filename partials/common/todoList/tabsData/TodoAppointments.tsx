import { useState } from 'react'
import { SubAdminApi } from '@queries'
import { Typography, UserCreatedAt } from '@components'
import { ApprovedBy, CompleteTask, TableColumn, TodoTable } from '../components'
import { useTodoHooks } from '../hooks'
import Link from 'next/link'
import { User } from '@types'

export const TodoAppointments = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    const { id, skip } = useTodoHooks()

    const data = SubAdminApi.Todo.appointmentTodoList(
        {
            ...(id ? { id } : {}),
            limit: itemsPerPage,
            skip: itemsPerPage * currentPage - itemsPerPage,
        },
        {
            skip,
        }
    )

    const columns: TableColumn<any>[] = [
        {
            key: 'studentId',
            header: 'Student ID',
            width: '140px',
            className: 'font-medium',
            render: (value, row) => (
                <Link href={`/portals/sub-admin/students/${row?.id}/detail`}>
                    <Typography variant="label" cursorPointer>
                        {value}
                    </Typography>
                </Link>
            ),
        },
        {
            key: 'appointmentfor',
            header: 'Name',
            width: '200px',
        },
        {
            key: 'date',
            header: 'Due Date',
            width: '120px',
            render: (value) => <UserCreatedAt createdAt={value} />,
        },
        {
            key: 'addressLine1',
            header: 'Address',
            width: '120px',
        },
        {
            key: 'overDue',
            header: 'Over Due',
            width: '120px',
            render: (value: string) => (
                <div className="cursor-pointer">
                    {value ? 'Over Due' : '---'}
                </div>
            ),
        },
        {
            key: 'approvedBy',
            header: 'Approved By',
            width: '100px',
            render: (value: string, row) =>
                row?.actionbyid ? (
                    <ApprovedBy
                        user={
                            {
                                id: row?.actionbyid,
                                name: row?.actionbyname,
                                email: row?.actionbyemail,
                            } as User
                        }
                    />
                ) : (
                    '---'
                ),
        },
        {
            key: 'status',
            header: 'Action',
            width: '100px',
            render: (value: string, row) => (
                <CompleteTask data={row} text={'Complete Appointment Task'} />
            ),
        },
    ]

    return (
        <>
            <TodoTable
                data={data}
                columns={columns}
                title="Appointments:"
                statusCounts={{
                    done: data?.data?.completed,
                    remaining: data?.data?.remaining,
                }}
                onClose={() => console.log('Close clicked')}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={setItemsPerPage}
            />
        </>
    )
}
