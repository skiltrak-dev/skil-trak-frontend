import { Table } from '@tanstack/react-table'

interface PageSizeProps {
    table: Table<any>
    itemPerPage?: 5 | 10 | 20 | 30 | 40 | 50 | number
    setItemPerPage?: Function
}

export const PageSize = ({
    table,
    itemPerPage,
    setItemPerPage,
}: PageSizeProps) => {
    return (
        <div>
            <div className="text-sm font-medium flex items-center gap-x-2">
                <span className="">Show:</span>
                <span>
                    <select
                        value={
                            itemPerPage
                                ? itemPerPage
                                : table.getState().pagination.pageSize
                        }
                        onChange={(e) => {
                            table.setPageSize(Number(e.target.value))
                            if (setItemPerPage) setItemPerPage(e.target.value)
                        }}
                        className="outline-none border rounded px-1 py-0.5"
                    >
                        {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                            <option
                                key={pageSize}
                                value={pageSize}
                                {...(itemPerPage === pageSize
                                    ? { selected: true }
                                    : {})}
                            >
                                {pageSize}
                            </option>
                        ))}
                    </select>
                </span>
            </div>
        </div>
    )
}
