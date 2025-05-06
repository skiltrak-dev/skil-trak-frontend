import { ReactElement } from 'react'
// Layouts
import { IndustryLayout } from '@layouts'
// Types
import { NotificationList } from '@partials/common'
import { NextPageWithLayout } from '@types'

const IndustryAllNotifications: NextPageWithLayout = () => {
    return <NotificationList />
}

IndustryAllNotifications.getLayout = (page: ReactElement) => {
    return (
        <IndustryLayout pageTitle={{ title: 'All Notifications' }}>
            {page}
        </IndustryLayout>
    )
}

export default IndustryAllNotifications
