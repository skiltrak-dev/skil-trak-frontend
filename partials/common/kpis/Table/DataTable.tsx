import {
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { TableProps } from '../types'
import { TableContent, TableHeader, TablePagination } from './index'

export const DataTable = <T,>({ data, columns, children }: TableProps<T>) => {
    const [sorting, setSorting] = useState<SortingState>([])

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return children({
        header: (
            title: string,
            titleIcon: React.ReactNode,
            showSearch: boolean,
            searchPlaceholder: string,
            handleSearch: (query: string) => void,
            searchQuery: string
        ) => (
            <TableHeader
                title={title}
                titleIcon={titleIcon}
                showSearch={showSearch}
                searchPlaceholder={searchPlaceholder}
                onSearch={handleSearch}
                searchQuery={searchQuery}
            />
        ),
        pagination: (
            pagination: any,
            setPage: (page: number) => void,
            handleItemsPerPageChange: (newItemsPerPage: number) => void,
            itemsPerPageOptions: number[] = [5, 10, 20]
        ) => (
            <TablePagination
                currentPage={pagination?.currentPage}
                totalPages={pagination?.totalPage}
                itemsPerPage={pagination?.itemPerPage}
                itemsPerPageOptions={itemsPerPageOptions}
                onPageChange={setPage}
                onItemsPerPageChange={handleItemsPerPageChange}
            />
        ),
        table: <TableContent table={table} />,
    })

    // return (
    //     <div className="pt-6 pl-9 rounded-lg bg-white font-inter">
    //         <div className="pr-9">
    //             <TableHeader
    //                 title={title}
    //                 titleIcon={titleIcon}
    //                 showSearch={showSearch}
    //                 searchPlaceholder={searchPlaceholder}
    //                 onSearch={handleSearch}
    //             />

    //             <TablePagination
    //                 currentPage={pagination?.currentPage}
    //                 totalPages={pagination?.totalPage}
    //                 itemsPerPage={pagination?.itemPerPage}
    //                 itemsPerPageOptions={itemsPerPageOptions}
    //                 onPageChange={setPage}
    //                 onItemsPerPageChange={handleItemsPerPageChange}
    //             />
    //         </div>

    //         <TableContent table={table} />
    //     </div>
    // )
}
