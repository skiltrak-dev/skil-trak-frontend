import { UserCreatedAt } from '@components'
import { SubAdminApi } from '@queries'
import { useState } from 'react'
import { CompleteTask, TableColumn, TodoTable } from '../components'

export const BiMonthlyNonPartnerInd = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    const data = SubAdminApi.Todo.biMonthlyNonPartnerIndustries({
        skip: itemsPerPage * currentPage - itemsPerPage,
        limit: itemsPerPage,
    })

    const columns: TableColumn<any>[] = [
        {
            key: 'industry.user.name',
            header: 'Industry Name',
            width: '140px',
            className: 'font-medium',
        },
        {
            key: 'industry.user.email',
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
            key: 'industry.addressLine1',
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
                <CompleteTask data={row} text={'Complete Ticket Task'} />
            ),
        },
    ]

    return (
        <>
            <TodoTable
                data={data}
                columns={columns}
                title="Bi Monthly Non Partner Industries:"
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
