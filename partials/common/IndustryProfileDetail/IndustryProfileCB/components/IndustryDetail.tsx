import React, { ReactElement, useState } from 'react'
import { Industry } from '@types'
import { UserRoles } from '@constants'
import {
    ShowErrorNotifications,
    Typography,
    useIsRestricted,
    useRestrictedData,
} from '@components'
import { useNotification } from '@hooks'
import { UserProfileDetailCard } from '@partials/common/Cards'
import { SubAdminApi } from '@queries'
import { IndustryCallLogModal } from '@partials/sub-admin/Industries'
import moment from 'moment'

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
                    <UserProfileDetailCard
                        title="Created At"
                        detail={moment(industry?.createdAt).format(
                            'MMM, DD YYYY hh:mm A'
                        )}
                    />
                </div>
                <div className="border border-[#6B728050] rounded-md">
                    <UserProfileDetailCard
                        border={false}
                        title="Phone Number"
                        detail={useRestrictedData(
                            industry?.isSnoozed ? '---' : industry?.phoneNumber,
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
                    </UserProfileDetailCard>
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
