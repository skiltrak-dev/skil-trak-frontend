import { UserCreatedAt } from '@components'
import { SubAdminApi } from '@queries'
import { useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import { IoCloseSharp } from 'react-icons/io5'
import { PaginationData, TableColumn, TodoTable } from '../components'

export const TodoHighpriority = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [loading, setLoading] = useState(false)

    const data = SubAdminApi.Todo.highPriorityTodoList()

    const paginationData: PaginationData = {
        currentPage: currentPage,
        totalResult: 71,
        totalPage: 220,
        itemPerPage: itemsPerPage,
        hasNext: currentPage < 2,
        hasPrevious: currentPage > 1,
    }

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
            render: (value: string) => (
                <div className="">
                    {value === 'approved' ? (
                        <div className="w-6 h-6">
                            <FaCheck className="text-green-600" size={20} />
                        </div>
                    ) : (
                        <div className="w-6 h-6 ">
                            <IoCloseSharp className="text-red-600" size={30} />
                        </div>
                    )}
                </div>
            ),
        },
    ]

    return (
        <TodoTable
            data={data}
            columns={columns}
            title="High Priority Items:"
            totalCount={148}
            statusCounts={{
                done: 120,
                remaining: 28,
            }}
            onClose={() => console.log('Close clicked')}
            pagination={paginationData}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
            loading={loading}
        />
    )
}
