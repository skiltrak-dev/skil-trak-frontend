import { ColumnDef } from '@tanstack/react-table'
import { TableData } from '@partials/common/kpis'

export const getColumns = (type: string): ColumnDef<TableData>[] => {
    const baseColumns: ColumnDef<TableData>[] = [
        {
            accessorKey: 'studentId',
            header: 'Student ID',

            cell: (info) => info.getValue() as string,
        },
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            accessorKey: 'phone',
            header: 'Phone',
        },
        {
            accessorKey: 'courses',
            header: 'COURSES',
        },
    ]

    const dateColumn: ColumnDef<TableData> = {
        accessorKey: type.toLowerCase().replace(/\s+/g, '') + 'Date',
        header: type.includes('Agreement')
            ? 'Uploaded Date'
            : type === 'Workplace request'
            ? 'Workplace Request Date'
            : type === 'Completed'
            ? 'Completed Date'
            : 'Appointment Book Date',
    }

    return [...baseColumns, dateColumn]
}
