import { PageSize, Pagination, TableChildrenProps } from '@components'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { Paginate } from '@types'
import React, { ReactElement } from 'react'

interface TableProps<Type> {
    children: ({
        pageSize,
        pagination,
        table,
    }: TableChildrenProps) => ReactElement
    columns: ColumnDef<Type>[]
    data: Type[]
    pagination?: boolean
    pageSize?: boolean
}

export const RtoProfileTable = <Type,>({
    children,
    columns,
    data,
    pagination = true,
    pageSize = true,
}: TableProps<Type>) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return children({
        pageSize: pageSize
            ? (
                  itemPerPage: number,
                  setItemPerPage: (value: number) => void,
                  records?: number
              ) => (
                  <PageSize
                      table={table}
                      itemPerPage={itemPerPage}
                      setItemPerPage={setItemPerPage}
                      records={records}
                  />
              )
            : null,
        pagination: pagination
            ? (paginated: Paginate, setPage: (value: number) => void) => (
                  <Pagination
                      table={table}
                      pagination={paginated}
                      setPage={setPage}
                  />
              )
            : null,
        table: (
            <div>
                <table className="w-full">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(
                                    (header, idx: number) => (
                                        <th
                                            key={header.id}
                                            className="border-b border-secondary-dark"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </th>
                                    )
                                )}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table
                            .getRowModel()
                            .rows.map((row: any, idx: number) => {
                                return (
                                    <React.Fragment key={row.id}>
                                        <tr className={`table-row`}>
                                            {row
                                                .getVisibleCells()
                                                .map(
                                                    (
                                                        cell: any,
                                                        idx: number
                                                    ) => (
                                                        <td
                                                            className={`${'!bg-transparent border-b !rounded-none !py-3.5'}`}
                                                            style={{
                                                                padding:
                                                                    '0px 10px !important',
                                                            }}
                                                            key={cell.id}
                                                        >
                                                            <div>
                                                                {flexRender(
                                                                    cell.column
                                                                        .columnDef
                                                                        .cell,
                                                                    cell.getContext()
                                                                )}
                                                            </div>
                                                        </td>
                                                    )
                                                )}
                                        </tr>
                                        <tr aria-hidden="true">
                                            <td></td>
                                        </tr>
                                    </React.Fragment>
                                )
                            })}
                    </tbody>
                    <tfoot>
                        {table.getFooterGroups().map((footerGroup) => (
                            <tr key={footerGroup.id}>
                                {footerGroup.headers.map((header) => (
                                    <th key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .footer,
                                                  header.getContext()
                                              )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </tfoot>
                </table>
            </div>
        ),
    })
}
