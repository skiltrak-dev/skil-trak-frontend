import { Table } from '@tanstack/react-table'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface PageSizeProps {
    table?: Table<any>
    itemPerPage?: 1 | 5 | 10 | 20 | 30 | 40 | 50 | 100 | number
    setItemPerPage?: Function
    records?: number
}

export const PageSize = ({
    table,
    itemPerPage,
    setItemPerPage,
    records,
}: PageSizeProps) => {
    const router = useRouter()
    const [defaultValue, setDefaultValue] = useState(50)

    useEffect(() => {
        setDefaultValue(
            Number(
                itemPerPage
                    ? itemPerPage
                    : table?.getState().pagination.pageSize
            )
        )
    }, [itemPerPage, table])

    return (
        <div className="flex items-center gap-x-4">
            <div className="text-sm font-medium flex items-center gap-x-2">
                <span className="">Show:</span>
                <span>
                    <select
                        //   value={
                        //      itemPerPage
                        //         ? itemPerPage
                        //         : table.getState().pagination.pageSize
                        //   }
                        value={defaultValue}
                        defaultValue={defaultValue}
                        onChange={(e) => {
                            // const tabs = Object.entries(router.query)
                            const tabs = Object.entries({
                                ...router.query,
                                pageSize: e.target.value,
                            })
                                .map(([key, value]) => `${key}=${value}`)
                                .join('&')
                            router.push(`${router?.pathname}?${tabs}`)
                            // tabs &&
                            //     tabs?.length > 0 &&
                            //     router.push(
                            //         `${router?.pathname}?${tabs[0][0]}=${tabs[0][1]}&page=1&pageSize=${e.target.value}`
                            //     )
                            setDefaultValue(Number(e.target.value))
                            table?.setPageSize(Number(e.target.value))
                            if (setItemPerPage) setItemPerPage(e.target.value)
                        }}
                        className="outline-none border  rounded px-1 py-0.5"
                    >
                        {[5, 10, 20, 30, 40, 50, 100].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>
                </span>
            </div>
            {records && (
                <div className="text-xs flex items-center gap-x-2 text-gray-400">
                    {records} Records
                </div>
            )}
        </div>
    )
}
