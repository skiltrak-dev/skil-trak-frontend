import { Typography, UserCreatedAt } from '@components'
import { SubAdminApi } from '@queries'
import { useState } from 'react'
import { ApprovedBy, CompleteTask, TableColumn, TodoTable } from '../components'
import { useTodoHooks } from '../hooks'
import Link from 'next/link'
import { getUserCredentials } from '@utils'
import { UserRoles } from '@constants'
import { redirectUrls } from '../functions'

export const TodoHighpriority = ({
    filterDate,
}: {
    filterDate: Date | null
}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    const role = getUserCredentials()?.role

    const { id, skip } = useTodoHooks()

    const data = SubAdminApi.Todo.highPriorityTodoList(
        {
            ...(id ? { id } : {}),
            search: `${JSON.stringify({
                date: filterDate,
            })
                .replaceAll('{', '')
                .replaceAll('}', '')
                .replaceAll('"', '')
                .trim()}`,
            limit: itemsPerPage,
            skip: itemsPerPage * currentPage - itemsPerPage,
        },
        {
            skip,
        }
    )

    const columns: TableColumn<any>[] = [
        {
            key: 'student.user.name',
            header: 'Name',
            width: '200px',
            render: (value, row) => (
                <Link href={redirectUrls(row?.student?.id)}>
                    <Typography variant="label" cursorPointer>
                        {value}
                    </Typography>
                </Link>
            ),
        },
        {
            key: 'dueDate',
            header: 'Due Date',
            width: '120px',
            render: (value) => <UserCreatedAt createdAt={value} />,
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
