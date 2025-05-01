import { ReactElement } from 'react'
// Layouts
import { SubAdminLayout } from '@layouts'
// Types
import { NotificationList } from '@partials/common'
import { NextPageWithLayout } from '@types'

const SubAdminAllNotifications: NextPageWithLayout = () => {
    return <NotificationList />
}

SubAdminAllNotifications.getLayout = (page: ReactElement) => (
    <SubAdminLayout pageTitle={{ title: 'All Notifications' }}>
        {page}
    </SubAdminLayout>
)

export default SubAdminAllNotifications
