import React from 'react'

import { KpiTableHeaders } from './KpiTableHeaders'
import { KpiTableProps } from '@partials/common/kpis'
import { KpiTableBody } from './KpiTableBody'

export const KpiTable: React.FC<KpiTableProps> = ({
    table,
    className = '',
    enableRowSelection,
}) => {
    return (
        <div className=" rounded-lg bg-white">
            <div className="min-w-full inline-block align-middle">
                <div className="overflow-">
                    <table
                        className={`min-w-full divide-y divide-gray-200 ${className}`}
                    >
                        <KpiTableHeaders
                            headerGroups={table.getHeaderGroups()}
                        />
                        <KpiTableBody
                            rows={table.getRowModel().rows}
                            enableRowSelection={enableRowSelection}
                        />
                    </table>
                </div>
            </div>
        </div>
    )
}
