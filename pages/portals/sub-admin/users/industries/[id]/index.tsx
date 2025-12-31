import { SubAdminLayout } from '@layouts'
import { IndustryProfileDetail } from '@partials'
import { NextPageWithLayout } from '@types'
import { ReactElement } from 'react'

const IndustryDetail: NextPageWithLayout = () => {
    return <IndustryProfileDetail />
}

IndustryDetail.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default IndustryDetail
