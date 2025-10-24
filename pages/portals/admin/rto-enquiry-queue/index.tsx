import { AdminLayout } from '@layouts'
import { RTOEnquiryQueue } from '@partials'
import { ReactElement } from 'react'

const RTOEnquiryQueuePage = () => {
    return (
        <div>
            <RTOEnquiryQueue />
        </div>
    )
}

RTOEnquiryQueuePage.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default RTOEnquiryQueuePage
