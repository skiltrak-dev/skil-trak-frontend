import {
    ColumnDef,
    flexRender,
    useReactTable,
    getCoreRowModel,
    PaginationState,
    getPaginationRowModel,
} from '@tanstack/react-table'
import { Paginate } from '@types'
import React from 'react'
import {
    HTMLProps,
    ReactElement,
    ReactNode,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import { PageSize } from './components/PageSize'
import { Pagination } from './components/Pagination'

export interface TableChildrenProps {
    quickActions: ReactNode
    pageSize: Function | null
    pagination: Function | null
    table: JSX.Element
}

interface QuickTableAction {
    id: string | number
    individual: Function | null
    common?: Function | null
    // setter: Function
}

interface TableProps<Type> {
    children: ({
        quickActions,
        pageSize,
        pagination,
        table,
    }: TableChildrenProps) => JSX.Element
    columns: ColumnDef<Type>[]
    data: Type[]
    quickActions?: QuickTableAction
    enableRowSelection?: boolean
    pagination?: boolean
    pageSize?: boolean
}

export const Table = <Type,>({
    children,
    columns,
    data,
    quickActions,
    enableRowSelection,
    pagination = true,
    pageSize = true,
}: TableProps<Type>) => {
    // Table Columns
    const tableColumns = useMemo<ColumnDef<Type>[]>(
        () => [
            ...(enableRowSelection
                ? [
                      {
                          id: 'select',
                          header: ({ table }: { table: any }) => (
                              <IndeterminateCheckbox
                                  {...{
                                      checked: table.getIsAllRowsSelected(),
                                      indeterminate:
                                          table.getIsSomeRowsSelected(),
                                      onChange:
                                          table.getToggleAllRowsSelectedHandler(),
                                  }}
                              />
                          ),
                          cell: ({ row }: { row: any }) => (
                              <IndeterminateCheckbox
                                  {...{
                                      checked: row.getIsSelected(),
                                      indeterminate: row.getIsSomeSelected(),
                                      onChange: row.getToggleSelectedHandler(),
                                  }}
                              />
                          ),
                      },
                  ]
                : []),
            ...columns,
        ],
        [columns]
    )

    // Table Row Selection
    const [rowSelection, setRowSelection] = useState({})

    const [selectedRowActions, setSelectedRowActions] = useState<
        ReactElement | ReactNode | null
    >(null)
    // On Row Selection Change
    useEffect(() => {
        // If only row is selected
        if (Object.keys(rowSelection).length === 1) {
            const selectedRowIndex = Number(Object.keys(rowSelection)[0])
            const selectedRow =
                table.getRowModel().rowsById[selectedRowIndex].original

            if (quickActions) {
                const selectedRowId = (selectedRow as any)[quickActions?.id]
                quickActions?.individual &&
                    setSelectedRowActions(quickActions?.individual(selectedRow))
            }
        }

        // If multiple rows are selected
        else if (Object.keys(rowSelection).length > 1) {
            const selectedRows: Type[] | any[] = []

            Object.keys(rowSelection).map((key) => {
                const currentRowIndex = Number(key)

                const currentRow =
                    table.getRowModel().rowsById[currentRowIndex].original

                if (quickActions) {
                    const currentRowId = (currentRow as any)[quickActions?.id]
                    selectedRows.push(currentRow)
                }
            })

            if (quickActions) {
                quickActions?.common &&
                    setSelectedRowActions(quickActions?.common(selectedRows))
            }
        }

        // If no row is selected
        else {
            setSelectedRowActions(null)
        }
    }, [rowSelection])

    const rowSelectionOption = {
        state: {
            rowSelection,
        },
        onRowSelectionChange: setRowSelection,
    }

    // Create Table
    const table = useReactTable({
        data,
        columns: tableColumns,

        // When Row Selection Enabled
        ...(enableRowSelection ? rowSelectionOption : {}),

        // Pipeline
        getCoreRowModel: getCoreRowModel(),

        // When Pagination Is Enabled
        ...(pagination
            ? { getPaginationRowModel: getPaginationRowModel() }
            : {}),
    })

    useEffect(() => {
        table.setPageSize(data?.length)
    }, [data, table])

    // Render Table
    return children({
        quickActions: selectedRowActions,
        pageSize: pageSize
            ? (
                  itemPerPage: number,
                  setItemPerPage: Function,
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
            ? (paginated: Paginate, setPage: Function) => (
                  <Pagination
                      table={table}
                      pagination={paginated}
                      setPage={setPage}
                  />
              )
            : null,
        table: (
            <table className="w-full">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header, idx: number) => (
                                <th
                                    key={header.id}
                                    {...(idx === 0 && enableRowSelection
                                        ? {
                                              className: '',
                                              style: {
                                                  width: '40px',
                                                  minWidth: '40px',
                                                  maxWidth: '40px',
                                                  wordBreak: 'break-all',
                                              },
                                          }
                                        : {
                                              className: '',
                                          })}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row, idx: number) => (
                        <React.Fragment key={row.id}>
                            <tr className="table-row">
                                {row
                                    .getVisibleCells()
                                    .map((cell, idx: number) => (
                                        <td
                                            key={cell.id}
                                            {...(idx === 0 && enableRowSelection
                                                ? {
                                                      className: '',
                                                      style: {
                                                          width: '40px',
                                                          minWidth: '40px',
                                                          maxWidth: '40px',
                                                          wordBreak:
                                                              'break-all',
                                                      },
                                                  }
                                                : {})}
                                        >
                                            <div
                                                {...(idx === 0 &&
                                                enableRowSelection
                                                    ? {
                                                          //   className: row.getIsSelected()
                                                          //      ? 'visible'
                                                          //      : 'invisible group-hover:visible',
                                                          className:
                                                              row.getIsSelected()
                                                                  ? 'visible'
                                                                  : 'row-unchecked',
                                                      }
                                                    : {})}
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </div>
                                        </td>
                                    ))}
                            </tr>
                            <tr aria-hidden="true">
                                <td></td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
                <tfoot>
                    {table.getFooterGroups().map((footerGroup) => (
                        <tr key={footerGroup.id}>
                            {footerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.footer,
                                              header.getContext()
                                          )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </tfoot>
            </table>
        ),
    })
}

// Indeterminate Checkbox For Table
export const IndeterminateCheckbox = ({
    indeterminate,
    className = '',
    ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) => {
    const ref = useRef<HTMLInputElement>(null!)

    useEffect(() => {
        if (typeof indeterminate === 'boolean') {
            ref.current.indeterminate = !rest.checked && indeterminate
        }
    }, [ref, indeterminate])

    return (
        <input
            type="checkbox"
            ref={ref}
            className={className + ' cursor-pointer'}
            {...rest}
        />
    )
}
