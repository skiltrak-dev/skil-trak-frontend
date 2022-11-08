import React from 'react'

import { Typography } from 'components/Typography'

interface Props {
    resultsPerPage: number
    setResultsPerPage: Function
}

export const PageSize = ({ resultsPerPage, setResultsPerPage }: Props) => {
    return (
        <div className="flex items-center gap-x-1">
            <Typography>Show : </Typography>
            <select
                className="w-12 h-6 border border-gray-light rounded-md text-xs outline-none"
                style={{ display: 'inline-block' }}
                value={resultsPerPage}
                onChange={(e) => setResultsPerPage(e.target.value)}
            >
                {[5, 10, 25].map((pagesize, i) => (
                    <option key={i} value={pagesize}>
                        {pagesize}
                    </option>
                ))}
            </select>
        </div>
    )
}
