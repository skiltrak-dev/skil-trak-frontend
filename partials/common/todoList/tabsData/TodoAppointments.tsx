import { useState } from 'react'
import { SubAdminApi } from '@queries'
import { FaCheck } from 'react-icons/fa'
import { Tooltip, UserCreatedAt } from '@components'
import { IoCloseSharp } from 'react-icons/io5'
import { TableColumn, TodoTable } from '../components'
import { useTodoHooks } from '../hooks'

export const TodoAppointments = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    const { modal, onTodoCompleteClicked } = useTodoHooks()

    const data = SubAdminApi.Todo.appointmentTodoList({
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
                        <Tooltip> Complete Appointment Task </Tooltip>
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
