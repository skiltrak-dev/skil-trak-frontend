import React from 'react'
import { Typography } from '@components'
import { RtoDetailInfoBox } from './RtoDetailInfoBox'

export const CBRtoListingDetail = ({ rto }: any) => {
    return (
        <div className="mt-4 flex flex-col gap-y-2">
            <div className="mb-1">
                <Typography variant="label">RTO details</Typography>
            </div>
            <div className="flex items-center flex-wrap gap-y-2 gap-x-2 w-full">
                {/* <RtoDetailInfoBox title={'ABN'} data={rto?.abn} /> */}
                <RtoDetailInfoBox title={'RTO Code'} data={rto?.rtoCode} />
                <RtoDetailInfoBox
                    title={'Created At'}
                    data={rto?.createdAt?.slice(0, 10) ?? 'NA'}
                />
            </div>
            <RtoDetailInfoBox title={'Phone Number'} data={rto?.phone} />
            <RtoDetailInfoBox title={'Address'} data={rto?.address} />
            {/* Line */}
            <div className="border-b w-full h-[1px] my-2"></div>

            {/* Contact Person */}
            <div className="mb-1">
                <Typography variant="label">Contact Person</Typography>
            </div>
            <div className="flex items-center gap-x-2">
                <RtoDetailInfoBox title={'Name'} data={rto?.contactPerson} />
                {/* <RtoDetailInfoBox
                    title={'Phone'}
                    data={rto?.contactPersonPhone}
                /> */}
            </div>
        </div>
    )
}
