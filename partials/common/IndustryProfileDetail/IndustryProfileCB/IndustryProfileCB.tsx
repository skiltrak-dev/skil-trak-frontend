import { Industry } from '@types'
import React from 'react'
import {
    AddIndustryAnswers,
    IndustryContactPerson,
    IndustryDetail,
    IndustryJobHiring,
    IndustryPartner,
    IndustryProfileAvatar,
    IndustrySectors,
    IndustryStatus,
    MakeIndustryPartner,
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
            <div className="flex justify-between items-center gap-x-3">
                <div className="mt-2">
                    <Typography semibold>
                        <span className="text-[15px]">
                            {' '}
                            {industry?.user?.name}
                        </span>
                    </Typography>
                    <Typography variant="xs" color="text-[#6B7280]">
                        {industry?.isSnoozed ? '---' : industry?.user?.email}
                    </Typography>
                </div>
                {industry?.createdBy ? (
                    <div className="flex flex-col gap-y-0">
                        <Typography variant="xxs" color="text-[#6B7280]">
                            Created By
                        </Typography>
                        <Typography medium capitalize variant="label">
                            {industry?.createdBy?.name}
                        </Typography>
                    </div>
                ) : null}
            </div>

            {/*  */}
            {industry?.approvalReviewQuestionCount &&
            industry?.approvalReviewQuestionCount > 0 ? (
                <ViewIndustryAnswers industryId={industry?.id} />
            ) : (
                <AddIndustryAnswers industry={industry} />
            )}

            {/*  */}
            <AuthorizedUserComponent roles={[UserRoles.ADMIN]}>
                <IndustryStatus industry={industry} />
            </AuthorizedUserComponent>

            <MakeIndustryPartner
                industryId={industry?.id}
                isPartner={industry?.isPartner}
                PartneredBy={industry?.PartneredBy}
            />

            {/*  */}
            <IndustryJobHiring
                industryUserId={industry?.user?.id}
                isHiringIndustry={industry?.isHiring}
            />

            {/*  */}
            <IndustryDetail industry={industry} />
            <IndustryContactPerson industry={industry} />

            {/*  */}
            <IndustrySectors courses={industry?.courses} />
        </div>
    )
}
