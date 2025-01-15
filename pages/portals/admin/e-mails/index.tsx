import { ReactElement } from 'react'
// Layouts
import { AdminLayout } from '@layouts'
// Types

import { MailsListing } from '@partials/common/AdminEmails/components'
import { NextPageWithLayout } from '@types'

const SubAdminEmailsNotifications: NextPageWithLayout = () => {
    return (
        <div className="px-4 mt-8">
            <MailsListing />
        </div>
    )
}

SubAdminEmailsNotifications.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default SubAdminEmailsNotifications
