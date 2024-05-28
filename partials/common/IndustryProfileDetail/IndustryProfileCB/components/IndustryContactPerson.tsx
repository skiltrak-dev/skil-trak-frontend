import { Typography } from '@components'
import { UserProfileDetailCard } from '@partials/common/Cards'
import { Industry } from '@types'
import React from 'react'

export const IndustryContactPerson = ({ industry }: { industry: Industry }) => {
    return (
        <div className="py-3.5 border-b border-secondary-dark flex flex-col gap-y-0.5">
            <Typography variant="small" medium>
                Contact Person
            </Typography>

            {/*  */}
            <div className="mt-1.5 flex flex-col gap-y-1.5">
                <div className="flex items-center gap-x-[5px]">
                    <UserProfileDetailCard
                        title="Name"
                        detail={industry?.contactPerson}
                    />
                    <UserProfileDetailCard
                        title="Phone"
                        detail={industry?.contactPersonNumber}
                    />
                </div>
            </div>
        </div>
    )
}
