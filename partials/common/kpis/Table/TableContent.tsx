import { Table, flexRender } from '@tanstack/react-table'
import { LuChevronDown, LuChevronUp, LuChevronsUpDown } from 'react-icons/lu'

interface TableContentProps<T> {
    table: Table<T>
}

export const TableContent = <T,>({ table }: TableContentProps<T>) => {
    return (
        <div className="border overflow-auto">
            <table className="w-full">
                <thead className="bg-gray-50">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    className={`px-2 py-3 text-left text-xs font-medium text-gray-700 ${
                                        header.column.getCanSort()
                                            ? 'cursor-pointer select-none'
                                            : ''
                                    }`}
                                >
                                    <div className="flex items-center gap-1">
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                        {header.column.getCanSort() && (
                                            <span className="ml-1">
                                                {{
                                                    asc: <LuChevronUp />,
                                                    desc: <LuChevronDown />,
                                                }[
                                                    header.column.getIsSorted() as string
                                                ] ?? <LuChevronsUpDown />}
                                            </span>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr
                            key={row.id}
                            className="border-t transition-colors hover:bg-gray-50"
                        >
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="px-2 py-3">
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
