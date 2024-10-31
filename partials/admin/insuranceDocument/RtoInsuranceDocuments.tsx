import { Typography } from '@components'
import React from 'react'
import { CiFilter } from 'react-icons/ci'
import { RtoDocumentCard } from './cards'

export const RtoInsuranceDocuments = () => {
    return (
        <div className="px-3.5 py-3 rounded-[5px] bg-[#24556D0F]">
            <div className="flex justify-between items-center">
                <Typography variant="small" bold>
                    RTO
                </Typography>
                <CiFilter size={20} />
            </div>

            {/*  */}
            <div className="flex flex-col gap-y-2.5 mt-2.5">
                {[...Array(3)].map((_, i) => (
                    <RtoDocumentCard key={i} />
                ))}
            </div>
        </div>
    )
}
