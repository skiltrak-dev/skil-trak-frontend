import {
    AuthorizedUserComponent,
    HideRestrictedData,
    Typography,
} from '@components'
import { UserRoles } from '@constants'
import Modal from '@modals/Modal'
import {
    VerifiedEmailHistory,
    VerifyUserEmail,
} from '@partials/common/components'
import { Industry } from '@types'
import { useRouter } from 'next/router'
import {
    IndustryInsuranceDoc,
    IndustryLocations,
    IndustrySupervisor,
} from '../components'
import {
    IndustryContactPerson,
    IndustryDetail,
    IndustryJobHiring,
    IndustryProfileAvatar,
    IndustryStatus,
    IndustryWpType,
    MakeIndustryPartner,
    ProfileLinks,
    SectorBaseCapacityModal,
    SnoozeIndustrySwitch,
} from './components'
import { IndustryRequestsActions } from '@partials/sub-admin/ManagerApprovalList/enum'

export const IndustryProfileCB = ({
    isHod,
    industry,
}: {
    isHod?: boolean
    industry: Industry
}) => {
    const router = useRouter()
    const id = router.query.id

    const isEmailVerified = industry?.user?.isEmailVerified

    return (
        <div>
            <div className="flex justify-between items-start">
                <div>
                    <IndustryProfileAvatar
                        avatar={industry?.user?.avatar as string}
                    />
                </div>
                <div className="flex flex-col gap-y-2">
                    <AuthorizedUserComponent
                        roles={[UserRoles.SUBADMIN, UserRoles.ADMIN]}
                    >
                        <ProfileLinks isHod={isHod} industry={industry} />
                    </AuthorizedUserComponent>
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
                    {industry?.favoriteBy ? (
                        <div className="flex flex-col gap-y-0">
                            <Typography variant="xxs" color="text-[#6B7280]">
                                Favourite By
                            </Typography>
                            <Typography medium capitalize variant="label">
                                {industry?.favoriteBy?.user?.name}
                            </Typography>
                        </div>
                    ) : null}
                </div>
            </div>

            {/*  */}
            <div className="flex justify-between items-center gap-x-3">
                <div className="mt-2">
                    <div className="flex items-center gap-x-2">
                        <Typography semibold>
                            <span className="text-[15px]">
                                {industry?.user?.name}
                            </span>
                        </Typography>
                        <VerifyUserEmail
                            isEmailVerified={isEmailVerified}
                            userId={industry?.user?.id}
                            userName={industry?.user?.name}
                        />
                        <VerifiedEmailHistory
                            userId={industry?.user?.id}
                            isEmailVerified={isEmailVerified}
                        />
                    </div>
                    <AuthorizedUserComponent roles={[UserRoles.ADMIN]}>
                        <HideRestrictedData type={UserRoles.INDUSTRY}>
                            <Typography variant="xs" color="text-[#6B7280]">
                                {industry?.isSnoozed
                                    ? '---'
                                    : industry?.user?.email}
                            </Typography>
                        </HideRestrictedData>
                    </AuthorizedUserComponent>
                </div>
            </div>

            {/*  */}
            <div className="flex items-center justify-between border-b border-secondary-dark">
                <AuthorizedUserComponent roles={[UserRoles.ADMIN]}>
                    <IndustryStatus industry={industry} />
                </AuthorizedUserComponent>
                <AuthorizedUserComponent
                    roles={[UserRoles.SUBADMIN, UserRoles.ADMIN]}
                >
                    {industry?.isPartner && (
                        <div>
                            <Modal>
                                <Modal.Open opens="viewCapacity">
                                    <div className="cursor-pointer text-[11px] py-2 px-1 text-info hover:bg-gray-200">
                                        Capacity
                                    </div>
                                </Modal.Open>
                                <Modal.Window name="viewCapacity">
                                    <SectorBaseCapacityModal
                                        id={id}
                                        prevIndCapacity={
                                            industry?.studentCapacity
                                        }
                                        industry={industry}
                                    />
                                </Modal.Window>
                            </Modal>
                        </div>
                    )}
                </AuthorizedUserComponent>
            </div>

            <div className="flex justify-between items-center gap-x-3 mt-2">
                <IndustryWpType industryUserId={industry?.user?.id} />
            </div>

            <SnoozeIndustrySwitch
                industry={industry}
                partnerRemovalRequests={industry?.partnerRemovalRequests?.find(
                    (r) => r?.action === IndustryRequestsActions.Snoozed
                )}
            />
            <MakeIndustryPartner
                industryId={industry?.id}
                isPartner={industry?.isPartner}
                PartneredBy={industry?.PartneredBy}
                partnerRemovalRequests={industry?.partnerRemovalRequests?.find(
                    (r) => r?.action === IndustryRequestsActions.Partner
                )}
            />
            {/*  */}
            <IndustryJobHiring
                industryUserId={industry?.user?.id}
                isHiringIndustry={industry?.isHiring}
            />

            {/*  */}
            <IndustryDetail industry={industry} />
            <IndustryContactPerson industry={industry} />

            <IndustryInsuranceDoc industry={industry} />
            {/* Add Supervisor  */}
            <IndustrySupervisor industry={industry} />
            <IndustryLocations industry={industry} />

            {/*  */}
            {/* <IndustrySectors courses={industry?.courses} /> */}
        </div>
    )
}
