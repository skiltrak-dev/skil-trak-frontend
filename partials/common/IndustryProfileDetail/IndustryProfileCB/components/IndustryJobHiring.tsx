import { ShowErrorNotifications, Switch, Typography } from '@components'
import { UserRoles } from '@constants'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'
import { getUserCredentials } from '@utils'
import React from 'react'

export const IndustryJobHiring = ({
    isHiringIndustry,
    industryUserId,
}: {
    isHiringIndustry: boolean
    industryUserId: number
}) => {
    const [isHiring, isHiringResult] =
        CommonApi.Industries.useIsIndustryHiring()

    const { notification } = useNotification()

    const onJobHiring = () => {
        isHiring(industryUserId)?.then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: isHiringIndustry ? 'Not Hiring' : 'Hiring',
                    description: isHiringIndustry ? 'Not Hiring' : 'Hiring',
                })
            }
        })
    }
    const { role } = getUserCredentials()
    const checkRto = role === UserRoles.RTO
    return (
        <div>
            {' '}
            <ShowErrorNotifications result={isHiringResult} />
            <div className="py-4 border-b border-secondary-dark flex justify-between items-center">
                <Typography variant="small" medium>
                    Hiring :
                </Typography>
                <div className="flex items-center gap-x-2">
                    <Typography variant="small" bold color={'text-[#BF0000]'}>
                        NO
                    </Typography>
                    <div className="-mb-2">
                        <Switch
                            name="hiring"
                            onChange={() => {
                                onJobHiring()
                            }}
                            value={isHiringIndustry}
                            defaultChecked={isHiringIndustry}
                            customStyleClass={'profileSwitch'}
                            loading={isHiringResult.isLoading}
                            disabled={isHiringResult.isLoading || checkRto}
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
