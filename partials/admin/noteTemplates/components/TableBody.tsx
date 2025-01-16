import React from 'react'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Row } from '@tanstack/react-table'
import { SortableTableRow } from './SortableTableRow'
import { NoteTemplateType } from './types'

export const TableBody: React.FC<{ notes: NoteTemplateType[]; table: any }> = ({
    notes,
    table,
}) => (
    <SortableContext
        items={notes.map((note) => note.id)}
        strategy={verticalListSortingStrategy}
    >
        {table
            .getRowModel()
            .rows.map((row: Row<NoteTemplateType>, index: number) => (
                <SortableTableRow
                    key={row.original.id}
                    row={row}
                    index={index}
                />
            ))}
    </SortableContext>
)
