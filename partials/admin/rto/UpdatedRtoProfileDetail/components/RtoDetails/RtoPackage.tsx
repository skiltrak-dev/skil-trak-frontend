import { Typography } from '@components'
import { UserProfileDetailCard } from '@partials/common'
import { Rto } from '@types'
import React from 'react'

export const RtoPackage = ({ rto }: { rto: Rto }) => {
    return (
        <div className="">
            <Typography variant="small" medium>
                RTO pakage{' '}
            </Typography>

            <div className="mt-1.5 flex flex-col gap-y-1.5">
                <div className="flex items-center gap-x-[5px]">
                    <UserProfileDetailCard
                        title="Package Name"
                        detail={rto?.package?.name}
                    />
                    <UserProfileDetailCard
                        title="Billing Type"
                        detail={rto?.package?.billingType}
                    />
                </div>
            </div>
        </div>
    )
}
