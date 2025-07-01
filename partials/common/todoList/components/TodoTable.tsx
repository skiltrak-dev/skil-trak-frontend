import { PaginationData, TodoPagination } from './TodoPagination'
import { PiUser } from 'react-icons/pi'

// Define the column configuration interface
export interface TableColumn<T> {
    key: keyof T | string
    header: string
    width?: string
    render?: (value: any, row: T, index: number) => React.ReactNode
    className?: string
}

// Define the table props interface
export interface TableProps<T> {
    data: T[]
    columns: TableColumn<T>[]
    title?: string
    totalCount?: number
    statusCounts?: {
        done: number
        remaining: number
    }
    onClose?: () => void
    className?: string
    pagination?: PaginationData
    onPageChange?: (page: number) => void
    onItemsPerPageChange?: (itemsPerPage: number) => void
    loading?: boolean
}

// Status badge component
const StatusBadge: React.FC<{
    count: number
    label: string
    type: 'done' | 'remaining'
}> = ({ count, label, type }) => (
    <div
        className={`px-8 py-2 rounded-lg text-sm font-medium border flex justify-between gap-x-24 items-center ${
            type === 'done' ? ' text-gray-700' : ' text-gray-700'
        }`}
    >
        <p>{label}</p>
        <p className="">{count}</p>
    </div>
)

// Loading component
const LoadingSpinner: React.FC = () => (
    <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
)

// Main table component
export function TodoTable<T extends Record<string, any>>({
    data,
    columns,
    title,
    totalCount,
    statusCounts,
    onClose,
    className = '',
    pagination,
    onPageChange,
    onItemsPerPageChange,
    loading = false,
}: TableProps<T>) {
    return (
        <div
            className={`bg-white rounded-lg border border-gray-200 overflow-hidden p-6 ${className}`}
        >
            {/* Header Section */}
            {(title || statusCounts || onClose) && (
                <div className="px-6 py-4 ">
                    <div className="">
                        <div className="flex items-center gap-4">
                            {/* Icon and Title */}
                            <div className="flex items-center gap-6">
                                <div className="p-2 rounded-lg border flex items-center justify-center">
                                    <PiUser
                                        className="text-blue-800 "
                                        size={18}
                                    />
                                </div>
                                {title && (
                                    <h3 className="text-blue-500 text-lg">
                                        {title}
                                    </h3>
                                )}
                            </div>

                            {/* Total Count */}
                            {totalCount && (
                                <span className="text-blue-500 text-lg">
                                    {totalCount}
                                </span>
                            )}
                        </div>

                        {/* Status Badges and Close Button */}
                        <div className="flex items-center gap-3 my-3">
                            {statusCounts && (
                                <>
                                    <StatusBadge
                                        count={statusCounts.done}
                                        label="Done"
                                        type="done"
                                    />
                                    <StatusBadge
                                        count={statusCounts.remaining}
                                        label="Remaining"
                                        type="remaining"
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="overflow-auto remove-scrollbar">
                <table className="w-full">
                    {/* Table Header */}
                    <thead>
                        <tr className=" border-b border-gray-200 rounded-none">
                            {columns.map((column, index) => (
                                <th
                                    key={String(column.key)}
                                    className={`p-6 text-left border-b text-xs font-medium text-gray-500 uppercase tracking-wider ${
                                        column.className || ''
                                    }`}
                                    style={
                                        column.width
                                            ? { width: column.width }
                                            : undefined
                                    }
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={columns.length}>
                                    <LoadingSpinner />
                                </td>
                            </tr>
                        ) : data.length > 0 ? (
                            data?.map((row, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    className="hover:bg-gray-50 transition-colors "
                                >
                                    {columns?.map(
                                        (column: any, colIndex: any) => {
                                            const value = column?.key?.includes(
                                                '.'
                                            )
                                                ? column?.key
                                                      ?.split('.')
                                                      .reduce(
                                                          (
                                                              obj: any,
                                                              key: any
                                                          ) => obj?.[key],
                                                          row
                                                      )
                                                : row[column.key as keyof T]

                                            return (
                                                <td
                                                    key={`${rowIndex}-${colIndex}`}
                                                    className={`px-6 py-4 whitespace-nowrap border-b bg-white text-sm text-gray-900 ${
                                                        column.className || ''
                                                    } ${
                                                        rowIndex ===
                                                        data.length - 1
                                                            ? 'border-b-0 pb-0'
                                                            : ''
                                                    }`}
                                                >
                                                    {column.render
                                                        ? column.render(
                                                              value,
                                                              row,
                                                              rowIndex
                                                          )
                                                        : value}
                                                </td>
                                            )
                                        }
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="text-center py-12"
                                >
                                    <div className="text-gray-500 text-sm">
                                        No data available
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {pagination && onPageChange && (
                <TodoPagination
                    pagination={pagination}
                    onPageChange={onPageChange}
                    onItemsPerPageChange={onItemsPerPageChange}
                />
            )}
        </div>
    )
}
