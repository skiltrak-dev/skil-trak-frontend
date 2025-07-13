import React, { ReactElement, useState } from 'react'
import { CompleteTodoModal } from '../modal'
import { FaCheck } from 'react-icons/fa'
import { Tooltip, UserCreatedAt } from '@components'
import { TableColumn } from '../components'

export const useTodoHooks = () => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const onCancel = () => setModal(null)

    const onTodoCompleteClicked = (todo: any) => {
        setModal(<CompleteTodoModal todo={todo} onCancel={onCancel} />)
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
            key: 'overDue',
            header: 'IsOverDue',
            width: '120px',
            render: (value: string) => (
                <div className="cursor-pointer">
                    {value ? 'Over Due' : null}
                </div>
            ),
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
                        <Tooltip> Complete Workplace Task </Tooltip>
                    </div>
                </div>
            ),
        },
    ]

    return {
        modal,
        columns,
        onTodoCompleteClicked,
    }
}
