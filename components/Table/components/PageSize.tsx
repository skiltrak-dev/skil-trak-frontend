import { Table } from '@tanstack/react-table'

export const PageSize = ({ table }: { table: Table<any> }) => {
    return (
        <div>
            <div className="text-sm font-medium flex items-center gap-x-2">
                <span className="">Show:</span>
                <span>
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => {
                            table.setPageSize(Number(e.target.value))
                        }}
                        className="outline-none border rounded px-1 py-0.5"
                    >
                        {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>
                </span>
            </div>
        </div>
    )
}
