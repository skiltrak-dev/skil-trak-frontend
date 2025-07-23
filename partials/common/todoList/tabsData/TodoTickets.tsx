import { useState } from 'react'
import { SubAdminApi } from '@queries'
import { UserCreatedAt } from '@components'
import { ApprovedBy, CompleteTask, TableColumn, TodoTable } from '../components'
import { useTodoHooks } from '../hooks'
import { User } from '@types'

export const TodoTickets = ({ filterDate }: { filterDate: Date | null }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    const { id, skip } = useTodoHooks()

    const data = SubAdminApi.Todo.ticketTodoList(
        {
            ...(id ? { id } : {}),
            limit: itemsPerPage,
            search: `${JSON.stringify({
                date: filterDate,
            })
                .replaceAll('{', '')
                .replaceAll('}', '')
                .replaceAll('"', '')
                .trim()}`,
            skip: itemsPerPage * currentPage - itemsPerPage,
        },
        {
            skip,
        }
    )

    const columns: TableColumn<any>[] = [
        {
            key: 'createdByName',
            header: 'Created By',
            width: '140px',
            className: 'font-medium',
        },
        {
            key: 'assignedToName',
            header: 'Assigned To',
            width: '200px',
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
                <CompleteTask data={row} text={'Complete Ticket Task'} />
            ),
        },
    ]

    return (
        <>
            <TodoTable
                data={data}
                columns={columns}
                title="Open Tickets:"
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
