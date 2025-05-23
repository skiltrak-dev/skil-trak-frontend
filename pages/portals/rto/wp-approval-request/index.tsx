import { RtoLayout } from '@layouts'
import { RtoWpApproval } from '@partials/rto'
import { NextPageWithLayout } from '@types'
import { ReactElement } from 'react'

const WpApprovalRequestPage: NextPageWithLayout = () => {
    return (
        <div>
            <RtoWpApproval />
        </div>
    )
}

WpApprovalRequestPage.getLayout = (page: ReactElement) => {
    return <RtoLayout>{page}</RtoLayout>
}

export default WpApprovalRequestPage
