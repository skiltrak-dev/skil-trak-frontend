import { ReactElement, useEffect, useState } from 'react'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { MatchingProfilesList } from '@partials/industry/talentPool'
// components

const MatchingProfiles: NextPageWithLayout = () => {
    return (
        <div>
            <MatchingProfilesList />
        </div>
    )
}

MatchingProfiles.getLayout = (page: ReactElement) => {
    return <IndustryLayout>{page}</IndustryLayout>
}

export default MatchingProfiles
