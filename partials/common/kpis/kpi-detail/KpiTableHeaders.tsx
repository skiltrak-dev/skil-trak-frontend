import React from 'react'
import { HeaderGroup, flexRender } from '@tanstack/react-table'
import { TableData } from '@partials/common/kpis'

interface TableHeaderProps {
    headerGroups: HeaderGroup<TableData>[]
}

export const KpiTableHeaders: React.FC<TableHeaderProps> = ({
    headerGroups,
}) => {
    return (
        <thead>
            {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                        <th
                            key={header.id}
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                            )}
                        </th>
                    ))}
                </tr>
            ))}
        </thead>
    )
}
