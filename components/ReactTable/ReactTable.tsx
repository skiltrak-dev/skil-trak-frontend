import React, { useEffect, useMemo, useState } from 'react'
import {
    useTable,
    usePagination,
    useColumnOrder,
    useSortBy,
    useRowSelect,
} from 'react-table'
// Icons
import { IoMdArrowDropupCircle } from 'react-icons/io'
// components
import { Typography } from 'components/Typography'
import { Pagination, PageSize } from './components'
// import { TableCheckbox } from 'components/tableCheckbox'
import { LoadingAnimation } from '@components/LoadingAnimation'
import { Card } from '@components/cards'

interface Props {
    action: Function
    Columns: any
    pagesize?: boolean
    querySort?: string
    tableTitle?: string
    pagination?: boolean
    queryFilters?: any
    setTableActions?: Function
    setTableLength?: Function
    quickActions?: Function
}
export const ReactTable = ({
    action,
    Columns,
    pagesize,
    querySort,
    tableTitle,
    pagination,
    queryFilters,
    setTableActions,
    setTableLength,
    quickActions,
}: Props) => {
    const [selectedFlatRowsData, setSelectedFlatRowsData] = useState([])
    const [resultsPerPage, setResultsPerPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const [sort, setSort] = useState(`-${querySort}`)

    // redux
    const { data, isSuccess, isLoading, refetch, isFetching, isError } = action(
        {
            skip: resultsPerPage * (currentPage - 1),
            limit: resultsPerPage,
            sort: sort,
            search: queryFilters
                ? Object.keys(queryFilters)
                      .map((key) =>
                          queryFilters[key]
                              ? `${encodeURIComponent(
                                    key
                                )}:${encodeURIComponent(queryFilters[key])}`
                              : null
                      )
                      .join(',')
                : '',
        }
    )

    const columns = useMemo(() => Columns, [Columns])
    const tableData = useMemo(() => (data ? data.data : []), [data])
    useEffect(() => {
        refetch()
    }, [refetch])

    useEffect(() => {
        setCurrentPage(1)
    }, [resultsPerPage, isFetching])

    useEffect(() => {
        setCurrentPage(1)
        setResultsPerPage(5)
    }, [queryFilters])

    useEffect(() => {
        if (setTableLength) {
            if (isSuccess && data) {
                setTableLength(data?.data?.length)
            }
        }
    }, [data, isSuccess])

    useEffect(() => {
        setTableActions &&
            setTableActions({
                pageSize: (
                    <PageSize
                        resultsPerPage={resultsPerPage}
                        setResultsPerPage={setResultsPerPage}
                    />
                ),
                pagination: (
                    <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        pageCount={data?.pagination?.totalPage}
                    />
                ),
            })
    }, [data, setTableActions, currentPage, resultsPerPage])

    const {
        page,
        prepareRow,
        headerGroups,
        getTableProps,
        getTableBodyProps,
        setPageSize,
    }:any = useTable(
        {
            columns,
            data: tableData,
            autoResetPage: false,
        },
        useSortBy,
        usePagination,
        useColumnOrder
        // useRowSelect
        // (hooks) => {
        //     hooks.visibleColumns.push((columns) => {
        //         return [
        //             {
        //                 id: 'selection',
        //                 Header: ({ getToggleAllRowsSelectedProps }: any) => (
        //                     <TableCheckbox
        //                         {...getToggleAllRowsSelectedProps()}
        //                     />
        //                 ),
        //                 Cell: ({ row }: any) => {
        //                     return (
        //                         <TableCheckbox
        //                             id={row.original.id}
        //                             value={row.original.id}
        //                             {...row.getToggleRowSelectedProps()}
        //                         />
        //                     )
        //                 },
        //             },
        //             ...columns,
        //         ]
        //     })
        // }
    )

    useEffect(() => {
        setPageSize(resultsPerPage)
    }, [resultsPerPage, setPageSize])
    return (
        <Card noPadding>
            <div className="py-4">
                {isError && '<TechnicalError />'}
                {isLoading ? (
                    <div className="z-20 w-full h-full flex justify-center items-center">
                        <LoadingAnimation />
                    </div>
                ) : !isError && data?.data?.length > 0 ? (
                    <div className="w-full">
                        {(tableTitle || pagination) && (
                            <div className="flex justify-between items-center mb-4 px-6 pb-6">
                                {tableTitle && (
                                    <Typography variant={'subtitle'}>
                                        {tableTitle}
                                    </Typography>
                                )}
                                {pagesize && (
                                    <PageSize
                                        resultsPerPage={resultsPerPage}
                                        setResultsPerPage={setResultsPerPage}
                                    />
                                )}
                                <div className="flex items-center gap-x-3">
                                    {/* quick actions button */}
                                    {/* testing */}
                                    {quickActions &&
                                        selectedFlatRowsData.length > 0 &&
                                        quickActions(selectedFlatRowsData)}

                                    {/* pagiation */}
                                    {pagination && (
                                        <Pagination
                                            currentPage={currentPage}
                                            setCurrentPage={setCurrentPage}
                                            pageCount={
                                                data?.pagination?.totalPage
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                        )}
                        <div className="w-full relative">
                            {isFetching && (
                                <div className="bg-[#ffffff90] z-20 absolute top-0 left-0 w-full h-full flex justify-center items-center">
                                    <LoadingAnimation />
                                </div>
                            )}
                            <table className="w-full">
                                <thead className="w-full" {...getTableProps()}>
                                    {headerGroups.map((headerGroup) => (
                                        <tr
                                            {...headerGroup.getHeaderGroupProps()}
                                        >
                                            {headerGroup.headers.map(
                                                (column: any) => {
                                                    return (
                                                        <th
                                                            className="group text-left text-xs py-4 px-4 font-bold text-secondary-text border-b border-gray-light"
                                                            {...column.getHeaderProps()}
                                                        >
                                                            <div className="flex justify-center items-center gap-x-1">
                                                                <span>
                                                                    {column.render(
                                                                        'Header'
                                                                    )}
                                                                </span>
                                                                {column.sort && (
                                                                    <span className="hidden group-hover:block">
                                                                        {
                                                                            <IoMdArrowDropupCircle
                                                                                className={`cursor-pointer text-base transition-all ${
                                                                                    sort.includes(
                                                                                        '-'
                                                                                    )
                                                                                        ? 'rotate-0'
                                                                                        : 'rotate-180'
                                                                                }`}
                                                                                onClick={() => {
                                                                                    if (
                                                                                        sort.includes(
                                                                                            '-'
                                                                                        )
                                                                                    ) {
                                                                                        setSort(
                                                                                            `+${querySort}`
                                                                                        )
                                                                                    } else {
                                                                                        setSort(
                                                                                            `-${querySort}`
                                                                                        )
                                                                                    }
                                                                                }}
                                                                            />
                                                                        }
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div>
                                                                {column.canFilter
                                                                    ? column.render(
                                                                          'Filter'
                                                                      )
                                                                    : null}
                                                            </div>
                                                        </th>
                                                    )
                                                }
                                            )}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody
                                    className="w-full"
                                    {...getTableBodyProps()}
                                >
                                    {page.map((row: any) => {
                                        prepareRow(row)
                                        return (
                                            <tr
                                                className="w-full bg-[#FAFAFA]"
                                                {...row.getRowProps()}
                                            >
                                                {row.cells.map((cell: any) => {
                                                    return (
                                                        <td
                                                            className={`tableRow break-all p-4 text-sm text-text border-b border-secondary-dark`}
                                                            {...cell.getCellProps()}
                                                        >
                                                            {cell.render(
                                                                'Cell'
                                                            )}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    !isError && '<EmptyData />'
                )}
            </div>
        </Card>
    )
}
