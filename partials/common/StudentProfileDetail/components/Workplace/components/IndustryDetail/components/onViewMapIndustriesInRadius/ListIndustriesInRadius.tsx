import {
    LoadingAnimation,
    NoData,
    PageSize,
    Pagination,
    Typography,
} from '@components'
import { CommonApi, SubAdminApi } from '@queries'
import { MapPin } from 'lucide-react'
import { GiPathDistance } from 'react-icons/gi'
import { DistanceIndicator } from './industriesListCards/DistanceIndicator'
import { StatsCards } from './StatsCards'
import { FaHandshakeSimple, FaHandshakeSimpleSlash } from 'react-icons/fa6'
import { MdNoAccounts } from 'react-icons/md'
import { IndustryInRadiusListCard } from './industriesListCards/IndustryInRadiusListCard'
import { FutureIndustryInRadiusListCard } from './industriesListCards'
import { useState } from 'react'
import {
    IndustriesInRadiusTabsNav,
    TabProps,
} from './industriesInRadiusTabsNav'
import {
    FutureIndustriesInRadiusTab,
    SignedUpIndustriesInRadiusTab,
} from './industryListingTabs'

export const ListIndustriesInRadius = ({
    workplaceId,
    courseId,
    setSelectedBox,
}: any) => {
    const counts = SubAdminApi.Workplace.useMapIndustriesInRadiusCount(
        { id: courseId, wpId: workplaceId },
        { skip: !courseId && !workplaceId }
    )

    const tabs: TabProps[] = [
        {
            label: 'Signed Up',
            element: (
                <SignedUpIndustriesInRadiusTab
                    workplaceId={workplaceId}
                    courseId={courseId}
                    setSelectedBox={setSelectedBox}
                />
            ),
        },
        {
            label: 'Future/Listing',
            element: (
                <FutureIndustriesInRadiusTab
                    workplaceId={workplaceId}
                    courseId={courseId}
                    setSelectedBox={setSelectedBox}
                />
            ),
        },
    ]
    return (
        <div className="space-y-2">
            {/* <StatsCards counts={counts} /> */}

            <IndustriesInRadiusTabsNav tabs={tabs} />
        </div>
    )
}
