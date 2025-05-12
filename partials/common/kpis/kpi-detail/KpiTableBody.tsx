import { TableData } from '@partials/common/kpis'
import { Row, flexRender } from '@tanstack/react-table'
import React from 'react'

interface TableBodyProps {
    rows: Row<TableData>[]
    enableRowSelection?: boolean
}

export const KpiTableBody: React.FC<TableBodyProps> = ({
    rows,
    enableRowSelection,
}) => {
    return (
        <tbody className="bg-white divide-y divide-gray-200 ">
            {rows.map((row) => {
                return (
                    <tr
                        key={row.id}
                        className="hover:bg-gray-50 relative table-row"
                    >
                        {row.getVisibleCells().map((cell, index) => {
                            const original: any = row.original

                            return (
                                <td
                                    key={cell.id}
                                    className={`content px-4 py-3 text-sm text-gray-900 whitespace-nowrap `}
                                >
                                    <div
                                        className={`${
                                            enableRowSelection && index === 0
                                                ? row.getIsSelected()
                                                    ? 'visible'
                                                    : 'row-unchecked'
                                                : ''
                                        }`}
                                    >
                                        {original?.isDuplicated && (
                                            <span className="absolute top-1/2 left-0 border h-[1px] border-gray-500 w-full"></span>
                                        )}
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </div>
                                </td>
                            )
                        })}
                    </tr>
                )
            })}
        </tbody>
    )
}
