import {
    AuthorizedUserComponent,
    ShowErrorNotifications,
    Typography,
    useAuthorizedUserComponent,
    useIsRestricted,
    useRestrictedData,
} from '@components'
import { UserRoles } from '@constants'
import { useNotification, useSubadminProfile } from '@hooks'
import { UserProfileDetailCard } from '@partials/common/Cards'
import { LatestCallAnswer } from '@partials/common/StudentProfileDetail/ContextBarComponents/StudentDetail/LatestCallAnswer'
import { IndustryCallLogModal } from '@partials/sub-admin/Industries'
import { SubAdminApi } from '@queries'
import { Industry } from '@types'
import { getUserCredentials, maskText } from '@utils'
import moment from 'moment'
import { ReactElement, useState } from 'react'

export const IndustryDetail = ({ industry }: { industry: Industry }) => {
    const { notification } = useNotification()
    const [modal, setModal] = useState<ReactElement | null>(null)

    const canAssessData = useIsRestricted(UserRoles.INDUSTRY)

    const [callLog, callLogResult] = SubAdminApi.Industry.useIndustryCallLog()

    const onCancelClicked = () => setModal(null)

    const onViewCallLogs = () => {
        setModal(
            <IndustryCallLogModal
                industryId={industry?.id}
                onCancel={onCancelClicked}
            />
        )
    }
    const role = getUserCredentials()?.role
    const checkRto = role === UserRoles.RTO

    const subadmin = useSubadminProfile()
    const isPermission = useAuthorizedUserComponent({
        isHod: subadmin?.departmentMember?.isHod,
        roles: [UserRoles.ADMIN, UserRoles.INDUSTRY, UserRoles.RTO],
    })
    return (
        <div className="py-3.5 border-b border-secondary-dark flex flex-col gap-y-0.5">
            {modal}
            <ShowErrorNotifications result={callLogResult} />
            <Typography variant="small" medium>
                Industry Details
            </Typography>

            {/*  */}
            <div className="mt-1.5 flex flex-col gap-y-1.5">
                <div className="flex items-center gap-x-[5px]">
                    <UserProfileDetailCard
                        title="ABN"
                        detail={useRestrictedData(
                            industry?.abn,
                            UserRoles.INDUSTRY
                        )}
                        onClick={() => {
                            if (canAssessData) {
                                navigator.clipboard.writeText(industry?.abn)
                                notification.success({
                                    title: 'Copied',
                                    description: 'ABN Copied',
                                })
                            }
                        }}
                    />
                    <AuthorizedUserComponent excludeRoles={[UserRoles.RTO]}>
                        <UserProfileDetailCard
                            title="Created At"
                            detail={moment(industry?.createdAt).format(
                                'MMM, DD YYYY hh:mm A'
                            )}
                        />
                    </AuthorizedUserComponent>
                </div>
                <div className="border border-[#6B728050] rounded-md">
                    <UserProfileDetailCard
                        border={false}
                        title="Phone Number"
                        detail={useRestrictedData(
                            industry?.isSnoozed
                                ? '---'
                                : industry?.phoneNumber
                                ? maskText(industry?.phoneNumber)
                                : 'Number block for 24 hours',
                            UserRoles.INDUSTRY
                        )}
                        onClick={() => {
                            if (canAssessData) {
                                if (
                                    !industry?.isSnoozed &&
                                    industry?.phoneNumber
                                ) {
                                    navigator.clipboard.writeText(
                                        industry?.phoneNumber
                                    )
                                    callLog({
                                        industry: industry?.id,
                                        receiver: UserRoles.INDUSTRY,
                                    }).then((res: any) => {
                                        if (res?.data) {
                                            notification.success({
                                                title: 'Called Industry',
                                                description: `Called Industry with Name: ${industry?.user?.name}`,
                                            })
                                        }
                                    })
                                    notification.success({
                                        title: 'Copied',
                                        description: 'Phone Number Copied',
                                    })
                                }
                            }
                        }}
                    >
                        <AuthorizedUserComponent
                            roles={[UserRoles.ADMIN, UserRoles.SUBADMIN]}
                            isAssociatedWithRto={false}
                        >
                            <div
                                className="bg-primaryNew py-1.5 px-2.5 rounded"
                                onClick={(e) => {
                                    onViewCallLogs()
                                    e.stopPropagation()
                                }}
                            >
                                <Typography
                                    variant="xs"
                                    color="text-white"
                                    bold
                                    underline
                                >
                                    Call Log
                                </Typography>
                            </div>
                        </AuthorizedUserComponent>
                    </UserProfileDetailCard>
                    <AuthorizedUserComponent
                        roles={[UserRoles.ADMIN, UserRoles.SUBADMIN]}
                        isAssociatedWithRto={false}
                    >
                        {industry?.callLog?.[0] &&
                        industry?.callLog?.[0]?.isAnswered === null ? (
                            <div className="px-2.5 pb-2 flex justify-between">
                                <Typography
                                    normal
                                    variant="xs"
                                    color="text-gray-500 block"
                                >
                                    Last Call Log
                                </Typography>
                                <LatestCallAnswer
                                    callLog={industry?.callLog?.[0]}
                                />
                            </div>
                        ) : null}
                    </AuthorizedUserComponent>
                </div>
                <div>
                    <UserProfileDetailCard
                        title="Location"
                        // detail={industry?.addressLine1}
                        detail={
                            industry?.isAddressUpdated
                                ? industry?.addressLine1
                                : ` ${industry?.addressLine1},' '
                        ${industry?.suburb?.replace(/Australia/i, '')}
                        ${industry?.state}, Australia`
                        }
                    />
                </div>
            </div>
        </div>
    )
}
