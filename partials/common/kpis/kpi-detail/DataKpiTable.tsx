import { LoadingAnimation, NoData, Pagination, Typography } from '@components'
import {
    ColumnDef,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import React from 'react'
import { IconType } from 'react-icons'
import { KpiTable } from './KpiTable'

interface DataKpiTableProps<Type> {
    data: any
    columns: ColumnDef<Type>[]
    title: string
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
}: DataKpiTableProps<Type>) => {
    const table = useReactTable({
        columns,
        data: data?.data?.data,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center  gap-2 mb-4">
                    <div className="p-2 border border-[#1436B033] rounded-lg">
                        <span
                            className={` text-base`}
                            style={{ color: colors }}
                        >
                            <Icon />
                        </span>
                    </div>
                    <Typography semibold>{title}</Typography>
                    {/* <span className="text-sm text-gray-500 whitespace-nowrap">
                Doubing - 00
              </span> */}
                </div>
                {setPage && data?.data?.pagination && (
                    <Pagination
                        table={table}
                        pagination={data?.data?.pagination}
                        setPage={setPage}
                    />
                )}
            </div>

            {data?.isError ? <NoData text="Technical Error" /> : null}
            {data?.isLoading || data?.isFetching ? (
                <LoadingAnimation />
            ) : data?.data && data?.data?.data?.length && data?.isSuccess ? (
                <KpiTable table={table as any} />
            ) : data?.isSuccess ? (
                <NoData text="No Data Found" />
            ) : null}
        </div>
    )
}
