import { Industry } from '@types'
import React from 'react'
import {
    IndustryContactPerson,
    IndustryDetail,
    IndustryJobHiring,
    IndustryPartner,
    IndustryProfileAvatar,
    IndustrySectors,
    IndustryStatus,
    ProfileLinks,
    ViewIndustryAnswers,
} from './components'
import { AuthorizedUserComponent, Typography } from '@components'
import { UserRoles } from '@constants'

export const IndustryProfileCB = ({ industry }: { industry: Industry }) => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <div>
                    <IndustryProfileAvatar
                        avatar={industry?.user?.avatar as string}
                    />
                </div>
                <ProfileLinks industry={industry} />
            </div>

            {/*  */}
            <div className="mt-2">
                <Typography semibold>
                    <span className="text-[15px]"> {industry?.user?.name}</span>
                </Typography>
                <Typography variant="xs" color="text-[#6B7280]">
                    {industry?.user?.email}
                </Typography>
            </div>

            {/*  */}
            <ViewIndustryAnswers industryId={industry?.id} />

            {/*  */}
            <IndustryJobHiring
                industryUserId={industry?.user?.id}
                isHiringIndustry={industry?.isHiring}
            />

            {/*  */}
            <IndustryDetail industry={industry} />
            <IndustryContactPerson industry={industry} />
            <IndustryPartner industry={industry} />

            {/*  */}
            <AuthorizedUserComponent roles={[UserRoles.ADMIN]}>
                <IndustryStatus industry={industry} />
            </AuthorizedUserComponent>

            {/*  */}
            <IndustrySectors courses={industry?.courses} />
        </div>
    )
}
