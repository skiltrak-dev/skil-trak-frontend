import { Typography } from '@components'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { flexRender } from '@tanstack/react-table'
import React from 'react'

export const SortableTableRow = ({
    row,
    index,
}: {
    row: any
    index: number
}) => {
    const {
        attributes,
        listeners,
        transform,
        transition,
        setNodeRef,
        isDragging,
    } = useSortable({
        id: row.original.id,
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: isDragging ? '#f3f4f6' : undefined,
    }

    const ContentDataTypes = ['successContent', 'failureContent']

    return (
        <React.Fragment>
            <tr
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                className="hover:bg-gray-50 cursor-grabbing transition-opacity duration-200 "
            >
                {row.getVisibleCells().map((cell: any, i: number) => (
                    <td
                        key={cell.id}
                        className={`px-0 py-4 text-left ${
                            i === 0 || row.original.expanded
                                ? 'border-none px-0  '
                                : 'border-b-2 border-dotted border-b-gray-400'
                        }
            
          ${row.original.expanded ? '' : ''}`}
                        onClick={(e) => {
                            if (
                                cell.column.id === 'expand' ||
                                cell.column.id === 'action'
                            ) {
                                e.stopPropagation()
                            }
                        }}
                    >
                        {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                        )}
                    </td>
                ))}
            </tr>
            {row.original.expanded && (
                <tr>
                    <td colSpan={99} className="bg-gray-50 p-5">
                        <div className="p-3 flex flex-col gap-y-3 border border-gray-400 border-dotted">
                            {ContentDataTypes?.map((type) => {
                                if (row?.original?.[type]) {
                                    return (
                                        <div>
                                            <Typography
                                                variant="small"
                                                uppercase
                                                semibold
                                            >
                                                {type}{' '}
                                            </Typography>
                                            <Typography variant="small">
                                                <span
                                                    className="ml-2 block"
                                                    dangerouslySetInnerHTML={{
                                                        __html: row?.original?.[
                                                            type
                                                        ],
                                                    }}
                                                />
                                            </Typography>
                                        </div>
                                    )
                                }
                                return
                            })}
                        </div>
                    </td>
                </tr>
            )}
        </React.Fragment>
    )
}
