import { ReactElement, useEffect, useState } from 'react'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { MatchingProfilesList } from '@partials/industry/talentPool'
import { Typography } from '@components'
// components

const MatchingProfiles: NextPageWithLayout = () => {
    return (
        <div>
            <div className="py-5 px-20">
                <Typography variant={'label'} color="text-primaryNew" center>
                    With our Talent Pool function, you can easily find
                    outstanding talent. Industries can look through the profiles
                    of eligible students and match their abilities with open
                    positions. All in one location, request documents, set up
                    appointments, and smoothly manage your employment process.
                    Begin assembling your team now with impact-ready, qualified
                    professionals.
                </Typography>
            </div>
            <MatchingProfilesList />
        </div>
    )
}

MatchingProfiles.getLayout = (page: ReactElement) => {
    return <IndustryLayout>{page}</IndustryLayout>
}

export default MatchingProfiles
