import { ReactElement, useState } from 'react'
// Layouts
import { AdminLayout } from '@layouts'
// Types
import { NextPageWithLayout } from '@types'
import {
    EmailBulk,
} from '@partials/common/AdminEmails/bulkEmail'
import { PageHeading } from '@components/headings'

const BulkEmail: NextPageWithLayout = () => {
    


    return (
        <>
            <div className='mt-4 ml-4'>
                <PageHeading
                    title={'Bulk Email'}
                    subtitle={'Bulk email to Students, RTO and Industry'}
                ></PageHeading>
            </div>
           <EmailBulk />
        </>
    )
}

BulkEmail.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default BulkEmail
