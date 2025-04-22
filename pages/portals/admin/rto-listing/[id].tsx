import { AdminLayout, SubAdminLayout } from '@layouts'
import { RtoListingDetail } from '@partials/sub-admin'
import { NextPageWithLayout } from '@types'
import { ReactElement } from 'react'

const RtoListingDetailPage: NextPageWithLayout = () => {
    return (
        <div className='p-4'>
            <RtoListingDetail />
        </div>
    )
}
RtoListingDetailPage.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}
export default RtoListingDetailPage
