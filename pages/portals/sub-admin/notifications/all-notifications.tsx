import { ReactElement, useState } from 'react'
// Layouts
import { SubAdminLayout } from '@layouts'
// Types
import { NextPageWithLayout } from '@types'

const SubAdminAllNotifications: NextPageWithLayout = () => {
    
    return (
        <div>
            All Notifications
        </div>
    )
}

SubAdminAllNotifications.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout pageTitle={{ title: 'All Notifications' }}>
            {page}
        </SubAdminLayout>
    )
}

export default SubAdminAllNotifications
