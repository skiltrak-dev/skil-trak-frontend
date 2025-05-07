import { ReactElement } from 'react'
// Layouts
import { RtoLayout } from '@layouts'
// Types
import { NextPageWithLayout } from '@types'

import { NotificationList } from '@partials/common'

const RtoAllNotifications: NextPageWithLayout = () => {
    return <NotificationList />
}

RtoAllNotifications.getLayout = (page: ReactElement) => (
    <RtoLayout pageTitle={{ title: 'All Notifications' }}>{page}</RtoLayout>
)

export default RtoAllNotifications
