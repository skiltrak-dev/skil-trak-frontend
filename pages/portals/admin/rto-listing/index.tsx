import { AdminLayout, SubAdminLayout } from '@layouts'
import { RtoListing } from '@partials/sub-admin'
import { NextPageWithLayout } from '@types'
import { ReactElement } from 'react'

type Props = {}
const RtoListingPage: NextPageWithLayout = (props: Props) => {
    return <RtoListing />
}
RtoListingPage.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}
export default RtoListingPage
