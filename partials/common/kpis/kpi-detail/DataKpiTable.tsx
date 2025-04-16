import {
    IndeterminateCheckbox,
    LoadingAnimation,
    NoData,
    Pagination,
    QuickTableAction,
    Typography,
} from '@components'
import {
    ColumnDef,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import React, {
    ReactElement,
    ReactNode,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { IconType } from 'react-icons'
import { KpiTable } from './KpiTable'

interface DataKpiTableProps<Type> {
    enableRowSelection?: boolean
    data: any
    columns: ColumnDef<Type>[]
    title: string
    quickActions?: QuickTableAction<Type>
    Icon: IconType
    colors: string
    setPage: (page: number) => void
}

export const DataKpiTable = <Type,>({
    data,
    columns,
    Icon,
    title,
    colors,
    setPage,
    quickActions,
    enableRowSelection,
}: DataKpiTableProps<Type>) => {
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

    const table = useReactTable({
        columns: tableColumns,
        data: data?.data?.data,
        getCoreRowModel: getCoreRowModel(),
        ...(enableRowSelection ? rowSelectionOption : {}),
    })

    return (
        <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-4">
                    <div className="flex items-center gap-2">
                        <div className="p-2 border border-[#1436B033] rounded-lg">
                            <span
                                className={` text-base`}
                                style={{ color: colors }}
                            >
                                <Icon />
                            </span>
                        </div>
                        <Typography semibold>{title}</Typography>
                    </div>
                    <div className="mt-1.5">
                        <Typography variant="xs">
                            {data?.data?.data?.length} Records
                        </Typography>
                    </div>
                </div>
                <div className="flex items-center gap-x-3">
                    {selectedRowActions}
                    {setPage && data?.data?.pagination && (
                        <Pagination
                            table={table}
                            pagination={data?.data?.pagination}
                            setPage={setPage}
                        />
                    )}
                </div>
            </div>

            {data?.isError ? <NoData text="Technical Error" isError /> : null}
            {data?.isLoading || data?.isFetching ? (
                <LoadingAnimation />
            ) : data?.data && data?.data?.data?.length && data?.isSuccess ? (
                <KpiTable
                    table={table as any}
                    enableRowSelection={enableRowSelection}
                />
            ) : data?.isSuccess ? (
                <NoData text="No Data Found" />
            ) : null}
        </div>
    )
}
