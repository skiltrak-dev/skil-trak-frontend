import { ShowErrorNotifications, Switch, Typography } from '@components'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'
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
    return (
        <div>
            {' '}
            <ShowErrorNotifications result={isHiringResult} />
            <div className="py-4 border-b border-secondary-dark flex justify-between items-center">
                <Typography variant="small" medium>
                    Job Hiring :
                </Typography>
                <div className="flex items-center gap-x-2">
                    <Typography variant="small" bold color={'text-[#BF0000]'}>
                        OFF
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
                            disabled={isHiringResult.isLoading}
                        />
                    </div>
                    <Typography variant="small" bold>
                        ON
                    </Typography>
                </div>
            </div>
        </div>
    )
}
