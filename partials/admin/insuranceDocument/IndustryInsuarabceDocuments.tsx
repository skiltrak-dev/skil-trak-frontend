import { Typography } from '@components'
import React from 'react'
import { CiFilter } from 'react-icons/ci'
import { IndustryDocumentCard } from './cards'

export const IndustryInsuarabceDocuments = () => {
    return (
        <div className="px-3.5 py-3 rounded-[5px] bg-[#6971DD14]">
            <div className="flex justify-between items-center">
                <Typography variant="small" bold>
                    Industry
                </Typography>
                <CiFilter size={20} />
            </div>

            {/*  */}
            <div className="flex flex-col gap-y-2.5 mt-2.5">
                {[...Array(5)].map((_, i) => (
                    <IndustryDocumentCard key={i} />
                ))}
            </div>
        </div>
    )
}
