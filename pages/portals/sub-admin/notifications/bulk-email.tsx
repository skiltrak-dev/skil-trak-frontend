import { ReactElement, useState } from 'react'
// Layouts
import { SubAdminLayout } from '@layouts'

import { NextPageWithLayout } from '@types'
import { EmailBulk } from '@partials/common/AdminEmails/bulkEmail'


const BulkEmailSubAdmin: NextPageWithLayout = () => {

    return (
        <div>
            <EmailBulk />
        </div>
    )
}

BulkEmailSubAdmin.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout pageTitle={{ title: 'Bulk Email' }}>
            {page}
        </SubAdminLayout>
    )
}

export default BulkEmailSubAdmin
