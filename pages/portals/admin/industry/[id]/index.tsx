import { AdminLayout } from '@layouts'
import { IndustryProfileDetail } from '@partials'
import { NextPageWithLayout } from '@types'
import { ReactElement } from 'react'

const IndustryDetail: NextPageWithLayout = () => {
    return (
        <div className="p-4">
            <IndustryProfileDetail />
        </div>
    )
}

IndustryDetail.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default IndustryDetail
