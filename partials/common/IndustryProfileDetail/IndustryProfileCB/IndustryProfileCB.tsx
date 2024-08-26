import {
    AuthorizedUserComponent,
    HideRestrictedData,
    Typography,
} from '@components'
import { UserRoles } from '@constants'
import { Industry } from '@types'
import { ReactNode, useState } from 'react'
import { ViewProfileVisitorsModal } from '../modal'
import {
    AddIndustryAnswers,
    IndustryContactPerson,
    IndustryDetail,
    IndustryJobHiring,
    IndustryProfileAvatar,
    IndustrySectors,
    IndustryStatus,
    MakeIndustryPartner,
    ProfileLinks,
    SnoozeIndustrySwitch,
    ViewIndustryAnswers,
} from './components'

export const IndustryProfileCB = ({ industry }: { industry: Industry }) => {
    const [modal, setModal] = useState<ReactNode | null>(null)

    const onCancelModal = () => setModal(null)

    const onViewProfileVisitorsClicked = () => {
        setModal(
            <ViewProfileVisitorsModal
                onCancel={onCancelModal}
                industryUserId={industry?.user.id}
            />
        )
    }
    return (
        <div>
            {modal}
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
                            {industry?.user?.name}
                        </span>
                    </Typography>
                    <HideRestrictedData type={UserRoles.INDUSTRY}>
                        <Typography variant="xs" color="text-[#6B7280]">
                            {industry?.isSnoozed
                                ? '---'
                                : industry?.user?.email}
                        </Typography>
                    </HideRestrictedData>
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
            <div className="flex items-center justify-between">
                {industry?.approvalReviewQuestionCount &&
                industry?.approvalReviewQuestionCount > 0 ? (
                    <ViewIndustryAnswers industryId={industry?.id} />
                ) : (
                    <AddIndustryAnswers industry={industry} />
                )}
                <div
                    onClick={onViewProfileVisitorsClicked}
                    className="cursor-pointer text-[11px] py-2 px-1 text-info hover:bg-gray-200"
                >
                    View Visitors
                </div>
            </div>

            {/*  */}
            <AuthorizedUserComponent roles={[UserRoles.ADMIN]}>
                <IndustryStatus industry={industry} />
            </AuthorizedUserComponent>

            <SnoozeIndustrySwitch
                industry={industry}
                industryId={industry?.id}
            />
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
