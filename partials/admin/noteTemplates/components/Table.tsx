import React, { useMemo } from 'react'
import {
    useReactTable,
    getCoreRowModel,
    createColumnHelper,
    ColumnDef,
} from '@tanstack/react-table'
import { BiSolidDownArrow, BiSolidRightArrow } from 'react-icons/bi'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin6Fill } from 'react-icons/ri'

import { TableHeader } from './TableHeader'
import { TableBody } from './TableBody'
import { NoteTemplateType } from './types'

interface TableProps {
    notes: NoteTemplateType[]
    columns: ColumnDef<any>[]
}

export const Table: React.FC<TableProps> = ({ columns, notes }) => {
    const columnHelper = createColumnHelper<NoteTemplateType>()

    const tableColumns = useMemo(() => columns, [columns])
    const data = useMemo(() => notes, [notes])

    const table = useReactTable({
        data,
        columns: tableColumns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <table className="min-w-full">
            <thead>
                <TableHeader headerGroups={table.getHeaderGroups()} />
            </thead>
            <tbody>
                <TableBody notes={data} table={table} />
            </tbody>
        </table>
    )
}
