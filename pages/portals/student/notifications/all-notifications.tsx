import { StudentLayout } from '@layouts'
import { NotificationList } from '@partials/common'
import { NextPageWithLayout } from '@types'
import React, { ReactElement } from 'react'

const StudentNotifications: NextPageWithLayout = () => {
    return <NotificationList />
}

StudentNotifications.getLayout = (page: ReactElement) => (
    <StudentLayout pageTitle={{ title: 'All Notifications' }}>
        {page}
    </StudentLayout>
)

export default StudentNotifications
