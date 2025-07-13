import { Tooltip, UserCreatedAt } from '@components'
import { SubAdminApi } from '@queries'
import { useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import { TableColumn, TodoTable } from '../components'
import { useTodoHooks } from '../hooks'

export const TodoWeeklyFollowup = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    const data = SubAdminApi.Todo.weeklyFollowUp({
        skip: itemsPerPage * currentPage - itemsPerPage,
        limit: itemsPerPage,
    })

    const { modal, onTodoCompleteClicked } = useTodoHooks()

    const columns: TableColumn<any>[] = [
        {
            key: 'student.studentId',
            header: 'Student ID',
            width: '140px',
            className: 'font-medium',
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
                title="Weekly Student Follow up:"
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
