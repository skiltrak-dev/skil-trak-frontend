import { Card, Typography } from '@components'
import { NotificationList } from '@partials/common'
import { User } from '@types'

export const RtoNotifications = ({ rtoUser }: { rtoUser: User }) => {
    return (
        <Card fullHeight shadowType="profile" noPadding>
            <div className="h-full">
                <div className="px-4 py-3.5 border-b border-secondary-dark">
                    <Typography semibold>
                        <span className="text-[15px]">Rto Notifications</span>
                    </Typography>
                </div>

                {/*  */}
                <div className="h-[calc(100%-60px)] overflow-auto">
                    <NotificationList userId={rtoUser?.id} />
                </div>
            </div>
        </Card>
    )
}
