import { Typography, UserCreatedAt } from '@components'
import { SubAdminApi } from '@queries'
import { useState } from 'react'
import { ApprovedBy, CompleteTask, TableColumn, TodoTable } from '../components'
import { useTodoHooks } from '../hooks'
import Link from 'next/link'

export const TodoHighpriority = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    const { id, skip } = useTodoHooks()

    const data = SubAdminApi.Todo.highPriorityTodoList(
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
            key: 'student.studentId',
            header: 'Student ID',
            width: '140px',
            className: 'font-medium',
            render: (value, row) => (
                <Link
                    href={`/portals/sub-admin/students/${row?.student?.id}/detail`}
                >
                    <Typography variant="label" cursorPointer>
                        {value}
                    </Typography>
                </Link>
            ),
        },
        {
            key: 'student.user.name',
            header: 'Name',
            width: '200px',
        },
        {
            key: 'dueDate',
            header: 'Due Date',
            width: '120px',
            render: (value) => <UserCreatedAt createdAt={value} />,
        },
        {
            key: 'student.addressLine1',
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
                row?.actionBy ? <ApprovedBy user={row?.actionBy} /> : '---',
        },
        {
            key: 'status',
            header: 'Action',
            width: '100px',
            render: (value: string, row) => (
                <CompleteTask
                    data={row}
                    text={'Complete High Priority Tas ask'}
                />
            ),
        },
    ]

    return (
        <>
            <TodoTable
                data={data}
                columns={columns}
                title="High Priority Items:"
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
