import React from 'react'
import { flexRender } from '@tanstack/react-table'

import { HeaderGroup } from '@tanstack/react-table'

export const TableHeader = ({
    headerGroups,
}: {
    headerGroups: HeaderGroup<any>[]
}) => (
    <tr>
        {headerGroups.map((headerGroup) =>
            headerGroup.headers.map((header, index) => (
                <th
                    key={header.id}
                    className={`text-left  py-2 bg-[#D2ECF9] text-gray-700
                        ${index === 0 ? 'rounded-l-lg px-0 ' : ''}
                        ${
                            index === headerGroup.headers.length - 1
                                ? 'rounded-r-lg px-0'
                                : ''
                        }`}
                >
                    {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                    )}
                </th>
            ))
        )}
    </tr>
)
