import { useState } from 'react'
import { SubAdminApi } from '@queries'
import { FaCheck } from 'react-icons/fa'
import { Tooltip, UserCreatedAt } from '@components'
import { IoCloseSharp } from 'react-icons/io5'
import { TableColumn, TodoTable } from '../components'
import { useTodoHooks } from '../hooks'

export const TodoTickets = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    const data = SubAdminApi.Todo.ticketTodoList({
        skip: itemsPerPage * currentPage - itemsPerPage,
        limit: itemsPerPage,
    })

    const { modal, onTodoCompleteClicked } = useTodoHooks()

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
            key: 'status',
            header: 'Action',
            width: '100px',
            render: (value: string, row) => (
                <div
                    className="cursor-pointer"
                    onClick={() => onTodoCompleteClicked(row)}
                >
                    <div className="relative group">
                        <FaCheck className="text-green-600" size={20} />
                        <Tooltip> Complete Ticket Task </Tooltip>
                    </div>
                </div>
            ),
        },
    ]

    return (
        <>
            {modal}
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
