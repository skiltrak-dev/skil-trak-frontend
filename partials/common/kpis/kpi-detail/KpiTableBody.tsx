import React from 'react'
import { Row, flexRender } from '@tanstack/react-table'
import { TableData } from '@partials/common/kpis'
import { original } from '@reduxjs/toolkit'
import { KpiTypes } from '@types'

interface TableBodyProps {
    rows: Row<TableData>[]
}

export const KpiTableBody: React.FC<TableBodyProps> = ({ rows }) => {
    return (
        <tbody className="bg-white divide-y divide-gray-200 ">
            {rows.map((row) => {
                return (
                    <tr key={row.id} className="hover:bg-gray-50 relative">
                        {row.getVisibleCells().map((cell) => {
                            const original: any = row.original

                            return (
                                <td
                                    key={cell.id}
                                    className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap"
                                >
                                    {original?.isDuplicated && (
                                        <span className="absolute top-1/2 left-0 border h-[1px] border-gray-500 w-full"></span>
                                    )}
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            )
                        })}
                    </tr>
                )
            })}
        </tbody>
    )
}
