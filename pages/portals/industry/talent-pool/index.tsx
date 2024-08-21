import { ReactElement, useEffect, useState } from 'react'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { MatchingProfilesList } from '@partials/industry/talentPool'
import { Typography } from '@components'
import { FaTimes } from 'react-icons/fa'
// components

const MatchingProfiles: NextPageWithLayout = () => {
    const [showInfo, setShowInfo] = useState(true)
    return (
        <div>
            {showInfo ? (
                <div className="relative py-2 pl-10 pr-20 mb-3 rounded-md bg-[#95C6FB26] border border-[#6B728050]">
                    <Typography
                        variant={'small'}
                        color="text-primaryNew"
                        center
                        block
                        medium
                    >
                        With our Talent Pool function, you can easily find
                        outstanding talent. Industries can look through the
                        profiles of eligible students and match their abilities
                        with open positions. All in one location, request
                        documents, set up appointments, and smoothly manage your
                        employment process. Begin assembling your team now with
                        impact-ready, qualified professionals.
                    </Typography>
                    <div className="absolute top-2 right-2">
                        <FaTimes
                            onClick={() => {
                                setShowInfo(false)
                            }}
                            className="cursor-pointer"
                        />
                    </div>
                </div>
            ) : null}
            <MatchingProfilesList />
        </div>
    )
}

MatchingProfiles.getLayout = (page: ReactElement) => {
    return <IndustryLayout>{page}</IndustryLayout>
}

export default MatchingProfiles
