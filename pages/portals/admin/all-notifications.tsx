import { ReactElement } from 'react'
// Layouts
import { AdminLayout } from '@layouts'
// Types
import { NotificationList } from '@partials/common'
import { NextPageWithLayout } from '@types'

const SubAdminAllNotifications: NextPageWithLayout = () => {
    return <NotificationList />
}

SubAdminAllNotifications.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default SubAdminAllNotifications
