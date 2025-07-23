import { UserCreatedAt } from '@components'
import { SubAdminApi } from '@queries'
import { useState } from 'react'
import { ApprovedBy, CompleteTask, TableColumn, TodoTable } from '../components'
import { useTodoHooks } from '../hooks'

export const TodoMonthlyPartnerIndustriesFollowUp = ({
    filterDate,
}: {
    filterDate: Date | null
}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    const { id, skip } = useTodoHooks()

    const data = SubAdminApi.Todo.monthlyPartnerIndustriesFollowUp(
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
                    text={'Complete Monthly Partner Industry Task'}
                />
            ),
        },
    ]

    return (
        <>
            <TodoTable
                data={data}
                columns={columns}
                title="Monthly Partner Industry Follow up:"
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
