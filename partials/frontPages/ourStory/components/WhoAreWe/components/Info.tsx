import { Typography } from '@components'
import React from 'react'

export const Info = () => {
    return (
        <div className="h-72 pl-28 ">
            <h1 className="text-3xl font-bold mb-2.5">
                {/* {items[activeIndex]?.title} */}
                Who are we
            </h1>
            <Typography variant={'body'} color="text-[#25566B]">
                {/* {items[activeIndex]?.description} */}
                SkilTrak is your premier destination for tailored employment and
                placement services in Australia. At SkilTrak, we specialise in
                providing employment in top-notch industries to individual
                candidates as well as students affiliated with our partnered
                Registered Training Organisations{' '}
                <strong className="text-primaryNew">(RTOs)</strong>.
            </Typography>
            <div className="mt-5">
                <Typography variant={'body'} color="text-[#25566B]">
                    {/* {items[activeIndex]?.description} */}
                    With a steadfast commitment to aligning your aspirations
                    with industry demands, we offer an extensive array of
                    sectors spanning various fields of interest. Our recent
                    successes have seen a surge in employment and placements in
                    sectors such as
                </Typography>
            </div>
        </div>
    )
}
