import { ReactElement, useEffect, useState } from 'react'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
// components
import { TalentPoolWelcomeCard } from '@partials/industry/talentPool'
import Link from 'next/link'
const TalentPool: NextPageWithLayout = () => {
    return (
        <div>
            <TalentPoolWelcomeCard />
            <div className="bg-[#282F39] py-3 flex justify-center">
                <Link
                    href={'/portals/industry/talent-pool/matching-profiles'}
                    className="py-1.5 px-4 bg-[#F7910F] text-white text-sm font-medium rounded-md"
                >
                    Proceed
                </Link>
            </div>
        </div>
    )
}

TalentPool.getLayout = (page: ReactElement) => {
    return <IndustryLayout>{page}</IndustryLayout>
}

export default TalentPool
