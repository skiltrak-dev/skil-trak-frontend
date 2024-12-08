import { IndustryProfileAvatar } from '@partials/common/IndustryProfileDetail'
import React from 'react'
import { CBSectorInfoBox } from './components/CBSectorInfoBox'
import { Typography } from '@components'
import { CBListingIndustryDetail } from './components'

export const CBListingProfile = ({ industry }: any) => {
    return (
        <div>
            <div className="border-b pb-4">
                <IndustryProfileAvatar />
                <div className="flex flex-col gap-y-1 mt-2">
                    <Typography variant="label" semibold>
                        {industry?.businessName ?? 'NA'}
                    </Typography>
                    <Typography variant="muted" color="text-gray-400">
                        {industry?.email ?? 'N/A'}
                    </Typography>
                </div>
            </div>
            {/* Industry Details */}
            <CBListingIndustryDetail industry={industry} />

            {/* Eligible Sector */}
            <div className="mt-4">
                <Typography variant="label" semibold>
                    Eligible Sector
                </Typography>
                <div className="mt-2 flex flex-col gap-y-2">
                    {industry?.sector?.map((sector: any) => (
                        <CBSectorInfoBox
                            code={sector?.code}
                            name={sector?.name}
                            key={sector?.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
