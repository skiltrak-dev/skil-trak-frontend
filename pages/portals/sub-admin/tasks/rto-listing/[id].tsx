import { SubAdminLayout } from '@layouts'
import { RtoListingDetail } from '@partials/sub-admin'
import { NextPageWithLayout } from '@types'
import { ReactElement } from 'react'

const RtoListingDetailPage: NextPageWithLayout = () => {
    return <RtoListingDetail />
}
RtoListingDetailPage.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout
            pageTitle={{
                title: 'RTO Listing Details',
            }}
        >
            {page}
        </SubAdminLayout>
    )
}
export default RtoListingDetailPage
