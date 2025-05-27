import { RtoLayout } from '@layouts'
import { RtoWpApprovalLists } from '@partials/rto'
import { NextPageWithLayout } from '@types'
import { ReactElement } from 'react'

const WpApprovalRequestPage: NextPageWithLayout = () => {
    return (
        <div>
            <RtoWpApprovalLists />
        </div>
    )
}

WpApprovalRequestPage.getLayout = (page: ReactElement) => {
    return <RtoLayout>{page}</RtoLayout>
}

export default WpApprovalRequestPage
