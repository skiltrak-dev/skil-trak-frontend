import { IndustryProfileAvatar } from '@partials/common/IndustryProfileDetail'
import React from 'react'
import { Typography } from '@components'
import { CBListingIndustryDetail, CBSectorInfoBox } from '@partials/common'
import { CBRtoListingDetail } from '../cbRtoListing'

export const CBRtoListingProfile = ({ rto }: any) => {
    console.log('rto:::::', rto)
    return (
        <div>
            <div className="border-b pb-4">
                <IndustryProfileAvatar />
                <div className="flex flex-col gap-y-1 mt-2">
                    <Typography variant="label" semibold>
                        {rto?.businessName ?? 'NA'}
                    </Typography>
                    <Typography variant="muted" color="text-gray-400">
                        {rto?.email ?? 'N/A'}
                    </Typography>
                </div>
            </div>
            {/* Industry Details */}
            <CBRtoListingDetail rto={rto} />

            {/* Eligible Sector */}
            <div className="mt-4">
                <Typography variant="label" semibold>
                    Eligible Sector
                </Typography>
                <div className="mt-2 flex flex-col gap-y-2">
                    {rto?.sector?.map((sector: any) => (
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
