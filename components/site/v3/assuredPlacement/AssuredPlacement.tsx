import React from 'react'
import { AssuredPlacementTitle } from './AssuredPlacementTitle'
import Image from 'next/image'
import { AssuredPlacementJourney } from './AssuredPlacementJourney'
import { FloatingLogos } from './FloatingLogos'
import { AustraliaMap } from './AustraliaMap'

export const AssuredPlacement = () => {
    return (
        <div>
            <div
                className="w-full object-cover bg-no-repeat"
                // className="h-[400px] w-full bg-cover bg-center bg-no-repeat flex items-center"
                style={{
                    backgroundImage:
                        'url(/images/site/home-page-v3/assured-placement/assured-placement-img.png)',
                }}
            >
                <div className="w-full">
                    <AssuredPlacementTitle />

                    <AssuredPlacementJourney />
                    <div className="flex flex-col md:flex-row justify-center md:justify-normal items-center md:max-w-7xl md:mx-auto gap-6 ">
                        <div className="">
                            <AustraliaMap />
                        </div>
                        <div className="md:w-1/2 w-full">
                            <FloatingLogos />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
