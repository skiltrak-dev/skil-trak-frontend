import { CommonApi } from '@queries'
import { Industry, User } from '@types'
import { useNotification } from '@hooks'
import { ReactElement, useState } from 'react'
import { SnoozeIndustryModal } from '@partials/common/modal'
import { ShowErrorNotifications, Switch, Typography } from '@components'
import { getUserCredentials } from '@utils'
import { UserRoles } from '@constants'

export const SnoozeIndustrySwitch = ({
    industry,
    industryId,
}: {
    industry: Industry
    industryId: number
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const [unSnooze, unSnoozeResult] =
        CommonApi.Industries.useUnSnoozeIndustry()

    const { notification } = useNotification()

    const onCancelClicked = () => setModal(null)

    const onSnooze = () => {
        setModal(
            <SnoozeIndustryModal
                onCancel={onCancelClicked}
                industry={industry}
            />
        )
    }

    const onRemoveSnooze = () => {
        unSnooze(Number(industryId))?.then((res: any) => {
            if (res?.data) {
                notification.error({
                    title: `Industry Un Snoozed`,
                    description: `Industry "${industry?.user?.name}" has been Un Snoozed.`,
                })
            }
        })
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
                            defaultChecked={industry?.isSnoozed}
                            customStyleClass={'profileSwitch'}
                            loading={unSnoozeResult.isLoading}
                            disabled={unSnoozeResult.isLoading || checkRto}
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
