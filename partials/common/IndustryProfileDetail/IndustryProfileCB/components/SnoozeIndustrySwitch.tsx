import { CommonApi } from '@queries'
import { Industry, PartnerRemovalRequests, User } from '@types'
import { useNotification } from '@hooks'
import { ReactElement, useState } from 'react'
import {
    SnoozeIndustryModal,
    UnSnoozeIndustryModal,
} from '@partials/common/modal'
import {
    ShowErrorNotifications,
    Switch,
    Tooltip,
    TooltipPosition,
    Typography,
} from '@components'
import { getUserCredentials } from '@utils'
import { UserRoles } from '@constants'
import { CiSquareQuestion } from 'react-icons/ci'

export const SnoozeIndustrySwitch = ({
    industry,
    industryId,
    partnerRemovalRequests,
}: {
    industry: Industry
    industryId: number
    partnerRemovalRequests: PartnerRemovalRequests | undefined
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const [unSnooze, unSnoozeResult] =
        CommonApi.Industries.useUnSnoozeIndustry()

    const { notification } = useNotification()

    const onCancelClicked = () => setModal(null)

    const onSnooze = () => {
        if (partnerRemovalRequests) {
            notification.warning({
                title: 'Snooze Request Already Sent',
                description: 'Snooze Request Already Sent',
            })
        } else {
            setModal(
                <SnoozeIndustryModal
                    onCancel={onCancelClicked}
                    industry={industry}
                />
            )
        }
    }

    const onRemoveSnooze = () => {
        setModal(
            <UnSnoozeIndustryModal
                industry={industry}
                onCancel={onCancelClicked}
            />
        )
        // unSnooze(Number(industryId))?.then((res: any) => {
        //     if (res?.data) {
        //         notification.error({
        //             title: `Industry Un Snoozed`,
        //             description: `Industry "${industry?.user?.name}" has been Un Snoozed.`,
        //         })
        //     }
        // })
    }
    const role = getUserCredentials()?.role
    const checkRto = role === UserRoles.RTO
    return (
        <div>
            {modal}
            <ShowErrorNotifications result={unSnoozeResult} />
            <div className="py-4 border-b border-secondary-dark flex justify-between items-center">
                <div className="flex items-center gap-x-1">
                    <Typography variant="small" medium>
                        Snooze
                    </Typography>
                </div>
                <div className="flex items-center gap-x-2">
                    {partnerRemovalRequests && (
                        <div className="relative group">
                            <CiSquareQuestion size={22} />
                            <Tooltip position={TooltipPosition.center}>
                                Snoozed Request Already Sent
                            </Tooltip>
                        </div>
                    )}
                    <Typography variant="small" bold color={'text-[#BF0000]'}>
                        NO
                    </Typography>
                    <div className="-mb-2">
                        <Switch
                            name="isPartner"
                            onChange={() => {
                                industry?.isSnoozed
                                    ? onRemoveSnooze()
                                    : onSnooze()
                            }}
                            value={industry?.isSnoozed}
                            // {...(industry?.isSnoozed
                            //     ? { isChecked: industry?.isSnoozed }
                            //     : {})}
                            isChecked={industry?.isSnoozed}
                            defaultChecked={industry?.isSnoozed}
                            customStyleClass={'profileSwitch'}
                            loading={unSnoozeResult.isLoading}
                            disabled={
                                unSnoozeResult.isLoading ||
                                checkRto ||
                                !!partnerRemovalRequests
                            }
                        />
                    </div>
                    <Typography variant="small" bold>
                        YES
                    </Typography>
                </div>
            </div>
        </div>
    )
}
