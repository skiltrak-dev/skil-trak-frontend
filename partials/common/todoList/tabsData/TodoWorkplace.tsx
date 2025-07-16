import { UserCreatedAt } from '@components'
import { SubAdminApi } from '@queries'
import { useState } from 'react'
import { CompleteTask, TableColumn, TodoTable } from '../components'

export const TodoWorkplace = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    const data = SubAdminApi.Todo.workplaceTodoList({
        skip: itemsPerPage * currentPage - itemsPerPage,
        limit: itemsPerPage,
    })

    const columns: TableColumn<any>[] = [
        {
            key: 'studentId',
            header: 'Student ID',
            width: '140px',
            className: 'font-medium',
        },
        {
            key: 'studentUserName',
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
            key: 'status',
            header: 'Action',
            width: '100px',
            render: (value: string, row) => (
                <CompleteTask data={row} text={'Complete Workplace Task'} />
            ),
        },
    ]

    return (
        <>
            <TodoTable
                data={data}
                columns={columns}
                title="Workplace Request:"
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
