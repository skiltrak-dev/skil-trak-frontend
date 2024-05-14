import { Rto } from '@types'
import { Typography } from '@components'
import { UserProfileDetailCard } from '@partials/common'

export const RtoDetails = ({ rto }: { rto: Rto }) => {
    return (
        <div className="">
            <Typography variant="small" medium>
                RTO Details
            </Typography>

            <div className="mt-1.5 flex flex-col gap-y-1.5">
                <div className="flex items-center gap-x-[5px]">
                    <UserProfileDetailCard
                        title="RTO Code"
                        detail={rto?.rtoCode}
                    />
                    <UserProfileDetailCard title="RTO ABN" detail={rto?.abn} />
                </div>

                <div>
                    <UserProfileDetailCard
                        title="Phone Number"
                        detail={rto?.phone}
                    />
                </div>

                <div>
                    <UserProfileDetailCard
                        title="Location"
                        detail={`${rto?.suburb}, ${rto?.state}, ${rto?.addressLine1}`}
                    />
                </div>
            </div>
        </div>
    )
}
