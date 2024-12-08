import React from 'react'
import { IndustryDetailInfoBox } from './IndustryDetailInfoBox'
import { Typography } from '@components'

export const CBListingIndustryDetail = ({ industry }: any) => {
    return (
        <div className="mt-4 flex flex-col gap-y-2">
            <div className="mb-1">
                <Typography variant="label">Industry details</Typography>
            </div>
            <div className="flex items-center gap-x-2 w-full">
                <IndustryDetailInfoBox title={'ABN'} data={'7593479'} />
                <IndustryDetailInfoBox
                    title={'Created At'}
                    data={industry?.createdAt?.slice(0, 10) ?? 'NA'}
                />
            </div>
            <IndustryDetailInfoBox
                title={'Phone Number'}
                data={industry?.phone}
            />
            <IndustryDetailInfoBox title={'Address'} data={industry?.address} />
            {/* Line */}
            <div className="border-b w-full h-[1px] my-2"></div>

            {/* Contact Person */}
            <div className="mb-1">
                <Typography variant="label">Contact Person</Typography>
            </div>
            <div className="flex items-center gap-x-2">
                <IndustryDetailInfoBox
                    title={'Name'}
                    data={industry?.contactPerson}
                />
                <IndustryDetailInfoBox
                    title={'Phone'}
                    data={industry?.contactPersonPhone}
                />
            </div>
        </div>
    )
}
